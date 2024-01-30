from django.contrib import admin
from .models import Plant, PlantFamily, PlantSpecies, GrowthCondition
admin.site.register(Plant)
admin.site.register(PlantFamily)
admin.site.register(PlantSpecies)
admin.site.register(GrowthCondition)
# Register your models here.
