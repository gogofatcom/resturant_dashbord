# Generated by Django 4.2.6 on 2024-01-14 01:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ordercart', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='ordercart',
            name='cartid',
            field=models.IntegerField(default=1),
        ),
    ]
