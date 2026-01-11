import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileHeader } from "@/components/layout/MobileHeader";
import Dashboard from "@/pages/dashboard/Dashboard";
import BacklinkManager from "@/pages/backlinks/BacklinkManager";
import ContentTasks from "@/pages/content/ContentTasks";
import NormalTasks from "./pages/tasks/NormalTasks";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster position="bottom-right" />
        <BrowserRouter>
          <div className="flex flex-col min-h-screen bg-background">
            <MobileHeader onMenuClick={() => setIsMobileMenuOpen(true)} />
            <Sidebar 
              isOpen={isMobileMenuOpen} 
              onClose={() => setIsMobileMenuOpen(false)} 
            />
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/backlinks" element={<BacklinkManager />} />
                <Route path="/content" element={<ContentTasks />} />
                <Route path="/tasks" element={<NormalTasks />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
