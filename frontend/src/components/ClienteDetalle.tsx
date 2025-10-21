import { ArrowLeft, Building2, Mail, Phone, MapPin, DollarSign, Calendar, FileText, MessageSquare, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";

interface ClienteDetalleProps {
  onBack: () => void;
  onOpenRegistrarPago: (factura: any) => void;
  selectedData?: any;
}

const historialPagos = [
  { id: 1, fecha: "2025-10-16", monto: 0, metodo: "Parcial", referencia: "PAGO-001", abono: 8300 },
  { id: 2, fecha: "2025-09-15", monto: 12500, metodo: "Transferencia", referencia: "TRANS-1234", abono: 12500 },
  { id: 3, fecha: "2025-08-20", monto: 7500, metodo: "Cheque", referencia: "CHQ-5678", abono: 7500 },
];

const timelineGestion = [
  {
    id: 1,
    fecha: "2025-10-17 10:30",
    accion: "Llamada de seguimiento",
    responsable: "Ana García",
    resultado: "Cliente promete pago para mañana",
    tipo: "llamada",
  },
  {
    id: 2,
    fecha: "2025-10-15 14:20",
    accion: "Envío de recordatorio por correo",
    responsable: "Sistema",
    resultado: "Correo enviado exitosamente",
    tipo: "email",
  },
  {
    id: 3,
    fecha: "2025-10-12 09:15",
    accion: "Primera gestión de cobro",
    responsable: "Ana García",
    resultado: "Se contactó al cliente, reporta problemas de flujo",
    tipo: "llamada",
  },
];

const observaciones = [
  {
    id: 1,
    fecha: "2025-10-16 11:45",
    usuario: "Ana García",
    nota: "Cliente solicita plan de pago en 3 cuotas. Se acordó enviar propuesta formal.",
  },
  {
    id: 2,
    fecha: "2025-10-14 16:30",
    usuario: "Carlos Ruiz",
    nota: "Empresa está pasando por reestructuración financiera. Mantener seguimiento cercano.",
  },
  {
    id: 3,
    fecha: "2025-10-10 09:00",
    usuario: "Ana García",
    nota: "Cliente es buen pagador históricamente. Esta es la primera vez que presenta mora.",
  },
];

export function ClienteDetalle({ onBack, onOpenRegistrarPago, selectedData }: ClienteDetalleProps) {
  const factura = selectedData || {
    cliente: "Constructora ABC",
    factura: "FC-2025-001",
    valor: 12500,
    saldo: 12500,
    estado: "vencida",
    fechaEmision: "2025-09-15",
    vencimiento: "2025-10-15",
    diasMora: 2,
  };

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver
        </Button>
        <div className="flex-1">
          <h1 className="text-gray-900 mb-1">{factura.cliente}</h1>
          <p className="text-gray-500">Detalle de cliente y factura {factura.factura}</p>
        </div>
        <Button onClick={() => onOpenRegistrarPago(factura)} className="bg-blue-600 hover:bg-blue-700">
          <DollarSign className="w-4 h-4 mr-2" />
          Registrar pago
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Información del cliente */}
        <Card className="p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-gray-900">Información del Cliente</h3>
              <p className="text-sm text-gray-500">Datos de contacto</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Building2 className="w-4 h-4 text-gray-400 mt-1" />
              <div>
                <p className="text-xs text-gray-500">Razón Social</p>
                <p className="text-sm text-gray-900">{factura.cliente}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-gray-400 mt-1" />
              <div>
                <p className="text-xs text-gray-500">Correo electrónico</p>
                <p className="text-sm text-gray-900">contacto@constructoraabc.com</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-gray-400 mt-1" />
              <div>
                <p className="text-xs text-gray-500">Teléfono</p>
                <p className="text-sm text-gray-900">+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-gray-400 mt-1" />
              <div>
                <p className="text-xs text-gray-500">Dirección</p>
                <p className="text-sm text-gray-900">Av. Principal 123, Ciudad</p>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Límite de crédito</span>
              <span className="text-sm text-gray-900">$50,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Crédito utilizado</span>
              <span className="text-sm text-gray-900">$25,300</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Disponible</span>
              <span className="text-sm text-green-600">$24,700</span>
            </div>
          </div>
        </Card>

        {/* Resumen de factura */}
        <Card className="p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h3 className="text-gray-900">Factura {factura.factura}</h3>
              <Badge
                variant="outline"
                className={
                  factura.estado === "vencida"
                    ? "bg-red-50 text-red-700 border-red-200"
                    : factura.estado === "vigente"
                    ? "bg-blue-50 text-blue-700 border-blue-200"
                    : "bg-green-50 text-green-700 border-green-200"
                }
              >
                {factura.estado === "vencida"
                  ? "Vencida"
                  : factura.estado === "vigente"
                  ? "Vigente"
                  : "Pagada"}
              </Badge>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Calendar className="w-4 h-4 text-gray-400 mt-1" />
              <div>
                <p className="text-xs text-gray-500">Fecha de emisión</p>
                <p className="text-sm text-gray-900">{factura.fechaEmision}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="w-4 h-4 text-gray-400 mt-1" />
              <div>
                <p className="text-xs text-gray-500">Fecha de vencimiento</p>
                <p className="text-sm text-gray-900">{factura.vencimiento}</p>
              </div>
            </div>

            {factura.diasMora > 0 && (
              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 text-red-400 mt-1" />
                <div>
                  <p className="text-xs text-gray-500">Días de mora</p>
                  <p className="text-sm text-red-600">{factura.diasMora} días</p>
                </div>
              </div>
            )}
          </div>

          <Separator className="my-6" />

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Valor total</span>
              <span className="text-sm text-gray-900">${factura.valor.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Pagos realizados</span>
              <span className="text-sm text-green-600">
                ${(factura.valor - factura.saldo).toLocaleString()}
              </span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-gray-900">Saldo pendiente</span>
              <span className="text-gray-900">${factura.saldo.toLocaleString()}</span>
            </div>
          </div>
        </Card>

        {/* Estadísticas */}
        <Card className="p-6 border border-gray-200">
          <h3 className="text-gray-900 mb-6">Estadísticas del Cliente</h3>
          
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Total facturado</p>
              <p className="text-gray-900">$127,500</p>
              <p className="text-xs text-gray-500 mt-1">Últimos 12 meses</p>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Tasa de pago</p>
              <p className="text-gray-900">95%</p>
              <p className="text-xs text-gray-500 mt-1">Promedio histórico</p>
            </div>

            <div className="bg-orange-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Días promedio de pago</p>
              <p className="text-gray-900">28 días</p>
              <p className="text-xs text-gray-500 mt-1">Últimos 6 meses</p>
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Facturas activas</p>
              <p className="text-gray-900">3</p>
              <p className="text-xs text-gray-500 mt-1">Total: $38,200</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="pagos" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
          <TabsTrigger value="pagos">Historial de Pagos</TabsTrigger>
          <TabsTrigger value="gestion">Gestión de Cobro</TabsTrigger>
          <TabsTrigger value="observaciones">Observaciones</TabsTrigger>
          <TabsTrigger value="documentos">Documentos</TabsTrigger>
        </TabsList>

        <TabsContent value="pagos" className="mt-6">
          <Card className="border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                      Fecha
                    </th>
                    <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                      Método
                    </th>
                    <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                      Referencia
                    </th>
                    <th className="px-4 py-3 text-right text-xs text-gray-600 uppercase tracking-wider">
                      Monto
                    </th>
                    <th className="px-4 py-3 text-center text-xs text-gray-600 uppercase tracking-wider">
                      Estado
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {historialPagos.map((pago) => (
                    <tr key={pago.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">{pago.fecha}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{pago.metodo}</td>
                      <td className="px-4 py-3 text-sm text-blue-600">{pago.referencia}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">
                        ${pago.abono.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Confirmado
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="gestion" className="mt-6">
          <Card className="p-6 border border-gray-200">
            <div className="space-y-6">
              {timelineGestion.map((item, index) => (
                <div key={item.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        item.tipo === "llamada"
                          ? "bg-blue-100"
                          : item.tipo === "email"
                          ? "bg-purple-100"
                          : "bg-green-100"
                      }`}
                    >
                      {item.tipo === "llamada" ? (
                        <Phone className="w-5 h-5 text-blue-600" />
                      ) : item.tipo === "email" ? (
                        <Mail className="w-5 h-5 text-purple-600" />
                      ) : (
                        <MessageSquare className="w-5 h-5 text-green-600" />
                      )}
                    </div>
                    {index < timelineGestion.length - 1 && (
                      <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-sm text-gray-900">{item.accion}</h4>
                      <span className="text-xs text-gray-500">{item.fecha}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{item.resultado}</p>
                    <p className="text-xs text-gray-500">Por: {item.responsable}</p>
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-6" />

            <Button className="w-full" variant="outline">
              <Phone className="w-4 h-4 mr-2" />
              Registrar nueva gestión
            </Button>
          </Card>
        </TabsContent>

        <TabsContent value="observaciones" className="mt-6">
          <Card className="p-6 border border-gray-200">
            <div className="space-y-4 mb-6">
              {observaciones.map((obs) => (
                <div key={obs.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-xs text-blue-600">
                          {obs.usuario.split(" ").map((n) => n[0]).join("")}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-900">{obs.usuario}</p>
                        <p className="text-xs text-gray-500">{obs.fecha}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 ml-10">{obs.nota}</p>
                </div>
              ))}
            </div>

            <Separator className="my-6" />

            <div className="space-y-3">
              <textarea
                className="w-full border border-gray-200 rounded-lg p-3 text-sm resize-none"
                rows={3}
                placeholder="Escribe una nueva observación..."
              />
              <div className="flex justify-end">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Agregar observación
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="documentos" className="mt-6">
          <Card className="p-6 border border-gray-200">
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-gray-900 mb-2">No hay documentos adjuntos</h3>
              <p className="text-gray-500 mb-4">
                Sube facturas, contratos u otros documentos relacionados
              </p>
              <Button variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Subir documento
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
