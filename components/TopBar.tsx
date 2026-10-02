"use client";

import { usePathname } from "next/navigation";
import { header } from "@/content/shared";
import { links } from "@/content/results";
import { IMG } from "@/lib/paths";
import { track } from "@/lib/analytics";
import { useQuestions } from "./QuestionsModal";

/** Logo plus "Ask a question" and "Book a demo", at the top of every page. */
export function TopBar() {
  const { open } = useQuestions();
  // Name the page for tracking: "map", or the path ("engineering", "full-picture", …).
  const page = usePathname().replace(/^\//, "") || "map";
  return (
    <div className="top">
      <img src={IMG.logo} alt="Quely" />
      <span className="toplinks">
        <button
          id="topq"
          type="button"
          onClick={() => {
            track("cta_clicked", page, { cta: "ask_question", from: "header" });
            open();
          }}
        >
          {header.ask}
        </button>
        <a
          id="topbook"
          className="topbook"
          href={links.bookDemo}
          target="_blank"
          rel="noopener"
          onClick={() => track("cta_clicked", page, { cta: "book_demo", from: "header" })}
        >
          {header.book}
        </a>
      </span>
    </div>
  );
}
