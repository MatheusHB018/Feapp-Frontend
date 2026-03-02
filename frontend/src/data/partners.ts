export type Partner = {
  id: string;
  name: string;
  website?: string;
  logoUrl?: string;
  description?: string;
  sectors?: string[];
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
};

// Exemplo inicial — substitua por API quando disponível
export const partners: Partner[] = [
  {
    id: 'p1',
    name: 'Sicoob Paulista',
    website: '',
    logoUrl: '',
    description: 'Forte parceiro financeiro, patrocinador principal de eventos de fim de ano como a Vila Natal.',
    sectors: ['Patrocínio', 'Financeiro'],
    contactName: '',
    contactEmail: '',
    contactPhone: '',
  },
  {
    id: 'p2',
    name: 'Energisa',
    website: '',
    logoUrl: '',
    description: 'Patrocinadora master, apoia infraestrutura e iluminação em eventos.',
    sectors: ['Patrocínio', 'Energia'],
    contactName: '',
    contactEmail: '',
    contactPhone: '',
  },
  {
    id: 'p3',
    name: 'Bebidas Funada',
    website: '',
    logoUrl: '',
    description: 'Parceira em eventos gastronômicos e realizadora do Festival da Tubaína Funada.',
    sectors: ['Alimentação', 'Eventos'],
    contactName: '',
    contactEmail: '',
    contactPhone: '',
  },
  {
    id: 'p4',
    name: 'ACIPP',
    website: '',
    logoUrl: '',
    description: 'Associação Comercial e Empresarial — co-realizadora de eventos como a Vila Natal Centro.',
    sectors: ['Institucional', 'Comércio'],
    contactName: '',
    contactEmail: '',
    contactPhone: '',
  },
  {
    id: 'p5',
    name: 'Sincomércio',
    website: '',
    logoUrl: '',
    description: 'Sindicato do Comércio Varejista — apoia campanhas de final de ano.',
    sectors: ['Institucional', 'Comércio'],
    contactName: '',
    contactEmail: '',
    contactPhone: '',
  },
  {
    id: 'p6',
    name: 'Sebrae',
    website: '',
    logoUrl: '',
    description: 'Apoio em estruturação de feiras e capacitação de gestão.',
    sectors: ['Apoio Técnico', 'Capacitação'],
    contactName: '',
    contactEmail: '',
    contactPhone: '',
  },
  {
    id: 'p7',
    name: 'Prefeitura Municipal de Presidente Prudente',
    website: '',
    logoUrl: '',
    description: 'Cede espaços públicos e infraestrutura através de Secult e Setur.',
    sectors: ['Institucional', 'Governo'],
    contactName: '',
    contactEmail: '',
    contactPhone: '',
  },
  {
    id: 'p8',
    name: 'Unoeste',
    website: '',
    logoUrl: '',
    description: 'Universidade parceira que fornece voluntários e equipes de saúde para atendimentos gratuitos.',
    sectors: ['Educação', 'Saúde'],
    contactName: '',
    contactEmail: '',
    contactPhone: '',
  },
  {
    id: 'p9',
    name: 'Jornal O Imparcial',
    website: '',
    logoUrl: '',
    description: 'Parceiro de divulgação e cobertura jornalística.',
    sectors: ['Mídia', 'Comunicação'],
    contactName: '',
    contactEmail: '',
    contactPhone: '',
  },
  {
    id: 'p10',
    name: 'Grupo Bandeirantes (Band Multi)',
    website: '',
    logoUrl: '',
    description: 'Apoio na cobertura televisiva e divulgação.',
    sectors: ['Mídia', 'Comunicação'],
    contactName: '',
    contactEmail: '',
    contactPhone: '',
  },
];
