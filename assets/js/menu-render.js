/* Renders the full menu page from content/menu.json so the owner can
   edit prices, add/remove items, and attach photos through /admin
   without ever touching this file or the HTML. */

(function () {
  function escapeHtml(str) {
    return String(str || '').replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function renderItem(item) {
    const nameHtml = escapeHtml(item.name) +
      (item.note ? ' <span class="m-desc" style="margin:0;">' + escapeHtml(item.note) + '</span>' : '') +
      (item.signature ? ' <span class="m-tag">Signature</span>' : '');

    const photoHtml = item.photo
      ? '<div class="m-photo"><img src="' + escapeHtml(item.photo) + '" alt="' + escapeHtml(item.name) + '" loading="lazy"></div>'
      : '';

    return (
      '<div class="menu-item' + (item.photo ? ' has-photo' : '') + '">' +
        photoHtml +
        '<div class="m-info">' +
          '<div class="m-name">' + nameHtml + '</div>' +
        '</div>' +
        '<div class="m-price">' + escapeHtml(item.price) + '</div>' +
      '</div>'
    );
  }

  function renderCategory(cat) {
    const items = (cat.items || []).map(renderItem).join('');
    const note = cat.note
      ? '<p class="menu-cat-note">' + escapeHtml(cat.note) + '</p>'
      : '';
    return (
      '<div class="menu-category" id="' + escapeHtml(cat.id) + '">' +
        '<div class="menu-cat-head reveal"><h2>' + escapeHtml(cat.name) + '</h2><div class="rule"></div></div>' +
        note +
        '<div class="menu-items">' + items + '</div>' +
      '</div>'
    );
  }

  function renderNav(categories) {
    return categories.map(function (c) {
      return '<a href="#' + escapeHtml(c.id) + '">' + escapeHtml(c.name) + '</a>';
    }).join('');
  }

  async function init() {
    const navEl = document.getElementById('menuNav');
    const bodyEl = document.getElementById('menuBody');
    if (!navEl || !bodyEl) return;

    try {
      const res = await fetch('content/menu.json', { cache: 'no-store' });
      if (!res.ok) throw new Error('menu.json ' + res.status);
      const data = await res.json();
      const categories = data.categories || [];

      navEl.innerHTML = renderNav(categories);
      bodyEl.innerHTML = categories.map(renderCategory).join('');

      // Re-run reveal + sticky-nav-highlight observers now that content exists.
      if (window.SignatureSquare && typeof window.SignatureSquare.observeMenu === 'function') {
        window.SignatureSquare.observeMenu();
      }
    } catch (err) {
      bodyEl.innerHTML =
        '<p style="color:var(--espresso-soft);">The menu couldn\'t be loaded right now. Please refresh, or check back shortly.</p>';
      console.error('Menu load failed:', err);
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
