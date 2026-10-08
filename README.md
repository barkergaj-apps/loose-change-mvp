# Loose Change

A single-page web app that finds a random place nearby and gives you a small dare to do there.
Pick a nerve level, a category and a distance, press Spin.

Live: https://barkergaj-apps.github.io/loose-change-mvp/

## How it works

1. Nerve level, category and distance are read from the selectors.
2. The browser asks for your location.
3. Google Places (Nearby Search, New) returns up to 20 places of the category's types within the radius.
4. One place is picked at random.
5. One dare is picked for the nerve level, preferring dares tagged with the chosen category.
6. The result shows name, address, distance, the dare, an "Open in Maps" directions link and "Try Again".

Nerve level does not affect the place search, only the dare.

## Editing the lists

Everything you are expected to change lives in `src/data/`. Edit a file on GitHub (pencil icon),
commit to `main`, and the site redeploys in about a minute.

### `src/data/nerveLevels.js`

```js
{ id: 'calm', label: 'Calm' }
```

`id` is what dares refer to, `label` is what the user sees. Order here is the order of the chips.

### `src/data/categories.js`

```js
{ id: 'cafe', label: 'Cafe', types: ['cafe', 'coffee_shop', 'bakery'] }
```

`types` are Google place types that count as this category. Only types from the
[Places API (New) table](https://developers.google.com/maps/documentation/places/web-service/place-types)
work; a typo there makes the request fail for that category.

### `src/data/dares.js`

```js
{ level: 'bold', text: 'Compliment a stranger' }
{ level: 'bold', text: "Try something you've never ordered before", categories: ['cafe', 'food'] }
```

`level` must match a nerve level `id`. `categories` is optional: when present, the dare is preferred
for those categories; when a level has no dare tagged with the chosen category, any dare of that level
is used.

Distance range and defaults are in `src/constants.js`.

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

## Running locally

```bash
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
