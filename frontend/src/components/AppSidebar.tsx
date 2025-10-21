import {
  LayoutDashboard,
  Wallet,
  FileText,
  BarChart3,
  Settings,
  Users,
  Phone,
  CreditCard,
} from "lucide-react";
import { Logo } from "./Logo";

interface AppSidebarProps {
  activeView: string;
  onNavigate: (view: string) => void;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "cartera", label: "Cartera", icon: Wallet },
  { id: "cobros", label: "Gestión de Cobros", icon: Phone },
  { id: "reportes", label: "Reportes", icon: BarChart3 },
  { id: "clientes", label: "Clientes", icon: Users },
  { id: "configuracion", label: "Configuración", icon: Settings },
];

export function AppSidebar({ activeView, onNavigate }: AppSidebarProps) {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0">
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <Logo />
      </div>

      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <CreditCard className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-gray-900">Plan Profesional</span>
          </div>
          <p className="text-xs text-gray-600 mb-3">
            Gestiona hasta 1000 clientes
          </p>
          <button className="w-full bg-white hover:bg-gray-50 text-blue-600 text-xs py-2 px-3 rounded-lg transition-colors border border-blue-200">
            Actualizar plan
          </button>
        </div>
      </div>
    </aside>
  );
}
