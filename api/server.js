const express = require('express');


const authRouter = require('../routers/authRouter');
const usersRouter = require('../routers/usersRouter')

const server = express();
server.use(express.json());


server.use('/api', authRouter);
server.use('/api/restricted', usersRouter)

server.get('/', (req, res) => {
  res.send("It's alive!");
});

module.exports = server;