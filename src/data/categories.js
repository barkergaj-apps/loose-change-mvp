// types: https://developers.google.com/maps/documentation/places/web-service/place-types
const FOOD_TYPES = ['restaurant', 'meal_takeaway', 'fast_food_restaurant'];
const DRINKS_TYPES = ['cafe', 'coffee_shop', 'bar', 'pub'];
const ACTIVITIES_TYPES = [
  'bowling_alley',
  'amusement_center',
  'movie_theater',
  'museum',
  'park',
  'tourist_attraction',
];

export const CATEGORIES = [
  { id: 'food', label: 'Food', types: FOOD_TYPES },
  { id: 'drinks', label: 'Drinks', types: DRINKS_TYPES },
  { id: 'activities', label: 'Activities', types: ACTIVITIES_TYPES },
  { id: 'random', label: 'Random', types: [...FOOD_TYPES, ...DRINKS_TYPES, ...ACTIVITIES_TYPES] },
];
