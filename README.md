# Loose Change

A single-page web app that finds a random place nearby and gives you a small dare to do there.
Pick a nerve level, a category and a distance, press Spin.

Live: https://barkergaj-apps.github.io/loose-change-mvp/

## How it works

1. Nerve level, category and distance are read from the selectors.
2. The browser asks for your location (once per site, the browser remembers the answer).
3. Google Places (Nearby Search, New) returns up to 20 popular places of the category's types within the radius.
4. One place is picked at random.
5. One dare is picked from the nerve level's dares plus the chosen category's dares.
6. The result shows name, address, distance, the dare, an "Open in Maps" directions link and "Try Again".

Nerve level does not affect the place search, only the dare.

## Editing categories, nerve levels and dares

Everything you are expected to change lives in three files in `src/data/`. No tools are needed:
edit them on GitHub, commit, and the site redeploys itself in about a minute.

### Editing on GitHub

1. Open the file in the editor (these links open it directly):
   - [Edit dares](https://github.com/barkergaj-apps/loose-change-mvp/edit/main/src/data/dares.js)
   - [Edit categories](https://github.com/barkergaj-apps/loose-change-mvp/edit/main/src/data/categories.js)
   - [Edit nerve levels](https://github.com/barkergaj-apps/loose-change-mvp/edit/main/src/data/nerveLevels.js)
2. Add, change or remove lines following the examples below. Keep the commas between entries.
3. Click the green **Commit changes** button at the top right, then **Commit changes** again in the dialog.
   Leave "Commit directly to the main branch" selected.
4. Wait about a minute, then reload the live site. The **Actions** tab of the repo shows the deploy;
   a green tick means it is live.

### Dares (`src/data/dares.js`)

```js
export const DARES = {
  low: ['Notice three things here you’ve never noticed before.', ...],
  medium: [...],
  high: [...],
  categories: {
    food: ['Ask staff what dish they secretly love.', ...],
    drinks: [...],
    activities: [...],
    random: [...],
  },
};
```

- `low`, `medium`, `high` are the nerve levels: these dares apply at that level in any category.
- `categories` holds extra dares per category chip.
- On each spin the app merges the dares of the chosen level with the dares of the chosen category and
  picks one at random.
- Each dare is one quoted line ending with a comma. Add, change or delete lines freely.
  If a dare contains a straight apostrophe (`'`), wrap it in double quotes instead.
- A level or category with no dares at all falls back to a generic "Just enjoy being here".

### Categories (`src/data/categories.js`)

```js
const FOOD_TYPES = ['restaurant', 'meal_takeaway', 'fast_food_restaurant'];
...
export const CATEGORIES = [
  { id: 'food', label: 'Food', types: FOOD_TYPES },
  ...
];
```

- `label` is the chip text the user sees. `id` must match the key used under `categories` in the dares file.
- `types` are the Google place types that count as this category. Only values from the
  [Places API (New) place types table](https://developers.google.com/maps/documentation/places/web-service/place-types)
  work; check the exact spelling there before adding one. A typo makes the search fail for that category.
- Random searches all types of the other categories combined.
- The order of entries is the order of the chips.

### Nerve levels (`src/data/nerveLevels.js`)

```js
{ id: 'low', label: 'Low' },
```

- `label` is the chip text, `id` must match a key in the dares file (`low`, `medium`, `high`).
- To rename a level for users, change only `label`.

### Distance options

The slider steps through `DISTANCE_OPTIONS_KM` in `src/constants.js` (currently 1, 2, 5, 10, 15, 20, 30 km);
`DISTANCE_DEFAULT_INDEX` picks the initial one. Google allows a radius of up to 50 km.
Results are the up to 20 most popular places within the radius, so wide ranges favour well-known places.

### If the site does not update after an edit

Open the **Actions** tab. A red cross on the latest run means the edited file has a syntax error,
usually a missing comma or quote. Click the run, then the `lint` job, and the message names the file and
line. Fix it in the editor and commit again. To undo an edit entirely, open the file on GitHub, click
**History**, pick the previous version and copy it back.

## Project structure

```
index.html              markup only
assets/                 favicon and touch icon
styles/                 tokens (colors, radii), layout, components
src/main.js             wires the selectors and the Spin button
src/spin.js             one spin: location -> Places -> random place -> dare
src/constants.js        distance range, defaults, API URL and field mask
src/data/               the editable lists (see above)
src/api/                Places request and geolocation wrapper
src/helpers/            pure functions: distance, random pick, dare pick, Maps link
src/ui/                 DOM rendering: chips, dial state, result card
src/config.js           API key, git-ignored, generated on deploy
.github/workflows/      lint + deploy to GitHub Pages
```

No bundler and no runtime dependencies: the browser loads `src/` as native ES modules.

## API key

The key is never committed. The deploy workflow writes `src/config.js` from the repository secret
`GOOGLE_PLACES_API_KEY` (Settings -> Secrets and variables -> Actions). Because the app is static, the key
is visible in the browser by design; what protects it is the key's own restrictions in Google Cloud:

- Application restriction: HTTP referrers, allow `https://barkergaj-apps.github.io/*`
  (add `http://localhost:3000/*` if you run it locally).
- API restriction: Places API (New) only.

To rotate the key, update the secret and re-run the latest workflow from the Actions tab
(**Re-run all jobs**). No code change is needed.

## Running locally (for developers)

```bash
git clone git@github.com:barkergaj-apps/loose-change-mvp.git
cd loose-change-mvp
cp src/config.example.js src/config.js   # then paste the key into it
npm install
npm start                                # http://localhost:3000
```

A local server is required: ES modules do not load from `file://`.

## Checks

```bash
npm run lint
npm run format
```

The deploy workflow runs lint first and only deploys when it passes.
