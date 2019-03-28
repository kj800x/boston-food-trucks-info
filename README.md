# boston-food-trucks-info

Simple library to scrape data from the boston food trucks website 

## Installation

```bash
npm install --save boston-food-trucks-info
```

## Usage

```js
const { fetchCurrentPage, getFoodTruckSchedule } = require("boston-food-trucks-info");

fetchCurrentPage().then(page => {
  const chinaTradeBuilding = getFoodTruckSchedule(page, "China Trade Building");
  console.log(chinaTradeBuilding);
})
```

### Sample Output
```json
{
  "lunch": {
    "monday": [
      {
        "name": "Oath Pizza",
        "link": "http://oathpizza.com/"
      }
    ],
    "tuesday": [
      {
        "name": "Chef Leo's Kitchen"
      }
    ],
    "wednesday": [
      {
        "name": "Perros Paisas",
        "link": "https://www.facebook.com/Perros-Paisas-En-Boston-748803585293605/"
      }
    ],
    "thursday": [
      {
        "name": "IQ Cooking on Wheels",
        "link": "https://twitter.com/dragonrollgrill?lang=en"
      }
    ],
    "friday": [],
    "saturday": [],
    "sunday": []
  },
  "dinner": {
    "monday": [],
    "tuesday": [],
    "wednesday": [],
    "thursday": [],
    "friday": [],
    "saturday": [],
    "sunday": []
  }
}
```

## API Reference

```typescript
interface Page {
  /* This type is internal and should be treated as a blackbox */
}

interface VisitingFoodTruck {
  name: string;
  link?: string;
}

interface FoodTruckSchedule {
  lunch: {
    monday: VisitingFoodTruck[];
    tuesday: VisitingFoodTruck[];
    wednesday: VisitingFoodTruck[];
    thursday: VisitingFoodTruck[];
    friday: VisitingFoodTruck[];
    saturday: VisitingFoodTruck[];
    sunday: VisitingFoodTruck[];
  },
  dinner: {
    monday: VisitingFoodTruck[];
    tuesday: VisitingFoodTruck[];
    wednesday: VisitingFoodTruck[];
    thursday: VisitingFoodTruck[];
    friday: VisitingFoodTruck[];
    saturday: VisitingFoodTruck[];
    sunday: VisitingFoodTruck[];
  }
}

/**
 * Uses a http request to fetch the current food truck data page.
 * The returned Page object should only be used by passing it to dataByLocation. It
 * specifically is not part of the public api.
 */
fetchCurrentPage(): Promise<Page>;

/**
 * Processes the Page object to extract the FoodTruckSchedule for the given location.
 */
getFoodTruckSchedule(page: Page, location: string): FoodTruckSchedule; 

```