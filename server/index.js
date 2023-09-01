  const app = require('express')();
  const http = require('http');
  const PORT = process.env.PORT || 5000;
  const socketio = require('socket.io');
  const cors = require('cors')

  app.use(cors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: 'Content-Type,Authorization',
    }));

  const server = http.createServer(app);
  const formatMessage = require('./utils/formatMessage')
  const io = socketio(server);

  const botName = "QuickChat Bot"

  io.on('connection', socket=>{
      console.log(`New Connection Created with socket id ${socket.id}` );

      socket.emit('message',formatMessage(botName,'Welcome to QuickChat'))

      socket.broadcast.emit('message', formatMessage(botName,'A User has joined the Chat'));

      socket.on('disconnect',()=>{
        io.emit('message',formatMessage(botName,'A User has left the Chat'))
      });

      socket.on('chatMessage' ,info=>{
        // console.log(`${info.username} ${info.message}`)
        io.emit('message',formatMessage(info.username,info.message))
      })

  })
  
  server.listen(PORT,()=>{ console.log(`Server is Listening at Port ${PORT}`)})
