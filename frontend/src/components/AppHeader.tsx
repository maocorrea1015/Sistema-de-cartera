import { Bell, Search, Settings, LogOut, User } from "lucide-react";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface AppHeaderProps {
  onLogout: () => void;
}

export function AppHeader({ onLogout }: AppHeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between sticky top-0 z-10 shadow-sm">
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Buscar clientes, facturas..."
            className="pl-10 border-gray-200 bg-gray-50 h-10"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
              3
            </Badge>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-96 overflow-y-auto">
              <div className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100">
                <p className="text-sm">Factura #1234 vencida hace 5 días</p>
                <p className="text-xs text-gray-500 mt-1">Cliente: Constructora ABC</p>
              </div>
              <div className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100">
                <p className="text-sm">Pago recibido: $2,500.00</p>
                <p className="text-xs text-gray-500 mt-1">Cliente: Inversiones XYZ</p>
              </div>
              <div className="p-3 hover:bg-gray-50 cursor-pointer">
                <p className="text-sm">3 facturas vencen mañana</p>
                <p className="text-xs text-gray-500 mt-1">Revisar cartera</p>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="text-left hidden md:block">
              <p className="text-sm text-gray-900">Admin Usuario</p>
              <p className="text-xs text-gray-500">Administrador</p>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Configuración</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogout} className="text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Cerrar sesión</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
