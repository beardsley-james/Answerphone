var messages = {
  "hvac": [
    "No AC",
    "No Heat",
    "Out of freon",
    "Leaky hot water heater",
    "Toilet clogged",
    "Leaky pipe"
  ]
}

var businessNames = {
  hvac: [
    {fix: "suf", text: " Brothers Plumbing & Heating"},
    {fix: "pre", text: "HVAC by "},
    {fix: "suf", text: " Heating & Air Conditioning"}
  ]
}

var names = {
  first: ["Benny", "June", "Lawrence", "Tyler", "Kelly", "James", "Conrad", "Margot", "Fiona", "Steve", "Aram", "Phyllis", "Yooneque", "Muhammed", "Blaskowitz"],
  last: ["Taylor", "Rodriguez", "Beardsley", "Grogan", "Johnson", "Williams", "Stanley", "Persaud", "Chmielewski", "Stevenson", "Lee", "Loveless", "Abele", "Brown"]
}

var businessType = ["hvac"]

var generateFullName = function(){
  let firstName = names.first[Math.floor(Math.random()*names.first.length)],
  lastName = names.last[Math.floor(Math.random()*names.last.length)];
  return firstName + " " + lastName
}

var generateBusinessName = function(type){
  let pool = businessNames.type;
  let nameTemplate = pool[Math.floor(Math.random()*pool.length)];
  let name = names.last[Math.floor(Math.random()*names.last.length)];
  if (nameTemplate.fix == "suf"){
    return name + nameTemplate
  } else {
    return nameTemplate + name
  }
}
