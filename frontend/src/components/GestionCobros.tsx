import { Phone, Mail, MessageSquare, Calendar, CheckCircle, Clock, AlertCircle, Plus, Filter } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface GestionCobrosProps {
  onNavigate: (view: string, data?: any) => void;
}

const tareas = [
  {
    id: 1,
    cliente: "Constructora ABC",
    factura: "FC-2025-001",
    accion: "Llamada de seguimiento",
    responsable: "Ana García",
    proximaAccion: "Hoy 10:00 AM",
    estado: "pendiente",
    prioridad: "alta",
    diasMora: 2,
    monto: 12500,
  },
  {
    id: 2,
    cliente: "Distribuidora MNO",
    factura: "FC-2025-006",
    accion: "Negociar plan de pago",
    responsable: "Carlos Ruiz",
    proximaAccion: "Hoy 2:00 PM",
    estado: "pendiente",
    prioridad: "alta",
    diasMora: 0,
    monto: 9800,
  },
  {
    id: 3,
    cliente: "Importadora JKL",
    factura: "FC-2025-005",
    accion: "Enviar recordatorio por correo",
    responsable: "Ana García",
    proximaAccion: "Mañana 9:00 AM",
    estado: "programada",
    prioridad: "media",
    diasMora: 0,
    monto: 22400,
  },
  {
    id: 4,
    cliente: "Tecnología PQR",
    factura: "FC-2025-007",
    accion: "Visita presencial",
    responsable: "Carlos Ruiz",
    proximaAccion: "19 Oct 3:00 PM",
    estado: "programada",
    prioridad: "alta",
    diasMora: 16,
    monto: 5670,
  },
  {
    id: 5,
    cliente: "Servicios GHI",
    factura: "FC-2025-004",
    accion: "Primera gestión telefónica",
    responsable: "Ana García",
    proximaAccion: "Completada - 16 Oct",
    estado: "completada",
    prioridad: "media",
    diasMora: 0,
    monto: 6200,
  },
];

const estadisticas = [
  { label: "Tareas pendientes", valor: 2, color: "text-red-600", bg: "bg-red-50" },
  { label: "Tareas programadas", valor: 2, color: "text-orange-600", bg: "bg-orange-50" },
  { label: "Completadas hoy", valor: 1, color: "text-green-600", bg: "bg-green-50" },
  { label: "Clientes en gestión", valor: 5, color: "text-blue-600", bg: "bg-blue-50" },
];

export function GestionCobros({ onNavigate }: GestionCobrosProps) {
  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-1">Gestión de Cobros</h1>
          <p className="text-gray-500">Tareas y seguimiento de cobranza</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Nueva tarea
        </Button>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {estadisticas.map((stat, index) => (
          <Card key={index} className={`p-4 border border-gray-200 ${stat.bg}`}>
            <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
            <p className={`${stat.color}`}>{stat.valor}</p>
          </Card>
        ))}
      </div>

      {/* Filtros */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex flex-wrap gap-4">
          <Select defaultValue="todos">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos los estados</SelectItem>
              <SelectItem value="pendiente">Pendiente</SelectItem>
              <SelectItem value="programada">Programada</SelectItem>
              <SelectItem value="completada">Completada</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="todos">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Prioridad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todas</SelectItem>
              <SelectItem value="alta">Alta</SelectItem>
              <SelectItem value="media">Media</SelectItem>
              <SelectItem value="baja">Baja</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="todos">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Responsable" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="ana">Ana García</SelectItem>
              <SelectItem value="carlos">Carlos Ruiz</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Más filtros
          </Button>
        </div>
      </div>

      {/* Lista de tareas */}
      <div className="space-y-4">
        {tareas.map((tarea) => (
          <Card
            key={tarea.id}
            className="p-6 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => onNavigate("detalle-cliente", tarea)}
          >
            <div className="flex items-start gap-6">
              {/* Icono de acción */}
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  tarea.estado === "completada"
                    ? "bg-green-100"
                    : tarea.estado === "programada"
                    ? "bg-orange-100"
                    : "bg-red-100"
                }`}
              >
                {tarea.accion.toLowerCase().includes("llamada") ? (
                  <Phone
                    className={`w-6 h-6 ${
                      tarea.estado === "completada"
                        ? "text-green-600"
                        : tarea.estado === "programada"
                        ? "text-orange-600"
                        : "text-red-600"
                    }`}
                  />
                ) : tarea.accion.toLowerCase().includes("correo") ? (
                  <Mail
                    className={`w-6 h-6 ${
                      tarea.estado === "completada"
                        ? "text-green-600"
                        : tarea.estado === "programada"
                        ? "text-orange-600"
                        : "text-red-600"
                    }`}
                  />
                ) : (
                  <MessageSquare
                    className={`w-6 h-6 ${
                      tarea.estado === "completada"
                        ? "text-green-600"
                        : tarea.estado === "programada"
                        ? "text-orange-600"
                        : "text-red-600"
                    }`}
                  />
                )}
              </div>

              {/* Contenido principal */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-gray-900">{tarea.cliente}</h3>
                      <Badge
                        variant="outline"
                        className={
                          tarea.prioridad === "alta"
                            ? "bg-red-50 text-red-700 border-red-200"
                            : "bg-orange-50 text-orange-700 border-orange-200"
                        }
                      >
                        {tarea.prioridad === "alta" ? "Alta prioridad" : "Media"}
                      </Badge>
                      {tarea.diasMora > 0 && (
                        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                          {tarea.diasMora} días de mora
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{tarea.accion}</p>
                    <p className="text-sm text-gray-500">
                      Factura: {tarea.factura} • ${tarea.monto.toLocaleString()}
                    </p>
                  </div>

                  <Badge
                    variant="outline"
                    className={
                      tarea.estado === "completada"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : tarea.estado === "programada"
                        ? "bg-orange-50 text-orange-700 border-orange-200"
                        : "bg-red-50 text-red-700 border-red-200"
                    }
                  >
                    {tarea.estado === "completada" ? (
                      <CheckCircle className="w-3 h-3 mr-1" />
                    ) : tarea.estado === "programada" ? (
                      <Clock className="w-3 h-3 mr-1" />
                    ) : (
                      <AlertCircle className="w-3 h-3 mr-1" />
                    )}
                    {tarea.estado === "completada"
                      ? "Completada"
                      : tarea.estado === "programada"
                      ? "Programada"
                      : "Pendiente"}
                  </Badge>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{tarea.proximaAccion}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-xs text-blue-600">
                          {tarea.responsable.split(" ").map((n) => n[0]).join("")}
                        </span>
                      </div>
                      <span className="text-sm text-gray-600">{tarea.responsable}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {tarea.estado === "pendiente" && (
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          alert("Marcar como completada");
                        }}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Completar
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate("detalle-cliente", tarea);
                      }}
                    >
                      Ver detalle
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Resumen de próximas acciones */}
      <Card className="p-6 border border-gray-200">
        <h3 className="text-gray-900 mb-4">Próximas Acciones Programadas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-red-50 rounded-lg p-4 border border-red-100">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-red-600" />
              <span className="text-sm text-red-900">Hoy</span>
            </div>
            <p className="text-red-600">2 tareas pendientes</p>
          </div>
          
          <div className="bg-orange-50 rounded-lg p-4 border border-orange-100">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-orange-600" />
              <span className="text-sm text-orange-900">Mañana</span>
            </div>
            <p className="text-orange-600">1 tarea programada</p>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-blue-900">Esta semana</span>
            </div>
            <p className="text-blue-600">4 tareas programadas</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
