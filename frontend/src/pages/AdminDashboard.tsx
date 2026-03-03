import Header from "@/components/Header";
import EditUser from "@/components/EditUser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiUrl } from "@/lib/api";
import { Pencil } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

type Association = {
  _id: string;
  name: string;
  cnpj: string;
  activityTypes?: string[];
  status: "active" | "inactive";
};

type EventItem = {
  _id: string;
  name: string;
  date: string;
  location: string;
  description?: string;
  status: "active" | "inactive";
};

type PartnerItem = {
  _id: string;
  name: string;
  website?: string;
  description?: string;
  sectors?: string[];
  status: "active" | "inactive";
};

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const token = useMemo(() => localStorage.getItem("feapp_admin_token") || "", []);

  const [associations, setAssociations] = useState<Association[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [partners, setPartners] = useState<PartnerItem[]>([]);
  const [admins, setAdmins] = useState<User[]>([]);

  const [editingAssociationId, setEditingAssociationId] = useState<string | null>(null);
  const [associationName, setAssociationName] = useState("");
  const [associationCnpj, setAssociationCnpj] = useState("");
  const [associationActivities, setAssociationActivities] = useState("");
  const [associationStatus, setAssociationStatus] = useState<"active" | "inactive">("active");

  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventStatus, setEventStatus] = useState<"active" | "inactive">("active");

  const [loadingAssociations, setLoadingAssociations] = useState(false);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [loadingPartners, setLoadingPartners] = useState(false);
  const [loadingAdmins, setLoadingAdmins] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);

  const [newAdminName, setNewAdminName] = useState("");
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [newAdminPassword, setNewAdminPassword] = useState("");
  const [registeringAdmin, setRegisteringAdmin] = useState(false);

  const [partnerSearch, setPartnerSearch] = useState("");
  const [partnerFilterStatus, setPartnerFilterStatus] = useState<"all" | "active" | "inactive">("all");

  const [associationSearch, setAssociationSearch] = useState("");
  const [associationFilterStatus, setAssociationFilterStatus] = useState<"all" | "active" | "inactive">("all");
  const [associationFilterArea, setAssociationFilterArea] = useState("all");

  const [eventSearch, setEventSearch] = useState("");
  const [eventFilterStatus, setEventFilterStatus] = useState<"all" | "active" | "inactive">("all");
  const [eventFilterMonth, setEventFilterMonth] = useState("all");

  const authHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const resetAssociationForm = () => {
    setEditingAssociationId(null);
    setAssociationName("");
    setAssociationCnpj("");
    setAssociationActivities("");
    setAssociationStatus("active");
  };

  const resetEventForm = () => {
    setEditingEventId(null);
    setEventName("");
    setEventDate("");
    setEventLocation("");
    setEventDescription("");
    setEventStatus("active");
  };

  const [editingPartnerId, setEditingPartnerId] = useState<string | null>(null);
  const [partnerName, setPartnerName] = useState("");
  const [partnerWebsite, setPartnerWebsite] = useState("");
  const [partnerDescription, setPartnerDescription] = useState("");
  const [partnerSectors, setPartnerSectors] = useState("");
  const [partnerStatus, setPartnerStatus] = useState<"active" | "inactive">("active");

  const resetPartnerForm = () => {
    setEditingPartnerId(null);
    setPartnerName("");
    setPartnerWebsite("");
    setPartnerDescription("");
    setPartnerSectors("");
    setPartnerStatus("active");
  };

  const fetchMe = async () => {
    const response = await fetch(apiUrl("/api/auth/me"), {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    if (!response.ok || data.role !== "admin") {
      localStorage.removeItem("feapp_admin_token");
      localStorage.removeItem("feapp_admin_user");
      navigate("/login");
      throw new Error("Acesso permitido apenas para Admin Geral");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("feapp_admin_token");
    localStorage.removeItem("feapp_admin_user");
    navigate("/login");
  };

  const handleRegisterAdmin = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setRegisteringAdmin(true);
      const response = await fetch(apiUrl("/api/auth/register-admin"), {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({
          name: newAdminName,
          email: newAdminEmail,
          password: newAdminPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao cadastrar administrador");
      }

      toast({ title: "Sucesso", description: "Administrador cadastrado com sucesso." });
      setNewAdminName("");
      setNewAdminEmail("");
      setNewAdminPassword("");
      fetchAdmins();
    } catch (error) {
      toast({
        title: "Erro",
        description: error instanceof Error ? error.message : "Falha ao cadastrar administrador",
        variant: "destructive",
      });
    } finally {
      setRegisteringAdmin(false);
    }
  };

  const fetchAssociations = async () => {
    try {
      setLoadingAssociations(true);
      const response = await fetch(apiUrl("/api/associations?limit=100"), {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao carregar associações");
      }

      setAssociations(data.data || []);
    } catch (error) {
      toast({
        title: "Erro",
        description: error instanceof Error ? error.message : "Falha ao carregar associações",
        variant: "destructive",
      });
    } finally {
      setLoadingAssociations(false);
    }
  };

  const fetchEvents = async () => {
    try {
      setLoadingEvents(true);
      const response = await fetch(apiUrl("/api/events?limit=100"), {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao carregar eventos");
      }

      setEvents(data.data || []);
    } catch (error) {
      toast({
        title: "Erro",
        description: error instanceof Error ? error.message : "Falha ao carregar eventos",
        variant: "destructive",
      });
    } finally {
      setLoadingEvents(false);
    }
  };

  const fetchPartners = async () => {
    try {
      setLoadingPartners(true);
      const response = await fetch(apiUrl("/api/partners?limit=100"), {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao carregar parceiros");
      }

      setPartners(data.data || []);
    } catch (error) {
      toast({
        title: "Erro",
        description: error instanceof Error ? error.message : "Falha ao carregar parceiros",
        variant: "destructive",
      });
    } finally {
      setLoadingPartners(false);
    }
  };

  const fetchAdmins = async () => {
    try {
      setLoadingAdmins(true);
      const response = await fetch(apiUrl("/api/users"), {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao carregar administradores");
      }

      const adminUsers = (data || []).filter((user: User) => user.role === "admin");
      setAdmins(adminUsers);
    } catch (error) {
      toast({
        title: "Erro",
        description: error instanceof Error ? error.message : "Falha ao carregar administradores",
        variant: "destructive",
      });
    } finally {
      setLoadingAdmins(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const loadData = async () => {
      try {
        await fetchMe();
        await Promise.all([fetchAssociations(), fetchEvents(), fetchPartners(), fetchAdmins()]);
      } catch {
        // redirecionamento já tratado
      }
    };

    loadData();
  }, [token]);

  const handleAssociationSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const payload = {
        name: associationName,
        cnpj: associationCnpj,
        activityTypes: associationActivities
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        status: associationStatus,
      };

      const response = await fetch(
        editingAssociationId
          ? apiUrl(`/api/associations/${editingAssociationId}`)
          : apiUrl("/api/associations"),
        {
          method: editingAssociationId ? "PUT" : "POST",
          headers: authHeaders,
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao salvar associação");
      }

      toast({ title: "Sucesso", description: editingAssociationId ? "Associação atualizada." : "Associação criada." });
      resetAssociationForm();
      fetchAssociations();
    } catch (error) {
      toast({
        title: "Erro",
        description: error instanceof Error ? error.message : "Falha ao salvar associação",
        variant: "destructive",
      });
    }
  };

  const handleEventSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const payload = {
        name: eventName,
        date: new Date(eventDate).toISOString(),
        location: eventLocation,
        description: eventDescription,
        status: eventStatus,
      };

      const response = await fetch(
        editingEventId ? apiUrl(`/api/events/${editingEventId}`) : apiUrl("/api/events"),
        {
          method: editingEventId ? "PUT" : "POST",
          headers: authHeaders,
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao salvar evento");
      }

      toast({ title: "Sucesso", description: editingEventId ? "Evento atualizado." : "Evento criado." });
      resetEventForm();
      fetchEvents();
    } catch (error) {
      toast({
        title: "Erro",
        description: error instanceof Error ? error.message : "Falha ao salvar evento",
        variant: "destructive",
      });
    }
  };

  const handlePartnerSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const payload = {
        name: partnerName,
        website: partnerWebsite,
        description: partnerDescription,
        sectors: partnerSectors
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        status: partnerStatus,
      };

      const response = await fetch(
        editingPartnerId ? apiUrl(`/api/partners/${editingPartnerId}`) : apiUrl('/api/partners'),
        {
          method: editingPartnerId ? 'PUT' : 'POST',
          headers: authHeaders,
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Erro ao salvar parceiro');

      toast({ title: 'Sucesso', description: editingPartnerId ? 'Parceiro atualizado.' : 'Parceiro criado.' });
      resetPartnerForm();
      fetchPartners();
    } catch (error) {
      toast({ title: 'Erro', description: error instanceof Error ? error.message : 'Falha ao salvar parceiro', variant: 'destructive' });
    }
  };

  const formatDateForInput = (isoDate: string) => {
    const date = new Date(isoDate);
    const timezoneOffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - timezoneOffset).toISOString().slice(0, 16);
  };

  const associationAreas = useMemo(() => {
    const allAreas = associations.flatMap((association) => association.activityTypes || []);
    return Array.from(new Set(allAreas)).sort((first, second) => first.localeCompare(second));
  }, [associations]);

  const filteredAssociations = useMemo(() => {
    return associations.filter((association) => {
      const normalizedSearch = associationSearch.trim().toLowerCase();
      const activityText = (association.activityTypes || []).join(" ").toLowerCase();

      const matchesSearch =
        normalizedSearch.length === 0 ||
        association.name.toLowerCase().includes(normalizedSearch) ||
        association.cnpj.toLowerCase().includes(normalizedSearch) ||
        activityText.includes(normalizedSearch);

      const matchesStatus = associationFilterStatus === "all" || association.status === associationFilterStatus;
      const matchesArea =
        associationFilterArea === "all" ||
        (association.activityTypes || []).some((activity) => activity === associationFilterArea);

      return matchesSearch && matchesStatus && matchesArea;
    });
  }, [associations, associationSearch, associationFilterStatus, associationFilterArea]);

  const filteredEvents = useMemo(() => {
    return events.filter((eventItem) => {
      const normalizedSearch = eventSearch.trim().toLowerCase();
      const eventDate = new Date(eventItem.date);

      const matchesSearch =
        normalizedSearch.length === 0 ||
        eventItem.name.toLowerCase().includes(normalizedSearch) ||
        eventItem.location.toLowerCase().includes(normalizedSearch) ||
        (eventItem.description || "").toLowerCase().includes(normalizedSearch);

      const matchesStatus = eventFilterStatus === "all" || eventItem.status === eventFilterStatus;
      const matchesMonth =
        eventFilterMonth === "all" || String(eventDate.getMonth() + 1) === eventFilterMonth;

      return matchesSearch && matchesStatus && matchesMonth;
    });
  }, [events, eventSearch, eventFilterStatus, eventFilterMonth]);

  const filteredPartners = useMemo(() => {
    return partners.filter((p) => {
      const normalized = partnerSearch.trim().toLowerCase();
      const matchesSearch =
        normalized.length === 0 ||
        p.name.toLowerCase().includes(normalized) ||
        (p.sectors || []).join(' ').toLowerCase().includes(normalized) ||
        (p.description || '').toLowerCase().includes(normalized);

      const matchesStatus = partnerFilterStatus === 'all' || p.status === partnerFilterStatus;

      return matchesSearch && matchesStatus;
    });
  }, [partners, partnerSearch, partnerFilterStatus]);

  return (
    <main className="min-h-screen bg-muted pt-24 pb-12">
      <Header />
      <div className="container mx-auto px-4 space-y-8">
        <section className="rounded-xl border bg-background p-6 shadow-card">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold">Painel do Administrador</h1>
              <p className="mt-2 text-sm text-muted-foreground">Gerencie associações, eventos e administradores disponíveis.</p>
            </div>
            <Button type="button" variant="outline" onClick={handleLogout}>
              Sair
            </Button>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border bg-background p-6 shadow-card">
            <h2 className="text-xl font-semibold">Associações</h2>
            <form className="mt-4 space-y-3" onSubmit={handleAssociationSubmit}>
              <Input placeholder="Nome da associação" value={associationName} onChange={(e) => setAssociationName(e.target.value)} required />
              <Input placeholder="CNPJ" value={associationCnpj} onChange={(e) => setAssociationCnpj(e.target.value)} required />
              <Input
                placeholder="Áreas (separadas por vírgula)"
                value={associationActivities}
                onChange={(e) => setAssociationActivities(e.target.value)}
              />
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={associationStatus}
                onChange={(e) => setAssociationStatus(e.target.value as "active" | "inactive")}
              >
                <option value="active">Ativa</option>
                <option value="inactive">Inativa</option>
              </select>
              <div className="flex gap-2">
                <Button type="submit">{editingAssociationId ? "Salvar Edição" : "Adicionar Associação"}</Button>
                {editingAssociationId && (
                  <Button type="button" variant="outline" onClick={resetAssociationForm}>
                    Cancelar
                  </Button>
                )}
              </div>
            </form>
          </div>

          <div className="rounded-xl border bg-background p-6 shadow-card">
            <h2 className="text-xl font-semibold">Lista de Associações</h2>
            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              <Input
                placeholder="Pesquisar entidade..."
                value={associationSearch}
                onChange={(e) => setAssociationSearch(e.target.value)}
              />
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={associationFilterStatus}
                onChange={(e) => setAssociationFilterStatus(e.target.value as "all" | "active" | "inactive")}
              >
                <option value="all">Todos status</option>
                <option value="active">Ativa</option>
                <option value="inactive">Inativa</option>
              </select>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={associationFilterArea}
                onChange={(e) => setAssociationFilterArea(e.target.value)}
              >
                <option value="all">Todas áreas</option>
                {associationAreas.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-4 space-y-2 max-h-80 overflow-auto">
              {loadingAssociations ? (
                <p className="text-sm text-muted-foreground">Carregando...</p>
              ) : filteredAssociations.length === 0 ? (
                <p className="text-sm text-muted-foreground">Nenhuma associação encontrada com os filtros atuais.</p>
              ) : (
                filteredAssociations.map((association) => (
                  <div key={association._id} className="rounded-lg border p-3">
                    <p className="font-medium">{association.name}</p>
                    <p className="text-xs text-muted-foreground">CNPJ: {association.cnpj}</p>
                    <p className="text-xs text-muted-foreground">Status: {association.status}</p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-2"
                      onClick={() => {
                        setEditingAssociationId(association._id);
                        setAssociationName(association.name);
                        setAssociationCnpj(association.cnpj);
                        setAssociationActivities((association.activityTypes || []).join(", "));
                        setAssociationStatus(association.status);
                      }}
                    >
                      Editar
                    </Button>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border bg-background p-6 shadow-card">
            <h2 className="text-xl font-semibold">Parceiros</h2>
            <form className="mt-4 space-y-3" onSubmit={handlePartnerSubmit}>
              <Input placeholder="Nome do parceiro" value={partnerName} onChange={(e) => setPartnerName(e.target.value)} required />
              <Input placeholder="Website" value={partnerWebsite} onChange={(e) => setPartnerWebsite(e.target.value)} />
              <Textarea placeholder="Descrição" value={partnerDescription} onChange={(e) => setPartnerDescription(e.target.value)} />
              <Input placeholder="Setores (separados por vírgula)" value={partnerSectors} onChange={(e) => setPartnerSectors(e.target.value)} />
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={partnerStatus}
                onChange={(e) => setPartnerStatus(e.target.value as "active" | "inactive")}
              >
                <option value="active">Ativo</option>
                <option value="inactive">Inativo</option>
              </select>
              <div className="flex gap-2">
                <Button type="submit">{editingPartnerId ? 'Salvar Edição' : 'Adicionar Parceiro'}</Button>
                {editingPartnerId && (
                  <Button type="button" variant="outline" onClick={resetPartnerForm}>
                    Cancelar
                  </Button>
                )}
              </div>
            </form>
          </div>

          <div className="rounded-xl border bg-background p-6 shadow-card">
            <h2 className="text-xl font-semibold">Lista de Parceiros</h2>
            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              <Input placeholder="Pesquisar parceiro..." value={partnerSearch} onChange={(e) => setPartnerSearch(e.target.value)} />
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={partnerFilterStatus}
                onChange={(e) => setPartnerFilterStatus(e.target.value as "all" | "active" | "inactive")}
              >
                <option value="all">Todos status</option>
                <option value="active">Ativo</option>
                <option value="inactive">Inativo</option>
              </select>
            </div>

            <div className="mt-4 space-y-2 max-h-80 overflow-auto">
              {loadingPartners ? (
                <p className="text-sm text-muted-foreground">Carregando...</p>
              ) : filteredPartners.length === 0 ? (
                <p className="text-sm text-muted-foreground">Nenhum parceiro encontrado.</p>
              ) : (
                filteredPartners.map((partner) => (
                  <div key={partner._id} className="rounded-lg border p-3">
                    <p className="font-medium">{partner.name}</p>
                    <p className="text-xs text-muted-foreground">{(partner.sectors || []).join(', ')}</p>
                    <p className="text-xs text-muted-foreground">Status: {partner.status}</p>
                    <div className="flex gap-2 mt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditingPartnerId(partner._id);
                          setPartnerName(partner.name);
                          setPartnerWebsite(partner.website || '');
                          setPartnerDescription(partner.description || '');
                          setPartnerSectors((partner.sectors || []).join(', '));
                          setPartnerStatus(partner.status);
                        }}
                      >
                        Editar
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={async () => {
                          if (!confirm(`Confirma inativar/parceiro ${partner.name}?`)) return;
                          try {
                            const resp = await fetch(apiUrl(`/api/partners/${partner._id}`), {
                              method: 'DELETE',
                              headers: authHeaders,
                            });
                            const d = await resp.json();
                            if (!resp.ok) throw new Error(d.message || 'Erro ao inativar parceiro');
                            toast({ title: 'Sucesso', description: 'Parceiro inativado.' });
                            fetchPartners();
                          } catch (err) {
                            toast({ title: 'Erro', description: err instanceof Error ? err.message : 'Falha', variant: 'destructive' });
                          }
                        }}
                      >
                        Remover
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border bg-background p-6 shadow-card">
            <h2 className="text-xl font-semibold">Eventos</h2>
            <form className="mt-4 space-y-3" onSubmit={handleEventSubmit}>
              <Input placeholder="Nome do evento" value={eventName} onChange={(e) => setEventName(e.target.value)} required />
              <Input type="datetime-local" value={eventDate} onChange={(e) => setEventDate(e.target.value)} required />
              <Input placeholder="Local" value={eventLocation} onChange={(e) => setEventLocation(e.target.value)} required />
              <Textarea placeholder="Descrição" value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} />
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={eventStatus}
                onChange={(e) => setEventStatus(e.target.value as "active" | "inactive")}
              >
                <option value="active">Ativo</option>
                <option value="inactive">Inativo</option>
              </select>
              <div className="flex gap-2">
                <Button type="submit">{editingEventId ? "Salvar Edição" : "Adicionar Evento"}</Button>
                {editingEventId && (
                  <Button type="button" variant="outline" onClick={resetEventForm}>
                    Cancelar
                  </Button>
                )}
              </div>
            </form>
          </div>

          <div className="rounded-xl border bg-background p-6 shadow-card">
            <h2 className="text-xl font-semibold">Lista de Eventos</h2>
            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              <Input
                placeholder="Pesquisar evento..."
                value={eventSearch}
                onChange={(e) => setEventSearch(e.target.value)}
              />
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={eventFilterStatus}
                onChange={(e) => setEventFilterStatus(e.target.value as "all" | "active" | "inactive")}
              >
                <option value="all">Todos status</option>
                <option value="active">Ativo</option>
                <option value="inactive">Inativo</option>
              </select>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={eventFilterMonth}
                onChange={(e) => setEventFilterMonth(e.target.value)}
              >
                <option value="all">Todos meses</option>
                <option value="1">Janeiro</option>
                <option value="2">Fevereiro</option>
                <option value="3">Março</option>
                <option value="4">Abril</option>
                <option value="5">Maio</option>
                <option value="6">Junho</option>
                <option value="7">Julho</option>
                <option value="8">Agosto</option>
                <option value="9">Setembro</option>
                <option value="10">Outubro</option>
                <option value="11">Novembro</option>
                <option value="12">Dezembro</option>
              </select>
            </div>
            <div className="mt-4 space-y-2 max-h-80 overflow-auto">
              {loadingEvents ? (
                <p className="text-sm text-muted-foreground">Carregando...</p>
              ) : filteredEvents.length === 0 ? (
                <p className="text-sm text-muted-foreground">Nenhum evento encontrado com os filtros atuais.</p>
              ) : (
                filteredEvents.map((eventItem) => (
                  <div key={eventItem._id} className="rounded-lg border p-3">
                    <p className="font-medium">{eventItem.name}</p>
                    <p className="text-xs text-muted-foreground">{new Date(eventItem.date).toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Local: {eventItem.location}</p>
                    <p className="text-xs text-muted-foreground">Status: {eventItem.status}</p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-2"
                      onClick={() => {
                        setEditingEventId(eventItem._id);
                        setEventName(eventItem.name);
                        setEventDate(formatDateForInput(eventItem.date));
                        setEventLocation(eventItem.location);
                        setEventDescription(eventItem.description || "");
                        setEventStatus(eventItem.status);
                      }}
                    >
                      Editar
                    </Button>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        <section className="rounded-xl border bg-background p-6 shadow-card">
          <h2 className="text-xl font-semibold">Adicionar Administrador</h2>
          <form className="mt-4 grid gap-3 md:grid-cols-4" onSubmit={handleRegisterAdmin}>
            <Input
              placeholder="Nome"
              value={newAdminName}
              onChange={(e) => setNewAdminName(e.target.value)}
              required
            />
            <Input
              type="email"
              placeholder="E-mail"
              value={newAdminEmail}
              onChange={(e) => setNewAdminEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Senha"
              value={newAdminPassword}
              onChange={(e) => setNewAdminPassword(e.target.value)}
              required
            />
            <Button type="submit" disabled={registeringAdmin}>
              {registeringAdmin ? "Salvando..." : "Cadastrar"}
            </Button>
          </form>

          <h3 className="mt-8 text-xl font-semibold">Administradores Disponíveis</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {loadingAdmins ? (
              <p className="text-sm text-muted-foreground">Carregando...</p>
            ) : admins.length === 0 ? (
              <p className="text-sm text-muted-foreground">Nenhum administrador disponível.</p>
            ) : (
              admins.map((admin) => (
                <div key={admin._id} className="rounded-lg border p-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-medium">{admin.name}</p>
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      onClick={() => {
                        setEditingUserId(admin._id);
                        setIsEditUserOpen(true);
                      }}
                      aria-label={`Editar ${admin.name}`}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">{admin.email}</p>
                  <p className="text-xs text-muted-foreground">Perfil: {admin.role}</p>
                </div>
              ))
            )}
          </div>
        </section>

        <EditUser
          userId={editingUserId}
          isOpen={isEditUserOpen}
          onClose={() => {
            setIsEditUserOpen(false);
            setEditingUserId(null);
          }}
          onUpdated={fetchAdmins}
        />
      </div>
    </main>
  );
};

export default AdminDashboard;
