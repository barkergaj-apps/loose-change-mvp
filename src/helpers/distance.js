import { DEGREES_IN_HALF_TURN, EARTH_RADIUS_METERS, METERS_PER_KM } from '../constants.js';

const toRadians = (degrees) => (degrees * Math.PI) / DEGREES_IN_HALF_TURN;

export const distanceInMeters = (from, to) => {
  const deltaLat = toRadians(to.latitude - from.latitude);
  const deltaLng = toRadians(to.longitude - from.longitude);
  const haversine =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(toRadians(from.latitude)) * Math.cos(toRadians(to.latitude)) * Math.sin(deltaLng / 2) ** 2;

  return 2 * EARTH_RADIUS_METERS * Math.asin(Math.sqrt(haversine));
};

export const formatDistance = (meters) => {
  if (meters < METERS_PER_KM) {
    return `${Math.round(meters)} m`;
  }

  return `${(meters / METERS_PER_KM).toFixed(1)} km`;
};
