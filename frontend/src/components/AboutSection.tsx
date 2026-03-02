import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="sobre" ref={ref} className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Unir para <span className="text-primary">fortalecer</span>
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Fundada no ano 2000, a Federação das Entidades Assistenciais de
                Presidente Prudente (FEAPP) nasceu da necessidade de unir forças.
                Individualmente, cada entidade fazia o seu melhor. Juntas, elas
                fazem o extraordinário.
              </p>
              <p>
                Nossa missão é ser a ponte entre a generosidade da comunidade e
                as 33 entidades que atendem crianças, idosos, pessoas com
                deficiência e famílias em vulnerabilidade social.
              </p>
              <p>
                Com transparência e compromisso, cada centavo arrecadado é
                direcionado para quem mais precisa.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-card rounded-2xl p-8 shadow-card border border-border/50"
          >
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-lg font-bold text-foreground mb-1">
                  Missão
                </h3>
                <p className="text-muted-foreground text-sm">
                  Fortalecer e apoiar as entidades assistenciais por meio da
                  articulação comunitária e captação de recursos.
                </p>
              </div>
              <div className="border-t border-border" />
              <div>
                <h3 className="font-display text-lg font-bold text-foreground mb-1">
                  Visão
                </h3>
                <p className="text-muted-foreground text-sm">
                  Ser referência em federação assistencial no interior paulista,
                  reconhecida por impacto, transparência e inovação social.
                </p>
              </div>
              <div className="border-t border-border" />
              <div>
                <h3 className="font-display text-lg font-bold text-foreground mb-1">
                  Valores
                </h3>
                <p className="text-muted-foreground text-sm">
                  Solidariedade, Transparência, Inclusão, Cooperação e
                  Compromisso com o bem comum.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
