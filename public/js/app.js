var socket = io();

socket.on("chat message", function(msg){
  $("#messages").append($("<li>").text(msg));
});

$(function(){
  $("form").submit(function(e) {
    socket.emit("chat message", $("#message-box").val());
    $("#message-box").val("");
    return false;
  });
});


