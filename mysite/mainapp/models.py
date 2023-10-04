from django.db import models

# Create your models here.# creating a data base object
    
class Plants(models.Model):
    commonNames = models.CharField(max_length = 400)
    ScientificName = models.CharField(max_length = 400)
    def __str__(self):
        return self.commonNames


