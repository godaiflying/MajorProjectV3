const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

const user={}

 
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/style.css', (req, res) => {
  res.sendFile(__dirname + '/style.css');
});

io.on('connection', (socket) => {
  socket.on('new-user', name =>{
    user[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })
  socket.on('chat message', msg => {
    socket.broadcast.emit('chat message', {msg: msg, name: user[socket.id] });
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});