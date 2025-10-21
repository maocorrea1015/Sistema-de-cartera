import { TrendingUp, TrendingDown, DollarSign, AlertCircle, CheckCircle, Clock, ArrowRight, Users, FileText, BarChart3 } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface DashboardProps {
  onNavigate: (view: string, data?: any) => void;
}

const barData = [
  { name: "Ene", total: 45000, cobrado: 38000 },
  { name: "Feb", total: 52000, cobrado: 48000 },
  { name: "Mar", total: 48000, cobrado: 42000 },
  { name: "Abr", total: 61000, cobrado: 55000 },
  { name: "May", total: 58000, cobrado: 52000 },
  { name: "Jun", total: 67000, cobrado: 61000 },
];

const pieData = [
  { name: "Al día", value: 65, color: "#10B981" },
  { name: "Por vencer", value: 20, color: "#F59E0B" },
  { name: "Vencida", value: 15, color: "#EF4444" },
];

const recentPayments = [
  { id: 1, cliente: "Constructora ABC", factura: "FC-2025-001", monto: 12500, fecha: "17 Oct 2025" },
  { id: 2, cliente: "Inversiones XYZ", factura: "FC-2025-002", monto: 8300, fecha: "16 Oct 2025" },
  { id: 3, cliente: "Comercial DEF", factura: "FC-2025-003", monto: 15700, fecha: "16 Oct 2025" },
  { id: 4, cliente: "Servicios GHI", factura: "FC-2025-004", monto: 6200, fecha: "15 Oct 2025" },
];

const pendingTasks = [
  { id: 1, cliente: "Constructora ABC", accion: "Llamada de seguimiento", prioridad: "alta", fecha: "Hoy" },
  { id: 2, cliente: "Importadora JKL", accion: "Enviar recordatorio", prioridad: "media", fecha: "Mañana" },
  { id: 3, cliente: "Distribuidora MNO", accion: "Negociar plan de pago", prioridad: "alta", fecha: "Hoy" },
];

export function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-1">Dashboard</h1>
          <p className="text-gray-500">Resumen general de tu cartera</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm bg-white">
            <option>Últimos 30 días</option>
            <option>Últimos 60 días</option>
            <option>Últimos 90 días</option>
            <option>Este año</option>
          </select>
          <Button onClick={() => onNavigate("reportes")} variant="outline">
            Ver reportes completos
          </Button>
        </div>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
            <Badge variant="secondary" className="bg-blue-50 text-blue-700">
              <TrendingUp className="w-3 h-3 mr-1" />
              +12.5%
            </Badge>
          </div>
          <h3 className="text-gray-500 mb-1">Total Cartera</h3>
          <p className="text-gray-900 mb-2">$847,250.00</p>
          <p className="text-xs text-gray-500">325 facturas activas</p>
        </Card>

        <Card className="p-6 border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <Badge variant="secondary" className="bg-red-50 text-red-700">
              <TrendingUp className="w-3 h-3 mr-1" />
              +8.2%
            </Badge>
          </div>
          <h3 className="text-gray-500 mb-1">Cartera Vencida</h3>
          <p className="text-gray-900 mb-2">$127,180.00</p>
          <p className="text-xs text-gray-500">48 facturas vencidas</p>
        </Card>

        <Card className="p-6 border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <Badge variant="secondary" className="bg-green-50 text-green-700">
              <TrendingUp className="w-3 h-3 mr-1" />
              +15.3%
            </Badge>
          </div>
          <h3 className="text-gray-500 mb-1">Cobrado este mes</h3>
          <p className="text-gray-900 mb-2">$456,900.00</p>
          <p className="text-xs text-gray-500">187 pagos recibidos</p>
        </Card>

        <Card className="p-6 border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <Badge variant="secondary" className="bg-orange-50 text-orange-700">
              85.0%
            </Badge>
          </div>
          <h3 className="text-gray-500 mb-1">% Recuperación</h3>
          <p className="text-gray-900 mb-2">85.0%</p>
          <p className="text-xs text-gray-500">Promedio últimos 30 días</p>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6 border border-gray-200">
          <h3 className="text-gray-900 mb-4">Evolución de Cartera</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #E5E7EB",
                  borderRadius: "0.5rem",
                }}
              />
              <Bar dataKey="total" fill="#3B82F6" radius={[8, 8, 0, 0]} />
              <Bar dataKey="cobrado" fill="#10B981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span className="text-sm text-gray-600">Total Facturado</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-sm text-gray-600">Cobrado</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 border border-gray-200">
          <h3 className="text-gray-900 mb-4">Estado de Cartera</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {pieData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
                <span className="text-sm text-gray-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Acciones rápidas y Pagos recientes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 border border-gray-200">
          <h3 className="text-gray-900 mb-4">Acciones Rápidas</h3>
          <div className="space-y-3">
            <Button
              onClick={() => onNavigate("cartera")}
              variant="outline"
              className="w-full justify-start"
            >
              <FileText className="w-4 h-4 mr-2" />
              Registrar nueva factura
            </Button>
            <Button
              onClick={() => onNavigate("cartera")}
              variant="outline"
              className="w-full justify-start"
            >
              <DollarSign className="w-4 h-4 mr-2" />
              Registrar pago
            </Button>
            <Button
              onClick={() => onNavigate("clientes")}
              variant="outline"
              className="w-full justify-start"
            >
              <Users className="w-4 h-4 mr-2" />
              Nuevo cliente
            </Button>
            <Button
              onClick={() => onNavigate("reportes")}
              variant="outline"
              className="w-full justify-start"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Generar reporte
            </Button>
          </div>
        </Card>

        <Card className="lg:col-span-2 p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900">Pagos Recientes</h3>
            <Button variant="link" onClick={() => onNavigate("cartera")} className="text-blue-600">
              Ver todos <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="space-y-3">
            {recentPayments.map((payment) => (
              <div
                key={payment.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => onNavigate("detalle-cliente", payment)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">{payment.cliente}</p>
                    <p className="text-xs text-gray-500">{payment.factura}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-900">${payment.monto.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">{payment.fecha}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Tareas pendientes */}
      <Card className="p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900">Tareas Pendientes de Cobro</h3>
          <Button variant="link" onClick={() => onNavigate("cobros")} className="text-blue-600">
            Ver todas <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pendingTasks.map((task) => (
            <div
              key={task.id}
              className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onNavigate("cobros")}
            >
              <div className="flex items-start justify-between mb-3">
                <Badge
                  variant="secondary"
                  className={
                    task.prioridad === "alta"
                      ? "bg-red-50 text-red-700"
                      : "bg-orange-50 text-orange-700"
                  }
                >
                  {task.prioridad === "alta" ? "Alta" : "Media"}
                </Badge>
                <span className="text-xs text-gray-500">{task.fecha}</span>
              </div>
              <h4 className="text-sm text-gray-900 mb-1">{task.cliente}</h4>
              <p className="text-xs text-gray-600">{task.accion}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
