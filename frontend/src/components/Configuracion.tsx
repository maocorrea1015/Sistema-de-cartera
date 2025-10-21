import { Users, Settings, CreditCard, FileText, Plus, Edit, Trash2, Shield } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";

export function Configuracion() {
  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-1">Configuración</h1>
          <p className="text-gray-500">Administra los parámetros del sistema</p>
        </div>
      </div>

      <Tabs defaultValue="clientes" className="w-full">
        <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid">
          <TabsTrigger value="clientes">
            <Users className="w-4 h-4 mr-2" />
            Clientes
          </TabsTrigger>
          <TabsTrigger value="estados">
            <FileText className="w-4 h-4 mr-2" />
            Estados
          </TabsTrigger>
          <TabsTrigger value="metodos">
            <CreditCard className="w-4 h-4 mr-2" />
            Métodos de Pago
          </TabsTrigger>
          <TabsTrigger value="usuarios">
            <Shield className="w-4 h-4 mr-2" />
            Usuarios
          </TabsTrigger>
          <TabsTrigger value="sistema">
            <Settings className="w-4 h-4 mr-2" />
            Sistema
          </TabsTrigger>
        </TabsList>

        {/* Clientes */}
        <TabsContent value="clientes" className="mt-6">
          <Card className="border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-900">Gestión de Clientes</h3>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Nuevo cliente
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
                    <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                      Contacto
                    </th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                      Teléfono
                    </th>
                    <th className="px-6 py-3 text-right text-xs text-gray-600 uppercase tracking-wider">
                      Límite de crédito
                    </th>
                    <th className="px-6 py-3 text-center text-xs text-gray-600 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-center text-xs text-gray-600 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[
                    { nombre: "Constructora ABC", contacto: "contacto@abc.com", telefono: "+1 555-0101", limite: 50000, estado: "activo" },
                    { nombre: "Inversiones XYZ", contacto: "info@xyz.com", telefono: "+1 555-0102", limite: 75000, estado: "activo" },
                    { nombre: "Comercial DEF", contacto: "ventas@def.com", telefono: "+1 555-0103", limite: 40000, estado: "activo" },
                    { nombre: "Servicios GHI", contacto: "contacto@ghi.com", telefono: "+1 555-0104", limite: 30000, estado: "inactivo" },
                  ].map((cliente, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">{cliente.nombre}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{cliente.contacto}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{cliente.telefono}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 text-right">
                        ${cliente.limite.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Badge
                          variant="outline"
                          className={
                            cliente.estado === "activo"
                              ? "bg-green-50 text-green-700 border-green-200"
                              : "bg-gray-50 text-gray-700 border-gray-200"
                          }
                        >
                          {cliente.estado === "activo" ? "Activo" : "Inactivo"}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* Estados de Cartera */}
        <TabsContent value="estados" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 border border-gray-200">
              <h3 className="text-gray-900 mb-4">Estados de Factura</h3>
              <div className="space-y-3">
                {[
                  { nombre: "Vigente", color: "blue", descripcion: "Factura dentro del plazo de pago" },
                  { nombre: "Por vencer", color: "orange", descripcion: "Vence en menos de 7 días" },
                  { nombre: "Vencida", color: "red", descripcion: "Pasó la fecha de vencimiento" },
                  { nombre: "Pagada", color: "green", descripcion: "Pago completo recibido" },
                ].map((estado, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 bg-${estado.color}-100 rounded-lg flex items-center justify-center`}>
                        <div className={`w-3 h-3 bg-${estado.color}-600 rounded-full`}></div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-900">{estado.nombre}</p>
                        <p className="text-xs text-gray-500">{estado.descripcion}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 border border-gray-200">
              <h3 className="text-gray-900 mb-4">Reglas de Alertas</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="dias-alerta">Días antes de vencimiento para alertar</Label>
                  <Input id="dias-alerta" type="number" defaultValue="7" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dias-mora">Días de tolerancia después de vencimiento</Label>
                  <Input id="dias-mora" type="number" defaultValue="3" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="monto-alerta">Monto mínimo para alerta ($)</Label>
                  <Input id="monto-alerta" type="number" defaultValue="1000" />
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Guardar configuración
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Métodos de Pago */}
        <TabsContent value="metodos" className="mt-6">
          <Card className="border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-900">Métodos de Pago Disponibles</h3>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Nuevo método
                </Button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { nombre: "Transferencia bancaria", icono: "💳", activo: true },
                  { nombre: "Efectivo", icono: "💵", activo: true },
                  { nombre: "Cheque", icono: "📝", activo: true },
                  { nombre: "Tarjeta de crédito", icono: "💳", activo: false },
                  { nombre: "Depósito bancario", icono: "🏦", activo: true },
                  { nombre: "PayPal", icono: "🅿️", activo: false },
                ].map((metodo, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{metodo.icono}</span>
                      <span className="text-sm text-gray-900">{metodo.nombre}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Switch checked={metodo.activo} />
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card className="p-6 border border-gray-200 mt-6">
            <h3 className="text-gray-900 mb-4">Cuentas Bancarias</h3>
            <div className="space-y-3">
              {[
                { banco: "Banco Nacional", cuenta: "**** **** **** 1234", tipo: "Cuenta corriente" },
                { banco: "Banco Internacional", cuenta: "**** **** **** 5678", tipo: "Cuenta de ahorros" },
                { banco: "Banco Regional", cuenta: "**** **** **** 9012", tipo: "Cuenta corriente" },
              ].map((cuenta, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-900">{cuenta.banco}</p>
                    <p className="text-xs text-gray-500">{cuenta.cuenta} • {cuenta.tipo}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              <Plus className="w-4 h-4 mr-2" />
              Agregar cuenta bancaria
            </Button>
          </Card>
        </TabsContent>

        {/* Usuarios y Roles */}
        <TabsContent value="usuarios" className="mt-6">
          <Card className="border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-900">Usuarios del Sistema</h3>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Nuevo usuario
                </Button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                      Usuario
                    </th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                      Correo
                    </th>
                    <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                      Rol
                    </th>
                    <th className="px-6 py-3 text-center text-xs text-gray-600 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-center text-xs text-gray-600 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[
                    { nombre: "Admin Usuario", correo: "admin@carterapro.com", rol: "Administrador", estado: "activo" },
                    { nombre: "Ana García", correo: "ana.garcia@carterapro.com", rol: "Gestor de cobros", estado: "activo" },
                    { nombre: "Carlos Ruiz", correo: "carlos.ruiz@carterapro.com", rol: "Gestor de cobros", estado: "activo" },
                    { nombre: "María López", correo: "maria.lopez@carterapro.com", rol: "Consultor", estado: "inactivo" },
                  ].map((usuario, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-sm text-blue-600">
                              {usuario.nombre.split(" ").map((n) => n[0]).join("")}
                            </span>
                          </div>
                          <span className="text-sm text-gray-900">{usuario.nombre}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{usuario.correo}</td>
                      <td className="px-6 py-4">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {usuario.rol}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Badge
                          variant="outline"
                          className={
                            usuario.estado === "activo"
                              ? "bg-green-50 text-green-700 border-green-200"
                              : "bg-gray-50 text-gray-700 border-gray-200"
                          }
                        >
                          {usuario.estado === "activo" ? "Activo" : "Inactivo"}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card className="p-6 border border-gray-200 mt-6">
            <h3 className="text-gray-900 mb-4">Roles y Permisos</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  rol: "Administrador",
                  permisos: "Acceso completo al sistema",
                  usuarios: 1,
                },
                {
                  rol: "Gestor de cobros",
                  permisos: "Gestión de cartera y cobros",
                  usuarios: 2,
                },
                {
                  rol: "Consultor",
                  permisos: "Solo lectura y reportes",
                  usuarios: 1,
                },
              ].map((rol, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="text-sm text-gray-900 mb-2">{rol.rol}</h4>
                  <p className="text-xs text-gray-500 mb-3">{rol.permisos}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">{rol.usuarios} usuario(s)</span>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Sistema */}
        <TabsContent value="sistema" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 border border-gray-200">
              <h3 className="text-gray-900 mb-4">Preferencias Generales</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div>
                    <p className="text-sm text-gray-900">Notificaciones por correo</p>
                    <p className="text-xs text-gray-500">Recibir alertas de facturas vencidas</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div>
                    <p className="text-sm text-gray-900">Recordatorios automáticos</p>
                    <p className="text-xs text-gray-500">Enviar recordatorios a clientes</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div>
                    <p className="text-sm text-gray-900">Modo oscuro</p>
                    <p className="text-xs text-gray-500">Tema oscuro de la interfaz</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm text-gray-900">Sincronización automática</p>
                    <p className="text-xs text-gray-500">Sincronizar datos cada hora</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </Card>

            <Card className="p-6 border border-gray-200">
              <h3 className="text-gray-900 mb-4">Información de la Empresa</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="empresa">Nombre de la empresa</Label>
                  <Input id="empresa" defaultValue="Mi Empresa S.A." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rfc">RFC / NIT</Label>
                  <Input id="rfc" defaultValue="ABC123456XYZ" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="direccion">Dirección</Label>
                  <Input id="direccion" defaultValue="Av. Principal 123, Ciudad" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input id="telefono" defaultValue="+1 (555) 123-4567" />
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Actualizar información
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
