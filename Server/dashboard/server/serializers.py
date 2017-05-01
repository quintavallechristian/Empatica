#SERIALIZER used to correctly dispaly rest compliant APIs

from rest_framework import serializers
from .models import *

# Json representation of the dictionary
class DataSerializers(serializers.ModelSerializer):
    class Meta:
        model = Data
        fields = ('pk', 'app_id', 'longitude', 'latitude', 'downloaded_at', 'country')