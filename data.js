// data.js: the starter reports and reporters, kept in arrays for now.
// It holds the same data as seed.sql, which we use with the database in Class 4.

const incidents = [
  {
    id: 9,
    title: "Crude spill at K-Dere creek",
    type: "Oil spill",
    community: "K-Dere",
    lga: "Gokana",
    description: "Oil across the surface of the creek for roughly 200 metres.",
    severity: "High",
    photo: "images/kdere-spill.webp",
    status: "New",
    status_reason: "",
    reporter_code: "418302",
    reported_on: "2026-09-22"
  },
  {
    id: 8,
    title: "Flare stack restarted at Kpean",
    type: "Gas flaring",
    community: "Kpean",
    lga: "Gokana",
    description: "The old flare stack was relit after months quiet. Ash is settling on rooftops.",
    severity: "High",
    photo: "images/kpean-flare.webp",
    status: "New",
    status_reason: "",
    reporter_code: "561283",
    reported_on: "2026-09-19"
  },
  {
    id: 7,
    title: "Sheen on the water at Kono jetty",
    type: "Oil spill",
    community: "Kono",
    lga: "Tai",
    description: "A thin oily sheen spreading from a pipeline crossing near the jetty.",
    severity: "Medium",
    photo: "images/kono-sheen.webp",
    status: "Under review",
    status_reason: "A HYPREP team visits the jetty on Friday.",
    reporter_code: "290047",
    reported_on: "2026-09-16"
  },
  {
    id: 6,
    title: "Night flaring at Bomu",
    type: "Gas flaring",
    community: "Bomu",
    lga: "Gokana",
    description: "A flare burning through the night, visible from the village.",
    severity: "Medium",
    photo: "images/bomu-flare.webp",
    status: "Under review",
    status_reason: "Operator asked to explain the restart.",
    reporter_code: "735119",
    reported_on: "2026-09-13"
  },
  {
    id: 5,
    title: "Discoloured stream near Kaa",
    type: "Water contamination",
    community: "Kaa",
    lga: "Khana",
    description: "The stream that feeds the village turned grey overnight. Dead fish on the surface.",
    severity: "High",
    photo: "images/kaa-water.webp",
    status: "New",
    status_reason: "",
    reporter_code: "290047",
    reported_on: "2026-09-06"
  },
  {
    id: 4,
    title: "Drums beside farmland at Nchia",
    type: "Waste dumping",
    community: "Nchia",
    lga: "Eleme",
    description: "Four metal drums left at the edge of a cassava farm. Contents unknown.",
    severity: "Medium",
    photo: "images/nchia-drums.webp",
    status: "Under review",
    status_reason: "Samples taken from the drums for testing.",
    reporter_code: "735119",
    reported_on: "2026-09-04"
  },
  {
    id: 3,
    title: "Brown water at Bori borehole",
    type: "Water contamination",
    community: "Bori",
    lga: "Khana",
    description: "Borehole water running brown with a strong smell.",
    severity: "Medium",
    photo: "images/bori-water.webp",
    status: "Resolved",
    status_reason: "Borehole flushed and retested. Water clear.",
    reporter_code: "418302",
    reported_on: "2026-09-02"
  },
  {
    id: 2,
    title: "Well water tastes of fuel at Sime",
    type: "Water contamination",
    community: "Sime",
    lga: "Tai",
    description: "Two household wells close to each other now taste of fuel.",
    severity: "High",
    photo: "images/sime-well.webp",
    status: "Resolved",
    status_reason: "Wells capped and a new borehole drilled.",
    reporter_code: "418302",
    reported_on: "2026-08-28"
  },
  {
    id: 1,
    title: "Burnt drums at Eleme roadside",
    type: "Waste dumping",
    community: "Akpajo",
    lga: "Eleme",
    description: "Burnt drums and ash dumped along the roadside, with a strong chemical smell.",
    severity: "Low",
    photo: "images/akpajo-drums.webp",
    status: "Not an incident",
    status_reason: "This is a council waste-burning point, not a spill.",
    reporter_code: "561283",
    reported_on: "2026-08-25"
  }
];

const reporters = [
  { id: 1, name: "Barine Nwiado", phone: "08031234567", community: "K-Dere", code: "418302" },
  { id: 2, name: "Comfort Deezia", phone: "08037654321", community: "Bori", code: "290047" },
  { id: 3, name: "Ledum Kpone", phone: "08034567890", community: "Bomu", code: "735119" },
  { id: 4, name: "Nedam Gbarale", phone: "08039876543", community: "Kpean", code: "561283" }
];

module.exports = {
  incidents: incidents,
  reporters: reporters
};
