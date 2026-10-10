"use client";

import {useEffect} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const ease = "expo.out";
const q = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => gsap.utils.toArray<T>(root.querySelectorAll(sel));

// Smooth scroll (Lenis) driven by the GSAP ticker so ScrollTrigger stays in sync. Mounted once in the layout.
export function SmoothScroll() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({anchors: {offset: -96}});
    const raf = (time: number) => lenis.raf(time * 1000);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}

// Wires every scroll scene declared with data-attributes in server components.
// Render it inside the page (not the layout) so it runs after the page segment has hydrated.
// Everything lives inside gsap.matchMedia, so reduced-motion users get the static page.
export function ScrollScenes() {
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add({motion: "(prefers-reduced-motion: no-preference)", desktop: "(min-width: 1024px)"}, (ctx) => {
      const {motion, desktop} = ctx.conditions as {motion: boolean; desktop: boolean};
      if (!motion) return;

      // fromTo everywhere (not from): explicit end values survive React re-running this effect,
      // where from() would read a half-reverted state as its target.

      // Headings: blur-to-sharp word reveal, the signature move from the reference.
      q("[data-split]").forEach((heading) => {
        gsap.fromTo(q(".split-word", heading), {opacity: 0, yPercent: 45, filter: "blur(12px)"}, {
          opacity: 1, yPercent: 0, filter: "blur(0px)", duration: 1.1, ease, stagger: 0.06,
          scrollTrigger: {trigger: heading, start: "top 85%"}
        });
      });

      q("[data-reveal]").forEach((el) => {
        gsap.fromTo(el, {opacity: 0, y: 48}, {opacity: 1, y: 0, duration: 1.1, ease, scrollTrigger: {trigger: el, start: "top 88%"}});
      });

      q("[data-stagger]").forEach((group) => {
        gsap.fromTo(gsap.utils.toArray(group.children), {opacity: 0, y: 64}, {
          opacity: 1, y: 0, duration: 1.1, ease, stagger: 0.1,
          scrollTrigger: {trigger: group, start: "top 82%"}
        });
      });

      // Hero: the three panels fan apart as the hero scrolls away.
      q("[data-hero-panels]").forEach((stage) => {
        const tl = gsap.timeline({scrollTrigger: {trigger: stage, start: "top 75%", end: "bottom top", scrub: 1}});
        tl.fromTo(q('[data-panel="left"]', stage), {x: 0, y: 0, rotate: 0}, {x: "-18%", y: -40, rotate: -4, ease: "none"}, 0)
          .fromTo(q('[data-panel="right"]', stage), {x: 0, y: 0, rotate: 0}, {x: "18%", y: -40, rotate: 4, ease: "none"}, 0)
          .fromTo(q('[data-panel="center"]', stage), {y: 0, scale: 1}, {y: -70, scale: 1.08, ease: "none"}, 0);
      });

      // Service details: cards are CSS-sticky on desktop; the covered card shrinks and dims as the next one arrives.
      if (desktop) {
        q("[data-stack]").forEach((stack) => {
          const cards = gsap.utils.toArray<HTMLElement>(stack.children);
          cards.slice(0, -1).forEach((card, i) => {
            gsap.fromTo(card, {scale: 1, opacity: 1}, {
              scale: 0.94, opacity: 0.45, ease: "none", transformOrigin: "50% 0%",
              scrollTrigger: {trigger: cards[i + 1], start: "top bottom", end: "top 25%", scrub: true}
            });
          });
        });
      }

      // Statement copy lights up word by word with the scroll position.
      q("[data-scrub-words]").forEach((text) => {
        gsap.fromTo(q(".split-word", text), {opacity: 0.16}, {
          opacity: 1, ease: "none", stagger: 0.1,
          scrollTrigger: {trigger: text, start: "top 80%", end: "bottom 45%", scrub: true}
        });
      });

      // Timeline spine draws itself down through its list.
      q("[data-line]").forEach((line) => {
        gsap.fromTo(line, {scaleY: 0}, {
          scaleY: 1, ease: "none",
          scrollTrigger: {trigger: line.parentElement, start: "top 70%", end: "bottom 60%", scrub: true}
        });
      });

      // Why: the orbit turns while you read the differentiators.
      q("[data-orbit]").forEach((orbit) => {
        const tl = gsap.timeline({scrollTrigger: {trigger: orbit, start: "top bottom", end: "bottom top", scrub: 1}});
        q("[data-orbit-ring]", orbit).forEach((ring, i) => tl.fromTo(ring, {rotate: 0}, {rotate: i % 2 ? -120 : 120, ease: "none"}, 0));
        tl.fromTo(q("[data-orbit-core]", orbit), {scale: 0.7}, {scale: 1.05, ease: "none"}, 0);
        q("[data-orbit-float]", orbit).forEach((el, i) => tl.fromTo(el, {y: 60 * (i % 2 ? -1 : 1)}, {y: -60 * (i % 2 ? -1 : 1), ease: "none"}, 0));
      });

      // Process: the connector draws itself and each step lights up as the line reaches it.
      q("[data-process]").forEach((list) => {
        const steps = q("[data-process-step]", list);
        const tl = gsap.timeline({scrollTrigger: {trigger: list, start: "top 75%", end: "bottom 55%", scrub: 1}});
        tl.fromTo(q("[data-process-line]", list), {scaleX: 0}, {scaleX: 1, ease: "none", duration: steps.length}, 0);
        steps.forEach((step, i) => tl.fromTo(step, {opacity: 0.15, y: 40}, {opacity: 1, y: 0, ease: "power2.out", duration: 0.8}, i));
      });

      // Closing CTA: panel grows into place, glows drift at different speeds.
      q("[data-cta]").forEach((panel) => {
        gsap.fromTo(panel, {scale: 0.88, opacity: 0.4}, {
          scale: 1, opacity: 1, ease: "none",
          scrollTrigger: {trigger: panel, start: "top bottom", end: "top 35%", scrub: 1}
        });
      });

      // Footer wordmark: slow fade up out of a blur when the footer arrives (reference: 1.2s, slight rise and scale).
      q("[data-footer-mark]").forEach((mark) => {
        gsap.fromTo(mark, {opacity: 0, y: 36, scale: 0.97, filter: "blur(14px)"}, {
          opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1.6, ease: "power2.out",
          scrollTrigger: {trigger: mark, start: "top 92%"}
        });
      });

      q("[data-parallax]").forEach((el) => {
        gsap.fromTo(el, {y: 0}, {
          y: Number(el.dataset.parallax), ease: "none",
          scrollTrigger: {trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true}
        });
      });
    });

    // Cursor-reactive layer: mouse/trackpad only, never on touch or with reduced motion.
    mm.add("(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)", () => {
      const off: Array<() => void> = [];
      const on = <K extends keyof HTMLElementEventMap>(el: HTMLElement | Window, type: K, fn: (e: HTMLElementEventMap[K]) => void) => {
        el.addEventListener(type, fn as EventListener);
        off.push(() => el.removeEventListener(type, fn as EventListener));
      };

      // Magnetic buttons: the button leans toward the cursor and its label drifts a little further.
      q("[data-magnetic]").forEach((el) => {
        const label = el.querySelector<HTMLElement>(".roll");
        const to = (target: Element | null, prop: "x" | "y") => target ? gsap.quickTo(target, prop, {duration: 0.6, ease: "power3"}) : () => {};
        const [x, y, lx, ly] = [to(el, "x"), to(el, "y"), to(label, "x"), to(label, "y")];
        on(el, "pointermove", (e) => {
          const r = el.getBoundingClientRect();
          const dx = e.clientX - r.left - r.width / 2;
          const dy = e.clientY - r.top - r.height / 2;
          x(dx * 0.3); y(dy * 0.4); lx(dx * 0.12); ly(dy * 0.15);
        });
        on(el, "pointerleave", () => { x(0); y(0); lx(0); ly(0); });
      });

      // 3D tilt with depth layers. data-tilt-scope="section" lets the whole section steer it.
      q("[data-tilt]").forEach((card) => {
        const max = Number(card.dataset.tilt) || 6;
        const area = card.dataset.tiltScope === "section" ? card.closest("section") ?? card : card;
        gsap.set(card, {transformPerspective: 1200});
        const rx = gsap.quickTo(card, "rotationX", {duration: 0.9, ease: "power3"});
        const ry = gsap.quickTo(card, "rotationY", {duration: 0.9, ease: "power3"});
        const layers = q("[data-depth]", card).map((layer) => ({
          d: Number(layer.dataset.depth),
          x: gsap.quickTo(layer, "x", {duration: 1, ease: "power3"}),
          y: gsap.quickTo(layer, "y", {duration: 1, ease: "power3"})
        }));
        on(area, "pointermove", (e) => {
          const r = card.getBoundingClientRect();
          const px = gsap.utils.clamp(-0.5, 0.5, (e.clientX - r.left) / r.width - 0.5);
          const py = gsap.utils.clamp(-0.5, 0.5, (e.clientY - r.top) / r.height - 0.5);
          rx(-py * max); ry(px * max);
          layers.forEach((l) => { l.x(px * l.d); l.y(py * l.d); });
        });
        on(area, "pointerleave", () => { rx(0); ry(0); layers.forEach((l) => { l.x(0); l.y(0); }); });
      });

      // Spotlight cards and the footer wordmark read the cursor position from CSS variables.
      on(window, "pointermove", (e) => {
        const el = (e.target as Element | null)?.closest?.<HTMLElement>(".spotlight, .spotlight-text");
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      });

      return () => off.forEach((fn) => fn());
    });

    return () => mm.revert();
  }, []);

  return null;
}
