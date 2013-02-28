window.onload = getMyLocation;

function getMyLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    alert("Not Supported!");
  }
}

function success(position) {
  var div = document.getElementById("location");
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  div.innerHTML = "You are at Latitude: " + latitude + ", Longitude: " + longitude;
  div.innerHTML += " (with " + position.coords.accuracy + " meters accuracy)";
}

function error(msg) {
  var div = document.getElementById("location");
  div.innerHTML = "Error: " + msg.message;
}
