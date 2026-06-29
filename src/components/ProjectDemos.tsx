import React, { useState, useEffect, useRef } from "react";
import { Terminal, Play, RefreshCw, Plus, Trash2, MapPin, ChevronRight, Code2, CheckCircle2, BookOpen, Triangle, HelpCircle, Binary, ArrowLeftRight } from "lucide-react";

// ==========================================
// 1. PYTHON CLI TERMINAL SIMULATOR
// ==========================================
export function PythonTerminalDemo() {
  const [history, setHistory] = useState<string[]>([
    "Python 3.10.4 (default, Jun 2026) [GCC 11.2.0] on linux",
    'Type "help" or "guide" to see available commands.',
    "Rebecca_Budget_Tracker_v1.0 initialized successfully.",
    "",
  ]);
  const [input, setInput] = useState("");
  const [expenses, setExpenses] = useState<{ id: number; desc: string; amount: number; category: string }[]>([
    { id: 1, desc: "Sokale Keke Ride", amount: 400, category: "Transport" },
    { id: 2, desc: "Miva Study Data", amount: 1200, category: "Internet" },
    { id: 3, desc: "Suya Dinner", amount: 1500, category: "Food" },
  ]);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;

    const parts = cmd.split(" ");
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    let newOutput: string[] = [`rebecca@miva:~$ ${cmd}`];

    switch (command) {
      case "help":
        newOutput.push(
          "Available Commands:",
          "  help               - Display this help manual",
          "  list               - List all logged expenses",
          "  add <amt> <cat> <desc> - Log expense (e.g. add 500 Data MTN)",
          "  total              - Calculate overall budget summary",
          "  clear              - Wipe the console screen",
          "  reset              - Restore sample Abuja student records"
        );
        break;
      case "guide":
        newOutput.push(
          "👋 Welcome to the Personal Expense Tracker built for Python CLI basics.",
          "This tool manages daily student budgets in Abuja. For example:",
          "  Type 'add 800 Food Lunch' to record your afternoon meal.",
          "  Type 'total' to review your breakdown."
        );
        break;
      case "list":
        if (expenses.length === 0) {
          newOutput.push("No expenses logged yet. Use 'add' to register one!");
        } else {
          newOutput.push("ID   | Category   | Amount (₦) | Description");
          newOutput.push("-----------------------------------------------");
          expenses.forEach((exp) => {
            newOutput.push(
              `${exp.id.toString().padEnd(4)}| ${exp.category.padEnd(10)}| ₦${exp.amount.toString().padEnd(9)}| ${exp.desc}`
            );
          });
        }
        break;
      case "add":
        if (args.length < 3) {
          newOutput.push(
            "❌ Error: Invalid syntax.",
            "Usage: add <amount> <category> <description>",
            "Example: add 1500 Food Suya"
          );
        } else {
          const amt = parseFloat(args[0]);
          const cat = args[1];
          const desc = args.slice(2).join(" ");

          if (isNaN(amt) || amt <= 0) {
            newOutput.push("❌ Error: Amount must be a positive number.");
          } else {
            const newExp = {
              id: expenses.length > 0 ? Math.max(...expenses.map((e) => e.id)) + 1 : 1,
              desc,
              amount: amt,
              category: cat,
            };
            setExpenses((prev) => [...prev, newExp]);
            newOutput.push(`✅ Added: ${desc} (₦${amt}) categorized under '${cat}'`);
          }
        }
        break;
      case "total":
        const grandTotal = expenses.reduce((sum, e) => sum + e.amount, 0);
        const categories = expenses.reduce((acc, e) => {
          acc[e.category] = (acc[e.category] || 0) + e.amount;
          return acc;
        }, {} as Record<string, number>);

        newOutput.push("📊 BUDGET SUMMARY REPORT:");
        newOutput.push("=========================");
        Object.keys(categories).forEach((cat) => {
          const sum = categories[cat];
          const pct = ((sum / grandTotal) * 100).toFixed(0);
          newOutput.push(`• [${cat.padEnd(10)}] : ₦${sum.toLocaleString()} (${pct}%)`);
        });
        newOutput.push("-------------------------");
        newOutput.push(`Grand Total Spent : ₦${grandTotal.toLocaleString()}`);
        if (grandTotal > 8000) {
          newOutput.push("⚠️ Alert: High student spending detected this cycle!");
        } else {
          newOutput.push("🟢 Spending is within healthy student thresholds.");
        }
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      case "reset":
        setExpenses([
          { id: 1, desc: "Sokale Keke Ride", amount: 400, category: "Transport" },
          { id: 2, desc: "Miva Study Data", amount: 1200, category: "Internet" },
          { id: 3, desc: "Suya Dinner", amount: 1500, category: "Food" },
        ]);
        newOutput.push("🔄 Sample Abuja student records restored.");
        break;
      default:
        newOutput.push(`command not found: ${command}. Type 'help' for support.`);
    }

    setHistory((prev) => [...prev, ...newOutput, ""]);
    setInput("");
  };

  return (
    <div className="bg-[#0c0c0c] rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden font-mono text-xs h-[380px] flex flex-col">
      {/* Terminal Header */}
      <div className="bg-zinc-950 px-4 py-3 flex items-center justify-between border-b border-zinc-850">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-zinc-400" />
          <span className="text-zinc-300 text-[11px] font-semibold">rebecca_budget_tracker.py</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-800 block"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-700 block"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-600 block"></span>
        </div>
      </div>

      {/* Terminal History */}
      <div className="flex-1 overflow-y-auto p-5 space-y-1.5 text-zinc-300 selection:bg-zinc-800">
        {history.map((line, idx) => (
          <div key={idx} className="whitespace-pre-wrap leading-relaxed">
            {line.startsWith("rebecca@miva:") ? (
              <span className="text-zinc-100 font-semibold">{line}</span>
            ) : line.startsWith("❌") ? (
              <span className="text-zinc-400 font-medium">{line}</span>
            ) : line.startsWith("✅") ? (
              <span className="text-zinc-200 font-semibold">{line}</span>
            ) : (
              line
            )}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Terminal Input Form */}
      <form onSubmit={handleCommand} className="bg-zinc-950 p-2.5 flex items-center border-t border-zinc-900">
        <span className="text-zinc-400 px-2 font-medium">rebecca@miva:~$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="type 'help', 'list', 'total', or custom command..."
          className="flex-1 bg-transparent text-zinc-100 outline-none border-none py-1 focus:ring-0 placeholder-zinc-700 font-mono text-xs"
          autoFocus={false}
        />
        <button
          type="submit"
          className="p-1 px-3 rounded-lg bg-zinc-900 hover:bg-zinc-850 text-zinc-300 text-xs border border-zinc-800 flex items-center gap-1 transition"
        >
          <Play className="w-3 h-3 text-zinc-400" /> Run
        </button>
      </form>
    </div>
  );
}

// ==========================================
// 2. ABUJA ROUTE OPTIMIZER SIMULATOR
// ==========================================
interface MapNode {
  id: string;
  name: string;
  x: number; // grid coords %
  y: number;
}

const ABUJA_NODES: MapNode[] = [
  { id: "sokale", name: "Dutse Sokale (Home)", x: 20, y: 15 },
  { id: "dutse_junction", name: "Dutse Junction", x: 45, y: 22 },
  { id: "gwarinpa", name: "Gwarinpa Estate", x: 25, y: 55 },
  { id: "miva_hq", name: "Miva University Campus", x: 75, y: 40 },
  { id: "wuse", name: "Wuse II CBD", x: 60, y: 75 },
  { id: "garki", name: "Garki District", x: 85, y: 85 },
];

// Connectivity and weights (distance and traffic status)
const ROUTES_MAP: Record<string, { to: string; distance: number; traffic: "light" | "moderate" | "heavy" }[]> = {
  sokale: [{ to: "dutse_junction", distance: 4, traffic: "moderate" }],
  dutse_junction: [
    { to: "sokale", distance: 4, traffic: "moderate" },
    { to: "gwarinpa", distance: 8, traffic: "heavy" },
    { to: "miva_hq", distance: 12, traffic: "light" },
  ],
  gwarinpa: [
    { to: "dutse_junction", distance: 8, traffic: "heavy" },
    { to: "wuse", distance: 9, traffic: "moderate" },
    { to: "miva_hq", distance: 10, traffic: "light" },
  ],
  miva_hq: [
    { to: "dutse_junction", distance: 12, traffic: "light" },
    { to: "gwarinpa", distance: 10, traffic: "light" },
    { to: "wuse", distance: 7, traffic: "moderate" },
    { to: "garki", distance: 8, traffic: "light" },
  ],
  wuse: [
    { to: "gwarinpa", distance: 9, traffic: "moderate" },
    { to: "miva_hq", distance: 7, traffic: "moderate" },
    { to: "garki", distance: 5, traffic: "heavy" },
  ],
  garki: [
    { to: "miva_hq", distance: 8, traffic: "light" },
    { to: "wuse", distance: 5, traffic: "heavy" },
  ],
};

export function AbujaRouteDemo() {
  const [startNode, setStartNode] = useState("sokale");
  const [endNode, setEndNode] = useState("miva_hq");
  const [isSolving, setIsSolving] = useState(false);
  const [result, setResult] = useState<{ path: string[]; distance: number; logs: string[] } | null>(null);

  const handleSolve = () => {
    if (startNode === endNode) {
      setResult({
        path: [startNode],
        distance: 0,
        logs: ["📍 Start and end destinations are the same! No computation needed."],
      });
      return;
    }

    setIsSolving(true);
    const logs: string[] = [];
    logs.push(`🔍 Initializing Dijkstra shortest-path calculations...`);
    logs.push(`📍 From: ${ABUJA_NODES.find((n) => n.id === startNode)?.name}`);
    logs.push(`📍 To: ${ABUJA_NODES.find((n) => n.id === endNode)?.name}`);

    setTimeout(() => {
      const distances: Record<string, number> = {};
      const previous: Record<string, string | null> = {};
      const queue: string[] = [];

      ABUJA_NODES.forEach((node) => {
        distances[node.id] = Infinity;
        previous[node.id] = null;
        queue.push(node.id);
      });

      distances[startNode] = 0;
      logs.push(`🚦 Setting initial node weights. Node [${startNode}] distance = 0. Others = ∞`);

      while (queue.length > 0) {
        queue.sort((a, b) => distances[a] - distances[b]);
        const current = queue.shift()!;

        logs.push(`🚶 Visiting Node [${current}] (Current known distance: ${distances[current]} km)`);

        if (current === endNode) {
          logs.push(`🎯 Target node [${endNode}] reached!`);
          break;
        }

        if (distances[current] === Infinity) {
          break;
        }

        const neighbors = ROUTES_MAP[current] || [];
        neighbors.forEach((route) => {
          if (!queue.includes(route.to)) return;

          let trafficPenalty = 1.0;
          if (route.traffic === "moderate") trafficPenalty = 1.25;
          if (route.traffic === "heavy") trafficPenalty = 1.75;

          const calculatedCost = route.distance * trafficPenalty;
          const alt = distances[current] + calculatedCost;

          logs.push(
            `  ➜ Checking path to [${route.to}]. Raw dist: ${route.distance}km, Traffic: ${route.traffic}. Adjusted cost: ${calculatedCost.toFixed(1)}`
          );

          if (alt < distances[route.to]) {
            distances[route.to] = alt;
            previous[route.to] = current;
            logs.push(`  ⭐️ Found a faster route to [${route.to}] with total cost: ${alt.toFixed(1)}`);
          }
        });
      }

      const path: string[] = [];
      let curr: string | null = endNode;
      while (curr !== null) {
        path.unshift(curr);
        curr = previous[curr];
      }

      setResult({
        path,
        distance: Number(distances[endNode].toFixed(1)),
        logs: [...logs, `🏁 Shortest path resolved successfully: ${path.join(" ➔ ")}`],
      });
      setIsSolving(false);
    }, 1200);
  };

  useEffect(() => {
    handleSolve();
  }, [startNode, endNode]);

  return (
    <div className="bg-zinc-950 rounded-2xl border border-zinc-800/80 overflow-hidden text-xs flex flex-col h-[400px] lg:h-[420px]">
      <div className="bg-zinc-900/60 px-4 py-3 flex items-center justify-between border-b border-zinc-850">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-zinc-400" />
          <span className="font-display font-medium text-zinc-200 text-xs">Abuja Route Solver (Graph Theory Demo)</span>
        </div>
        <div className="text-[9px] font-mono text-zinc-400 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800">
          CSS 121 (Level 100)
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
        {/* Interactive map visualization */}
        <div className="md:col-span-7 bg-[#080808] relative p-4 flex flex-col justify-between border-r border-zinc-850 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px]"></div>

          <div className="relative z-10 text-[10px] text-zinc-500 flex justify-between">
            <span>🌍 Abuja Regional Node Grid</span>
            <span>Scale 1:100,000</span>
          </div>

          {/* Render Nodes */}
          <div className="relative flex-1 min-h-[160px] my-2">
            {/* Draw Routes connections */}
            {Object.entries(ROUTES_MAP).map(([fromId, connections]) => {
              const fromNode = ABUJA_NODES.find((n) => n.id === fromId);
              if (!fromNode) return null;

              return connections.map((conn, cIdx) => {
                const toNode = ABUJA_NODES.find((n) => n.id === conn.to);
                if (!toNode) return null;

                if (fromId.localeCompare(conn.to) > 0) return null;

                let isHighlighted = false;
                if (result?.path) {
                  const pIdx1 = result.path.indexOf(fromId);
                  const pIdx2 = result.path.indexOf(conn.to);
                  isHighlighted = pIdx1 !== -1 && pIdx2 !== -1 && Math.abs(pIdx1 - pIdx2) === 1;
                }

                return (
                  <svg key={`${fromId}-${conn.to}-${cIdx}`} className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                    <line
                      x1={`${fromNode.x}%`}
                      y1={`${fromNode.y}%`}
                      x2={`${toNode.x}%`}
                      y2={`${toNode.y}%`}
                      stroke={isHighlighted ? "#ffffff" : "#27272a"}
                      strokeWidth={isHighlighted ? "2.5" : "1"}
                      strokeDasharray={conn.traffic === "heavy" ? "3 3" : undefined}
                      className={isHighlighted ? "animate-pulse" : ""}
                    />
                  </svg>
                );
              });
            })}

            {/* Render node circles */}
            {ABUJA_NODES.map((node) => {
              const isStart = node.id === startNode;
              const isEnd = node.id === endNode;
              const isInPath = result?.path.includes(node.id);

              return (
                <button
                  key={node.id}
                  onClick={() => {
                    if (isStart) return;
                    setEndNode(node.id);
                  }}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
                >
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all duration-300 ${
                      isStart
                        ? "bg-zinc-100 border-zinc-100 text-zinc-950 scale-110"
                        : isEnd
                        ? "bg-zinc-100 border-zinc-300 text-zinc-900 scale-110"
                        : isInPath
                        ? "bg-zinc-800 border-zinc-500 text-zinc-200"
                        : "bg-zinc-950 border-zinc-800 text-zinc-500 hover:border-zinc-600"
                    }`}
                  >
                    <MapPin className="w-3 h-3" />
                  </div>
                  <span className="absolute left-1/2 -translate-x-1/2 top-6 whitespace-nowrap bg-zinc-950/95 border border-zinc-850 text-[9px] text-zinc-400 px-1.5 py-0.5 rounded shadow opacity-80 group-hover:opacity-100 transition pointer-events-none">
                    {node.name.split(" ")[0]}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-850 space-y-2 z-10">
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs justify-between">
              <label className="flex items-center gap-1.5 text-zinc-400">
                <span className="w-2 h-2 rounded-full bg-zinc-400"></span> Start Node:
                <select
                  value={startNode}
                  onChange={(e) => setStartNode(e.target.value)}
                  className="bg-zinc-900 border border-zinc-800 rounded-md text-zinc-200 py-0.5 px-1.5 font-sans text-[11px] outline-none focus:border-zinc-600"
                >
                  {ABUJA_NODES.map((n) => (
                    <option key={n.id} value={n.id}>
                      {n.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex items-center gap-1.5 text-zinc-400">
                <span className="w-2 h-2 rounded-full bg-zinc-100"></span> Target Node:
                <select
                  value={endNode}
                  onChange={(e) => setEndNode(e.target.value)}
                  className="bg-zinc-900 border border-zinc-800 rounded-md text-zinc-200 py-0.5 px-1.5 font-sans text-[11px] outline-none focus:border-zinc-600"
                >
                  {ABUJA_NODES.map((n) => (
                    <option key={n.id} value={n.id}>
                      {n.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        </div>

        {/* Console outputs and metrics */}
        <div className="md:col-span-5 bg-[#090909] p-4 flex flex-col h-full font-mono text-[10px] overflow-hidden">
          <div className="text-zinc-500 font-bold border-b border-zinc-850 pb-1.5 mb-2 flex items-center justify-between">
            <span>Dijkstra Execution Logs</span>
            <button
              onClick={handleSolve}
              className="text-zinc-300 hover:text-white transition p-0.5"
              title="Re-run calculation"
              disabled={isSolving}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSolving ? "animate-spin" : ""}`} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-1 text-zinc-450 mb-2 selection:bg-zinc-800 pr-1">
            {isSolving ? (
              <div className="text-zinc-400 animate-pulse py-2">⚡ Processing graphs and calculating shortest weights...</div>
            ) : (
              result?.logs.map((log, lIdx) => (
                <div
                  key={lIdx}
                  className={`leading-relaxed border-l pl-1.5 ${
                    log.startsWith("🏁")
                      ? "text-zinc-100 border-zinc-300 font-semibold"
                      : log.startsWith("  ⭐️")
                      ? "text-zinc-300 border-zinc-500"
                      : "border-zinc-850 text-zinc-400"
                  }`}
                >
                  {log}
                </div>
              ))
            )}
          </div>

          {result && !isSolving && (
            <div className="mt-auto bg-zinc-950 border border-zinc-850 p-3 rounded-xl space-y-1.5">
              <div className="text-zinc-400 flex justify-between font-sans font-medium text-xs">
                <span>Calculated Path Weight:</span>
                <span className="text-zinc-100 font-mono font-bold">{result.distance} km</span>
              </div>
              <div className="flex items-center gap-1 flex-wrap">
                {result.path.map((nodeId, pIdx) => {
                  const node = ABUJA_NODES.find((n) => n.id === nodeId);
                  return (
                    <React.Fragment key={nodeId}>
                      <span className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded text-[9px]">
                        {node?.name.split(" ")[0]}
                      </span>
                      {pIdx < result.path.length - 1 && <ChevronRight className="w-3 h-3 text-zinc-700" />}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. MIVA UNIVERSITY STUDY PLANNER & TASK TRACKER
// ==========================================
interface StudyTask {
  id: string;
  courseCode: string;
  taskTitle: string;
  durationHours: number;
  priority: "High" | "Medium" | "Low";
  completed: boolean;
}

export function MivaStudyPlannerDemo() {
  const [tasks, setTasks] = useState<StudyTask[]>([
    { id: "1", courseCode: "CSS 121", taskTitle: "Review Dijkstra's shortest path algorithm complexity", durationHours: 2, priority: "High", completed: false },
    { id: "2", courseCode: "CSS 122", taskTitle: "Construct truth tables for XOR logic gates", durationHours: 1.5, priority: "Medium", completed: true },
    { id: "3", courseCode: "MTH 112", taskTitle: "Practice calculus integration exercises", durationHours: 3, priority: "High", completed: false },
    { id: "4", courseCode: "GST 111", taskTitle: "Outline technical report assignment", durationHours: 1, priority: "Low", completed: false },
  ]);

  const [newCode, setNewCode] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newHours, setNewHours] = useState(1);
  const [newPriority, setNewPriority] = useState<"High" | "Medium" | "Low">("Medium");

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTask: StudyTask = {
      id: Date.now().toString(),
      courseCode: newCode.trim().toUpperCase() || "CSS 100",
      taskTitle: newTitle.trim(),
      durationHours: Number(newHours) || 1,
      priority: newPriority,
      completed: false,
    };

    setTasks((prev) => [...prev, newTask]);
    setNewCode("");
    setNewTitle("");
    setNewHours(1);
    setNewPriority("Medium");
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const removeTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const totalHours = tasks.filter((t) => !t.completed).reduce((sum, t) => sum + t.durationHours, 0);
  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="bg-zinc-950 rounded-2xl border border-zinc-800 shadow-xl overflow-hidden text-sm flex flex-col lg:h-[400px]">
      <div className="bg-zinc-900/60 px-4 py-3 flex items-center justify-between border-b border-zinc-850">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-zinc-400" />
          <span className="font-display font-medium text-zinc-200 text-xs">Miva University Study Planner & Task Tracker</span>
        </div>
        <span className="text-[9px] font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded">
          Study Tracker Simulator
        </span>
      </div>

      <div className="flex-1 p-5 grid grid-cols-1 lg:grid-cols-12 gap-5 overflow-hidden">
        {/* Left Column - Add and Summary */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <form onSubmit={addTask} className="space-y-3 bg-[#0c0c0c] p-4 rounded-xl border border-zinc-800/80">
            <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Plan Study Task</div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[9px] text-zinc-400 block mb-1">Course Code</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CSS 121"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-xs text-zinc-200 outline-none focus:border-zinc-500 font-mono uppercase"
                />
              </div>
              <div>
                <label className="text-[9px] text-zinc-400 block mb-1">Task Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Solve limit formulas"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-xs text-zinc-200 outline-none focus:border-zinc-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[9px] text-zinc-400 block mb-1">Duration (Hours)</label>
                <select
                  value={newHours}
                  onChange={(e) => setNewHours(Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-xs text-zinc-200 outline-none focus:border-zinc-500 font-sans"
                >
                  <option value={0.5}>30 Min</option>
                  <option value={1}>1 Hour</option>
                  <option value={1.5}>1.5 Hours</option>
                  <option value={2}>2 Hours</option>
                  <option value={3}>3 Hours</option>
                  <option value={4}>4 Hours</option>
                </select>
              </div>
              <div>
                <label className="text-[9px] text-zinc-400 block mb-1">Priority</label>
                <select
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value as any)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-xs text-zinc-200 outline-none focus:border-zinc-500 font-sans"
                >
                  <option value="High">🔴 High Priority</option>
                  <option value="Medium">🟡 Medium</option>
                  <option value="Low">🟢 Low Priority</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-950 font-semibold text-xs flex items-center justify-center gap-1 transition"
            >
              <Plus className="w-3.5 h-3.5" /> Add Study Task
            </button>
          </form>

          {/* Time Budget summary card */}
          <div className="bg-zinc-900/40 p-4 rounded-xl border border-zinc-800 flex items-center justify-between shadow-inner">
            <div className="space-y-1">
              <div className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider">Remaining Study Time</div>
              <div className="text-3xl font-display font-black leading-none text-zinc-100">{totalHours} <span className="text-xs text-zinc-500 font-normal">hrs</span></div>
              <div className="text-[11px] text-zinc-400 font-medium truncate max-w-[180px]">{completedCount} tasks completed</div>
            </div>
            <div className="text-right space-y-1 text-zinc-400 text-xs border-l border-zinc-850 pl-4">
              <div>Total Tasks: <span className="text-zinc-100 font-mono font-semibold">{tasks.length}</span></div>
              <div>Done: <span className="text-zinc-100 font-mono font-semibold">{completedCount}</span></div>
              <div className="text-[10px] text-zinc-500 font-medium font-sans">Active Semester 2</div>
            </div>
          </div>
        </div>

        {/* Right Column - Tasks List */}
        <div className="lg:col-span-7 flex flex-col h-[200px] lg:h-full overflow-hidden">
          <div className="text-[11px] font-bold text-zinc-400 mb-2 uppercase tracking-wider flex justify-between items-center">
            <span>Course Tasks Log</span>
            <span className="text-[10px] text-zinc-500 lowercase font-mono">{tasks.length} items listed</span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-1.5 border border-zinc-850 bg-[#080808] rounded-xl p-3">
            {tasks.length === 0 ? (
              <div className="h-full flex items-center justify-center text-zinc-500 text-xs italic py-8">
                No tasks logged. Add some study sessions above!
              </div>
            ) : (
              tasks.map((task) => (
                <div
                  key={task.id}
                  className={`border p-3 rounded-lg flex items-center justify-between transition-colors group ${
                    task.completed 
                      ? "bg-zinc-900/5 border-zinc-900/40 opacity-60" 
                      : "bg-zinc-900/10 hover:bg-zinc-900/30 border-zinc-800/60"
                  }`}
                >
                  <div className="space-y-1 flex-1 mr-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-[9px] font-bold text-zinc-300 bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 rounded">
                        {task.courseCode}
                      </span>
                      <span className={`text-xs font-medium line-clamp-1 ${task.completed ? "line-through text-zinc-500" : "text-zinc-250"}`}>
                        {task.taskTitle}
                      </span>
                    </div>
                    <div className="text-[10px] text-zinc-500 flex items-center gap-2">
                      <span>{task.durationHours} hrs estimated</span>
                      <span>•</span>
                      <span className={task.priority === "High" ? "text-zinc-400" : "text-zinc-500"}>
                        {task.priority} Priority
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => toggleTask(task.id)}
                      className={`text-[10px] px-2.5 py-1 rounded border font-medium transition ${
                        task.completed
                          ? "bg-zinc-900 border-zinc-850 text-zinc-500 hover:bg-zinc-850 hover:text-zinc-400"
                          : "bg-zinc-100 border-zinc-200 text-zinc-950 hover:bg-zinc-200"
                      }`}
                    >
                      {task.completed ? "Completed" : "Mark Done"}
                    </button>
                    <button
                      onClick={() => removeTask(task.id)}
                      className="text-zinc-600 hover:text-zinc-300 p-1 opacity-0 group-hover:opacity-100 transition duration-200"
                      title="Delete task"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. RIGHT-ANGLED TRIANGLE CHECKER
// ==========================================
export function RightAngledTriangleDemo() {
  const [sideA, setSideA] = useState("3");
  const [sideB, setSideB] = useState("4");
  const [sideC, setSideC] = useState("5");
  const [result, setResult] = useState<{
    isValid: boolean;
    isRight: boolean;
    explanation: string;
    angles: { A: number; B: number; C: number };
    coords: { x1: number; y1: number; x2: number; y2: number; x3: number; y3: number } | null;
  } | null>(null);

  const calculateTriangle = (sa: string, sb: string, sc: string) => {
    const a = parseFloat(sa);
    const b = parseFloat(sb);
    const c = parseFloat(sc);

    if (isNaN(a) || isNaN(b) || isNaN(c) || a <= 0 || b <= 0 || c <= 0) {
      setResult({
        isValid: false,
        isRight: false,
        explanation: "Please enter positive numerical values for all three sides.",
        angles: { A: 0, B: 0, C: 0 },
        coords: null
      });
      return;
    }

    // Sort sides to verify triangle inequality and hypotenuse
    const sides = [a, b, c].sort((x, y) => x - y);
    const [x, y, z] = sides;

    // Check triangle inequality theorem
    if (x + y <= z) {
      setResult({
        isValid: false,
        isRight: false,
        explanation: `Invalid Triangle: Side lengths ${x}, ${y}, and ${z} do not satisfy the triangle inequality theorem (the sum of any two sides must be strictly greater than the third side: ${x} + ${y} = ${x+y} ≤ ${z}).`,
        angles: { A: 0, B: 0, C: 0 },
        coords: null
      });
      return;
    }

    // Check if right-angled: x^2 + y^2 ≈ z^2
    const lhs = x * x + y * y;
    const rhs = z * z;
    const diff = Math.abs(lhs - rhs);
    const isRight = diff < 0.001; // epsilon for float accuracy

    // Calculate angles using Law of Cosines (in degrees)
    // cos(A) = (b^2 + c^2 - a^2) / (2bc)
    const radA = Math.acos(Math.max(-1, Math.min(1, (b*b + c*c - a*a) / (2*b*c))));
    const radB = Math.acos(Math.max(-1, Math.min(1, (a*a + c*c - b*b) / (2*a*c))));
    const radC = Math.acos(Math.max(-1, Math.min(1, (a*a + b*b - c*c) / (2*a*b))));

    const degA = (radA * 180) / Math.PI;
    const degB = (radB * 180) / Math.PI;
    const degC = (radC * 180) / Math.PI;

    // Scale coordinates for plotting
    // Base is side 'z' (longest side), drawn from (0,0) to (z, 0)
    // alpha is the angle between side 'y' and side 'z' (opposite to side 'x')
    // cosAlpha = (y^2 + z^2 - x^2) / (2yz)
    const cosAlpha = (y*y + z*z - x*x) / (2*y*z);
    const alpha = Math.acos(Math.max(-1, Math.min(1, cosAlpha)));

    const x1 = 0;
    const y1 = 0;
    const x2 = z;
    const y2 = 0;
    const x3 = y * Math.cos(alpha);
    const y3 = y * Math.sin(alpha);

    // Scaling container dimensions
    const padding = 20;
    const svgW = 220;
    const svgH = 150;

    const minX = Math.min(0, x2, x3);
    const maxX = Math.max(0, x2, x3);
    const minY = Math.min(0, y2, y3);
    const maxY = Math.max(0, y2, y3);

    const triW = maxX - minX;
    const triH = maxY - minY;

    const scaleX = (svgW - 2 * padding) / (triW || 1);
    const scaleY = (svgH - 2 * padding) / (triH || 1);
    const scale = Math.min(scaleX, scaleY);

    const tx = padding - minX * scale;
    const ty = svgH - padding;

    const px1 = x1 * scale + tx;
    const py1 = ty - y1 * scale;
    const px2 = x2 * scale + tx;
    const py2 = ty - y2 * scale;
    const px3 = x3 * scale + tx;
    const py3 = ty - y3 * scale;

    const formattedExplanation = isRight
      ? `Yes! This forms a Right-Angled Triangle. It satisfies Pythagoras' theorem: ${x}² + ${y}² = ${z}² (${x*x} + ${y*y} = ${z*z}).`
      : `No, this is not a Right-Angled Triangle. ${x}² + ${y}² (${x*x + y*y}) is not equal to ${z}² (${z*z}). The mismatch delta is ${diff.toFixed(2)}.`;

    setResult({
      isValid: true,
      isRight,
      explanation: formattedExplanation,
      angles: { A: degA, B: degB, C: degC },
      coords: { x1: px1, y1: py1, x2: px2, y2: py2, x3: px3, y3: py3 }
    });
  };

  useEffect(() => {
    calculateTriangle(sideA, sideB, sideC);
  }, [sideA, sideB, sideC]);

  const loadPreset = (a: string, b: string, c: string) => {
    setSideA(a);
    setSideB(b);
    setSideC(c);
  };

  return (
    <div className="bg-zinc-950 rounded-2xl border border-zinc-800 shadow-xl overflow-hidden text-sm flex flex-col lg:h-[400px]">
      {/* Top bar */}
      <div className="bg-zinc-950 px-4 py-3 border-b border-zinc-900 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Triangle className="w-4 h-4 text-zinc-400" />
          <span className="font-display font-medium text-zinc-200 text-xs">Right-Angled Triangle Checker</span>
        </div>
        <span className="text-[9px] font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded">
          Geometry Simulator
        </span>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 p-4 gap-4 overflow-y-auto">
        {/* Left column - input & presets */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div className="space-y-3 bg-[#0c0c0c] p-4 rounded-xl border border-zinc-800/80 font-sans">
            <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Input Triplet Sides</div>
            
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-[9px] text-zinc-500 block mb-1">Side A</label>
                <input
                  type="number"
                  min="0.1"
                  step="any"
                  value={sideA}
                  onChange={(e) => setSideA(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-xs text-zinc-200 outline-none focus:border-zinc-500 font-mono"
                />
              </div>
              <div>
                <label className="text-[9px] text-zinc-500 block mb-1">Side B</label>
                <input
                  type="number"
                  min="0.1"
                  step="any"
                  value={sideB}
                  onChange={(e) => setSideB(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-xs text-zinc-200 outline-none focus:border-zinc-500 font-mono"
                />
              </div>
              <div>
                <label className="text-[9px] text-zinc-500 block mb-1">Side C</label>
                <input
                  type="number"
                  min="0.1"
                  step="any"
                  value={sideC}
                  onChange={(e) => setSideC(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-xs text-zinc-200 outline-none focus:border-zinc-500 font-mono"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-zinc-900/80">
              <div className="text-[9px] text-zinc-500 uppercase tracking-wider mb-1.5 font-semibold">Triangular Presets</div>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => loadPreset("3", "4", "5")}
                  className="text-[10px] px-2 py-1 bg-zinc-900 hover:bg-zinc-850 text-zinc-300 border border-zinc-800 rounded transition font-mono"
                >
                  3, 4, 5 (Right)
                </button>
                <button
                  onClick={() => loadPreset("5", "12", "13")}
                  className="text-[10px] px-2 py-1 bg-zinc-900 hover:bg-zinc-850 text-zinc-300 border border-zinc-800 rounded transition font-mono"
                >
                  5, 12, 13 (Right)
                </button>
                <button
                  onClick={() => loadPreset("6", "8", "10")}
                  className="text-[10px] px-2 py-1 bg-zinc-900 hover:bg-zinc-850 text-zinc-300 border border-zinc-800 rounded transition font-mono"
                >
                  6, 8, 10 (Right)
                </button>
                <button
                  onClick={() => loadPreset("4", "5", "6")}
                  className="text-[10px] px-2 py-1 bg-zinc-900 hover:bg-zinc-850 text-zinc-300 border border-zinc-800 rounded transition font-mono"
                >
                  4, 5, 6 (Acute)
                </button>
                <button
                  onClick={() => loadPreset("2", "3", "7")}
                  className="text-[10px] px-2 py-1 bg-zinc-900 hover:bg-zinc-850 text-zinc-300 border border-zinc-800 rounded transition font-mono"
                >
                  2, 3, 7 (Invalid)
                </button>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/40 p-3 rounded-xl border border-zinc-800/80 flex items-center gap-2.5">
            <HelpCircle className="w-4 h-4 text-zinc-500 flex-shrink-0" />
            <div className="text-[10px] text-zinc-400 font-mono leading-normal">
              Pythagorean theorem asserts that for any right triangle, the sum of squares of the shorter legs equals the hypotenuse square (<span className="text-zinc-200">a² + b² = c²</span>).
            </div>
          </div>
        </div>

        {/* Right column - interactive render & result explanation */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-3">
          {/* Visual Canvas Panel */}
          <div className="flex-1 bg-[#080808] border border-zinc-850 rounded-xl p-3 flex flex-col items-center justify-center relative min-h-[160px] lg:min-h-0">
            {result?.isValid && result.coords ? (
              <svg width="220" height="150" className="overflow-visible">
                {/* Connecting grid line path */}
                <polygon
                  points={`${result.coords.x1},${result.coords.y1} ${result.coords.x2},${result.coords.y2} ${result.coords.x3},${result.coords.y3}`}
                  className={`fill-zinc-900/40 stroke-2 transition-all duration-350 ${
                    result.isRight ? "stroke-zinc-100" : "stroke-zinc-700"
                  }`}
                />

                {/* Vertex Dots */}
                <circle cx={result.coords.x1} cy={result.coords.y1} r="4" className="fill-zinc-400 stroke stroke-zinc-950 stroke-2" />
                <circle cx={result.coords.x2} cy={result.coords.y2} r="4" className="fill-zinc-400 stroke stroke-zinc-950 stroke-2" />
                <circle cx={result.coords.x3} cy={result.coords.y3} r="4" className="fill-zinc-200 stroke stroke-zinc-950 stroke-2 animate-pulse" />

                {/* Label angles */}
                <text x={result.coords.x1 + 6} y={result.coords.y1 - 6} className="fill-zinc-500 font-mono text-[9px]">
                  {result.angles.A.toFixed(1)}°
                </text>
                <text x={result.coords.x2 - 25} y={result.coords.y2 - 6} className="fill-zinc-500 font-mono text-[9px]">
                  {result.angles.B.toFixed(1)}°
                </text>
                <text x={result.coords.x3 - 10} y={result.coords.y3 + 12} className="fill-zinc-300 font-mono text-[9px] font-semibold">
                  {result.angles.C.toFixed(1)}°
                </text>
              </svg>
            ) : (
              <div className="text-zinc-600 text-xs text-center font-mono select-none px-4 space-y-1">
                <div>[ INVALID METRICS ]</div>
                <div className="text-[10px] text-zinc-700">Inputs must define a valid physical triangle</div>
              </div>
            )}
          </div>

          {/* Explanation Banner */}
          <div className={`p-3 rounded-xl border text-[11px] leading-relaxed font-sans ${
            result?.isValid 
              ? result.isRight 
                ? "bg-zinc-900/80 border-zinc-800 text-zinc-200"
                : "bg-zinc-900/20 border-zinc-900/60 text-zinc-400"
              : "bg-red-950/10 border-red-900/20 text-zinc-500"
          }`}>
            <div className="flex items-start gap-2">
              <CheckCircle2 className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${
                result?.isValid && result.isRight ? "text-zinc-300" : "text-zinc-600"
              }`} />
              <p>{result?.explanation}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 5. PALINDROME NUMBER CHECKER
// ==========================================
interface PalindromeStep {
  step: number;
  remaining: number;
  digit: number;
  currentReversed: number;
  formula: string;
}

export function PalindromeNumberDemo() {
  const [inputValue, setInputValue] = useState("121");
  const [steps, setSteps] = useState<PalindromeStep[]>([]);
  const [isPalindrome, setIsPalindrome] = useState<boolean>(true);
  const [reason, setReason] = useState<string>("");
  const [isNegative, setIsNegative] = useState<boolean>(false);
  const [hasTrailingZero, setHasTrailingZero] = useState<boolean>(false);

  const checkPalindrome = (valStr: string) => {
    const trimmed = valStr.trim();
    if (!trimmed) {
      setSteps([]);
      setIsPalindrome(false);
      setReason("Please enter an integer to verify.");
      setIsNegative(false);
      setHasTrailingZero(false);
      return;
    }

    const num = parseInt(trimmed, 10);
    if (isNaN(num) || trimmed.includes(".")) {
      setSteps([]);
      setIsPalindrome(false);
      setReason("Please enter a valid whole integer (decimals/text not allowed).");
      setIsNegative(false);
      setHasTrailingZero(false);
      return;
    }

    if (num < 0) {
      setIsNegative(true);
      setHasTrailingZero(false);
      setIsPalindrome(false);
      setReason(`No. Negative numbers are not palindromic. The minus sign '-' sits at the left end, so reversing "${trimmed}" becomes "${trimmed.split("").reverse().join("")}", which mismatches.`);
      setSteps([]);
      return;
    }

    if (num !== 0 && num % 10 === 0) {
      setIsNegative(false);
      setHasTrailingZero(true);
      setIsPalindrome(false);
      setReason(`No. Numbers ending in 0 (except 0 itself) cannot be palindromes because a standard positive integer cannot start with a leading 0 (e.g. reversing "${trimmed}" yields "0${trimmed.slice(0, -1).split("").reverse().join("")}", which loses its leading 0 as a number).`);
      setSteps([]);
      return;
    }

    setIsNegative(false);
    setHasTrailingZero(false);

    // Run modular arithmetic reverse simulation
    let temp = num;
    let reversed = 0;
    const computedSteps: PalindromeStep[] = [];
    let stepCount = 1;

    if (num === 0) {
      computedSteps.push({
        step: 1,
        remaining: 0,
        digit: 0,
        currentReversed: 0,
        formula: "0"
      });
    }

    while (temp > 0) {
      const digit = temp % 10;
      const prevReversed = reversed;
      reversed = reversed * 10 + digit;
      const nextTemp = Math.floor(temp / 10);

      computedSteps.push({
        step: stepCount,
        remaining: nextTemp,
        digit,
        currentReversed: reversed,
        formula: `${prevReversed} × 10 + ${digit} = ${reversed}`
      });

      temp = nextTemp;
      stepCount++;
    }

    setSteps(computedSteps);
    const isPal = reversed === num;
    setIsPalindrome(isPal);

    if (isPal) {
      setReason(`Yes! ${num} is a palindrome because reversing its digits via modulo arithmetic yields exactly ${reversed} (identical to original).`);
    } else {
      setReason(`No! ${num} is not a palindrome because reversing its digits yields ${reversed} (which is different from original).`);
    }
  };

  useEffect(() => {
    checkPalindrome(inputValue);
  }, [inputValue]);

  const loadPreset = (val: string) => {
    setInputValue(val);
  };

  // Split digits for horizontal visual comparison
  const originalDigits = inputValue.replace(/[^0-9-]/g, "").split("");
  const reversedDigits = [...originalDigits].reverse();

  return (
    <div className="bg-zinc-950 rounded-2xl border border-zinc-800 shadow-xl overflow-hidden text-sm flex flex-col lg:h-[400px]">
      {/* Top bar */}
      <div className="bg-zinc-950 px-4 py-3 border-b border-zinc-900 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Binary className="w-4 h-4 text-zinc-400" />
          <span className="font-display font-medium text-zinc-200 text-xs">Palindrome Number Checker</span>
        </div>
        <span className="text-[9px] font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded">
          Arithmetic Simulator
        </span>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 p-4 gap-4 overflow-y-auto">
        {/* Left column - input & presets */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4 font-sans">
          <div className="space-y-3 bg-[#0c0c0c] p-4 rounded-xl border border-zinc-800/80">
            <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Input Integer</div>
            
            <div>
              <label className="text-[9px] text-zinc-500 block mb-1">Enter a Whole Number</label>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value.replace(/[^0-9-]/g, ""))}
                placeholder="e.g. 12321"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-xs text-zinc-200 outline-none focus:border-zinc-500 font-mono tracking-wider"
              />
            </div>

            <div className="pt-2 border-t border-zinc-900/80">
              <div className="text-[9px] text-zinc-500 uppercase tracking-wider mb-1.5 font-semibold">Algorithmic Presets</div>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => loadPreset("121")}
                  className="text-[10px] px-2 py-1 bg-zinc-900 hover:bg-zinc-850 text-zinc-300 border border-zinc-800 rounded transition font-mono cursor-pointer"
                >
                  121 (Pal)
                </button>
                <button
                  onClick={() => loadPreset("12321")}
                  className="text-[10px] px-2 py-1 bg-zinc-900 hover:bg-zinc-850 text-zinc-300 border border-zinc-800 rounded transition font-mono cursor-pointer"
                >
                  12321 (Pal)
                </button>
                <button
                  onClick={() => loadPreset("-121")}
                  className="text-[10px] px-2 py-1 bg-zinc-900 hover:bg-zinc-850 text-zinc-300 border border-zinc-800 rounded transition font-mono cursor-pointer"
                >
                  -121 (Negative)
                </button>
                <button
                  onClick={() => loadPreset("1230")}
                  className="text-[10px] px-2 py-1 bg-zinc-900 hover:bg-zinc-850 text-zinc-300 border border-zinc-800 rounded transition font-mono cursor-pointer"
                >
                  1230 (Zero End)
                </button>
                <button
                  onClick={() => loadPreset("4554")}
                  className="text-[10px] px-2 py-1 bg-zinc-900 hover:bg-zinc-850 text-zinc-300 border border-zinc-800 rounded transition font-mono cursor-pointer"
                >
                  4554 (Even Pal)
                </button>
                <button
                  onClick={() => loadPreset("1234")}
                  className="text-[10px] px-2 py-1 bg-zinc-900 hover:bg-zinc-850 text-zinc-300 border border-zinc-800 rounded transition font-mono cursor-pointer"
                >
                  1234 (Regular)
                </button>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/40 p-3 rounded-xl border border-zinc-800/80 flex items-center gap-2.5">
            <ArrowLeftRight className="w-4 h-4 text-zinc-500 flex-shrink-0" />
            <div className="text-[10px] text-zinc-400 font-mono leading-normal">
              A purely mathematical method reverses digits by harvesting the lowest digit (<span className="text-zinc-200">num % 10</span>) and rebuilding the opposite structure incrementally.
            </div>
          </div>
        </div>

        {/* Right column - interactive render & result explanation */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-3">
          {/* Visual Digits Comparison Panel */}
          <div className="flex-1 bg-[#080808] border border-zinc-850 rounded-xl p-3.5 flex flex-col justify-center space-y-3.5 min-h-[160px] lg:min-h-0">
            {originalDigits.length > 0 ? (
              <div className="space-y-3">
                {/* Original digit boxes */}
                <div className="space-y-1">
                  <div className="text-[9px] uppercase tracking-wider text-zinc-500 font-mono font-semibold">Original Sequence:</div>
                  <div className="flex gap-1.5">
                    {originalDigits.map((dig, idx) => (
                      <div
                        key={`orig-${idx}`}
                        className={`w-7 h-7 rounded border font-mono text-xs font-bold flex items-center justify-center transition-colors ${
                          isPalindrome 
                            ? "bg-zinc-900/60 border-zinc-700 text-zinc-200" 
                            : "bg-zinc-950 border-zinc-850 text-zinc-400"
                        }`}
                      >
                        {dig}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Arrow indicator */}
                <div className="flex items-center gap-1.5 text-zinc-600 px-1">
                  <ArrowLeftRight className="w-3.5 h-3.5" />
                  <span className="text-[9px] font-mono">Reverse Check</span>
                </div>

                {/* Reversed digit boxes */}
                <div className="space-y-1">
                  <div className="text-[9px] uppercase tracking-wider text-zinc-500 font-mono font-semibold">Reversed Sequence:</div>
                  <div className="flex gap-1.5">
                    {reversedDigits.map((dig, idx) => {
                      const matches = originalDigits[idx] === dig;
                      return (
                        <div
                          key={`rev-${idx}`}
                          className={`w-7 h-7 rounded border font-mono text-xs font-bold flex items-center justify-center transition-colors ${
                            isPalindrome
                              ? "bg-zinc-900/80 border-zinc-700 text-zinc-100"
                              : matches && !isNegative && !hasTrailingZero
                                ? "bg-zinc-900/40 border-zinc-800 text-zinc-300"
                                : "bg-red-950/10 border-red-900/20 text-red-400"
                          }`}
                        >
                          {dig}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-zinc-600 text-xs text-center font-mono select-none py-4">
                [ NO DATA TO DISPLAY ]
              </div>
            )}

            {/* Step-by-Step execution trace */}
            {steps.length > 0 && (
              <div className="border-t border-zinc-900 pt-3">
                <div className="text-[9px] uppercase tracking-wider text-zinc-500 font-mono font-semibold mb-1.5">Trace of Modulo Loop:</div>
                <div className="max-h-[85px] overflow-y-auto space-y-1 pr-1 scrollbar-thin">
                  {steps.map((s) => (
                    <div key={s.step} className="flex justify-between items-center text-[10px] font-mono text-zinc-400 bg-zinc-900/30 px-2 py-1 rounded border border-zinc-900/50">
                      <div>
                        Step {s.step}: <span className="text-zinc-500">pop =</span> <span className="text-zinc-300 font-semibold">{s.digit}</span>
                      </div>
                      <div className="text-zinc-500">
                        rev: <span className="text-zinc-300">{s.formula}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Explanation Banner */}
          <div className={`p-3 rounded-xl border text-[11px] leading-relaxed font-sans ${
            inputValue.trim()
              ? isPalindrome 
                ? "bg-zinc-900/80 border-zinc-800 text-zinc-200"
                : "bg-zinc-900/20 border-zinc-900/60 text-zinc-400"
              : "bg-zinc-950 border-zinc-900 text-zinc-500"
          }`}>
            <div className="flex items-start gap-2">
              <CheckCircle2 className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${
                inputValue.trim() && isPalindrome ? "text-zinc-300" : "text-zinc-600"
              }`} />
              <p>{reason}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
