from django.shortcuts import render
from django.http import HttpResponse
from .models import Plant, PlantFamily, PlantSpecies, GrowthCondition


def index(response):
    return render(response, "mainapp/index.html",  {}) # when using a dicationary put the 

def plants(response):
    return render(response,  "mainapp/plantshomepage.html", {}) #rendering the html file
def plantinfo(response, id):
    ls = Plant.objects.get(id=id)
    return HttpResponse("<h1>Hello plantinfo!     %s</h1>"%ls.commonNames)



# Create your views here.
