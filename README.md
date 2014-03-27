Hippo Theme
===========

[![Build Status](https://travis-ci.org/onehippo/hippo-theme.png?branch=master)](https://travis-ci.org/onehippo/hippo-theme)

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

    $ grunt build:dist

####Generate demo website
The build version is located in the `demo` directory. After building you can publish it to the [Hippo Theme Demo](https://github.com/onehippo/hippo-theme-demo).

    $ grunt build:demo

####Run tests
The tests need to pass in order to build the demo.

    $ grunt test

####Setup server
The browser will show the demo website which shows all available compontents for the theme.

    $ grunt server:demo

####Publish to the [Hippo Theme demo repository](https://github.com/onehippo/hippo-theme-demo)
Create an [online demo](http://onehippo.github.io/hippo-theme-demo/) of the Hippo Theme.

    $ grunt publish

## Deployment to Nexus
#### Prerequisites

* [Maven](http://maven.apache.org/)

#### Deployment command

    $ mvn deploy

