'use strict';
//server setup and config
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const authRouter = require('./auth/router');
const notFoundHandler = require('../middleware/404');
const errorHandler = require('../middleware/500');
const app = express();

//middleware functions
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
//Routes 

app.use('/',authRouter)

//Rout for test the 500 handler
app.get('/bad',()=>{
  throw new Error();
})


//Errors middleware handler 
app.use('*', notFoundHandler);
app.use(errorHandler);





//Start listening function
function start (port){
  app.listen(port,()=>{
    console.log(`listening at port : ${port}`)
  })
}

module.exports = {
  server : app ,
  start : start
}
