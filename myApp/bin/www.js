#!/usr/bin/env node

/**
 * Module dependencies.
 */

const app = require('../app');
const debug = require('debug')('myapp:server');
const http = require('http');
const dbconnection = require('../models/initModels');
const { Socket } = require('socket.io');
const Comment = dbconnection.FunficComments;
const User = dbconnection.User;
const port = 3000;

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

const io = require("socket.io")(server, {
  path: '/getcomments',
  cors: {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

io.on("connection", (socket) => {

  socket.on('listen', async (newId) => {

    await socket.join(newId.toString());

    let comments = await Comment.findAll({
      where: { funficId: newId },
      include: User
    });

    if (!comments) socket.emit('get', []);

    let mappedComments = comments.map(comment => {
        return {author: comment.user.name, text: comment.text, createdAt: comment.createdAt}
    });

    socket.emit('get', mappedComments);

    socket.on('new', (comment) => {
      io.to(newId.toString()).emit('add', comment)
    });
  });
});


server.on('error', onError);
server.on('listening', onListening);

dbconnection.sequelize.sync({alter: true})
  .then(()=>{
    console.log("Tables have been synchronized!");
    server.listen(port);
  })
  .catch(err => console.log(err));

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

async function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}