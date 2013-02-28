function handleButtonClick() {
  // get the song name from input field
  var songName = document.getElementById("songTextInput").value;

  // append song name into list if available
  if (songName) {
    var li = document.createElement("li");
    li.innerHTML = songName;
    var ul = document.getElementById("playlist");
    ul.appendChild(li);

    // save song name into browsers' localstorage
    save(songName);
  }
  // otherwise notify the user to give proper input
  else {
    alert("Please enter a song name");
  }
}

// set up click event handler for form
function init() {
  button = document.getElementById("addButton");
  button.onclick = handleButtonClick;

  // load previously defined playlist from browsers' localstorage
  loadPlaylist();
}

// when the browser is done loading, start the event loop
window.onload = init;

