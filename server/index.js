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

const io = socketio(server)



io.on('connection', socket=>{
    console.log('New Connection formed');

    socket.emit('message','welcome to QuickChat')
})

server.listen(PORT,()=>{ console.log(`Server is Listening at Port ${PORT}`)})
