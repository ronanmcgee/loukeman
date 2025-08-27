(function() {
  function parseEventDate(mdYText) {
    if (!mdYText) return null;
    const parts = mdYText.trim().split(".");
    if (parts.length !== 3) return null;
    const m = parseInt(parts[0], 10);
    const d = parseInt(parts[1], 10);
    const yy = parseInt(parts[2], 10);
    if (!m || !d || isNaN(yy)) return null;

    const year = 2000 + yy;

    return new Date(year, m - 1, d, 23, 59, 59, 999);
  }

  function markPastEvents() {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
    const rows = document.querySelectorAll('.dates-grid .row');
    rows.forEach(row => {
      const dateEl = row.querySelector('.date');
      if (!dateEl) return;
      const eventDate = parseEventDate(dateEl.textContent);
      if (!eventDate) return;
      if (eventDate < todayStart) {
        row.classList.add('past');
      } else {
        row.classList.remove('past');
      }
    });
  }


  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', markPastEvents);
  } else {
    markPastEvents();
  }
})();
