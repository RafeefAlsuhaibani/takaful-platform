from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator

class Project(models.Model):
    PROJECT_TYPE_CHOICES = [
        ("أساسي", "أساسي"),
        ("مجتمعي", "مجتمعي"),
        ("مؤسسي", "مؤسسي"),
    ]

    projectName = models.CharField(max_length=255)
    projectType = models.CharField(max_length=20, choices=PROJECT_TYPE_CHOICES)
    projectDescription = models.TextField()
    targetAudience = models.CharField(max_length=255)
    beneficiaries = models.PositiveIntegerField()
    executionLocation = models.CharField(max_length=255)
    donationAmount = models.DecimalField(max_digits=12, decimal_places=2)
    startDate = models.DateField()
    endDate = models.DateField()
    implementationRequirements = models.TextField()
    projectGoals = models.TextField()
    projectDocument = models.FileField(upload_to='project_documents/', null=True, blank=True)
    createdBy = models.ForeignKey(User, on_delete=models.CASCADE)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.projectName
    
class Volunteer(models.Model):
    STATUS_CHOICES = [
        ('نشط', 'نشط'),
        ('مشغول', 'مشغول'),
        ('غير نشط', 'غير نشط'),
    ]

    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    location = models.CharField(max_length=255)
    join_date = models.DateField(auto_now_add=True)
    rating = models.FloatField(default=0.0, validators=[MinValueValidator(0), MaxValueValidator(5)])
    skills = models.JSONField(default=list)  # Stores skills as a list
    volunteer_hours = models.IntegerField(default=0)

    def __str__(self):
        return self.name

class Task(models.Model):
    PRIORITY_CHOICES = [
        ('منخفضة', 'منخفضة'),
        ('متوسطة', 'متوسطة'),
        ('عالية', 'عالية'),
    ]
    STATUS_CHOICES = [
        ('في الانتظار', 'في الانتظار'),
        ('قيد التنفيذ', 'قيد التنفيذ'),
        ('مكتملة', 'مكتملة'),
        ('معلقة', 'معلقة'),
    ]

    title = models.CharField(max_length=255)
    project_name = models.CharField(max_length=255)
    volunteer = models.ForeignKey(Volunteer, on_delete=models.SET_NULL, null=True, related_name='tasks')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    priority = models.CharField(max_length=20, choices=PRIORITY_CHOICES, default='medium')
    due_date = models.DateField()
    hours = models.IntegerField(default=0)
    progress = models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(100)])
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.title

class Subtask(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name='subtasks')
    title = models.CharField(max_length=255)
    completed = models.BooleanField(default=False)









class Service(models.Model):
    STATUS_CHOICES = [
        ("متاحة", "متاحة"),
        ("قادمة", "قادمة"),
        ("مكتملة", "مكتملة"),
    ]

    title = models.CharField(max_length=200)              # matches Service.title in FE
    desc = models.TextField(blank=True)                   # matches Service.desc
    status = models.CharField(                            # matches Service.status
        max_length=20, choices=STATUS_CHOICES, default="متاحة"
    )
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.title


class ServiceRequest(models.Model):
    STATUS_CHOICES = [
        ("PENDING", "Pending"),
        ("APPROVED", "Approved"),
        ("REJECTED", "Rejected"),
        ("DONE", "Done"),
    ]

    service = models.ForeignKey(
        Service, on_delete=models.CASCADE, related_name="requests"
    )
    beneficiary_name = models.CharField(max_length=200)  # mosque name
    beneficiary_contact = models.CharField(max_length=200, blank=True)
    details = models.TextField(blank=True)
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default="PENDING"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"{self.service.name} for {self.beneficiary_name}"


class Volunteer(models.Model):
    full_name = models.CharField(max_length=200)
    phone = models.CharField(max_length=50, blank=True)
    email = models.EmailField(blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.full_name


class Suggestion(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    submitted_by = models.CharField(max_length=150, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_reviewed = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.title
