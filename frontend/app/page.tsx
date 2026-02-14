import Hero from "../components/Hero";
import FeatureCard from "../components/FeatureCard";
import FadeIn from "../components/FadeIn";
import { FEATURES } from "../lib/constants";

export const dynamic = "force-static";

export default function Home() {
  return (
    <main className="bg-black">
      <Hero />

      {/* Divider glow */}
      <div className="relative h-px w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />
      </div>

      <section className="relative bg-cinematic bg-grain py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black" />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 sm:px-10">
          <FadeIn className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.5em] text-amber-200/60">
              Core Capabilities
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
              Intelligence that turns smoke into decisions.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              From predictive alerts to safer commute planning — VAYUPUTRA
              reduces exposure when it matters most.
            </p>
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-3">
            {FEATURES.map((feature, index) => (
              <FeatureCard key={feature.title} {...feature} index={index} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
