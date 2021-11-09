# Welcome to System Health Lab MkDocs Tutorial and Template
This is a tutorial and template based from [Mkdocs Frinze Template](https://github.com/frinzekt/mkdocs-frinze-template). This is a template that contains extensions that are very nice to have when you just want a standard documentation for anything!

For full documentation visit:

- [mkdocs.org](https://www.mkdocs.org) for the generic MkDocs
- [PyMdown Extensions](https://facelessuser.github.io/pymdown-extensions/) for the different extensions that are installed
- [MkDocs Material](https://squidfunk.github.io/mkdocs-material/) for the customisation of the web server documentation.

## What do I hope to achieve with this tutorial and template?
This tutorial and template has 2 main purpose:

1. Make the documentation setup easier and accessible for everyone (template)
2. Teach Markdown (tutorial)

## How easy is this to deploy?

1.  Clone This [Repo](https://github.com/uwasystemhealth/shl-mkdocs-tutorial-and-template) or press the big green button "Use this template"
   1. Follow the [installation](#installation)
2. Delete the markdown files here and replace it with your own
3. Change a couple of things in the `mkdocs.yml` file (there are comments around it to make it easier)
4. Modify the `nav` in the `mkdocs.yml` file or delete it (Mkdocs will sort you documentation files to display)
5. Deploy somewhere ! (easist way Github Pages see [here](#commands))
   

## Installation
Install this preferably in your global environment because this is just a code generator and so.
```
pip install -r requirements.txt
```
## Commands

* `mkdocs new [dir-name]` - Create a new project.
* `mkdocs serve` - Start the live-reloading docs server. Very helpful when you want to take a look at the docs before deploying.
* `mkdocs build` - Build the documentation site.
* `mkdocs -h` - Print help message and exit.
* `mkdocs gh-deploy` - Deploy in github pages

## Project layout
```
    mkdocs.yml    # The configuration file.
    docs/
        index.md  # The documentation homepage.
        ...       # Other markdown pages, images and other files.
```

## Extending this template

This template is made to be simple such that it gives you a brief overview of how you would be writing your documentation with a few configuration. This is the type of documentation that you just build on top of.

If in the scenario that you feel that I missed that is essential to be in the template, please feel free to give this repository a pull request. However, if you feel that you would like to extend this template much more, I would highly recommend to visit the original [Mkdocs Material Documentation](https://squidfunk.github.io/mkdocs-material/customization/).


## About this tutorial

There are 4 main portion of this tutorial, which are ordered sequentially:

1. Overview and Installation of Mkdocs (the current documentation you are looking at)
2. Writing Markdown
3. Flavoured Markdown
4. Deployment and Automated Deployment