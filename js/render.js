var callRender = function(call){
  let callTicket = document.createElement("div");
  callTicket.setAttribute("class", "call");
  let name = document.createElement("b");
  name.innerHTML = call.name;
  let message = document.createElement("span");
  message.innerHTML = call.message;
  let business = document.createElement("i");
  business.innerHTML = call.client;
  callTicket.appendChild(name);
  callTicket.appendChild(lineBreak());
  callTicket.appendChild(message);
  callTicket.appendChild(lineBreak());
  callTicket.appendChild(business);
  return callTicket
}

var lineBreak = function(){
  let br = document.createElement("br");
  return br
}
