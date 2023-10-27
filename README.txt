1. make sure you have django installed with 'pip install django' in terminal
2. To to start a test server type "python manage.py runserver' in terminal

git command notes:
'git push origin main' add code to github

python manage.py makemigrations

to get into a command line type
python manage.py shell
from mainapp.models import Plants

    from mainapp.models import Plants \\ this is how you import the model
    musc = Plants(commonNames = "Muscidine", ScientificName = "Vitis rotundifolia") \\ this is how you create a new object
    musc.save() \\ this is how you save the object to the database
    Plants.object.get(id = 1)   \\ this is how you get an object from the database
    Plants.object.all() \\ this is how you get all objects from the database
    Plants.object.filter(commonNames = "Muscidine") \\ this is how you filter objects from the database
    Plants.object.filter(commonNames__contains = "Muscidine") \\ this is how you filter objects from the database

    How do i add a plant characteristic to a plant?
    Lets say this characteristic is its own model

    musc.characteristic.create(name = "leaf shape", value = "round") \\ this is how you add a characteristic to a plant
    musc.characteristic.all() \\ this is how you get all characteristics from a plant

Data base management shit 

    to add a django admin login you need to create a super user account
    python manage.py createsuperuser


    python manage.py shell
    from mainapp.models import Plants
    allPlants = Plants.objects
    allPlants.all()
    Plants.object.filter(commonNames = "Muscidine") \\ this is how you filter objects from the database

    what about deleting
    del_object = allPlants.get(id=1)
    del_object.delete()

    REMember to add these lines in the admin.py file so you can access them through the control panel
    from .models import Plants
    admin.site.register(Plants)

