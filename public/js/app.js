var socket = io();

socket.on("chat message", function(chat_object){
  $("#messages").append($("<li>").text(chat_object.sender_name +": " + chat_object.message));
});

socket.on("user connected", function(nickname){
  $("#messages").append($("<li class='user_connect_msg'>").text(nickname + " has connected!"))
});

socket.on("user disconnected", function(nickname){
  $("#messages").append($("<li class='user_disconnect_msg'>").text(nickname + " has disconnected!"))
});

$(function(){

  $("#chat-message-form").submit(function(e) {
    socket.emit("chat message", $("#message-box").val());
    $("#message-box").val("");
    return false;
  });

  $("#nickname-form").submit(function(e){
    socket.emit("new user", $("#nickname-input").val(), function(data){
      if (data.isValid){
        $("#nickname-wrap").hide();
        $("#chat-wrap").show();
      } else {
        $("#nickname-errors").html(data.errorMessage);
      }
    });
    $("nickname-input").val("");
    return false
  })

});


