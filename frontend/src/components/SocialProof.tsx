import { motion } from "framer-motion";
import { Calendar, Users, HeartHandshake, Shield } from "lucide-react";
import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { apiUrl } from "@/lib/api";

const accentColors = [
  "text-magenta",
  "text-gold",
  "text-turquoise",
  "text-orange",
];

const SocialProof = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [associationCount, setAssociationCount] = useState(0);

  useEffect(() => {
    const fetchAssociationsCount = async () => {
      try {
        const response = await fetch(apiUrl("/api/associations/public"));
        const data = await response.json();

        if (!response.ok) {
          throw new Error();
        }

        setAssociationCount((data.data || []).length);
      } catch {
        setAssociationCount(0);
      }
    };

    fetchAssociationsCount();
  }, []);

  const stats = [
    { icon: Calendar, value: "+20", label: "Anos de História" },
    { icon: Users, value: `${associationCount}`, label: "Entidades Federadas" },
    { icon: HeartHandshake, value: "Milhares", label: "de Vidas Impactadas" },
    { icon: Shield, value: "100%", label: "Sem Fins Lucrativos" },
  ];

  return (
    <section ref={ref} className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="text-center"
            >
              <stat.icon className={`w-8 h-8 mx-auto mb-3 ${accentColors[i]}`} />
              <div className="font-display text-3xl sm:text-4xl font-bold text-primary-foreground">
                {stat.value}
              </div>
              <div className="text-sm text-primary-foreground/70 mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
