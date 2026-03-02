import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import heroBg from "@/assets/pessoal.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-hero" />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight max-w-4xl mx-auto"
        >
          A força que une a solidariedade em{" "}
          <span className="text-gradient-gold">Presidente Prudente</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6 text-lg sm:text-xl text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed"
        >
          Desde 2000, a FEAPP conecta, apoia e fortalece 33 entidades
          assistenciais que transformam vidas em nossa região.
        </motion.p>

        <motion.a
          href="#sobre"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="inline-flex items-center gap-2 mt-10 bg-gold text-primary px-8 py-4 rounded-xl text-lg font-semibold hover:opacity-90 transition-opacity shadow-warm"
        >
          Conheça nosso trabalho
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </motion.a>
      </div>
    </section>
  );
};

export default HeroSection;
