// Lenis smooth scrolling
const lenis = new Lenis({ duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
function raf(time){ lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

// GSAP + ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

gsap.to(".hero-title", {
  y: 0, opacity: 1, duration: 1, ease: "power3.out",
  scrollTrigger: { trigger: ".hero", start: "top 80%" }
});
gsap.to(".hero-sub", {
  y: 0, opacity: 1, duration: 1, delay: 0.12, ease: "power3.out",
  scrollTrigger: { trigger: ".hero", start: "top 80%" }
});

// Stagger reveal for cards
gsap.utils.toArray(".card").forEach((card, i) => {
  gsap.from(card, {
    y: 30, opacity: 0, duration: 0.8, delay: i * 0.1, ease: "power3.out",
    scrollTrigger: { trigger: card, start: "top 85%" }
  });

  // subtle hover tilt
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(card, { rotationY: x * 6, rotationX: -y * 6, scale: 1.02, ease: "power3.out", duration: 0.35 });
  });
  card.addEventListener("mouseleave", () => gsap.to(card, { rotationY: 0, rotationX: 0, scale: 1, ease: "power3.out", duration: 0.5 }));
});

// Barba simple page transition scaffold (can be expanded to match target site's transition)
if (window.barba) {
  barba.init({
    sync: true,
    transitions: [{
      async leave(data) {
        await gsap.to(data.current.container, { opacity: 0, y: 20, duration: 0.5, ease: "power2.inOut" });
      },
      async enter(data) {
        gsap.from(data.next.container, { opacity: 0, y: -10, duration: 0.6, ease: "power2.out" });
      }
    }]
  });
}