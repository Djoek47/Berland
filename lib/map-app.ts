// @ts-nocheck — faithful port of design/map-app.js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ISLAND, DISTRICT_BOX, ROAD, ENTRANCE, PLOTS, DISTRICT_OF, OUR_STORE, SQFT } from '@/lib/plots-plan';

let mapMounted = false;

/** Mount Faberland map + 3D room + cart. Call after the map DOM exists. */
export function mountMapApp(): void {
  if (mapMounted) return;

  const svgEl = document.getElementById('plan');
  if (!svgEl) return;
  mapMounted = true;
  while (svgEl.firstChild) svgEl.removeChild(svgEl.firstChild);
  const paletteEl = document.getElementById('palette');
  const lightingEl = document.getElementById('lighting');
  if (paletteEl) paletteEl.innerHTML = '';
  if (lightingEl) lightingEl.innerHTML = '';

  const SVGNS = 'http://www.w3.org/2000/svg';
  const el = id => document.getElementById(id);
  const svg = el('plan');

  /* ------------------------------------------------------------------ map */

  function n(tag, attrs, parent) {
    const e = document.createElementNS(SVGNS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    (parent || svg).appendChild(e);
    return e;
  }

  const defs = n('defs', {});
  const grass = n('radialGradient', { id: 'grass', cx: '50%', cy: '45%', r: '65%' }, defs);
  n('stop', { offset: '0%', 'stop-color': '#1B2015' }, grass);
  n('stop', { offset: '100%', 'stop-color': '#101309' }, grass);

  // island
  n('circle', { cx: ISLAND.cx, cy: ISLAND.cy, r: ISLAND.r, fill: 'url(#grass)' });
  n('circle', { cx: ISLAND.cx, cy: ISLAND.cy, r: ISLAND.r, fill: 'none', stroke: '#8FD44C', 'stroke-width': 7, opacity: 0.9 });
  n('circle', { cx: ISLAND.cx, cy: ISLAND.cy, r: ISLAND.r - 9, fill: 'none', stroke: '#D8F07A', 'stroke-width': 2, opacity: 0.5 });

  // road + plaza ground
  n('rect', { x: ROAD.x, y: ROAD.y, width: ROAD.w, height: ROAD.h, fill: '#2B2823' });
  n('rect', { x: DISTRICT_BOX.x - 14, y: DISTRICT_BOX.y - 16, width: DISTRICT_BOX.w + 28, height: DISTRICT_BOX.h + 32, rx: 12, fill: '#3A241C' });
  n('rect', { x: DISTRICT_BOX.x - 14, y: 420, width: DISTRICT_BOX.w + 28, height: 44, fill: '#472B20' });

  // green survey square from the Unreal capture
  n('rect', {
    x: DISTRICT_BOX.x - 22, y: DISTRICT_BOX.y - 24,
    width: DISTRICT_BOX.w + 44, height: DISTRICT_BOX.h + 48,
    fill: 'none', stroke: '#8FD44C', 'stroke-width': 3, 'stroke-dasharray': '13 8', opacity: 0.75
  });

  // ad wall (third-party signage) + entrance portal
  n('rect', { x: 300, y: 392, width: 34, height: 60, rx: 4, fill: '#B4553F', opacity: 0.65 });
  const ent = n('g', {});
  n('rect', { x: ENTRANCE.x, y: ENTRANCE.y, width: ENTRANCE.w, height: ENTRANCE.h, rx: 8, fill: '#16233A', stroke: '#4B7FD4', 'stroke-width': 3 }, ent);
  n('line', { x1: ENTRANCE.x + 12, y1: ENTRANCE.y + 12, x2: ENTRANCE.x + ENTRANCE.w - 12, y2: ENTRANCE.y + ENTRANCE.h - 12, stroke: '#4B7FD4', 'stroke-width': 5 }, ent);
  n('line', { x1: ENTRANCE.x + ENTRANCE.w - 12, y1: ENTRANCE.y + 12, x2: ENTRANCE.x + 12, y2: ENTRANCE.y + ENTRANCE.h - 12, stroke: '#4B7FD4', 'stroke-width': 5 }, ent);
  n('text', {
    x: ENTRANCE.x + ENTRANCE.w / 2, y: ENTRANCE.y + ENTRANCE.h + 20,
    fill: '#4B7FD4', 'font-family': 'IBM Plex Mono, monospace', 'font-size': 13,
    'letter-spacing': 1, 'text-anchor': 'middle'
  }, ent).textContent = 'ENTRANCE';

  // plots
  const plotEls = new Map();
  for (const p of PLOTS) {
    const g = n('g', { class: 'plot' + (p.leased ? ' leased' : ''), 'data-id': p.id });
    const fill = p.leased ? '#1A1814' : p.ours ? '#7C5CBF' : '#2A2721';
    n('rect', { class: 'body', x: p.x, y: p.y, width: p.w, height: p.h, rx: 3, fill, stroke: '#57503F', 'stroke-width': 1 }, g);
    const t = n('text', {
      x: p.x + p.w / 2, y: p.y + p.h / 2 + 5, 'text-anchor': 'middle',
      fill: p.leased ? '#6E675C' : '#E8B95F',
      'font-family': 'IBM Plex Mono, monospace', 'font-size': Math.min(16, p.w * 0.42), 'font-weight': 500
    }, g);
    t.textContent = p.id;
    plotEls.set(p.id, g);
  }

  /* ------------------------------------------------------- pan and zoom */

  const view = el('mapView');
  const world = el('mapWorld');
  let scale = 1, tx = 0, ty = 0;

  function apply(ms) {
    world.style.transition = ms ? `transform ${ms}ms cubic-bezier(0.16,1,0.3,1)` : 'none';
    world.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
  }
  function clampScale(s) { return Math.min(9, Math.max(0.75, s)); }

  function zoomAt(cx, cy, factor, ms) {
    const s2 = clampScale(scale * factor);
    const k = s2 / scale;
    tx = cx - (cx - tx) * k;
    ty = cy - (cy - ty) * k;
    scale = s2;
    apply(ms || 0);
  }

  view.addEventListener('wheel', e => {
    e.preventDefault();
    const r = view.getBoundingClientRect();
    zoomAt(e.clientX - r.left, e.clientY - r.top, e.deltaY < 0 ? 1.16 : 1 / 1.16, 89);
  }, { passive: false });

  let dragging = false, moved = 0, lx = 0, ly = 0;
  view.addEventListener('pointerdown', e => {
    dragging = true; moved = 0; lx = e.clientX; ly = e.clientY;
  });
  view.addEventListener('pointermove', e => {
    if (!dragging) return;
    const dx = e.clientX - lx, dy = e.clientY - ly;
    moved += Math.abs(dx) + Math.abs(dy);
    // capture only once this is a real pan — capturing on pointerdown would
    // retarget the click away from the plot and swallow it
    if (moved > 6 && !view.hasPointerCapture(e.pointerId)) {
      view.classList.add('dragging');
      view.setPointerCapture(e.pointerId);
    }
    tx += dx; ty += dy; lx = e.clientX; ly = e.clientY;
    apply(0);
  });
  const endDrag = () => { dragging = false; view.classList.remove('dragging'); };
  view.addEventListener('pointerup', endDrag);
  view.addEventListener('pointercancel', endDrag);

  el('zoomIn').onclick = () => { const r = view.getBoundingClientRect(); zoomAt(r.width / 2, r.height / 2, 1.45, 233); };
  el('zoomOut').onclick = () => { const r = view.getBoundingClientRect(); zoomAt(r.width / 2, r.height / 2, 1 / 1.45, 233); };
  el('zoomReset').onclick = () => fit(377);

  function frame() {
    const r = view.getBoundingClientRect();
    const unit = Math.min(r.width, r.height) / 1000;
    return {
      r, unit,
      ox: (r.width - 1000 * unit) / 2,
      oy: (r.height - 1000 * unit) / 2
    };
  }

  // centre world point (wx,wy) at the viewport centre, at scale s
  function centreOn(wx, wy, s, ms) {
    const { r, unit, ox, oy } = frame();
    scale = clampScale(s);
    tx = r.width / 2 - (ox + wx * unit) * scale;
    ty = r.height / 2 - (oy + wy * unit) * scale;
    apply(ms || 0);
  }

  function fit(ms) {
    const { r, unit } = frame();
    const padTop = 110, padBottom = 96;   // title plate and legend bar
    const usableH = Math.max(120, r.height - padTop - padBottom);
    const s = Math.min(
      (r.width - 68) / ((DISTRICT_BOX.w + 90) * unit),
      usableH / ((DISTRICT_BOX.h + 190) * unit)
    );
    const wx = DISTRICT_BOX.x + DISTRICT_BOX.w / 2;
    const wy = DISTRICT_BOX.y + DISTRICT_BOX.h / 2 + 6;
    scale = clampScale(s);
    const { ox, oy } = frame();
    tx = r.width / 2 - (ox + wx * unit) * scale;
    ty = padTop + usableH / 2 - (oy + wy * unit) * scale;
    apply(ms || 0);
  }

  /* ------------------------------------------------------------ tooltip */

  const tip = el('tip');
  function showTip(p, ev) {
    const r = view.getBoundingClientRect();
    tip.innerHTML =
      `<div class="price">$${p.price} <span style="font-size:14px; color:var(--sec); font-family:Inter,sans-serif; font-weight:400;">/month</span></div>` +
      `<div class="name">Faberplot #${p.id}</div>` +
      `<div style="font-size:14px; line-height:22px; color:var(--sec);">${DISTRICT_OF(p.id)} District · ${p.size}</div>` +
      `<div class="mono up" style="color:${p.leased ? 'var(--ter)' : 'var(--pos)'}; padding-top:5px;">${p.leased ? 'Leased' : p.ours ? 'Our own store' : 'Available — click to walk in'}</div>`;
    tip.style.opacity = '1';
    const w = tip.offsetWidth, h = tip.offsetHeight;
    let x = ev.clientX - r.left + 21, y = ev.clientY - r.top + 21;
    if (x + w > r.width - 13) x = ev.clientX - r.left - w - 21;
    if (y + h > r.height - 13) y = ev.clientY - r.top - h - 21;
    tip.style.left = x + 'px';
    tip.style.top = y + 'px';
  }
  const hideTip = () => { tip.style.opacity = '0'; };

  for (const p of PLOTS) {
    const g = plotEls.get(p.id);
    g.addEventListener('pointerenter', e => showTip(p, e));
    g.addEventListener('pointermove', e => showTip(p, e));
    g.addEventListener('pointerleave', hideTip);
    g.addEventListener('click', e => {
      if (moved > 6) return;
      e.stopPropagation();
      if (p.leased) return;
      dive(p);
    });
  }

  /* --------------------------------------------------------- dive into a plot */

  const veil = el('veil');
  let current = null;

  function dive(p) {
    hideTip();
    current = p;
    centreOn(p.x + p.w / 2, p.y + p.h / 2, 9, 610);

    setTimeout(() => veil.classList.add('on'), 377);
    setTimeout(() => {
      el('mapView').style.display = 'none';
      openRoom(p);
      veil.classList.remove('on');
    }, 660);
  }

  function backToMap() {
    veil.classList.add('on');
    setTimeout(() => {
      el('roomView').classList.remove('on');
      el('mapView').style.display = '';
      el('backBtn').style.display = 'none';
      el('rentBtn').style.display = 'none';
      el('crumb').textContent = 'Map · 48 plots';
      fit(0);
      setMode(false);
      veil.classList.remove('on');
      stopLoop();
    }, 233);
  }
  el('backBtn').onclick = backToMap;

  /* ---------------------------------------------------------------- room */

  let renderer, scene, camera, controls, raf = 0, floorPlane, dragObj = null, selected = null;
  const placed = [];
  const ray = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  const MATS = {};
  function mats() {
    if (MATS.floor) return MATS;
    MATS.floor   = new THREE.MeshStandardMaterial({ name: 'concrete',  color: 0x8C877C, roughness: 0.92, metalness: 0.02 });
    MATS.wall    = new THREE.MeshStandardMaterial({ name: 'plaster',   color: 0xEDE7DA, roughness: 0.95, metalness: 0.0 });
    MATS.trim    = new THREE.MeshStandardMaterial({ name: 'ink',       color: 0x1C1A17, roughness: 0.7,  metalness: 0.1 });
    MATS.oak     = new THREE.MeshStandardMaterial({ name: 'oak',       color: 0x9A7748, roughness: 0.62, metalness: 0.05 });
    MATS.brass   = new THREE.MeshStandardMaterial({ name: 'brass',     color: 0xD4A24C, roughness: 0.28, metalness: 0.85 });
    MATS.cloth   = new THREE.MeshStandardMaterial({ name: 'cloth',     color: 0x4E5B54, roughness: 1.0,  metalness: 0.0 });
    return MATS;
  }

  // interior is deliberately larger than the exterior footprint
  const ROOM = { w: 15, d: 11, h: 4.4 };
  const EXT  = { w: 8.4, d: 6.2 };

  function buildRoom() {
    const M = mats();
    const g = new THREE.Group();
    g.name = 'shell';

    const floor = new THREE.Mesh(new THREE.BoxGeometry(ROOM.w, 0.12, ROOM.d), M.floor);
    floor.name = 'floor'; floor.position.y = -0.06; floor.receiveShadow = true;
    g.add(floor);

    const mk = (w, h, d, x, y, z, name) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), M.wall);
      m.name = name; m.position.set(x, y, z); m.receiveShadow = true; m.castShadow = true;
      g.add(m); return m;
    };
    mk(ROOM.w, ROOM.h, 0.2, 0, ROOM.h / 2, -ROOM.d / 2, 'wall-back');
    mk(0.2, ROOM.h, ROOM.d, -ROOM.w / 2, ROOM.h / 2, 0, 'wall-left');
    mk(0.2, ROOM.h, ROOM.d,  ROOM.w / 2, ROOM.h / 2, 0, 'wall-right');
    // shopfront: two piers, glass gap between
    mk(3.4, ROOM.h, 0.2, -(ROOM.w / 2 - 1.7), ROOM.h / 2, ROOM.d / 2, 'pier-left');
    mk(3.4, ROOM.h, 0.2,  (ROOM.w / 2 - 1.7), ROOM.h / 2, ROOM.d / 2, 'pier-right');
    mk(ROOM.w, 0.9, 0.2, 0, ROOM.h - 0.45, ROOM.d / 2, 'lintel');

    const glass = new THREE.Mesh(
      new THREE.BoxGeometry(ROOM.w - 6.8, ROOM.h - 0.9, 0.06),
      new THREE.MeshStandardMaterial({ name: 'glass', color: 0x9FB3C8, roughness: 0.08, metalness: 0.1, transparent: true, opacity: 0.22 })
    );
    glass.name = 'shopfront-glass';
    glass.position.set(0, (ROOM.h - 0.9) / 2, ROOM.d / 2);
    g.add(glass);

    const ceil = new THREE.Mesh(new THREE.BoxGeometry(ROOM.w, 0.12, ROOM.d), M.wall);
    ceil.name = 'ceiling'; ceil.position.y = ROOM.h; g.add(ceil);

    // brass rail along the back wall
    const rail = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, ROOM.w - 1.6, 24), M.brass);
    rail.name = 'rail'; rail.rotation.z = Math.PI / 2;
    rail.position.set(0, 2.05, -ROOM.d / 2 + 0.55); rail.castShadow = true;
    g.add(rail);

    // exterior footprint outline on the floor — the "bigger inside" proof
    const ext = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.PlaneGeometry(EXT.w, EXT.d)),
      new THREE.LineDashedMaterial({ name: 'footprint', color: 0xD4A24C, dashSize: 0.28, gapSize: 0.2 })
    );
    ext.name = 'exterior-footprint';
    ext.rotation.x = -Math.PI / 2;
    ext.position.y = 0.02;
    ext.computeLineDistances();
    g.add(ext);

    return g;
  }

  const PIECES = {
    Rack: () => {
      const M = mats(), g = new THREE.Group(); g.name = 'rack';
      const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 1.8, 20), M.brass);
      bar.name = 'rack-bar'; bar.rotation.z = Math.PI / 2; bar.position.y = 1.5; g.add(bar);
      for (const s of [-0.85, 0.85]) {
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.5, 16), M.brass);
        post.name = 'rack-post'; post.position.set(s, 0.75, 0); g.add(post);
      }
      for (let i = 0; i < 6; i++) {
        const c = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.9, 0.36), M.cloth);
        c.name = 'garment'; c.position.set(-0.7 + i * 0.28, 1.0, 0); g.add(c);
      }
      return g;
    },
    Table: () => {
      const M = mats(), g = new THREE.Group(); g.name = 'table';
      const top = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.09, 0.9), M.oak);
      top.name = 'table-top'; top.position.y = 0.76; g.add(top);
      for (const [x, z] of [[-0.72, -0.36], [0.72, -0.36], [-0.72, 0.36], [0.72, 0.36]]) {
        const l = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.76, 0.08), M.oak);
        l.name = 'table-leg'; l.position.set(x, 0.38, z); g.add(l);
      }
      return g;
    },
    Plinth: () => {
      const M = mats(), g = new THREE.Group(); g.name = 'plinth';
      const b = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.95, 0.7), M.wall);
      b.name = 'plinth-body'; b.position.y = 0.475; g.add(b);
      const cap = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.04, 0.78), M.brass);
      cap.name = 'plinth-cap'; cap.position.y = 0.97; g.add(cap);
      return g;
    },
    Shelf: () => {
      const M = mats(), g = new THREE.Group(); g.name = 'shelf';
      for (let i = 0; i < 4; i++) {
        const s = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.06, 0.42), M.oak);
        s.name = 'shelf-board'; s.position.set(0, 0.45 + i * 0.55, 0); g.add(s);
      }
      for (const x of [-0.87, 0.87]) {
        const p = new THREE.Mesh(new THREE.BoxGeometry(0.07, 2.15, 0.44), M.trim);
        p.name = 'shelf-upright'; p.position.set(x, 1.07, 0); g.add(p);
      }
      return g;
    },
    Mannequin: () => {
      const M = mats(), g = new THREE.Group(); g.name = 'mannequin';
      const base = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.32, 0.06, 28), M.trim);
      base.name = 'mannequin-base'; base.position.y = 0.03; g.add(base);
      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.7, 16), M.trim);
      stem.name = 'mannequin-stem'; stem.position.y = 0.4; g.add(stem);
      const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.22, 0.5, 8, 24), M.cloth);
      torso.name = 'mannequin-torso'; torso.position.y = 1.15; g.add(torso);
      return g;
    },
    Counter: () => {
      const M = mats(), g = new THREE.Group(); g.name = 'counter';
      const b = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.0, 0.7), M.oak);
      b.name = 'counter-body'; b.position.y = 0.5; g.add(b);
      const t = new THREE.Mesh(new THREE.BoxGeometry(2.34, 0.06, 0.82), M.trim);
      t.name = 'counter-top'; t.position.y = 1.03; g.add(t);
      return g;
    }
  };

  function addPiece(kind) {
    const obj = PIECES[kind]();
    obj.userData.kind = kind;
    obj.traverse(o => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    const k = placed.length;
    obj.position.set(-4 + (k % 5) * 2, 0, -2.2 + Math.floor(k / 5) * 2.4);
    obj.scale.setScalar(0.001);
    scene.add(obj);
    placed.push(obj);
    select(obj);
    const t0 = performance.now();
    const grow = () => {
      const t = Math.min(1, (performance.now() - t0) / 377);
      const e = 1 - Math.pow(1 - t, 3);
      obj.scale.setScalar(0.001 + e);
      if (t < 1) requestAnimationFrame(grow); else obj.scale.setScalar(1);
    };
    grow();
    renderList();
  }

  function select(obj) {
    selected = obj;
    for (const o of placed) {
      o.traverse(m => {
        if (!m.isMesh) return;
        if (!m.userData.baseEmissive) m.userData.baseEmissive = m.material.emissive ? m.material.emissive.getHex() : 0x000000;
        if (m.material.emissive) m.material.emissive.setHex(o === obj ? 0x3A2A0E : m.userData.baseEmissive);
      });
    }
    renderList();
  }

  function renderList() {
    const box = el('placedList');
    if (!placed.length) {
      box.innerHTML = '<div class="mono-help">Nothing placed yet.</div>';
      return;
    }
    box.innerHTML = placed.map((o, i) =>
      `<div class="rowline"><span style="color:${o === selected ? 'var(--gold)' : 'var(--ink)'}">${o.userData.kind}</span>` +
      `<span class="mono" style="color:var(--sec);">#${String(i + 1).padStart(2, '0')}</span></div>`
    ).join('');
  }

  function initThree() {
    if (renderer) return;
    const canvas = el('roomCanvas');
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0A0A09);

    camera = new THREE.PerspectiveCamera(46, 1, 0.1, 200);

    controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.target.set(0, 0.5, -2.2);
    controls.maxPolarAngle = Math.PI / 2.02;
    controls.minDistance = 2.2;
    controls.maxDistance = 26;

    scene.add(new THREE.HemisphereLight(0xE8E2D2, 0x2A2721, 0.75));
    const key = new THREE.DirectionalLight(0xFFF3DC, 1.5);
    key.position.set(6, 11, 8);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.left = -14; key.shadow.camera.right = 14;
    key.shadow.camera.top = 14; key.shadow.camera.bottom = -14;
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xD4A24C, 0.35);
    fill.position.set(-8, 5, -6);
    scene.add(fill);

    scene.add(buildRoom());

    // pointer interaction: select + drag on the floor plane
    floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const hit = new THREE.Vector3();
    const grab = new THREE.Vector3();

    const toPointer = e => {
      const r = canvas.getBoundingClientRect();
      pointer.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      pointer.y = -((e.clientY - r.top) / r.height) * 2 + 1;
    };

    canvas.addEventListener('pointerdown', e => {
      toPointer(e);
      ray.setFromCamera(pointer, camera);
      const hits = ray.intersectObjects(placed, true);
      if (!hits.length) return;
      let root = hits[0].object;
      while (root.parent && !placed.includes(root)) root = root.parent;
      select(root);
      ray.ray.intersectPlane(floorPlane, hit);
      grab.copy(hit).sub(root.position);
      dragObj = root;
      controls.enabled = false;
      canvas.setPointerCapture(e.pointerId);
    });

    canvas.addEventListener('pointermove', e => {
      if (!dragObj) return;
      toPointer(e);
      ray.setFromCamera(pointer, camera);
      if (!ray.ray.intersectPlane(floorPlane, hit)) return;
      const x = THREE.MathUtils.clamp(hit.x - grab.x, -ROOM.w / 2 + 0.9, ROOM.w / 2 - 0.9);
      const z = THREE.MathUtils.clamp(hit.z - grab.z, -ROOM.d / 2 + 0.9, ROOM.d / 2 - 0.9);
      dragObj.position.set(x, 0, z);
    });

    const drop = e => {
      if (!dragObj) return;
      dragObj = null; controls.enabled = true;
      canvas.releasePointerCapture?.(e.pointerId);
    };
    canvas.addEventListener('pointerup', drop);
    canvas.addEventListener('pointercancel', drop);

    window.addEventListener('keydown', e => {
      if (!selected || !el('roomView').classList.contains('on')) return;
      if (e.key === 'r' || e.key === 'R') selected.rotation.y += Math.PI / 8;
      if (e.key === 'Delete' || e.key === 'Backspace') {
        scene.remove(selected);
        placed.splice(placed.indexOf(selected), 1);
        selected = null;
        renderList();
      }
    });

    window.addEventListener('resize', resize);
  }

  function resize() {
    if (!renderer) return;
    const w = el('canvasWrap').clientWidth, h = el('canvasWrap').clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  function loop() {
    raf = requestAnimationFrame(loop);
    controls.update();
    renderer.render(scene, camera);
  }
  function stopLoop() { cancelAnimationFrame(raf); raf = 0; }

  function openRoom(p) {
    initThree();
    el('roomView').classList.add('on');
    el('backBtn').style.display = '';
    el('rentBtn').style.display = '';
    el('crumb').textContent = `Map / ${DISTRICT_OF(p.id)} / Faberplot #${p.id}`;
    el('roomLabel').innerHTML =
      `<div class="mono up" style="color:var(--sec);">${DISTRICT_OF(p.id)} District · ${p.size}</div>` +
      `<div style="font-family:'Space Grotesk',sans-serif; font-weight:600; font-size:26px; line-height:34px;">Faberplot #${p.id}` +
      `<span style="color:var(--gold);"> · $${p.price}/month</span></div>`;
    syncRentBtn();

    const ext = SQFT[p.size];
    const bigger = document.getElementById('bigger');
    if (ext) {
      bigger.style.display = '';
      el('extArea').textContent = ext.toLocaleString('en-US');
      el('intArea').textContent = (ext * 3).toLocaleString('en-US');
    } else {
      bigger.style.display = 'none';   // no documented footprint for this size
    }

    resize();
    if (!raf) loop();

    // land INSIDE the shell (front glass sits at z = +d/2), not outside it
    const from = new THREE.Vector3(0, 14, 22);
    const to = new THREE.Vector3(0, 4.0, 5.2);
    camera.position.copy(from);
    const t0 = performance.now();
    const fly = () => {
      const t = Math.min(1, (performance.now() - t0) / 900);
      const e = 1 - Math.pow(1 - t, 3);
      camera.position.lerpVectors(from, to, e);
      controls.target.set(0, 0.5 + (1 - e) * 2.0, -2.2);
      if (t < 1) requestAnimationFrame(fly);
    };
    fly();
  }

  /* -------------------------------------------------------------- palette */

  for (const kind of Object.keys(PIECES)) {
    const b = document.createElement('button');
    b.textContent = kind;
    b.onclick = () => addPiece(kind);
    el('palette').appendChild(b);
  }
  renderList();

  const LIGHTS = { Day: 0xFFF3DC, Evening: 0xE3B667, Night: 0x9FB3C8 };
  for (const [label, hex] of Object.entries(LIGHTS)) {
    const b = document.createElement('button');
    b.textContent = label;
    b.onclick = () => {
      scene.traverse(o => { if (o.isDirectionalLight && o.intensity > 1) o.color.setHex(hex); });
      scene.background.setHex(label === 'Night' ? 0x06070A : label === 'Evening' ? 0x120E08 : 0x0A0A09);
    };
    el('lighting').appendChild(b);
  }

  /* ------------------------------------------------- pixel-streaming stub */

  const streamPane = el('streamPane');
  const streamLog = el('streamLog');
  let streamTimers = [];

  function logLine(text, color) {
    const row = document.createElement('div');
    row.style.cssText = 'display:flex; gap:8px; align-items:baseline;';
    row.innerHTML =
      `<span style="color:var(--sec);">${new Date().toLocaleTimeString('en-GB', { hour12: false })}</span>` +
      `<span style="color:${color || 'var(--sec)'};">${text}</span>`;
    streamLog.appendChild(row);
    streamLog.scrollTop = streamLog.scrollHeight;
  }

  function setMode(unreal) {
    el('modeWeb').setAttribute('aria-pressed', String(!unreal));
    el('modeUnreal').setAttribute('aria-pressed', String(unreal));
    streamPane.classList.toggle('on', unreal);
    if (unreal) { if (!streamLog.childElementCount) handshake(); }
    else { streamTimers.forEach(clearTimeout); streamTimers = []; }
  }

  function handshake() {
    streamTimers.forEach(clearTimeout);
    streamTimers = [];
    streamLog.innerHTML = '';
    const url = el('streamUrl').value.trim();
    const steps = [
      [0,    `open ${url}`, 'var(--sec)'],
      [420,  'ICE servers requested · stun:stun.l.google.com:19302', 'var(--sec)'],
      [900,  'offer sent · waiting for the Unreal instance', 'var(--sec)'],
      [1800, 'no instance answered within 1800 ms', 'var(--warn)'],
      [2100, 'Stub: no signalling server is attached to this prototype yet.', 'var(--ter)'],
      [2300, 'Falling back to the web mock — the fit-out you place here carries over.', 'var(--ter)'],
    ];
    for (const [ms, text, color] of steps) streamTimers.push(setTimeout(() => logLine(text, color), ms));
  }

  el('modeWeb').onclick = () => setMode(false);
  el('modeUnreal').onclick = () => setMode(true);
  el('streamBack').onclick = () => setMode(false);
  el('streamConnect').onclick = handshake;

  /* ------------------------------------------------------------------ cart */

  const KEY = 'faberland.cart.v1';
  let cart = [];
  try { cart = JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { cart = []; }

  let step = 0;                       // 0 cart · 1 details · 2 payment · 3 done
  const fmt = n => '$' + n.toLocaleString('en-US');
  const monthly = () => cart.reduce((s, l) => s + l.price, 0);

  function saveCart() {
    try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch (e) {}
    el('cartCount').textContent = String(cart.length);
    syncRentBtn();
  }

  function syncRentBtn() {
    if (!current) return;
    const inCart = cart.some(l => l.id === current.id);
    el('rentBtn').textContent = inCart
      ? `In cart · #${current.id}`
      : current.id === OUR_STORE ? 'Our own store' : `Rent #${current.id} · ${fmt(current.price)}`;
    el('rentBtn').disabled = inCart;
    el('rentBtn').style.opacity = inCart ? '0.55' : '';
  }

  function addToCart(p) {
    if (cart.some(l => l.id === p.id)) return;
    cart.push({ id: p.id, price: p.price, size: p.size, district: DISTRICT_OF(p.id), sqft: SQFT[p.size] || null });
    saveCart();
    openDrawer(0);
  }

  function removeFromCart(id) {
    cart = cart.filter(l => l.id !== id);
    saveCart();
    drawDrawer();
  }

  const drawer = el('drawer');
  function openDrawer(s) { step = s; drawer.classList.add('on'); drawDrawer(); }
  function closeDrawer() { drawer.classList.remove('on'); }
  el('cartBtn').onclick = () => openDrawer(0);
  el('sheetClose').onclick = closeDrawer;
  el('scrim').onclick = closeDrawer;
  addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });

  function drawDrawer() {
    const body = el('sheetBody'), foot = el('sheetFoot');
    const sub = monthly(), deposit = sub, today = sub + deposit;
    el('sheetTitle').textContent = ['Your plots', 'Who is renting', 'Payment', 'Lease started'][step];

    const bar = step === 0 ? '' :
      `<div class="steps"><span class="on"></span><span class="${step > 1 ? 'on' : ''}"></span><span class="${step > 2 ? 'on' : ''}"></span></div>`;

    if (step === 0) {
      body.innerHTML = bar + (cart.length
        ? cart.map(l => `
          <div class="line">
            <div>
              <div style="font-family:'Space Grotesk',sans-serif; font-weight:600; font-size:21px; line-height:30px;">Faberplot #${l.id}</div>
              <div class="mono up" style="color:var(--sec);">${l.district} district · ${l.size}${l.sqft ? ' · ' + l.sqft.toLocaleString('en-US') + ' sq ft outside' : ''}</div>
            </div>
            <div style="text-align:right;">
              <div style="font-family:'Space Grotesk',sans-serif; font-weight:600; font-size:21px; line-height:30px; color:var(--gold);">${fmt(l.price)}</div>
              <button class="linkbtn" data-rm="${l.id}">Remove</button>
            </div>
          </div>`).join('')
        : `<div style="color:var(--sec);">No plots yet. Walk into a plot on the map and rent it from the header.</div>`);
      body.querySelectorAll('[data-rm]').forEach(b => { b.onclick = () => removeFromCart(Number(b.dataset.rm)); });
    }

    if (step === 1) {
      body.innerHTML = bar + `
        <div style="display:flex; flex-direction:column; gap:13px;">
          <label style="display:flex; flex-direction:column; gap:5px;">
            <span class="mono up" style="color:var(--sec);">Brand or company</span>
            <span class="field"><input id="fBrand" placeholder="Faberg&eacute; Atelier" /></span>
          </label>
          <label style="display:flex; flex-direction:column; gap:5px;">
            <span class="mono up" style="color:var(--sec);">Contact email</span>
            <span class="field"><input id="fMail" placeholder="you@studio.com" /></span>
          </label>
          <label style="display:flex; flex-direction:column; gap:5px;">
            <span class="mono up" style="color:var(--sec);">Opening date</span>
            <span class="field"><input id="fDate" placeholder="01 / 10 / 2026" /></span>
          </label>
        </div>`;
    }

    if (step === 2) {
      body.innerHTML = bar + `
        <div class="line"><span style="color:var(--sec);">Rent, ${cart.length} plot${cart.length > 1 ? 's' : ''}</span><span>${fmt(sub)} /mo</span></div>
        <div class="line"><span style="color:var(--sec);">Deposit, refundable</span><span>${fmt(deposit)}</span></div>
        <div class="line" style="border-bottom:0;">
          <span style="font-weight:600;">Due today</span>
          <span style="font-family:'Space Grotesk',sans-serif; font-weight:600; font-size:26px; line-height:34px; color:var(--gold);">${fmt(today)}</span>
        </div>
        <div class="note mono">Payment is stubbed in this prototype. Nothing is charged.</div>`;
    }

    if (step === 3) {
      body.innerHTML = `
        <div style="display:flex; flex-direction:column; gap:13px;">
          <div style="font-family:'Space Grotesk',sans-serif; font-weight:600; font-size:34px; line-height:42px; letter-spacing:-0.01em;">Keys handed over.</div>
          <div style="color:var(--sec);">${cart.length} plot${cart.length > 1 ? 's' : ''} leased at ${fmt(sub)} a month. Your fit-out is saved and will load in the Unreal build once the stream is attached.</div>
        </div>`;
    }

    const btn = (label, primary, fn, disabled) => {
      const b = document.createElement('button');
      b.className = 'btn' + (primary ? ' btn-primary' : '');
      b.textContent = label;
      b.style.justifyContent = 'center';
      b.disabled = !!disabled;
      if (disabled) b.style.opacity = '0.45';
      b.onclick = fn;
      return b;
    };

    foot.innerHTML = '';
    if (step === 0) {
      foot.appendChild(Object.assign(document.createElement('div'), {
        className: 'rowline',
        innerHTML: `<span style="color:var(--sec);">Monthly total</span><span style="font-family:'Space Grotesk',sans-serif; font-weight:600; font-size:26px; color:var(--gold);">${fmt(sub)}</span>`,
      }));
      foot.appendChild(btn('Checkout', true, () => { step = 1; drawDrawer(); }, !cart.length));
    } else if (step === 1) {
      foot.appendChild(btn('Continue to payment', true, () => { step = 2; drawDrawer(); }));
      foot.appendChild(btn('Back', false, () => { step = 0; drawDrawer(); }));
    } else if (step === 2) {
      foot.appendChild(btn(`Pay ${fmt(today)}`, true, () => { step = 3; drawDrawer(); }));
      foot.appendChild(btn('Back', false, () => { step = 1; drawDrawer(); }));
    } else {
      foot.appendChild(btn('Back to the map', true, () => {
        cart = []; saveCart(); closeDrawer();
        if (el('roomView').classList.contains('on')) backToMap();
      }));
    }
  }

  el('rentBtn').onclick = () => { if (current) addToCart(current); };
  saveCart();

  addEventListener('resize', () => { if (el('mapView').style.display !== 'none') fit(0); });
  requestAnimationFrame(() => fit(0));
}
