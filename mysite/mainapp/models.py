from django.db import models

# Create your models here.# creating a data base object
class ToDoList(models.Model):
    name = models.CharField(max_length = 200)

    def __str__(self):
        return self.name
    
class Item(models.Model):
    todolist = models.ForeignKey(ToDoList, on_delete=models.CASCADE)
    text = models.CharField(max_length = 400)
    complete = models.BooleanField()

    def __str__(self):
        return self.text
    
class Plants(models.Model):
    commonNames = models.CharField(max_length = 400)
    ScientificName = models.CharField(max_length = 400)
    NativeArea = models.CharField(max_length = 400)

