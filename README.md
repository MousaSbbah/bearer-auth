# basic-api-server

**V1.1**

## Author

Mousa Sabah

## About

Express server that implements Basic and bearer Authentication, with **signup** and **signin** capabilities, using a Mongo database for storage.

## Deployment

This project use Heroku to deployment

API Live Url: **https://mousa-bearer-auth.herokuapp.com/**

## Pull Request

This is the Main Pull Request for this project :
https://github.com/MousaSbbah/bearer-auth/pull/1

## Setup

.env requirements

      PORT - 3030
      MONGOOSE_URI -  mongodb://********************

## Running the app

```
npm start
```

Endpoint:

- `/signup`
  After sign up with you unique username the server will Return JSON objects for your info
  ```json
    {
     "user" : {
                 "_id": "60aac2f016ea1300151a5a15",
                 "username": "User03",
                 "password": "$2b$10$V9k1bLak6aObNxm4iTe0J.qsBRjK8n18hU.z0aQBalDZFEIWYa9oy",
                 "__v": 0
              }
      "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlVzZXIzMzMiLCJpYXQiOjE2MjE5NjYxODEsImV4cCI6MTYyMTk2NzA4MX0.0QlVteHsTA46PdXewapnw6EKaEGExgGoAGUo4StbfVg"
    }
  ```
- `/signin`
  After sign in with correct username and password the server will
  Return JSON objects
  ```json
   { "user" : { 
     "_id": "60aac2f016ea1300151a5a15",
      "username": "User03",
       "password": "$2b$10$V9k1bLak6aObNxm4iTe0J.qsBRjK8n18hU.z0aQBalDZFEIWYa9oy",
        "__v": 0 } 
    "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlVzZXIzMzMiLCJpYXQiOjE2MjE5NjYxODEsImV4cCI6MTYyMTk2NzA4MX0.0QlVteHsTA46PdXewapnw6EKaEGExgGoAGUo4StbfVg" } 
   ```

- `/users`
  if you try to get user by bearer auth with correct token the server wil
  Return JSON objects
  ```json
  {
  "_id": "60aac2f016ea1300151a5a15",
  "username": "User03",
  "password": "$2b$10$V9k1bLak6aObNxm4iTe0J.qsBRjK8n18hU.z0aQBalDZFEIWYa9oy",
  "__v": 0
  }

      ```

## Tests

Github actions link :****

**Unit Tests:**

```
npm run test
```

and to try the server you can use this [Web Application](https://javascript-401.netlify.app/basic-auth)

##

## UML

![uml](uml.png)
