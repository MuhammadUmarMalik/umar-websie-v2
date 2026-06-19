import { RevealImageList } from "@/components/ui/reveal-images";

export default function ServicesRevealSection() {
  return (
    <section className="w-full bg-bg-primary px-10 py-24 sm:px-6 lg:px-10">
      <div className="mx-auto w-full gap-12 lg:items-start">
        <div className="w-full">
          <p className="mono text-sm uppercase text-accent">Services</p>
          <h2 className="mt-4 max-w-4xl font-display text-5xl font-bold leading-[0.95] sm:text-6xl md:text-7xl">
            Problems I solve for your business
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-text-secondary">
            Practical design, development, and automation work for businesses
            that need faster websites, clearer user flows, and better systems.
          </p>
        </div>

        <RevealImageList />
      </div>
    </section>
  );
}
