"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

const headlineWords = ["DELHI", "IS", "BREATHING", "POISON."];

export default function Hero() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [focused, setFocused] = useState(false);

  const handleSubmit = () => {
    const name = username.trim() || "Traveler";
    router.push(`/dashboard?username=${encodeURIComponent(name)}`);
  };

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-black text-white">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/child.jpg"
          alt="Child in Delhi smog"
          fill
          priority
          className="object-cover scale-105"
          style={{ objectPosition: "50% 30%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
      </div>

      {/* Animated smog glow */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_45%,rgba(148,163,184,0.12),transparent_55%)]"
        animate={{ opacity: [0.3, 0.55, 0.3], scale: [1, 1.08, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-amber-300/5 blur-3xl"
        animate={{ x: [0, 40, 0], opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-28 sm:px-10">
        {/* Brand line */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-end gap-4"
        >
          <span className="text-4xl font-bold tracking-[0.25em] bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent sm:text-5xl">
            VAYUPUTRA
          </span>
          <span className="mb-1 text-xl font-medium tracking-widest text-slate-400 sm:text-2xl">
            वायुपुत्र
          </span>
        </motion.div>

        {/* Sub-label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="-mt-6 text-xs uppercase tracking-[0.5em] text-amber-200/60 font-semibold"
        >
          AI-Powered Pollution Awareness
        </motion.p>

        {/* Animated headline — word by word */}
        <h1 className="-mt-2 flex flex-wrap gap-x-4 text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl">
          {headlineWords.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 + i * 0.12 }}
              className={word === "POISON." ? "text-red-400" : ""}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="-mt-4 max-w-2xl text-lg text-slate-300 sm:text-xl"
        >
          Predicts pollution before it harms you — and tells you what to do.
        </motion.p>

        {/* Username input */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="flex w-full max-w-xl flex-col gap-3"
        >
          <label
            htmlFor="username"
            className="text-sm font-medium text-slate-400"
          >
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
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="e.g. Aanya"
              className="w-full bg-transparent text-base text-white outline-none placeholder:text-slate-500"
              aria-label="Username"
            />
            <button
              type="button"
              onClick={handleSubmit}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-400 text-black shadow-lg shadow-amber-500/25 transition-all hover:bg-amber-300 hover:scale-105 active:scale-95"
              aria-label="Start journey"
            >
              <span className="text-lg font-semibold">→</span>
            </button>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-4 flex items-center gap-2 text-slate-500"
        >
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="text-lg"
          >
            ↓
          </motion.span>
          <span className="text-xs uppercase tracking-[0.3em]">Scroll to explore</span>
        </motion.div>
      </div>
    </section>
  );
}