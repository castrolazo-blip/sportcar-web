(function(){
  var params = new URLSearchParams(location.search);
  if(!params.has('edit')) return;

  var banner = document.createElement('div');
  banner.id = 'editBanner';
  banner.textContent = 'Modo edición activo — haz clic en cualquier texto para editarlo. Cuando termines, descarga el HTML de esta página y súbelo con el mismo nombre.';
  document.body.appendChild(banner);

  var ui = document.createElement('div');
  ui.id = 'editUI';
  ui.innerHTML =
    '<button id="editToggleBtn" type="button">✏️ Activar edición</button>' +
    '<button id="editSaveBtn" type="button">💾 Descargar HTML actualizado</button>';
  document.body.appendChild(ui);

  var toggleBtn = document.getElementById('editToggleBtn');
  var saveBtn = document.getElementById('editSaveBtn');
  var editing = false;

  toggleBtn.addEventListener('click', function(){
    editing = !editing;
    document.body.classList.toggle('edit-mode', editing);
    document.querySelectorAll('.edit').forEach(function(el){ el.contentEditable = editing; });
    banner.style.display = editing ? 'block' : 'none';
    toggleBtn.textContent = editing ? '⏸ Pausar edición' : '✏️ Activar edición';
    saveBtn.style.display = editing ? 'inline-block' : 'none';
  });

  saveBtn.addEventListener('click', function(){
    var clone = document.documentElement.cloneNode(true);
    var cloneUI = clone.querySelector('#editUI');
    if (cloneUI) cloneUI.remove();
    var cloneBanner = clone.querySelector('#editBanner');
    if (cloneBanner) cloneBanner.remove();
    var cloneBody = clone.querySelector('body');
    if (cloneBody) cloneBody.classList.remove('edit-mode');
    clone.querySelectorAll('.edit').forEach(function(el){ el.removeAttribute('contenteditable'); });
    var dots = clone.querySelector('#heroDots'); if (dots) dots.innerHTML = '';
    clone.querySelectorAll('.hero-slide').forEach(function(el, i){ el.classList.toggle('active', i === 0); });
    clone.querySelectorAll('section.reveal').forEach(function(el){ el.classList.remove('in'); });
    clone.querySelectorAll('.faq-item.open').forEach(function(el){ el.classList.remove('open'); });
    var nl = clone.querySelector('.nav-links'); if (nl) nl.classList.remove('open');
    var mb = clone.querySelector('#menuBtn'); if (mb) mb.setAttribute('aria-expanded','false');
    var finalHtml = '<!doctype html>\n' + clone.outerHTML;
    var blob = new Blob([finalHtml], { type: 'text/html' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    var file = (location.pathname.split('/').pop() || 'index.html'); if (!/\.html$/.test(file)) file += '.html';
    a.download = file;
    document.body.appendChild(a);
    a.click();
    a.remove();
  });
})();
