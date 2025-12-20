from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from .models import Project, Service, Suggestion
from .serializers import (
    ProjectSerializer,
    ServiceSerializer,
    SuggestionSerializer,
)

# ================================
# ADMIN VIEWSETS
# ================================

class AdminProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all().order_by("-created_at")
    serializer_class = ProjectSerializer


class AdminServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all().order_by("-created_at")
    serializer_class = ServiceSerializer


class AdminSuggestionViewSet(viewsets.ModelViewSet):
    queryset = Suggestion.objects.all().order_by("-created_at")
    serializer_class = SuggestionSerializer


# ================================
# PUBLIC APIs (Frontend)
# ================================

class ProjectListAPIView(APIView):
    def get(self, request):
        serializer = ProjectSerializer(Project.objects.all(), many=True)
        return Response(serializer.data)


class ServiceListAPIView(APIView):
    def get(self, request):
        serializer = ServiceSerializer(Service.objects.all(), many=True)
        return Response(serializer.data)


class SuggestionCreateAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = SuggestionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Suggestion submitted successfully"},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
