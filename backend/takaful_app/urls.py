from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    AdminProjectViewSet,
    AdminServiceViewSet,
    AdminSuggestionViewSet,
    ProjectListAPIView,
    ServiceListAPIView,
    SuggestionCreateAPIView,
)

router = DefaultRouter()
router.register(r"admin/projects", AdminProjectViewSet)
router.register(r"admin/services", AdminServiceViewSet)
router.register(r"admin/suggestions", AdminSuggestionViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("projects/", ProjectListAPIView.as_view()),
    path("services/", ServiceListAPIView.as_view()),
    path("admin/suggestions/", SuggestionCreateAPIView.as_view()),
]
