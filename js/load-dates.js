<script>
async function loadDates() {
  const container = document.querySelector('.dates-grid.section');
  if (!container) return;

  try {
    const res = await fetch('/data/dates/');
    const html = await res.text();

    // Parse file names from directory listing
    const matches = [...html.matchAll(/href="([^"]+\.json)"/g)];
    const files = matches.map(m => m[1]);

    // Load each JSON file
    const jsonPromises = files.map(file =>
      fetch(`/data/dates/${file}`).then(res => res.json())
    );

    const dates = await Promise.all(jsonPromises);

    // Sort by date DESC (newest first)
    dates.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Clear current content
    container.innerHTML = '';

    dates.forEach((event, i) => {
      const dateObj = new Date(event.date);
      const formatted = `${dateObj.getMonth() + 1}.${dateObj.getDate()}.${String(dateObj.getFullYear()).slice(-2)}`;

      const city = event.location.toUpperCase();
      const desc = event.venue;
      const url = event.tickets || '#';

      if (i === 0) {
        container.innerHTML += `
          <div class="row">
            <div class="heading">DATES</div>
            <a href="${url}" class="row-link row-link-inline">
              <div class="date">${formatted}</div>
              <div class="city">${city}</div>
              <div class="desc">${desc}</div>
            </a>
          </div>
        `;
      } else {
        container.innerHTML += `
          <a href="${url}" class="row-link">
            <div class="row">
              <div class="date">${formatted}</div>
              <div class="city">${city}</div>
              <div class="desc">${desc}</div>
            </div>
          </a>
        `;
      }
    });
  } catch (err) {
    console.error('Failed to load tour dates:', err);
  }
}

window.addEventListener('DOMContentLoaded', loadDates);
</script>
