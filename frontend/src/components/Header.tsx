import { useState } from "react";
import { Menu, X, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";


const navItems = [
  { label: "Quem Somos", href: "#sobre" },
  { label: "Entidades", href: "#entidades" },
  { label: "Parceiros", href: "#parceiros" },
  { label: "Eventos", href: "#eventos" },
  { label: "Contato", href: "#ajudar" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const hasAdminToken = Boolean(localStorage.getItem("feapp_admin_token"));
  const adminPath = hasAdminToken ? "/admin/painel" : "/login";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
       

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href.startsWith("#") ? `/${item.href}` : item.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to={adminPath}
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Admin
          </Link>
        </nav>

        <Link
          to="/quero-doar"
          className="hidden md:inline-flex items-center gap-2 bg-accent text-accent-foreground px-5 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          <Heart className="w-4 h-4" />
          Quero Doar
        </Link>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-foreground"
          aria-label="Menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-background border-b border-border"
          >
            <div className="flex flex-col gap-4 p-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href.startsWith("#") ? `/${item.href}` : item.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-lg font-medium text-foreground"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/quero-doar"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-5 py-3 rounded-lg font-semibold mt-2"
              >
                <Heart className="w-4 h-4" />
                Quero Doar
              </Link>
              <Link
                to={adminPath}
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center gap-2 border border-border px-5 py-3 rounded-lg font-semibold"
              >
                Admin
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
