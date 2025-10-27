---
title: Welcome to the Djangol!
ᴴₒᴴₒᴴₒ: true
---

Welcome to the (Django)l !: Introduction to Backend Programming with Django 

---

## Prerequisites to this Workshop

You need the following installed:

- Browser
- VsCode
- Docker

The starting repo for this workshop: [https://github.com/CodersforLearning/django-workshop-winter-2024](https://github.com/CodersforLearning/django-workshop-winter-2024)

---

## What you will be building as part of this workshop?
You're launching a new startup called "Snapstagram" - a social media app that showcases images through posts.

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
    
    post {
        uuid post_id PK
        uuid user_id FK
        string content
        boolean is_draft
        datetime created_at
        datetime updated_at
    }

    comment {
        uuid comment_id PK
        uuid post_id FK
        uuid user_id FK
        string content
        uuid parent_comment_id
        datetime created_at
        datetime updated_at
    }

    image {
        uuid image_id PK
        uuid post_id FK
        string url
    }
    
    user ||--o{ post : creates
    user ||--o{ comment : creates
    post ||--o{ image : contains
    post ||--o{ comment : has
    comment ||--o{ comment : "replies to"
```
---

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

---

## What is Django?

![Django](./images/django-2.png)

**Django**

- Python web framework for creating server-side application

Follows MVC:

- Model - database
- View – Interface (API or User Interface)
- Controller – URLs + routes

See [Documentation](https://www.djangoproject.com/)

---

## What is Django REST Framework (DRF)?
- library for creating REST-API
- just makes it easier develop REST-API

In:

- Authentication + Permission
- Generic API Views
- Serialisers (payload validation and format)

See [Documentation](https://www.django-rest-framework.org/)

---

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
    rm -rf snapstagram || true # just in case it exist
    django-admin startproject snapstagram

    # Libraries needed by DRF
    # As per https://www.django-rest-framework.org/#installation
    pip3 install djangorestframework==3.15.2
    pip3 install Markdown==3.6       # Markdown support for the browsable API.
    pip3 install django-filter==24.2  # Filtering support
    pip3 install pytz==2024.1           # Timezone support

    # Additional libraries
    # For Frontend JWT Authentication
    pip install djangorestframework-simplejwt==5.3.1

    pip freeze > snapstagram/requirements.txt
    ```

### Initial files

- `manage.py` - the entrypoint of the Django application
- `snapstagram` - the main Django application
- `snapstagram/settings.py` - the configuration file of the Django application
- `snapstagram/urls.py` - the URL routes of the Django application
- `snapstagram/wsgi.py` and `snapstagram/asgi.py` - used as the script to run production django application


### Let's start the Django application

1. Run `cd snapstagram`
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


---

## Let's create our first Django app: post

Run this command `python manage.py startapp post`.

### What did this command do?
Initial files that it created:

- `post/admin.py` - the admin interface
- `post/apps.py` - the configuration
- `post/models.py` - the database schema
- `post/tests.py` - the test cases
- `post/views.py` - the views

Some files you want to create later are:

- `post/serializers.py` - the serializers
- `post/urls.py` - the URL routes
- `post/permissions.py` - the permissions

---

## Creation of the database schema

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
        
        post {
            uuid post_id PK
            uuid user_id FK
            string content
            boolean is_draft
            datetime created_at
            datetime updated_at
        }

        comment {
            uuid comment_id PK
            uuid post_id FK
            uuid user_id FK
            string content
            uuid parent_comment_id
            datetime created_at
            datetime updated_at
        }

        image {
            uuid image_id PK
            uuid post_id FK
            string url
        }
        
        user ||--o{ post : creates
        user ||--o{ comment : creates
        post ||--o{ image : contains
        post ||--o{ comment : has
        comment ||--o{ comment : "replies to"
    ```

???+ example "WIP Answer"
    ```python
    class Post(models.Model):
        id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
        content = models.TextField()
        is_draft = models.BooleanField(default=True)

        created_at = models.DateTimeField(auto_now_add=True)
        updated_at = models.DateTimeField(auto_now=True)

        author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="posts")

        def __str__(self):
            # Format when printed: Post ID (Author): Content
            return f"Post {self.id} ({self.author}): {self.content[:30]}"
    ```

After creating this, you'll need to add it in the `INSTALLED_APPS` variable in the `settings.py` file.

Then run `python manage.py makemigrations` and `python manage.py migrate`.

???+ info "What did these commands do?"
    `makemigrations` - creates the migration files
    These are scripts that defines how the database schema changed.

    `migrate` - applies the migration files to the database
    Similar to how we performed our initial migration

When you have created that, check out `db.sqlite3` and you'll see that there's a new table called `post_post`.

---

## Creation of the admin interface

???+ example "WIP Answer"
    ```python
    from django.contrib import admin
    from .models import Post

    admin.site.register(Post)
    ```

Now visit the admin interface and you'll see the Post model there.

??? example "A cooler example"
    ```python
    @admin.register(Post)
    class PostAdmin(admin.ModelAdmin):
        list_display = ("id", "content", "is_draft", "created_at", "updated_at", "author")
        list_filter = ("is_draft", "created_at", "updated_at", "author")
        search_fields = ("content", "author__username")
        date_hierarchy = "created_at"
        ordering = ("-created_at",)
    ```

### Do the same thing again for Image and Comment

???+ info "Quick Reference: ERD"
    ```mermaid
    erDiagram
        user {
            uuid user_id PK
            string username
            string email
            string password
            datetime created_at
        }
        
        post {
            uuid post_id PK
            uuid user_id FK
            string content
            boolean is_draft
            datetime created_at
            datetime updated_at
        }

        comment {
            uuid comment_id PK
            uuid post_id FK
            uuid user_id FK
            string content
            uuid parent_comment_id
            datetime created_at
            datetime updated_at
        }

        image {
            uuid image_id PK
            uuid post_id FK
            string url
        }
        
        user ||--o{ post : creates
        user ||--o{ comment : creates
        post ||--o{ image : contains
        post ||--o{ comment : has
        comment ||--o{ comment : "replies to"
    ```

???+ example "WIP Answer"
    ```python
    # models.py
    class Comment(models.Model):
        id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
        content = models.TextField()

        post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comments")
        # When a comment is a reply to another comment, this field will be set
        parent_comment = models.ForeignKey(
            "self", on_delete=models.CASCADE, null=True, blank=True, related_name="replies"
        )

        created_at = models.DateTimeField(auto_now_add=True)
        updated_at = models.DateTimeField(auto_now=True)

        author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)

        def __str__(self):
            # Format when printed: Comment ID (Author): Content
            return f"Comment {self.id} ({self.author}): {self.content[:30]}"

        def clean(self):
            if self.parent_comment == self:
                raise ValidationError("A comment cannot be a reply to itself")
            if self.parent_comment and self.parent_comment.post != self.post:
                raise ValidationError("Parent comment must belong to the same post")


    class Image(models.Model):
        id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
        url = models.URLField()
        post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="images")

        def __str__(self):
            return f"Image {self.id} for Post {self.post.id}"

        def clean(self):
            accepted_extensions = [".png", ".jpg", ".jpeg", ".gif"]
            if not self.url.endswith(tuple(accepted_extensions)):
                raise ValidationError(
                    f"Invalid image URL. Must end with any of {accepted_extensions}"
                )

    # admin.py
    @admin.register(Comment)
    class CommentAdmin(admin.ModelAdmin):
        list_display = (
            "id",
            "content",
            "post",
            "parent_comment",
            "created_at",
            "updated_at",
            "author",
        )
        list_filter = ("post", "parent_comment", "created_at", "updated_at", "author")
        search_fields = ("content", "author__username")
        date_hierarchy = "created_at"
        ordering = ("-created_at",)


    @admin.register(Image)
    class ImageAdmin(admin.ModelAdmin):
        list_display = ("id", "url", "post")
        list_filter = ("post",)
        search_fields = ("url",)
        ordering = ("id",)
    ```

---

## Creation Views: the Interface in API

???+ note "Installed Apps Rest Framework"
    Before going further, add `rest_framework` in `INSTALLED_APPS` in `settings.py`.

### `serializers.py`
Serialisers are a way to convert Python models to JSON, XML or any other format you wish.

???+ example "WIP Answer"
    ```
    # serializers.py
    class PostSerializer(serializers.ModelSerializer):
        class Meta:
            model = Post
            fields = "__all__"
            read_only_fields = ("id", "created_at", "updated_at")
    ```

### `views.py` and `urls.py`

![rest-verbs](./images/rest-verbs.jpg)

Here's our goal:
```
// Class based - programming
GET posts in the system - /posts
POST create posts - /posts
GET specific post in the system - /posts/<id>
PUT/PATCH update specific post - /posts/<id>
DELETE delete specific post - /posts/<id>

// Add a comment to a post
POST create comment - /posts/<id>/comments
UPDATE comment - /posts/<id>/comments/<id>
DELETE comment - /posts/<id>/comments/<id>

// Add image to post
POST create image - /posts/<id>/images
DELETE image - /posts/<id>/images/<id>
```

Firstly, we need to set the `urls.py` to import the views from `post/views.py`.

```python
# urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/posts/", include("post.urls")) # --HERE--
]
```

There's 2 main ways to create views

- Functional
- Class-based

??? example "Class-based Views"
    This is the easiest way - full of magic. If you need flexibility, you can override the methods.

    ```python
    # post/views.py
    from rest_framework import viewsets
    from .models import Post
    from .serializers import PostSerializer


    class PostViewSet(viewsets.ModelViewSet):
        queryset = Post.objects.all()
        serializer_class = PostSerializer

        def perform_create(self, serializer):
            # Automatically set the author of a post to the user making the request
            serializer.save(author=self.request.user)

    # post/urls.py
    from django.urls import path, include
    from rest_framework.routers import DefaultRouter
    from .views import PostViewSet


    router = DefaultRouter()
    router.register(r"", PostViewSet, basename="posts")

    urlpatterns = [
        path("", include(router.urls)),
    ]

    ```

    Important to note that the `basename` is used to generate the URL name. In this case, it will be `posts-list` and `posts-detail`. (you will need this automated testing)

??? example "Functional Views"
    This is the more flexible way, but it does mean there's quite of bit of boilerplate code.

    ```python
    # post/views.py
    @api_view(["GET"])
    def post_list(request):
        posts = post.objects.all()
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)

    @api_view(["GET"])
    def post_detail(request, pk):
        post = get_object_or_404(post, pk=pk)
        serializer = PostSerializer(post)
        return Response(serializer.data)

    @api_view(["POST"])
    def post_create(request):
        # Set whoever is creating the post as the organizer:
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(organizer=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @api_view(["PUT"])
    def post_update(request, pk):
        post = get_object_or_404(post, pk=pk)
        serializer = PostSerializer(post, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @api_view(["DELETE"])
    def post_delete(request, pk):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

    # urls.py
    urlpatterns = [
        path("", views.post_list),
        path("<int:pk>/", views.post_detail),
        path("create/", views.post_create),
        path("<int:pk>/update/", views.post_update),
        path("<int:pk>/delete/", views.post_delete),
    ]
    ```

??? example "Reuse Same Path with different HTTP Methods"
    ```python
    @api_view(["GET", "POST"])
    def post_list(request):
        if request.method == "GET":
            queryset = Post.objects.all()
            serializer = PostSerializer(queryset, many=True)
            return Response(serializer.data)
        elif request.method == "POST":
            serializer = PostSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=201)
            return Response(serializer.errors, status=400)

    @api_view(["GET", "PUT", "PATCH", "DELETE"])
    def post_detail(request, pk):
        try:
            post = Post.objects.get(pk=pk)
        except Post.DoesNotExist:
            return Response(status=404)

        if request.method == "GET":
            serializer = PostSerializer(post)
            return Response(serializer.data)
        elif request.method in ["PUT", "PATCH"]:
            serializer = PostSerializer(post, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=400)
        elif request.method == "DELETE":
            post.delete()
            return Response(status=204)
    ```

??? example "Another Example Class-based Views"
    This is the easiest way - full of magic. If you need flexibility, you can override the methods.
    ```python
    # views.py
    class PostViewSet(viewsets.ModelViewSet):
        queryset = Post.objects.all()
        serializer_class = PostSerializer

        def perform_destroy(self, instance):
            if not instance.is_draft:
                raise serializers.ValidationError("Cannot delete a post.")
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


class PostSerializer(serializers.ModelSerializer):
+   author = UserSerializer(read_only=True)

    class Meta:
        model = Post
        fields = "__all__"
        read_only_fields = ("id", "created_at", "updated_at")
```

What about if we also want to include comments?

```diff
+ class CommentSerializer(serializers.ModelSerializer):
+     author = UserSerializer(read_only=True)
+
+     class Meta:
+         model = Comment
+         fields = "__all__"
+         read_only_fields = ("id", "created_at", "updated_at")

class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
+   comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = "__all__"
        read_only_fields = ("id", "created_at", "updated_at")
```

Now what if you want to nest all the replies as well?
```diff
class CommentSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
+   replies = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = "__all__"
        read_only_fields = ("id", "created_at", "updated_at")

+   def get_replies(self, obj):
+       return CommentSerializer(obj.replies, many=True).data
```

### Now let's do comment endpoints

```python
# views.py
class PostCommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer

    def get_queryset(self):
        # Get all comments for a specific post
        return Comment.objects.filter(post_id=self.kwargs["post_pk"])

    def perform_create(self, serializer):
        # Automatically set the author of a comment to the user making the request
        serializer.save(author=self.request.user)
```

```diff
# urls.py
router = DefaultRouter()
router.register(r"", PostViewSet, basename="posts")
+router.register(
+    r"(?P<post_pk>[^/.]+)/comments", PostCommentViewSet, basename="comments"
+)
```

???+ note "Image API endpoints are left as an exercise to the reader"
    - Create a new serializer for images
    - Create a new viewset for images
    - Add the viewset to the router
    - Add the router to the urls


### Bonus: Filters and Search
[https://www.django-rest-framework.org/api-guide/filtering/](https://www.django-rest-framework.org/api-guide/filtering/)

What if I want to only see posts that are not yet published?

Need to add this in `settings.py`
```python
REST_FRAMEWORK = {
    'DEFAULT_FILTER_BACKENDS': ['django_filters.rest_framework.DjangoFilterBackend']
}
```

then in `views.py`
```diff
+ from django_filters.rest_framework import DjangoFilterBackend
+ from rest_framework import filters
...
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
+   filter_backends = [DjangoFilterBackend, filters.SearchFilter]
+   filterset_fields = ["is_draft", "author"]
+   search_fields = ["content", "author__username"]

    def perform_create(self, serializer):
        # Automatically set the author of a post to the user making the request
        serializer.save(author=self.request.user)
```

### Bonus: Viewset Actions (Will not be covered in this workshop)
If you want to create a special endpoint that doesn't follow the traditional CRUD operations, you can use viewset actions.
Docs: [Viewset Actions](https://www.django-rest-framework.org/api-guide/viewsets/#viewset-actions)

For example, what if you want a new endpoint called `POST /api/posts/<id>/schedule-publish`, which adds to another database, and there's some task that will change the `is_draft` to `False` after a certain time.

---

## Automated Testing
[https://www.django-rest-framework.org/api-guide/testing/](https://www.django-rest-framework.org/api-guide/testing/)

```python
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from .models import Post
from django.urls import reverse


# Test all HTTP methods for `PostViewSet`
class PostTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="test", password="test")
        self.client.force_authenticate(user=self.user)

    def test_create_post(self):
        data = {"content": "Hello, World!"}
        url = reverse("posts-list")
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Post.objects.count(), 1)
        self.assertEqual(Post.objects.get().content, "Hello, World!")

    def test_list_posts(self):
        Post.objects.create(content="Hello, World!")
        Post.objects.create(content="Hello, Django!")
        url = reverse("posts-list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)

    def test_retrieve_post(self):
        post = Post.objects.create(content="Hello, World!")
        url = reverse("posts-detail", args=[post.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["content"], "Hello, World!")

    def test_delete_post(self):
        post = Post.objects.create(content="Hello, World!")
        url = reverse("posts-detail", args=[post.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, 204)
        self.assertEqual(Post.objects.count(), 0)

    # ... All other methods are left to the reader to implement
```

To run this test, run `python manage.py test`

---

## Authentication and Authorization
What if we only want the `PUT/PATCH/DELETE` methods to be accessible by the organizer?

Docs:
- Authentication [https://www.django-rest-framework.org/api-guide/authentication/](https://www.django-rest-framework.org/api-guide/authentication/)
- Authorization/Permissions [https://www.django-rest-framework.org/api-guide/permissions/](https://www.django-rest-framework.org/api-guide/permissions/)

```python
# permissions.py
from rest_framework import permissions

# The organizer is the only one allowed to update or delete an post.
class IsAuthorOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS POST.
        if request.method in [*permissions.SAFE_METHODS, 'POST']:
            return True
        
        # Write permissions are only allowed to the organiser of the post.
        return obj.author == request.user

# views.py
class PostViewSet(viewsets.ModelViewSet):
    ...
    permission_classes = [IsAuthorOrReadOnly]
    ...

```

### TDD: Test-Driven Development With Multiple Accounts

This is a perfect showcase how it's very difficult to manage manually testing with multiple accounts.

```python
class PostTest(APITestCase):
    ...
    def test_not_author_cannot_modify(self):
        other_user = User.objects.create_user(username="other", password="other")
        post = Post.objects.create(content="Hello, World!", author=other_user)
        data = {"content": "Hello, Django!"}
        url = reverse("posts-detail", args=[post.id])

        # The client is authenticated as `self.user`, not `other_user`
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, 403)
        self.assertEqual(Post.objects.get().content, "Hello, World!")
        response = self.client.patch(url, data)
        self.assertEqual(response.status_code, 403)
        self.assertEqual(Post.objects.get().content, "Hello, World!")
        response = self.client.delete(url)
        self.assertEqual(response.status_code, 403)
        self.assertEqual(Post.objects.count(), 1)
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
```

???+ note "How to manually test this?"
    - Login as the organiser
    - Create an Post
    - Create a new user
    - Login as the new user
    - Try to modify the Post
    - Check that it returns a 403 Forbidden

???+ note "Exercise for the reader: Fix broken test"
    The example code given is broken after the authentication enforcement.
    Can you fix the issue?

---

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

---

## Bonus" Sending Emails

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

Now let's change it so that when a new post is created, an email is sent to the organizer.

```python
# views.py
from .utils import send_email

class PostViewSet(viewsets.ModelViewSet):
    ...
    def perform_create(self, serializer):
        # Automatically set the author of a post to the user making the request
        serializer.save(author=self.request.user)
        send_email("New Post Created", "A new post has been created on Snapstagram!", [self.request.user.email])
```

Now when you create a new post, you should see an email in the mail server at [http://localhost:8025/](http://localhost:8025/).