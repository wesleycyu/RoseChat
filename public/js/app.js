var socket = io();

socket.on("chat message", function(message_object){
  $("#partner-nickname").text(message_object.nickname);
  $("#partner-current-message").text(message_object.contents);
  $('#partner-past-messages').scrollTop($('#partner-past-messages')[0].scrollHeight);
});

socket.on("clear message", function(msg){
  $("#partner-messages").append($(document.createElement("li")).append().text(msg));
  $("#partner-current-message").text("");
  $('#partner-past-messages').scrollTop($('#partner-past-messages')[0].scrollHeight);
})

socket.on("user connected", function(nickname){
  $("#partner-messages").append($("<li class='user_connect_msg'>").text(nickname + " has connected!"))
  $("#partner-nickname").text(nickname);
  $('#partner-past-messages').scrollTop($('#partner-past-messages')[0].scrollHeight);
});

socket.on("user disconnected", function(nickname){
  $("#partner-messages").append($("<li class='user_disconnect_msg'>").text(nickname + " has disconnected!"))
  $("#partner-nickname").text("NO USER CONNECTED");
  $('#partner-past-messages').scrollTop($('#partner-past-messages')[0].scrollHeight);
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
        $("#channel-form").append("<a href=" + data.url + ">" + data.url + "</a>")
      } else {
        $("#channel-errors".html(data.errorMessage))
      }
    })

  })

});


