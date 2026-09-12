/* =============================================
   StartupOnX India — main.js
   Handles: year, auth nav, Firebase load,
            filter tabs, search
   ============================================= */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ── Firebase config ───────────────────────────
const firebaseConfig = {
  apiKey:            "AIzaSyBo0znzdeRwlclOvrSouUzRja4yFHUu6Tc",
  authDomain:        "startuponx-e228c.firebaseapp.com",
  projectId:         "startuponx-e228c",
  storageBucket:     "startuponx-e228c.firebasestorage.app",
  messagingSenderId: "333136775467",
  appId:             "1:333136775467:web:30ccb507b40a13b1cc9d6e",
  measurementId:     "G-9MJEJT5ELL"
};

const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db   = getFirestore(app);

// ── Year fill ─────────────────────────────────
document.querySelectorAll('#yr, .yr').forEach(function(el) {
  el.textContent = new Date().getFullYear();
});

// ── Auth nav ──────────────────────────────────
onAuthStateChanged(auth, function(user) {
  var navAuth = document.getElementById('nav-auth');
  if (!navAuth) return;
  if (user) {
    navAuth.innerHTML =
      '<a href="my-listings.html" class="btn btn-outline">My listings</a>' +
      '<button class="btn btn-black" id="signout-btn">Sign out</button>';
    document.getElementById('signout-btn').addEventListener('click', function() {
      signOut(auth);
    });
  } else {
    navAuth.innerHTML = '<a href="signin.html" class="btn btn-black">Sign in</a>';
  }
});

// ── Load live startups (only runs on homepage) ─
var grid    = document.getElementById('grid');
var empty   = document.getElementById('empty');
var countEl = document.getElementById('live-count');

if (grid) {
  (async function loadStartups() {
    try {
      var q    = query(collection(db, 'startups'), where('status', '==', 'live'));
      var snap = await getDocs(q);
      var startups = [];
      snap.forEach(function(doc) {
        startups.push(Object.assign({ id: doc.id }, doc.data()));
      });

      var n = startups.length;
      if (countEl) {
        countEl.textContent = n + ' startup' + (n !== 1 ? 's' : '') + ' live';
      }

      if (n === 0) {
        if (empty) empty.style.display = 'block';
        return;
      }

      startups.forEach(function(s) {
        var rawUrl  = s.website || s.url || '';
        var siteUrl = rawUrl.startsWith('http') ? rawUrl : 'https://' + rawUrl;

        var logoHtml = s.logoUrl
          ? '<img class="card-logo" src="' + s.logoUrl + '" alt="' + (s.name || '') + ' logo — Indian startup" width="52" height="52" loading="lazy" />'
          : '<div class="card-logo-letter" aria-hidden="true">' + (s.name || '?')[0].toUpperCase() + '</div>';

        var descText   = s.desc || s.description || '';
        var catRaw     = s.category || 'other';
        var catSlug    = catRaw.toLowerCase().replace(/\s+/g, '-');
        var catDisplay = catRaw.charAt(0).toUpperCase() + catRaw.slice(1);

        var card = document.createElement('article');
        card.className = 'startup-card';
        card.dataset.category = catSlug;
        card.dataset.name = (s.name || '').toLowerCase();
        card.setAttribute('itemscope', '');
        card.setAttribute('itemtype', 'https://schema.org/Organization');
        card.innerHTML =
          '<div class="card-header">' +
            logoHtml +
            '<div class="card-info">' +
              '<div class="card-name" itemprop="name">' + (s.name || '') + '</div>' +
              '<p class="card-desc" itemprop="description">' + descText + '</p>' +
            '</div>' +
          '</div>' +
          '<span class="card-tag">' + catDisplay + '</span>' +
          '<a href="' + siteUrl + '" class="card-visit" target="_blank" rel="noopener noreferrer" itemprop="url">Visit site</a>';

        grid.insertBefore(card, empty);
      });

    } catch (err) {
      console.error('Firestore load error:', err);
      if (countEl) countEl.textContent = '';
      if (empty) {
        empty.style.display = 'block';
        empty.innerHTML = 'Could not load startups. <a href="submit.html" style="color:var(--black);text-decoration:underline">Submit yours.</a>';
      }
    }
  })();

  // ── Filter tabs ─────────────────────────────
  var tabs        = document.querySelectorAll('.filter-tab');
  var searchInput = document.getElementById('search');

  function applyFilters() {
    var active  = (document.querySelector('.filter-tab.active') || {}).dataset || {};
    var filter  = active.filter || 'all';
    var q       = searchInput ? searchInput.value.trim().toLowerCase() : '';
    var cards   = document.querySelectorAll('.startup-card');
    var visible = 0;

    cards.forEach(function(c) {
      var matchCat    = filter === 'all' || c.dataset.category === filter;
      var descEl      = c.querySelector('.card-desc');
      var descText    = descEl ? descEl.textContent.toLowerCase() : '';
      var matchSearch = !q || c.dataset.name.includes(q) || descText.includes(q);
      var show        = matchCat && matchSearch;
      c.style.display = show ? '' : 'none';
      if (show) visible++;
    });

    if (empty) {
      empty.style.display = visible === 0 ? 'block' : 'none';
    }
  }

  tabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      tabs.forEach(function(t) {
        t.classList.remove('active');
        t.setAttribute('aria-pressed', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-pressed', 'true');
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }
}