# cartera_project/urls.py
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('usuarios.urls')),
    path('api/', include('clientes.urls')),
    path('api/', include('facturas.urls')),
    path('api/', include('pagos.urls')),
    path('api/', include('reportes.urls')),
    path('api/', include('configuracion.urls')),
]