import { useState } from "react";
import { Search, Filter, Download, Plus, MoreHorizontal, Eye, DollarSign, Edit, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface CarteraModuleProps {
  onNavigate: (view: string, data?: any) => void;
  onOpenRegistrarPago: (factura: any) => void;
}

const facturas = [
  {
    id: 1,
    cliente: "Constructora ABC",
    factura: "FC-2025-001",
    fechaEmision: "2025-09-15",
    vencimiento: "2025-10-15",
    valor: 12500,
    saldo: 12500,
    estado: "vencida",
    diasMora: 2,
  },
  {
    id: 2,
    cliente: "Inversiones XYZ",
    factura: "FC-2025-002",
    fechaEmision: "2025-10-01",
    vencimiento: "2025-10-31",
    valor: 8300,
    saldo: 0,
    estado: "pagada",
    diasMora: 0,
  },
  {
    id: 3,
    cliente: "Comercial DEF",
    factura: "FC-2025-003",
    fechaEmision: "2025-10-05",
    vencimiento: "2025-11-04",
    valor: 15700,
    saldo: 15700,
    estado: "vigente",
    diasMora: 0,
  },
  {
    id: 4,
    cliente: "Servicios GHI",
    factura: "FC-2025-004",
    fechaEmision: "2025-09-20",
    vencimiento: "2025-10-20",
    valor: 6200,
    saldo: 6200,
    estado: "vencida",
    diasMora: 0,
  },
  {
    id: 5,
    cliente: "Importadora JKL",
    factura: "FC-2025-005",
    fechaEmision: "2025-10-10",
    vencimiento: "2025-11-09",
    valor: 22400,
    saldo: 22400,
    estado: "vigente",
    diasMora: 0,
  },
  {
    id: 6,
    cliente: "Distribuidora MNO",
    factura: "FC-2025-006",
    fechaEmision: "2025-10-12",
    vencimiento: "2025-10-27",
    valor: 9800,
    saldo: 9800,
    estado: "por_vencer",
    diasMora: 0,
  },
  {
    id: 7,
    cliente: "Tecnología PQR",
    factura: "FC-2025-007",
    fechaEmision: "2025-09-01",
    vencimiento: "2025-10-01",
    valor: 18900,
    saldo: 5670,
    estado: "vencida",
    diasMora: 16,
  },
  {
    id: 8,
    cliente: "Logística STU",
    factura: "FC-2025-008",
    fechaEmision: "2025-10-08",
    vencimiento: "2025-11-07",
    valor: 11200,
    saldo: 11200,
    estado: "vigente",
    diasMora: 0,
  },
];

const estadoConfig = {
  vigente: { label: "Vigente", color: "bg-blue-50 text-blue-700 border-blue-200" },
  por_vencer: { label: "Por vencer", color: "bg-orange-50 text-orange-700 border-orange-200" },
  vencida: { label: "Vencida", color: "bg-red-50 text-red-700 border-red-200" },
  pagada: { label: "Pagada", color: "bg-green-50 text-green-700 border-green-200" },
};

export function CarteraModule({ onNavigate, onOpenRegistrarPago }: CarteraModuleProps) {
  const [filtroEstado, setFiltroEstado] = useState<string>("todos");
  const [busqueda, setBusqueda] = useState("");

  const facturasFiltradas = facturas.filter((factura) => {
    const matchEstado = filtroEstado === "todos" || factura.estado === filtroEstado;
    const matchBusqueda =
      factura.cliente.toLowerCase().includes(busqueda.toLowerCase()) ||
      factura.factura.toLowerCase().includes(busqueda.toLowerCase());
    return matchEstado && matchBusqueda;
  });

  const totalCartera = facturasFiltradas.reduce((sum, f) => sum + f.saldo, 0);

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-1">Módulo de Cartera</h1>
          <p className="text-gray-500">Gestiona todas las cuentas por cobrar</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Nueva factura
        </Button>
      </div>

      {/* Resumen rápido */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-500 mb-1">Total en cartera</p>
          <p className="text-gray-900">${totalCartera.toLocaleString()}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-500 mb-1">Facturas vigentes</p>
          <p className="text-gray-900">{facturas.filter(f => f.estado === "vigente").length}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-500 mb-1">Facturas vencidas</p>
          <p className="text-gray-900">{facturas.filter(f => f.estado === "vencida").length}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-500 mb-1">Promedio días mora</p>
          <p className="text-gray-900">
            {Math.round(
              facturas.filter(f => f.diasMora > 0).reduce((sum, f) => sum + f.diasMora, 0) /
                facturas.filter(f => f.diasMora > 0).length || 0
            )} días
          </p>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Buscar por cliente o número de factura..."
                className="pl-10"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
          </div>
          
          <Select value={filtroEstado} onValueChange={setFiltroEstado}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos los estados</SelectItem>
              <SelectItem value="vigente">Vigente</SelectItem>
              <SelectItem value="por_vencer">Por vencer</SelectItem>
              <SelectItem value="vencida">Vencida</SelectItem>
              <SelectItem value="pagada">Pagada</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="fecha">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fecha">Fecha de vencimiento</SelectItem>
              <SelectItem value="cliente">Cliente</SelectItem>
              <SelectItem value="monto">Monto</SelectItem>
              <SelectItem value="mora">Días de mora</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Más filtros
          </Button>

          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Factura
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                  F. Emisión
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Vencimiento
                </th>
                <th className="px-4 py-3 text-right text-xs text-gray-600 uppercase tracking-wider">
                  Valor
                </th>
                <th className="px-4 py-3 text-right text-xs text-gray-600 uppercase tracking-wider">
                  Saldo
                </th>
                <th className="px-4 py-3 text-center text-xs text-gray-600 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-4 py-3 text-center text-xs text-gray-600 uppercase tracking-wider">
                  Días mora
                </th>
                <th className="px-4 py-3 text-center text-xs text-gray-600 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {facturasFiltradas.map((factura) => (
                <tr
                  key={factura.id}
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => onNavigate("detalle-cliente", factura)}
                >
                  <td className="px-4 py-3 text-sm text-gray-900">{factura.cliente}</td>
                  <td className="px-4 py-3 text-sm text-blue-600">{factura.factura}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{factura.fechaEmision}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{factura.vencimiento}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 text-right">
                    ${factura.valor.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 text-right">
                    ${factura.saldo.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Badge
                      variant="outline"
                      className={`${estadoConfig[factura.estado as keyof typeof estadoConfig].color} border`}
                    >
                      {estadoConfig[factura.estado as keyof typeof estadoConfig].label}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {factura.diasMora > 0 ? (
                      <span className="text-sm text-red-600">{factura.diasMora} días</span>
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center" onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onNavigate("detalle-cliente", factura)}>
                          <Eye className="w-4 h-4 mr-2" />
                          Ver detalle
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onOpenRegistrarPago(factura)}
                          disabled={factura.saldo === 0}
                        >
                          <DollarSign className="w-4 h-4 mr-2" />
                          Registrar pago
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Mostrando {facturasFiltradas.length} de {facturas.length} facturas
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Anterior
            </Button>
            <Button variant="outline" size="sm" className="bg-blue-600 text-white border-blue-600">
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              3
            </Button>
            <Button variant="outline" size="sm">
              Siguiente
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
