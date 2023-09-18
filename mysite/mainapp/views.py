from django.shortcuts import render
from django.http import HttpResponse
from .models import ToDoList, Item


def index(response):
    return render(response, "mainapp/index.html",  {})


# Create your views here.
