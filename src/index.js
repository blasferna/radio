import "./main.css";

import rPlayer from "./rplayer";

var audio = new rPlayer();
var currentStation = {};
const play = document.getElementById("play");
const currentStationName = document.getElementById("current-station-name");
const currentStationLogo = document.getElementById("current-station-logo");

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
      "https://www.radiomontecarlo.com.py/wp-content/uploads/2019/06/logo-montecarlo.svg",
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
      "https://monumental.com.py/wp-content/uploads/2020/11/icono-monumental-blanco.png",
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
<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
<path stroke-linecap="round" stroke-linejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
<path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>  
`;

const pauseSvg = `
<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
<path stroke-linecap="round" stroke-linejoin="round" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg> 
`;

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
    <div class="w-16 h-16 flex p-1 bg-yellow-100 group-hover:opacity-50">
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
            changePlayIcon("pause");
          });
      } else {
        audio.playSrc(currentStation.streamUrl);
        changePlayIcon("pause");
      }
      document.title = currentStation.name;
    }
  }
};

play.addEventListener("click", function () {
  playControl();
});

loadStations();
