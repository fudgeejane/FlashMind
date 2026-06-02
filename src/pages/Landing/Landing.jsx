import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ThemedPage } from "../../components/Theme";
import { useAuth } from "../../auth/contexts/useAuthContext";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import FeaturesSection from "./components/FeaturesSection";
import FooterSection from "./components/FooterSection";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Features", href: "#features" },
  { label: "Contact", href: "#contact" },
];

export default function Landing() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { user, userInfo } = useAuth();
  const headerRef = useRef(null);
  const mainRef = useRef(null);

  useEffect(() => {
    if (!user?.emailVerified) {
      return;
    }

    const redirectTimer = window.setTimeout(() => {
      const role = userInfo?.role || "user";
      navigate(role === "admin" ? "/admin/dashboard" : "/dashboard", { replace: true });
    }, 900);

    return () => window.clearTimeout(redirectTimer);
  }, [navigate, user?.emailVerified, userInfo?.role]);

  useLayoutEffect(() => {
    const mainEl = mainRef.current;

    if (!mainEl) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          y: -46,
          opacity: 0,
          duration: 1,
          ease: "expo.out",
        });
      }

      gsap.utils.toArray("[data-reveal-block]").forEach((element) => {
        gsap.from(element, {
          y: 36,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 82%",
          },
        });
      });

      const aboutTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#about",
          start: "top 72%",
          end: "bottom 55%",
          toggleActions: "play none none reverse",
        },
        defaults: { ease: "power3.out" },
      });

      aboutTimeline
        .from("#about [data-about-badge]", { y: 18, opacity: 0, duration: 0.65 })
        .from("#about [data-about-title]", { y: 28, opacity: 0, duration: 0.8 }, "<0.08")
        .from(
          "#about [data-about-copy] > p",
          {
            y: 22,
            opacity: 0,
            duration: 0.7,
            stagger: 0.14,
          },
          "<0.12"
        )
        .from(
          "#about [data-about-card]",
          {
            y: 26,
            opacity: 0,
            scale: 0.96,
            duration: 0.8,
            stagger: 0.12,
          },
          "<0.08"
        );

      gsap.to("#about [data-about-orb]", {
        y: -18,
        x: 12,
        rotation: 16,
        duration: 5.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.from("#features [data-feature-title]", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#features",
          start: "top 76%",
        },
      });

      gsap.from("#features [data-feature-card]", {
        y: 34,
        opacity: 0,
        scale: 0.96,
        duration: 0.75,
        stagger: 0.11,
        ease: "expo.out",
        scrollTrigger: {
          trigger: "#features",
          start: "top 72%",
        },
      });

      gsap.to("#features [data-feature-card]", {
        y: "random(-6, 6)",
        rotation: "random(-1.5, 1.5)",
        duration: 4.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.16,
      });
    }, mainEl);

    return () => ctx.revert();
  }, []);

  return (
    <ThemedPage>
      <Header
        headerRef={headerRef}
        mobileOpen={mobileOpen}
        navItems={navItems}
        setMobileOpen={setMobileOpen}
      />

      <main ref={mainRef}>
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <ContactSection />
      </main>

      <FooterSection navItems={navItems} />
    </ThemedPage>
  );
}
