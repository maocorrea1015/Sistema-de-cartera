import { X, DollarSign } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";

interface RegistrarPagoProps {
  isOpen: boolean;
  onClose: () => void;
  factura?: any;
}

export function RegistrarPago({ isOpen, onClose, factura }: RegistrarPagoProps) {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para guardar el pago
    alert("Pago registrado exitosamente");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-gray-900">Registrar Pago</h2>
              <p className="text-sm text-gray-500">
                {factura ? `${factura.factura} - ${factura.cliente}` : "Nueva transacción"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Resumen de factura */}
          {factura && (
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Valor de factura</span>
                <span className="text-sm text-gray-900">${factura.valor.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Saldo pendiente</span>
                <span className="text-sm text-gray-900">${factura.saldo.toLocaleString()}</span>
              </div>
            </div>
          )}

          {/* Formulario */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="monto">Monto del pago *</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <Input
                  id="monto"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="pl-7"
                  defaultValue={factura?.saldo}
                  required
                />
              </div>
              <p className="text-xs text-gray-500">
                Máximo: ${factura?.saldo.toLocaleString()}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fecha">Fecha de pago *</Label>
              <Input
                id="fecha"
                type="date"
                defaultValue="2025-10-17"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="metodo">Método de pago *</Label>
              <Select defaultValue="transferencia">
                <SelectTrigger id="metodo">
                  <SelectValue placeholder="Seleccionar método" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="transferencia">Transferencia bancaria</SelectItem>
                  <SelectItem value="efectivo">Efectivo</SelectItem>
                  <SelectItem value="cheque">Cheque</SelectItem>
                  <SelectItem value="tarjeta">Tarjeta de crédito/débito</SelectItem>
                  <SelectItem value="deposito">Depósito bancario</SelectItem>
                  <SelectItem value="otro">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="referencia">Número de referencia</Label>
              <Input
                id="referencia"
                type="text"
                placeholder="Ej: TRANS-123456"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="banco">Banco / Cuenta</Label>
            <Select defaultValue="banco1">
              <SelectTrigger id="banco">
                <SelectValue placeholder="Seleccionar cuenta" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="banco1">Banco Nacional - Cta. *****1234</SelectItem>
                <SelectItem value="banco2">Banco Internacional - Cta. *****5678</SelectItem>
                <SelectItem value="banco3">Banco Regional - Cta. *****9012</SelectItem>
                <SelectItem value="caja">Caja general</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="observaciones">Observaciones</Label>
            <Textarea
              id="observaciones"
              placeholder="Notas adicionales sobre el pago..."
              rows={3}
              className="resize-none"
            />
          </div>

          {/* Opciones adicionales */}
          <div className="space-y-3 pt-4 border-t border-gray-200">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div>
                <span className="text-sm text-gray-900">Enviar confirmación al cliente</span>
                <p className="text-xs text-gray-500">
                  Se enviará un recibo de pago por correo electrónico
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div>
                <span className="text-sm text-gray-900">Aplicar automáticamente</span>
                <p className="text-xs text-gray-500">
                  El pago se aplicará a la factura seleccionada
                </p>
              </div>
            </label>
          </div>

          {/* Footer con botones */}
          <div className="flex gap-3 pt-6 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              <DollarSign className="w-4 h-4 mr-2" />
              Guardar pago
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
