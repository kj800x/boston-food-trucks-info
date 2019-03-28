const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");

const { getFoodTruckSchedule } = require(path.join(__dirname, ".."));

const html = fs.readFileSync(path.join(__dirname, "__data__", "city-boston-food-trucks-schedule.html"));
const $ = cheerio.load(html);

const LOCATIONS = [
  "Opera Place",
  "BU West",
  "BU East",
  "China Trade Building",
  "Stuart Street",
  "Belvidere Street"
]

describe("getJsonForLocation", () => {
  LOCATIONS.forEach(location => {
    it(`works on ${location}`, () => {
      expect(getFoodTruckSchedule($, location)).toMatchSnapshot();
    })
  })
})