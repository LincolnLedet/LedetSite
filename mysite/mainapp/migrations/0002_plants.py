# Generated by Django 4.2.5 on 2023-10-04 02:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Plants',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('commonNames', models.CharField(max_length=400)),
                ('ScientificName', models.CharField(max_length=400)),
                ('NativeArea', models.CharField(max_length=400)),
            ],
        ),
    ]