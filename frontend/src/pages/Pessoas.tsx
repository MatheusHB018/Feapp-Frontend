import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiUrl } from "@/lib/api";
import { AnimatePresence, motion } from "framer-motion";
import { Pencil, X } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

type Pessoa = {
  id?: string;
  _id?: string;
  nome: string;
  idade: number;
};

const Pessoas = () => {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [loading, setLoading] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPessoaId, setSelectedPessoaId] = useState("");
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchPessoas = async () => {
    try {
      setLoading(true);
      const response = await axios.get(apiUrl("/api/Pessoa"));
      const data = response.data;

      if (Array.isArray(data)) {
        setPessoas(data);
        return;
      }

      if (Array.isArray(data?.data)) {
        setPessoas(data.data);
        return;
      }

      setPessoas([]);
    } catch {
      alert("Não foi possível carregar as pessoas agora. Tente novamente em instantes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPessoas();
  }, []);

  const openEditModal = (pessoa: Pessoa) => {
    const pessoaId = pessoa.id || pessoa._id || "";
    setSelectedPessoaId(pessoaId);
    setNome(pessoa.nome || "");
    setIdade(String(pessoa.idade ?? ""));
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedPessoaId("");
    setNome("");
    setIdade("");
  };

  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedPessoaId) {
      alert("Pessoa inválida para edição.");
      return;
    }

    try {
      setSaving(true);
      await axios.put(apiUrl(`/api/Pessoa/${selectedPessoaId}`), {
        nome,
        idade: Number(idade),
      });

      closeEditModal();
      await fetchPessoas();
      toast.success("Pessoa atualizada com sucesso!");
    } catch {
      alert("Não foi possível atualizar a pessoa. Verifique os dados e tente novamente.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-muted pt-24 pb-12">
      <Header />
      <Toaster position="top-right" />

      <div className="container mx-auto px-4">
        <section className="rounded-xl border bg-background p-6 shadow-card">
          <h1 className="text-2xl font-bold">Pessoas</h1>
          <p className="mt-2 text-sm text-muted-foreground">Gerencie os dados das pessoas cadastradas.</p>

          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full divide-y divide-border">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Nome</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Idade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {loading ? (
                  <tr>
                    <td className="px-4 py-4 text-sm text-muted-foreground" colSpan={2}>
                      Carregando pessoas...
                    </td>
                  </tr>
                ) : pessoas.length === 0 ? (
                  <tr>
                    <td className="px-4 py-4 text-sm text-muted-foreground" colSpan={2}>
                      Nenhuma pessoa encontrada.
                    </td>
                  </tr>
                ) : (
                  pessoas.map((pessoa) => (
                    <tr key={pessoa.id || pessoa._id}>
                      <td className="px-4 py-4 text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <span>{pessoa.nome}</span>
                          <button
                            type="button"
                            onClick={() => openEditModal(pessoa)}
                            className="inline-flex items-center justify-center rounded-lg border border-border p-2 hover:bg-accent transition-colors"
                            aria-label={`Editar ${pessoa.nome}`}
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-muted-foreground">{pessoa.idade}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <AnimatePresence>
        {isEditModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-md rounded-2xl border bg-background p-6 shadow-card"
              initial={{ scale: 0.96, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Editar Pessoa</h2>
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="inline-flex items-center justify-center rounded-lg border border-border p-2 hover:bg-accent transition-colors"
                  aria-label="Fechar modal"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form className="space-y-4" onSubmit={handleUpdate}>
                <div>
                  <label className="mb-2 block text-sm font-medium">Nome</label>
                  <Input value={nome} onChange={(e) => setNome(e.target.value)} required />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Idade</label>
                  <Input
                    type="number"
                    min={0}
                    value={idade}
                    onChange={(e) => setIdade(e.target.value)}
                    required
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={closeEditModal} className="hover:opacity-90">
                    Cancelar
                  </Button>
                  <Button type="submit" disabled={saving} className="hover:opacity-90">
                    {saving ? "Salvando..." : "Salvar"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Pessoas;
