import { StepCard, DataFlowDiagram, TrustAndPrivacy } from "@/features/how-it-works";
import SectionHeader from "@/components/common/SectionHeader";

export const dynamic = "force-static";

const steps = [
  {
    title: "Collect Pollution Data",
    description:
      "We ingest satellite data, ground sensors, traffic density, and weather shifts across Delhi.",
    icon: "🛰️",
  },
  {
    title: "Predict Future AQI",
    description:
      "ML models simulate the next 24 hours of air quality in 15-minute increments.",
    icon: "📈",
  },
  {
    title: "Personalize Health Risk",
    description:
      "We map exposure with your routine to surface the most relevant warnings.",
    icon: "🫁",
  },
  {
    title: "Recommend Actions",
    description:
      "Get route, timing, and protection guidance to reduce harm in real time.",
    icon: "🧭",
  },
];

export default function HowItWorksPage() {
  return (
    <main className="bg-black pb-20">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 pt-20 sm:px-10">
        <SectionHeader
          label="How It Works"
          title="Clear steps, measurable outcomes."
          description="VAYUPUTRA translates complex air quality signals into simple, personal actions anyone can follow."
        />
      </section>

      <section className="mx-auto mt-12 w-full max-w-6xl px-6 sm:px-10">
        <div className="grid gap-6 md:grid-cols-2">
          {steps.map((step, index) => (
            <StepCard key={step.title} {...step} index={index} />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 w-full max-w-6xl px-6 sm:px-10">
        <DataFlowDiagram />
      </section>

      <section className="mx-auto mt-16 w-full max-w-6xl px-6 sm:px-10">
        <TrustAndPrivacy />
      </section>
    </main>
  );
}
