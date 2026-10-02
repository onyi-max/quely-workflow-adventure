"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { questions as q } from "@/content/results";
import { sendQuestion } from "@/lib/questions";

const QuestionsContext = createContext<{ open: () => void }>({ open: () => {} });

/** Opens the "Have more questions about Quely?" pop-up from anywhere on the site. */
export function useQuestions() {
  return useContext(QuestionsContext);
}

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/** Provides the questions pop-up to the whole site and renders it (after the page). */
export function QuestionsProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  // The first name from the last accepted submission, for the thank-you headline.
  const [sentName, setSentName] = useState("");
  const firstRef = useRef<HTMLInputElement>(null);

  // Every open starts blank: no leftover answers or error, so a previous submission can't be resent.
  const open = useCallback(() => {
    setFirstName("");
    setEmail("");
    setQuestion("");
    setError(null);
    setSending(false);
    setDone(false);
    setOpen(true);
  }, []);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (isOpen && !done) firstRef.current?.focus();
  }, [isOpen, done]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const submit = async () => {
    if (sending) return;
    const fn = firstName.trim();
    const em = email.trim();
    const qu = question.trim();
    // All three are required, and the email has to look like an email.
    if (!fn || !EMAIL.test(em) || !qu) {
      setError(q.missing);
      return;
    }
    setError(null);
    setSending(true);
    const result = await sendQuestion(fn, em, qu);
    setSending(false);
    if (result === "failed") {
      setError(q.failed);
      return;
    }
    // Only reached once the destination accepted it; a failure keeps the form and shows the error.
    setSentName(fn);
    setDone(true);
    setFirstName("");
    setEmail("");
    setQuestion("");
  };

  return (
    <QuestionsContext.Provider value={{ open }}>
      {children}
      <div
        className={"qmodal" + (isOpen ? "" : " hidden")}
        id="qmodal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="qmt"
        onClick={(e) => {
          if ((e.target as HTMLElement).id === "qmodal") close();
        }}
      >
        <div className="card qmcard">
          <button className="qmx" id="qmx" aria-label={q.close} onClick={close}>
            ✕
          </button>
          <div id="qmform" className={done ? "hidden" : undefined}>
            <div className="kick">{q.kicker}</div>
            <h3 className="h2" id="qmt" style={{ fontSize: 28, marginTop: 8 }}>
              {q.title}
            </h3>
            <p className="lead" style={{ fontSize: 16, marginTop: 8 }}>
              {q.lead}
            </p>
            <label className="qml">
              {q.firstNameLabel}
              <input
                ref={firstRef}
                type="text"
                id="qmf"
                autoComplete="given-name"
                required
                placeholder={q.firstNamePlaceholder}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>
            <label className="qml">
              {q.emailLabel}
              <input
                type="email"
                id="qme"
                autoComplete="email"
                required
                placeholder={q.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="qml">
              {q.questionLabel}
              <textarea
                id="qmq"
                required
                rows={4}
                placeholder={q.questionPlaceholder}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </label>
            <div className={"qmerr" + (error ? "" : " hidden")} id="qmerr" role="alert">
              {error}
            </div>
            <button className="btn" id="qmsend" type="button" style={{ marginTop: 14 }} onClick={submit} disabled={sending}>
              {sending ? q.sending : q.send}
            </button>
          </div>
          <div id="qmdone" className={done ? undefined : "hidden"}>
            <div className="kick">{q.doneKicker}</div>
            <h3 className="h2" id="qmthx" style={{ fontSize: 28, marginTop: 8 }}>
              {q.doneTitle(sentName)}
            </h3>
            <p className="lead" style={{ fontSize: 16, marginTop: 8 }}>
              {q.doneLead}
            </p>
            {/* Closes the form; the visitor carries on from where they were. */}
            <button className="btn" id="qmclose" type="button" style={{ marginTop: 14 }} onClick={close}>
              {q.keepExploring}
            </button>
          </div>
        </div>
      </div>
    </QuestionsContext.Provider>
  );
}
