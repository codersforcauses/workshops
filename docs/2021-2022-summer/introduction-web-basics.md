# Introduction to the Web Basics - HTML, CSS & JavaScript
*The tools of the web*

This workshop will introduce you to the basics of HTML, CSS and JavaScript, the fundamental technologies of web development. This is a very introductory workshop, and there is still so much we can learn, but this will be a good place to start.

## Content
  - [Key Web Technologies](#key-web-technologies)
  - [HTML](#html)
    - [Elements](#elements)
    - [Attributes](#attributes)
    - [Images](#images)
    - [Anchors/Hyperlinks](#anchors-and-hyperlinks)
    - [Forms](#forms)
    - [Document Object Model](#document-object-model)
  - [CSS](#css)
    - [CSS Format](#css-format)
    - [Rules of Selection](#rules-of-selection)
    - [Document and External Style Sheets](#document-and-external-style-sheets)
    - [Flexboxes](#flexboxes)
  - [JavaScript](#javascript)
    - [The Basics of JavaScript](#the-basics-of-javascript)
    - [Arrays](#arrays)
    - [Objects](#objects)
    - [Functions](#functions)
    - [Loops](#loops)
  - [Web App Tutorial](#creating-a-pokemon-api-webapp)

## Key Web Technologies
HTML, CSS and JavaScript each have a different job when it comes to creating web pages.

### What do they do?
- [HTML](#html): describes the content and structure of the web page
- [CSS](#css): describes the style and appearance of the web page
- [JavaScript](#javascript): provides funtionality to a web page
  
![basics of web 2](../images/../2021-2022-summer/images/basics-of-web-2.jpg)

## HTML
Hyper Text Markup Language (HTML) is used to structure the webpage. The general structure of a webpage can be seen below.

???+ example "My First HTML Page"
    ```html
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <title>You see this text on your browser tab!!!</title>
        </head>
        <body>
            <!-- this is where the content goes! -->
            <h1>My First Heading</h1>
            <p>This is a paragraph</p>
        </body>
    </html>
    ```

### Elements
A webpage is made of elements, each with their own properties, that contain content to be displayed on the page. Elements are defined by tags, such as `h1`, `div` and `body`. Most elements have an open and close tab. The container and its content, together, are called an element.  
```html
<h1>This is a header element.</h1>
```
  
The most notable, and probably the tag you will use most, is the `<div>` tag. It defines a division or section within the HTML document, and is used as a container that holds other elements.
???+ example "The Seperator"
    ```html
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <title>The Web Dev Fairytale</title>
        </head>
        <body>
            <div>
                <!-- This div concerns itself with the main heading/title of the story -->
                <h1>The Dev, the Debugger and the Caffiene Addiction</h1>
            </div>
            <div>
                <!-- This div concerns itself with the first chapter it its entirety -->
                <h1>Chapter 1</h1>
                <div>
                    <!-- This div concerns itself with the text of the first chapter -->
                    <!-- section within a section. A subsection! -->
                    <p>Once upon a time, in a castle far, far away...</p>
                </div>
            </div>
            <div>
                <h2>Chapter 2</h2>
            </div>
        </body>
    </html>
    ```

We will go through the important ones during this workshop, but you can find the full of them <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element" target="_blank">here</a>.  
  
  
### Attributes
Most tags have attributes that specify information or change the tag in some way. The most common being `class` and `id`.  

#### Most Common Attributes
- `class`: used to specify one or more class names for a HTML element.
    - Classes are used to group certain elements in order to give them specific features through CSS and to allow many elements to be manipulated using JavaScript. 
- `id`: used to specify a unique id for an element and must be unique
    - The `id` attribute is assigned to an element so that element can be exclusively specified in the style declaration and JavaScript manipulation
  
Below is an example of how attributes are assigned in your code.
???+ example "Elements and their Attributes"
    ```html hl_lines="6 7 9 12"
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <title>You see this text on your browser tab!!!</title>
        </head>
        <body style="background-color: red">
            <div class="bigSection">
                <h1>BIG HEADER!</h1>
                <p id="first">This is the first paragraph of the webpage</p>
                <!-- more cool stuff goes here -->
            </div>
            <div class="smallSection">
                <h6>small header</h6>
            </div>
        </body>
    </html>
    ```
  
### Images
Images are added by using the `<img>` element tag. It can also be used to add gifs!
???+ example Adding an image in HTML
    ```html
    <img src="https://i.imgur.com/SjZxZza.jpeg" alt="Three Cute Dog Mermaids">
    ```
<img src="https://i.imgur.com/SjZxZza.jpeg" alt="Three Cute Dog Mermaids" style="display: block; width: 30%; margin-left: auto; margin-right: auto">
Cute, right?
  
#### Image Attributes
- `src`: specifies the location of the image to be displayed
    - This can either be a url, as in the example above, or the relative path of an image within the site's directory
- `alt`: an optional attribute that contains a text description.
    - Is useful for accessibility or if the image does not load properly 
  
### Anchors and Hyperlinks
We can add links to other websites, or even to sections within the same page, using the `<a>` element, known as an anchor.
???+ example "Adding a hyperlink to an HTML page"
    ```html
    <a href="https://codersforcauses.org/" target="_blank">Coders for Causes</a>
    ```
They can be adding added by themself, or within text such as <a href="https://codersforcauses.org/" target="_blank">here</a>.
  
#### Anchor Attributes
- `href`: specifies the destination to link to
    - External site: simply include the url you wish to visit
    - Different page within the site: include the path to the new page, usually in the form of `"/.../index.html"`
    - Different section on same page: use `#name_of_section` where `name_of_section` is the `id` of the element you wish to go to
- `target`: specifies where to open the link
    - Setting the target attribute to `"_blank"` opens the link in another tab
- `download`: specifies that the linked resouces will be downloaded.
    - Only needs to be included in the declaration of the element
    - Optional: if value of download is set, that value will be the name of the file
  
Always be careul when clicking links. You never know when there is something you <a href="/images/../2021-2022-summer/images/bon.jpg" download="bon">should not click.</a>
  
#### Images and Hyperlinks
Any image, or any element in general, can be turned into a link by enclosing the element within the anchor tabs.
???+ example "Hyperlinked image"
    ```html
    <a href="https://codersforcauses.org/" target="_blank">
        <img src="https://www.uwastudentguild.com/assets/clubs/logos/logo---coders-for-causes-1567649329.jpg">
    </a>
    ```
<a href="https://codersforcauses.org/" target="_blank">
    <img src="https://i.ytimg.com/vi/Dj3pmxlWM6s/maxresdefault.jpg" style="display: block; width: 50%; margin-left: auto; margin-right: auto">
</a>
  
### Forms
Forms are used to collect user input. They are defined by the `<form>` tags and usually contain form elements such as `<input>`, `<textbox>`, etc.  

Inputs can come in many different forms, such as textboxes, radio buttons, checkboxes and drop down menus. Each input field is given a `value`  
Once a form is complete and filled out, we need to submit, or POST, it. This can be done through a special input of type `submit`.  

The only required attribute of `<form>` is `action`. The `action` attribute speicifies the URL of the application that is to be called when the Submit button is pressed. If no action, then the attribute takes the value of an empty string and the current page is the destination.
  
???+example Forms
    ```html
    <p>I like:</p>
    <form action="">
        <input type=”radio” value=”Red”>
        <input type=”radio” value=”Green”>
        <input type=”radio” value=”Blue”>
        <input type=”submit” value=”Submit”>
    </form>
    ```
  
#### Input Validation
Input validation is a very important aspect to consider when dealing with forms. Remember the famous acronym GIGO, Garbage-in Garbage-Out.  
To assist you with input validation, HTML forms have in-built validation for different types of data, such as emails, numbers and dates. This can be achieved by changing the input type of a field to the respective data entry type.
???+ example "Baseline input validation with HTML"
    ```html
    <input type="email" name="email" value="Email">
    ```

### Document Object Model
All the elements of a HTML page make up a document tree, called the Document Object Model (DOM).  
![Document Object Model](https://www.w3schools.com/js/pic_htmltree.gif)  
The DOM is a platform and language-neutral interface that allows programs to dynamically access and update the content, structure and style of the HTML document. Each element in a HTML document is represented by a node on the tree.  
We can then use things such as JavaScript to access and update the HTML document using the DOM. We will see more of this in the tutorial at the end.
  

## CSS
Cascading Style Sheets (CSS) provides style to the web. It is used to specify the layout and style of markup languages. CSS tells the browser *how* to display the elements that are written in HTML.
  
We can write the CSS style rules into an element using inline CSS, where the `style` attribute of an element is modified directly in the HTML.

???+ example "Inline style sheets"
    ```html hl_lines="1"
    <body style="background-color: red;">
        <!-- rest of body goes here -->
    </body>
    ```
  
However, this gets hard to manage and maintain, especially when the number of elements in a document grows, and when we want to change many elements that have the same style.  
We use *document-level* style sheets or *external* style sheets to combat this issue.
  
But first, we must understand how to create these style sheets.
  
### CSS Format
- Selector
    - A value, or list of values, that specify the elements for which the following style will be applied to
    - Rules for specification will be discussed a little later on, [see here](#rules-of-selection)
- Attribute
    - The attribute/property of an element you wish you change
    - Some example attributes include `background-color`, `font-size` and `width`
- Effect
    - The effect is the value you set each attribute to be
    - This includes setting `background-color` to "red", or `font-size` to "16px"
  
The following CSS specifies that all `img` elements are to be centered and have a width of 50 pixels.
???+ example "My First CSS"
    ```css
    img{
        /* attribute: effect; */
        display: block;
        margin-left: auto;
        margin-right: auto;
        width: 50px;
    }
    ```

??? info "How do I know what attributes exist, and what do I change to get my desired effect?"
    There are two simple answers to this question:  
    1. __Google it.__ Chances are, someone has already tried to do something similar and your solution already exists.  
    2. __Play around__. Learn what attributes exist, and how changing thier effects changes their on screen appearance. 
  
### Rules of Selection
As mentioned earlier, selectors have a set of rules that allow you to apply styles to certain, or even very specific, groups of elements. These can range selecting elements based on the type of element they are, or what class they are in, to selecting all elements of a certain type that are immediately preceded by an element of another type.

=== "Element"
    Element selectors simply apply the defined style to all elements of the same type.
    ```css
    body{
        background-color: red;
    }
    ```
  
=== "Class"
    Class selectors apply the defined style to all elements belonging to that class. They are similar to element selectors, except that the class name is preceded by a `.` character.
    ```css
    .narrow{
        width: 10%
    }
    ```
  
    We can also specify the type of element within a class we wish to apply the style to by including it before the `.` character.  
    The following code selects all `<p>` elements that are of the class `narrow`:
    ```css
    p.narrow{
        width:10%;
    }
    ```

=== "id"
    These selectors apply the style to an element based on its `id`. The `id` is preceded by `#` in the selector definition.
    ```css
    #bigButton{
        font-size: 16px;
    }
    ```

=== "Psuedo Classes"
    Psuedo classes are styles that apply only when a certian action occurs or a condition is met, and not all the time. Some common selectors include `hover`, `focus` and `active`. They are included after the element, class or id has been specified, and are preceded with a colon `:`.
    ```css
    button:hover{
        color: red;
    }
    ```
    
    The full list of them can be found <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes">here</a>.
  
=== "Group"
    To specify a group of elements to apply a style to, simply list the elements, ids or classes delimitted by a comma (`,`).
    ```css
    h1, h2, div{
        color: red;
    }
    ```

=== "Other"
    There exists other selectors that allow you to be more specific as to what elements are to be selected, such as contextual selectors, but we will leave those as *self-learning*.
    ??? info "Contextual Selectors"
        Contextual selectors group elements based on their position and surroundings in the document tree. 
            ![HTML document tree](http://web.simmons.edu/~grabiner/comm244/weekfour/tree.gif)  
        Further reading into the topic can be found through searching the web for platforms that teach you all about computer science, such as <a href="https://www.geeksforgeeks.org/what-is-contextual-selector-in-css/" taget="_blank">Geeks for Geeks</a>. 
  

### Document and External Style Sheets
Now that we know what we are doing, let's create some style sheets! Document and External style sheets help us better organise and manage the styles of the document. They are located in one location, so you do not have to go far to find them and change parts of your document. 
  
#### Document Style Sheets
Document style sheets are located within the `<head>` of a HTML document, under the `<style>` tag. They work in the same was as mentioned [above](#css-format).  
See the below example of how document style sheets are implemented within a HTML page.  
???+ example "Document Style Sheets"
    ```html hl_lines="6 7 8 9 10 11 12"
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <title>You see this text on your browser tab!!!</title>
            <style>
                body{
                    background-color: blue;
                }
                p{
                    color: red;
                    font-size: 16px;
                }
            </style>
        </head>
        <body>
            <!-- this is where the content goes! -->
            <h1>My First Heading</h1>
            <p>This is a paragraph</p>
        </body>
    </html>
    ```
  
#### External Style Sheets
What happens when our site grows, and the number of HTML pages increases, and suddenly styles have to change, and we have to change every document, but they all have to follow the same styling as the others, and we have to manage that?!  
Thankfully, we can store our styles in a seperate `.css` file and then simply reference the stylesheet in our HTML document.
???+ example "styles.css"
    ```css
    body{
        background-color: blue;
    }
    p{
        color: red;
        font-size: 16px;
    }
    ```
Once we have our css file completed, we can reference it in the HTML document, again in the `<head>`, so that it can apply the styles to our document.
???+ example "Applying my CSS files to my HTML document"
    ```html hl_lines="5"
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <title>You see this text on your browser tab!!!</title>
            <link rel="stylesheet" href="styles.css">
        </head>
        <body>
            <!-- this is where the content goes! -->
            <h1>My First Heading</h1>
            <p>This is a paragraph</p>
        </body>
    </html>
    ```


    
### Flexboxes
Flexboxes are a great way to position your items within a container.  
  
Learning is best done when having fun and getting your hands dirty (metaphorically). <a href="https://flexboxfroggy.com/">Flexbox Froggy</a> is an interactive website that teaches you all about flexboxes, one step at a time. Your aim is to allign all the frogs to their corresponding lilypads. It is a much better learning tool than sitting and reading about some code I wrote.  
<iframe src="https://flexboxfroggy.com/" title="Learn Flexboxes the fun way" height="720" width="100%"></iframe> 

## JavaScript
JavaScript, also known as JS, gives a web page fucntionality and reactiveness. It allows the user to interact with the web page, and for us to make it to do things that we want it to do.  
Similar to CSS, all your JS can be implemented into a HTML document by encapsulating it in the `<script>` tag within the `<head>` of the document, or even `<body>` in this case. However, we will be sticking to having our JS stored in external files for ease of managability.  
See the below example of how to add a script file to your page. To add many files, simply add another `<script>` element and reference the other file.
???+ example "Adding JavaScript to my HTML document"
    ```html
    <script src="script.js"></script>
    ```
  
### The Basics of JavaScript
We shall discuss the basic syntax of JS, such as variables and functions, just to get you started. Feel free to do some of your own learning, too. There is a lot of cool things you can do and shortcuts you can use when you dive deeper into JavaScript, such as the *<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator" target="_blank">ternary operator</a>*, but we will leave these for now.

#### Variables
Variables are named memory locations that store data.  
To define a variable, we can use three different keywords, each giving the variable special properties.

##### Variable Declaration
- `var`
    - allows the variable to be redeclared later on in the program
    - gives the variable a global scope, meaning they can be accessed anywhere within the file
- `let`
    - once a variable has been declared using `let`, it cannot be redeclared. It's value can still change, however.
    - gives the variable *block scope*, meaning it can only be accessed within the block of code that it has been declared in.  
    For example, if I declare a variable using the `let` key word, I cannot access it outside of the function.
- `const`
    - Once the variable has been declared and assigned, it cannot be redeclared and the value never changes. It stays *constant*, sort of.
    - It, too, gives the variable block scope.
  
For a full explanation on variable declaration in JS, check out <a href="https://www.w3schools.com/js/js_variables.asp" target="_blank">w3schools' page on it.</a>  
  
Variables can hold different data types, such as numbers, strings, objects, functions and arrays, but JS will cover the type identification for you.
  
##### Datatypes
- There are two groups of data types in JS: primitives and structural.
- A **primitive** is data that is not an object and has no methods.  
There are seven primitive data types:  
    - String, Number, BigInt, undefined, null and symbol   
- A **structural** data type is one where the data is in the form of an object, and that object has its own methods. The main structural data types are:  
    - [Objects](#objects) and [Functions](#functions) 
  
#### Math and Logic
Math and logic works similar in JS to other programming languages.  

##### Math
- `+`, `-`: addition and subtraction
- `*`, `/`: multiplication and division, respectively.
- `%`: modulo operator. Returns the remainder left over after division.
    - For example, `8 % 3` returns 2.
- `**`: exponent (*x to the power of y*)
    - `base ** power`

##### Logic
- `&&`: AND operation
- `||`: OR operation
- `!`: NOT operation
- `>`/`>=`: greater than/greater than or equal to
- `<`/`<=`: less than/less than or equal to
- `==`: equal to
- `===`: exactly equal to
    - Works in a similar way to `==`, except it also checks that the datatype is the same
???+ example "Difference between == and ==="
    ```javascript
    console.log("2" == 2);  /* true */
    console.log("2" === 2); /* false */
    ```
  
### Arrays
Arrays are an ordered list of values. They can hold values of many datatypes. Their index starts at 0.
```javascript
let myArray = ["a", "b", "c", 1, 2 ,3, {name: "Jared", age: 19, canRead: false}]
myArray[0] // returns "a"
myArray[4] // returns 2
```
  
### Objects
Objects are variables that can hold more than one value. One can be seen in the previous example in [Arrays](#arrays).  
The different values of an object are called keys. The keys can hold regular primitive values, such as numbers or strings, or can hold other objects, such as functions. Think of Objects as a list of key/value pairs.  
  
To access a key's value within an object, you must first reference the object in question, then insert a `.` folllowed by the key you wish to get.
???+ example "Objects in JavaScript"
    ```javascript
    let person = {
        name: "Jared",
        age: 19,
        canRead: false
    }
    console.log(person.age) // outputs 19
    ```
  
### Functions
Functions are blocks of code designed to execute a particular task.  
In JS, the syntax for defining a function is as follows:
???+ example "Functions in JavaScript"
    ```javascript
    function func_name(parameter1, parameter2, ...){
        // your code goes here (optional, but highly recommended)
    }
    ```
Functions can be called or stored in variables.
???+ example "Calling and Storing Functions"
    ```javascript
    function hello_world(){
        console.log("Hello, world!")
    }

    // Calling the function
    helloWorld()

    // Storing the function in a variable
    const func_name = function (param1, param2){
        // do stuff here
    }
    ```
Functions can return a value (after calculation, etc) or simply perform work on existing data/variables. Functions that do not return anything are normally called *procedures*.
  
#### Arrow Functions
Arrow functions are just a compact way of writing normal functions.  
They work by removing the `function` key word, and even the `return` keyword in some cases.  
Arrows functions lead with their parameters, usually enclosed in normal brackets. An arrow `=>` then follows, preceding the actual block of code to be executed.
???+ example "Arrow Functions: Example 1"
    ```javascript
    // Traditional function
    function addXY (x, y){
        return x + y;
    }

    // Arrow function
    let addXY = (x, y) => x + y;
    ```
In single-lined functions, such as the one above, both the { braces } and the `return` can be omitted. However, when there are extra lines of processing, both must be included.  
???+ example "Arrow Functions: Example 2"
    ```javascript
    // Traditional
    function add10(x, y){
        x += 10
        y += 10
        return x + y;
    }
    
    // Arrow function
    let add10 = (x, y) => {
        x += 10
        y += 10
        return x + y;
    }
    ```
  
### Loops
=== "For"
    For loops repeat until a condition is met. That condition is defined in the for loop. For loops have the following structure:
    ???+ example "For Loops"
        ```javascript
        /*
        for(int i = start; condition; increment){
            // code here
        }
        */

        // Loop 10 times
        for(int i = 0; i < 10; i++){
            console.log(i)
        }
        // Output: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
        ```

=== "For-in"
    For-in loops iterate over the indexes of data in an iterable object, such as an array.  
    ???+ example "For-in Loops"
        ```javascript
        let myArray = [2, 4, 6]
        for(let j in myArray){
            console.log(j)
        }
        // Output: 0, 1, 2
        ```

=== "For-of"
    For-of loops iterate over the data in the iterable object.  
    ???+ example "For-of Loops"
        ```javascript
        let myArray = [2, 4, 6]
        for(let k of myArray){
            console.log(j)
        }
        // Output: 2, 4, 6
        ```

=== "While"
    While loops iterate while a condition is true. They are called a "pre-test" loop, where the condition is tested before the loop can run. The condition is included in the brackets.
    ???+ example "While Loops"
        ```javascript
        let b = 0
        while(b < 3){
            console.log("Bon")
            b++
        }
        // Output: "Bon\n Bon\n Bon\n"
        ```

=== "Do-while"
    Do-while loops are similar to while loops, except that they let the block of code run once before testing the condition. They are known as "post-test" loops, and the loop is guaranteed to execute at least once.  
    ???+ example "Do-while Loops"
        ```javascript
        let b = 0
        do {
            console.log("Bon")
            b++
        } while(b > 10)
        // Output: "Bon\n"
        ```

Loops can be broken or stopped using the `break` or `continue` statements.
#### Breakin' out
- `break`: execution leaves the loop completely and continues on with the next lines of code
- `continue`: disregards the rest of the code in the loop block and moves on to the next item in the loop

## Creating a Pokemon API Webapp
Now that we know a little bit about the tools of the web, let's build a simple web app that uses the skills we have learnt in this workshop, as well as some other skills we will learn along the way, to create an app that can do something cool. 
   
For this tutorial, we will pay homage to the recent releases of Pokemon Brilliant Diamond and Shining Pearl, of which I have spent an embarrassing number of hours on since they came out about a week ago, and create a web app that uses the PokeAPI to display images and information about any Pokemon we want.  
  
This tutorial will take place at 4:30pm AWST on the 31st of November, 2021 via the CFC Discord server. The recording of that tutorial will be here once it has finished.
  
  
[Back to Top](#content)



