const REFRESH_TIME = 5*60*1000; // 10 seconds

function updateTime() {
  var now = new Date();
  var datetime = document.getElementById("datetime");
  datetime.innerHTML = now.toLocaleString();
}
setInterval(updateTime, 1000);

// Create tabs container
const tabsContainer = document.createElement("div");
tabsContainer.classList.add("tabs-container");
document.body.appendChild(tabsContainer);

// Create tabs
const tabs = ["Reports", "Settings", "Signal Strength", "Bandwidth"];
for (let i = 0; i < tabs.length; i++) {
  const tab = document.createElement("button");
  tab.classList.add("tab");
  tab.textContent = tabs[i];
  tabsContainer.appendChild(tab);
}

const textToNode = (text) => {
  const template = document.createElement("template");
  template.innerHTML = text;
  return template.content;
};

let currentWifiName = "";

const setEmpty = () => {
  document.getElementsByClassName("main")[0].style.display = "none";
  document.getElementsByClassName("empty")[0].style.display = "block";
};

const bindWifiData = (wifi) => {
  document.getElementsByClassName("wifi-ssid")[0].innerHTML = wifi.ssid;

  document.querySelector(".wifi-quality .value").innerHTML = wifi.quality;
  qualityChart(wifi.quality);

  document.querySelector(".wifi-signal .value").innerHTML =
    wifi.signal + " dBm";
  strengthChart(wifi.signal);

  document.querySelector(".wifi-freuency .value").innerHTML = wifi.frequency;

  document.querySelector(".wifi-channel .value").innerHTML = wifi.channel;
  document.querySelector(".wifi-mode .value").innerHTML = wifi.mode;
  document.querySelector(".wifi-security .value").innerHTML = wifi.encrypted
    ? "Encrypted"
    : "Not Encrypted";
  document.querySelector(".wifi-address .value").innerHTML = wifi.address;

  bitrateChart(wifi.bitrates);
};

const bindData = (data) => {
  const wifiList = document.getElementsByClassName("wifi-list")[0];
  wifiList.innerHTML = "";

  if (currentWifiName == "") {
    currentWifiName = data[0].ssid;
  }

  let currentWifi = null;

  for (let i = 0; i < data.length; i++) {
    const wifi = data[i];
    const wifiNode = textToNode(`
    <div class="wifi-item ${wifi.ssid == currentWifiName ? "active" : ""}">
        <div class="wifi-item-image">
            <img src="wifi.png" />
        </div>
        <div class="wifi-item-ssid"> ${wifi.ssid}</div>
    </div>`);

    if (wifi.ssid == currentWifiName) {
      currentWifi = wifi;
    }
    wifiList.appendChild(wifiNode);
    wifiList.children[i].addEventListener("click", () => {
      currentWifiName = wifi.ssid;
      bindData(data);
    });
  }

  if (currentWifi == null) {
    currentWifi = data[0];
    currentWifiName = data[0].ssid;
  }
  
  bindWifiData(currentWifi);

  document.getElementsByClassName("main")[0].style.display = "flex";
  document.getElementsByClassName("empty")[0].style.display = "none";
};

const padZero = (num) => {
  return num.toString().padStart(2, "0");
};

const mtimer = document.getElementById("timer");
let start_time;
let setTimeOutID = 0;
const myTimer = (interval) => {
  let elapsed = Date.now() - start_time;
  elapsed = REFRESH_TIME - elapsed;
  let seconds = Math.floor(elapsed / 1000);
  let milliseconds = elapsed % 1000;
  milliseconds = Math.floor(milliseconds / 10);
  mtimer.innerHTML = padZero(seconds) + "." + padZero(milliseconds);
  setTimeOutID = setTimeout(() => myTimer(interval), interval);
};
const restartRefresh = () => {
  if (setTimeOutID) clearTimeout(setTimeOutID);

  start_time = Date.now();
  myTimer(500);
};

const getData = () => {
  getWifiList().then((data) => {
    document.getElementsByClassName("empty")[1].style.display = "none";
    restartRefresh();
    console.log(data);
    if (data.length > 0) bindData(data);
    else setEmpty();
  });
};

getData();
//fetch data every 10 seconds
setInterval(getData, REFRESH_TIME);
