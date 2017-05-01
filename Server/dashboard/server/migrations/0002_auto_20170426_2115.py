# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-04-26 19:15
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='data',
            name='latitude',
            field=models.DecimalField(decimal_places=6, max_digits=9),
        ),
        migrations.AlterField(
            model_name='data',
            name='longitude',
            field=models.DecimalField(decimal_places=6, max_digits=9),
        ),
    ]