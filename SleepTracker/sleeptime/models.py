from django.db import models

# Create your models here.
class User(models.Model):
    name = models.CharField(max_length=225,default='maheshwarvaranasi@gmail.com',primary_key=True)

    class Meta():
        ordering = ('name',)

    def __str__(self):
        return self.name

class SleepTime(models.Model):
    name       = models.ForeignKey(User, on_delete=models.CASCADE)
    date       = models.TextField()
    sleepTime  = models.TextField()
    wakeupTime = models.TextField()
    duration   = models.TextField()


    class Meta():
        ordering = ('date',)


    def __str__(self):
        return self.date
