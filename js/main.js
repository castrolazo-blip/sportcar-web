(function(){
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Menú móvil
  var menuBtn = document.getElementById('menuBtn');
  var navLinks = document.getElementById('navLinks');
  function setMenu(open){
    if (!navLinks || !menuBtn) return;
    navLinks.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuBtn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  }
  if (menuBtn && navLinks){
    menuBtn.addEventListener('click', function(e){ e.stopPropagation(); setMenu(!navLinks.classList.contains('open')); });
    navLinks.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', function(){ setMenu(false); }); });
    document.addEventListener('click', function(e){ if (!navLinks.contains(e.target)) setMenu(false); });
    document.addEventListener('keydown', function(e){ if (e.key === 'Escape') setMenu(false); });
  }

  // Slider del inicio
  var slides = document.querySelectorAll('.hero-slide');
  var dotsWrap = document.getElementById('heroDots');
  if (slides.length && dotsWrap){
    var current = 0;
    slides.forEach(function(s, i){
      s.classList.toggle('active', i === 0);
      var dot = document.createElement('span');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', function(){ goTo(i); });
      dotsWrap.appendChild(dot);
    });
    function goTo(i){
      slides[current].classList.remove('active'); dotsWrap.children[current].classList.remove('active');
      current = i;
      slides[current].classList.add('active'); dotsWrap.children[current].classList.add('active');
    }
    setInterval(function(){ goTo((current + 1) % slides.length); }, 5000);
  }

  // Aparición al hacer scroll
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.08 });
    reveals.forEach(function(el){ io.observe(el); });
  } else {
    reveals.forEach(function(el){ el.classList.add('in'); });
  }

  // Preguntas frecuentes
  document.querySelectorAll('.faq-item').forEach(function(item){
    var q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', function(){
      var wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(function(i){ i.classList.remove('open'); });
      if (!wasOpen) item.classList.add('open');
    });
  });

  // Formulario -> WhatsApp con mensaje prellenado
  var form = document.getElementById('contactForm');
  if (form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var v = function(id){ var el = document.getElementById(id); return el ? el.value.trim() : ''; };
      var lines = ['Hola Sport Car, quiero solicitar una cotización.', '', 'Nombre: ' + v('cf-name'), 'Teléfono: ' + v('cf-contact')];
      if (v('cf-car')) lines.push('Vehículo: ' + v('cf-car'));
      if (v('cf-service')) lines.push('Servicio: ' + v('cf-service'));
      if (v('cf-ins')) lines.push('Seguro: ' + v('cf-ins'));
      if (v('cf-msg')) lines.push('', v('cf-msg'));
      window.open('https://wa.me/50377979504?text=' + encodeURIComponent(lines.join('\n')), '_blank', 'noopener');
    });
  }
})();
