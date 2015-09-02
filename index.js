var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

var nicknames = []

app.use(express.static("public"));

app.get("*", function (req, res){
  res.sendFile(__dirname + "/public/index.html");
});

http.listen(3000, function(){
  console.log("Listening on port 3000");
});

io.on("connection", function(socket){

  socket.on("new user", function(nickname, callback){
    if (nicknames.indexOf(nickname) == -1) {
      callback({isValid:true});
      nicknames.push(nickname)
      socket.nickname = nickname
      socket.broadcast.emit("user connected", socket.nickname);
    } else {
      callback({
        isValid: false,
        errorMessage: "This nickname has already been taken!"
      })
    }
  })

  socket.on("chat message", function(msg) {
    var chat_object = {
      sender_name: socket.nickname,
      message: msg
    }
    io.emit("chat message", chat_object);
  });

  socket.on('disconnect', function(){
    var remove_index = nicknames.indexOf(socket.nickname)
    nicknames.splice(remove_index, remove_index)
    io.emit("user disconnected", socket.nickname)
  });

});

http.listen(3000, function(){
  console.log('Listening on port 3000');
});

