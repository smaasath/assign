from rest_framework import serializers
from AssessmentApp.models import School
from AssessmentApp.models import Class
from AssessmentApp.models import Assessment_Areas
from AssessmentApp.models import Student
from AssessmentApp.models import Answer
from AssessmentApp.models import Award
from AssessmentApp.models import Subject

class SchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = '__all__'
        
class ClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class
        fields = '__all__'

class Assessment_AreasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assessment_Areas
        fields = '__all__'

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = '__all__'

class AwardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Award
        fields = '__all__'

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = '__all__'