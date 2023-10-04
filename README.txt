1. make sure you have django installed with 'pip install django' in terminal
2. To to start a test server type "python manage.py runserver' in terminal

git command notes:
'git push origin main' add code to github

python manage.py makemigrations

to get into a command line type
python manage.py shell

    from mainapp.models import plants
    musc = Plants(commonNames = "Muscidine", ScientificName = "Vitis rotundifolia")
     musc.save()