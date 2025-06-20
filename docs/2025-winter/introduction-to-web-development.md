# Introduction to Web Development Space
*Navigating the Deep Dark Space of Web Development*

This workshop covers a brief overview of the most common tools and technologies used in web development.

## Content
  - [What and Why Web Development?](#what-and-why-web-development)
  - [FAQs about Web Development](#faqs-about-web-development)
  - [Basics of Web and Limitation](#basics-of-web-and-limitation)
  - [Server-side Applications (Backend)](#server-side-applications-backend)
  - [Others](#others)
    - [Languages of the Web (the usual)](#languages-of-the-web-the-usual)
    - [Hosting Stuff](#hosting-stuff)
    - [CSS Frameworks](#css-frameworks)
    - [Developer Tools](#developer-tools)
      - [TypeScript](#typescript)
      - [Testing](#testing)
      - [Continuous Integration / Continuous Deployment](#continuous-integration--continuous-deployment)
      - [Virtualisation and Containerisation](#virtualisation-and-containerisation)
      - [Browsers](#browsers)
      - [Firefox Developer Tools](#firefox-developer-tools)
      - [Package Managers](#package-managers)
      - [Version Control](#version-control)
      - [Linters and Formatters](#linters-and-formatters)
      - [Teamwork](#teamwork)
    - [Roadmaps](#roadmaps)
  - [Word of Encouragement](#word-of-encouragement)

## What and Why Web Development?

### What is web development?
- Website development
- Web applications (client-side and server-side) development

### Why Web Development ?

- Accessibility and Portability
- Career and On-demand in job market
- Huge possibility to combine with other emerging technologies (e.g. IoT, Machine Learning) and industry (e.g. Health, Mining, O&G)

??? info "Career in Web Development"
    Source: [Insights from Stack Overflow’s 2016 survey of 50,000 developers](https://www.freecodecamp.org/news/2-out-of-3-developers-are-self-taught-and-other-insights-from-stack-overflow-s-2016-survey-of-50-8cf0ee5d4c21/)

    "over half of Developers are Web Developers"
    ![occupation](./images/stack-overflow.png)


## FAQs about Web Development

### Why code websites, why not use drag and drops like Wordpress, WIX?

<div style="display:flex;justify-content:space-around;flex-wrap:wrap;">
    <img style="width:33%" src="../2021-2022-summer/images/wordpress.png" alt="wordpress">
    <img style="width:33%" src="../2021-2022-summer/images/wix.jpg" alt="wix">
    <img style="width:33%" src="../2021-2022-summer/images/drupal.jpg" alt="drupal">
</div>

- Content Management System (CMS)
- Limitations on theme/template used
- Difficult to extend
- Cybersecurity

??? info "More information"
    CMS are one of the application of web development, but there are plenty more such as - internet of things, custom software for a particular industrial application (eg. using Machine Learning)

    CMS are usually limited to the template or plugin that you use. If those plugin don't exist, then it limits your productivity very much (difficulty to extend).

    CMS are usually built to cater for non-technical users. This means that thye become the subject of hackers. Think about a scenario where a hacker was able to find a vulnerability in WordPress, now every other WordPress site will be vulnerable.

### What is the best way to learn all these?

<iframe width="100%" height="500rem"
src="https://www.youtube.com/embed/nvlizC6koSc" 
frameborder="0" 
allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
allowfullscreen></iframe>

In summary, the best way to learn:

  - Do personal projects (inspiration + motivation)
  - Do team projects (get peer reviews and correct bad practices straight away)
  - Watch Online Courses (to figure out what is available)

??? info "More Information"
    To be told that you have to learn "this, this, and that" before you could do things is tiresome.

    Often times, we want to learn to be a developer so that we can create cool things like software where thousands of people can use the app. We don't tend to be a developer for the sake of us needing to watch endless videos on different things.

### Why does CFC not do mobile development as much as web development?

- App stores has a developer cost
- Easier to deal/teach web technologies
- Accessibility (mobile, sensors, tablets, laptops and PCs)
- Bigger open-source community

### If I already know a frontend framework, is it better to learn another frontend framework or to learn a backend framework?

- It is better to learn a backend framework

??? info "Reasoning"
    You want to build skills that complement one another rather than be an alternative.

    It is much more valuable for you to learn a backend framework because that helps you build a **functional** app.


## Basics of Web and Limitation

![basics of web 2](../2021-2022-summer/images/basics-of-web-2.jpg)

=== "HTML"
    **What is it?**

    - Hypertext Markup Language
    - Describes the structure of a web page

    **Limitation**

    - Doesn’t handle repeated content well
    - No variables or calculation


    ???+ example "HTML Syntax"
        ```html
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            Hello World!
        </body>
        </html>
        ```

=== "CSS"
    **What is it?**

    - Cascading Style Sheets
    - Describes the presentation of a web page

    **Limitation**

    - Most css is quite similar (Handled by CSS Libraries)
    - Not very dynamic (Handled by CSS Frameworks)


    ???+ example "CSS Syntax"
        ```css
        body {
            background-color: #f0f0f0;
            font-family: sans-serif;
        }

        .container{
            width: 80%;
            margin: 0 auto;
        }
        ```

=== "JS"
    **What is it?**

    - JavaScript
    - Used to program complex features on a web page

    **Limitation**

    - Has the capability to modify the user interface, but becomes really tedious to modify interface (more about this in another workshop)

    ???+ example "JS Syntax"
        ```js
        const bodySelector = document.querySelector('body');
        const myFunction = () => {
            bodySelector.innerHTML = 'Hello World 2!';
            // Add a container class to space out
            bodySelector.classList.add('container');
        }
        bodySelector.onclick = myFunction;
        ```


### Modern Frameworks

- Websites can be much more… they can be web applications
- “App” in a website (client-side rendering)

???+ success "Modern Frameworks"
    === "React.js"
        - More mature and used more in industry

        ![react](../2021-2022-summer/images/react.png)

    === "Vue.js"
        - Growing fast in popularity and use.

        ![vue](../2021-2022-summer/images/vue.png)



    **General Information**

    - Both are good to use and learn. 
    - Knowledge is transferable between the two frameworks.

??? info "Comparison between HTML and JSX"
    ![sample](../2021-2022-summer/images/sample.png)

    Highlighted portions are starting chunk of distinct code.

    ???+ example "HTML"
        ```html hl_lines="2 15 27 41"
        <div class="row">
            <div class="m-0 col-12 col-md-6 col-lg-3">
                <div class="text-center border-0 bg-transparent card">
                <div class="px-0 card-body">
                    <i class="material-icons-sharp md-lg">devices</i>
                    <p class="mt-4 font-weight-bold text-monospace text-larger">
                    Applications
                    </p>
                    <p class="mb-0">
                    Build custom web and mobile applications to engage with your audience
                    </p>
                </div>
                </div>
            </div>
            <div class="m-0 col-12 col-md-6 col-lg-3">
                <div class="text-center border-0 bg-transparent card">
                <div class="px-0 card-body">
                    <i class="material-icons-sharp md-lg">web</i>
                    <p class="mt-4 font-weight-bold text-monospace text-larger">Websites</p>
                    <p class="mb-0">
                    Build new websites or optimise existing pages to improve online
                    visibility
                    </p>
                </div>
                </div>
            </div>
            <div class="m-0 col-12 col-md-6 col-lg-3">
                <div class="text-center border-0 bg-transparent card">
                <div class="px-0 card-body">
                    <i class="material-icons-sharp md-lg">storage</i>
                    <p class="mt-4 font-weight-bold text-monospace text-larger">
                    Data Storage
                    </p>
                    <p class="mb-0">
                    Design and create databases for efficient information storage and
                    retrieval
                    </p>
                </div>
                </div>
            </div>
            <div class="m-0 col-12 col-md-6 col-lg-3">
                <div class="text-center border-0 bg-transparent card">
                <div class="px-0 card-body">
                    <i class="material-icons-sharp md-lg">how_to_reg</i>
                    <p class="mt-4 font-weight-bold text-monospace text-larger">
                    Consulting
                    </p>
                    <p class="mb-0">
                    Empower your organisation through technical knowledge and advice
                    </p>
                </div>
                </div>
            </div>
        </div>
        ```

    ???+ example "JSX"
        ```js hl_lines="24"
        import { memo } from 'react'
        import { Row, Col, Card, CardBody } from 'reactstrap'
        import services from 'data/services.json'

        const Service = (props: {
        icon: string
        title: string
        description: string
        }) => (
        <Card className='text-center border-0 bg-transparent'>
            <CardBody className='px-0'>
            <i className='material-icons-sharp md-lg'>{props.icon}</i>
            <p className='mt-4 font-weight-bold text-monospace text-larger'>
                {props.title}
            </p>
            <p className='mb-0'>{props.description}</p>
            </CardBody>
        </Card>
        )

        const Services = () => (
        <Row>
            {services.map(service => (
            <Col
                xs={12}
                md={6}
                lg={12 / services.length}
                className='m-0'
                key={service.title}
            >
                <Service {...service} />
            </Col>
            ))}
        </Row>
        )

        export default memo(Services)
        ```

## Server-side Applications (Backend)

<div style="display:flex;justify-content:space-around;flex-wrap:wrap;flex-wrap:wrap;">
    <img width="33%" src="../2021-2022-summer/nodejs.png" alt="nodejs">
    <img width="33%" src="../2021-2022-summer/django.png" alt="django">
    <img width="33%" src="../2021-2022-summer/php.jpg" alt="php">
    <img width="33%" src="../2021-2022-summer/postgresql.png" alt="postgresql">
</div>


### How do devices communicate?

- HTTP Request - Hypertext Transfer Protocol

![backend-connection](../2021-2022-summer/images/backend-connection.png)

### What do server applications do?

- Serve frontends (server-side rendering)
- Web API (Application Programming Interface)
    - Serve data (usually from a database)
    - Process Request (Sending emails or SMS, Machine Learning)
 
### Databases
Place to store the data

**Mongodb**

Allows for database design to be modified without complex migration or data loss

**SQL**

Typically faster and better for large amounts of data or systems that need data consistency and reliability

## Others

### Languages of the Web (the usual)
- Python (Django, Flask)
- JavaScript (Node.js, Express)
- Ruby, Go, Rust, C

### Hosting Stuff
Many ways
- Own a server
- Use a 3rd party platform

### CSS Frameworks

**Frontend (JS)**

- Vue, React
- Nuxt.js, Next.js


**Frontend (CSS)**

- MaterialUI, Vuetify
- Bootstrap

### Developer Tools

#### TypeScript
- Type checking is super useful for complex apps
- Allows for way better javascript developer tooling
- Can be annoying if you’re new at it

#### Testing

- Selenium, Cypress
    - End to end automated testing tools
- Jest, Mocha, Pytest
    - Unit testing
- Testing is vital to software projects

#### Continuous Integration / Continuous Deployment

- Automated Testing
- Event-driven scripts
- E.g. Github Action, Bitbucket Pipelines

#### Virtualisation and Containerisation

- Allows execution of services in a virtual environment
  - eg. Docker (Containerisation), Vagrant (Virtualisation)

#### Browsers

- Standard browsers
    - Google Chrome, Firefox, Edge, etc.
- Backwards compatibility
    - Internet Explorer
- Other
    - Mobile - Responsive
    - Screen readers - Accessibility

#### Firefox Developer Tools
- Page Inspector
    - Visualise page aspects
    - Grid layout
- Web Console
    - `console.log(“Hello World”)`
- Responsive Design Mode
    - View from POV of different screen sizes such as mobile, tablets, etc.

??? info "Some more tools"
    - JavaScript Debugger
    - Network Monitor
    - Performance Tools
    - Rulers
    - Colour Pickers
    Learn more at: https://developer.mozilla.org/en-US/docs/Tools

#### Package Managers
- Installs libraries that can be used
- Also has code shortcuts (e.g. npm run start)

(More about `package.json` and `poetry.toml` in the projects and Package Manager Workshop)

#### Version Control
- Essential for developer teams and complex software development
- Git

#### Linters and Formatters
- Makes code formatting consistent (following standard)
- Useful with version controls to avoid pointless change

eg.ESLint, Prettier

#### Teamwork
- Many tools out there
- Used to stop teams from stepping on each others toes
- Github Issues + Pull Requests

### Roadmaps
There's an open-source community that maintains a learning roadmap for developers. See [https://roadmap.sh/](https://roadmap.sh/)

??? info "Frontend Developer"
    ![frontend-roadmap](https://roadmap.sh/roadmaps/frontend.png)

??? info "Backend Developer"
    ![backend-roadmap](https://roadmap.sh/roadmaps/backend.png)

??? info "Dev-Ops"
    ![devops-roadmap](https://roadmap.sh/roadmaps/devops.png)

## Word of Encouragement

??? quote "Encouragement from the Tech Lead"
    "I can admit that this journey of learning will be difficult, and can sometimes be overwhelming and demotivating. Please, if at any point of this project, you feel that you don't know enough, or you're feeling lost, please reach out! We are all in this journey together! Nobody is born talented, skills are honed with determination and willingness to learn." 

    "When I was a first year student entering on the CFC winter project, I didn't feel like I was good enough. I couldn't create a good looking interface, I didn't know how to use npm and all sorts of those things. I was just like many of you! if I gave up just because of all those things I didn't know, of all those self-doubts, then I wouldn't be here today. I admit that I was lucky because I was in CFC, I had connections where I can just ask questions instead of feeling lost of not knowing. So please do leverage that opportunity to reach out" 

    "You being in this project not only gives you the opportunity to raise your talents, but you also unlock one of the biggest factor of the growth of your career, and that is the connections with your fellow software engineers."





