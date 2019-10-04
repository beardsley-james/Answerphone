var advertisingCampaigns = {
  "craigslist": {
    code: "craigslist",
    name: "Craigslist Help Wanted",
    duration: 180,
    type: "hr",
    frequency: 1,
    cost: 0
  },
  "tradeMagazine": {
    code: "tradeMagazine",
    name: "Trade Magazine Advertisement",
    duration: 1440 * 30,
    type: "sales",
    frequency: 3,
    cost: 30000
  },
  "perfect": {
    code: "perfect",
    name: "Perfect Advertisement",
    duration: 1440 * 0.2,
    type: "hr",
    frequency: 1000,
    cost: 0
  },
  "salesFiesta": {
    code: "salesFiesta",
    name: "Sales Fiesta",
    duration: 100,
    type: "sales",
    frequency: 1000,
    cost: 0
  }
}

var messages = {
  hvac: [
    "No AC",
    "No Heat",
    "Out of freon",
    "Leaky hot water heater",
    "Toilet clogged",
    "Leaky pipe"
  ],
  doctor: [
    "Bad headache",
    "Out of meds",
    "Vomitting and diarrhea",
    "Blood in urine",
    "Gout flare up",
    "Uncontrollabe flatulance",
    "Botched circumcision"
  ],
  lawyer: [
    "Speeding ticket",
    "Jaywalking",
    "Unfairly terminated",
    "Needs help with security clearance",
    "Slip and fall",
    "Untimely death"
  ]
}

var businessNames = {
  hvac: [
    {nameType: "last", pre: "", suf: " Brothers Plumbing & Heating"},
    {nameType: "full", pre: "HVAC by ", suf: ""},
    {nameType: "full", pre: "", suf: " Heating & Air Conditioning"},
    {nameType: "last", pre: "", suf: " Comfort Systems"},
    {nameType: "first", pre: "AC & Heating by ", suf: ""},
    {nameType: "full", pre: "", suf: " AC Services"}
  ],
  doctor: [
    {nameType: "full", pre: "The Office of Dr ", suf: ""},
    {nameType: "full", pre: "Dr ", suf: ", M.D."},
    {nameType: "first", pre: "Personal Care by Dr ", suf: ""}
  ],
  lawyer: [
    {nameType: "full", pre: "The Office of Attorney ", suf: ""},
    {nameType: "full", pre: "Law Offices of ", suf: ""},
    {nameType: "last", pre: "Attorney ", suf: " Esquire, Attorney at Law"}
  ]
}

var businessTypes = ["hvac", "doctor", "lawyer"]

var callFreqRanges = {
  hvac: [3, 7],
  doctor: [2, 8],
  lawyer: [6, 9]
}

var dailyFreq = [
  {"0": 2, "60": 1, "360": 3, "450": 7, "480": 6, "540": 3, "720": 7, "780": 3, "900": 4, "990": 7, "1020": 8, "1080": 5, "1170": 3},
  {"0": 2, "60": 1, "360": 3, "450": 6, "480": 5, "540": 3, "720": 6, "780": 3, "900": 4, "990": 6, "1020": 7, "1080": 4, "1170": 3},
  {"0": 2, "60": 1, "360": 3, "450": 6, "480": 5, "540": 3, "720": 5, "780": 3, "990": 5, "1020": 6, "1080": 4, "1170": 3},
  {"0": 2, "60": 1, "360": 3, "450": 5, "540": 3, "720": 5, "780": 3, "990": 5, "1020": 6, "1080": 4, "1170": 3},
  {"0": 2, "60": 1, "360": 3, "450": 6, "540": 3, "720": 6, "780": 4, "900": 5, "990": 7, "1020": 8, "1080": 5, "1170": 3},
  {"60": 2, "360": 3, "480": 6, "540": 7, "840": 5, "960": 6, "1140": 5, "1260": 4, "1320": 3},
  {"60": 2, "360": 1, "420": 3, "480": 4, "660": 3, "960": 5, "1140": 3, "1320": 2}
]

var daysOfTheWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
