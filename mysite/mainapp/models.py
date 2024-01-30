from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class PlantFamily(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name

class PlantSpecies(models.Model):
    family = models.ForeignKey(PlantFamily, on_delete=models.CASCADE)
    common_name = models.CharField(max_length=100)
    scientific_name = models.CharField(max_length=100)
    description = models.TextField()
    origin = models.CharField(max_length=100)

    def __str__(self):
        return self.common_name

class GrowthCondition(models.Model):
    species = models.OneToOneField(PlantSpecies, on_delete=models.CASCADE)
    sunlight = models.CharField(max_length=100, choices=[('full', 'Full Sun'), ('partial', 'Partial Shade'), ('shade', 'Shade')])
    water_frequency = models.IntegerField(help_text="Days between watering")
    preferred_temperature_range = models.CharField(max_length=50)
    soil_type = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.species.common_name} Growth Conditions"

class Plant(models.Model):
    species = models.ForeignKey(PlantSpecies, on_delete=models.CASCADE)
    nickname = models.CharField(max_length=100, blank=True)
    date_acquired = models.DateField()
    height = models.DecimalField(max_digits=5, decimal_places=2, validators=[MinValueValidator(0.0)])
    is_indoor = models.BooleanField()

    def __str__(self):
        return f"{self.nickname or self.species.common_name} - {self.height} cm"

class CareRecord(models.Model):
    plant = models.ForeignKey(Plant, on_delete=models.CASCADE)
    date = models.DateField()
    height = models.DecimalField(max_digits=5, decimal_places=2, validators=[MinValueValidator(0.0)])
    notes = models.TextField(blank=True)

    def __str__(self):
        return f"Care Record for {self.plant.nickname or self.plant.species.common_name} on {self.date}"

class Photo(models.Model):
    plant = models.ForeignKey(Plant, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='plant_photos')
    caption = models.CharField(max_length=255, blank=True)
    date_taken = models.DateField()

    def __str__(self):
        return f"Photo of {self.plant.nickname or self.plant.species.common_name} on {self.date_taken}"


