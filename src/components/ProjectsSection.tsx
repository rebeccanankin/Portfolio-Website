import React, { useState } from "react";
import { Project } from "../types";
import { PythonTerminalDemo, AbujaRouteDemo, MivaStudyPlannerDemo } from "./ProjectDemos";
import { FolderGit2, Github, Award, CheckCircle2 } from "lucide-react";

const PROJECTS_DATA: Project[] = [
  {
    id: "route-solver",
    title: "Abuja Route & Traffic Solver",
    description: "An interactive graph-theory optimizer calculating the shortest pathways around Abuja districts based on traffic weights.",
    longDescription: "Built as a practical application of Miva CSS 121 (Algorithms and Data Structures I). It solves shortest-path traversal on a customized node grid connecting Dutse Sokale, Gwarinpa, Wuse II, and the Miva University HQ campus using a modified Dijkstra's formula with weighted traffic scaling multipliers.",
    category: "Algorithm",
    tags: ["TypeScript", "Graph Theory", "Dijkstra Algorithm", "Abuja Nodes"],
    status: "completed",
    level: "Intermediate",
    githubUrl: "https://github.com/rebeccanankin21/abuja-routing-dijkstra",
    demoType: "traffic-sim"
  },
  {
    id: "study-planner",
    title: "Miva Course Task Planner & Study Tracker",
    description: "A client-side study task planner modeled to track and schedule academic homework load and coordinate study hourly budgets.",
    longDescription: "A study-planning tool designed to assist computer science student cohorts at Miva in budgeting study hours. It enables students to record custom first-year course codes, schedule specific exam preparations or assignments, set priorities, and dynamically compute remaining weekly study hour budgets.",
    category: "Web App",
    tags: ["React 19", "Tailwind CSS", "Time Budgets", "Course Scheduling"],
    status: "completed",
    level: "Beginner",
    githubUrl: "https://github.com/rebeccanankin21/miva-study-tracker",
    demoType: "study-planner"
  },
  {
    id: "budget-cli",
    title: "Python Student Budget CLI",
    description: "A command-line terminal interface simulating a personal student ledger built inside a custom retro Python shell.",
    longDescription: "Created to master Python CLI basics and standard structural logic. It implements full CRUD data logging for local students in Abuja to log transport (Keke/Uber), study data, and food costs, with automated threshold warning triggers.",
    category: "Python CLI",
    tags: ["Python 3.x", "Command Shell", "Data Logging", "CLI UX"],
    status: "completed",
    level: "Beginner",
    githubUrl: "https://github.com/rebeccanankin21/student-budget-cli",
    demoType: "python-terminal"
  }
];

export default function ProjectsSection() {
  const [selectedProjectId, setSelectedProjectId] = useState<string>("route-solver");

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
              {p.category}
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
              <p className="text-[10px] font-mono text-zinc-500">github.com/rebeccanankin21</p>
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
          {activeProject.demoType === "traffic-sim" && <AbujaRouteDemo />}
          {activeProject.demoType === "study-planner" && <MivaStudyPlannerDemo />}
          {activeProject.demoType === "python-terminal" && <PythonTerminalDemo />}
        </div>
      </div>
    </div>
  );
}
