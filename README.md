Hippo Theme
===========

The Hippo theme is a centralised library containing reusable components for Hippo-related projects.
You can use it to create clickable mockups or end-projects that need to be in line with the Hippo styling.

## Development environment setup
#### Prerequisites

* [Node Package Manager](https://npmjs.org/) (NPM)
* [Git](http://git-scm.com/)

#### Dependencies

* [Grunt](http://gruntjs.com/) (task automation)
* [Bower](http://bower.io/) (package management)

#### Installation
Run the commands below in the project root directory.
#####1. Install Grunt and Bower

    $ sudo npm install -g grunt-cli bower
    
#####2. Install project dependencies

    $ npm install
    $ bower install

## Useful commands

####Generate build
The build version is located in the `dist` directory.

    $ grunt build

####Run tests
The tests need to pass in order to generate a build.

    $ grunt test:unit

####Setup server
The browser will open a page (`example/index.html`) with shows all compontents available for the theme.

    $ grunt server
