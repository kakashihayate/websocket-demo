const ws = new WebSocket('ws://localhost:9898/');
ws.onopen = function() {
    console.log('WebSocket Client Connected');
    ws.send('Hi this is web client.');
};

ws.onmessage = function(e) {
  console.log("Received: '" + e.data + "'"); 
  var obj = JSON.parse(e.data);
  if(obj.server == "Ok"){
  document.getElementById("start").innerHTML ="Hi this is WebSocket server!";
  $('#start').css( 'color', '#28a745' );
  $(".apiclass").removeClass("text-danger");
  $(".dbclass").removeClass("text-danger");

    $(".apiclass").addClass("blink_me");
    $(".apiclass").addClass("text-warning");
    $(".dbclass").addClass("blink_me");
    $(".dbclass").addClass("text-warning");
    if(obj.type == "t-shirts"){
      $("#t-shirts_").removeClass('badge-danger');
      $("#t-shirts_").removeClass('badge-success');

      $("#t-shirts_").addClass('badge-success');
      $("#t-shirts").html(obj.amount);

      $("#jeans_").addClass('badge-danger');
      $("#divers_").addClass('badge-danger');
    }
    else if(obj.type == "jeans"){
      $("#jeans_").removeClass('badge-danger');
      $("#jeans_").removeClass('badge-success');

      $("#jeans_").addClass('badge-success');
      $("#jeans").html(obj.amount);

      $("#t-shirts_").addClass('badge-danger');
      $("#divers_").addClass('badge-danger');
    }
    else{
      $("#divers_").removeClass('badge-danger');
      $("#divers_").removeClass('badge-success');

      $("#divers_").addClass('badge-success');
      $("#divers").html(obj.amount);

      $("#jeans_").addClass('badge-danger');
      $("#t-shirts_").addClass('badge-danger');
    }
  }
  else{
    document.getElementById("start").innerHTML ="No WebSocket connection :(";
    $('#start').css( 'color', '#dc3545' );

    $(".apiclass").removeClass("blink_me");
    $(".apiclass").removeClass("text-warning");
    $(".dbclass").removeClass("blink_me");
    $(".dbclass").removeClass("text-warning");

    $(".apiclass").addClass("text-danger");
    $(".dbclass").addClass("text-danger");
  }
};

// Digital Clock
setInterval(() => {
  let time = new Date();
  let hours = time.getHours();
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();
  let amPm = "";

  // Checking for AM/PM
  if (hours > 12) {
    hours = hours - 12;
    amPm = "PM";
  } else if (hours == 0) {
    hours = 12;
    amPm = "AM";
  } else {
    amPm = "AM";
  }

  // Prepending 0 if less than 10
  hours = hours > 10 ? hours : "0" + hours;
  minutes = minutes > 10 ? minutes : "0" + minutes;
  seconds = seconds > 10 ? seconds : "0" + seconds;

  // Adding the time in the DOM
  document.getElementById(
    "hrs"
  ).innerHTML = `${hours}`;
  document.getElementById(
    "min"
  ).innerHTML = `${minutes}:${amPm}`;

}, 2000);

// Date object
var today = new Date();
// Current Date
var date = today.getFullYear()+'-'+(today.getMonth()+1);
document.getElementById("current_date").innerHTML = date;

datedeigit = today.getDate();
document.getElementById("date_digit").innerHTML = datedeigit;