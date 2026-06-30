import {
  TestimonialsColumn,
  type Testimonial,
} from "@/components/ui/testimonials-columns-1";
import { MotionReveal } from "@/components/ui/motion-reveal";
import DecryptedText from "@/components/ui/DecryptedText";

const testimonials: Testimonial[] = [
  {
    text: "We needed a backend that could handle traffic and process payments securely. Muhammad built ADHURI CART with Adonis.js and JWT, and it's been running flawlessly. His ability to combine performance with security is top tier.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=160&auto=format&fit=crop",
    name: "Ecommerce Startup Founder",
    role: "ADHURI CART",
  },
  {
    text: "Muhammad turned our concept into a real academic exchange platform. He not only built the API but advised us on data structure, permissions, and user flows. His insight made a huge difference in user adoption.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=160&auto=format&fit=crop",
    name: "EdTech Co Founder",
    role: "Knowledge Exchange API",
  },
  {
    text: "We had a vision to connect blood donors in emergencies and Muhammad brought it to life. The integration of Google Maps, real time chat, and seamless UX was exactly what we needed. He's a true full stack problem solver.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=160&auto=format&fit=crop",
    name: "NGO Project Coordinator",
    role: "Blood Stream App",
  },
  {
    text: "Muhammad built us a dynamic admin panel with user management, analytics, and secure login. What impressed me most was his attention to both backend efficiency and frontend usability. It's rare to find someone who codes and designs this well.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=160&auto=format&fit=crop",
    name: "SaaS Product Manager",
    role: "Custom Dashboard & Admin Panel",
  },
  {
    text: "We needed a branded, simple, and accurate loan calculator for our website. Muhammad built a clean, responsive tool that helped us boost engagement and reduce support queries. Highly recommended!",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=160&auto=format&fit=crop",
    name: "Financial Consultant",
    role: "Loan Calculator Web App",
  },
  {
    text: "Muhammad delivered a functional, fast job scraper with filter, export, and real time listing features. He even added resume optimization to our roadmap. His proactive approach sets him apart.",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=160&auto=format&fit=crop",
    name: "Tech Recruiter",
    role: "LinkedIn Job Scraper",
  },
];

const firstColumn = testimonials.slice(0, 2);
const secondColumn = testimonials.slice(2, 4);
const thirdColumn = testimonials.slice(4, 6);

export default function TestimonialsSection() {
  return (
    <section className="relative w-full bg-background px-4 py-16 text-foreground sm:px-6 sm:py-20 md:px-10 lg:px-14 lg:py-32 2xl:px-20 2xl:py-40">
      <div className="relative z-10">
        <MotionReveal className="mx-auto flex max-w-135 flex-col items-center justify-center">
          <div className="flex justify-center">
            <div className="mono rounded-lg border border-accent/40 bg-accent/10 px-4 py-1 text-xs uppercase text-accent shadow-[0_0_28px_color-mix(in_srgb,var(--accent)_45%,transparent)]">
              <DecryptedText text="Testimonials" animateOn="view" sequential={true} speed={40} revealDirection="start" />
            </div>
          </div>

          <h2 className="mt-5 text-center font-display text-4xl font-bold leading-[0.95] sm:text-5xl md:text-6xl lg:text-7xl 2xl:text-8xl">
            <DecryptedText text="What clients say" animateOn="view" sequential={true} speed={25} revealDirection="start" />
          </h2>
          <p className="mt-5 text-center opacity-75">
            See what business owners and teams say about working together.
          </p>
        </MotionReveal>

        <div className="mx-auto mt-10 flex max-h-185 w-full justify-center gap-5 overflow-hidden mask-[linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] sm:gap-6 lg:gap-8">
          <TestimonialsColumn
            testimonials={firstColumn}
            className="w-full md:flex-1"
            duration={15}
          />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block md:flex-1"
            duration={19}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block lg:flex-1"
            duration={17}
          />
        </div>
      </div>
    </section>
  );
}
