"use client";

import { QAvatar, type Person } from "@/components/ui/Avatar";
import { AskOrbitButton } from "./ThreadsPanel";

export type ScheduleCopy = {
  heading: string;
  titleLabel: string;
  title: string;
  where: string;
  length: string;
  participantsLabel: string;
  dateLabel: string;
  days: { day: string; date: string }[];
  allParticipants: string;
  timeLabel: string;
  slots: string[];
  recording: string;
  submit: string;
};

/** Quely's Schedule Meeting panel. */
export function ScheduleMeeting({
  copy,
  participant,
  slot,
  onPick,
  onSchedule,
}: {
  copy: ScheduleCopy;
  participant: Person;
  slot: string | null;
  onPick: (slot: string) => void;
  onSchedule: () => void;
}) {
  return (
    <>
      <div className="qrhead">
        <AskOrbitButton pulse={false} />
      </div>
      <div className="sched">
        <div className="sh">
          <b>{copy.heading}</b>
          <span>✕</span>
        </div>
        <label>{copy.titleLabel}</label>
        <div className="sf">{copy.title}</div>
        <div className="s2">
          <div className="sf">{copy.where}</div>
          <div className="sf">{copy.length}</div>
        </div>
        <label>{copy.participantsLabel}</label>
        <div className="sf">
          <span className="pchip">
            <QAvatar person={participant} size={18} style={{ fontSize: 8 }} />
            {participant.name} ✕
          </span>
        </div>
        <label>{copy.dateLabel}</label>
        <div className="days">
          {copy.days.map((d, i) => (
            <div key={d.date} className={i === 0 ? "day on" : "day"}>
              <small>{d.day}</small>
              <b>{d.date}</b>
              <em>{copy.allParticipants}</em>
            </div>
          ))}
        </div>
        <label>{copy.timeLabel}</label>
        <div className="slots2">
          {copy.slots.map((t) => (
            <button key={t} className={t === slot ? "slot on" : "slot"} onClick={() => onPick(t)}>
              {t}
            </button>
          ))}
        </div>
        <div className="sfoot">
          <span className="rec">
            {copy.recording} <i className="tog" />
          </span>
          <button className="schedbtn" id="schedGo" disabled={!slot} onClick={onSchedule}>
            {copy.submit}
          </button>
        </div>
      </div>
    </>
  );
}
