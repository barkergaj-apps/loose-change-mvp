import { GEOLOCATION_TIMEOUT_MS } from '../constants.js';

export const getCurrentPosition = () =>
  new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'));

      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => resolve({ latitude: coords.latitude, longitude: coords.longitude }),
      (error) => reject(new Error(`Location unavailable: ${error.message}`)),
      { timeout: GEOLOCATION_TIMEOUT_MS },
    );
  });
