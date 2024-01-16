# Generated by Django 4.2.6 on 2024-01-05 18:49

import catagyres.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Catagrey',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=240, verbose_name='name')),
                ('image', models.ImageField(blank=True, null=True, upload_to=catagyres.models.upload_to)),
                ('status_Show', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=240, verbose_name='Name')),
                ('purshingPrice', models.FloatField()),
                ('sellingPrice', models.FloatField()),
                ('quanilty', models.IntegerField()),
                ('packingType', models.CharField(choices=[('carton', 'carton'), ('pill', 'pill')], max_length=300)),
                ('status_show', models.BooleanField(default=True)),
                ('catagyName', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='catagyres.catagrey')),
            ],
        ),
    ]
