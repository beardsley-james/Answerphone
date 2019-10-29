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

/*

clients.forEach(function(client){
  if (client.name == op.call[0].client){
    client.callTime += op.call[0].callTime;
    if (client.satisfaction < 100){
      client.satisfaction++
    }
  }
})

*/

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

/* sample save file

{
  "time": "2019-10-29T03:22:32.921Z",
  "msPerMin": 10,
  "callFreq": 7,
  "currentMinute": 1339,
  "day": 0,
  "money": 100000,
  "daysElapsed": 0,
  "clientId": 5,
  "callNumber": 8,
  "campaignId": 2,
  "clients": [
    {
      "type": "hvac",
      "name": "HVAC by Carlos LaRocque",
      "frequency": 4,
      "opLevel": 1,
      "svcQual": 1,
      "callRate": 31,
      "callTime": 0,
      "id": 0,
      "satisfaction": 45
    },
    {
      "type": "doctor",
      "name": "The Office of Dr Chantal Jolly",
      "frequency": 2,
      "opLevel": 1,
      "svcQual": 1,
      "callRate": 52,
      "callTime": 0,
      "id": 1,
      "satisfaction": 48
    }
  ],
  "ops": [
    {
      "name": "VLK",
      "level": 1,
      "payRate": 500,
      "experience": {
        "name": "Bureaucrat",
        "code": "bureaucrat",
        "focus": 3,
        "personability": 2
      },
      "background": {
        "name": "Personal Referral",
        "code": "referral",
        "focus": 2,
        "personability": 3
      },
      "focus": 5,
      "personability": 5,
      "shift": [
        420,
        990
      ],
      "schedule": [
        0,
        1,
        2,
        3,
        5
      ],
      "call": [],
      "idleTime": 0,
      "timeWorked": 600,
      "working": false,
      "callsCompleted": 0,
      "satisfaction": 50,
      "idleTimer": 0
    },
    {
      "name": "KOJ",
      "level": 1,
      "payRate": 500,
      "experience": {
        "name": "Bureaucrat",
        "code": "bureaucrat",
        "focus": 3,
        "personability": 2
      },
      "background": {
        "name": "Personal Referral",
        "code": "referral",
        "focus": 2,
        "personability": 3
      },
      "focus": 5,
      "personability": 5,
      "shift": [
        480,
        870
      ],
      "schedule": [
        0,
        1,
        3,
        4,
        6
      ],
      "call": [],
      "idleTime": 0,
      "timeWorked": 0,
      "working": false,
      "callsCompleted": 0,
      "satisfaction": 50,
      "idleTimer": 0
    },
    {
      "name": "YXS",
      "level": 1,
      "payRate": 500,
      "experience": {
        "name": "Teacher",
        "code": "teacher",
        "focus": 2,
        "personability": 3
      },
      "background": {
        "name": "Prison",
        "code": "prison",
        "focus": 4,
        "personability": 1
      },
      "focus": 6,
      "personability": 4,
      "shift": [
        930,
        60
      ],
      "schedule": [
        0,
        1,
        3,
        4,
        6
      ],
      "call": [],
      "idleTime": 0,
      "timeWorked": 600,
      "working": false,
      "callsCompleted": 0,
      "satisfaction": 50,
      "idleTimer": 0
    }
  ],
  "callQueue": {
    "live": [
      {
        "name": "Kay Basiewicz",
        "client": "HVAC by Carlos LaRocque",
        "type": "hvac",
        "message": "Leaky hot water heater",
        "difficulty": 1,
        "timeRinging": 1,
        "timeOnHold": 0,
        "callTime": 0,
        "dispatchTime": 0,
        "custSatisfaction": 0,
        "callNumber": 7,
        "rate": 31
      }
    ],
    "holding": [],
    "completed": [],
    "lost": [
      [
        {
          "name": "Yooneque Edick",
          "client": "HVAC by Carlos LaRocque",
          "type": "hvac",
          "message": "Leaky pipe",
          "difficulty": 1,
          "timeRinging": 4,
          "timeOnHold": 0,
          "callTime": 0,
          "dispatchTime": 0,
          "custSatisfaction": 0,
          "callNumber": 0,
          "rate": 31
        }
      ],
      [
        {
          "name": "Tricia Maggiacomo",
          "client": "HVAC by Carlos LaRocque",
          "type": "hvac",
          "message": "No AC",
          "difficulty": 1,
          "timeRinging": 4,
          "timeOnHold": 0,
          "callTime": 0,
          "dispatchTime": 0,
          "custSatisfaction": 0,
          "callNumber": 1,
          "rate": 31
        }
      ],
      [
        {
          "name": "Richard Clazien",
          "client": "HVAC by Carlos LaRocque",
          "type": "hvac",
          "message": "No AC",
          "difficulty": 1,
          "timeRinging": 4,
          "timeOnHold": 0,
          "callTime": 0,
          "dispatchTime": 0,
          "custSatisfaction": 0,
          "callNumber": 2,
          "rate": 31
        }
      ],
      [
        {
          "name": "Wayne Imgrund",
          "client": "The Office of Dr Chantal Jolly",
          "type": "doctor",
          "message": "Uncontrollabe flatulance",
          "difficulty": 1,
          "timeRinging": 4,
          "timeOnHold": 0,
          "callTime": 0,
          "dispatchTime": 0,
          "custSatisfaction": 0,
          "callNumber": 3,
          "rate": 52
        }
      ],
      [
        {
          "name": "Thom Hodges",
          "client": "HVAC by Carlos LaRocque",
          "type": "hvac",
          "message": "Leaky pipe",
          "difficulty": 1,
          "timeRinging": 4,
          "timeOnHold": 0,
          "callTime": 0,
          "dispatchTime": 0,
          "custSatisfaction": 0,
          "callNumber": 4,
          "rate": 31
        }
      ],
      [
        {
          "name": "Audrea Pan",
          "client": "The Office of Dr Chantal Jolly",
          "type": "doctor",
          "message": "Blood in urine",
          "difficulty": 1,
          "timeRinging": 4,
          "timeOnHold": 0,
          "callTime": 0,
          "dispatchTime": 0,
          "custSatisfaction": 0,
          "callNumber": 5,
          "rate": 52
        }
      ],
      [
        {
          "name": "Sheila Savles",
          "client": "HVAC by Carlos LaRocque",
          "type": "hvac",
          "message": "Out of freon",
          "difficulty": 1,
          "timeRinging": 4,
          "timeOnHold": 0,
          "callTime": 0,
          "dispatchTime": 0,
          "custSatisfaction": 0,
          "callNumber": 6,
          "rate": 31
        }
      ]
    ]
  },
  "campaigns": [
    {
      "name": "Perfect Advertisement",
      "duration": 965,
      "type": "hr",
      "frequency": 24,
      "cost": 0,
      "id": "advertisement0",
      "code": "perfect"
    },
    {
      "name": "Sales Fiesta",
      "duration": 966,
      "type": "sales",
      "frequency": 24,
      "cost": 0,
      "id": "advertisement1",
      "code": "salesFiesta"
    }
  ],
  "possibleOps": [
    {
      "name": "XUD",
      "level": 1,
      "payRate": 500,
      "experience": {
        "name": "Retail Salesperson",
        "code": "retail",
        "focus": 1,
        "personability": 4
      },
      "background": {
        "name": "Homemaker",
        "code": "homemaker",
        "focus": 2,
        "personability": 3
      },
      "focus": 3,
      "personability": 7,
      "shift": [
        870,
        60
      ],
      "schedule": [
        0,
        1,
        2,
        3,
        5
      ],
      "call": [],
      "idleTime": 0,
      "timeWorked": 0,
      "working": false,
      "callsCompleted": 0,
      "satisfaction": 50,
      "idleTimer": 0
    },
    {
      "name": "KVO",
      "level": 1,
      "payRate": 500,
      "experience": {
        "name": "Livery Driver",
        "code": "driver",
        "focus": 3,
        "personability": 2
      },
      "background": {
        "name": "Underachiever",
        "code": "underachiever",
        "focus": 4,
        "personability": 1
      },
      "focus": 7,
      "personability": 3,
      "shift": [
        540,
        990
      ],
      "schedule": [
        0,
        1,
        2,
        3,
        6
      ],
      "call": [],
      "idleTime": 0,
      "timeWorked": 0,
      "working": false,
      "callsCompleted": 0,
      "satisfaction": 50,
      "idleTimer": 0
    },
    {
      "name": "SRN",
      "level": 1,
      "payRate": 500,
      "experience": {
        "name": "Retail Salesperson",
        "code": "retail",
        "focus": 1,
        "personability": 4
      },
      "background": {
        "name": "Student",
        "code": "student",
        "focus": 3,
        "personability": 2
      },
      "focus": 4,
      "personability": 6,
      "shift": [
        930,
        1410
      ],
      "schedule": [
        0,
        1,
        2,
        4,
        5
      ],
      "call": [],
      "idleTime": 0,
      "timeWorked": 0,
      "working": false,
      "callsCompleted": 0,
      "satisfaction": 50,
      "idleTimer": 0
    },
    {
      "name": "FHE",
      "level": 1,
      "payRate": 500,
      "experience": {
        "name": "Retail Salesperson",
        "code": "retail",
        "focus": 1,
        "personability": 4
      },
      "background": {
        "name": "Underachiever",
        "code": "underachiever",
        "focus": 4,
        "personability": 1
      },
      "focus": 5,
      "personability": 5,
      "shift": [
        390,
        990
      ],
      "schedule": [
        0,
        2,
        3,
        4,
        5
      ],
      "call": [],
      "idleTime": 0,
      "timeWorked": 0,
      "working": false,
      "callsCompleted": 0,
      "satisfaction": 50,
      "idleTimer": 0
    },
    {
      "name": "PQT",
      "level": 1,
      "payRate": 500,
      "experience": {
        "name": "Teacher",
        "code": "teacher",
        "focus": 2,
        "personability": 3
      },
      "background": {
        "name": "Personal Referral",
        "code": "referral",
        "focus": 2,
        "personability": 3
      },
      "focus": 4,
      "personability": 6,
      "shift": [
        0,
        480
      ],
      "schedule": [
        0,
        1,
        2,
        3,
        5
      ],
      "call": [],
      "idleTime": 0,
      "timeWorked": 0,
      "working": false,
      "callsCompleted": 0,
      "satisfaction": 50,
      "idleTimer": 0
    },
    {
      "name": "SEM",
      "level": 1,
      "payRate": 500,
      "experience": {
        "name": "Teacher",
        "code": "teacher",
        "focus": 2,
        "personability": 3
      },
      "background": {
        "name": "Hobbyist",
        "code": "hobby",
        "focus": 3,
        "personability": 2
      },
      "focus": 5,
      "personability": 5,
      "shift": [
        540,
        990
      ],
      "schedule": [
        0,
        2,
        3,
        4,
        5
      ],
      "call": [],
      "idleTime": 0,
      "timeWorked": 0,
      "working": false,
      "callsCompleted": 0,
      "satisfaction": 50,
      "idleTimer": 0
    },
    {
      "name": "LAX",
      "level": 1,
      "payRate": 500,
      "experience": {
        "name": "Retail Salesperson",
        "code": "retail",
        "focus": 1,
        "personability": 4
      },
      "background": {
        "name": "Personal Referral",
        "code": "referral",
        "focus": 2,
        "personability": 3
      },
      "focus": 3,
      "personability": 7,
      "shift": [
        960,
        1350
      ],
      "schedule": [
        0,
        1,
        2,
        3,
        6
      ],
      "call": [],
      "idleTime": 0,
      "timeWorked": 0,
      "working": false,
      "callsCompleted": 0,
      "satisfaction": 50,
      "idleTimer": 0
    },
    {
      "name": "SNP",
      "level": 1,
      "payRate": 500,
      "experience": {
        "name": "Livery Driver",
        "code": "driver",
        "focus": 3,
        "personability": 2
      },
      "background": {
        "name": "Underachiever",
        "code": "underachiever",
        "focus": 4,
        "personability": 1
      },
      "focus": 7,
      "personability": 3,
      "shift": [
        540,
        930
      ],
      "schedule": [
        0,
        1,
        2,
        3,
        5
      ],
      "call": [],
      "idleTime": 0,
      "timeWorked": 0,
      "working": false,
      "callsCompleted": 0,
      "satisfaction": 50,
      "idleTimer": 0
    }
  ],
  "possibleClients": [
    {
      "type": "hvac",
      "name": "Richard Kowalik AC Services",
      "frequency": 4,
      "opLevel": 1,
      "svcQual": 2,
      "callRate": 10,
      "callTime": 0,
      "id": 2,
      "satisfaction": 50
    },
    {
      "type": "doctor",
      "name": "Personal Care by Dr Aimee",
      "frequency": 2,
      "opLevel": 1,
      "svcQual": 5,
      "callRate": 31,
      "callTime": 0,
      "id": 3,
      "satisfaction": 50
    },
    {
      "type": "hvac",
      "name": "AC & Heating by Margot",
      "frequency": 6,
      "opLevel": 1,
      "svcQual": 4,
      "callRate": 16,
      "callTime": 0,
      "id": 4,
      "satisfaction": 50
    }
  ],
  "purchasedUpgrades": []
} */
