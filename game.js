// ── STATE ──────────────────────────────────────────────────────────────────
const ROUNDS = 5;

let state = {
  rappers: [],
  queue: [],
  round: 0,
  totalScore: 0,
  history: [],
  currentGuess: null,
  guessMarker: null,
  answerMarkers: [],
  answerLine: null,
  map: null,
  revealed: false
};

// ── UTILS ─────────────────────────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function haversineKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.asin(Math.sqrt(a));
}

function calcScore(km) {
  // 5000 pts max, exponential decay — roughly half score at ~1400km
  return Math.max(0, Math.round(5000 * Math.exp(-km / 2000)));
}

function scoreClass(pts) {
  if (pts >= 4000) return 'great';
  if (pts >= 2000) return 'mid';
  return 'bad';
}

function resultMessage(km, pts) {
  if (pts >= 4500) return "Pinpoint accuracy. You clearly know your geography and your music.";
  if (pts >= 3500) return "Very close! You're in the right area — solid knowledge.";
  if (pts >= 2000) return "Not bad. You had the right continent at least.";
  if (pts >= 500)  return "A bit off. Brush up on where your favourite rappers are from.";
  return "Way off. The other side of the planet won't get you any points.";
}

function finalGrade(total) {
  const max = ROUNDS * 5000;
  const pct = total / max;
  if (pct >= 0.9) return "S TIER — You're a geography professor who moonlights as a rap critic.";
  if (pct >= 0.75) return "A TIER — Very impressive. You actually listen to liner notes.";
  if (pct >= 0.55) return "B TIER — Solid. You know the big names and the big cities.";
  if (pct >= 0.35) return "C TIER — Room to grow. Start with a world map and a playlist.";
  return "D TIER — Did you have your eyes closed? Keep studying.";
}

// ── SCREENS ───────────────────────────────────────────────────────────────
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// ── MAP SETUP ─────────────────────────────────────────────────────────────
function initMap() {
  if (state.map) {
    state.map.remove();
    state.map = null;
  }

  state.map = L.map('map', {
    center: [20, 10],
    zoom: 2,
    minZoom: 2,
    maxZoom: 6,
    zoomControl: true,
    attributionControl: false
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18
  }).addTo(state.map);

  state.map.on('click', onMapClick);
}

function onMapClick(e) {
  if (state.revealed) return;

  const { lat, lng } = e.latlng;
  state.currentGuess = { lat, lng };

  // Custom gold pin icon
  const icon = L.divIcon({
    html: `<div style="
      width:18px;height:18px;
      background:#C9A84C;
      border:2px solid #0a0a0a;
      border-radius:50% 50% 50% 0;
      transform:rotate(-45deg);
      box-shadow:0 0 0 2px #C9A84C44;
    "></div>`,
    className: '',
    iconAnchor: [9, 18]
  });

  if (state.guessMarker) state.guessMarker.remove();
  state.guessMarker = L.marker([lat, lng], { icon }).addTo(state.map);

  // Update UI
  const guessInfo = document.getElementById('guess-info');
  guessInfo.classList.add('placed');
  guessInfo.querySelector('.dot').style.background = '#C9A84C';
  guessInfo.querySelector('.guess-text').textContent =
    `${lat.toFixed(2)}°, ${lng.toFixed(2)}°`;

  document.getElementById('btn-confirm').classList.add('ready');
}

// ── ROUND LOGIC ───────────────────────────────────────────────────────────
function startRound() {
  state.revealed = false;
  state.currentGuess = null;

  // Clean up previous answer markers
  state.answerMarkers.forEach(m => m.remove());
  state.answerMarkers = [];
  if (state.answerLine) { state.answerLine.remove(); state.answerLine = null; }
  if (state.guessMarker) { state.guessMarker.remove(); state.guessMarker = null; }

  const rapper = state.queue[state.round];

  // Album cover
  const img = document.getElementById('album-cover');
  img.src = rapper.coverUrl;
  img.alt = `Album cover for "${rapper.album}"`;

  // Album info (name stays hidden)
  document.getElementById('album-title').textContent = `"${rapper.album}"`;
  document.getElementById('album-year').textContent = rapper.year;

  // Mystery rapper
  document.getElementById('mystery-label').textContent = '??? — identity hidden';

  // Reset guess UI
  const guessInfo = document.getElementById('guess-info');
  guessInfo.classList.remove('placed');
  guessInfo.querySelector('.dot').style.background = '';
  guessInfo.querySelector('.guess-text').textContent = 'No guess placed yet';
  document.getElementById('btn-confirm').classList.remove('ready');

  // Progress pips
  document.querySelectorAll('.progress-pip').forEach((pip, i) => {
    pip.classList.remove('done', 'active');
    if (i < state.round) pip.classList.add('done');
    else if (i === state.round) pip.classList.add('active');
  });

  // Reset map view
  state.map.setView([20, 10], 2);

  // Hide result overlay
  document.getElementById('result-overlay').classList.remove('show');
}

function confirmGuess() {
  if (!state.currentGuess || state.revealed) return;
  state.revealed = true;

  const rapper = state.queue[state.round];
  const { lat, lng } = state.currentGuess;
  const { lat: tLat, lng: tLng, label } = rapper.origin;

  const km = haversineKm(lat, lng, tLat, tLng);
  const pts = calcScore(km);

  state.totalScore += pts;
  state.history.push({ rapper, km, pts, guess: { lat, lng } });

  // Draw true location marker
  const trueIcon = L.divIcon({
    html: `<div style="
      width:14px;height:14px;
      background:#3ce07a;
      border:2px solid #0a0a0a;
      border-radius:50%;
      box-shadow:0 0 0 3px #3ce07a44;
    "></div>`,
    className: '',
    iconAnchor: [7, 7]
  });

  const trueMarker = L.marker([tLat, tLng], { icon: trueIcon })
    .bindPopup(`<strong>${rapper.name}</strong><br>${label}`)
    .addTo(state.map);
  trueMarker.openPopup();
  state.answerMarkers.push(trueMarker);

  // Draw line between guess and truth
  state.answerLine = L.polyline(
    [[lat, lng], [tLat, tLng]],
    { color: '#C9A84C', weight: 1.5, dashArray: '5,5', opacity: 0.7 }
  ).addTo(state.map);

  // Fit map to show both
  const bounds = L.latLngBounds([[lat, lng], [tLat, tLng]]).pad(0.3);
  state.map.fitBounds(bounds);

  // Update header score
  document.getElementById('header-score').textContent = state.totalScore.toLocaleString();

  // Show result overlay
  showResult(rapper, km, pts);
}

function showResult(rapper, km, pts) {
  document.getElementById('result-rapper-name').textContent = rapper.name;
  document.getElementById('result-origin').textContent = rapper.origin.label;
  document.getElementById('result-album').textContent = `"${rapper.album}" (${rapper.year})`;

  const distEl = document.getElementById('result-dist');
  distEl.textContent = km < 100 ? `${Math.round(km)}km` : `${Math.round(km / 100) * 100 / 1000 > 1 ? (km / 1000).toFixed(1) + 'k' : Math.round(km)}km`;
  distEl.className = 'result-stat-val ' + (km < 300 ? 'great' : km < 1500 ? 'mid' : 'bad');

  const ptsEl = document.getElementById('result-pts');
  ptsEl.textContent = pts.toLocaleString();
  ptsEl.className = 'result-stat-val ' + scoreClass(pts);

  document.getElementById('result-total').textContent = state.totalScore.toLocaleString();
  document.getElementById('result-message').textContent = resultMessage(km, pts);

  const isLast = state.round === ROUNDS - 1;
  document.getElementById('btn-next').textContent = isLast ? 'See Final Results' : 'Next Round →';
  document.getElementById('btn-next').onclick = isLast ? showFinal : nextRound;

  document.getElementById('result-overlay').classList.add('show');
}

function nextRound() {
  state.round++;
  startRound();
}

// ── FINAL SCREEN ──────────────────────────────────────────────────────────
function showFinal() {
  showScreen('screen-final');

  document.getElementById('final-score').textContent = state.totalScore.toLocaleString();
  document.getElementById('final-grade').textContent = finalGrade(state.totalScore);

  const tbody = document.getElementById('final-breakdown');
  tbody.innerHTML = '';

  state.history.forEach(({ rapper, km, pts }) => {
    const distStr = km >= 1000
      ? `${(km / 1000).toFixed(1)}k km`
      : `${Math.round(km)} km`;

    const row = document.createElement('div');
    row.className = 'final-row';
    row.innerHTML = `
      <span class="final-row-name">${rapper.name}</span>
      <span class="final-row-dist">${distStr}</span>
      <span class="final-row-pts">${pts.toLocaleString()}</span>
    `;
    tbody.appendChild(row);
  });
}

// ── GAME START / RESTART ──────────────────────────────────────────────────
function startGame() {
 state.queue = shuffle(RAPPERS).slice(0, ROUNDS);
  state.round = 0;
  state.totalScore = 0;
  state.history = [];
  state.revealed = false;
  state.currentGuess = null;
  state.guessMarker = null;
  state.answerMarkers = [];
  state.answerLine = null;

  document.getElementById('header-score').textContent = '0';

  showScreen('screen-game');
  initMap();

  // Build progress pips
  const track = document.querySelector('.progress-track');
  track.innerHTML = '';
  for (let i = 0; i < ROUNDS; i++) {
    const pip = document.createElement('div');
    pip.className = 'progress-pip';
    track.appendChild(pip);
  }

  startRound();
}

// ── EVENT LISTENERS ───────────────────────────────────────────────────────
document.getElementById('btn-start').addEventListener('click', startGame);
document.getElementById('btn-confirm').addEventListener('click', confirmGuess);
document.getElementById('btn-play-again').addEventListener('click', () => {
  showScreen('screen-intro');
});
