import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiUrl } from "@/lib/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setLoading(true);
      const loginResponse = await fetch(apiUrl("/api/auth/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const loginData = await loginResponse.json();

      if (!loginResponse.ok) {
        throw new Error(loginData.message || "Falha no login");
      }

      const token = loginData.token as string;

      const meResponse = await fetch(apiUrl("/api/auth/me"), {
        headers: { Authorization: `Bearer ${token}` },
      });

      const meData = await meResponse.json();

      if (!meResponse.ok) {
        throw new Error(meData.message || "Falha ao validar usuário");
      }

      if (meData.role !== "admin") {
        throw new Error("Acesso permitido apenas para Admin Geral");
      }

      localStorage.setItem("feapp_admin_token", token);
      localStorage.setItem("feapp_admin_user", JSON.stringify(meData));

      toast({ title: "Login realizado", description: "Bem-vindo, Admin Geral." });
      navigate("/admin/painel");
    } catch (error) {
      toast({
        title: "Erro no login",
        description: error instanceof Error ? error.message : "Tente novamente",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-muted pt-24 pb-12">
      <Header />
      <div className="container mx-auto max-w-md px-4">
        <div className="rounded-xl border bg-background p-6 shadow-card">
          <h1 className="text-2xl font-bold">Login Admin Geral</h1>
          <p className="mt-2 text-sm text-muted-foreground">Entre com seu usuário administrativo.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium">E-mail</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@feapp.com"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Senha</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default AdminLogin;
