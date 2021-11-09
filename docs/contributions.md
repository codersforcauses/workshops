# Contributions
Hi! We are happy that you thought of contributing! If you have any suggestions or issues, please raise it [here](https://github.com/codersforcauses/workshops/issues). I would be happy if you could provide pull requests, if you know how to do it [here](https://github.com/codersforcauses/workshops/pulls).

## Structure

### Folder Structure
The structure of this repo is as follows:

```
├── docs                    // Folders for documentation
│   ├── CNAME
│   ├── contributions.md
│   ├── deployment_and_automated_site_deployment.md
│   ├── flavoured_markdown.md
│   ├── images              // Assets
│   │   └── ...
│   │   
│   ├── index.md
│   └── writing_markdown.md
├── LICENSE
├── mkdocs.yml              // MkDocs Configuration
├── overrides
│   └── partials
│       └── footer.html
├── README.md
└── requirements.txt
```
## Installation
### Python
???+ note "Prerequisite"
    You need to have Python installed to be able to use `pip`.
    There are a few ways of installing Python.
    You can use a package distributor like [Anaconda](https://www.anaconda.com/products/individual)
    Or you can just install [Python](https://www.python.org/downloads/).


Once you have installed Python, install mkdocs requirements by opening a terminal and typing:

```bash
pip install -r requirements.txt
```
??? info "Python Environments (Optional)"
    however, it is good practice to use different environments for different purposes, in which case, for Anaconda, you would open a terminal and type:

    ```bash
    conda create -n mkdocstutorial python
    conda activate mkdocstutorial
    ```
    then enter:

    ```bash
    pip install -r requirements.txt
    ```

### Docker
Just run `docker-compose up`, it should show the web server running at [localhost:8000](http://localhost:8000/)

## Commands

* `mkdocs new [dir-name]` - Create a new project.
* `mkdocs serve` - Start the live-reloading docs server. Very helpful when you want to take a look at the docs before deploying.
* `mkdocs build` - Build the documentation site.
* `mkdocs -h` - Print help message and exit.
* `mkdocs gh-deploy` - Deploy in github pages

## Web Documentation Configuration
For full documentation visit:

- [mkdocs.org](https://www.mkdocs.org) for the generic MkDocs
- [PyMdown Extensions](https://facelessuser.github.io/pymdown-extensions/) for the different extensions that are installed
- [MkDocs Material](https://squidfunk.github.io/mkdocs-material/) for the customisation of the web server documentation.