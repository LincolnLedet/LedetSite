from django.urls import path

from . import views #. is current directory

urlpatterns = [
path("", views.index, name="index"),
path("plants", views.plants, name="plants"),
path("<int:id>", views.plantinfo, name="plantinfo"),
]