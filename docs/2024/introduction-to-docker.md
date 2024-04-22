---
title: Introduction to Docker
ᴴₒᴴₒᴴₒ: true
---

## Prerequisites

You need the following installed:

- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/en/download)
- [Docker](https://www.docker.com/get-started/)
- [VSCode](https://code.visualstudio.com/download) (highly recommended)

The starting repo for this workshop: <https://github.com/codersforcauses/docker-workshop>

## What you will be building as part of this workshop?

CFC wants to make an app for accepting coffee orders. You will be creating a Dockerfile for CFC's (totally real) new and upcoming rebrand: *Coders for Coffee 🐳*. The architecture is a simple frontend and backend both made in TypeScript. Below is a diagram of it:

![Architecture](https://placehold.co/600x400)

## Important information

This workshop relies on a certain understanding of terminal commands and a bit of familiarity with Node.js projects.

## What is Docker?

Docker is a platform for developing, shipping, and running applications using containerization. It allows you to package an application and its dependencies into a container that can run on any machine. This makes it easy to deploy applications in a consistent and reproducible way. Simply put, it's like a way of running mini virtual machines inside your computer.

### Why use Docker?

- **Consistency**: Docker containers are isolated from the host system and other containers, ensuring that the application runs the same way everywhere.
- **Portability**: Containers can be run on any machine that has Docker installed, making it easy to move applications between environments.
- **Efficiency**: Containers are lightweight and share the host system's resources, making them more efficient than virtual machines.
- **Scalability**: Docker makes it easy to scale applications by running multiple containers on the same host or across multiple hosts.
- **Security**: Containers are isolated from each other and the host system, providing an additional layer of security.
- **DevOps**: Docker is a key tool in the DevOps toolchain, enabling developers to build, test, and deploy applications more easily. Imagine a software job where instead of writing software for end-users, you write software to make developers' lives easier!

### Definitions

- **Dockerfile 📜**: A text file that contains instructions for building a Docker **image**. It specifies the base image, dependencies, environment variables, and commands to run when the container starts. Think like a recipe for baking a cake.
- **Image 📀**: A read-only template with instructions for creating a Docker **container**. It contains the application code, runtime, libraries, environment variables, and configuration files. Think like a CD with music on it.
- **Container ▶️**: An instance of an image that can be run as a process on the host machine. It is isolated from other containers and the host system. Think like a CD in a CD player.

### How do I use Docker?

This is a high-level overview of how Docker works:

![Docker Architecture](./images/docker-diagram.png)

In action, you'll only need to know a few commands to get started:

1. `docker pull`: Pull an **image** from a **registry** (like Docker Hub).
2. `docker run <image>`: Run a **container** from an **image**.
3. `docker build`: Build a **Dockerfile** into an **image**.

## Getting started

Firstly, open your IDE and open the terminal.

1. Clone the repository: `git clone https://github.com/codersforcauses/docker-workshop.git`
2. Go to the directory: `cd docker-workshop`
3. Run the setup script: `npm run setup`
4. Run the app: `npm run dev`. Visit [http://localhost:3000](http://localhost:3000) to see it in action.

??? info "What does the setup script do?"
    The setup script installs the dependencies for both the frontend and backend. It is located in the `package.json` in the root. Formatted nicely:

    ```bash
    npm install --prefix apps/frontend -g && # install dependencies for the frontend
    npm install --prefix apps/backend -g && # install dependencies for the backend
    npm install # install dependencies for the root (just a little handy package to run both apps with one command)
    ```

## What does the app do?

The frontend is a simple form that takes a user's order and sends it to the backend. The backend then saves the order to a "database". Below is a screenshot of the app:

![Application](./images/app-frontend.png)

### Frontend

The frontend is a single page app that takes orders. It runs at <http://localhost:3000>.

??? info "Where is the frontend code?"
    The frontend code is located in the `apps/frontend` directory. The main file is `src/App.tsx`.

### Backend

The backend is a simple Hono http server that listens for certain requests. It runs at <http://localhost:3001>. There are 3 important endpoints:

1. `GET /` - Show a simple page to check if the server is running
2. `GET /orders` - Get all orders
3. `POST /orders` - Create an order

??? info "Where is the backend code?"
    The backend code is located in the `apps/backend` directory. The main file is `src/index.ts`.

You can view the first two by going to <http://localhost:3001> and <http://localhost:3001/orders> in your browser.

## What do we need to do?

We need to create a **Dockerfile** to **build** the frontend and backend to **images**, then run them as **containers**. I have already created a Dockerfile for the backend, which is located in the `apps/backend` directory. You will need to create a Dockerfile for the frontend.

??? info "Can I cheat?"
    If you choose to look at it, you might find it helpful. However, it comes with a few optimisations which may be confusing.

## Building and Running an Image

Close the app dev server we ran earlier with `CTRL+C` or `CMD+C`.

Let's start by learning how to build and run a Docker image.  First, let's build the backend:

```bash
docker build -t docker-workshop-backend ./apps/backend
```

This command builds an image from the Dockerfile in the `apps/backend` directory and tags it (`-t`) with the name `docker-workshop-backend`.

Now, let's run the image we've built:

```bash
docker run -p 3001:3001 docker-workshop-backend
```

!!! warning "Port Mapping"
    But wait, what does `-p 3001:3001` do? I mentioned earlier that Docker basically runs mini virtual machines --- so let's visualise what that looks like.

    ![Docker Port Mapping](./images/docker-port-mapping.png)

    In order for our container to make connect with the outside world, we need to create a little tunnel (one part of Docker's security goals). This is done by mapping a port on the host machine to a port on the container. In our case, the I've configured the backend to run internally on port `3001`. Therefore, we need to map that internal port to a port on the host machine so we can access it. I kept it simple and mapped it to the same port, but you can change it to any port you like (given our frontend knows about it). Ports are mapped like this: `-p <host-port>:<container-port>`

Now, visit [http://localhost:3001](http://localhost:3001) to see the backend now running from a Docker container.

## Manual Build

To get a better idea of what we need to do, let's build the frontend manually.

## Creating a Dockerfile

When creating a Dockerfile, you need to consider how

### Base Image

All Dockerfiles start with a `FROM` command, which specifies the base image to use. This image is usually a lightweight Linux distribution with the necessary tools and libraries to run the application. For our frontend, we will use the [`node:20-alpine`](https://hub.docker.com/_/node) image.

???+ info "How do I know what image to use?"
    There are a number of things to consider when choosing a base image:

    - **Application**: Because we're running a Node.js app, an image with Node.js already installed is a good choice.
    - **Size**: Smaller images are faster to download and use less disk space.
    - **Security**: Official images are more secure and are regularly updated. Most of the time you'll be using images from Docker Hub.
    - **Compatibility**: Make sure the image is compatible with your application. In this case, the current LTS release for Node.js is 20, so we will use `node:20-alpine`. Locking the version down is also good practice to prevent images from suddenly breaking.

```dockerfile
# Use the official Node.js image as the base image
FROM node:20-alpine
```

### Working Directory
