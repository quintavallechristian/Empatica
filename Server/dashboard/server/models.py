#MODEL of the data structure used in the database

from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Data(models.Model):
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    app_id = models.CharField(max_length=50)
    downloaded_at = models.DateTimeField(null=True, blank=True)
    country = models.CharField(max_length=100, null=True, blank=True)

    def __unicode__(self):
        return self.app_id +" downloaded in " + str(self.longitude) + " - " + str(self.latitude)