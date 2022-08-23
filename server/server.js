const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes/route');

// this is to include env file into the server file 
// it is to take the important data that is not available to all 
require('dotenv').config({path : "./config.env"})
const port = process.env.PORT || 5000;

//use middlewares
app.use(cors());
app.use(express.json());

// mongodb connection
const conn = require("./db/connection.js");

// using routes
app.use(require('./routes/route'));

conn.then(db=>{
    if(!db) return process.exit(1);

    // listen to http server 
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    })

    app.on('error',err => console.log(`Failed to connect to HTTP server : ${err}`))

    // error in mongodb conn 
    
}).catch(error => {
    console.log(`Connection Failed...! ${error}`);
})
