var messages = {
  "hvac": [
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
    {fix: "suf", text: " Brothers Plumbing & Heating"},
    {fix: "pre", text: "HVAC by "},
    {fix: "suf", text: " Heating & Air Conditioning"},
    {fix: "suf", text: " Comfort Systems"},
    {fix: "pre", text: "AC & Heating by "},
    {fix: "suf", text: " AC Services"}
  ],
  doctor: [
    {fix: "pre", text: "The Office of Dr "},
    {fix: "pre", text: "Dr "},
    {fix: "pre", text: "Personal Care by Dr "}
  ],
  lawyer: [
    {fix: "pre", text: "The Office of Attorney "},
    {fix: "pre", text: "Law Offices of "},
    {fix: "suf", text: " Esquire, Attorney at Law"}
  ]
}

var names = {
  first: [
    "Benny",
    "June",
    "Lawrence",
    "Tyler",
    "Kelly",
    "James",
    "Conrad",
    "Margot",
    "Fiona",
    "Steve",
    "Aram",
    "Phyllis",
    "Yooneque",
    "Muhammed",
    "Blaskowitz",
    "Graham",
    "Ibrahim",
    "Devon",
    "Pierre",
    "Carlos",
    "Hans",
    "Gretchen",
    "Sly",
    "Trevor",
    "Morgan",
    "Richard",
    "Ingrid",
    "Kay",
    "Wayne",
    "Alex",
    "Anthony",
    "Dara",
    "Yvonne",
    "Sheila",
    "Diane",
    "Rip",
    "Janina",
    "Carolyn"
  ],
  last: [
    "Taylor",
    "Rodriguez",
    "Beardsley",
    "Grogan",
    "Johnson",
    "Williams",
    "Stanley",
    "Persaud",
    "Chmielewski",
    "Stevenson",
    "Lee",
    "Loveless",
    "Abele",
    "Brown",
    "Chaudhry",
    "Ormond",
    "Garcia",
    "LaRocque",
    "Mapel",
    "McGuiness",
    "O'Sullivan",
    "Martinez",
    "Parnassus",
    "Florence",
    "VanNostrand",
    "Gotobed",
    "Romero",
    "Coka",
    "Hodges",
    "McKinney",
    "Syke",
    "Saperstein",
    "Matos",
    "Kowalik",
    "Bloomquist"
  ]
}

var businessTypes = ["hvac", "doctor", "lawyer"]

var callFreqRanges = {
  hvac: [3, 7],
  doctor: [2, 8],
  lawyer: [6, 9]
}

var dailyFreq = {
  monday: {
    "0": 2,
    "360": 3,
    "420": 5,
    "511": 3,
    "720": 7,
    "780": 3,
    "1080": 8,
    "1200": 5,
    "1300": 3,
  }
}
