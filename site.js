// Image zoom and case-study contents highlighting. No dependencies.
(function () {
  // Lightbox for figure images
  var dialog = document.getElementById('lightbox');
  if (dialog && typeof dialog.showModal === 'function') {
    var big = dialog.querySelector('img');
    var cap = dialog.querySelector('p');
    var closeBtn = dialog.querySelector('button');
    var opener = null;
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-zoom]');
      if (!btn) return;
      e.preventDefault();
      var img = btn.querySelector('img');
      opener = btn;
      big.src = btn.getAttribute('data-zoom');
      big.alt = img ? img.alt : '';
      var fig = btn.closest('figure');
      var fc = fig ? fig.querySelector('figcaption') : null;
      cap.textContent = fc ? fc.textContent.trim() : '';
      cap.hidden = !cap.textContent;
      dialog.showModal();
      closeBtn.focus();
    });
    closeBtn.addEventListener('click', function () { dialog.close(); });
    dialog.addEventListener('click', function (e) { if (e.target === dialog || e.target === big) dialog.close(); });
    dialog.addEventListener('close', function () { big.removeAttribute('src'); if (opener) opener.focus(); });
  }

  // Highlight the current section in the case-study contents
  var toc = document.querySelector('.toc');
  if (toc) {
    var sections = Array.prototype.slice.call(document.querySelectorAll('.case-section[id]'));
    var links = {};
    toc.querySelectorAll('a[href^="#"]').forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
    var current = null, ticking = false;
    var update = function () {
      ticking = false;
      var line = window.innerHeight * 0.3, id = sections.length ? sections[0].id : null;
      for (var i = 0; i < sections.length; i++) {
        if (sections[i].getBoundingClientRect().top <= line) id = sections[i].id; else break;
      }
      if (id !== current) {
        if (current && links[current]) links[current].removeAttribute('aria-current');
        if (id && links[id]) links[id].setAttribute('aria-current', 'true');
        current = id;
      }
    };
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    window.addEventListener('resize', update);
    update();
  }
})();
