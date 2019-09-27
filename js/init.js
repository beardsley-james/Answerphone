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

var save = function(){
  let saveFile = {};
  saveFile.msPerMin = msPerMin;
  saveFile.callFreq = callFreq;
  saveFile.currentMinute = currentMinute;
  saveFile.day = day;
  saveFile.money = money;
  saveFile.daysElapsed = daysElapsed;
  saveFile.clientId = clientId;
  saveFile.callNumber = callNumber;
  saveFile.campaignId = campaignId;
  saveFile.clients = clients;
  saveFile.ops = ops;
  saveFile.callQueue = callQueue;
  saveFile.campaigns = campaigns;
  saveFile.possibleOps = possibleOps;
  saveFile.possibleClients = possibleClients;
  localStorage.setItem("save", JSON.stringify(saveFile))
}
