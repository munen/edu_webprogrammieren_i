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
  addGoogleMap(position);
}

function error(msg) {
  var div = document.getElementById("location");
  div.innerHTML = "Error: " + msg.message;
}

function addGoogleMap(position) {
  if (GBrowserIsCompatible()) {
    var map = new GMap2(document.getElementById("map"));
    map.setCenter(new GLatLng(position.coords.latitude, position.coords.longitude), 13);
  }
}
