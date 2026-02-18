"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CallToAction() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500/20 via-red-500/10 to-purple-500/20 p-12 text-center border border-white/10"
    >
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20" />
      <h2 className="relative text-3xl font-bold text-white sm:text-4xl">
        Every Breath Matters
      </h2>
      <p className="relative mt-4 text-lg text-slate-200 max-w-2xl mx-auto">
        Get real-time protection plans for your family. Know when to go out,
        when to stay in, and how to minimize exposure.
      </p>
      <Link
        href="/dashboard"
        className="relative mt-8 inline-block rounded-full bg-amber-400 px-8 py-4 text-base font-semibold text-black transition-all hover:bg-amber-300 hover:scale-105 active:scale-95 shadow-xl shadow-amber-500/30"
      >
        Start Your Protection Plan →
      </Link>
    </motion.div>
  );
}
