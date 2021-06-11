from django.urls import path, include

from sleeptime import views

urlpatterns = [
    path('sleep-time-list/', views.SleepTimeList.as_view()),
    path('add-user/', views.AddNewUser.as_view()),
    path('add-sleep-data/', views.AddSleepData.as_view())
]