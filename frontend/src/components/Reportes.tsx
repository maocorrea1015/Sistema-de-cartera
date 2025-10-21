import { Download, FileText, Calendar, Filter, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Badge } from "./ui/badge";

const evolucionMensual = [
  { mes: "Ene", facturado: 45000, cobrado: 38000, vencido: 7000 },
  { mes: "Feb", facturado: 52000, cobrado: 48000, vencido: 4000 },
  { mes: "Mar", facturado: 48000, cobrado: 42000, vencido: 6000 },
  { mes: "Abr", facturado: 61000, cobrado: 55000, vencido: 6000 },
  { mes: "May", facturado: 58000, cobrado: 52000, vencido: 6000 },
  { mes: "Jun", facturado: 67000, cobrado: 61000, vencido: 6000 },
];

const distribucionPorCliente = [
  { cliente: "Constructora ABC", total: 45000, porcentaje: 18 },
  { cliente: "Importadora JKL", total: 38000, porcentaje: 15 },
  { cliente: "Tecnología PQR", total: 32000, porcentaje: 13 },
  { cliente: "Comercial DEF", total: 28000, porcentaje: 11 },
  { cliente: "Otros", total: 107000, porcentaje: 43 },
];

const estadosPorMes = [
  { name: "Vigente", value: 65, color: "#2563EB" },
  { name: "Por vencer", value: 20, color: "#F59E0B" },
  { name: "Vencida", value: 15, color: "#EF4444" },
];

const tasasRecuperacion = [
  { mes: "Ene", tasa: 84 },
  { mes: "Feb", tasa: 92 },
  { mes: "Mar", tasa: 87 },
  { mes: "Abr", tasa: 90 },
  { mes: "May", tasa: 89 },
  { mes: "Jun", tasa: 91 },
];

export function Reportes() {
  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-1">Reportes y Análisis</h1>
          <p className="text-gray-500">Visualiza el desempeño de tu cartera</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Generar reporte personalizado
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" />
            Exportar a Excel
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">Período:</span>
          </div>
          
          <Select defaultValue="ultimos6">
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Seleccionar período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hoy">Hoy</SelectItem>
              <SelectItem value="semana">Esta semana</SelectItem>
              <SelectItem value="mes">Este mes</SelectItem>
              <SelectItem value="ultimos3">Últimos 3 meses</SelectItem>
              <SelectItem value="ultimos6">Últimos 6 meses</SelectItem>
              <SelectItem value="ano">Este año</SelectItem>
              <SelectItem value="personalizado">Personalizado</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="todos">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Cliente" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos los clientes</SelectItem>
              <SelectItem value="abc">Constructora ABC</SelectItem>
              <SelectItem value="xyz">Inversiones XYZ</SelectItem>
              <SelectItem value="def">Comercial DEF</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="todos">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos los estados</SelectItem>
              <SelectItem value="vigente">Vigente</SelectItem>
              <SelectItem value="vencida">Vencida</SelectItem>
              <SelectItem value="pagada">Pagada</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Más filtros
          </Button>
        </div>
      </div>

      {/* KPIs principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-5 border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-gray-600">Facturado</p>
            <Badge variant="secondary" className="bg-blue-50 text-blue-700">
              <TrendingUp className="w-3 h-3 mr-1" />
              +15.2%
            </Badge>
          </div>
          <p className="text-gray-900 mb-1">$331,000</p>
          <p className="text-xs text-gray-500">vs. período anterior: $287,400</p>
        </Card>

        <Card className="p-5 border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-gray-600">Cobrado</p>
            <Badge variant="secondary" className="bg-green-50 text-green-700">
              <TrendingUp className="w-3 h-3 mr-1" />
              +18.3%
            </Badge>
          </div>
          <p className="text-gray-900 mb-1">$296,000</p>
          <p className="text-xs text-gray-500">89.4% del total facturado</p>
        </Card>

        <Card className="p-5 border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-gray-600">Cartera vencida</p>
            <Badge variant="secondary" className="bg-red-50 text-red-700">
              <TrendingDown className="w-3 h-3 mr-1" />
              -5.2%
            </Badge>
          </div>
          <p className="text-gray-900 mb-1">$35,000</p>
          <p className="text-xs text-gray-500">10.6% del total facturado</p>
        </Card>

        <Card className="p-5 border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-gray-600">Tasa recuperación</p>
            <Badge variant="secondary" className="bg-green-50 text-green-700">
              <TrendingUp className="w-3 h-3 mr-1" />
              +2.1%
            </Badge>
          </div>
          <p className="text-gray-900 mb-1">89.0%</p>
          <p className="text-xs text-gray-500">Promedio del período</p>
        </Card>
      </div>

      {/* Gráficos principales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900">Evolución Mensual</h3>
            <Button variant="ghost" size="sm">
              <Download className="w-4 h-4" />
            </Button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={evolucionMensual}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="mes" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #E5E7EB",
                  borderRadius: "0.5rem",
                }}
              />
              <Bar dataKey="facturado" fill="#2563EB" radius={[4, 4, 0, 0]} />
              <Bar dataKey="cobrado" fill="#10B981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="vencido" fill="#EF4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-600 rounded"></div>
              <span className="text-xs text-gray-600">Facturado</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-xs text-gray-600">Cobrado</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span className="text-xs text-gray-600">Vencido</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900">Tasa de Recuperación</h3>
            <Button variant="ghost" size="sm">
              <Download className="w-4 h-4" />
            </Button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={tasasRecuperacion}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="mes" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #E5E7EB",
                  borderRadius: "0.5rem",
                }}
              />
              <Line
                type="monotone"
                dataKey="tasa"
                stroke="#2563EB"
                strokeWidth={3}
                dot={{ fill: "#2563EB", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="w-3 h-3 bg-blue-600 rounded"></div>
            <span className="text-xs text-gray-600">Tasa de recuperación (%)</span>
          </div>
        </Card>
      </div>

      {/* Distribución y estados */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900">Cartera por Cliente (Top 5)</h3>
            <Button variant="ghost" size="sm">
              <Download className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-4">
            {distribucionPorCliente.map((cliente, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-900">{cliente.cliente}</span>
                  <span className="text-sm text-gray-600">${cliente.total.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${cliente.porcentaje}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 w-12 text-right">{cliente.porcentaje}%</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900">Distribución por Estado</h3>
            <Button variant="ghost" size="sm">
              <Download className="w-4 h-4" />
            </Button>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={estadosPorMes}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              >
                {estadosPorMes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {estadosPorMes.map((item, index) => (
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

      {/* Tabla detallada */}
      <Card className="border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-900">Detalle por Cliente</h3>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Exportar tabla
            </Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-right text-xs text-gray-600 uppercase tracking-wider">
                  Facturado
                </th>
                <th className="px-6 py-3 text-right text-xs text-gray-600 uppercase tracking-wider">
                  Cobrado
                </th>
                <th className="px-6 py-3 text-right text-xs text-gray-600 uppercase tracking-wider">
                  Pendiente
                </th>
                <th className="px-6 py-3 text-right text-xs text-gray-600 uppercase tracking-wider">
                  Vencido
                </th>
                <th className="px-6 py-3 text-center text-xs text-gray-600 uppercase tracking-wider">
                  % Recuperación
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { cliente: "Constructora ABC", facturado: 45000, cobrado: 32500, pendiente: 12500, vencido: 12500, recuperacion: 72 },
                { cliente: "Inversiones XYZ", facturado: 38000, cobrado: 38000, pendiente: 0, vencido: 0, recuperacion: 100 },
                { cliente: "Comercial DEF", facturado: 32000, cobrado: 16300, pendiente: 15700, vencido: 0, recuperacion: 51 },
                { cliente: "Importadora JKL", facturado: 28000, cobrado: 5600, pendiente: 22400, vencido: 0, recuperacion: 20 },
                { cliente: "Tecnología PQR", facturado: 24000, cobrado: 18330, pendiente: 5670, vencido: 5670, recuperacion: 76 },
              ].map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{row.cliente}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 text-right">
                    ${row.facturado.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-green-600 text-right">
                    ${row.cobrado.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 text-right">
                    ${row.pendiente.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-right">
                    <span className={row.vencido > 0 ? "text-red-600" : "text-gray-400"}>
                      ${row.vencido.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Badge
                      variant="outline"
                      className={
                        row.recuperacion >= 90
                          ? "bg-green-50 text-green-700 border-green-200"
                          : row.recuperacion >= 70
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : row.recuperacion >= 50
                          ? "bg-orange-50 text-orange-700 border-orange-200"
                          : "bg-red-50 text-red-700 border-red-200"
                      }
                    >
                      {row.recuperacion}%
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
