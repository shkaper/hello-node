

# hello-node

This is a simple wannabe-CRM web application written in Node.js. The project utilizes Mongoose as an ORM for MongoDB and Cucumber.js to run tests using WebdriverIO.

## Usage  
### Install node.js  
Follow the instructions on http://nodejs.org/download/  
### Install MongoDB and Mongoose
1. Install MongoDB from here: http://docs.mongodb.org/manual/
2. Run mongod service (with default settings) from terminal:  
```Shell
$ mongod
```
3. Install Mongoose for easier work with MongoDB:  
```Shell
$ npm install mongoose  
```
### Install formidable
Formidable is a module that makes parsing form data pleasant:  
```Shell
$ npm install formidable
```
### Setup selenium server and webdriver  
1. Download and start selenium server:  
```Shell
$ curl -O http://selenium-release.storage.googleapis.com/2.43/selenium-server-standalone-2.43.1.jar  
$ java -jar selenium-server-standalone-2.43.1.jar  
```
2. Download WebdriverIO (selenium webdriver for JavaScript):  
```Shell
$ npm install webdriverio  
```
### Start server  
In the project folder run:  
```Shell
$ node index.js  
```
### Optionally: run tests
Cucumber.js is already present in this project, so you can just run  
```Shell
$ npm test  
```
without installing it. 

Enjoy!
