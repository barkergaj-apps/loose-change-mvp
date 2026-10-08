import { pickRandom } from './pickRandom.js';

export const pickDare = (dares, nerveId, categoryId) => {
  const forLevel = dares.filter((dare) => dare.level === nerveId);
  const forCategory = forLevel.filter((dare) => dare.categories?.includes(categoryId));
  const pool = forCategory.length > 0 ? forCategory : forLevel;

  return pool.length > 0 ? pickRandom(pool).text : null;
};
