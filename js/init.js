//global variables

var msPerMin = 1000,
callFreq = 0,
currentMinute = 0,
day = 0,
money = 0,
daysElapsed = 0,
autoTime = false;

var clientId = 0;
var callNumber = 0;
var campaignId = 0;

const minutesInDay = 1440;

var clients = [];
var ops = [];
var callQueue = {
  live: [],
  holding: [],
  completed: [],
  lost: []
}
var campaigns = [],
completedAds = [];
var possibleOps = [],
possibleClients = [];
var saveFile = "";

// check for saved games
/* if (localStorage.getItem("save")){
  let saveFile = JSON.parse(localStorage.getItem("save"));
  load(saveFile)
} */


//load & save functions
var load = function(saveFileName){
  saveFile = saveFileName;
  let file = JSON.parse(localStorage.getItem(saveFileName));
  msPerMin = file.msPerMin;
  callFreq = file.callFreq;
  currentMinute = file.currentMinute;
  day = file.day;
  money = file.money;
  daysElapsed = file.daysElapsed;
  clientId = file.clientId;
  callNumber = file.callNumber;
  campaignId = file.campaignId;
  clients = file.clients;
  ops = file.ops;
  callQueue = file.callQueue;
  campaigns = file.campaigns;
  possibleOps = file.possibleOps;
  possibleClients = file.possibleClients;
  callStartup();
  adStartup();
  document.getElementById("currentDay").innerHTML = daysOfTheWeek[day];
  clientStartup();
  opStartup();
  timer();
  revealPanel("callQueue")
}

var save = function(){
  let file = {};
  file.time = new Date();
  file.msPerMin = msPerMin;
  file.callFreq = callFreq;
  file.currentMinute = currentMinute;
  file.day = day;
  file.money = money;
  file.daysElapsed = daysElapsed;
  file.clientId = clientId;
  file.callNumber = callNumber;
  file.campaignId = campaignId;
  file.clients = clients;
  file.ops = ops;
  file.callQueue = callQueue;
  file.campaigns = campaigns;
  file.possibleOps = possibleOps;
  file.possibleClients = possibleClients;
  localStorage.setItem(saveFile, JSON.stringify(file));
  console.log("Game saved")
}
