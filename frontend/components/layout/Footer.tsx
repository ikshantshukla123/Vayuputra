import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-6 py-10 sm:flex-row sm:justify-between sm:px-10">
        <div className="flex items-center gap-2 text-slate-400">
          <span className="text-lg">🌬️</span>
          <span className="text-sm tracking-[0.3em] font-semibold">
            VAYUPUTRA
          </span>
        </div>

        <nav className="flex gap-6 text-xs text-slate-500">
          <Link href="/how-it-works" className="transition hover:text-slate-300">
            How It Works
          </Link>
          <Link href="/reports" className="transition hover:text-slate-300">
            Reports
          </Link>
          <Link href="/dashboard" className="transition hover:text-slate-300">
            Dashboard
          </Link>
        </nav>

        <p className="text-xs text-slate-600">
          &copy; {new Date().getFullYear()} Vayuputra. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
