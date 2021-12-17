# MVC-MVMM Architecture and Communications
*Separate the concerns with Design Patterns!*

## What is MVC/MVVM Architecture?

**MVC (Model-View-Controller)**

- Model – data representation layer (how app communicates to db – Raw or ORM)
- View – interface representation (with HTML, CSS and JS)
- Controller – request relays (processes HTTP requests)

???+ info "MVC"
    ![mvc](./images/mvc-django.png)

**MVVM (Model-ViewModel-View)**

ViewModel – data-binding relays (processes the HTTP requests)

???+ info "MVVM"
    ![mvvm](./images/mvvm-django-react.png)

???+ warning "Some inaccuracy"
    I acknowledge that this may not be correct. If you search MVC/MVMM, you will see lots of conflicting details. This portion of the slide is explained to make frontend-backend integration easier to explain.

### Examples of Technologies with the Architecture

???+ example "MVC - Django"
    ![mvc-django](./images/mvc-django.png)

???+ example "MVVM - Django + React"
    ![mvvm-django-react](./images/mvvm-django-react.png)

???+ example "MVC - Flask"
    ![mvc-flask](./images/mvc-flask.png)

???+ example "MVVM - Flask + React"
    ![mvvm-flask-react](./images/mvvm-flask-react.png)

???+ example "MVC - Express"
    ![mvc-node](./images/mvc-node.png)

???+ example "MVVM - Express + React"
    ![mvvm-node-react](./images/mvvm-node-react.png)

## Why is software architecture important?
Architecture shows how an entire software works in a high-level.

**Important for:**

- maintainability and extensibility
- seperation of concerns
- choosing different pieces of the stack

???+ info "Just some architecture diagrams"
    ![gunicorn-flask](./images/gunicorn-flask.png)
    ![react-with-amplify](./images/react-with-amplify.png)
    ![workers](./images/workers.png)

## How do frontend communicate with backend?
Via HTTP Requests responds with:

- HTML, CSS, JS
- JSON/XML


### Server-side Rendering
Via - HTML, CSS, JS

???+ info "Data Flow"
    ![ssr](./images/ssr.png)

### Client-side Rendering and AJAX

Via HTTP Requests responds with:
- blank HTML with JS (at first)
- JSON/XML

???+ info "Data Flow"
    ![csr](./images/csr.jpg)

???+ info "CRUD to HTTP Verb Matching for JSON standard communications with REST-APIs"
    Matches HTTP verbs with action

    ![rest-verbs](./images/rest-verbs.jpg)

AJAX – Asynchronous JavaScript and ~~XML~~ JSON

???+ note "JSON are strings"
    JSON (JavaScript Object Notation)
    Note: JSONs are String... you have to serialise JSON to become an object

    ![json](./images/json.png)

## Demo - React to integrate with Django
This follows up the demo with React to consume a standard REST-API Django Todo App demonstrated in the [previous workshop](https://workshops.codersforcauses.org/2021-2022-summer/introduction-to-backend-development-with-django/).

## Other Information
- [Traversy Media MVC ](https://www.youtube.com/watch?v=pCvZtjoRq1I)
- [React Query ](https://www.youtube.com/watch?v=46vKqPlTW2w)
- [Axios (a better Fetch?) Travery Media](https://www.youtube.com/watch?v=6LyagkoRWYA)
- [Async/Await JavaScript ](https://www.youtube.com/watch?v=vn3tm0quoqE)



