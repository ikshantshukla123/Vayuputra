"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface UsernameInputProps {
  username: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export default function UsernameInput({ username, onChange, onSubmit }: UsernameInputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.9 }}
      className="flex w-full max-w-xl flex-col gap-3"
    >
      <label htmlFor="username" className="text-sm font-medium text-slate-400">
        Enter your username to begin
      </label>
      <div
        className={`flex items-center gap-3 rounded-2xl border px-5 py-3 backdrop-blur-lg transition-all duration-300 ${
          focused
            ? "border-amber-400/60 bg-white/10 shadow-[0_0_30px_rgba(251,191,36,0.12)]"
            : "border-white/15 bg-white/5"
        }`}
      >
        <span className="text-lg text-slate-500">👤</span>
        <input
          id="username"
          type="text"
          value={username}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSubmit()}
          placeholder="e.g. Aanya"
          className="w-full bg-transparent text-base text-white outline-none placeholder:text-slate-500"
          aria-label="Username"
        />
        <button
          type="button"
          onClick={onSubmit}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-400 text-black shadow-lg shadow-amber-500/25 transition-all hover:bg-amber-300 hover:scale-105 active:scale-95"
          aria-label="Start journey"
        >
          <span className="text-lg font-semibold">→</span>
        </button>
      </div>
    </motion.div>
  );
}
