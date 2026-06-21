"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Plus } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { featuredProjects, marketingPages, siteConfig } from "@/lib/constants";
import { cn } from "@/lib/utils";

const navItems = marketingPages.filter((item) => item.label !== "Services");
const menuEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
const menuTransition = { duration: 0.9, ease: menuEase };

export function Header() {
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [showPortrait, setShowPortrait] = useState(true);
  const [projectIndex, setProjectIndex] = useState(0);
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const isHomeHero = pathname === "/" && !compact && !open;
  const floatingHeader = compact || open;

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      setProjectIndex(0);
      return;
    }
    const timer = setInterval(() => {
      setProjectIndex((i) => (i + 1) % featuredProjects.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "z-70 transition-all duration-300",
          floatingHeader
            ? cn(
                "fixed left-3 right-3 top-3 rounded-2xl border bg-bg-primary/90 text-text-primary backdrop-blur-xl sm:left-4 sm:right-4 sm:top-4 lg:left-6 lg:right-6",
                open
                  ? "border-border/70 shadow-none"
                  : "border-border/60 shadow-[0_10px_32px_rgba(0,0,0,0.08)]",
              )
            : isHomeHero
              ? "fixed inset-x-0 top-2 border-b border-transparent bg-transparent text-white"
              : "fixed inset-x-0 top-0 border-b border-border bg-bg-primary/80 text-text-primary backdrop-blur-sm"
        )}
      >
        <div
          className={cn(
            "grid grid-cols-[1fr_auto] items-center transition-all duration-300 lg:grid-cols-[1fr_auto_1fr]",
            floatingHeader
              ? "h-13 px-4 sm:h-14 sm:px-5 lg:px-6"
              : "h-18 px-4 sm:px-8 lg:px-16",
            open && "bg-transparent"
          )}
        >
          <Link
            href="/"
            aria-label={`${siteConfig.name} home`}
            className="group flex items-center gap-2.5 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            onClick={() => setOpen(false)}
          >
           
            <span className={cn(
              "mono font-black tracking-tight transition-all duration-300",
              isHomeHero ? "text-white" : "text-text-primary",
              floatingHeader ? "text-sm" : "text-base sm:text-lg",
            )}>
              Muhammad Umar Malik
            </span>
          </Link>

          <button
            type="button"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="site-navigation"
            className={cn(
              "mono group inline-flex items-center gap-3 rounded-sm px-2 uppercase leading-none transition-all duration-300 hover:text-accent focus-visible:text-accent focus-visible:outline-none",
              isHomeHero ? "text-white" : "text-text-primary",
              floatingHeader ? "min-h-8 text-xs" : "min-h-9 text-sm",
              open && "border border-current/70 lg:min-h-7 lg:gap-2"
            )}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="relative h-[1em] w-[3.75em] overflow-hidden">
              <span
                className="flex flex-col gap-2 transition-transform duration-500 ease-out"
                style={{ transform: open ? "translateY(calc(-1em - 0.5rem))" : "translateY(0)" }}
              >
                <span className="block h-[1em] leading-none">Menu</span>
                <span className="block h-[1em] leading-none">Close</span>
              </span>
            </span>
            <span className="relative flex h-4 w-5 flex-col items-center justify-center" aria-hidden>
              <span
                className="absolute h-0.5 w-full origin-center bg-current transition-transform duration-500 ease-out"
                style={{ transform: open ? "rotate(45deg) translateY(0)" : "rotate(0deg) translateY(-4px)" }}
              />
              <span
                className="absolute h-0.5 w-full origin-center bg-current transition-transform duration-500 ease-out"
                style={{ transform: open ? "rotate(-45deg) translateY(0)" : "rotate(0deg) translateY(4px)" }}
              />
            </span>
          </button>

          <div className="hidden items-center justify-end gap-3 lg:flex">
            <div className="group flex justify-end gap-1.5">
              <Link
                href="/contact"
                className={cn(
                  "mono hidden h-10 items-center text-xs uppercase tracking-normal transition-colors duration-300 hover:text-accent focus-visible:text-accent focus-visible:outline-none sm:inline-flex",
                  isHomeHero ? "text-white" : "text-text-primary"
                )}
                onClick={() => setOpen(false)}
              >
                <span className="flex h-10 items-center gap-1.5">
                  <span className="grid size-10 origin-left -rotate-45 scale-0 place-items-center bg-accent text-white transition duration-500 ease-out group-hover:rotate-0 group-hover:scale-100">
                    <Plus className="size-4" />
                  </span>
                  <span className="-ml-11.5 grid h-10 place-items-center bg-accent px-4 text-bg-primary transition duration-500 ease-out group-hover:ml-0 lg:px-5">
                    Let&apos;s work together
                  </span>
                </span>
              </Link>
              <Link
                href="/contact"
                aria-label="Contact"
                className="inline-flex size-10 origin-right items-center justify-center overflow-hidden bg-accent text-white transition-all duration-500 ease-out group-hover:-rotate-45 group-hover:scale-0 group-hover:opacity-0 sm:group-hover:w-0"
                onClick={() => setOpen(false)}
              >
                <Plus className="size-4 text-white" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="site-navigation"
            className="fixed bottom-3 left-3 right-3 top-19 z-60 overflow-hidden rounded-3xl border border-border/70 bg-bg-primary/96 text-text-primary shadow-[0_18px_55px_rgba(0,0,0,0.10)] backdrop-blur-xl sm:bottom-4 sm:left-4 sm:right-4 sm:top-22 lg:bottom-6 lg:left-6 lg:right-6 lg:top-23 lg:bg-bg-secondary/96"
            initial={prefersReducedMotion ? false : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={prefersReducedMotion ? { duration: 0.12 } : menuTransition}
          >
            <div className="grid min-h-full gap-6 px-5 py-6 sm:px-7 sm:py-8 lg:grid-cols-[0.9fr_0.48fr_1.28fr] lg:gap-10 lg:px-10 lg:py-10 xl:px-12 xl:py-12">
              <motion.nav
                aria-label="Primary navigation"
                className="flex flex-col items-start self-start lg:gap-0"
                initial={prefersReducedMotion ? false : "hidden"}
                animate="show"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } }
                }}
              >
                {navItems.map((item) => {
                  const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                  const highlighted = hoveredItem ? hoveredItem === item.href : active;

                  return (
                    <motion.div
                      key={item.href}
                      variants={{
                        hidden: { opacity: 0, y: 28 },
                        show: { opacity: 1, y: 0, transition: menuTransition }
                      }}
                    >
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "group flex items-center gap-4 text-[34px] font-medium leading-[1.08] tracking-normal transition-colors duration-200 hover:text-accent focus-visible:text-accent focus-visible:outline-none sm:text-5xl lg:gap-5 lg:text-6xl lg:leading-[0.98] xl:text-7xl",
                          highlighted ? "text-accent" : "text-text-primary"
                        )}
                        onMouseEnter={() => setHoveredItem(item.href)}
                        onMouseLeave={() => setHoveredItem(null)}
                        onFocus={() => setHoveredItem(item.href)}
                        onBlur={() => setHoveredItem(null)}
                        onClick={() => setOpen(false)}
                      >
                        <AnimatePresence initial={false}>
                          {highlighted ? (
                            <motion.span
                              aria-hidden
                              className="mt-1 block size-5 shrink-0 bg-accent lg:mt-2 lg:size-8"
                              initial={{ opacity: 0, scale: 0.65, x: -18 }}
                              animate={{ opacity: 1, scale: 1, x: 0 }}
                              exit={{ opacity: 0, scale: 0.65, x: -18 }}
                              transition={{ duration: 0.2, ease: menuEase }}
                            />
                          ) : null}
                        </AnimatePresence>
                        <motion.span layout transition={{ duration: 0.24, ease: menuEase }}>
                          {item.label}
                        </motion.span>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.nav>

              <motion.div
                className="grid content-start gap-7 text-base lg:min-h-110 lg:content-between lg:gap-10 lg:text-[17px]"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={prefersReducedMotion ? { duration: 0.12 } : { ...menuTransition, delay: 0.22 }}
              >
                <div className="space-y-7">
                  <div>
                    <p className="mono mb-2 text-base uppercase text-text-secondary">Contact</p>
                    <Link
                      href={`mailto:${siteConfig.email}`}
                      className="text-text-primary transition-colors duration-200 hover:text-accent focus-visible:text-accent focus-visible:outline-none"
                    >
                      {siteConfig.email}
                    </Link>
                  </div>
                  <div className="hidden space-y-2 lg:block">
                    <p>Website design and development</p>
                    <br />
                    <p>Business automation workflows</p>
                  </div>
                  <div className="space-y-1">
                    <Link href={siteConfig.socials.instagram.href} target="_blank" rel="noopener noreferrer" className="block text-text-primary transition-colors duration-200 hover:text-accent focus-visible:text-accent focus-visible:outline-none">
                      {siteConfig.socials.instagram.label}
                    </Link>
                    <Link href={siteConfig.socials.linkedin.href} target="_blank" rel="noopener noreferrer" className="block text-text-primary transition-colors duration-200 hover:text-accent focus-visible:text-accent focus-visible:outline-none">
                      {siteConfig.socials.linkedin.label}
                    </Link>
                    <Link href={siteConfig.socials.github.href} target="_blank" rel="noopener noreferrer" className="block text-text-primary transition-colors duration-200 hover:text-accent focus-visible:text-accent focus-visible:outline-none">
                      {siteConfig.socials.github.label}
                    </Link>
                  </div>
                  <p className="mono text-base uppercase text-text-secondary">Working globally</p>
                </div>

                <div className="mono space-y-3 text-xs uppercase leading-5 lg:text-sm">
                  <p className="flex items-start gap-3">
                    <span className="mt-1.5 size-2 bg-accent" aria-hidden />
                    <span>Accepting projects. Join the waitlist.</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="mt-1.5 size-2 bg-accent-hover" aria-hidden />
                    <span>Only 3 spots left</span>
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="hidden gap-6 self-start lg:grid lg:grid-cols-2"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 34 }}
                animate={{ opacity: 1, y: 0 }}
                transition={prefersReducedMotion ? { duration: 0.12 } : { ...menuTransition, delay: 0.3 }}
              >
                <Link
                  href="/about"
                  aria-label="Go to about page"
                  onClick={() => setOpen(false)}
                  className="group flex w-full cursor-pointer flex-col text-text-primary transition-colors duration-200 hover:text-accent focus-visible:text-accent focus-visible:outline-none"
                >
                  <div className="relative flex h-140 w-full items-end overflow-hidden bg-bg-card xl:h-155">
                    {showPortrait ? (
                      <Image
                        src="/umar-dp.png"
                        alt="Muhammad Umar Malik"
                        fill
                        sizes="(min-width: 768px) 25vw, 100vw"
                        className="object-cover object-[50%_0%] transition duration-700 group-hover:scale-105"
                        onError={() => setShowPortrait(false)}
                      />
                    ) : (
                      <div className="grid h-full w-full place-items-center p-8 text-center">
                        <div>
                          <p className="mono text-xs uppercase text-text-secondary">Add your photo</p>
                          <p className="mt-3 text-3xl font-semibold leading-none">umar-picture.jpg</p>
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/70 to-transparent" />
                    <div className="relative p-5 text-white">
                      <p className="mono text-xs uppercase">Designer + developer</p>
                      <p className="mt-1 text-2xl font-semibold leading-none">Muhammad Umar Malik</p>
                    </div>
                  </div>
                  <p className="mono mt-4 text-base uppercase lg:text-[17px]">About the studio</p>
                </Link>

                <div className="flex w-full flex-col">
                  <div className="relative h-140 w-full overflow-hidden bg-bg-card xl:h-155">
                    <AnimatePresence>
                      {featuredProjects.map((project, i) =>
                        i === projectIndex ? (
                          <motion.div
                            key={project.title}
                            className="absolute inset-0"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.6, ease: menuEase }}
                          >
                            <Link
                              href={project.href}
                              aria-label={`View project: ${project.title}`}
                              onClick={() => setOpen(false)}
                              className="group block h-full"
                            >
                              <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                sizes="(min-width: 768px) 25vw, 100vw"
                                className="object-cover object-center transition duration-700 group-hover:scale-105"
                              />
                              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/75 to-transparent" />
                              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                                <p className="mono text-xs uppercase text-white/60">
                                  {project.category} · {project.year}
                                </p>
                                <p className="mt-1 text-2xl font-semibold leading-none">{project.title}</p>
                                <p className="mono mt-1 text-xs text-white/50">{project.stat}</p>
                              </div>
                            </Link>
                          </motion.div>
                        ) : null
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="mono mt-4 flex items-center justify-between text-base uppercase lg:text-[17px]">
                    <span className="text-text-primary">Featured work</span>
                    <span className="flex items-center gap-1.5">
                      {featuredProjects.map((project, i) => (
                        <button
                          key={project.title}
                          type="button"
                          onClick={() => setProjectIndex(i)}
                          aria-label={`View ${project.title}`}
                          className={cn(
                            "rounded-full transition-all duration-300",
                            i === projectIndex
                              ? "size-2 bg-accent"
                              : "size-1.5 bg-text-muted hover:bg-text-secondary"
                          )}
                        />
                      ))}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
