from django.db import models

# Create your models here.
class School(models.Model):
    schoolName = models.CharField(max_length = 255)
   

class Class(models.Model):
    className = models.CharField(max_length = 255)
   
class Assessment_Areas(models.Model):
    assessmentName = models.CharField(max_length = 255)

class Student(models.Model):
    fullname = models.CharField(max_length = 255)
   

class Answer(models.Model):
    anawers = models.CharField(max_length = 255)
   

class Award(models.Model):
    name = models.CharField(max_length = 255)
   

class Subject(models.Model):
    subject = models.CharField(max_length = 255)
    subject_Score= models.CharField(max_length = 255)
   