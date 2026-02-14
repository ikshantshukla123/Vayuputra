"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function DashboardContent() {
	const searchParams = useSearchParams();
	const username = searchParams.get("username") || "Traveler";

	return (
		<div className="mx-auto flex w-full max-w-2xl flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
			<p className="text-xs uppercase tracking-[0.4em] text-amber-200/70">
				Dashboard
			</p>
			<h1 className="text-3xl font-semibold text-white">
				Welcome, {username}
			</h1>
			<p className="text-sm text-slate-300">
				Your pollution dashboard is loading...
			</p>
		</div>
	);
}

export default function DashboardPage() {
	return (
		<main className="flex min-h-[70vh] items-center justify-center bg-black px-6">
			<Suspense
				fallback={
					<p className="text-sm text-slate-500">Loading dashboard...</p>
				}
			>
				<DashboardContent />
			</Suspense>
		</main>
	);
}
