import { MarqueeAnimation } from "@/components/ui/marquee-effect";

const servicesText =
  "Web Development    UI/UX Design      Speed Optimization    AI Automation       Lead Generation       WordPress      React & Next.js      Business Problem Solving   ";

export function ServicesMarquee() {
  return (
    <section className="border-y border-border bg-bg-secondary py-4">
      <MarqueeAnimation
        direction="left"
        baseVelocity={-3}
        className="mono py-2 text-base text-text-secondary md:text-lg"
      >
        {servicesText}
      </MarqueeAnimation>
      {/* <MarqueeAnimation
        direction="right"
        baseVelocity={-3}
        className="mono py-2 text-base text-accent md:text-lg"
      >
        {servicesText}
      </MarqueeAnimation> */}
    </section>
  );
}
