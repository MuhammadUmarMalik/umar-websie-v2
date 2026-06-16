"use client";

import { motion } from "framer-motion";
import gsap from "gsap";
import Link from "next/link";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const installed = [
  "Web Development",
  "UI/UX Design",
  "Speed Optimization",
  "AI Automation",
  "Lead Generation",
  "WordPress",
  "React & Next.js",
  "Business Problem Solving",
];

const services = [
  {
    number: "01",
    title: "Web Development",
    text: "Fast, clean, conversion-ready websites that can bring in customers, not just traffic.",
  },
  {
    number: "02",
    title: "UI/UX Design",
    text: "Clear flows and polished interfaces that help visitors understand what to do next.",
  },
  {
    number: "03",
    title: "AI Automation",
    text: "Practical workflows that remove repetitive admin and keep leads moving.",
  },
];

const stack = [
  "Three.js",
  "GSAP",
  "Framer Motion",
  "Sanity",
  "Vercel",
];

export function StackShowcase() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      canvas,
    });
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 100);
    const geometry = new THREE.IcosahedronGeometry(1.6, 1);
    const material = new THREE.MeshStandardMaterial({
      color: "#b5f44a",
      roughness: 0.34,
      metalness: 0.36,
    });
    const mesh = new THREE.Mesh(geometry, material);
    const light = new THREE.DirectionalLight("#f0ede6", 3);

    camera.position.z = 5;
    light.position.set(3, 4, 5);
    scene.add(mesh, light, new THREE.AmbientLight("#c8ff64", 1.2));

    const resize = () => {
      const { clientWidth, clientHeight } = canvas;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(clientWidth, clientHeight, false);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
    };

    resize();
    window.addEventListener("resize", resize);

    let frame = 0;
    const animate = () => {
      mesh.rotation.x += 0.006;
      mesh.rotation.y += 0.01;
      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };

    animate();

    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" },
      );
    }

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="grid min-h-[calc(100svh-72px)] w-full grid-cols-1 items-center gap-10 px-6 py-20 md:grid-cols-[1fr_minmax(300px,420px)] md:px-12 lg:px-20">
        <div className="max-w-3xl">
          <p className="mono mb-4 text-sm uppercase text-accent">
            Software Engineer & Designer
          </p>
          <h1
            ref={headingRef}
            className="font-display text-5xl font-bold leading-[0.95] text-balance md:text-7xl lg:text-8xl"
          >
            I Fix What&apos;s Costing Your Business.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-text-secondary">
            Slow websites, poor UI, zero leads. I find the exact problems holding
            your business back and build solutions that actually work.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/portfolio"
              className="inline-flex h-12 items-center border border-accent bg-accent px-5 text-sm font-semibold text-bg-primary transition duration-200 hover:bg-accent-hover"
            >
              View My Work
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center border border-border px-5 text-sm font-semibold text-text-primary transition duration-200 hover:border-accent hover:text-accent"
            >
              Book a Free Call
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-2">
            {stack.map((item, index) => (
              <motion.span
                key={item}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.035 }}
                className="mono border border-border bg-bg-card px-3 py-2 text-xs uppercase text-text-secondary shadow-sm"
              >
                {item}
              </motion.span>
            ))}
          </div>
        </div>
        <div className="min-h-80 overflow-hidden border border-border bg-bg-secondary shadow-gold">
          <canvas
            ref={canvasRef}
            className="block h-80 w-full md:h-115"
            aria-label="Animated gold geometry"
          />
        </div>
      </section>
      <section className="overflow-hidden border-y border-border bg-bg-secondary py-5">
        <div className="flex w-max animate-[marquee_26s_linear_infinite] gap-8 whitespace-nowrap px-6">
          {[...installed, ...installed].map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="mono text-sm uppercase text-text-secondary"
            >
              {item} <span className="ml-8 text-accent">.</span>
            </span>
          ))}
        </div>
      </section>
      <section className="px-6 py-20 md:px-12 lg:px-20 lg:py-30">
        <div className="mx-auto max-w-7xl">
          <p className="mono text-sm uppercase text-accent">Services</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight md:text-5xl">
            Problems I Solve For Your Business
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.title}
                className="border border-border bg-bg-card p-6 transition duration-200 hover:-translate-y-1 hover:border-accent"
              >
                <p className="mono text-sm text-accent">{service.number}</p>
                <h3 className="mt-8 text-xl font-semibold">{service.title}</h3>
                <p className="mt-4 leading-7 text-text-secondary">
                  {service.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
