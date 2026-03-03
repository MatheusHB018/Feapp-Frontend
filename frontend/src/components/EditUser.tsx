import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiUrl } from "@/lib/api";

type EditUserProps = {
  userId: string | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdated: () => void | Promise<void>;
};

type UserDetails = {
  name: string;
  email: string;
  role: string;
};

const EditUser = ({ userId, isOpen, onClose, onUpdated }: EditUserProps) => {
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isOpen || !userId) return;

    const fetchUser = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("feapp_admin_token") || localStorage.getItem("token") || "";

        const response = await fetch(apiUrl(`/api/users/${userId}`), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Erro ao carregar usuário");
        }

        const user: UserDetails = data.data || data;
        setName(user.name || "");
        setEmail(user.email || "");
        setRole(user.role || "user");
      } catch (error) {
        toast({
          title: "Erro",
          description: error instanceof Error ? error.message : "Falha ao carregar dados do usuário",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [isOpen, userId, toast]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!userId) return;

    try {
      setSaving(true);
      const token = localStorage.getItem("feapp_admin_token") || localStorage.getItem("token") || "";

      const response = await fetch(apiUrl(`/api/users/${userId}`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, email, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao atualizar usuário");
      }

      toast({ title: "Sucesso", description: "Usuário atualizado com sucesso." });
      await onUpdated();
      onClose();
    } catch (error) {
      toast({
        title: "Erro",
        description: error instanceof Error ? error.message : "Falha ao atualizar usuário",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-lg rounded-2xl border bg-background p-6 shadow-card"
            initial={{ y: 12, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 12, opacity: 0, scale: 0.98 }}
          >
            <h2 className="text-xl font-semibold">Editar Utilizador</h2>

            {loading ? (
              <p className="mt-4 text-sm text-muted-foreground">Carregando dados...</p>
            ) : (
              <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="mb-2 block text-sm font-medium">Nome</label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} required />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">E-mail</label>
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Role</label>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                    <option value="association">association</option>
                    <option value="partner">partner</option>
                  </select>
                </div>

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={onClose} className="hover:opacity-90">
                    Cancelar
                  </Button>
                  <Button type="submit" disabled={saving} className="hover:opacity-90">
                    {saving ? "Salvando..." : "Salvar"}
                  </Button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditUser;