from rest_framework import serializers
from .models import Project, Service, Suggestion


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = [
            "id",
            "title",
            "desc",
            "beneficiaries",
            "status",
            "location",
            "category",
        ]


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = [
            "id",
            "title",
            "desc",
            "status",
        ]


class SuggestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Suggestion
        fields = [
            "id",
            "title",
            "description",
            "submitted_by",
            "created_at",
        ]
        read_only_fields = ("id", "created_at")
