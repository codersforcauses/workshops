# Introduction to Web Development Space
*Navigating the Deep Dark Space of Web Development*

## What and Why Web Development?

### What is web development?
- Websites development
- Web applications (client-side and server-side) development

### Why Web Development ?

- Accessibility and Portability
- Career and On-demand in job market
- Huge possibility to combine with other emerging technologies (e.g. IoT, Machine Learning) and industry (e.g. Health, Mining, O&G)

??? info "Career in Web Development"
    Source: [Insights from Stack Overflow’s 2016 survey of 50,000 developers](https://www.freecodecamp.org/news/2-out-of-3-developers-are-self-taught-and-other-insights-from-stack-overflow-s-2016-survey-of-50-8cf0ee5d4c21/)

    "Half of Developers are Web Developers"
    ![occupation](https://cdn-media-1.freecodecamp.org/images/1*l3TGs4XuDhqGfIdeef9AeA.jpeg)


## FAQs about Web Development

### Why code websites, why not use drag and drops like Wordpress, WIX?

<div style="display:flex;justify-content:space-around;">
    <img style="width:100%" src="../images/wordpress.png" alt="wordpress">
    <img style="width:100%" src="../images/wix.jpg" alt="wix">
    <img style="width:100%" src="../images/drupal.jpg" alt="drupal">
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


## Basics of Web and Limitation

![basics of web 2](../images/../2021-2022-summer/images/basics-of-web-2.jpg)

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

        ![react](../images/../2021-2022-summer/images/react.png)

    === "Vue.js"
        - Growing fast in popularity and use.

        ![vue](../images/../2021-2022-summer/images/vue.png)



    **General Information**

    - Both are good to use and learn. 
    - Knowledge is transferable between the two frameworks.

??? info "Comparison between HTML and JSX"
    ![sample](../images/../2021-2022-summer/images/sample.png)

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

<div style="display:flex;justify-content:space-around;flex-wrap:wrap;">
    <img width="100vw" src="../images/nodejs.png" alt="nodejs">
    <img width="100vw" src="../images/django.png" alt="django">
    <img width="100vw" src="../images/php.jpg" alt="php">
    <img width="100vw" src="../images/postgresql.png" alt="postgresql">
</div>


### How do devices communicate?

- HTTP Request - Hypertext Transfer Protocol

![backend-connection](../images/../2021-2022-summer/images/backend-connection.png)

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
