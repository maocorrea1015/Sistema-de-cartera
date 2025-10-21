import { useState } from "react";
import { Login } from "./components/Login";
import { AppSidebar } from "./components/AppSidebar";
import { AppHeader } from "./components/AppHeader";
import { Dashboard } from "./components/Dashboard";
import { CarteraModule } from "./components/CarteraModule";
import { ClienteDetalle } from "./components/ClienteDetalle";
import { RegistrarPago } from "./components/RegistrarPago";
import { GestionCobros } from "./components/GestionCobros";
import { Reportes } from "./components/Reportes";
import { Configuracion } from "./components/Configuracion";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeView, setActiveView] = useState("dashboard");
  const [selectedData, setSelectedData] = useState<any>(null);
  const [registrarPagoOpen, setRegistrarPagoOpen] = useState(false);
  const [facturaParaPago, setFacturaParaPago] = useState<any>(null);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveView("dashboard");
  };

  const handleNavigate = (view: string, data?: any) => {
    setActiveView(view);
    if (data) {
      setSelectedData(data);
    }
  };

  const handleOpenRegistrarPago = (factura: any) => {
    setFacturaParaPago(factura);
    setRegistrarPagoOpen(true);
  };

  const handleCloseRegistrarPago = () => {
    setRegistrarPagoOpen(false);
    setFacturaParaPago(null);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <AppSidebar activeView={activeView} onNavigate={handleNavigate} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AppHeader onLogout={handleLogout} />
        
        <main className="flex-1 overflow-y-auto">
          {activeView === "dashboard" && (
            <Dashboard onNavigate={handleNavigate} />
          )}
          
          {activeView === "cartera" && (
            <CarteraModule
              onNavigate={handleNavigate}
              onOpenRegistrarPago={handleOpenRegistrarPago}
            />
          )}
          
          {activeView === "detalle-cliente" && (
            <ClienteDetalle
              onBack={() => setActiveView("cartera")}
              onOpenRegistrarPago={handleOpenRegistrarPago}
              selectedData={selectedData}
            />
          )}
          
          {activeView === "cobros" && (
            <GestionCobros onNavigate={handleNavigate} />
          )}
          
          {activeView === "reportes" && (
            <Reportes />
          )}
          
          {activeView === "clientes" && (
            <div className="p-6">
              <h1 className="text-gray-900 mb-4">Módulo de Clientes</h1>
              <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
                <p className="text-gray-500">
                  La gestión de clientes está disponible en la sección de Configuración.
                </p>
                <button
                  onClick={() => setActiveView("configuracion")}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Ir a Configuración
                </button>
              </div>
            </div>
          )}
          
          {activeView === "configuracion" && (
            <Configuracion />
          )}
        </main>
      </div>

      <RegistrarPago
        isOpen={registrarPagoOpen}
        onClose={handleCloseRegistrarPago}
        factura={facturaParaPago}
      />
    </div>
  );
}
