from django.shortcuts import render
from django.http import HttpResponse
from .models import Plants


def index(response):
    return render(response, "mainapp/index.html",  {})

def plants(response):
    return render(response,  "mainapp/plantshomepage.html", {}) #rendering the html file
def plantinfo(response, id):
    ls = Plants.objects.get(id=id)
    return HttpResponse("<h1>Hello plantinfo!     %s</h1>"%ls.commonNames)



# Create your views here.
