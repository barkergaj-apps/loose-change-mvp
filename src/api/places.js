import { PLACES_FIELD_MASK, PLACES_MAX_RESULTS, PLACES_SEARCH_NEARBY_URL } from '../constants.js';

export const searchNearby = async ({ apiKey, types, center, radius }) => {
  const response = await fetch(PLACES_SEARCH_NEARBY_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': PLACES_FIELD_MASK,
    },
    body: JSON.stringify({
      includedTypes: types,
      maxResultCount: PLACES_MAX_RESULTS,
      rankPreference: 'DISTANCE',
      locationRestriction: {
        circle: {
          center: { latitude: center.latitude, longitude: center.longitude },
          radius,
        },
      },
    }),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));

    throw new Error(body.error?.message ?? `Places request failed (${response.status})`);
  }

  const { places = [] } = await response.json();

  return places.map((place) => ({
    id: place.id,
    name: place.displayName?.text ?? 'Unnamed place',
    address: place.formattedAddress ?? '',
    location: place.location,
  }));
};
