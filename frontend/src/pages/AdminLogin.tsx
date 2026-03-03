import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiUrl } from "@/lib/api";
import { useState, useEffect, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // captcha do backend: { question: string, hash: string }
  const [captchaData, setCaptchaData] = useState<{ question: string; hash: string } | null>(null);
  const [captchaInput, setCaptchaInput] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // buscar desafio do backend
  const fetchCaptcha = async () => {
    try {
      const res = await fetch(apiUrl("/api/captcha/generate"));
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Erro ao gerar desafio");
      setCaptchaData(data);
      setCaptchaInput("");
    } catch (error) {
      toast({ title: "Erro ao carregar desafio", description: error instanceof Error ? error.message : "Tente novamente", variant: "destructive" });
    }
  };

  useEffect(() => {
    fetchCaptcha();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    // validação simples do captcha
    if (!captchaData) {
      toast({ title: "Desafio indisponível", description: "Não foi possível carregar o desafio. Tente recarregar.", variant: "destructive" });
      return;
    }

    if (captchaInput.trim() === "") {
      toast({ title: "Resposta necessária", description: "Digite a resposta do desafio para continuar.", variant: "destructive" });
      return;
    }

    try {
      setLoading(true);
      const payload = {
        email,
        password,
        // enviar como string — alguns backends aceitam e fazem parse; evita enviar null se Number() for NaN
        captchaAnswer: captchaInput,
        captchaHash: captchaData.hash,
      };

      // debug: mostrar o payload que será enviado
      // (remova console.logs em produção)
      // eslint-disable-next-line no-console
      console.log("Login payload:", payload);

      const loginResponse = await fetch(apiUrl("/api/auth/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let loginData: any = null;
      try {
        loginData = await loginResponse.json();
      } catch (e) {
        // caso a resposta não seja JSON
        // eslint-disable-next-line no-console
        console.error("Login response not JSON", await loginResponse.text());
      }

      if (!loginResponse.ok) {
        // eslint-disable-next-line no-console
        console.error("Login failed", loginResponse.status, loginData);
        throw new Error(loginData?.message || "Falha no login");
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
      // Em caso de erro no login (captcha incorreto ou outro), recarregar desafio e limpar input
      try {
        setCaptchaInput("");
        fetchCaptcha();
      } catch (e) {
        // sem ação adicional
      }
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

            <div>
              <label className="mb-2 block text-sm font-medium">Desafio</label>
              {captchaData ? (
                <div className="space-y-2">
                  <div className="text-sm font-medium">{captchaData.question}</div>
                  <Input
                    type="number"
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    placeholder="Resposta"
                    required
                  />
                  <div className="text-right">
                    <button type="button" className="text-sm text-primary hover:underline" onClick={fetchCaptcha}>
                      Recarregar desafio
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Carregando desafio...</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </Button>

            <div className="text-right">
              <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                Esqueci minha senha
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default AdminLogin;
