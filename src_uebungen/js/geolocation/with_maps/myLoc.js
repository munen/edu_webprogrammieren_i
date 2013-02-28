window.onload = getMyLocation;

function getMyLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    alert("Not Supported!");
  }
}

function success(position) {
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
    var marker = new GMarker(new GLatLng(position.coords.latitude, position.coords.longitude));
    map.addOverlay(marker);
  }
}
