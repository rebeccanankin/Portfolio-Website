import React, { useState } from "react";
import { Project } from "../types";
import { RightAngledTriangleDemo, PalindromeNumberDemo } from "./ProjectDemos";
import { FolderGit2, Github, Award, CheckCircle2 } from "lucide-react";

const PROJECTS_DATA: Project[] = [
  {
    id: "palindrome-checker",
    title: "Palindrome Number Checker",
    description: "An algorithmic checker validating mathematical palindrome sequences with interactive visual digit decomposition.",
    longDescription: "A clean algorithmic utility built to verify whether an integer reads the same backward as forward. It features step-by-step mathematical decomposition (avoiding simple string-reversal shortcuts to demonstrate actual modular arithmetic logic), interactive digit splitting, and visual progression of the reversed digit reconstruction process.",
    category: "Algorithm",
    tags: ["React 19", "Modular Arithmetic", "Algorithms", "Dynamic Step Engine"],
    status: "completed",
    level: "Beginner",
    githubUrl: "https://github.com/rebeccanankin/Palindrome-Number-Checker",
    demoType: "palindrome-checker"
  },
  {
    id: "triangle-checker",
    title: "Right-Angled Triangle Checker",
    description: "A geometry checker utility verifying Pythagorean triples with dynamic SVG triangle visualization and angle metrics.",
    longDescription: "A geometric proof utility built to verify whether any three side lengths satisfy the Pythagorean Theorem. It implements dynamic inputs, validates triangle inequalities, calculates precise angle measures using the Law of Cosines, and projects coordinates to render a fully custom SVG triangle on the fly.",
    category: "Algorithm",
    tags: ["React 19", "Trigonometry", "Law of Cosines", "Dynamic SVG"],
    status: "completed",
    level: "Beginner",
    githubUrl: "https://github.com/rebeccanankin/Right-Angled-Triangle-Checker",
    demoType: "triangle-checker"
  }
];

export default function ProjectsSection() {
  const [selectedProjectId, setSelectedProjectId] = useState<string>("palindrome-checker");

  const activeProject = PROJECTS_DATA.find((p) => p.id === selectedProjectId) || PROJECTS_DATA[0];

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h3 className="font-display font-light text-2xl text-zinc-100 flex items-center gap-2">
            <FolderGit2 className="w-5 h-5 text-zinc-400" />
            Interactive CS Projects
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            Operate Rebecca's real-time computer science projects by interacting with the embedded live dashboards.
          </p>
        </div>
        <div className="flex items-center gap-1.5 bg-zinc-950 border border-zinc-850 p-1.5 rounded-xl">
          {PROJECTS_DATA.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedProjectId(p.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition cursor-pointer ${
                selectedProjectId === p.id
                  ? "bg-zinc-100 text-zinc-950 font-bold shadow"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {p.title.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Showcase Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">
        {/* Project documentation pane */}
        <div className="xl:col-span-4 bg-zinc-900/10 border border-zinc-800/80 rounded-2xl p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-mono tracking-wider bg-zinc-800 text-zinc-300 px-2.5 py-1 rounded-full border border-zinc-700 font-bold">
                {activeProject.category}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold text-zinc-300 bg-zinc-900 border border-zinc-800">
                {activeProject.level} Level
              </span>
            </div>

            <div className="space-y-1">
              <h4 className="font-display font-bold text-base text-zinc-100">{activeProject.title}</h4>
              <p className="text-[10px] font-mono text-zinc-500">github.com/rebeccanankin</p>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed font-sans">{activeProject.longDescription}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {activeProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-zinc-950 border border-zinc-850 text-zinc-400 text-[10px] font-mono px-2 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Buttons & Links */}
          <div className="pt-4 border-t border-zinc-800/60 space-y-3">
            <div className="flex items-center gap-2.5 text-xs text-zinc-400">
              <CheckCircle2 className="w-4 h-4 text-zinc-500" />
              <span>Tested & compilable in Miva environments</span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={activeProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2 px-3 rounded-lg bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
              >
                <Github className="w-3.5 h-3.5" /> Source Code
              </a>
              <button
                disabled
                className="flex-1 py-2 px-3 rounded-lg bg-zinc-900/40 border border-zinc-800 text-zinc-400 text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <Award className="w-3.5 h-3.5 text-zinc-500" /> Coursework
              </button>
            </div>
          </div>
        </div>

        {/* Live Interactive Simulator Pane */}
        <div className="xl:col-span-8 flex flex-col justify-center">
          {activeProject.demoType === "palindrome-checker" && <PalindromeNumberDemo />}
          {activeProject.demoType === "triangle-checker" && <RightAngledTriangleDemo />}
        </div>
      </div>
    </div>
  );
}
