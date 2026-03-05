import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import Header from '@/components/Header';
import { apiUrl } from '@/lib/api';

type PartnerType = {
  _id?: string;
  id?: string;
  name: string;
  website?: string;
  logoUrl?: string;
  description?: string;
  sectors?: string[];
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
};

const hoverAccents = new Array(12).fill('hover:border-magenta/40');

const Partners = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [selected, setSelected] = useState<number | null>(null);
  const [partners, setPartners] = useState<PartnerType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPartners = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(apiUrl('/api/partners/public'));
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Erro ao carregar parceiros');
        }

        setPartners(Array.isArray(data.data) ? data.data : []);
      } catch (fetchError) {
        setPartners([]);
        setError(fetchError instanceof Error ? fetchError.message : 'Falha ao carregar parceiros');
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  const remainingPartners = partners.slice(8);

  return (
    <main className="min-h-screen pt-24 pb-12 bg-muted" ref={ref}>
      <Header />
      <div className="container mx-auto px-4">
        <motion.header
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-8"
        >
          <h1 className="text-2xl font-bold">Empresas Parceiras</h1>
          <p className="mt-2 text-muted-foreground">Conheça as empresas que apoiam e potencializam o trabalho das entidades.</p>
        </motion.header>

        {loading && <p className="text-center text-sm text-muted-foreground mb-6">Carregando parceiros...</p>}
        {!loading && error && <p className="text-center text-sm text-destructive mb-6">{error}</p>}
        {!loading && !error && remainingPartners.length === 0 && (
          <p className="text-center text-sm text-muted-foreground mb-6">Nenhuma empresa parceira encontrada.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {remainingPartners.map((partner, i) => (
            <motion.div key={partner._id ?? partner.id ?? i} initial={{ opacity: 0, scale: 0.98 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: i * 0.03 }}>
              <Dialog open={selected === i} onOpenChange={(open) => setSelected(open ? i : null)}>
                <DialogTrigger asChild>
                  <div className={`group bg-background border border-border rounded-xl p-4 text-center ${hoverAccents[i % hoverAccents.length]} hover:shadow transition-all cursor-pointer`}>
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full mx-auto flex items-center justify-center mb-2"> 
                      <span className="text-sm font-semibold text-primary">{partner.name.split(' ')[0]}</span>
                    </div>
                    <p className="text-sm font-semibold text-foreground">{partner.name}</p>
                    <span className="text-xs text-muted-foreground mt-1 inline-block">{(partner.sectors || []).join(', ') || 'Parceiro'}</span>
                  </div>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{partner.name}</DialogTitle>
                    <DialogDescription>{(partner.sectors || []).join(', ') || 'Setor'}</DialogDescription>
                  </DialogHeader>

                  <div className="mt-2 text-sm text-muted-foreground">{partner.description || 'Parceiro da FEAPP'}</div>

                  <div className="mt-3 text-sm text-muted-foreground">
                    {partner.contactName && <div>Contato: {partner.contactName}</div>}
                    {partner.contactEmail && <div>E-mail: {partner.contactEmail}</div>}
                    {partner.contactPhone && <div>Telefone: {partner.contactPhone}</div>}
                  </div>

                  {partner.website && (
                    <div className="mt-3">
                      <a className="inline-flex items-center gap-2 text-sm text-primary" href={partner.website} target="_blank" rel="noreferrer">
                        Visitar site <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  )}

                  <DialogClose asChild>
                    <button className="mt-4 inline-flex items-center rounded-md bg-primary px-3 py-1 text-sm text-white">Fechar</button>
                  </DialogClose>
                </DialogContent>
              </Dialog>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Partners;
