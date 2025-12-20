from django.db import models


class Project(models.Model):
    CATEGORY_CHOICES = [
        ("أساسي", "أساسي"),
        ("مجتمعي", "مجتمعي"),
        ("مؤسسي", "مؤسسي"),
    ]

    STATUS_CHOICES = [
        ("قيد التنفيذ", "قيد التنفيذ"),
        ("مكتمل", "مكتمل"),
        ("متوقف", "متوقف"),
    ]

    title = models.CharField(max_length=255)
    desc = models.TextField()
    beneficiaries = models.PositiveIntegerField()
    status = models.CharField(max_length=50, choices=STATUS_CHOICES)
    location = models.CharField(max_length=255)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Service(models.Model):
    STATUS_CHOICES = [
        ("متاحة", "متاحة"),
        ("قادمة", "قادمة"),
        ("مكتملة", "مكتملة"),
    ]

    title = models.CharField(max_length=255)
    desc = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Suggestion(models.Model):
    title = models.CharField(max_length=80)
    description = models.TextField()
    submitted_by = models.EmailField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
