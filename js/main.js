/* =============================================
   StartupOnX India — main.js
   ============================================= */

// Set current year in footer
document.querySelectorAll('#year, .year').forEach(el => {
  el.textContent = new Date().getFullYear();
});

// ── Category filter tabs ──────────────────────
const filterTabs = document.querySelectorAll('.filter-tab');
const grid = document.getElementById('startup-grid');
const emptyState = document.getElementById('empty-state');

if (filterTabs.length && grid) {
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update active state
      filterTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const filter = tab.dataset.filter;
      filterCards(filter);
    });
  });
}

function filterCards(filter) {
  if (!grid) return;

  const cards = grid.querySelectorAll('.startup-card');
  let visibleCount = 0;

  cards.forEach(card => {
    const category = card.dataset.category || '';
    const show = filter === 'all' || category === filter;
    card.style.display = show ? '' : 'none';
    if (show) visibleCount++;
  });

  // Show/hide empty state
  if (emptyState) {
    emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
  }

  // Update count on discover page
  updateCount(visibleCount);
}

// ── Search (discover page) ────────────────────
const searchInput = document.getElementById('search-input');

if (searchInput && grid) {
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    const activeFilter = document.querySelector('.filter-tab.active')?.dataset.filter || 'all';
    const cards = grid.querySelectorAll('.startup-card');
    let visibleCount = 0;

    cards.forEach(card => {
      const name = (card.dataset.name || '').toLowerCase();
      const desc = (card.querySelector('.card-description')?.textContent || '').toLowerCase();
      const category = card.dataset.category || '';

      const matchesQuery = !query || name.includes(query) || desc.includes(query);
      const matchesFilter = activeFilter === 'all' || category === activeFilter;

      const show = matchesQuery && matchesFilter;
      card.style.display = show ? '' : 'none';
      if (show) visibleCount++;
    });

    if (emptyState) {
      emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
    }

    updateCount(visibleCount);
  });
}

// ── Update startup count ──────────────────────
function updateCount(n) {
  const countEl = document.getElementById('count');
  if (countEl) {
    const total = grid?.querySelectorAll('.startup-card').length || 0;
    countEl.textContent = n === total ? total : `${n} of ${total}`;
  }
}

// Initial count
(function () {
  if (grid) {
    const total = grid.querySelectorAll('.startup-card').length;
    updateCount(total);
  }
})();
