import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SocialProof from "@/components/SocialProof";
import AboutSection from "@/components/AboutSection";
import EventsSection from "@/components/EventsSection";
import NetworkSection from "@/components/NetworkSection";
import PartnersSection from "@/components/PartnersSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        // small timeout to allow layout/animations to settle
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 50);
      }
    } else {
      // scroll to top when no hash
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <SocialProof />
      <AboutSection />
      <EventsSection />
      <NetworkSection />
      <PartnersSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
