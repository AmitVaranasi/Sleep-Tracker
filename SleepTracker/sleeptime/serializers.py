from rest_framework import serializers

from .models import SleepTime,User

class SleepTimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = SleepTime
        fields = (
            "id",
            "name",
            "date",
            "sleepTime",
            "wakeupTime",
            "duration",
        )

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
