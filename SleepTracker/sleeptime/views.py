import json

from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.templatetags.rest_framework import items
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import SleepTime,User
from .serializers import SleepTimeSerializer,UserSerializer

class SleepTimeList(APIView):
    def get(self,request,format=None):
        SleepTimelist = SleepTime.objects.all()
        serializer = SleepTimeSerializer(SleepTimelist,many=True)
        return Response(serializer.data)
    def post(self,request):
        email = request.POST.get('username')
        SleepTimelist = SleepTime.objects.filter(name=User.objects.get(name=email))
        serializer = SleepTimeSerializer(SleepTimelist,many=True)
        print("type of response data",type(serializer.data))
        dictData = dict()
        dictData['sleepTimeList'] = serializer.data
        return Response(dictData)

class AddSleepData(APIView):
    def post(self,request):
        email      = request.POST.get('username')
        dictData = dict()
        dictData['name'] = User.objects.get(name=email)
        for k,v in request.POST.items():
            dictData[k] = v
        serializer = SleepTimeSerializer(data = dictData,read_only=False)
        if(serializer.is_valid()):
            print("its a valid data",serializer.validated_data)
            serializer.save()
            return Response("success",status=status.HTTP_200_OK)
        else:
            print("invalid data",serializer.errors)
            return Response("failure",status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class AddNewUser(APIView):
    def post(self,request):
        serializer = UserSerializer(data = request.POST)
        if(serializer.is_valid()):
            print("its a valid data",serializer.validated_data)
            serializer.save()
            return Response("success",status=status.HTTP_200_OK)
        else:
            print("invalid data",serializer.errors)
            return Response("failure",status=status.HTTP_401_UNAUTHORIZED)
