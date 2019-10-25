var purchaseUpgrade = function(upgradeCode){
  let i = upgrades.findIndex(function(upgrade){
    return upgrade.code == upgradeCode
  })
  upgrades[i].enabled = true;
  money -= upgrades[i].cost;
  purchasedUpgrades.push(upgradeCode);
  console.log(upgrades[i].type);
  if (upgrades[i].type == "interface"){
    let items = Array.from(document.getElementsByClassName(upgradeCode));
    items.forEach(function(item){
      item.classList.remove("upgrade")
    })
  } else if (upgrades[i].type == "advertisement"){
    console.log("Advertisement enabled, code " + upgrades[i].code);
    advertisingCampaigns[upgradeCode].enabled = true;
    document.getElementById("advertisingCampaignsMenu").appendChild(renderCampaignButton(advertisingCampaigns[upgradeCode]))
  } else if (upgrades[i].type == "specialization"){
    upgrades.forEach(function(upgrade){
      if (upgrade.type == "specialization"){
        let card = document.getElementById(upgrade.code + "Card");
        card.parentNode.removeChild(card)
      }
    })
  }
  let card = document.getElementById(upgrades[i].code + "Card");
  card.parentNode.removeChild(card);
  document.getElementById("bigMoney").innerHTML = moneyDisplay(money);
}

var phoneRinger = function(client){
  if ((client.frequency * callFreq) >= randomPercent()) {
    let call = new callGen(client);
    callQueue.live.push(call);
    document.getElementById("liveCalls").append(callRender(call))
  }
}

var timer = function(){
  setTimeout(function(){
    if (dailyFreq[day].hasOwnProperty(currentMinute)){
      callFreq = dailyFreq[day][currentMinute];
    }
    clients.forEach(phoneRinger);
    clients.forEach(clientUpdater);
    ops.forEach(callChecker);
    callQueueAdvance();
    callStatBoxRefresh();
    updateCurrentMinute();
    disableUnaffordableButtons();
    checkAdvertisements();
    currentMinute++;
    if (currentMinute % 60 == 0) {
      save()
    }
    if (autoTime && callQueue.holding.length == 0 && callQueue.live.length == 0){
      msPerMin = 10
    } else if (autoTime) {
      msPerMin = 500
    }
    if (currentMinute >= minutesInDay){
      let report = endOfDay();
      renderEndOfDay(report);
      clearDay();
      daysElapsed++
    } else { timer() }
  }, msPerMin)
}

var callChecker = function(op){
  console.log(currentMinute + " " + op.shift[0] + " " + day + " " + op.schedule.includes(day))
  if (currentMinute == op.shift[0] && op.schedule.includes(day)){
    punchIn(op);
    console.log(op.name + " punched in");
  } else if (currentMinute == op.shift[1] && op.working){
    punchOut(op);
    console.log(op.name + " punched out");
  }
  if (op.working){
    if (op.call.length > 0){
      if (op.call[0].timeOnHold == 0 && op.call[0].callTime == 0 && callQueue.live.length > 0){
        callGrabber(op.call, callQueue.holding);
        callGrabber(callQueue.live, op.call);
      } else if (op.call[0].timeToComplete > 0){
        op.call[0].timeToComplete--;
      } else if (op.call[0].timeToComplete == 0) {
        delete op.call[0].timeToComplete;
        increaseSatisfaction(op);
        clients.forEach(function(client){
          if (client.name == op.call[0].client){
            client.callTime += op.call[0].callTime;
            increaseSatisfaction(client);
            if (op.call[0].timeOnHold < 3 && op.call[0].timeRinging < 1){
              increaseSatisfaction(client)
            }
          }
        })
        money += (op.call[0].callTime * op.call[0].rate);
        document.getElementById("bigMoney").innerHTML = moneyDisplay(money);
        callGrabber(op.call, callQueue.completed);
        op.callsCompleted++;
      } else {
        op.call[0].callTime++;
        checkIfCallCompleted(op, op.call[0])
      }
    } else {
      if (callQueue.live.length > 0){
        callGrabber(callQueue.live, op.call);
      } else if (callQueue.holding.length > 0){
        callGrabber(callQueue.holding, op.call);
      } else {
        op.idleTime++;
        op.idleTimer++;
        if (op.idleTimer == 60){
          op.idleTimer = 0;
          decreaseSatisfaction(op)
        }
      }
    }
    op.timeWorked++
  }
  opUpdater(op)
}

var callGrabber = function(target, destination){
  let call = target.pop();
  destination.push(call);
  if (target == callQueue.live || target == callQueue.holding){
    if (document.getElementById("call" + call.callNumber)){
      removeCall(call)
    }
  }
  if (destination == callQueue.holding){
    let holdingQueue = document.getElementById("holdingCalls");
    holdingQueue.append(callRender(call))
  }
  if (destination == callQueue.lost){
    if (document.getElementById("call" + call.callNumber)){
      removeCall(call)
    }
  }
}

var checkIfCallCompleted = function(op, call){
  let skill = op.level + Math.floor(Math.random() * 5);
  let difficulty = call.difficulty;
  if (skill >= difficulty){
    call.timeToComplete = Math.floor(Math.random() * 3)
  }
}

var callQueueAdvance = function(){
  callQueue.holding.forEach(function(call){
    call.timeOnHold++;
    if (call.timeOnHold == 3 || call.timeOnHold == 4){
      clients.forEach(function(client){
        if (client.name == call.client){
          decreaseSatisfaction(client)
        }
      })
    }
    if (call.timeOnHold > 5) {
      clients.forEach(function(client){
        if (client.name == call.client){
          decreaseSatisfaction(client)
        }
      })
      var i = callQueue.holding.indexOf(call);
      callQueue.lost.push(callQueue.holding.splice(i, 1));
      removeCall(call);
    } else {callRefresh(call)}
  })
  callQueue.live.forEach(function(call){
    call.timeRinging++;
    if (call.timeRinging > 3) {
      clients.forEach(function(client){
        if (client.name == call.client){
          decreaseSatisfaction(client)
        }
      })
      var i = callQueue.live.indexOf(call);
      callQueue.lost.push(callQueue.live.splice(i, 1));
      removeCall(call);
    } else {callRefresh(call)}
  })
}

var extractCallNumber = function(elementId){
  let callRegEx = /call(\d+)/;
  let callNum = callRegEx.exec(elementId);
  return callNum[1]
}

var manualAnswer = function(event){
  let target = event.currentTarget;
  let callId = extractCallNumber(target.id);
  let category = target.parentNode.id;
  var callObj = {};
  if (category == "holdingCalls"){
    category = "holding"
  } else {category = "live"}
  callQueue[category].forEach(function(call, index){
    if (call.callNumber == callId) {
      callObj = call;
      callQueue[category].splice(index, 1)
    }
  })
  if (category == "holding"){
    callObj.callTime++;
    clients.forEach(function(client){
      if (client.name == callObj.client){
        client.callTime += callObj.callTime;
        increaseSatisfaction(client)
      }
    })
    money += (callObj.callTime * callObj.rate);
    document.getElementById("bigMoney").innerHTML = moneyDisplay(money);
    callQueue.completed.push(callObj);
    removeCall(callObj)
  } else {
    callQueue.holding.push(callObj);
    removeCall(callObj);
    let holdingQueue = document.getElementById("holdingCalls");
    holdingQueue.append(callRender(callObj))
  }
  callStatBoxRefresh()
}

var endOfDay = function(){
  let report = {
    completedCalls: callQueue.completed.length,
    lostCalls: callQueue.lost.length,
    ops: [],
    clients: [],
    totalTimeOnHold: 0,
    totalTimeRinging: 0,
    totalCallTime: 0,
    amountEarned: 0
  }
  callQueue.completed.forEach(function(call){
    report.totalTimeOnHold += call.timeOnHold;
    report.totalTimeRinging += call.timeRinging;
    report.totalCallTime += call.callTime
  })
  ops.forEach(function(op){
    let opReport = {
      name: op.name,
      callsCompleted: op.callsCompleted,
      idleTime: op.idleTime
    };
    report.ops.push(op);
    if (op.satisfaction < 20){
      if (op.satisfaction < randomPercent()){
        fireOp(op.name)
      }
    }
  })
  clients.forEach(function(client){
    report.amountEarned += (client.callRate * client.callTime);
    let clientReport = {
      name: client.name,
      type: client.type,
      opLevel: client.opLevel,
      callRate: client.callRate,
      callTime: client.callTime
    }
    report.clients.push(client);
    client.satisfaction += 10;
    if (client.satisfaction > 100){
      client.satisfaction = 100
    }
    if (client.satisfaction < 30){
      if (client.satisfaction < randomPercent()){
        terminateClient(client.id)
      }
    }
  })
  return report
}

var clearDay = function(){
  currentMinute = 0;
  callQueue.completed = [];
  callQueue.lost = [];
  ops.forEach(function(op){
    op.idleTime = 0;
    op.call = [];
    op.callsCompleted = 0
  })
  clients.forEach(function(client){
    client.callTime = 0
  })
  if (day == 6){
    day = 0
  } else {day++}
}

var disableUnaffordableButtons = function(){
  let buttons = document.getElementsByClassName("expenditure");
  let buttonRegEx = /dol(\d+)/;
  let className = 0;
  for (i = 0; i < buttons.length; i++){
    className = buttons[i].className.split(" ")[1];
    if (parseInt(buttonRegEx.exec(className)[1]) > money){
      buttons[i].disabled = true
    } else { buttons[i].disabled = false }
  }
}

var startCampaign = function(campaignType){
  let campaign = new campaignGenerator(campaignType);
  campaigns.push(campaign);
  money -= campaign.cost;
  document.getElementById("activeCampaigns").append(renderCampaignCard(campaign));
  document.getElementById(campaign.code + "Ad").style.display = "none"
}

var checkAdvertisements = function(){
  campaigns.forEach(function(campaign){
    if (campaign.duration == 0){
      let i = campaigns.indexOf(campaign);
      updateAdvertisementCard(campaign);
      campaigns.splice(i, 1);
      document.getElementById(campaign.code + "Ad").style.display = "list-item"
    } else {
      if ((Math.random() * 1000) <= campaign.frequency){
        if (campaign.type == "hr"){
          possibleOps.push(new opGenerator());
          document.getElementById("availableOps").appendChild(renderEmploymentApp(possibleOps.slice(-1)[0]))
        } else if (campaign.type == "sales"){
          possibleClients.push(new clientGenerator(campaign.config));
          document.getElementById("availableClients").appendChild(renderSalesLead(possibleClients.slice(-1)[0]))
        }
      }
      updateAdvertisementCard(campaign);
      campaign.duration --
    }
  })
}

var hireOp = function(opInitials){
  let i = possibleOps.findIndex(function(op){
    return op.name == opInitials
  })
  ops.push(possibleOps.splice(i, 1)[0]);
  document.getElementById("operators").appendChild(renderOpCard(ops[ops.length - 1]));
  document.getElementById("opPool").appendChild(renderOpStatus(ops[ops.length - 1]))
  let application = document.getElementById(opInitials + "application");
  application.parentNode.removeChild(application)
}

var declineOp = function(opInitials){
  let i = possibleOps.findIndex(function(op){
    return op.name == opInitials
  })
  possibleOps.splice(i, 1);
  let application = document.getElementById(opInitials + "application");
  application.parentNode.removeChild(application)
}

var acceptContract = function(clientId){
  let i = possibleClients.findIndex(function(client){
    return client.id == clientId
  })
  console.log(i);
  let client = possibleClients.splice(i, 1)[0];
  let clientCard = renderClientCard(client);
  document.getElementById("clients").appendChild(clientCard);
  clients.push(client);
  let lead = document.getElementById("lead" + clientId);
  lead.parentNode.removeChild(lead)
}

var declineContract = function(clientId){
  let i = possibleClients.findIndex(function(client){
    return client.id == clientId
  })
  possibleClients.splice(i, 1);
  let lead = document.getElementById("lead" + clientId);
  lead.parentNode.removeChild(lead)
}

var fireOp = function(opInitials){
  let i = ops.findIndex(function(op){
    return op.name == opInitials
  })
  ops.splice(i, 1);
  let queueCard = document.getElementById("queue" + opInitials);
  let opCard = document.getElementById("op" + opInitials);
  queueCard.parentNode.removeChild(queueCard);
  opCard.parentNode.removeChild(opCard)
}

var promoteOp = function(opInitials){
  let i = ops.findIndex(function(op){
    return op.name == opInitials
  })
  ops[i].level++;
  let opLevel = document.getElementById(opInitials + "level");
  opLevel.innerHTML = ops[i].level;
  let opQueueLevel = document.getElementById("queue" + opInitials + "name");
  opQueueLevel.innerHTML = ops[i].level + " " + ops[i].name
}

var terminateClient = function(clientId){
  let i = clients.findIndex(function(client){
    return client.id == clientId
  })
  clients.splice(i, 1);
  let clientCard = document.getElementById("client" + clientId);
  clientCard.parentNode.removeChild(clientCard)
}

var raiseRates = function(clientId){
  let i = clients.findIndex(function(client){
    return client.id == clientId
  })
  client.satisfaction -= 10;
  if (client.satisfaction < 0){
    client.satisfaction = 0
  }
  if (client.satisfaction < randomPercent()){
    terminateClient(client.name)
  } else {
    clients[i].callRate += 10;
    document.getElementById("rate" + clientId).innerHTML = moneyDisplay(clients[i].callRate)
  }
}

var increaseSatisfaction = function(entity){
  if (entity.satisfaction < 100){
    entity.satisfaction++
  }
}

var decreaseSatisfaction = function(entity){
  if (entity.satisfaction > 0){
    entity.satisfaction--
  }
}

var punchIn = function(op){
  op.working = true;
  document.getElementById("opPool").appendChild(renderOpStatus(op))
}

var punchOut = function(op){
  op.working = false;
  let card = document.getElementById("queue" + op.name);
  card.parentNode.removeChild(card)
}



//timer()

//revealPanel("callQueue")

renderSaveGames();
revealPanel("loadGame")
