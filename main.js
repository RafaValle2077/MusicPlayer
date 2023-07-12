let now_playing = document.querySelector(".now-playing");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".pause-play");
let next_btn = document.querySelector(".next-song");
let prev_btn = document.querySelector(".prev-song");

let seek_slider = document.querySelector(".seek");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
let pre = document.getElementById("playlist")

let song =document.getElementById("song");
//C:\\Users\\USUARIO\\Documents\\Cosas paginas web\\music player\\


let track_index = 0;
let isPlaying = false;
let updateTimer;

let curr_track = document.createElement('audio');

var track_list = [
  /*{
    name: "asdf",
    artist: "lol",
    path: "ALIVE.mp3",
  },
  {
    name: "lol",
    artist: "wooooo",
    path: "ALIVE.mp3",
  }*/
];





function loadTrack(track_list) {

  clearInterval(updateTimer);
  resetValues();

  console.log(track_list);
  console.log(track_index)
  curr_track.src=track_list[track_index].path;
  curr_track.load();

  track_name.textContent=track_list[track_index].name;
  track_artist.textContent=track_list[track_index].artist;
  now_playing.textContent="PLAYING SONG " + (track_index+1) + " OF " + track_list.length;
  updateTimer = setInterval(seekUpdate, 300);
 
  curr_track.addEventListener("ended", nextTrack);
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

function playpause() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying=true;
  playpause_btn.innerHTML= '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause()
  isPlaying=false;
  playpause_btn.innerHTML='<i class="fa fa-play-circle fa-5x"></i>'
}

function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index+=1;
  else track_index=0;

  loadTrack(track_list);
  playTrack();
}

function prevTrack() {
  if (track_index > 0)
    track_index-=1;
  else track_index=track_index.length-1;

  loadTrack(track_list);
  playTrack();
}

function seekTo() {
  curr_track.currentTime = curr_track.duration*(seek_slider.value/100);
  seekUpdate();
}

function setVolume() {
  curr_track.volume = volume_slider.value/100;
}

function seekUpdate() {
  let seekPosition = 0;
 
  // Check if the current track duration is a legible number
  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = seekPosition;
 
    // Calculate the time left and the total duration
    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
 
    // Add a zero to the single digit time values
    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
 
    // Display the updated duration
    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}


/*song.onchange =evt =>{
  const[file]=song.files;

    track_list[track_list.length]={
      name: URL.name,
      artist: "asd",
      path: URL.createObjectURL(file)
    }
    loadTrack(track_list);
    pre.innerHTML = JSON.stringify(track_list, null, 4)
}*/
  
  document.querySelector('input[type="file"]').onchange = function(e) {
    var reader = new FileReader();
  
    reader.onload = function(e) {
      var dv = new DataView(this.result);
  
      // "TAG" starts at byte -128 from EOF.
      // See http://en.wikipedia.org/wiki/ID3
      if (dv.getString(3, dv.byteLength - 128) == 'TAG') {
        var title = dv.getString(30, dv.tell());
        var artist = dv.getString(30, dv.tell());
        var album = dv.getString(30, dv.tell());
        var year = dv.getString(4, dv.tell());
        console.log(title);
      } else {
        console.log("fuck")
      }
    };
  
    reader.readAsArrayBuffer(this.files[0]);
  };

const fileSelect=document.getElementById("fileSelect"),
  fileList = document.getElementById("playlist"),
  fileElem = document.getElementById("song");

fileSelect.addEventListener(
    "click",
    (e) => {
      if (fileElem) {
        fileElem.click();
      }
      e.preventDefault(); // prevent navigation to "#"
    },
    false,
  );
  
fileElem.addEventListener("change", handleFiles, false);

  function handleFiles(){
    if(!this.files.length){
      playlist.innerHTML="No songs!";
    } else {

    }
  }