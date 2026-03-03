import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiUrl } from "@/lib/api";
import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setLoading(true);
      const response = await fetch(apiUrl("/api/auth/forgot-password"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao solicitar recuperação de senha");
      }

      setEmailSent(true);
      toast({ title: "Solicitação enviada", description: "Verifique sua caixa de entrada." });
    } catch (error) {
      toast({
        title: "Erro",
        description: error instanceof Error ? error.message : "Falha ao enviar solicitação",
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
          <h1 className="text-2xl font-bold">Esqueci minha senha</h1>
          <p className="mt-2 text-sm text-muted-foreground">Informe seu e-mail para receber o link de redefinição.</p>

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

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Enviando..." : "Enviar link"}
            </Button>
          </form>

          {emailSent && (
            <p className="mt-4 text-sm text-emerald-600">Verifique sua caixa de entrada.</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default ForgotPassword;
