# Dropbox Browser 

Dropbox Browser is a simple web application built using [Node.js](http://www.nodejs.org) and [AngularJS](http://angularjs.org). Dropbox Browser lets you connect to your dropbox account and view/browse through your files and folders. Dropbox Browser also shows you some analytics about your dropbox account.

Live demo: [https://boiling-atoll-43861.herokuapp.com](https://boiling-atoll-43861.herokuapp.com)

## Prerequisites

Make sure you have installed the following on your development machine:
* Git - [Download & Install Git](https://git-scm.com/downloads). OSX and Linux machines typically have this already installed.
* Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager. If you encounter any problems, you can also use this [GitHub Gist](https://gist.github.com/isaacs/579814) to install Node.js.

## Installation

Clone the repo

```bash
$ git clone https://github.com/Shane325/dropbox-browser.git
```

Install npm dependencies

```bash
$ npm install
```

Run the application

```bash
$ npm run start
```

In your browser go to [http://localhost:8080](http://localhost:8080) 

## TODOs and Improvements

I didn't get a chance to finish everything from the requirements. Here's whats left:
* View files.
* Download files.
* Add a breadcrumb to the top of the files and folders panel for better navigation.

And here are some areas I would improve:
* Move all angularjs $http calls into an angularjs service.
* Error handling on both client and server. Right now I'm just logging errors to the console.
* Caching using Redis.
* Testing using Karma on the client side and Mocha on the server side.
* Use a task runner like Gulp to automate the testing and build.

## Deployment 

The app is deployed on Heroku's free tier. Upon deployment Heroku reads the `Procfile` in the code base which contains the following command that runs in production:

```bash
$ npm run prod
```

This command runs node and passes in the production domain name as an environment variable. This is needed for the dropbox authentication redirect. 

## Technology Used

* Node.js 6.9.1
* AngularJS 1.5
* Bootstrap 3
* Font Awesome 4
* [Angular Chart](https://jtblin.github.io/angular-chart.js/)
* [Dropbox Javascript SDK](https://github.com/dropbox/dropbox-sdk-js)
