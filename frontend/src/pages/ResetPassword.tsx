import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiUrl } from "@/lib/api";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!token) {
      toast({ title: "Erro", description: "Token inválido.", variant: "destructive" });
      return;
    }

    if (password !== confirmPassword) {
      toast({ title: "Erro", description: "As senhas não conferem.", variant: "destructive" });
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(apiUrl(`/api/auth/reset-password/${token}`), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao redefinir senha");
      }

      toast({ title: "Senha redefinida", description: "Faça login com sua nova senha." });
      navigate("/login");
    } catch (error) {
      toast({
        title: "Erro",
        description: error instanceof Error ? error.message : "Falha ao redefinir senha",
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
          <h1 className="text-2xl font-bold">Redefinir senha</h1>
          <p className="mt-2 text-sm text-muted-foreground">Digite e confirme sua nova senha.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium">Nova Senha</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Confirmar Nova Senha</label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="********"
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Salvando..." : "Salvar nova senha"}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ResetPassword;
