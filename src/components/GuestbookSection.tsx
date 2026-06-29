import React, { useState, useEffect } from "react";
import { MessageSquare, Send, Sparkles } from "lucide-react";
import { GuestbookEntry } from "../types";

const INITIAL_ENTRIES: GuestbookEntry[] = [
  {
    id: "1",
    name: "Dr. Chidi Okonkwo",
    role: "Miva CS Faculty / Advisor",
    message: "Excellent initiative with this portfolio, Rebecca. Setting up interactive Dijkstra routing simulations and GPA analysis tools in Level 100 shows deep software curiosity. Keep maintaining this level of academic curiosity!",
    createdAt: "2026-06-15T10:30:00Z",
  },
  {
    id: "2",
    name: "Bashir Bello",
    role: "Level 100 Course Representative",
    message: "This is super neat! The Abuja Sokale to Miva HQ route map demo is spot on. Let's collaborate on the upcoming Java structures project next semester.",
    createdAt: "2026-06-22T14:45:00Z",
  },
  {
    id: "3",
    name: "Aisha Umar",
    role: "Miva Study Circle Peer",
    message: "Rebecca's explanation of algorithms makes MTH 112 much easier. Highly professional profile!",
    createdAt: "2026-06-28T09:15:00Z",
  },
];

export default function GuestbookSection() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("Visitor");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("rebecca_portfolio_guestbook");
    if (saved) {
      try {
        setEntries(JSON.parse(saved));
      } catch (e) {
        setEntries(INITIAL_ENTRIES);
      }
    } else {
      setEntries(INITIAL_ENTRIES);
      localStorage.setItem("rebecca_portfolio_guestbook", JSON.stringify(INITIAL_ENTRIES));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSending(true);

    setTimeout(() => {
      const newEntry: GuestbookEntry = {
        id: Date.now().toString(),
        name: name.trim(),
        role: role.trim() || "Visitor",
        message: message.trim(),
        createdAt: new Date().toISOString(),
      };

      const updated = [newEntry, ...entries];
      setEntries(updated);
      localStorage.setItem("rebecca_portfolio_guestbook", JSON.stringify(updated));

      setName("");
      setRole("Visitor");
      setMessage("");
      setIsSending(false);
      setAlertMsg("✨ Success! Your greeting was posted successfully.");
      
      setTimeout(() => setAlertMsg(""), 4000);
    }, 800);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="font-display font-light text-2xl text-zinc-100 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-zinc-400" />
            Digital Guestbook
          </h3>
          <p className="text-xs text-zinc-400 mt-1">Leave feedback, a word of advice, or connect with me.</p>
        </div>
        <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 bg-zinc-950 px-2.5 py-1 rounded border border-zinc-850 w-fit">
          Local Persistence
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Input Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-5 bg-zinc-900/10 p-5 rounded-2xl border border-zinc-800/80 space-y-4">
          <div className="text-xs font-bold text-zinc-300 uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-zinc-400" /> Sign the Guestbook
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-[10px] text-zinc-400 block mb-1 font-mono uppercase">Your Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Professor Smith"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-200 outline-none focus:border-zinc-500"
              />
            </div>

            <div>
              <label className="text-[10px] text-zinc-400 block mb-1 font-mono uppercase">Your Role / Affiliation</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-200 outline-none focus:border-zinc-500"
              >
                <option value="Visitor">Visitor / Friend</option>
                <option value="Miva Faculty">Miva University Faculty</option>
                <option value="Miva Student">Miva University Student</option>
                <option value="Recruiter">Tech Recruiter / Engineer</option>
                <option value="Abuja Resident">Abuja Resident</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] text-zinc-400 block mb-1 font-mono uppercase">Message</label>
              <textarea
                required
                rows={4}
                placeholder="Write your encouraging note or feedback here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-200 outline-none focus:border-zinc-500 resize-none"
              ></textarea>
            </div>
          </div>

          {alertMsg && (
            <div className="bg-zinc-800/50 border border-zinc-700/50 text-zinc-100 text-xs p-2 rounded-lg text-center">
              {alertMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={isSending}
            className="w-full py-2.5 px-4 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-950 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer disabled:opacity-50"
          >
            {isSending ? (
              <>Posting...</>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" /> Sign Guestbook
              </>
            )}
          </button>
        </form>

        {/* Entries Display */}
        <div className="lg:col-span-7 space-y-3 max-h-[380px] overflow-y-auto pr-2">
          {entries.length === 0 ? (
            <div className="text-center py-12 text-zinc-500 italic bg-zinc-900/10 rounded-xl border border-dashed border-zinc-800 text-xs">
              No entries yet. Be the first to leave a greeting!
            </div>
          ) : (
            entries.map((entry) => (
              <div
                key={entry.id}
                className="bg-zinc-900/10 hover:bg-zinc-900/20 border border-zinc-800/80 p-4 rounded-xl transition duration-300 space-y-2 relative overflow-hidden group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-100 border border-zinc-750 font-mono text-xs font-bold uppercase">
                      {entry.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-xs text-zinc-200">{entry.name}</div>
                      <div className="text-[10px] text-zinc-400 font-mono">{entry.role}</div>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono text-zinc-500">
                    {new Date(entry.createdAt).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed pl-10 whitespace-pre-wrap">{entry.message}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
