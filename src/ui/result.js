import { directionsLink } from '../helpers/mapsLink.js';

const show = (container, html) => {
  container.innerHTML = html;
  container.classList.remove('hidden');
  container.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const escapeHtml = (text) => {
  const node = document.createElement('span');

  node.textContent = text;

  return node.innerHTML;
};

export const renderResult = (container, { place, distanceLabel, dare }, onTryAgain) => {
  show(
    container,
    `
      <p class="result-place">${escapeHtml(place.name)}</p>
      <p class="result-address">${escapeHtml(place.address)}</p>
      <p class="result-distance">${distanceLabel} away</p>
      <div class="dare">
        <span class="dare-label">Your dare</span>
        <span>${escapeHtml(dare)}</span>
      </div>
      <div class="actions">
        <a class="button button-ghost" href="${directionsLink(place.location)}" target="_blank" rel="noopener">Open in Maps</a>
        <button class="button button-primary" type="button" data-action="try-again">Try Again</button>
      </div>
    `,
  );
  container.querySelector('[data-action="try-again"]').addEventListener('click', onTryAgain);
};

export const renderEmpty = (container) => {
  show(container, '<p class="message">Nothing in range. Try a wider distance or another category.</p>');
};

export const renderError = (container, message) => {
  show(container, `<p class="message message-error">${escapeHtml(message)}</p>`);
};
