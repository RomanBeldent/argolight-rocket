# Argolight-rocket
A mini-project realized for Argolight company

## Prerequisites

Before cloning, ensure you have the following prerequisites met:

- Node.js installed on your system

- npm package manager installed

## How to start project 
### Back
To start the API, head to argolight-rocket-api folder and use these 2 command lines

```cmd
npm install
npm run start
```

### Front
To run the application with Electron, head to argolight-rocket-front and use these 2 command lines

```cmd
npm install
npm run electron:serve
```

You only need to create an account in order to connect to the application, if you don't already have one.

Enjoy !

### Routes
#### User routes

```
GET /user/details
POST /user/signup
POST /user/signin
```

#### Rockets routes
```
GET /rockets
GET /rockets/:id
POST /rockets
PATCH /rockets/:id
DELETE /rockets/:id
```

## Documentation & Credits
### Documentation

- SpaceX <a href="https://www.spacex.com/">website</a> to get some datas & wonderful pictures

- <a href="https://www.electronjs.org/fr/docs/latest/tutorial/tutorial-first-app">Electron</a> & <a href="https://vuejs.org/guide/introduction.html">Vue</a> websites documentation to get a better understanding on how Electron/vue3 works and how to work with it

- <a href="https://tsmx.net/convert-existing-nodejs-project-from-commonjs-to-esm/">Convert an existing NodeJS project from CommonJS to ESM / ECMAScript</a>

### Credits
Thanks to these fellows for their contents that helped me through this whole process 🙏

- <a href="https://www.youtube.com/watch?v=ExcRbA7fy_A&list=PL4cUxeGkcC9h77dJ-QJlwGlZlTd4ecZOA&index=1">Net Ninja</a> for his clear and excellent MongoDB tutorial

- <a href="https://www.youtube.com/watch?v=LnRCX074VfA">Justin Brooks<a/> to setup Electron & vue all together

- <a href="https://www.youtube.com/watch?v=NRxzvpdduvQ">Simon Dieney</a>'s beginner friendly tutorials that introduced me to node.js, express, react
