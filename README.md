# Argolight-rocket
A mini-project realized for Argolight company

## Prerequisites

Before cloning, ensure you have the following prerequisites met:

- Node.js installed on your system

- npm package manager installed

## How to start project 
### Back-End

To start the API, head to argoligh-rocket-api folder and use these 3 command lines

```cmd
npm install
npm update
npm run start
```

### Routes
#### User routes

```
POST /user/signup
POST /user/signin
```

In order to test the rockets routes, you first need to get a JWT Token to be authenticated. To do so, use an API testing tool (like ThunderClient or Insomnia), and create yourself a user using `/user/signup` route. 

Then, enter the username & password you just created using `/user/signin` route in JSON format (body section) like so

```json
{
  "username": "myUsername",
  "password": "myPassword"
}
```

Once you get the access token in response, use it in Authentication Bearer section to access others routes (the token will expire in 30 minutes, when it does, repeat the sign in process above to get another one).

You can now access the mongodb atlas datababase and test the different routes !

Rockets routes
```
GET /rockets
GET /rockets/:id
POST /rockets
PATCH /rockets/:id
DELETE /rockets/:id
```


### Front-End

🚧 WIP 🚧

## Documentation & Credits
### Documentation

- SpaceX <a href="https://www.spacex.com/">website</a> to fetch datas & pictures

- <a href="https://www.electronjs.org/fr/docs/latest/tutorial/tutorial-first-app">Electron</a> & <a href="https://vuejs.org/guide/introduction.html">Vue</a> websites documentation to get a better understanding on how Electron/vue3 works and how to work with it

### Credits
Thanks to these fellows for their contents that helped me through this whole process 🙏

- <a href="https://www.youtube.com/watch?v=ExcRbA7fy_A&list=PL4cUxeGkcC9h77dJ-QJlwGlZlTd4ecZOA&index=1">Net Ninja</a> for his clear and excellent MongoDB tutorial

- <a href="https://www.youtube.com/watch?v=LnRCX074VfA">Justin Brooks<a/> to setup Electron & vue all together

- <a href="https://www.youtube.com/watch?v=NRxzvpdduvQ">Simon Dieney</a>'s beginner friendly tutorials that introduced me to node.js, express, react
