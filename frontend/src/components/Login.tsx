import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Logo } from "./Logo";

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="flex justify-center mb-8">
            <Logo size="large" />
          </div>
          
          <div className="text-center mb-8">
            <h1 className="text-gray-900 mb-2">Bienvenido</h1>
            <p className="text-gray-500">Ingresa a tu cuenta para continuar</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="usuario@empresa.com"
                className="h-11 border-gray-200"
                defaultValue="admin@carterapro.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="h-11 border-gray-200"
                defaultValue="••••••••"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-600">Recordarme</span>
              </label>
              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            <Button
              type="submit"
              className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/30"
            >
              Iniciar sesión
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              ¿Necesitas ayuda?{" "}
              <button className="text-blue-600 hover:text-blue-700 transition-colors">
                Contacta soporte
              </button>
            </p>
          </div>
        </div>

        <p className="text-center mt-6 text-sm text-gray-500">
          © 2025 CarteraPro. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
}
