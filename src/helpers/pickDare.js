import { pickRandom } from './pickRandom.js';

export const pickDare = (dares, nerveId, categoryId) => {
  const pool = [...(dares[nerveId] ?? []), ...(dares.categories?.[categoryId] ?? [])];

  return pool.length > 0 ? pickRandom(pool) : null;
};
