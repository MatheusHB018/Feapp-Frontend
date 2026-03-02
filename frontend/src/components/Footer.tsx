import { Instagram, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10">
          <div>
            <p className="text-sm leading-relaxed text-secondary-foreground/60">
              Federação das Entidades Assistenciais de Presidente Prudente
            </p>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold text-secondary-foreground mb-4 uppercase tracking-wider">
              Endereço
            </h4>
            <p className="text-sm leading-relaxed text-secondary-foreground/60">
              Rua Doutor Gurgel, s/n (Fundos) – Centro Presidente Prudente – SP 
              <br />
              CEP: 19015-140
            </p>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold text-secondary-foreground mb-4 uppercase tracking-wider">
              Transparência
            </h4>
            <p className="text-sm text-secondary-foreground/60">
              CNPJ: 03.898.606/0001-84
            </p>
            <div className="flex flex-col gap-2 mt-3">
              <a
                href="#"
                className="text-sm text-secondary-foreground/60 hover:text-secondary-foreground transition-colors"
              >
                Política de Privacidade
              </a>
              <a
                href="#"
                className="text-sm text-secondary-foreground/60 hover:text-secondary-foreground transition-colors"
              >
                Prestação de Contas
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold text-secondary-foreground mb-4 uppercase tracking-wider">
              Redes Sociais
            </h4>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/federacaodasentidades/?hl=en"
                className="text-secondary-foreground/60 hover:text-secondary-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/federacaodasentidades/"
                className="text-secondary-foreground/60 hover:text-secondary-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/10 mt-12 pt-8 text-center text-xs text-secondary-foreground/40">
          © {new Date().getFullYear()} FEAPP – Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
