let msPerMin = 100,
callFreq = 0,
minutesInDay = 1440,
currentMinute = 400,
day = "monday",
ansSvc = Answerphone;
var callQueue = document.getElementById('callQueue');
document.write(JSON.stringify(ansSvc));

window.setInterval(function(){
  console.log("Tick " + currentMinute);
  if (dailyFreq[day].hasOwnProperty(currentMinute)){
    callFreq = dailyFreq[day][currentMinute];
    console.log("Change Frequency to " + callFreq + " at " + currentMinute)
  }
  ansSvc.clients.forEach(function(client){
    if (client.frequency <= callFreq && client.callVolume >= randomPercent()) {
      let call = new callGen(client);
      let callCard = document.createElement("p");
      callCard.innerHTML = "<b>" + call.name + "</b> </br>" + call.message + "</br> <i>" + call.client + "</i>";
      callQueue.appendChild(callCard)
      console.log(new callGen(client) + " " + currentMinute)
    }
  })
  currentMinute++;
  if (currentMinute == minutesInDay){
    currentMinute = 0;
    callFreq = 0
  }
}, msPerMin)
