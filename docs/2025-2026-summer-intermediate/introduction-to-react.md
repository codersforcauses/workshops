# Introduction to React
*Sparking the REACTion of User Interface and Experience*

![dog](./images/dog.png)

## Decomposing the HTML User Interface
??? example "Complete code"
    ```html
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous" />
        <link rel="stylesheet" href="style.css" />
        <title>My Home Page - Frinze Lapuz</title>
    </head>

    <body>
        <nav class="navbar sticky-top navbar-dark bg-dark">
            <div class="container nav">
                <a class="navbar-brand" href="#">Royal Homepage</a>
            </div>
        </nav>
        <div class="container">
            <div class="row">
                <div class="col">Here Some Dog For You. Cool Stuff right?</div>
                <div class="col">
                    <!-- <img class="img-fluid img-thumbnail" src="dog.jpg" alt="dog" /> -->
                    <div class="carouselWrapper">
                        <div id="carouselDoggo" class="carousel slide" data-ride="carousel">
                            <ol class="carousel-indicators">
                                <li data-target="#carouselDoggo" data-slide-to="0" class="active"></li>
                                <li data-target="#carouselDoggo" data-slide-to="1"></li>
                                <li data-target="#carouselDoggo" data-slide-to="2"></li>
                            </ol>
                            <div class="carousel-inner">
                                <div class="carousel-item active">
                                    <img src="dog.jpg" class="d-block w-100" alt="..." />
                                    <div class="carousel-caption d-none d-md-block">
                                        <h5>First Dog</h5>
                                        <p>Cutie :)</p>
                                    </div>
                                </div>
                                <div class="carousel-item">
                                    <img src="dog2.jpg" class="d-block w-100" alt="..." />
                                    <div class="carousel-caption d-none d-md-block">
                                        <h5>Second Dog</h5>
                                        <p>Good Doggo!</p>
                                    </div>
                                </div>
                                <div class="carousel-item">
                                    <img src="dog3.jpg" class="d-block w-100" alt="..." />
                                    <div class="carousel-caption d-none d-md-block">
                                        <h5>Third Dog</h5>
                                        <p>Walkie Barkie Cutie!</p>
                                    </div>
                                </div>
                            </div>
                            <a class="carousel-control-prev" href="#carouselDoggo" data-slide="prev">
                                <span class="carousel-control-prev-icon"></span>
                                <span class="sr-only">Previous</span>
                            </a>
                            <a class="carousel-control-next" href="#carouselDoggo" data-slide="next">
                                <span class="carousel-control-next-icon"></span>
                                <span class="sr-only">Next</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
            integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
            crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
            integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
            crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
            integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
            crossorigin="anonymous"></script>
    </body>

    </html>
    ```

???+ example "Relevant Code for Discussion"
    ```html hl_lines="1-5 8 10-49"
    <nav class="navbar sticky-top navbar-dark bg-dark"> <!--(1)-->
        <div class="container nav">
            <a class="navbar-brand" href="#">Royal Homepage</a>  
        </div>
    </nav>
    <div class="container">
        <div class="row">
            <div class="col">Here Some Dog For You. Cool Stuff right?</div> <!--(2)-->
            <div class="col">
                <div class="carouselWrapper"> <!--(3)-->
                    <div id="carouselDoggo" class="carousel slide" data-ride="carousel">
                        <ol class="carousel-indicators">
                            <li data-target="#carouselDoggo" data-slide-to="0" class="active"></li>
                            <li data-target="#carouselDoggo" data-slide-to="1"></li>
                            <li data-target="#carouselDoggo" data-slide-to="2"></li>
                        </ol>
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img src="dog.jpg" class="d-block w-100" alt="..." />
                                <div class="carousel-caption d-none d-md-block">
                                    <h5>First Dog</h5>
                                    <p>Cutie :)</p>
                                </div>
                            </div>
                            <div class="carousel-item">
                                <img src="dog2.jpg" class="d-block w-100" alt="..." />
                                <div class="carousel-caption d-none d-md-block">
                                    <h5>Second Dog</h5>
                                    <p>Good Doggo!</p>
                                </div>
                            </div>
                            <div class="carousel-item">
                                <img src="dog3.jpg" class="d-block w-100" alt="..." />
                                <div class="carousel-caption d-none d-md-block">
                                    <h5>Third Dog</h5>
                                    <p>Walkie Barkie Cutie!</p>
                                </div>
                            </div>
                        </div>
                        <a class="carousel-control-prev" href="#carouselDoggo" data-slide="prev">
                            <span class="carousel-control-prev-icon"></span>
                            <span class="sr-only">Previous</span>
                        </a>
                        <a class="carousel-control-next" href="#carouselDoggo" data-slide="next">
                            <span class="carousel-control-next-icon"></span>
                            <span class="sr-only">Next</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    ```

    1.  Navigation Bar
    2.  Some Text
    3.  Carousel

### HTML Stored in Variables
```js
const Nav = 
    `<nav class="navbar sticky-top navbar-dark bg-dark"> 
        <div class="container nav">
            <a class="navbar-brand" href="#">Royal Homepage</a>  
        </div>
    </nav>
    `
```

### HTML Stored in Functions
```js hl_lines="1 5"
const Nav = (title) => 
    `
    <nav class="navbar sticky-top navbar-dark bg-dark"> 
        <div class="container nav">
            <a class="navbar-brand" href="#">${title}</a>  
        </div>
    </nav>
    `
```

???+ info "Carousel Decomposition"
    The highlighted ones are the key-distinct data driven elements.
    ```html hl_lines="4 9-15"
    <div class="carouselWrapper">
        <div id="carouselDoggo" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">  <!--(1)-->
                <li data-target="#carouselDoggo" data-slide-to="0" class="active"></li>
                <li data-target="#carouselDoggo" data-slide-to="1"></li>
                <li data-target="#carouselDoggo" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner">
                <div class="carousel-item active"> <!--(2)-->
                    <img src="dog.jpg" class="d-block w-100" alt="..." />
                    <div class="carousel-caption d-none d-md-block">
                        <h5>First Dog</h5>
                        <p>Cutie :)</p>
                    </div>
                </div>
                <div class="carousel-item">
                    <img src="dog2.jpg" class="d-block w-100" alt="..." />
                    <div class="carousel-caption d-none d-md-block">
                        <h5>Second Dog</h5>
                        <p>Good Doggo!</p>
                    </div>
                </div>
                <div class="carousel-item">
                    <img src="dog3.jpg" class="d-block w-100" alt="..." />
                    <div class="carousel-caption d-none d-md-block">
                        <h5>Third Dog</h5>
                        <p>Walkie Barkie Cutie!</p>
                    </div>
                </div>
            </div>
            <a class="carousel-control-prev" href="#carouselDoggo" data-slide="prev">
                <span class="carousel-control-prev-icon"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselDoggo" data-slide="next">
                <span class="carousel-control-next-icon"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
    </div>
    ```

    1.  Carousel Indicators
    2.  Carousel Items

    Now, what if we have a variable called `dogsData` an array of objects (may come from `fetch`).
    ```js
    dogsData = [
        ...
        {
            imgSrc: "dog.jpg",
            title: "First Dog",
            caption: "Cutie :)"
        }
        ...
    ]
    ```

    ```js
    const Carousel = (dogsData) =>
        `
        <div class="carouselWrapper"> <!--(1)-->
            <div id="carouselDoggo" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                    ${dogsData.map((dog, index) => `<li data-target="#carouselDoggo" data-slide-to="${index}" class="${index === 0 ? 'active' : ''}"></li>`).join('')}
                </ol>
                <div class="carousel-inner">
                    ${dogsData.map((dog, index) => `
                        <div class="carousel-item ${index === 0 ? 'active' : ''}">
                            <img src="${dog.imgSrc}" class="d-block w-100" alt="..." />
                            <div class="carousel-caption d-none d-md-block">
                                <h5>${dog.title}</h5>
                                <p>${dog.caption}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <a class="carousel-control-prev" href="#carouselDoggo" data-slide="prev">
                    <span class="carousel-control-prev-icon"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselDoggo" data-slide="next">
                    <span class="carousel-control-next-icon"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
        </div>
        `
    ```
### Assemble the Components
```js hl_lines="1 5"
{Nav("Royal Homepage")}
<div class="container">
    <div class="row">
        <div class="col-md-12">
            {Carousel(dogsData)}
        </div>
    </div>
```
or with JSX

```html hl_lines="1 5"
<Nav title="Royal Homepage"></Nav>
<div class="container">
    <div class="row">
        <div class="col-md-12">
            <Carousel dogsData={dogsData}></Carousel>
        </div>
    </div>
```

## Intro to React

<iframe width="100%" height="500rem"
src="https://www.youtube.com/embed/Tn6-PIqc4UM" 
frameborder="0" 
allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
allowfullscreen></iframe>

???+ example "Complete Modularised Code"
    ```js
    const Nav = () => <nav class="navbar sticky-top navbar-dark bg-dark"> 
        <div class="container nav">
            <a class="navbar-brand" href="#">Royal Homepage</a>  
        </div>
    </nav>

    const Carousel = (dogsData) =>
        <div class="carouselWrapper">
            <div id="carouselDoggo" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                    ${dogsData.map((dog, index) => `<li data-target="#carouselDoggo" data-slide-to="${index}" class="${index === 0 ? 'active' : ''}"></li>`).join('')}
                </ol>
                <div class="carousel-inner">
                    ${dogsData.map((dog, index) => `
                        <div class="carousel-item ${index === 0 ? 'active' : ''}">
                            <img src="${dog.imgSrc}" class="d-block w-100" alt="..." />
                            <div class="carousel-caption d-none d-md-block">
                                <h5>${dog.title}</h5>
                                <p>${dog.caption}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <a class="carousel-control-prev" href="#carouselDoggo" data-slide="prev">
                    <span class="carousel-control-prev-icon"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselDoggo" data-slide="next">
                    <span class="carousel-control-next-icon"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
        </div>
    
    const Homepage = () =>{
        const dogsData = fetch(...) // Get data from API
        return (
            <>
                <Nav title="Royal Homepage"></Nav>
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <Carousel dogsData={dogsData}></Carousel>
                        </div>
                </div>
            </>
        )
    }
    ```

## React Component Hierarchy and State Flow

In a React application, components are organized into a **hierarchy**. Components can be **parents**, **children**, or **siblings** of each other, and data typically flows **from parent to child** through **props**.

```txt
Homepage
├── Nav
└── Carousel
    ├── CarouselIndicators
    └── CarouselItems
```

### Props: Passing Data Down

**Props** are used to pass data from a parent component to its children.

```jsx
const Parent = () => {
    return <Child message="Hello from parent!" />;
}

const Child = ({ message }) => {
    return <p>{message}</p>;
}
```

### State: Local and Lifted Up

Each component can maintain its own **state** using the `useState` hook:

```jsx
const Counter = () => {
    const [count, setCount] = useState(0);
    return <button onClick={() => setCount(count + 1)}>Clicked {count} times</button>;
}
```

Sometimes, **state must be shared between components**. In that case, you **lift the state up** to their common ancestor and pass values and updater functions down via props.

```jsx
const Parent = () => {
    const [dogIndex, setDogIndex] = useState(0);
    return (
        <>
            <Selector onSelect={setDogIndex} />
            <Carousel selectedIndex={dogIndex} />
        </>
    );
}
```

### Unidirectional Data Flow

React enforces a **top-down data flow**. Children **cannot directly update** a parent’s state, but parents can **pass down callbacks** to allow children to trigger updates.

## Getting Started with React
Getting Started with the app

To get started with react, use the following commands

`npx create-react-app my-app` where my-app is the name of the folder for where the react app is going to be.

`cd my-app`

Notice that it created a couple of folders. In a couple of sentences:

`src/index.js` - injects the user interface in the public/index.html (the front part of the build)

`public` - folder containing the static assets as well as the index.html

`package.json` - dependencies and scripts for the app

type `yarn start` to run the development version of React (it will run `react-scripts` start within the node_modules … so running `react-scripts` start will not exactly be the same). This will serve up React on a port.

## React Frameworks
React is only a library, and so only controls behaviour *on* the webpage and not *between* webpages, etc. Often React will be used as part of a React-based framework such as:
- Next.js
- Remix

These frameworks provide functionality such as routing, server-side rendering (SSR), and other "architectural" support.
