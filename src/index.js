import "./main.css";

import rPlayer from "./rplayer";

var audio = new rPlayer();
var currentStation = {};
var currentView = "";
const views = {FAVORITES: 'favs', SEARCH: 'search'};
const play = document.getElementById("play");
const searchContainer = document.getElementById("search-container");
const searchInput = document.getElementById("search-input");
const heartLink = document.getElementById("heart-link");
const likeSvg = document.querySelector(".like");
const unLikeSvg = document.querySelector(".unlike");
const currentStationName = document.getElementById("current-station-name");
const currentStationLogo = document.getElementById("current-station-logo");
const currentStationFrequency = document.getElementById("current-station-frequency");
const currentStationFrequencyName = document.getElementById("current-station-frequency-name");
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
  {
    id: 4,
    name: "Universo",
    frequency: "970 AM",
    city: "Asunción",
    country: "Paraguay",
    streamUrl:
      "https://www.desdepylabs.com/Stream/StreamUrl/970/hls/endpoint",
    logoUrl:
      "https://i1.sndcdn.com/avatars-000674972318-qc3y00-t500x500.jpg",
    redirect: true,
  },
  {
    id: 5,
    name: "Venus",
    frequency: "105.1 FM",
    city: "Asunción",
    country: "Paraguay",
    streamUrl:
      "https://copaco.desdeparaguay.net/movvenus/movvenus.stream/playlist.m3u8",
    logoUrl:
      "https://play-lh.googleusercontent.com/paY2iUv1diTL15ReRRK71K4VIHxjg9xPkIl_kPkflszMqzQwY5iQYG8u69xZSBIXCg",
    redirect: false,
  },
  {
    id: 6,
    name: ".977 Today's Hits",
    frequency: "97.7 FM",
    city: "Orlando",
    country: "USA",
    streamUrl:
      "https://26283.live.streamtheworld.com/977_HITSAAC_SC?dist=onlineradiobox&mode=.aac",
    logoUrl:
      "https://images.radio.orange.com/radios/large_977_the_hitz_channel.png",
    redirect: false,
  },
  {
    id: 7,
    name: "Onda Verde",
    frequency: "91.1 FM",
    city: "Caaguazu",
    country: "Paraguay",
    streamUrl:
      "https://stream.radiosenpy.net/8812/;?mode=.aac",
    logoUrl:
      "https://play-lh.googleusercontent.com/zvxAmk2I0Kq5Iv3k_vMnlu21r4HM4V1VzoIZG8GkSHfSoDiwgQ2oAWsXlR_3IDB3Uw",
    redirect: false,
  },
  {
    id: 8,
    name: "ABC",
    frequency: "98.5 FM",
    city: "Asunción",
    country: "Paraguay",
    streamUrl:
      "https://rds3.desdeparaguay.net:8002/abcfm?mode=.aac",
    logoUrl:
      "https://scontent.fasu10-1.fna.fbcdn.net/v/t39.30808-6/298341162_10167082087915323_3279475007887942077_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=4BVldErCycAAX-uJo_9&_nc_ht=scontent.fasu10-1.fna&oh=00_AT_v_zHAwRkFDlJrFjvI-zPkhzIQuXxN1o3dJ45jitKUJw&oe=63012997",
    redirect: false,
  },
  {
    id: 9,
    name: "Disney",
    frequency: "96.5 FM",
    city: "Asunción",
    country: "Paraguay",
    streamUrl:
      "https://rds1.radiomagic.com.py:9433/stream?mode=.aac",
    logoUrl:
      "http://1.bp.blogspot.com/-Q_gWaEu_mhs/VT15WOfn_NI/AAAAAAAAB3c/kwL8doEuYNE/s1600/dysneypy.jpg",
    redirect: false,
  },
  {
    id: 10,
    name: "Centenario",
    frequency: "99.5 FM",
    city: "Caaguazu",
    country: "Paraguay",
    streamUrl:
      "http://stream.radiios.com:7995/;stream?mode=.aac",
    logoUrl:
      "https://1.bp.blogspot.com/-mKcYwJKEggQ/V-b8UsGzzCI/AAAAAAAAD5k/jLB42Ed-Yd0zLPFyTJgWuvO_Kr_HXVwUgCLcB/s1600/Radio-Centenario.jpg",
    redirect: false,
  },
  {
    id: 11,
    name: "Farra",
    frequency: "101.3 FM",
    city: "Asunción",
    country: "Paraguay",
    streamUrl:
      "https://rfs1.farra.com.py:9433/stream?mode=.aac",
    logoUrl:
      "https://2.bp.blogspot.com/-WC5palR7n1k/VTsXrRKTlRI/AAAAAAAAB1U/uD8xPWzSagY/s320/farrapy.jpg",
    redirect: false,
  },
];

const playSvg = `
<svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20" viewBox="0 0 20 20" fill="currentColor">
<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
</svg>
`;

const pauseSvg = `
<svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
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

const removeChildren = function(a) {
  while (a.hasChildNodes()) {
      a.removeChild(a.lastChild);
  }
}

const getEmptyState = function(){
   return `
    <div class="grid min-h-screen w-full place-items-center">
      <div class="text-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-400">No favorites</h3>
      <p class="mt-1 text-sm text-gray-500">You don't have any favorite radio to show</p>
      </div>
    </div>
   `;
};

const createStationCard = function ({
  id,
  name,
  frequency,
  city,
  country,
  logoUrl,
}) {
  let liked = currentView === views.SEARCH ? isLiked(id) : false;
  let likeHTML = `
    <div class="w-6 flex mx-3">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-500 my-auto" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
      </svg>
    </div>
  `;

  return `
  <a href="javascript:void(0)" data-id="${id}" class="station p-1 w-full lg:w-1/2 xl:w-1/3">
  <div class="group w-full flex h-16 md:h-20  bg-slate-700 hover:bg-slate-800 rounded-md">
    <div class="w-16 h-16 md:w-20 md:h-20 flex group-hover:opacity-50">
      <img class="object-contain rounded-md rounded-r-none" src="${logoUrl}">
      </img>
    </div>
    <div class="grow p-2">
        <p> <span class="text-sm text-white font-medium">${name}</span>
        <br> <span class="text-xs text-gray-400"> ${frequency} - ${city}, ${country} </span>
        </p>
    </div> 
    ${liked ? likeHTML : ""}
  </div>
  </a>
  `;
};

const loadStations = function (view, stationName = null) {
  let stationsData = STATIONS;
  let stationsContainer = document.getElementById("stations");

  removeChildren(stationsContainer);

  if (view == views.FAVORITES) {
    stationsData = stationsData.filter((station) => isLiked(station.id));
  }

  if (stationName) {
    stationsData = stationsData.filter(
      (station) =>
        station.name.toLowerCase().search(stationName.toLowerCase()) >= 0
    );
  }

  stationsData.forEach((station) => {
    stationsContainer.insertAdjacentHTML(
      "beforeend",
      createStationCard(station)
    );
  });

  stationsContainer.insertAdjacentHTML(
    "beforeend",
    `<div class="h-40 w-full">&nbsp;</div>`
  );

  document.querySelectorAll(".station").forEach((station) => {
    station.addEventListener("click", function (e) {
      setCurrentStation(e.target.closest(".station").getAttribute("data-id"));
      playControl();
    });
  });

  if (stationsData.length === 0 && currentView === views.FAVORITES) {
    stationsContainer.innerHTML = getEmptyState();
    stationsContainer.classList.remove("py-3");
  } else {
    stationsContainer.classList.add("py-3");
  }
};


const addEvents = function () {
  document.querySelectorAll(".favorite-link").forEach(function (el) {
    el.addEventListener("click", function (e) {
      changeView(views.FAVORITES);
    });
  });

  document.querySelectorAll(".search-link").forEach(function (el) {
    el.addEventListener("click", function (e) {
      changeView(views.SEARCH);
    });
  });

  heartLink.addEventListener("click", function (e) {
    toggleLike(currentStation.id);
  });

  searchInput.addEventListener("keyup", function(e) {
    loadStations(currentView, searchInput.value);
  });
};

const getLikes = function () {
  let raw = localStorage.getItem("likes");
  return raw ? JSON.parse(raw) : [];
};

const isLiked = function (id) {
  let likes = getLikes();
  return typeof likes.find((e) => e === id) !== "undefined";
};

const toggleLike = function (id) {
  let likes = getLikes();
  if (isLiked(id)) {
    likes = likes.filter((e) => e != id);
  } else {
    likes.push(id);
  }
  localStorage.setItem("likes", JSON.stringify(likes));
  drawLikeUnlikeCurrentStation();
  loadStations(currentView);
};

const drawLikeUnlikeCurrentStation = function(){
  likeSvg.classList.add("hidden");
  unLikeSvg.classList.add("hidden");
  if (isLiked(currentStation.id)) {
    likeSvg.classList.remove("hidden");
  } else {
    unLikeSvg.classList.remove("hidden");
  }
}

const resetLinks = function(){
  document.querySelectorAll('.favorite-link, .search-link').forEach(function(el){
    el.classList.remove('text-white');
    el.classList.add('text-gray-400');
  });
};

const changeView = function(view){
  currentView = view;
  resetLinks();
  if (view == views.FAVORITES){
    document.querySelectorAll('.favorite-link').forEach(function(el){
      el.classList.remove('text-gray-400');
      el.classList.add('text-white');
    });
    searchContainer.classList.add("hidden");
  }
  if (view == views.SEARCH){
    document.querySelectorAll('.search-link').forEach(function(el){
      el.classList.remove('text-gray-400');
      el.classList.add('text-white');
    });
    searchContainer.classList.remove("hidden");
    searchInput.focus();
  }
  loadStations(view);
}

const setCurrentStation = function (id) {
  let current = STATIONS[id];
  currentStation = current;
  currentStationName.innerText = currentStation.name;
  currentStationLogo.setAttribute("src", currentStation.logoUrl);
  currentStationFrequency.innerText = currentStation.frequency;
  currentStationFrequencyName.innerText = `${currentStation.frequency} - ${currentStation.name}`;
  currentStationLocation.innerText = `${currentStation.city}, ${currentStation.country}`;
  drawLikeUnlikeCurrentStation();
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

addEvents();
changeView(views.FAVORITES);
