var socket = io();

socket.on("chat message", function(msg){
  $("#messages").append($("<li>").text(msg));
});

socket.on("user connected", function(){
  $("#messages").append($("<li class='new_user_msg'>").text("A new user has connected!"))
});

socket.on("user disconnected", function(){
  $("#messages").append($("<li class='user_left_msg'>").text("A user has disconnected!"))
});

$(function(){
  $("form").submit(function(e) {
    console.log(socket.id)
    socket.emit("chat message", $("#message-box").val());
    $("#message-box").val("");
    return false;
  });
});


