/* var extractCallNumber = function(elementId){
  let callRegEx = /call(\d+)/;
  let callNum = callRegEx.exec(elementId);
  return callNum[1]
}

var callRender = function(call){
  let callTicket = document.createElement("div");
  callTicket.setAttribute("id", ("call" + call.callNumber))
  callTicket.setAttribute("class", "call");
  callTicket.setAttribute("onclick", "manualAnswer(event)")
  let name = document.createElement("b");
  name.innerHTML = call.name;
  let message = document.createElement("span");
  message.innerHTML = call.message;
  let business = document.createElement("i");
  business.innerHTML = call.client;
  let times = document.createElement("span");
  times.setAttribute("id", "call" + call.callNumber + "stats");
  times.innerHTML = "Live:" + call.timeRinging + " Hold:" + call.timeOnHold + " Answer:" + call.callTime + " #:" + call.callNumber;
  callTicket.appendChild(name);
  callTicket.appendChild(lineBreak());
  callTicket.appendChild(message);
  callTicket.appendChild(lineBreak());
  callTicket.appendChild(business);
  callTicket.appendChild(lineBreak());
  callTicket.appendChild(times);
  return callTicket
}

var campaignGenerator = function(campaignType){
  let campaign = advertisingCampaigns[campaignType];
  this.name = campaign.name;
  this.duration = campaign.duration;
  this.type = campaign.type;
  this.frequency = campaign.frequency;
  this.cost = campaign.cost;
  this.id = "advertisement" + (campaigns.length)
}

callTicket.parentNode.removeChild(callTicket)

var i = callQueue.holding.indexOf(call);
callQueue.lost.push(callQueue.holding.splice(i, 1));

var revealPanel = function(panelId){
  let panels = document.getElementsByClassName("panel");
  for (i = 0; i < panels.length; i++){
    panels[i].style.display = "none";
  }
  if (panelId){
    document.getElementById(panelId).style.display = "block"
  }
}*/

/* this function accepts a configuration object, all properties are optional
  config = {
    type = a string from businessTypes or an array of strings from businessTypes
    frequency = an integer 1-10
    opLevel = an integer 1-5
    difficulty = an integer 1-10
    svcQual = an integer 1-5
    callRate = an integer greater than 0, represents cents per operator minutes
  }
*/
