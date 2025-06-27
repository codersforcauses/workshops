---
title: Welcome to the Djangol!
ᴴₒᴴₒᴴₒ: true
---
# Introduction to Backend Development with Django
*Welcome to the Djangol*

Presented By:

- [Frinze Lapuz](https://www.linkedin.com/in/frinze-erin-lapuz/), Developer Experience Software Engineer at [Atlassian](https://www.atlassian.com/)

![Atlassian](./images/atlassian_logo.svg)



## Prerequisites to this Workshop

You need the following installed:

- Browser
- VsCode (You can choose other IDEs, but for the interest of time - get something with Devcontainers support)
- Docker

The starting repo for this workshop: [https://github.com/CodersforLearning/django-workshop](https://github.com/CodersforLearning/django-workshop)

## What you will be building as part of this workshop?
Imagine yourself building a project called "FeedForward" - it's a feedback management system.

A user works on a project. A user can give feedback to a project. Only the people in the project or author of the feedback can see it.

When a feedback is submitted
- it will send an email to the project members
- sentiment analysis will be performed on the feedback. where the value is between -1 and 1.

Below is the schematics

```mermaid
erDiagram
    user {
        uuid user_id PK
        string username
        string email
        string password
        datetime created_at
    }
    
    project {
        uuid project_id PK
        string name
        datetime created_at
        list(user) members FK
    }
    
    feedback {
        uuid feedback_id PK
        uuid project_id FK
        uuid user_id FK
        string content
        datetime created_at
        float(nullable) sentiment_score
    }

    user ||--o{ feedback : creates
    project ||--o{ feedback : has
    user |{--o{ project : works_on
```

## What are APIs and REST-APIs?
**Application Programming Interface**
???+ info "Analogy"
    Who interacts with the user interface? - the user
    Who interacts with the application programming interface ? - the application program (eg. the browser) 

**Representational State Transfer Application Programming Interface**

- backend architectural pattern that follows the GET/POST/PUT/PATCH/DELETE

- Can be represented in Swagger/ Open API specification

???+ info "Swagger/ Open API specification"
    ![Swagger/ Open API specification](./images/swagger.png)

In terms of using RESTful APIs, there are some naming and implementation conventions used to accurately label the endpoint with what it does.
???+ info "CRUD to HTTP Verb Matching for JSON standard communications with REST-APIs"
    CRUD stands for Create, Read, Update, and Delete. RESTful APIs use HTTP verbs to specify the CRUD operation an endpoint is performing.

    | HTTP Verb | CRUD Operation |    
    | --------- | -------------- |
    | POST | Create/Update |
    | GET | Read |
    | PUT | Update/Replace |
    | PATCH | Update/Modify |
    | DELETE | Delete |

    ![rest-verbs](./images/rest-verbs.jpg)

## What is Django?

![Django](./images/django-2.png)

**Django**

- Python web framework for creating server-side application

Follows MVC:

- Model - database
- View – Interface (API or User Interface)
- Controller – URLs + routes

See [Documentation](https://www.djangoproject.com/)

## What is Django REST Framework (DRF)?
- library for creating REST-API
- just makes it easier develop REST-API

In:

- Authentication + Permission
- Generic API Views
- Serialisers (payload validation and format)

See [Documentation](https://www.django-rest-framework.org/)

## Interactive Workshop Time!!!

Firstly, open your IDE (VSCode) and open the terminal.

1. Clone the repo: `git clone https://github.com/CodersforLearning/django-workshop-winter-2024.git`
2. Go to the directory: `cd django-workshop-winter-2024`
3. Open in dev container


??? info "What does the setup script do?"
    ```bash
    #!/bin/bash

    set -euxo pipefail

    # Install Python in the container
    pip install Django==5.0.6

    # Bootstraps the django codebase
    rm -rf feedforward || true # just in case it exist
    django-admin startproject feedforward

    # Libraries needed by DRF
    # As per https://www.django-rest-framework.org/#installation
    pip3 install djangorestframework==3.15.2
    pip3 install Markdown==3.6       # Markdown support for the browsable API.
    pip3 install django-filter==24.2  # Filtering support
    pip3 install pytz==2024.1           # Timezone support

    # Additional libraries
    # For Frontend JWT Authentication
    pip install djangorestframework-simplejwt==5.3.1

    pip freeze > feedforward/requirements.txt

    ... and some extras
    ```

### Initial files

- `manage.py` - the entrypoint of the Django application
- `feedforward` - the main Django application
- `feedforward/settings.py` - the configuration file of the Django application
- `feedforward/urls.py` - the URL routes of the Django application
- `feedforward/wsgi.py` and `feedforward/asgi.py` - used as the script to run production django application


### Let's start the Django application

1. Run `cd feedforward`
2. Perform the initial migration: `python manage.py migrate`. Notice that when you run this command, it will create a `db.sqlite3` file.
3. Let's take a look at this file - just click it in the file explorer.
4. Run the Django application: `python manage.py runserver`
5. Check out the Django application: [http://localhost:8000](http://localhost:8000)
6. Check out the Django admin: [http://localhost:8000/admin](http://localhost:8000/admin)
7. Create a superuser: `python manage.py createsuperuser`. Login and look around the Django admin.

???+ info "Additional info"
    Django ships default "django apps" defined `settings.py` file. You can see the list of apps in the `INSTALLED_APPS` variable.

    Django apps are plugins that can be used to extend the functionality of the Django application. It's the core method of developing with this backend framework.

    For the `db.sqlite3` file, it's the default database that Django uses. You can change this to other databases like MySQL, PostgreSQL, etc.


## Let's create our first Django App: Project

Run this command `python manage.py startapp project`.

### What did this command do?
Initial files that it created:

- `project/admin.py` - the admin interface
- `project/apps.py` - the configuration
- `project/models.py` - the database schema
- `project/tests.py` - the test cases
- `project/views.py` - the views

Some files you want to create later are:

- `project/serializers.py` - the serializers
- `project/urls.py` - the URL routes
- `project/permissions.py` - the permissions

## Installing the new "app" created

Go to `settings.py` and add the new app to the `INSTALLED_APPS` variable.

```diff
...
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
+   "project",
]
...
```

## Creation of a Model for Project

??? info "Quick Reference: ERD"
    ```mermaid
    erDiagram
        user {
            uuid user_id PK
            string username
            string email
            string password
            datetime created_at
        }
        
        project {
            uuid project_id PK
            string name
            datetime created_at
            list(user) members FK
        }
        
        feedback {
            uuid feedback_id PK
            uuid project_id FK
            uuid user_id FK
            string content
            datetime created_at
            float(nullable) sentiment_score
        }

        user ||--o{ feedback : creates
        project ||--o{ feedback : has
        user |{--o{ project : works_on
    ```

???+ example "Ready to Copy Paste"
    ```python
    from django.db import models
    from django.contrib.auth.models import User
    import uuid

    class Project(models.Model):
        id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
        name = models.CharField(max_length=255)
        created_at = models.DateTimeField(auto_now_add=True)
        members = models.ManyToManyField(User, related_name="projects")

        def __str__(self):
            return f"Project {self.name} ({self.id})"
    ```

After updating the model, run:

- `python manage.py makemigrations`
- `python manage.py migrate`

This will create a new migration file and apply the change to your database.

### Oops we forgot Content - Let's add that field

Suppose we want to add a description or content to our project. Just update the model like this:

```diff
class Project(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    content = models.TextField(blank=True)  # <-- New field!
    created_at = models.DateTimeField(auto_now_add=True)
    members = models.ManyToManyField(User, related_name="projects")

    def __str__(self):
        return f"Project {self.name} ({self.id})"
```

After updating the model, run:

- `python manage.py makemigrations`
- `python manage.py migrate`

This will create a new migration file and apply the change to your database.

### More Explanations about Migrations

Migrations are Django's way of propagating changes you make to your models (adding a field, deleting a model, etc.) into your database schema. Think of them as version control for your database structure.

**Step 1: Initial State (Just models.py, no migrations, no DB)**
```
DEV ENVIRONMENT                                      PRODUCTION ENVIRONMENT
+------------------------------------------------+   +------------------------------------------------+
| models.py                                      |   | (empty)                                        |
| Project: id, name, created_at                  |   |                                                |
| (no migrations/)                               |   | (no migrations/)                               |
+------------------------------------------------+   +------------------------------------------------+
| (no DB)                                        |   | (no DB)                                        |
+------------------------------------------------+   +------------------------------------------------+
```

**Step 2: Developer runs `python manage.py makemigrations`**
```
DEV ENVIRONMENT                                      PRODUCTION ENVIRONMENT
+------------------------------------------------+   +------------------------------------------------+
| models.py                                      |   | (empty)                                        |
| Project: id, name, created_at                  |   |                                                |
| migrations/                                    |   | (no migrations/)                               |
|   0001_initial.py <--- NEW!                    |   |                                                |
+------------------------------------------------+   +------------------------------------------------+
| (no DB)                                        |   | (no DB)                                        |
+------------------------------------------------+   +------------------------------------------------+
```

**Step 3: Developer runs `python manage.py migrate` (creates DB schema locally)**
```
DEV ENVIRONMENT                                      PRODUCTION ENVIRONMENT
+------------------------------------------------+   +------------------------------------------------+
| models.py                                      |   | (empty)                                        |
| Project: id, name, created_at                  |   |                                                |
| migrations/                                    |   | (no migrations/)                               |
|   0001_initial.py                              |   |                                                |
+------------------------------------------------+   +------------------------------------------------+
| DB: id, name, created_at <--- NEW!             |   | (no DB)                                        |
+------------------------------------------------+   +------------------------------------------------+
```

**Step 4: Developer deploys code and migrations to production**
```
DEV ENVIRONMENT                                      PRODUCTION ENVIRONMENT
+------------------------------------------------+   +------------------------------------------------+
| models.py                                      |   | models.py                            <--- NEW! |
| Project: id, name, created_at                  |   | Project: id, name, created_at        <--- NEW! |
| migrations/                                    |   | migrations/                                    |
|   0001_initial.py                              |   |   0001_initial.py <--- NEW!                    |
+------------------------------------------------+   +------------------------------------------------+
| DB: id, name, created_at                       |   | (no DB)                                        |
+------------------------------------------------+   +------------------------------------------------+
```

**Step 5: Migrator runs `python manage.py migrate` in production (creates DB schema in production)**
```
DEV ENVIRONMENT                                      PRODUCTION ENVIRONMENT
+------------------------------------------------+   +------------------------------------------------+
| models.py                                      |   | models.py                                      |
| Project: id, name, created_at                  |   | Project: id, name, created_at                  |
| migrations/                                    |   | migrations/                                    |
|   0001_initial.py                              |   |   0001_initial.py                              |
+------------------------------------------------+   +------------------------------------------------+
| DB: id, name, created_at                       |   | DB: id, name, created_at     <--- NEW!         |
+------------------------------------------------+   +------------------------------------------------+
```

**Step 6: Developer adds `content` to models.py**
```
DEV ENVIRONMENT                                      PRODUCTION ENVIRONMENT
+------------------------------------------------+   +------------------------------------------------+
| models.py (+content)                           |   | models.py                                      |
| Project: id, name, created_at, content         |   | Project: id, name, created_at                  |
| migrations/                                    |   | migrations/                                    |
|   0001_initial.py                              |   |   0001_initial.py                              |
|   0002_add_content.py                          |   |                                                |
+------------------------------------------------+   +------------------------------------------------+
| DB: id, name, created_at                       |   | DB: id, name, created_at                       |
+------------------------------------------------+   +------------------------------------------------+
```

**Step 7: Developer runs `python manage.py makemigrations` (creates new migration)**
```
DEV ENVIRONMENT                                      PRODUCTION ENVIRONMENT
+------------------------------------------------+   +------------------------------------------------+
| models.py (+content)                           |   | models.py                                      |
| Project: id, name, created_at, content         |   | Project: id, name, created_at                  |
| migrations/                                    |   | migrations/                                    |
|   0001_initial.py                              |   |   0001_initial.py                              |
|   0002_add_content.py   <--- NEW!              |   |                                                |
+------------------------------------------------+   +------------------------------------------------+
| DB: id, name, created_at                       |   | DB: id, name, created_at                       |
+------------------------------------------------+   +------------------------------------------------+
```

**Step 8: Developer runs `python manage.py migrate` (adds new field to local DB)**
```
DEV ENVIRONMENT                                      PRODUCTION ENVIRONMENT
+------------------------------------------------+   +------------------------------------------------+
| models.py (+content)                           |   | models.py                                      |
| Project: id, name, created_at, content         |   | Project: id, name, created_at                  |
| migrations/                                    |   | migrations/                                    |
|   0001_initial.py                              |   |   0001_initial.py                              |
|   0002_add_content.py                          |   |                                                |
+------------------------------------------------+   +------------------------------------------------+
| DB: id, name, created_at, content <--- NEW!    |   | DB: id, name, created_at                       |
+------------------------------------------------+   +------------------------------------------------+
```

**Step 9: Developer deploys code and migrations to production**
```
DEV ENVIRONMENT                                      PRODUCTION ENVIRONMENT
+------------------------------------------------+   +------------------------------------------------+
| models.py (+content)                           |   | models.py (+content)                  <--- NEW!|
| Project: id, name, created_at, content         |   | Project: id, name, created_at, content<--- NEW!|
| migrations/                                    |   | migrations/                                    |
|   0001_initial.py                              |   |   0001_initial.py                              |
|   0002_add_content.py                          |   |   0002_add_content.py <--- NEW!                |
+------------------------------------------------+   +------------------------------------------------+
| DB: id, name, created_at, content               |   | DB: id, name, created_at                       |
+------------------------------------------------+   +------------------------------------------------+
```

**Step 10: Migrator runs `python manage.py migrate` in production (adds new field to production DB)**
```
DEV ENVIRONMENT                                      PRODUCTION ENVIRONMENT
+------------------------------------------------+   +------------------------------------------------+
| models.py (+content)                           |   | models.py (+content)                           |
| Project: id, name, created_at, content         |   | Project: id, name, created_at, content         |
| migrations/                                    |   | migrations/                                    |
|   0001_initial.py                              |   |   0001_initial.py                              |
|   0002_add_content.py                          |   |   0002_add_content.py                          |
+------------------------------------------------+   +------------------------------------------------+
| DB: id, name, created_at, content              |   | DB: id, name, created_at, content <--- NEW!    |
+------------------------------------------------+   +------------------------------------------------+
```

**Legend:**

- Steps are shown left-to-right for DEV and PROD.
- The "migrator" in production can be a script, a CI/CD job, or a command run in a Docker container.

When you have created that, check out `db.sqlite3` and you'll see that there's a new table called `project_project`.

## Creation of the Admin Interface for Project

???+ example "Ready to Copy Paste - Basic Version"
    ```python
    from django.contrib import admin
    from .models import Project

    admin.site.register(Project)
    ```

??? example "Ready to Copy Paste - Cooler Version"
    ```python
    from django.contrib import admin
    from .models import Project

    @admin.register(Project)
    class ProjectAdmin(admin.ModelAdmin):
        list_display = ("id", "name", "created_at")
        list_filter = ("created_at",)
        search_fields = ("name",)
        filter_horizontal = ("members",)
        date_hierarchy = "created_at"
        ordering = ("-created_at",)
    ```

Now visit the [Admin page](http://localhost:8000/admin) and you'll see the Project model there.

## Creation of a Model for ProjectFeedback

??? info "Quick Reference: ERD"
    ```mermaid
    erDiagram
        user {
            uuid user_id PK
            string username
            string email
            string password
            datetime created_at
        }
        
        project {
            uuid project_id PK
            string name
            datetime created_at
            list(user) members FK
        }
        
        feedback {
            uuid feedback_id PK
            uuid project_id FK
            uuid user_id FK
            string content
            datetime created_at
            float(nullable) sentiment_score
        }

        user ||--o{ feedback : creates
        project ||--o{ feedback : has
        user |{--o{ project : works_on
    ```

??? example "Ready to Copy Paste - `project/models.py`"
    ```python
    from django.db import models
    from django.contrib.auth.models import User
    import uuid

    class Project(models.Model):
        id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
        name = models.CharField(max_length=255)
        content = models.TextField(blank=True)
        created_at = models.DateTimeField(auto_now_add=True)
        members = models.ManyToManyField(User, related_name="projects")

        def __str__(self):
            return f"Project {self.name} ({self.id})"

    class ProjectFeedback(models.Model):
        id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
        project = models.ForeignKey('Project', on_delete=models.CASCADE, related_name="feedbacks")
        user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="feedbacks")
        content = models.TextField()
        created_at = models.DateTimeField(auto_now_add=True)
        sentiment_score = models.FloatField(null=True, blank=True)

        def __str__(self):
            return f"Feedback {self.id} by {self.user} on {self.project}"
    ```

??? example "Diff View - Don't Copy. Copy the other one. This is only for explanation"
    ```diff
    @@ project/models.py @@
        from django.db import models
    from django.contrib.auth.models import User
    import uuid

    class Project(models.Model):
        id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
        name = models.CharField(max_length=255)
        content = models.TextField(blank=True)
        created_at = models.DateTimeField(auto_now_add=True)
        members = models.ManyToManyField(User, related_name="projects")

        def __str__(self):
            return f"Project {self.name} ({self.id})"

    + class ProjectFeedback(models.Model):
    +    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    +    project = models.ForeignKey('Project', on_delete=models.CASCADE, related_name="feedbacks")
    +    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="feedbacks")
    +    content = models.TextField()
    +    created_at = models.DateTimeField(auto_now_add=True)
    +    sentiment_score = models.FloatField(null=True, blank=True)

    +    def __str__(self):
    +        return f"Feedback {self.id} by {self.user} on {self.project}"
    
    ```

After creating this, run `python manage.py makemigrations` and `python manage.py migrate` again.

When you have created that, check out `db.sqlite3` and you'll see that there's a new table called `project_projectfeedback`.

## Creation of the Admin Interface for Project Feedback

??? example "Ready to Copy Paste - `project/admin.py`"
    ```python
    from django.contrib import admin
    from .models import ProjectFeedback

    @admin.register(ProjectFeedback)
    class ProjectFeedbackAdmin(admin.ModelAdmin):
        list_display = ("id", "project", "user", "created_at", "sentiment_score")
        search_fields = ("content", "user__username", "project__name")
        list_filter = ("project", "user", "created_at")
        ordering = ("-created_at",)
    ```

??? example "Diff View - Don't Copy. Copy the other one. This is only for explanation"
    ```diff
    @@ project/admin.py @@
    from django.contrib import admin
    +from .models import Project, ProjectFeedback
    -from .models import Project

    @admin.register(Project)
    class ProjectAdmin(admin.ModelAdmin):
        list_display = ("id", "name", "created_at")
        list_filter = ("created_at",)
        search_fields = ("name",)
        filter_horizontal = ("members",)
        date_hierarchy = "created_at"
        ordering = ("-created_at",)

    +@admin.register(ProjectFeedback)
    +class ProjectFeedbackAdmin(admin.ModelAdmin):
    +    list_display = ("id", "project", "user", "created_at", "sentiment_score")
    +    search_fields = ("content", "user__username", "project__name")
    +    list_filter = ("project", "user", "created_at")
    +    ordering = ("-created_at",)
    ```

Now visit the admin interface and you'll see the ProjectFeedback model there.

## Creation Views: the Interface in API

### Step 0: Initialise Rest Framework (This is done once for a django source code)

We've already installed rest_framework as part of the packages, but we need to initialise it.

???+ example "Putting Rest Framework in `settings.py`"
    ```python
    INSTALLED_APPS = [
        ...
        'rest_framework',
    ]
    ```

After you put that there, we need some initialisation of "HTML templates" for the "Browsable API".

??? example "Ready to Copy Paste (Copy-pastable): `urls.py`"
    ```python
    from django.contrib import admin
    from django.urls import path, include

    urlpatterns = [
        path('admin/', admin.site.urls),
        path('api-auth/', include('rest_framework.urls')),
    ]
    ```

??? example "Diff View - Don't Copy. Copy the other one. This is only for explanation"
    ```diff
    @@ urls.py @@
    from django.contrib import admin
    +from django.urls import path, include
    -from django.urls import path

    urlpatterns = [
        path('admin/', admin.site.urls),
    +   path('api-auth/', include('rest_framework.urls')),
    ]
    ```


### Step 1: Project API (Basic)

#### `project/serializers.py`
Serialisers are a way to convert Python models to JSON, XML or any other format you wish.

??? example "Ready to Copy Paste: Basic ProjectSerializer (`project/serializers.py`)"
    ```python
    from rest_framework import serializers
    from .models import Project

    class ProjectSerializer(serializers.ModelSerializer):
        class Meta:
            model = Project
            fields = "__all__"
            read_only_fields = ("id", "created_at")
    ```

#### `project/views.py`

Views are the logic that handles the requests and responses.

!!! warning "Do not proceed further until told!"
    Views have different ways to be created - each with their own pros and cons. Just look and try to understand the code for now or listen at the instructor, then wait for further instructions before moving on.

??? example "Functional View for Project (`project/views.py`)"
    ```python
    from rest_framework.decorators import api_view
    from rest_framework.response import Response
    from .models import Project
    from .serializers import ProjectSerializer
    from django.shortcuts import get_object_or_404

    @api_view(["GET", "POST"])
    def project_list(request):
        if request.method == "GET":
            projects = Project.objects.all()
            serializer = ProjectSerializer(projects, many=True)
            return Response(serializer.data)
        elif request.method == "POST":
            serializer = ProjectSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=201)
            return Response(serializer.errors, status=400)

    @api_view(["GET", "PUT", "DELETE"])
    def project_detail(request, pk):
        project = get_object_or_404(Project, pk=pk)
        if request.method == "GET":
            serializer = ProjectSerializer(project)
            return Response(serializer.data)
        elif request.method == "PUT":
            serializer = ProjectSerializer(project, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=400)
        elif request.method == "DELETE":
            project.delete()
            return Response(status=204)
    ```

??? example "Class-based View for Project (Recommended) (`project/views.py`)"
    ```python
    from rest_framework import viewsets, permissions
    from .models import Project
    from .serializers import ProjectSerializer

    class ProjectViewSet(viewsets.ModelViewSet):
        queryset = Project.objects.all()
        serializer_class = ProjectSerializer
        permission_classes = [permissions.IsAuthenticated]
    ```

We recommend using class-based views (ViewSet) for most use cases, as they are more concise and easier to extend if you are always using the same pattern of accessing the database. Function-based views are better if you need to do something more custom (except if you just want to extend the existing pattern).

#### `project/urls.py`

??? example "Ready to Copy Paste: `project/urls.py` for Project"
    ```python
    from django.urls import path, include
    from rest_framework.routers import DefaultRouter
    from .views import ProjectViewSet

    router = DefaultRouter()
    router.register(r'projects', ProjectViewSet, basename='project')

    urlpatterns = [
        path('', include(router.urls)),
    ]
    ```

#### `urls.py` (root url)

??? example "Ready to Copy Paste (Copy-pastable): `urls.py` for Project"
    ```python
    from django.contrib import admin
    from django.urls import path, include

    urlpatterns = [
        path('admin/', admin.site.urls),
        path('api-auth/', include('rest_framework.urls')),
        path('api/', include('project.urls')),
    ]
    ```

??? example "Diff View - Don't Copy. Copy the other one. This is only for explanation"
    ```diff
    @@ urls.py @@
    from django.contrib import admin
    from django.urls import path, include

    urlpatterns = [
        path('admin/', admin.site.urls),
    +   path('api/', include('project.urls')),
    ]
    ```

!!! note "Try it!"
    At this stage, you can use the [http://localhost:8000/api/projects/](http://localhost:8000/api/projects/) endpoint to list, create, retrieve, update, and delete projects.

    Take a moment to play around with the endpoints.

---

### Step 2: Enhance ProjectSerializer with UserSerializer

Now let's show project members as nested user objects. So we can express user information in the response.

#### `project/serializers.py` (with UserSerializer)

???+ example "Ready to Copy Paste: ProjectSerializer with UserSerializer (project/serializers.py)"
    ```python
    from rest_framework import serializers
    from django.contrib.auth.models import User
    from .models import Project

    class UserSerializer(serializers.ModelSerializer):
        class Meta:
            model = User
            fields = ("id", "username", "email")

    class ProjectSerializer(serializers.ModelSerializer):
        members = UserSerializer(many=True, read_only=True)

        class Meta:
            model = Project
            fields = "__all__"
            read_only_fields = ("id", "created_at")
    ```

Now, when you GET a project, the members field will show full user details instead of just IDs.

---

### Step 3: Add ProjectFeedback API

Let's add feedback functionality to projects.

Before creating the views for ProjectFeedback, you need to define a serializer for it, just like you did for Project.

#### `project/serializers.py` (ProjectFeedbackSerializer)

??? example "Ready to Copy Paste: ProjectFeedbackSerializer (project/serializers.py)"
    ```python
    from rest_framework import serializers
    from django.contrib.auth.models import User
    from .models import Project, ProjectFeedback

    class UserSerializer(serializers.ModelSerializer):
        class Meta:
            model = User
            fields = ("id", "username", "email")

    class ProjectSerializer(serializers.ModelSerializer):
        members = UserSerializer(many=True, read_only=True)

        class Meta:
            model = Project
            fields = "__all__"
            read_only_fields = ("id", "created_at")

    class ProjectFeedbackSerializer(serializers.ModelSerializer):
        class Meta:
            model = ProjectFeedback
            fields = "__all__"
            read_only_fields = ("id", "created_at", "user", "sentiment_score")
    ```

??? example "Diff View - Don't Copy. Copy the other one. This is only for explanation"
    ```diff
    @@ project/serializers.py @@
    from rest_framework import serializers
    from django.contrib.auth.models import User
    +from .models import Project, ProjectFeedback
    -from .models import Project

    class UserSerializer(serializers.ModelSerializer):
        class Meta:
            model = User
            fields = ("id", "username", "email")

    class ProjectSerializer(serializers.ModelSerializer):
        members = UserSerializer(many=True, read_only=True)

        class Meta:
            model = Project
            fields = "__all__"
            read_only_fields = ("id", "created_at")

    +class ProjectFeedbackSerializer(serializers.ModelSerializer):
    +    class Meta:
    +        model = ProjectFeedback
    +        fields = "__all__"
    +        read_only_fields = ("id", "created_at", "user", "sentiment_score")
    ```

Now you can use `ProjectFeedbackSerializer` in your views.

#### `project/views.py` (ProjectFeedbackViewSet: filter by project_id)

**Ready to Copy Paste:**

??? example "Ready to Copy Paste: ProjectFeedbackViewSet (project/views.py)"
    ```python
    from rest_framework import viewsets, permissions
    from .models import ProjectFeedback, Project
    from .serializers import ProjectFeedbackSerializer, ProjectSerializer

    class ProjectViewSet(viewsets.ModelViewSet):
        queryset = Project.objects.all()
        serializer_class = ProjectSerializer
        permission_classes = [permissions.IsAuthenticated]

    class ProjectFeedbackViewSet(viewsets.ModelViewSet):
        serializer_class = ProjectFeedbackSerializer
        permission_classes = [permissions.IsAuthenticated]

        def get_queryset(self):
            project_id = self.kwargs.get('project_id')
            if project_id:
                return ProjectFeedback.objects.filter(project_id=project_id)
            return ProjectFeedback.objects.all()

        def perform_create(self, serializer):
            project_id = self.kwargs.get('project_id')
            feedback = serializer.save(user=self.request.user, project_id=project_id)
    ```

??? example "Diff View: Don't Copy. Copy the other one. This is only for explanation"
    **Diff View:**
    ```diff
    from rest_framework import viewsets, permissions
    +from .models import Project, ProjectFeedback
    -from .models import Project
    +from .serializers import ProjectFeedbackSerializer, ProjectSerializer
    -from .serializers import ProjectSerializer


    class ProjectViewSet(viewsets.ModelViewSet):
        queryset = Project.objects.all()
        serializer_class = ProjectSerializer
        permission_classes = [permissions.IsAuthenticated]

    + class ProjectFeedbackViewSet(viewsets.ModelViewSet):
    +     serializer_class = ProjectFeedbackSerializer
    +     permission_classes = [permissions.IsAuthenticated]
    + 
    +     def get_queryset(self):
    +         project_id = self.kwargs.get('project_id')
    +         if project_id:
    +             return ProjectFeedback.objects.filter(project_id=project_id)
    +         return ProjectFeedback.objects.all()
    + 
    +     def perform_create(self, serializer):
    +         project_id = self.kwargs.get('project_id')
    +         feedback = serializer.save(user=self.request.user, project_id=project_id)
    ```


#### `project/urls.py` (add feedbacks endpoint, manual nested route)

???+ example "Ready to Copy Paste: `project/urls.py` (add feedbacks endpoint, manual nested route)"
    ```python
    from django.urls import path, include
    from rest_framework.routers import DefaultRouter
    from .views import ProjectViewSet, ProjectFeedbackViewSet

    router = DefaultRouter()
    router.register(r'projects', ProjectViewSet, basename='project')

    urlpatterns = [
        path('', include(router.urls)),
        # Manual nested feedback endpoints
        path('projects/<uuid:project_id>/feedback/', ProjectFeedbackViewSet.as_view({'get': 'list', 'post': 'create'}), name='project-feedback-list'),
        path('projects/<uuid:project_id>/feedback/<uuid:pk>/', ProjectFeedbackViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'}), name='project-feedback-detail'),
    ]
    ```

??? example "Diff View - Don't Copy. Copy the other one. This is only for explanation"
    ```diff
    @@ project/urls.py @@
    from django.urls import path, include
    from rest_framework.routers import DefaultRouter
    + from .views import ProjectViewSet, ProjectFeedbackViewSet
    - from .views import ProjectViewSet

    router = DefaultRouter()
    router.register(r'projects', ProjectViewSet, basename='project')
    
    urlpatterns = [
        path('', include(router.urls)),
        # Manual nested feedback endpoints
    +   path('projects/<uuid:project_id>/feedback/', ProjectFeedbackViewSet.as_view({'get': 'list', 'post': 'create'}), name='project-feedback-list'),
    +   path('projects/<uuid:project_id>/feedback/<uuid:pk>/', ProjectFeedbackViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'}), name='project-feedback-detail'),
    ]
    ```

**What changed?**

- Imported `ProjectFeedbackViewSet`.
- Added two new `path()` entries for feedback endpoints, nested under each project.

# Extra Exercises
The below is an extra exercise for you to try. It will really help you extend your knowledge further, and I can assure that **you will use these in your projects**.

This has just been left as extra exercise because otherwise this workshop will be too long, unless of course we have extra time.

## Filters and Search in Django REST Framework

Filtering and searching are essential features for any API, allowing clients to retrieve only the data they need. Django REST Framework (DRF) provides powerful tools for both filtering and searching your API endpoints.

See the [official DRF filtering documentation](https://www.django-rest-framework.org/api-guide/filtering/) for more details.

### 1. Enabling Filtering and Search

First, make sure you have `django-filter` installed (already included in the setup script for this workshop):

```bash
pip install django-filter
```

Add it to your `INSTALLED_APPS` in `settings.py`:

```python
INSTALLED_APPS = [
    ...
    'django_filters',
    ...
]
```

Then, set the default filter backend in your `settings.py`:

```python
REST_FRAMEWORK = {
    'DEFAULT_FILTER_BACKENDS': [
        'django_filters.rest_framework.DjangoFilterBackend',
        'rest_framework.filters.SearchFilter',
        'rest_framework.filters.OrderingFilter',
    ]
}
```

### 2. Filtering and Searching Projects

Suppose you want to allow users to filter projects by name or members, and search by project name or content.

In your `project/views.py`:

```python
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['name', 'members']  # Filter by project name or members
    search_fields = ['name', 'content', 'members__username']  # Search by name, content, or member username
    ordering_fields = ['created_at', 'name']  # Allow ordering by creation date or name
    ordering = ['-created_at']  # Default ordering
```

Now you can try queries like:

- `GET /api/projects/?name=FeedForward` (filter by name)
- `GET /api/projects/?members=1` (filter by member user ID)
- `GET /api/projects/?search=feedback` (search projects by name or content)
- `GET /api/projects/?ordering=name` (order by name)

### 3. Filtering and Searching Feedbacks

You can do the same for feedbacks. In your `ProjectFeedbackViewSet`:

```python
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters

class ProjectFeedbackViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectFeedbackSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['user', 'sentiment_score']  # Filter by user or sentiment
    search_fields = ['content', 'user__username']  # Search by feedback content or username
    ordering_fields = ['created_at', 'sentiment_score']
    ordering = ['-created_at']

    def get_queryset(self):
        project_id = self.kwargs.get('project_id')
        if project_id:
            return ProjectFeedback.objects.filter(project_id=project_id)
        return ProjectFeedback.objects.all()
```

Now you can try queries like:

- `GET /api/projects/<project_id>/feedback/?user=2` (filter feedbacks by user ID)
- `GET /api/projects/<project_id>/feedback/?search=great` (search feedbacks by content)
- `GET /api/projects/<project_id>/feedback/?ordering=sentiment_score` (order feedbacks by sentiment)

### 4. Try It Out!

- Try filtering projects by name or members.
- Try searching for projects or feedbacks using keywords.
- Try ordering results by different fields.

**Challenge:**
- Add more filter fields (e.g., filter feedbacks by sentiment score range).
- Add search on related fields (e.g., search feedbacks by project name).

For more advanced filtering, you can create custom filter classes using `django-filter`. See the [DRF filtering docs](https://www.django-rest-framework.org/api-guide/filtering/) for inspiration!

## Automated Testing

Automated testing is a key part of building robust Django APIs. Django REST Framework provides tools to help you write tests for your endpoints.

Below is a simple example using `APITestCase` to test the Project API. This test will:
- Create a user and log in
- Create a project via the API
- Assert that the project appears in the GET endpoint

Create a new file called `project/tests.py` (or add to it if it already exists):

```python
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from django.urls import reverse
from .models import Project

class ProjectAPITest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="testpass")
        self.client.force_authenticate(user=self.user)

    def test_create_and_get_project(self):
        # Create a project
        data = {"name": "My Project"}
        url = reverse("project-list")  # This is the default name for the ViewSet router
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Project.objects.count(), 1)
        self.assertEqual(Project.objects.get().name, "My Project")

        # Get the list of projects
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["name"], "My Project")
```

To run the test, use:

```bash
python manage.py test
```

You should see output indicating that your test ran and passed.

---

### Testing with Multiple Users

Now, let's add a second test to see what happens when another user tries to access the projects. This is useful for testing permissions or visibility.

```python
    def test_project_access_by_another_user(self):
        # Create a project as the first user
        project = Project.objects.create(name="Secret Project")
        project.members.add(self.user)

        # Create a second user
        other_user = User.objects.create_user(username="otheruser", password="otherpass")
        self.client.force_authenticate(user=other_user)

        url = reverse("project-list")
        response = self.client.get(url)
        # By default, all projects are visible. If you implement permissions, you can assert accordingly.
        self.assertEqual(response.status_code, 200)
        # Example: If only members can see, you might expect 0 projects
        # self.assertEqual(len(response.data), 0)
```

You can now run the tests again:

```bash
python manage.py test
```

Feel free to extend these tests to cover more scenarios, such as updating or deleting projects, or enforcing permissions so only project members can view certain projects.

## JWT Authentication - Integration to Modern Frontend Frameworks
[Summary of Django Simple JWT](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/getting_started.html#installation)

The only key bit to know is

install `pip install djangorestframework-simplejwt`

in `settings.py`
```python
REST_FRAMEWORK = {
    ...
    'DEFAULT_AUTHENTICATION_CLASSES': (
        ...
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    )
    ...
}
```

in `urls.py`
```python
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    ...
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'), # Login
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), # Refresh tokens
    ...
]
```

If you login via `/api/token` , you will send something like this 

```json
{
    "username":"test_user",
    "password":"test_password"
}
```

you're going to get something like this back

```json
{
  "access":"eyJh...",
  "refresh":"eyJhb..."
}
```

Now once your frontend has received this token, you'll need to store it there. There's multiple ways to store it:
- Local Storage (for long-term use)
- Cookies (for cross-domain usage)
- Session Storage (for one-session use case)

Now if your endpoint requires authentication, you need to add the `Authorization` header with the token.

For example `curl -X GET http://localhost:8000/api/projects/ -H "Authorization: Bearer eyJhbEXAMPLEOFJWTOKEN..."`


## Permissions

See [docs](https://www.django-rest-framework.org/api-guide/permissions/)

By default, if you set `permission_classes = [permissions.IsAuthenticated]`, any authenticated user can edit any project. But what if you want only project members to be able to edit (update/delete) a project, while all authenticated users can still view (GET) projects?

This is where **object-level permissions** come in. You can create a custom permission class that checks if the user is a member of the project for unsafe methods (PUT, PATCH, DELETE), but allows all authenticated users to read (GET).

#### Step 1: Create a Custom Permission Class

Create a new file `project/permissions.py`:

```python
from rest_framework import permissions

class IsProjectMemberOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow project members to edit a project.
    Assumes the Project model has a 'members' ManyToMany field.
    """
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any authenticated user
        if request.method in permissions.SAFE_METHODS:
            return True
        # Write permissions are only allowed to project members
        return request.user in obj.members.all()
```

#### Step 2: Use the Permission in Your ViewSet

In `project/views.py`, import and use your new permission class:

```python
from .permissions import IsProjectMemberOrReadOnly

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated, IsProjectMemberOrReadOnly]
```

#### Step 3: How It Works
- Any authenticated user can view (GET) any project.
- Only members of a project can update or delete it.
- If a non-member tries to edit, they get a 403 Forbidden error.

**Note:** DRF automatically checks object-level permissions for detail views (like retrieve, update, destroy). For list views, you may want to filter the queryset so users only see projects they are allowed to see.

For more details, see the [DRF permissions documentation](https://www.django-rest-framework.org/api-guide/permissions/#object-level-permissions).

## Sending Emails

Run `docker-compose up` to start the mail server.

Your mail server will have this UI at [http://localhost:8025/](http://localhost:8025/).
It communicates via SMTP on port 1025.

Add these in your `settings.py`
```python
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'host.docker.internal'
EMAIL_PORT = 1025
EMAIL_HOST_USER = ''
EMAIL_HOST_PASSWORD = ''
EMAIL_USE_TLS = False

EMAIL_ADDRESS_FROM = 'email-tester@test.com'
```

??? info "Where are these values coming from?"
    If you check the `docker-compose.yml`, you will understand that we are just configuring the values to send via SMTP to the mail server.

    In actual production services, you will change this to your actual SMTP server like AWS SES, Sendgrid, Mailgun, etc.

### `project/utils.py`: Send email to all project members

??? example "Ready to Copy Paste: project/utils.py"
    ```python
    from django.core.mail import send_mail
    from django.conf import settings

    def send_email_to_project_members(project, subject, message):
        recipient_list = [user.email for user in project.members.all() if user.email]
        if recipient_list:
            send_mail(
                subject=subject,
                message=message,
                from_email=settings.EMAIL_ADDRESS_FROM,
                recipient_list=recipient_list,
                fail_silently=False,
            )
    ```

### `project/views.py`: Email project members when feedback is created

??? example "Ready to Copy Paste: Email on feedback creation (project/views.py)"
    ```python
    from rest_framework import viewsets, permissions
    from .models import ProjectFeedback
    from .serializers import ProjectFeedbackSerializer
    from .utils import send_email_to_project_members

    class ProjectFeedbackViewSet(viewsets.ModelViewSet):
        serializer_class = ProjectFeedbackSerializer
        permission_classes = [permissions.IsAuthenticated]

        def get_queryset(self):
            project_id = self.kwargs.get('project_id')
            if project_id:
                return ProjectFeedback.objects.filter(project_id=project_id)
            return ProjectFeedback.objects.all()

        def perform_create(self, serializer):
            project_id = self.kwargs.get('project_id')
            feedback = serializer.save(user=self.request.user, project_id=project_id)
            project = feedback.project
            subject = f"New Feedback on Project: {project.name}"
            message = f"A new feedback was submitted by {self.request.user.username}:\n\n{feedback.content}"
            send_email_to_project_members(project, subject, message)
    ```

Now, whenever feedback is submitted for a project, all project members will receive an email notification. You can check the mail server UI at [http://localhost:8025/](http://localhost:8025/) to see the sent emails.

## Sentiment Analysis (Natural Language Processing / Machine Learning)

Sentiment analysis is the process of determining the sentiment or opinion expressed in a piece of text. It's a common task in natural language processing (NLP) and can be useful for understanding customer feedback, social media sentiment, and more.

For example:

- "I love this project" -> Positive
- "I hate this project" -> Negative
- "This project is ok" -> Neutral

Not really too related with Django, but this is where other fields such as AI connect with.

In this section, we just use a pre-trained model in `transformers` library.

```bash
pip install transformers
```

### Step 1: Create a Sentiment Analysis Utility

Create a new file called `project/sentiment.py`:

```python
# project/sentiment.py
from transformers import pipeline

# Load the sentiment analysis pipeline once (it will download the model the first time)
sentiment_pipeline = pipeline("sentiment-analysis")

def get_sentiment_score(text):
    result = sentiment_pipeline(text)[0]
    label = result["label"]
    score = result["score"]
    # Map to a float between -1 (negative) and 1 (positive)
    if label == "POSITIVE":
        return score  # e.g. 0.98
    elif label == "NEGATIVE":
        return -score  # e.g. -0.95
    else:
        return 0.0
```

### Step 2: Update Feedback Creation to Use Sentiment Analysis

In your `project/views.py`, update the `perform_create` method of `ProjectFeedbackViewSet` to calculate and save the sentiment score:

```python
from .sentiment import get_sentiment_score

class ProjectFeedbackViewSet(viewsets.ModelViewSet):
    # ... existing code ...

    def perform_create(self, serializer):
        project_id = self.kwargs.get('project_id')
        feedback = serializer.save(user=self.request.user, project_id=project_id)
        # Sentiment analysis
        feedback.sentiment_score = get_sentiment_score(feedback.content)
        feedback.save()
        # Send email as before
        project = feedback.project
        subject = f"New Feedback on Project: {project.name}"
        message = f"A new feedback was submitted by {self.request.user.username}:\n\n{feedback.content}"
        send_email_to_project_members(project, subject, message)
```

### Step 3: Try It Out

Now, whenever a new feedback is created, the sentiment score will be automatically calculated and saved in the database. You can see the score in the admin interface or via the API.

---

**Tip:** The first time you run this, the model will be downloaded, so it may take a minute. After that, it will be cached.

**Tip:** If you want to avoid the initial delay (cold start) in production, you can use Django management commands to pre-download the model or run initialization code ahead of time. For example, you can run `python manage.py shell` and execute the following to trigger the download:

```python
from project.sentiment import get_sentiment_score
get_sentiment_score("Test download")
```

You can also automate this as part of your deployment scripts to ensure the model is ready before your app starts serving requests.








