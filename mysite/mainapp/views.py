from django.shortcuts import render
from django.http import HttpResponse
from .models import Plants


def index(response):
    return render(response, "mainapp/index.html",  {})

def plants(response):
    return HttpResponse("<h1>Hello world!</h1>")


# Create your views here.
