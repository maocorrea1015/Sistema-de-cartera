# reportes/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('reportes/resumen/', views.resumen_general, name='resumen-general'),
    path('reportes/cliente/<int:cliente_id>/', views.resumen_cliente, name='resumen-cliente'),
    path('reportes/ingresos-mensuales/', views.ingresos_mensuales, name='ingresos-mensuales'),
    path('reportes/mora/', views.reportes_mora, name='reportes-mora'),
]