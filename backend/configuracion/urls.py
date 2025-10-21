# configuracion/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('config/empresa/', views.EmpresaView.as_view(), name='empresa-config'),
    path('config/parametros/', views.ParametroSistemaView.as_view(), name='parametros-config'),
    path('config/parametros-list/', views.obtener_parametros, name='parametros-list'),
]