const rp = require('request-promise-native');
const cheerio = require('cheerio');

const BOSTON_FOOD_TRUCKS_URL = "https://www.boston.gov/departments/small-business-development/city-boston-food-trucks-schedule";

const LUNCH = "Lunch";
const DINNER = "Dinner";

const MONDAY = "Monday";
const TUESDAY = "Tuesday";
const WEDNESDAY = "Wednesday";
const THURSDAY = "Thursday";
const FRIDAY = "Friday";
const SATURDAY = "Saturday";
const SUNDAY = "Sunday";

function visitingFoodTruckHasContent(visitingFoodTruck) {
  return visitingFoodTruck.name.trim() !== ""
}

function getVisitingFoodTrucks($, table, meal, label) {
  function processCellChild(cellChild) {
    if (cellChild.name === "p") {
      if ($(cellChild).find("a").get().length > 0) {
        return {
          "name": $(cellChild).text().trim(),
          "link": $($(cellChild).find("a").get()[0]).attr("href")
        }
      } else {
        return {
          "name": $(cellChild).text().trim(),
        }
      }
    } else {
      return {
        "name": $(cellChild).text().trim(),
        "link": $(cellChild).attr("href")
      }
    }
  }

  const row = $(table.find("td").get().filter(e => $(e).attr("data-label") === "Time period" && $(e).text().indexOf(meal) !== -1)).parent();
  const cell = row.find("td").get().filter(e => $(e).attr("data-label") === label)[0];
  const cellChildren = $(cell).children().get();
  const cellContainsOnlyText = cellChildren.length === 0 && $(cell).text().trim();
  const visitingFoodTrucks = cellContainsOnlyText ? [{ "name": $(cell).text().trim() }] : cellChildren.map(processCellChild)
  return visitingFoodTrucks.filter(visitingFoodTruckHasContent);
}

function getFoodTruckSchedule($, location) {
  const locationHeader = $("a").get().filter(link => $(link).text().indexOf(location) !== -1)[0];
  const table = $(locationHeader).parent().next();

  return {
    lunch: {
      monday: getVisitingFoodTrucks($, table, LUNCH, MONDAY),
      tuesday: getVisitingFoodTrucks($, table, LUNCH, TUESDAY),
      wednesday: getVisitingFoodTrucks($, table, LUNCH, WEDNESDAY),
      thursday: getVisitingFoodTrucks($, table, LUNCH, THURSDAY),
      friday: getVisitingFoodTrucks($, table, LUNCH, FRIDAY),
      saturday: getVisitingFoodTrucks($, table, LUNCH, SATURDAY),
      sunday: getVisitingFoodTrucks($, table, LUNCH, SUNDAY)
    },
    dinner: {
      monday: getVisitingFoodTrucks($, table, DINNER, MONDAY),
      tuesday: getVisitingFoodTrucks($, table, DINNER, TUESDAY),
      wednesday: getVisitingFoodTrucks($, table, DINNER, WEDNESDAY),
      thursday: getVisitingFoodTrucks($, table, DINNER, THURSDAY),
      friday: getVisitingFoodTrucks($, table, DINNER, FRIDAY),
      saturday: getVisitingFoodTrucks($, table, DINNER, SATURDAY),
      sunday: getVisitingFoodTrucks($, table, DINNER, SUNDAY)
    }
  }
}

async function fetchCurrentPage() {
  const html = await rp.get(BOSTON_FOOD_TRUCKS_URL);
  return cheerio.load(html);
}

module.exports = {
  fetchCurrentPage,
  getFoodTruckSchedule
}