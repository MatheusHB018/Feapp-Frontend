export type Entity = {
  name: string;
  area: string;
  description?: string;
};

export const allEntities: Entity[] = [
  { 
    name: "Lar Santa Filomena", 
    area: "Crianças e Jovens", 
    description: "Acolhimento institucional e proteção para crianças e adolescentes em situação de vulnerabilidade." 
  },
  { 
    name: "Lar dos Meninos", 
    area: "Crianças e Jovens", 
    description: "Oferece moradia, assistência e formação para meninos em risco social." 
  },
  { 
    name: "Fundação Mirim de Presidente Prudente", 
    area: "Educação e Trabalho", 
    description: "Referência na inserção de jovens no mercado de trabalho através do programa Jovem Aprendiz." 
  },
  { 
    name: "Casa do Pequeno Trabalhador", 
    area: "Educação e Trabalho", 
    description: "Promove a profissionalização e cidadania de jovens, preparando-os para o primeiro emprego." 
  },
  { 
    name: "Casa da Criança e Centro Social São José", 
    area: "Crianças e Jovens", 
    description: "Atividades socioeducativas e apoio pedagógico no contraturno escolar." 
  },
  { 
    name: "Projeto Aquarela", 
    area: "Crianças e Jovens", 
    description: "Oficinas de arte, cultura e educação complementar para o desenvolvimento infantil." 
  },
  { 
    name: "Associação Bethel - Projeto Mão Amiga", 
    area: "Apoio Social", 
    description: "Fortalecimento de vínculos familiares e proteção social básica para famílias carentes." 
  },
  { 
    name: "Associação Betesda", 
    area: "Crianças e Jovens", 
    description: "Projetos de esporte, cultura e lazer para crianças em comunidades vulneráveis." 
  },
  { 
    name: "Legião da Boa Vontade (LBV)", 
    area: "Assistência Social", 
    description: "Programas socioeducativos e entrega de cestas básicas para famílias de baixa renda." 
  },
  { 
    name: "Centro Adventista de Desenvolvimento (CADECA)", 
    area: "Crianças e Jovens", 
    description: "Apoio educacional e desenvolvimento integral de crianças e adolescentes." 
  },
  { 
    name: "Creche Anita Ferreira Braga de Oliveira", 
    area: "Educação Infantil", 
    description: "Educação e cuidados essenciais para crianças na primeira infância." 
  },
  { 
    name: "Associação Lúmen Et Fides", 
    area: "Saúde e Reabilitação", 
    description: "Tratamento especializado para crianças com disfunções neuromotoras, autismo e paralisia cerebral." 
  },
  { 
    name: "Associação Filantrópica de Proteção aos Cegos", 
    area: "Saúde e Reabilitação", 
    description: "Reabilitação, acolhimento e integração social de pessoas com deficiência visual." 
  },
  { 
    name: "Unipode (União das Pessoas com Deficiência)", 
    area: "Saúde e Reabilitação", 
    description: "Convivência e oficinas para inclusão social de adultos com deficiência intelectual." 
  },
  { 
    name: "Núcleo Ttere de Trabalho - Realização", 
    area: "Inclusão Produtiva", 
    description: "Inclusão social e geração de renda para pessoas com deficiência através do trabalho." 
  },
  { 
    name: "Associação de Peregrinação do Rosário", 
    area: "Saúde e Reabilitação", 
    description: "Atendimento e proteção social para adultos e idosos com dependência." 
  },
  { 
    name: "AFIPP (Assoc. Apoio ao Fissurado Lábio Palatal)", 
    area: "Saúde Especializada", 
    description: "Suporte integral e reabilitação para pacientes com fissura labiopalatina." 
  },
  { 
    name: "APPA (Assoc. Prudentina de Prevenção à AIDS)", 
    area: "Saúde", 
    description: "Apoio psicossocial, prevenção e assistência a portadores de HIV/AIDS." 
  },
  { 
    name: "Rede Feminina de Combate ao Câncer", 
    area: "Saúde", 
    description: "Acolhimento humanizado e suporte assistencial a pacientes oncológicos." 
  },
  { 
    name: "APAE Presidente Prudente", 
    area: "Saúde e Educação", 
    description: "Assistência, educação e defesa de direitos da pessoa com deficiência intelectual." 
  },
  { 
    name: "Lar São Rafael", 
    area: "Idosos", 
    description: "Instituição de longa permanência oferecendo moradia e cuidados integrais a idosos." 
  },
  { 
    name: "Vila da Fraternidade", 
    area: "Idosos", 
    description: "Moradia assistida e centro de convivência para promover a qualidade de vida na terceira idade." 
  },
  { 
    name: "Associação de Atenção ao Idoso", 
    area: "Idosos", 
    description: "Projetos de valorização, saúde física e mental para a melhor idade." 
  },
  { 
    name: "Sociedade São Vicente de Paulo", 
    area: "Apoio Comunitário", 
    description: "Auxílio emergencial e visitação a famílias em situação de pobreza extrema." 
  },
  { 
    name: "Casa da Sopa Francisco de Assis", 
    area: "Segurança Alimentar", 
    description: "Fornecimento diário de refeições nutritivas para a população em situação de rua." 
  },
  { 
    name: "Serviço de Obras Sociais (SOS)", 
    area: "Apoio Social", 
    description: "Atendimento a migrantes e pessoas em situação de rua com triagem e albergue." 
  },
  { 
    name: "Esquadrão da Vida", 
    area: "Recuperação", 
    description: "Comunidade terapêutica dedicada à recuperação de dependentes químicos." 
  },
  { 
    name: "APREV (Assoc. Prudente Recuperando Vidas)", 
    area: "Recuperação", 
    description: "Tratamento, apoio e reinserção social de dependentes de álcool e drogas." 
  },
  { 
    name: "Associação Antialcoólica", 
    area: "Recuperação", 
    description: "Grupos de apoio mútuo para recuperação e combate ao alcoolismo." 
  },
  { 
    name: "Centro Social Santa Rita de Cássia", 
    area: "Apoio Comunitário", 
    description: "Atividades comunitárias, bazar beneficente e apoio a famílias da zona leste." 
  },
  { 
    name: "Centro Social Nossa Senhora Aparecida", 
    area: "Apoio Comunitário", 
    description: "Assistência social paroquial com foco no atendimento a famílias vulneráveis." 
  },
  { 
    name: "Associação Beneficente Cristã", 
    area: "Apoio Social", 
    description: "Ações de caridade cristã e suporte material para pessoas carentes." 
  },
  { 
    name: "Grupo de Auxílio Fraterno", 
    area: "Apoio Social", 
    description: "Entidade de apoio mútuo focada em caridade e suporte a situações de vulnerabilidade." 
  }
];

export const featuredEntities = allEntities.slice(0, 12);
