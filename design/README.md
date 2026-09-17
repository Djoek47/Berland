# Handoff: Faberland — map, 3D plot view, rental checkout

Repo this belongs to: `Djoek47/Berland` (branch `master`).

## Overview

Faberland is a browser metaverse: a circular island ("the egg") holding 48 rentable
Faberplots. A visitor lands on a top-down map, picks an exact plot, walks inside it in
3D, fits it out with furniture, and rents it. The long-term 3D editor runs on Unreal
Pixel Streaming; the web mock in this bundle stands in until the signalling server is
attached.

This bundle covers three things:

1. **Faberland Map** — the zoomable top-down map of all 48 plots plus the 3D plot
   interior, furniture placement, lighting, the pixel-streaming stub, and the
   cart/checkout drawer. This is the main deliverable.
2. **Site pages** — Accueil, Company, Eggs, Spaces, Faberplot, Showcase, Get started,
   Parcours client. Page mockups on the same visual system.
3. **Planche de style** — the authoritative style board: palette, type scale,
   Fibonacci spacing, radii, elevation rules, component states.

## About the design files

**Everything in `design/` is a design reference, not production code.** The HTML
prototypes exist to show the intended look, proportion, copy and behaviour precisely.
The task is to **recreate them inside the target codebase's own environment** — its
framework, component library, routing and state conventions — not to drop these files
into the app. The `.dc.html` files in particular are a design-tool format; read them for
values and structure, then rebuild.

`Faberland Map.html` + `map-app.js` + `plots-plan.js` are the exception in one respect:
the three.js scene code and the plot geometry data are genuinely reusable logic and can
be ported nearly as-is. `support.js` is design-tool runtime — **ignore it entirely**.

## Fidelity

**High fidelity.** Colors, type, spacing, radii, transition timings, copy and
interaction behaviour are final and intentional. Recreate them exactly. Where a value
looks arbitrary it is usually Fibonacci (see Design Tokens) — keep it.

Two things are deliberately unfinished and must not be treated as final:

- **Plot positions on the map** are a schematic reconstruction of the Unreal top-down
  plan, not a survey. The client will supply exact coordinates. Keep the geometry in one
  data file so it can be replaced wholesale.
- **Medium and Large square footage** is `null` on purpose. Only Small is documented
  (2,500 sq ft exterior / 7,500 sq ft interior). The UI hides what it cannot cite —
  preserve that behaviour rather than inventing numbers.

## Design tokens

### Color

| Token | Hex | Use |
|---|---|---|
| `--bg` | `#0A0A09` | page background |
| `--surface` | `#131210` | cards, sidebar, drawer, inputs |
| `--surface2` | `#1C1A17` | hover fill, pressed toggle |
| (4th surface) | `#232019` | deepest raised surface (style board) |
| `--border` | `#262420` | default hairline |
| `--border-strong` | `#35312A` | control borders |
| `--border-focus` | `#4A443A` | hover/focus borders |
| `--ink` | `#F4F1E9` | primary text |
| `--sec` | `#A8A093` | secondary text |
| `--ter` | `#6E675C` | tertiary text, mono labels |
| `--gold` | `#D4A24C` | accent, prices, primary button, links |
| `--gold-hover` | `#E3B667` | accent hover |
| `--pos` | `#4E8C6A` | positive |
| `--warn` | `#C08A3E` | warning, caveat note border |
| `--neg` | `#B4553F` | negative, ad wall marker |

Map-only markers: our store `#7C5CBF`, entrance portal `#4B7FD4`, island edge
`#8FD44C`, available plot fill `#2A2721`, leased plot fill `#1A1814`.
Overlay plates use `rgba(10,10,9,0.88)`; the drawer scrim is `rgba(6,6,5,0.72)`;
the pixel-streaming pane background is `#06060A`.

**No gradients and no shadows anywhere.** Depth comes from surface steps and 1px
hairlines only. Border width is always 1px — it is the one value exempt from Fibonacci.

### Typography

Three families, loaded from Google Fonts:

```
Space+Grotesk:wght@400;500;600;700
Inter:wght@400;500;600
IBM+Plex+Mono:wght@400;500
```

- **Space Grotesk 600** — all headings, prices, numeric readouts.
  `42/46 -0.02em` (page h1), `34/42 -0.01em`, `26/34 -0.01em` (section h2, tooltip
  price, drawer title), `21/30` (tooltip name, cart line item).
- **Inter 400** — body, `16/26`. Inter 500 on buttons, 600 on primary buttons.
  Small body `14px`.
- **IBM Plex Mono 400** — labels and metadata, `10/16`, `letter-spacing 0.02em`,
  usually uppercase, usually `--ter`. This is the system's signature texture; use it
  for every eyebrow, legend row, status line and caveat.

Prices and areas use `font-variant-numeric: tabular-nums`.

### Spacing

Fibonacci only: **3 · 5 · 8 · 13 · 21 · 34 · 55 · 89 · 144 · 233 · 392**. Built on a
16px base. Layout proportions use φ: the style board splits `38.1fr / 61.9fr`.

Common applications: `13px 21px` plate/card padding, `21px 34px` drawer padding,
`34px` page gutter and section gap, `144px` between major sections.

### Radii, sizing, motion

- Radius `10px` on everything rectangular; `999px` on pills and small buttons;
  `3px` on legend swatches.
- Control heights: `55px` primary/standard button and input, `34px` small pill button,
  `89px` header, `21px` cart count badge.
- Fixed widths: sidebar `340px`, drawer sheet `432px`, stream card max `520px`,
  map title max `360px`, tooltip min `196px`.
- Transitions: `89ms cubic-bezier(0.16, 1, 0.3, 1)` on hover states,
  `89ms linear` on fills and tooltip opacity, `233ms linear` on the dive veil.
- Honour `prefers-reduced-motion: reduce` — the prototype collapses all durations to 1ms.

## Screens

### 1 — Map (`#mapView`)

**Purpose:** choose one of 48 plots.

**Layout:** fixed full-viewport shell, `flex column`. An `89px` header with a `1px`
bottom hairline, then a `flex:1` stage. The stage holds the map, the 3D room and the
drawer as absolutely-positioned siblings, so switching views never remounts the header.

The map is a `1000 × 1000` SVG viewBox (`preserveAspectRatio="xMidYMid meet"`) inside a
`#mapWorld` div that carries the pan/zoom `transform` (`transform-origin: 0 0`,
`will-change: transform`). Background is the only permitted radial fill:
`radial-gradient(circle at 50% 45%, #14150F 0%, #0A0A09 62%)`. Cursor `grab`,
`grabbing` while panning.

**Overlays**, all `rgba(10,10,9,0.88)` + `1px solid --border` + `10px` radius +
`13px 21px` padding:

- **Title plate**, top-left at `34px/21px`, max `360px`. Mono eyebrow "Faberland ·
  top-down"; h1 "Pick your exact store."; mono help text "Click any lit plot to walk
  inside it in 3D. Scroll to zoom, drag to pan. Closer to the entrance portal costs
  more."
- **Legend**, bottom-left at `34px`, behind a "Legend" pill toggle that relabels to
  "Hide legend". Six rows: available, leased, our own store · #21, ad wall (to remove),
  entrance portal, island edge. Footnote: "Schematic reconstruction of the Unreal
  top-down plan."
- **Zoom bar**, bottom-right at `34px`: three `55px` square buttons — `−`, `+`, `FIT`.
- **Tooltip** `#tip`, follows the cursor, `pointer-events: none`, fades at `89ms`.
  Shows plot name (Space Grotesk 21/30), price in gold (26/34), district, size, and
  status line — "Available — click to walk in" or the leased state.

**Plot rendering:** each plot is an SVG `<g class="plot">` carrying `data-id`. Hover
fills the body rect gold and flips the label to `--bg`. Leased plots get
`cursor: not-allowed`, darken to `#1A1814` instead, and do not open.

**Header:** brand mark + wordmark left; right side holds the mono breadcrumb
("Map · 48 plots" → "Map / Central / Faberplot #19"), the cart pill with its count
badge, and — only inside a plot — "Back to the map" and the primary "Rent …" button.

### 2 — Plot interior, 3D (`#roomView`)

**Purpose:** see and fit out the exact space before renting.

**Layout:** `flex row` — a `flex:1` canvas wrap plus a `340px` sidebar with a left
hairline and `--surface` background.

**Canvas (three.js, r0.184):** a shop interior shell with orbit controls. The interior
is built larger than the plot's exterior footprint, and that footprint is drawn on the
floor as a **gold dotted line** — the "bigger inside than outside" principle made
literal, and the single most important thing not to lose in the port.

**Top overlay** (`#roomTop`, inset `21px`, `flex-wrap: wrap` so it reflows on narrow
canvases): the plot label plate, and the area plate showing Exterior (`2,500`) beside
Interior in gold (`7,500`), split by a `1px × 34px` divider, with the mono note "Bigger
inside than out. The dotted floor line is the exterior footprint."

**Sidebar:** h2 "Fit out the space"; mono instruction "Click a piece to drop it in, then
drag it on the floor. Selected piece: R rotates, Delete removes."; a 2-column `8px`-gap
palette of six furniture types (rack, table, plinth, shelf, mannequin, counter) as
`55px` buttons; a "Placed" list; a "Lighting" 2-column group with three moods; and a
warning-bordered caveat, in French, stating the scene is a web mock and final editing
will run through Unreal pixel streaming.

**Controls:** click palette to add · drag to move on the floor plane · `R` rotates the
selection · `Delete` removes it · orbit by drag, zoom by scroll.

**Transition:** clicking a plot fades `#veil` (`--bg`, `233ms`) to full, swaps views,
fits the camera, resets the stream toggle to web mock, then fades back out.

### 3 — Pixel-streaming stub

**Purpose:** the seam where the Unreal build takes over.

A pill toggle sits bottom-left of the canvas: **Web mock** / **Unreal stream**, the
active one filled `--surface2` with `--ink` text (drive it from `aria-pressed`).
Choosing Unreal shows a full-canvas `#06060A` pane, centred card max `520px`:

- mono eyebrow "Pixel streaming · stub"
- h2 "Connect the Unreal signalling server"
- body: "Same gestures, engine render. Point this at your Pixel Streaming signalling
  URL; the handshake below is wired and waiting for a real endpoint."
- an editable URL field defaulting to `wss://stream.faberland.io/signalling` plus a gold
  **Connect** button
- a `min-height:144px` mono log, `aria-live="polite"`, that plays a timestamped
  handshake: open socket (0ms) → ICE servers requested (420ms) → offer sent (900ms) →
  **no instance answered within 1800 ms** in `--warn` (1800ms) → "Stub: no signalling
  server is attached to this prototype yet." (2100ms) → "Falling back to the web mock —
  the fit-out you place here carries over." (2300ms)
- footnote that input forwarding, resolution and touch mapping are stubbed, plus a
  "Back to web mock" pill

**When you implement this for real:** replace the fake sequence with a real WebRTC
signalling client against that URL, keep the log surface (it is genuinely useful during
integration), keep the web mock as the fallback path when no instance is available, and
carry the placed-furniture state across into the streamed session.

### 4 — Cart and checkout (`#drawer`)

**Purpose:** lease one or more plots.

Right-hand sheet, `432px`, over a `rgba(6,6,5,0.72)` scrim. Header with the step title
and a mono "Close"; scrolling body; footer with the actions. Dismiss on scrim click or
`Escape`. A 3-segment `3px` progress bar (gold when reached) shows on every step after
the cart.

1. **Your plots** — one line per plot: "Faberplot #19" with a mono
   "Central district · Small · 2,500 sq ft outside" sub-line, gold price right-aligned,
   "Remove" below it. Footer shows the monthly total and a **Checkout** button, disabled
   when empty. Empty state: "No plots yet. Walk into a plot on the map and rent it from
   the header."
2. **Who is renting** — brand or company, contact email, opening date.
3. **Payment** — rent line (`$N /mo`), refundable deposit, **Due today** in gold at
   26/34. Caveat: "Payment is stubbed in this prototype. Nothing is charged."
4. **Lease started** — "Keys handed over." plus a confirmation line; the action clears
   the cart and returns to the map.

The **Rent** button in the header adds the current plot, opens the drawer at step 1, and
then reads "In cart · #19" at 55% opacity. Plot #21 shows "Our own store".

⚠ **Both commercial rules here are placeholder and need client confirmation:** the
deposit equals one month's rent, and the three form fields are a guess. Do not ship
either without checking.

## Interactions & behavior

| Action | Result |
|---|---|
| scroll / pinch on map | zoom toward the cursor |
| drag on map | pan |
| click a lit plot | veil fade → 3D interior, breadcrumb updates |
| click a leased plot | nothing; cursor already signals it |
| hover a plot | tooltip follows cursor |
| `Escape` | close the drawer |
| `R` in 3D | rotate the selected piece |
| `Delete` in 3D | remove the selected piece |
| Back to the map | return; header buttons hide again |

**One bug to not reintroduce.** The map originally called `setPointerCapture` on
`pointerdown`, which retargeted the subsequent click to the map background and silently
swallowed every plot click. Capture the pointer **only after the pointer has moved past
a ~6px threshold**, i.e. once the gesture is definitely a pan. A synthetic click test
passes either way — verify with a real press-and-release.

## State

- `view`: `'map' | 'room'`
- `current`: selected plot object, or null
- `pan`/`zoom`: map transform; `moved` accumulator for the drag/click discrimination
- `placed[]`: furniture instances — type, position, rotation; `selected` index
- `lighting`: one of three moods
- `streamMode`: `'web' | 'unreal'`; `streamLog[]`; timer handles to clear on exit
- `cart[]`: `{ id, price, size, district, sqft }`, persisted to `localStorage` under
  `faberland.cart.v1`
- `step`: `0` cart · `1` details · `2` payment · `3` done

No network calls anywhere in the prototype. In the real app, plot inventory, prices,
lease status and the fit-out should all come from the backend; `plots-plan.js` is the
shape of that payload.

## Data

`design/plots-plan.js` is real, portable data — port it rather than retyping:

- `ISLAND` `{cx:500, cy:500, r:430}`, `DISTRICT_BOX`, `ROAD`, `ENTRANCE` — map geometry
  in the 1000×1000 world.
- `PRICES` — all 48 monthly prices, **$53–$95**, taken verbatim from the repo's
  `lib/plot-prices.ts`. Authoritative.
- `LEASED` `[4, 7, 23, 30, 41]` — test rentals from `data/plots.json`. The brief asks
  for these to be reset, so treat them as sample state, not truth.
- `OUR_STORE` `21`.
- `PLOTS` — 48 rects across three sections, each deriving `price`, `leased`, `ours` and
  a `size` bucket from its area.
- `SQFT` `{Small: 2500, Medium: null, Large: null}` — see the Fidelity note.
- `DISTRICT_OF` — ids 1–12 Market, 13–28 Central, 29–48 Arts.

## Assets

`design/assets/` (23 files) — all referenced by relative path, so the folder layout must
be kept if you open the prototypes locally.

- Logos: `faberland-cream.png`, `faberland-gold.png`, `faberland-ink.png`,
  `mark-star.png`, `visser-cream.png`, `visser-ink.png`
- Eggs: `egg-hero`, `egg-bronze`, `egg-crimson`, `egg-ember`, `egg-flame`, `egg-hatch`,
  `egg-obsidian`, `egg-ocean`, `egg-rose`, `egg-smoke`, `egg-verdant`
- Plans: `plan-island.png`, `plan-marked.png`
- Photography: `shot-interior.png`, `shot-street-1/2/3.png`

Client logos are still outstanding — the project title reflects that. Wherever a partner
logo appears, expect a swap.

## Files

```
design/
  Faberland Map.html      map + 3D + stream stub + checkout — markup, tokens, all CSS
  map-app.js              three.js scene, pan/zoom, tooltip, cart & checkout logic
  plots-plan.js           plot geometry, prices, districts, sq ft  ← port this
  Accueil.dc.html         home
  Company.dc.html         company
  Eggs.dc.html            eggs
  Spaces.dc.html          /spaces — plot browser, built from the real price table
  Faberplot.dc.html       single plot detail
  Showcase.dc.html        showcase
  Get started.dc.html     onboarding entry
  Parcours client.dc.html customer journey
  Planche de style.dc.html  STYLE BOARD — read this first
  support.js              design-tool runtime — ignore
  assets/                 logos, eggs, plans, photography
```

Open `Faberland Map.html` directly in a browser to see the interactive prototype; it
needs no build step (three.js loads from unpkg via an import map with SRI hashes).
The `.dc.html` files are design-tool documents — read them as source, don't run them.

## Suggested order of work

1. Read `Planche de style.dc.html`; encode the tokens above into the codebase's theme.
2. Port `plots-plan.js` as typed data behind whatever the real API will be.
3. Build the map: SVG plot layer, pan/zoom, tooltip, legend, dive transition. Mind the
   pointer-capture bug.
4. Build the 3D interior with the exterior-footprint floor line and the fit-out sidebar.
5. Cart and checkout, with the deposit rule confirmed first.
6. Replace the streaming stub with a real signalling client.
