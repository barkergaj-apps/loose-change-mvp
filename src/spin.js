import { getCurrentPosition } from './api/geolocation.js';
import { searchNearby } from './api/places.js';
import { FALLBACK_DARE } from './constants.js';
import { CATEGORIES } from './data/categories.js';
import { DARES } from './data/dares.js';
import { distanceInMeters, formatDistance } from './helpers/distance.js';
import { pickDare } from './helpers/pickDare.js';
import { pickRandom } from './helpers/pickRandom.js';

export const spin = async ({ apiKey, selection }) => {
  const category = CATEGORIES.find((item) => item.id === selection.categoryId);
  const center = await getCurrentPosition();
  const places = await searchNearby({ apiKey, types: category.types, center, radius: selection.distance });

  if (places.length === 0) {
    return null;
  }

  const place = pickRandom(places);
  const dare = pickDare(DARES, selection.nerveId, selection.categoryId);

  return {
    place,
    dare: dare ?? FALLBACK_DARE,
    distanceLabel: formatDistance(distanceInMeters(center, place.location)),
  };
};
