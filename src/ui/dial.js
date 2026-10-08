import { DIAL_BUSY_LABEL, DIAL_IDLE_LABEL } from '../constants.js';

export const setDialBusy = (dial, isBusy) => {
  dial.disabled = isBusy;
  dial.textContent = isBusy ? DIAL_BUSY_LABEL : DIAL_IDLE_LABEL;
};
