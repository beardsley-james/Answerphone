//global variables

var msPerMin = 1000,
callFreq = 0,
currentMinute = 0,
day = "monday",
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
var load = function(saveFile){
  msPerMin = saveFile.msPerMin;
  callFreq = saveFile.callFreq;
  currentMinute = saveFile.currentMinute;
  day = saveFile.day;
  money = saveFile.money;
  daysElapsed = saveFile.daysElapsed;
  clientId = saveFile.clientId;
  callNumber = saveFile.callNumber;
  campaignId = saveFile.campaignId;
  clients = saveFile.clients;
  ops = saveFile.ops;
  callQueue = saveFile.callQueue;
  campaigns = saveFile.campaigns;
  possibleOps = saveFile.possibleOps;
  possibleClients = saveFile.possibleClients
}

var save = function(saveFile){
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
  localStorage.setItem(saveFile, JSON.stringify(file))
}
