import "./main.css";

import rPlayer from "./rplayer";

const play = document.getElementById("play");

play.addEventListener("click", function () {
  var audio = new rPlayer();

  audio.playSrc(
    "https://rds3.desdeparaguay.net/movmontecarlo/movmontecarlo.stream/playlist.m3u8?k=6b79af33235d1ec0b44d03ece82438d56077e8935eaf60c601a8a2724791c07a&exp=1656509177"
  );

  audio.ontimeupdate = function () {
    console.log("Time:", audio.currentTime);
  };

  console.log("Playing:", audio.playing);
  console.log("Volume:", audio.volume * 100);
  console.log("Paused:", audio.paused);
  console.log("Muted:", audio.muted);
  console.log("Source:", audio.src);
  console.log("isHls:", audio.isHls);
});
