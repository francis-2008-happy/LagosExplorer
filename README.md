# Overview

I built this software to learn how geographic information systems work in
practice. Before starting I had written JavaScript, TypeScript and React, but I
had never used a mapping library of any kind. I wanted to understand what a web
map actually is underneath — that it is a grid of small tile images fetched on
demand, and that markers are positioned by latitude and longitude rather than by
pixels — rather than treating a map as a black box component I drop onto a page.

**Lagos Explorer** is an interactive web map of 26 notable places across Lagos,
Nigeria. Each location belongs to one of seven categories — Landmark, Market,
Hospital, Transit, Tech Hub, Education and Recreation — and each category is
drawn with its own colour of map pin, so the type of a place is readable at a
glance without clicking anything.

**How to use the software.** Open the site and the map loads centred on Lagos.
Drag to pan and scroll to zoom, the same as any web map. Click any pin to open a
popup showing that place's name, a coloured category badge, a short description
and its street address. A control panel in the top-right corner lists all seven
categories, each with a colour dot matching its pins, so it works as a legend as
well as a filter. Untick a category to hide its markers and tick it to bring them
back; a counter shows how many places are currently displayed out of the total,
and "Show all" and "Hide all" buttons reset the selection in one click. On a
narrow screen the panel becomes a two-column bar across the top so the map stays
usable underneath it.

**Source of the data.** The map imagery comes from **OpenStreetMap**, a free,
openly licensed map of the world built by volunteer contributors. The tiles are
requested directly from OpenStreetMap's tile servers and need no API key or
billing account; attribution is displayed on the map as the Open Database
License requires. The 26 locations themselves are a dataset I assembled by hand,
stored as a typed array in `data/locations.ts`. Each entry holds a name,
category, description, street address, latitude and longitude, and I checked the
coordinates for each place against OpenStreetMap so every pin lands on the
correct street or neighbourhood.

My purpose in writing this was to get real experience with the parts of GIS work
that only show up when you build something: choosing a sensible zoom level for a
city that spreads 40km from Ojo to Lekki, understanding why a marker icon needs
an anchor point, and learning how to structure location data so that adding a
27th place is a five-line edit rather than a change to the map code. I also
wanted to solve a genuine integration problem — running a browser-only mapping
library inside a framework that renders on the server first.

Software Demo Video: https://www.loom.com/share/c453b6504b3345eaa4178a4e4422561b


# Development Environment

**Tools**

- Visual Studio Code
- Node.js v24 and npm v11
- Git and GitHub for version control
- Windows 11
- Chrome DevTools for inspecting rendered HTML and debugging

**Language and libraries**

The software is written in **TypeScript**, running on **React 19** and the
**Next.js 16 App Router**. I used TypeScript rather than plain JavaScript so
that invalid data fails the build instead of producing a broken map. For
example, a location's category is typed as a union of exact strings:

```ts
export type Category =
  | "Landmark" | "Market" | "Hospital" | "Transit"
  | "Tech Hub" | "Education" | "Recreation";
```

Misspelling a category as `"Hospitl"` stops the build and names the file and
line, rather than producing a marker that silently disappears from the filter.

| Library | Version | Role |
| --- | --- | --- |
| next | 16.3.4 | React framework (App Router) |
| react / react-dom | 19.2.8 | UI library |
| leaflet | 1.9.4 | The mapping engine |
| react-leaflet | 5.0.0 | React components wrapping Leaflet |
| typescript | 5 | Static typing |

**Leaflet** is an open-source mapping library in the same family as ArcGIS,
Google Maps and Bing Maps. I chose it with **OpenStreetMap** tiles because the
combination requires no API key, no developer account and no billing details,
which removed an entire class of risk from the project.

The most significant technical problem I had to solve was that Leaflet needs the
browser's `window` object, but Next.js renders components on the server first,
in Node.js, where `window` does not exist — which crashes with
`ReferenceError: window is not defined`. Marking the component `"use client"` is
not enough on its own, because that means a component *also* runs in the
browser; Next.js still pre-renders it once on the server. The fix is to load the
map through `next/dynamic` with `{ ssr: false }`, which skips the server render
entirely:

```tsx
const Map = dynamic(() => import("./Map"), {
  ssr: false,
  loading: () => <p>Loading map…</p>,
});
```

Because `{ ssr: false }` is not allowed inside a Server Component, and App Router
pages are Server Components by default, the map is reached through three files:
`app/page.tsx` (server) → `components/MapView.tsx` (client, does the dynamic
import) → `components/Map.tsx` (the Leaflet map, browser only).

# Useful Websites

* [Leaflet API Reference](https://leafletjs.com/reference.html)
* [React Leaflet Documentation](https://react-leaflet.js.org/)
* [Next.js Documentation](https://nextjs.org/docs)
* [OpenStreetMap](https://www.openstreetmap.org/)
* [MDN Web Docs](https://developer.mozilla.org/)

# Future Work

* Add a search box so a user can find a place by name instead of only by category
* Store the active filters in the URL so a filtered view can be shared as a link
* Add a sidebar listing the visible places, where clicking an entry pans the map to that marker
* Cluster markers at low zoom so dense areas such as Lagos Island do not overlap
* Load the location data from a public API instead of a local file, so the map stays up to date automatically
* Improve keyboard accessibility so the map and filter panel can be used without a mouse
* Expand the dataset beyond 26 places and add photographs to the popups
