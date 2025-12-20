from django.contrib import admin

from .models import Project, Service, Suggestion



@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "status", "beneficiaries", "location")
    list_filter = ("category", "status")
    search_fields = ("title", "location")


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ("title", "status", "created_at")
    list_filter = ("status",)
    search_fields = ("title",)


@admin.register(Suggestion)
class SuggestionAdmin(admin.ModelAdmin):
    list_display = ("title", "submitted_by", "created_at")
    search_fields = ("title", "submitted_by")
    ordering = ("-created_at",)
