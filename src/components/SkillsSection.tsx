import React from "react";
import { Code2, Cpu, Layers, BookOpen, Terminal, Sparkles, CheckCircle } from "lucide-react";

interface Skill {
  name: string;
  level: number; // Percentage out of 100
  desc: string;
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
}

export default function SkillsSection() {
  const CATEGORIES: SkillCategory[] = [
    {
      title: "Core Languages",
      icon: <Code2 className="w-5 h-5 text-zinc-100" />,
      skills: [
        { name: "Python", level: 85, desc: "Foundational scripts, data pipelines, object-oriented concepts, and CLI tools." },
        { name: "HTML5 & CSS3", level: 90, desc: "Structuring semantic content with responsive modern designs using Tailwind CSS." },
        { name: "JavaScript (ES6+)", level: 75, desc: "Interactive DOM management, modular scripting, and API communication." },
        { name: "C / C++ (Foundations)", level: 60, desc: "Acquiring memory management and syntax logic through algorithms study." },
      ],
    },
    {
      title: "CS Fundamentals & Theory",
      icon: <Cpu className="w-5 h-5 text-zinc-300" />,
      skills: [
        { name: "Algorithms & Data Structures", level: 80, desc: "Practical understanding of lists, arrays, sorting, searching, and complexity graphs." },
        { name: "Digital Logic & Gates", level: 75, desc: "Boolean operations, logic gate circuits, registers, and numeric systems (binary/hex)." },
        { name: "Discrete Mathematics", level: 70, desc: "Set theory, matrix operations, and propositional logic for solving code dilemmas." },
        { name: "Database Basics", level: 65, desc: "Familiarity with entity relationships, schemas, and basic queries (SQL)." },
      ],
    },
    {
      title: "Tools & Environments",
      icon: <Terminal className="w-5 h-5 text-zinc-400" />,
      skills: [
        { name: "Git & GitHub", level: 80, desc: "Version control workflows, commit trees, branching, and portfolio hosting." },
        { name: "VS Code & IDEs", level: 85, desc: "Local workstation setup, debugging extensions, and keyboard macros." },
        { name: "Linux Bash Shell", level: 70, desc: "Terminal navigation, scripting utilities, and basic package managers (apt, npm)." },
        { name: "Vite & React Ecosystem", level: 65, desc: "Setting up single-page applications and utilizing reactive state workflows." },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
        <div>
          <h3 className="font-display font-light text-2xl text-zinc-100 flex items-center gap-2">
            <Layers className="w-5 h-5 text-zinc-400" />
            Core Competencies & Skills
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            Categorized skills highlighting her learning milestones in Level 100 Computer Science.
          </p>
        </div>
        <div className="flex items-center gap-1.5 bg-zinc-950 px-3.5 py-1.5 rounded-full border border-zinc-800 text-[10px] tracking-wider font-semibold text-zinc-300 font-mono">
          <Sparkles className="w-3.5 h-3.5 text-zinc-400" /> Abuja Academic Index
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES.map((cat, idx) => (
          <div
            key={idx}
            className="bg-zinc-900/20 border border-zinc-800/60 rounded-2xl p-6 hover:border-zinc-750 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2.5 border-b border-zinc-850 pb-3.5 mb-4">
                <div className="p-1.5 bg-zinc-950/80 rounded-lg border border-zinc-800">
                  {cat.icon}
                </div>
                <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-zinc-400">{cat.title}</h4>
              </div>

              <div className="space-y-4">
                {cat.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-zinc-300 flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-zinc-500" />
                        {skill.name}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-100 font-bold bg-zinc-850 px-1.5 py-0.5 rounded border border-zinc-800/80">
                        {skill.level}%
                      </span>
                    </div>
                    {/* Skill progress bar - Elegant monochrome */}
                    <div className="w-full bg-zinc-950 h-1 rounded-full overflow-hidden border border-zinc-900">
                      <div
                        style={{ width: `${skill.level}%` }}
                        className="bg-zinc-100 h-full rounded-full"
                      ></div>
                    </div>
                    <p className="text-[10px] text-zinc-400 leading-relaxed font-sans pl-1">
                      {skill.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
