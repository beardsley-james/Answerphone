var advertisingCampaigns = {
  "craigslist": {
    code: "craigslist",
    name: "Craigslist Help Wanted Advertisement",
    duration: 1440,
    type: "hr",
    frequency: 1,
    cost: 100,
    recurringCost: 100,
    config: {},
    description: "Place a simple help wanted advertisement on a local message board",
    enabled: true
  },
  "hvacMagazine": {
    code: "hvacMagazine",
    name: "HVAC Magazine Advertisement",
    description: "Place an advertisement in a trade magazine for HVAC workers and businessowners",
    duration: 1440 * 7,
    type: "sales",
    frequency: 10,
    config: {type: "hvac", difficulty: 5},
    cost: 70000,
    recurringCost: 0,
    enabled: false
  },
  "doctorMagazine": {
    code: "doctorMagazine",
    name: "Medical Journal Advertisement",
    description: "Place an advertisement in a trade magazine for medical professionals",
    duration: 1440 * 7,
    type: "sales",
    frequency: 10,
    config: {type: "doctor", difficulty: 5},
    cost: 70000,
    recurringCost: 0,
    enabled: false
  },
  "lawyerMagazine": {
    code: "lawyerMagazine",
    name: "Law Journal Advertisement",
    description: "Place an advertisement in a trade magazine for legal professionals",
    duration: 1440 * 7,
    type: "sales",
    frequency: 10,
    config: {type: "lawyer", difficulty: 5},
    cost: 70000,
    recurringCost: 0,
    enabled: false
  },
  "newspaper": {
    code: "newspaper",
    name: "Newspaper Advertisement",
    description: "Take out an ad in the local paper looking for clients",
    duration: 1440,
    type: "sales",
    frequency: 5,
    config: {difficulty: 3},
    cost: 1000,
    recurringCost: 1000,
    enabled: true
  },
  "salesman": {
    code: "salesman",
    name: "In-House Salesman",
    description: "Hire a salesperson to find you clients",
    duration: 1440,
    type: "sales",
    frequency: 5,
    config: {difficulty: 2},
    cost: 48000,
    recurringCost: 24000,
    enabled: false
  },
  "perfect": {
    code: "perfect",
    name: "Perfect Advertisement",
    description: "Debug Mode, 1 op/hr",
    duration: 1440,
    type: "hr",
    config: {},
    cost: 0,
    recurringCost: 0,
    frequency: 24,
    enabled: false
  },
  "salesFiesta": {
    code: "salesFiesta",
    name: "Sales Fiesta",
    description: "Debug Mode, 1 client/hr",
    duration: 1440,
    type: "sales",
    config: {},
    frequency: 24,
    cost: 0,
    recurringCost: 0,
    enabled: false
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

var upgrades = [
  {
    name: "Speed Controls",
    code: "speedControls",
    type: "interface",
    description: "Allow for more advanced speed control options",
    cost: 30000,
    enabled: false
  },
  {
    name: "HVAC Trade Magazine Advertisements",
    code: "hvacMagazine",
    type: "advertisement",
    description: "Open an advertising account with a professional HVAC magazine",
    cost: 15000,
    enabled: false
  },
  {
    name: "Medical Journal Advertisements",
    code: "doctorMagazine",
    type: "advertisement",
    description: "Open an advertising account with a medical journal publisher",
    cost: 15000,
    enabled: false
  },
  {
    name: "Legal Journal Advertisements",
    code: "lawyerMagazine",
    type: "advertisement",
    description: "Open an advertising account with a legal journal",
    cost: 15000,
    enabled: false
  },
  {
    name: "Hire Sales Staff",
    code: "salesman",
    type: "advertisement",
    description: "Open a sales department",
    cost: 15000,
    enabled: false
  },
  {
    name: "Raise Service Rates",
    code: "raiseRates",
    type: "interface",
    description: "Unlock the ability to raise rates for your clients",
    cost: 10000,
    enabled: false
  },
  {
    name: "Hourly Call Tracking",
    code: "hourlyTracking",
    type: "interface",
    description: "End of day reports will include an hour-by-hour breakdown of call activity",
    cost: 20000,
    enabled: false
  },
  {
    name: "HVAC Specialization",
    code: "hvacSpecialization",
    type: "specialization",
    description: "Specialize in servicing your HVAC clients",
    cost: 30000,
    enabled: false
  },
  {
    name: "Medical Specialization",
    code: "doctorSpecialization",
    type: "specialization",
    description: "Specialize in servicing your medical clients",
    cost: 30000,
    enabled: false
  },
  {
    name: "Legal Specialization",
    code: "lawyerSpecialization",
    type: "specialization",
    description: "Specialize in servicing your legal clients",
    cost: 30000,
    enabled: false
  }
]
