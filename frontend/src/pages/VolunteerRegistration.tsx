import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiUrl } from "@/lib/api";
import { useEffect, useState } from "react";

type CaptchaData = {
  question: string;
  hash: string;
};

const availabilityOptions = ["Manhã", "Tarde", "Noite", "Finais de Semana"];

const VolunteerRegistration = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [availability, setAvailability] = useState("");
  const [interestArea, setInterestArea] = useState("");

  const [captchaData, setCaptchaData] = useState<CaptchaData | null>(null);
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [loadingCaptcha, setLoadingCaptcha] = useState(false);
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const fetchCaptcha = async () => {
    try {
      setLoadingCaptcha(true);
      const response = await fetch(apiUrl("/api/captcha/generate"));
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao carregar CAPTCHA");
      }

      setCaptchaData({ question: data.question, hash: data.hash });
      setCaptchaAnswer("");
    } catch (error) {
      setCaptchaData(null);
      toast({
        title: "Erro",
        description: error instanceof Error ? error.message : "Não foi possível carregar o CAPTCHA",
        variant: "destructive",
      });
    } finally {
      setLoadingCaptcha(false);
    }
  };

  useEffect(() => {
    fetchCaptcha();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetForm = () => {
    setFullName("");
    setEmail("");
    setWhatsapp("");
    setAvailability("");
    setInterestArea("");
    setCaptchaAnswer("");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!captchaData) {
      toast({
        title: "CAPTCHA indisponível",
        description: "Recarregue o desafio antes de enviar.",
        variant: "destructive",
      });
      return;
    }

    const parsedCaptchaAnswer = Number(captchaAnswer);
    if (!Number.isFinite(parsedCaptchaAnswer)) {
      toast({
        title: "Resposta inválida",
        description: "Digite um número válido no CAPTCHA.",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(apiUrl("/api/volunteers"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          whatsapp,
          availability,
          interestArea,
          captchaAnswer: parsedCaptchaAnswer,
          captchaHash: captchaData.hash,
        }),
      });

      const data = await response.json();

      if (![200, 201].includes(response.status)) {
        throw new Error(data.message || "Erro ao cadastrar voluntário");
      }

      toast({
        title: "Cadastro enviado!",
        description: "Obrigado por se voluntariar. Em breve entraremos em contato.",
      });

      resetForm();
      await fetchCaptcha();
    } catch (error) {
      toast({
        title: "Erro ao enviar",
        description:
          error instanceof Error
            ? error.message
            : "Não foi possível enviar seu cadastro agora. Tente novamente.",
        variant: "destructive",
      });
      await fetchCaptcha();
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-muted pt-24 pb-12">
      <Header />
      <div className="container mx-auto max-w-2xl px-4">
        <div className="rounded-2xl border bg-background p-6 shadow-card sm:p-8">
          <h1 className="text-2xl font-bold">Seja Voluntário</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Preencha a ficha abaixo para se cadastrar como voluntário na FEAPP.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium">Nome Completo</label>
              <Input
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                placeholder="Seu nome completo"
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">E-mail</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="seuemail@dominio.com"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">WhatsApp (Telefone)</label>
                <Input
                  value={whatsapp}
                  onChange={(event) => setWhatsapp(event.target.value)}
                  placeholder="(18) 99999-9999"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Disponibilidade</label>
              <select
                value={availability}
                onChange={(event) => setAvailability(event.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                required
              >
                <option value="">Selecione...</option>
                {availabilityOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Area de Interesse</label>
              <Textarea
                value={interestArea}
                onChange={(event) => setInterestArea(event.target.value)}
                placeholder="Ex.: apoio em eventos, administrativo, comunicação, arrecadações..."
                required
              />
            </div>

            <div className="rounded-lg border bg-muted/40 p-4">
              <div className="mb-2 flex items-center justify-between gap-3">
                <label className="text-sm font-medium">CAPTCHA Matemático</label>
                <button
                  type="button"
                  className="text-sm text-primary hover:underline"
                  onClick={fetchCaptcha}
                  disabled={loadingCaptcha || loading}
                >
                  {loadingCaptcha ? "Carregando..." : "Recarregar desafio"}
                </button>
              </div>

              {captchaData ? (
                <>
                  <p className="text-sm text-foreground">{captchaData.question}</p>
                  <Input
                    type="number"
                    className="mt-3"
                    value={captchaAnswer}
                    onChange={(event) => setCaptchaAnswer(event.target.value)}
                    placeholder="Digite o resultado"
                    required
                  />
                </>
              ) : (
                <p className="text-sm text-muted-foreground">Carregando desafio...</p>
              )}
            </div>

            <Button type="submit" disabled={loading || loadingCaptcha || !captchaData}>
              {loading ? "Enviando..." : "Enviar Cadastro"}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default VolunteerRegistration;
