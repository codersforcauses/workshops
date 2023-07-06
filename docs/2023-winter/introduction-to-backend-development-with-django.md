---
title: Welcome to the Djangol!
ᴴₒᴴₒᴴₒ: true
---

Welcome to the (Django)l !: Introduction to Backend Programming with Django 

## Prerequisites to this Workshop

You need the following installed:

- Python3
- Docker
- Git

The starting repo for this workshop: [https://github.com/CodersforLearning/django-csf](https://github.com/CodersforLearning/django-csf)

## What you will be building as part of this workshop?
You will be building a backend for an event management system. Below is the schematics

![ERD](./images/django-csf-workshop-erd.png)

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

1. Clone the repo: `git clone https://github.com/CodersforLearning/django-csf.git`
2. Go to the directory: `cd django-csf`
3. Run the setup script: `./setup.sh`

??? info "What does the setup script do?"
    ```bash
    #!/bin/bash

    # Create a Python virtual environment
    python3 -m venv venv

    # Activate Python environment
    source venv/bin/activate

    # Install Django
    pip3 install Django

    # Bootstraps the django codebase
    django-admin startproject csfevents

    # As per https://www.django-rest-framework.org/#installation
    pip3 install djangorestframework
    pip3 install markdown       # Markdown support for the browsable API.
    pip3 install django-filter  # Filtering support
    pip3 install pytz           # Timezone support

    # Freeze the requirements
    cd csfevents
    pip3 freeze > requirements.txt
    ```

### Initial files

- `manage.py` - the entrypoint of the Django application
- `csfevents` - the main Django application
- `csfevents/settings.py` - the configuration file of the Django application
- `csfevents/urls.py` - the URL routes of the Django application
- `csfevents/wsgi.py` and `csfevents/asgi.py` - used as the script to run production django application


### Let's start the Django application

1. Perform the initial migration: `python3 manage.py migrate`. Notice that when you run this command, it will create a `db.sqlite3` file.
2. Run the Django application: `python3 manage.py runserver`
3. Check out the Django application: [http://localhost:8000](http://localhost:8000)
4. Check out the Django admin: [http://localhost:8000/admin](http://localhost:8000/admin)
5. Create a superuser: `python3 manage.py createsuperuser`. Login and look around the Django admin.

???+ info "Additional info"
    Django ships default "django apps" defined `settings.py` file. You can see the list of apps in the `INSTALLED_APPS` variable.

    Django apps are plugins that can be used to extend the functionality of the Django application. It's the core method of developing with this backend framework.

    For the `db.sqlite3` file, it's the default database that Django uses. You can change this to other databases like MySQL, PostgreSQL, etc.


## Let's create our first Django app: event

Run this command `python3 manage.py startapp event`.

### What did this command do?
Initial files that it created:

- `event/admin.py` - the admin interface
- `event/apps.py` - the configuration
- `event/models.py` - the database schema
- `event/tests.py` - the test cases
- `event/views.py` - the views

Some files you want to create later are:

- `event/serializers.py` - the serializers
- `event/urls.py` - the URL routes
- `event/permissions.py` - the permissions

## Creation of the database schema

??? info "Quick Reference: ERD"
    ![ERD](./images/django-csf-workshop-erd.png)

???+ example "WIP Answer"
    ```python
    class Event(models.Model):
        # UUID id
        id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
        name = models.CharField(max_length=100)
        date = models.DateField()

        organizer = models.ForeignKey(
            User, on_delete=models.SET_NULL, null=True, blank=True
        )

        def __str__(self):
            return self.name
    ```

After creating this, you'll need to add it in the `INSTALLED_APPS` variable in the `settings.py` file.

Then run `python3 manage.py makemigrations` and `python3 manage.py migrate`.

???+ info "What did these commands do?"
    `makemigrations` - creates the migration files
    These are scripts that defines how the database schema changed.

    `migrate` - applies the migration files to the database
    Similar to how we performed our initial migration

When you have created that, check out `db.sqlite3` and you'll see that there's a new table called `event_event`.

## Creation of the admin interface

???+ example "WIP Answer"
    ```python
    from django.contrib import admin
    from .models import Event

    admin.site.register(Event)
    ```

Now visit the admin interface and you'll see the Event model there.

??? example "A cooler example"
    ```python
    @admin.register(Event)
    class EventAdmin(admin.ModelAdmin):
        list_display = ("name", "date", "organizer")
        list_filter = ("organizer",)
        search_fields = ("name",)
        ordering = ("date",)
        date_hierarchy = "date"
    ```

### Do the same thing again for Attendance

???+ info "Quick Reference: ERD"
    ![ERD](./images/django-csf-workshop-erd.png)

???+ example "WIP Answer"
    ```python
    # models.py
    class Attendance(models.Model):
        user = models.ForeignKey(User, on_delete=models.CASCADE)
        event = models.ForeignKey(
            Event, on_delete=models.CASCADE, related_name="attendances"
        )
        # String field with only the valid choices "going", "maybe", "not_going"
        status = models.CharField(
            max_length=10,
            choices=[("Going", "going"), ("Maybe", "maybe"), ("Not Going", "not_going")],
        )

        def __str__(self):
            return f"Event '{self.event.name}' - Attendance '{self.user.username}'"

    # admin.py
    @admin.register(Attendance)
    class AttendanceAdmin(admin.ModelAdmin):
        list_display = ("user", "event", "status")
        list_filter = ("user", "event", "status")
        search_fields = ("user", "event", "status")
        ordering = ("user", "event", "status")
        date_hierarchy = "event__date"
    ```

## Creation Views: the Interface in API


### `serializers.py`
Serialisers are a way to convert Python models to JSON, XML or any other format you wish.

???+ example "WIP Answer"
    ```
    # serializers.py
    class EventSerializer(serializers.ModelSerializer):
        class Meta:
            model = Event
            fields = ("id", "name", "date", "organizer")
    ```

### `views.py` and `urls.py`

![rest-http-verbs](./images/rest-http-verbs.jpg)

Here's our goal:
```
// Class based - programming
GET events in the system - /events
POST create events - /events
PUT/PATCH update events - /events/<id>
DELETE delete events - /events/<id>

Special actions
POST Change attendee status to an event - /events/<id>/change_attendee_status
```

Firstly, we need to set the `urls.py` to import the views from `event/views.py`.

```python
# urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/events/", include("event.urls")) # --HERE--
]
```

There's 2 main ways to create views

- Functional
- Class-based

??? example "Class-based Views"
    This is the easiest way - full of magic. If you need flexibility, you can override the methods.

    ```python
    # event/views.py
    class EventViewSet(viewsets.ModelViewSet):
        queryset = Event.objects.all()
        serializer_class = EventSerializer

        def perform_create(self, serializer):
            # Set whoever is creating the event as the organizer:
            serializer.save(organizer=self.request.user)

        # Note: This is a way to override the default methods
        def destroy(self, request, *args, **kwargs):
            return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

    # event/urls.py
    router = DefaultRouter()
    router.register(r"", EventViewSet, basename="events")

    urlpatterns = [
        path("", include(router.urls)),
    ]
    ```

    Important to note that the `basename` is used to generate the URL name. In this case, it will be `events-list` and `events-detail`. (you will need this automated testing)

??? example "Functional Views"
    This is the more flexible way. This is currently the way CSF does it.
    [Example](https://github.com/codersforcauses/csf/blob/c10c89542d8dfe64d761ec952d1aa02d9e7a71fc/server/api/event/views.py)

    ```python
    # event/views.py
    @api_view(["GET"])
    def event_list(request):
        events = Event.objects.all()
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data)

    @api_view(["GET"])
    def event_detail(request, pk):
        event = get_object_or_404(Event, pk=pk)
        serializer = EventSerializer(event)
        return Response(serializer.data)

    @api_view(["POST"])
    def event_create(request):
        # Set whoever is creating the event as the organizer:
        serializer = EventSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(organizer=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @api_view(["PUT"])
    def event_update(request, pk):
        event = get_object_or_404(Event, pk=pk)
        serializer = EventSerializer(event, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @api_view(["DELETE"])
    def event_delete(request, pk):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

    # urls.py
    urlpatterns = [
        path("", views.event_list),
        path("<int:pk>/", views.event_detail),
        path("create/", views.event_create),
        path("<int:pk>/update/", views.event_update),
        path("<int:pk>/delete/", views.event_delete),
    ]
    ```

??? example "Reuse Same Path with different HTTP Methods"
    ```python
    @api_view(["GET", "POST"])
    def event_list(request):
        if request.method == "GET":
            queryset = Event.objects.all()
            serializer = EventSerializer(queryset, many=True)
            return Response(serializer.data)
        elif request.method == "POST":
            serializer = EventSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=201)
            return Response(serializer.errors, status=400)

    @api_view(["GET", "PUT", "PATCH", "DELETE"])
    def event_detail(request, pk):
        try:
            event = Event.objects.get(pk=pk)
        except Event.DoesNotExist:
            return Response(status=404)

        if request.method == "GET":
            serializer = EventSerializer(event)
            return Response(serializer.data)
        elif request.method in ["PUT", "PATCH"]:
            serializer = EventSerializer(event, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=400)
        elif request.method == "DELETE":
            event.delete()
            return Response(status=204)
        ```

??? example "Another Example Class-based Views"
    This is the easiest way - full of magic. If you need flexibility, you can override the methods.
    ```python
    # views.py
    class EventViewSet(viewsets.ModelViewSet):
        queryset = Event.objects.all()
        serializer_class = EventSerializer

        def perform_destroy(self, instance):
            if not instance.is_public:  # Assuming `is_public` is a boolean field in the `Event` model
                raise serializers.ValidationError("Cannot delete a non-public event.")
            super().perform_destroy(instance)
    ```

After that long discussion, let's create the views and play around.

### Going back to Serializer for Organizer
```diff
+ class UserSerializer(serializers.ModelSerializer):
+     # read only serializer
+     class Meta:
+         model = User
+         fields = ("id", "username", "email")


class EventSerializer(serializers.ModelSerializer):
+    organizer = UserSerializer(read_only=True)

    class Meta:
        model = Event
        fields = ("id", "name", "date", "organizer")
```

What about if we also want to include attendees?

```diff
+ class AttendanceSerializer(serializers.ModelSerializer):
+     user = UserSerializer(read_only=True)
+ 
+     class Meta:
+         model = Attendance
+         fields = ("user", "status")


class EventSerializerWithAttendees(serializers.ModelSerializer):
    organizer = UserSerializer(read_only=True)
+    attendances = AttendanceSerializer(many=True, read_only=True)

    class Meta:
        model = Event
-       fields = ("id", "name", "date", "organizer")
+       fields = ("id", "name", "date", "organizer", "attendances")
```

### Bonus: Filters and Search (Will not be covered in this workshop)
[https://www.django-rest-framework.org/api-guide/filtering/](https://www.django-rest-framework.org/api-guide/filtering/)

### `/events/<id>/change_attendee_status/`

Docs:
- [Viewset Actions](https://www.django-rest-framework.org/api-guide/viewsets/#viewset-actions)

eg. `/events/1/change_attendee_status/`
Payload body looks like
```json
{
    "status": "Going"
}
```

```python
# serializers.py
class AttendanceChangeStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = ("status")

# views.py
class EventViewSet(viewsets.ModelViewSet):
    ...
    # Attendance
    @action(detail=True, methods=["post"])
    def change_attendee_status(self, request, pk=None):
        event = self.get_object()
        serializer = AttendanceChangeStatusSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = request.user
        status = serializer.validated_data["status"]
        Attendance.objects.update_or_create(
            user=user, event=event, defaults={"status": status}
        )
        return Response(status=status.HTTP_200_OK)
```

## Automated Testing
[https://www.django-rest-framework.org/api-guide/testing/](https://www.django-rest-framework.org/api-guide/testing/)

```python
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from event.models import Event

# Test to test all the HTTP methods of `EventViewSet`
class EventTest(APITestCase):
    def setUp(self):
        # Create a user
        self.user = User.objects.create_user(
            username="test_user", email="test@test.com", password="test_password"
        )

        # Create an event
        self.event = Event.objects.create(
            name="test_event", date="2021-01-01", organizer=self.user
        )

    def test_get(self):
        # Test GET method
        url = reverse("events-list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data[0]["name"], "test_event")
        self.assertEqual(response.data[0]["date"], "2021-01-01")
        self.assertEqual(response.data[0]["organizer"]["username"], "test_user")

    def test_post(self):
        # Test POST method
        self.client.login(username="test_user", password="test_password")
        url = reverse("events-list")
        response = self.client.post(url, {"name": "test_event2", "date": "2021-01-02"})
        self.assertEqual(response.status_code, 201)

        event_data = response.data
        self.assertEqual(event_data["name"], "test_event2")
        self.assertEqual(event_data["date"], "2021-01-02")
        self.assertEqual(event_data["organizer"]["username"], "test_user")

        # Make sure the event by checking the database
        event = Event.objects.get(name="test_event2")
        self.assertEqual(str(event.id), event_data["id"])
    # ... All other methods are left to the reader to implement
```

To run this test, run `python manage.py test`

## Authentication and Authorization
What if we only want the `PUT/PATCH/DELETE` methods to be accessible by the organizer?

Docs:
- Authentication [https://www.django-rest-framework.org/api-guide/authentication/](https://www.django-rest-framework.org/api-guide/authentication/)
- Authorization/Permissions [https://www.django-rest-framework.org/api-guide/permissions/](https://www.django-rest-framework.org/api-guide/permissions/)

```python
# permissions.py
from rest_framework import permissions

# The organizer is the only one allowed to update or delete an event.
class IsOrganizerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS POST.
        if request.method in [permissions.SAFE_METHODS, 'POST']:
            return True
        
        # Write permissions are only allowed to the organiser of the event.
        return obj.organizer == request.user

# views.py
class EventViewSet(viewsets.ModelViewSet):
    ...
    permission_classes = [IsOrganizerOrReadOnly]
    ...

```

### TDD: Test-Driven Development With Multiple Accounts

This is a perfect showcase how it's very difficult to manage manually testing with multiple accounts.

```python
class EventTest(APITestCase):
    ...
    def test_not_organizer_cannot_modify(self):
        # Test that a user who is not the organizer cannot modify the event
        # Create another user
        self.user2 = User.objects.create_user(
            username="test_user2", email="test2@test.com", password="test_password"
        )
        self.client.login(username="test_user2", password="test_password")
        url = reverse("events-detail", args=[self.event.id])
        response = self.client.put(url, {"name": "test_event2", "date": "2021-01-02"})
        self.assertEqual(response.status_code, 403)
```

???+ note "How to manually test this?"
    - Login as the organiser
    - Create an event
    - Create a new user
    - Login as the new user
    - Try to modify the event
    - Check that it returns a 403 Forbidden

## Extra-Reading - JWT Authentication
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

And if you are using an authenticated endpoint, you need to add the `Authorization` header with the token.
`"Authorization: Bearer eyJhbEXAMPLEOFJWTOKEN..."`

## Bonus" Sending Emails

Run `docker-compose up` to start the mail server.

Your mail server will have this UI at [http://localhost:8025/](http://localhost:8025/).
It communicates via SMTP on port 1025.

Add these in your `settings.py`
```python
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'localhost'
EMAIL_PORT = 1025
EMAIL_HOST_USER = ''
EMAIL_HOST_PASSWORD = ''
EMAIL_USE_TLS = False

EMAIL_ADDRESS_FROM = 'email-tester@test.com;
```

??? info "Where are these values coming from?"
    If you check the `docker-compose.yml`, you will understand that we are just configuring the values to send via SMTP to the mail server.

    In actual production services, you will change this to your actual SMTP server like AWS SES, Sendgrid, Mailgun, etc.

New file called `utils.py`
```python
from django.core.mail import send_mail
from django.conf import settings

def send_email(subject, message, recipient_list):
    send_mail(
        subject=subject,
        message=message,
        from_email=settings.EMAIL_ADDRESS_FROM,
        recipient_list=recipient_list,
        fail_silently=False,
    )
```

Now let's change it so that when a new event is created, an email is sent to the organizer.

```python
# views.py
from event.utils import send_email

class EventViewSet(viewsets.ModelViewSet):
    ...
    def perform_create(self, serializer):
        # Set whoever is creating the event as the organizer:
        serializer.save(organizer=self.request.user)
        send_email(
            subject="New event created",
            message="A new event has been created",
            recipient_list=[self.request.user.email],
        )
```
