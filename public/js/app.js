var socket = io();

socket.on("chat message", function(msg){
  $("#partner-current-message").text(msg);
});

socket.on("clear message", function(msg){
  $("#partner-messages").append($(document.createElement("li")).append().text(msg));
  $("#partner-current-message").text("");
})

socket.on("user connected", function(nickname){
  $("#messages").append($("<li class='user_connect_msg'>").text(nickname + " has connected!"))
});

socket.on("user disconnected", function(nickname){
  $("#messages").append($("<li class='user_disconnect_msg'>").text(nickname + " has disconnected!"))
});

$(function(){

  $("#message-box").keyup(function(e) {
    var message = $("#message-box").text();
    var newElement = document.createElement("li");
    if (e.which == 13) {
      e.preventDefault;
      socket.emit("clear message", message);
      $("#user-chat-messages").prepend($(newElement).append().text(message));
      $("#message-box").text("");
    }
    socket.emit("chat message", $("#message-box").text());
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


