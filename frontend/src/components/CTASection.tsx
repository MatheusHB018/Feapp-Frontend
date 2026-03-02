import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { HandHeart, QrCode, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const actions = [
    {
      icon: HandHeart,
      title: "Seja um Voluntário",
      description:
        "Doe seu tempo e talento. Entre em contato por e-mail e faça parte da nossa equipe.",
      cta: "Fale Conosco",
      href: "mailto:matheusbispo925@gmail.com?subject=Quero%20ser%20volunt%C3%A1rio%20na%20FEAPP",
    },
    {
      icon: QrCode,
      title: "Faça uma Doação",
      description:
        "Cadastre sua doação e escolha a associação da rede FEAPP que deseja apoiar.",
      cta: "Cadastrar Doação",
      href: "/quero-doar",
      isInternal: true,
    },
    {
      icon: Building2,
      title: "Empresas Parceiras",
      description:
        "Cadastre sua empresa e escolha uma associação para apoiar como parceira.",
      cta: "Cadastrar Empresa",
      href: "/parceria-empresa",
      isInternal: true,
    },
  ];

  return (
    <section id="ajudar" ref={ref} className="py-24 bg-gradient-cta">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-secondary-foreground">
            Faça parte dessa corrente.
          </h2>
          <p className="mt-4 text-secondary-foreground/75 text-lg leading-relaxed">
            Existem muitas formas de ajudar. Escolha a sua e transforme vidas
            ao lado da FEAPP.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {actions.map((action, i) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="bg-background/95 backdrop-blur rounded-2xl p-8 shadow-card text-center"
            >
              <action.icon className="w-10 h-10 text-primary mx-auto mb-5" />
              <h3 className="font-display text-xl font-bold text-foreground mb-3">
                {action.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                {action.description}
              </p>

              {action.isInternal ? (
                <div className="space-y-3">
                  <Link
                    to={action.href}
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
                  >
                    {action.cta}
                  </Link>
                  {action.title === "Faça uma Doação" && (
                    <p className="text-xs text-muted-foreground">
                      E-mail de teste: matheusbispo925@gmail.com
                    </p>
                  )}
                </div>
              ) : (
                <a
                  href={action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  {action.cta}
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CTASection;
