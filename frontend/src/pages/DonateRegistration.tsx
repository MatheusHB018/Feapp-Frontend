import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiUrl } from "@/lib/api";
import { useEffect, useState } from "react";

type Association = {
  _id: string;
  name: string;
};

const DonateRegistration = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [associationId, setAssociationId] = useState("");
  const [associations, setAssociations] = useState<Association[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchAssociations = async () => {
      try {
        const response = await fetch(apiUrl("/api/associations/public"));
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Erro ao carregar associações");
        }

        setAssociations(data.data || []);
      } catch (error) {
        toast({
          title: "Erro",
          description: error instanceof Error ? error.message : "Não foi possível carregar associações",
          variant: "destructive",
        });
      }
    };

    fetchAssociations();
  }, [toast]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setLoading(true);
      const response = await fetch(apiUrl("/api/support-requests"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "donation",
          fullName,
          email,
          phone,
          associationId,
          message,
        }),
      });

      const data = await response.json();

      if (![200, 201].includes(response.status)) {
        throw new Error(data.message || "Erro ao cadastrar doação");
      }

      toast({
        title: "Obrigado!",
        description: "Sua intenção de doação foi registrada. Entraremos em contato.",
      });

      setFullName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setAssociationId("");
    } catch (error) {
      toast({
        title: "Erro ao enviar",
        description:
          error instanceof Error
            ? error.message
            : "Não conseguimos registrar sua doação agora. Tente novamente em instantes.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-muted pt-24 pb-12">
      <Header />
      <div className="container mx-auto max-w-2xl px-4">
        <div className="rounded-xl border bg-background p-6 shadow-card">
          <h1 className="text-2xl font-bold">Quero Doar</h1>
          <p className="mt-2 text-sm text-muted-foreground">Cadastre seus dados e escolha a associação para sua doação.</p>

          <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium">Nome completo</label>
              <Input value={fullName} onChange={(e) => setFullName(e.target.value)} required />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">E-mail</label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Telefone</label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} required />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Escolha a associação</label>
              <select
                value={associationId}
                onChange={(e) => setAssociationId(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                required
              >
                <option value="">Selecione...</option>
                {associations.map((association) => (
                  <option key={association._id} value={association._id}>
                    {association.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Mensagem (opcional)</label>
              <Textarea value={message} onChange={(e) => setMessage(e.target.value)} />
            </div>

            <Button type="submit" disabled={loading}>
              {loading ? "Enviando..." : "Cadastrar Doação"}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default DonateRegistration;
