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

  const io = socketio(server);



  io.on('connection', socket=>{
      console.log(`New Connection Created with socket id ${socket.id}` );

      socket.broadcast.emit('message', 'A User has Joined the Chat');

      socket.on('disconnect',()=>{
        io.emit('message','A User has left the Chat')
      });

      socket.on('chatMessage' ,msg=>{
        // console.log(msg)
        io.emit('message',msg);
      })

  })
  
  server.listen(PORT,()=>{ console.log(`Server is Listening at Port ${PORT}`)})
