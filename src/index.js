import "./main.css";

import rPlayer from "./rplayer";

var audio = new rPlayer();
var currentStation = {};
const play = document.getElementById("play");
const currentStationName = document.getElementById("current-station-name");
const currentStationLogo = document.getElementById("current-station-logo");
const currentStationFrequency = document.getElementById("current-station-frequency");
const currentStationLocation = document.getElementById("current-station-location");

const STATIONS = [
  {
    id: 0,
    name: "Radio Montecarlo",
    frequency: "109.1 FM",
    city: "Asunción",
    country: "Paraguay",
    streamUrl:
      "https://www.desdepylabs.com/Stream/StreamUrl/montecarlo/hls/endpoint",
    logoUrl:
      "https://cdn-radiotime-logos.tunein.com/s114808d.png",
    redirect: true,
  },
  {
    id: 1,
    name: "WNYC",
    frequency: "93.9 FM",
    city: "New York",
    country: "USA",
    streamUrl: "https://fm939.wnyc.org/wnycfm-mobile.aac",
    logoUrl: "https://media.wnyc.org/i/300/300/c/80/1/wnyc_square_logo.png",
    redirect: false,
  },
  {
    id: 2,
    name: "Monumental 1080",
    frequency: "1080 AM",
    city: "Asunción",
    country: "Paraguay",
    streamUrl:
      "https://copaco.desdeparaguay.net/mov1080/mov1080.stream/playlist.m3u8",
    logoUrl:
      "https://images.radiovolna.net/_files/images/stations/402961/sz7f59d4aab121a24151778321_165x165.webp",
    redirect: false,
  },
  {
    id: 3,
    name: "Ñuai",
    frequency: "94.9 FM",
    city: "Pastoreo",
    country: "Paraguay",
    streamUrl:
      "https://ssl.streaming.com.py:7154/;?mode=.aac",
    logoUrl:
      "https://i.ibb.co/c2P8Wkm/nuai1.png",
    redirect: false,
  },
];

const playSvg = `
<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M18.3 36.4q-.75.5-1.525.05Q16 36 16 35.1V12.6q0-.9.775-1.35.775-.45 1.525.05L36 22.6q.7.45.7 1.25T36 25.1Z"/></svg>
`;

const pauseSvg = `
<svg width="30" height="32" fill="currentColor">
<rect x="6" y="4" width="4" height="24" rx="2" />
<rect x="20" y="4" width="4" height="24" rx="2" />
</svg>
`;


audio.addEventListener('play', function(){
  changePlayIcon("pause");
});

audio.addEventListener('pause', function(){
  changePlayIcon("play");
});

const changePlayIcon = function (icon) {
  if (icon === "play") {
    play.innerHTML = playSvg;
  } else {
    play.innerHTML = pauseSvg;
  }
};

const createStationCard = function ({
  id,
  name,
  frequency,
  city,
  country,
  logoUrl,
}) {
  return `
  <a href="javascript:void(0)" data-id="${id}" class="station group w-full bg-slate-700 hover:bg-slate-800">
  <div class="w-full flex h-16">
    <div class="w-16 h-16 flex group-hover:opacity-50">
      <img class="object-contain" src="${logoUrl}">
      </img>
    </div>
    <div class="grow p-2">
        <p> <span class="text-sm text-white font-medium">${name}</span>
        <br> <span class="text-xs text-gray-400"> ${frequency} - ${city}, ${country} </span>
        </p>
    </div>
  </div>
  </a>
  `;
};

const loadStations = function () {
  let stations = document.getElementById("stations");
  STATIONS.forEach((station) => {
    stations.insertAdjacentHTML("beforeend", createStationCard(station));
  });
  stations.insertAdjacentHTML(
    "beforeend",
    `<div class="h-16 w-full">&nbsp;</div>`
  );

  document.querySelectorAll(".station").forEach((station) => {
    station.addEventListener("click", function (e) {
      setCurrentStation(e.target.closest(".station").getAttribute("data-id"));
      playControl();
    });
  });
};

const setCurrentStation = function (id) {
  let current = STATIONS[id];
  currentStation = current;
  currentStationName.innerText = currentStation.name;
  currentStationLogo.setAttribute("src", currentStation.logoUrl);
  currentStationFrequency.innerText = currentStation.frequency;
  currentStationLocation.innerText = `${currentStation.city}, ${currentStation.country}`;
};

const playControl = function () {
  if (audio.playing) {
    audio.stop();
    changePlayIcon("play");
  } else {
    if (audio.paused) {
      if (currentStation.redirect) {
        fetch(
          `https://whereisblas.herokuapp.com/get-redirect-url?url=${currentStation.streamUrl}`
        )
          .then((response) => response.json())
          .then(function (data) {
            audio.playSrc(data.url);
          });
      } else {
        audio.playSrc(currentStation.streamUrl);
      }
      document.title = currentStation.name;
    }
  }
};

play.addEventListener("click", function () {
  playControl();
});

loadStations();
