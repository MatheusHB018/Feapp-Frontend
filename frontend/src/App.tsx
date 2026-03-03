import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Entities from "./pages/Entities";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import DonateRegistration from "./pages/DonateRegistration";
import CompanyPartnership from "./pages/CompanyPartnership";
import AdminDashboard from "./pages/AdminDashboard";
import Partners from "./pages/Partners";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Pessoas from "./pages/Pessoas";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/entidades" element={<Entities />} />
          <Route path="/parceiros" element={<Partners />} />
          <Route path="/pessoas" element={<Pessoas />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/painel" element={<AdminDashboard />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/quero-doar" element={<DonateRegistration />} />
          <Route path="/parceria-empresa" element={<CompanyPartnership />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
