# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-04-26 19:25
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0002_auto_20170426_2115'),
    ]

    operations = [
        migrations.AlterField(
            model_name='data',
            name='downloaded_at',
            field=models.TimeField(blank=True, null=True),
        ),
    ]
