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
  $("#partner-nickname").text(nickname);
});

socket.on("user disconnected", function(nickname){
  $("#messages").append($("<li class='user_disconnect_msg'>").text(nickname + " has disconnected!"))
  $("#partner-nickname").text("NO USER");
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
    var nickname = $("#nickname-input").val()
    socket.emit("new user", nickname, function(data){
      if (data.isValid){
        $("#user-nickname").text(nickname);
        $("#nickname-wrap").hide();
        $("#chat-wrap").show();
      } else {
        $("#nickname-errors").html(data.errorMessage);
      }
    });
    $("nickname-input").val("");
    return false
  })

  $("#channel-form").submit(function(e){
    var channel_name = $("#channel-input").val();
    var channel_url = channel_name.split(" ").join("-");
    socket.emit("new channel", channel_url, function(data){
      if (data.isValid){
        $("#channel-form").append($(document.createElement("")).append("<a href=" + data.url + ">" + data.url + "</a>"
      } else {
        $("#channel-errors".html(data.errorMessage))
      }
    })

  })

});


