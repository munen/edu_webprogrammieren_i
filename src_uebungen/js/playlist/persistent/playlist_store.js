function save(item) {
  var playlist = getStoreArray("playlist");
  playlist.push(item);
  localStorage.setItem("playlist", JSON.stringify(playlist));
}

// get song names, then create a list element for each of them
function loadPlaylist() {
  var playlist = getStoreArray("playlist");
  var ul = document.getElementById("playlist");
  if (playlist) {
    for (var i = 0; i < playlist.length; i++) {
      var li = document.createElement("li");
      li.innerHTML = playlist[i];
      ul.appendChild(li);
    }
  }
}

function getStoreArray(key) {
  // retrieve playlist from localstorage
  var playlist = localStorage.getItem(key);

  // if no object has been saved with the given key, initialize an empty array
  if (!playlist)
    playlist = new Array();
  else
    playlist = JSON.parse(playlist);

  return playlist;
}
