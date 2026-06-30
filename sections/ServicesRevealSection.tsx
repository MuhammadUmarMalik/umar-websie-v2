import { RevealImageList } from "@/components/ui/reveal-images";
import DecryptedText from "@/components/ui/DecryptedText";

export default function ServicesRevealSection() {
  return (
    <section className="w-full bg-bg-primary px-4 py-16 sm:px-6 sm:py-20 md:px-10 lg:px-14 lg:py-32 2xl:px-20 2xl:py-40">
      <div className="gap-12 lg:items-start">
        <div className="w-full">
          <p className="mono text-sm uppercase text-accent">
            <DecryptedText text="Services" animateOn="view" sequential={true} speed={40} revealDirection="start" />
          </p>
          <h2 className="mt-4 max-w-4xl font-display text-4xl font-bold leading-[0.95] sm:text-5xl md:text-6xl lg:text-7xl 2xl:text-8xl">
            <DecryptedText text="Problems I solve for your business" animateOn="view" sequential={true} speed={22} revealDirection="start" />
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-7 text-text-secondary sm:text-lg sm:leading-8">
            Practical design, development, and automation work for businesses
            that need faster websites, clearer user flows, and better systems.
          </p>
        </div>

        <RevealImageList />
      </div>
    </section>
  );
}
