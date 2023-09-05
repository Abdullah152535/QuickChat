  const app = require('express')();
  const http = require('http');
  const PORT = process.env.PORT || 5000;
  const socketio = require('socket.io');
  const cors = require('cors')
  const {userJoin,getCurrentUser} = require('./utils/users')


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

      socket.on('joinRoom', ({username,room})=>{

        const user = userJoin(socket.id,username,room);

        socket.join(user.room)

        socket.emit('message',formatMessage(botName,'Welcome to QuickChat'))

        socket.broadcast.to(user.room).emit('message', formatMessage(botName,`${user.username} has joined the Chat`));
  
      })
      socket.on('chatMessage' ,info=>{
         const user = getCurrentUser(socket.id)

        io.to(user.room).emit('message',formatMessage(info.username,info.message))
      })

      socket.on('disconnect',()=>{
        io.emit('message',formatMessage(botName,'A User has left the Chat'))
      });

  })
  
  server.listen(PORT,()=>{ console.log(`Server is Listening at Port ${PORT}`)})
