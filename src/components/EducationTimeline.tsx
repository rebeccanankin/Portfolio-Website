import React from "react";
import { TimelineItem } from "../types";
import { School, Award, Clock } from "lucide-react";

const TIMELINE_DATA: TimelineItem[] = [
  {
    id: "current",
    period: "May 2026 - Present",
    title: "Computer Science (B.Sc.) - Level 100, Second Semester",
    subtitle: "Miva Open University, Nigeria",
    description: "Currently mastering core software architecture fundamentals, digital hardware logic, and advanced mathematical calculus.",
    bullets: [
      "CSS 121: Algorithms & Data Structures I (Mastering Arrays, Lists, Trees, and Sorting analysis)",
      "CSS 122: Digital Logic & Hardware Organization (understanding gates, boolean logic, registers)",
      "MTH 112: Differential & Integral Calculus (mathematical optimization and modeling)",
      "Establishing foundations in web tech (Vite, React, TS) and CLI programming with Python."
    ],
    status: "current"
  },
  {
    id: "first_sem",
    period: "Jan 2026 - Apr 2026",
    title: "Level 100, First Semester Studies",
    subtitle: "Miva Open University, Nigeria",
    description: "Successfully transitioned into university academics, focusing on foundational principles of computer system units, syntax logic, and basic mathematical analysis.",
    bullets: [
      "CSS 111: Introduction to Computer Science & Applications (Foundational computer theory & system units)",
      "MTH 101: General Mathematics I - Algebra & Trigonometry (Mathematical relations, algebra, and coordinates)",
      "PHY 101: General Physics I (Mechanics, heat, and basic energy equations)",
      "GST 111: Communication in English (Academic writing and structured technical reporting)",
      "Initiated deep self-study into algorithmic structures and built basic CLI terminals."
    ],
    status: "completed"
  },
  {
    id: "prep",
    period: "Late 2025",
    title: "Enrolled in Miva Computer Science B.Sc. Program",
    subtitle: "Abuja HQ Academic Entry",
    description: "Admitted into Miva University, Abuja, with a deep determination to specialize in software engineering, digital networks, and machine intelligence models.",
    bullets: [
      "Gained complete command of standard command-line tools.",
      "Engaged in online community prep-classes for Python basic structures.",
      "Established initial coding profiles on GitHub (@rebeccanankin21)."
    ],
    status: "completed"
  },
  {
    id: "future",
    period: "Late 2026 & Beyond",
    title: "Level 200 Core Systems and Software Architectures",
    subtitle: "Miva University / Industry Aspirational Milestones",
    description: "Preparing for full-stack systems engineering, standard database organization, and launching real-world utility services for Nigeria's growing digital economy.",
    bullets: [
      "Advanced database structures & relational systems (SQL / PostgreSQL)",
      "System Programming with Java and C++",
      "Contributing to open-source student portals and local logistics tech around Abuja.",
      "Applying for remote junior developer roles and research internships."
    ],
    status: "future"
  }
];

export default function EducationTimeline() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-display font-light text-2xl text-zinc-100 flex items-center gap-2">
          <School className="w-5 h-5 text-zinc-400" />
          Academic & Learning Timeline
        </h3>
        <p className="text-xs text-zinc-400 mt-1">
          Rebecca's computer science progression at Miva University, showing completed terms and future goals.
        </p>
      </div>

      <div className="relative border-l border-zinc-800 ml-3 md:ml-6 pl-6 md:pl-10 space-y-8 py-2">
        {TIMELINE_DATA.map((item) => {
          const isCurrent = item.status === "current";
          const isFuture = item.status === "future";

          return (
            <div key={item.id} className="relative">
              {/* Timeline marker node */}
              <span className={`absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                isCurrent 
                  ? "bg-zinc-100 border-zinc-200 ring-4 ring-zinc-800/50 scale-125"
                  : isFuture
                  ? "bg-[#080808] border-zinc-800"
                  : "bg-zinc-700 border-zinc-500"
              }`}>
                {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-zinc-950"></span>}
              </span>

              {/* Box Content */}
              <div className={`p-6 rounded-xl border transition-all duration-300 ${
                isCurrent 
                  ? "bg-zinc-900/40 border-zinc-700 shadow-xl"
                  : "bg-zinc-900/10 border-zinc-800/80 hover:border-zinc-700/80"
              }`}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                  <div className="space-y-1">
                    <span className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full font-semibold border ${
                      isCurrent
                        ? "bg-zinc-100 text-zinc-950 border-zinc-100 font-bold"
                        : isFuture
                        ? "bg-zinc-950 text-zinc-500 border-zinc-850"
                        : "bg-zinc-900 text-zinc-300 border-zinc-800"
                    }`}>
                      {item.period}
                    </span>
                    <h4 className="font-display font-bold text-base text-zinc-100 mt-2">{item.title}</h4>
                    <p className="text-xs text-zinc-400 font-medium">{item.subtitle}</p>
                  </div>
                  {isCurrent && (
                    <div className="flex items-center gap-1.5 bg-zinc-800 text-zinc-100 text-[10px] font-semibold font-mono px-3 py-1 rounded-full border border-zinc-700 w-fit">
                      <Clock className="w-3 h-3 text-zinc-400 animate-spin" /> In Progress
                    </div>
                  )}
                  {item.id === "first_sem" && (
                    <div className="flex items-center gap-1 bg-zinc-900 text-zinc-350 border border-zinc-800 text-[10px] font-semibold font-mono px-3 py-1 rounded-full w-fit">
                      <Award className="w-3 h-3 text-zinc-500" /> Term Completed
                    </div>
                  )}
                </div>

                <p className="text-xs text-zinc-300 mt-2 leading-relaxed">{item.description}</p>

                <div className="mt-4 pt-4 border-t border-zinc-800/80 space-y-2">
                  <div className="text-[9px] font-semibold text-zinc-500 uppercase tracking-widest">Syllabus Focus & Outcomes:</div>
                  <ul className="space-y-1.5">
                    {item.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="text-xs text-zinc-400 flex items-start gap-2.5">
                        <span className={`w-1 h-1 rounded-full mt-2 flex-shrink-0 ${isCurrent ? "bg-zinc-100" : isFuture ? "bg-zinc-600" : "bg-zinc-400"}`}></span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
