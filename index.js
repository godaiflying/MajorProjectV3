//this is the setup for the server
//setup HTML webpage
//Express initializes app to be a function handler that you can supply to an HTTP server
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

//making the port that the clients can connect to.
const port = process.env.PORT || 3000;

const user={}

//sending the file to the webpage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
//sending the css to the webpage
app.get('/style.css', (req, res) => {
  res.sendFile(__dirname + '/style.css');
});
//scanning for new connection and when someone connects get there username and chatmessage and send it to all the other users in the server
io.on('connection', (socket) => {
  socket.on('new-user', name =>{
    user[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })
  socket.on('chat message', msg => {
    //sending the message and username to all the other connected user
    socket.broadcast.emit('chat message', {msg: msg, name: user[socket.id] });
  });
});
//telling me where the port is connected to
http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});