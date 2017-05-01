#VIEWS: define the behavior of any page. In particular define the http actions allowed for each page

import json
from django.http import HttpResponse
from .models import Data
from django.shortcuts import get_object_or_404
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.template import loader

# Create your views here.
def index(request):
    template = loader.get_template('index.html')
    return HttpResponse(template.render(request))

class DataList(APIView):
    def get(self, request):
        datalist = Data.objects.all()
        dataSerializers = DataSerializers(datalist, many=True, context={'request': request})
        return Response(dataSerializers.data)

# Single data details
class DataDetail(APIView):
    def get_object(self, pk):
        try:
            return Data.objects.get(pk=pk)
        except Data.DoesNotExist:
            return 0
            
    def put(self, request, pk):
        data = self.get_object(pk)
        dataSerializers = DataSerializers(data, data=request.data, partial=True)
        print dataSerializers
        if dataSerializers.is_valid():
            dataSerializers.save()
            return Response(dataSerializers.data)
        return Response(dataSerializers.errors, status=status.HTTP_400_BAD_REQUEST)
