import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center bg-black px-6 text-center">
      <p className="text-xs uppercase tracking-[0.5em] text-amber-200/60">
        404
      </p>
      <h1 className="mt-4 text-4xl font-bold text-white">Page Not Found</h1>
      <p className="mt-3 text-sm text-slate-400">
        The air may be thick, but this page doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-black transition-all hover:bg-amber-300"
      >
        Return Home
      </Link>
    </main>
  );
}
