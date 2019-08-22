var callRender = function(call){
  let callTicket = document.createElement("div");
  callTicket.setAttribute("id", ("call" + call.callNumber))
  callTicket.setAttribute("class", "call");
  let name = document.createElement("b");
  name.innerHTML = call.name;
  let message = document.createElement("span");
  message.innerHTML = call.message;
  let business = document.createElement("i");
  business.innerHTML = call.client;
  let times = document.createElement("span");
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

var lineBreak = function(){
  let br = document.createElement("br");
  return br
}

var removeCall = function(call){
  let callId = "call" + call.callNumber;
  let callTicket = document.getElementById(callId);
  callTicket.parentNode.removeChild(callTicket)
}
