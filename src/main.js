import {
  DEFAULT_CATEGORY_ID,
  DEFAULT_NERVE_ID,
  DISTANCE_DEFAULT_METERS,
  DISTANCE_MAX_METERS,
  DISTANCE_MIN_METERS,
  DISTANCE_STEP_METERS,
} from './constants.js';
import { CATEGORIES } from './data/categories.js';
import { NERVE_LEVELS } from './data/nerveLevels.js';
import { formatDistance } from './helpers/distance.js';
import { spin } from './spin.js';
import { renderChips } from './ui/chips.js';
import { setDialBusy } from './ui/dial.js';
import { renderEmpty, renderError, renderResult } from './ui/result.js';

const elements = {
  nerveChips: document.getElementById('nerve-chips'),
  categoryChips: document.getElementById('category-chips'),
  distanceInput: document.getElementById('distance-input'),
  distanceOutput: document.getElementById('distance-output'),
  dial: document.getElementById('dial'),
  result: document.getElementById('result'),
};

const selection = {
  nerveId: DEFAULT_NERVE_ID,
  categoryId: DEFAULT_CATEGORY_ID,
  distance: DISTANCE_DEFAULT_METERS,
};

const loadApiKey = async () => {
  try {
    const config = await import('./config.js');

    return config.GOOGLE_PLACES_API_KEY;
  } catch (error) {
    console.error('Missing src/config.js, see README', error);

    return null;
  }
};

const renderSelectors = () => {
  renderChips(elements.nerveChips, NERVE_LEVELS, selection.nerveId, (id) => {
    selection.nerveId = id;
    renderSelectors();
  });
  renderChips(elements.categoryChips, CATEGORIES, selection.categoryId, (id) => {
    selection.categoryId = id;
    renderSelectors();
  });
  elements.distanceOutput.textContent = formatDistance(selection.distance);
};

const onSpin = async () => {
  const apiKey = await loadApiKey();

  if (!apiKey) {
    renderError(elements.result, 'API key is not configured. See README.');

    return;
  }

  setDialBusy(elements.dial, true);

  try {
    const outcome = await spin({ apiKey, selection });

    if (outcome) {
      renderResult(elements.result, outcome, onSpin);
    } else {
      renderEmpty(elements.result);
    }
  } catch (error) {
    console.error('Spin failed', error);
    renderError(elements.result, error.message);
  } finally {
    setDialBusy(elements.dial, false);
  }
};

elements.distanceInput.min = DISTANCE_MIN_METERS;
elements.distanceInput.max = DISTANCE_MAX_METERS;
elements.distanceInput.step = DISTANCE_STEP_METERS;
elements.distanceInput.value = DISTANCE_DEFAULT_METERS;
elements.distanceInput.addEventListener('input', (event) => {
  selection.distance = Number(event.target.value);
  elements.distanceOutput.textContent = formatDistance(selection.distance);
});
elements.dial.addEventListener('click', onSpin);

renderSelectors();
