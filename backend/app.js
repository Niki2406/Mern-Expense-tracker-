// const express= require('express')
// const cors = require('cors');
// const {db} = require('./db/db');
// const { readdirSync } =require('fs')
// const app =express ()
// require('dotenv').config()

// const PORT = process.env.PORT


// //middlewares
// app.use(express.json());
// app.use(cors());

// //routes
// //readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))
// readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))

// const server =() =>{
//    db()
//  app.listen(PORT,()=>{
//     console.log('listening to port:',PORT )
//  })
// }
// server()
const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const { readdirSync } = require('fs');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000; // Fallback to 3000 if PORT is not defined

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
try {
  const routes = readdirSync('./routes');
  routes.forEach((route) => {
    console.log(`Loading route: ${route}`);
    app.use('/api/v1', require(`./routes/${route}`));
  });
} catch (error) {
  console.error('Error loading routes:', error);
  process.exit(1); // Exit the process with an error code
}

// Server
const server = () => {
  db()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Listening to port: ${PORT}`);
      });
    })
    .catch((error) => {
      console.error('Database connection failed:', error);
      process.exit(1); // Exit the process with an error code
    });
};

server();
