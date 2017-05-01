from django.contrib import admin

# Register your models here.
from .models import *

class DataAdmin(admin.ModelAdmin):
    exclude = ('country',)
admin.site.register(Data, DataAdmin)