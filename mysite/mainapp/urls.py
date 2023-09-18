from django.urls import path

from . import views #. is current directory

urlpatterns = [
path("", views.index, name="index"),
]