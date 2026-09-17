/* ============================================================
   CÓDIGO CONTÁBIL 3.0 — Página de vendas
   ============================================================ */

(() => {
  'use strict';

  const reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- CTAs: repassa os parâmetros da URL (utm_*, fbclid...) ao formulário ----------
     Sem isso o lead chega "limpo" no formulário e perde a origem do anúncio.
     A string é repassada exatamente como chegou, sem reescrever a codificação. */
  const qs = window.location.search.substring(1);
  if (qs) {
    document.querySelectorAll('a.cta-formulario').forEach((a) => {
      a.href += (a.href.indexOf('?') > -1 ? '&' : '?') + qs;
    });
  }

  /* ---------- ano do rodapé ---------- */
  const ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();

  /* ---------- headline palavra a palavra ---------- */
  function split(el) {
    const frag = document.createDocumentFragment();
    let i = 0;

    function walk(node, target) {
      node.childNodes.forEach((n) => {
        if (n.nodeType === Node.TEXT_NODE) {
          n.textContent.split(/(\s+)/).forEach((t) => {
            if (!t) return;
            if (/^\s+$/.test(t)) {
              target.appendChild(document.createTextNode(' '));
              return;
            }
            const word = document.createElement('span');
            word.className = 'word';
            const inner = document.createElement('i');
            inner.textContent = t;
            inner.style.setProperty('--wd', `${i++ * 42}ms`);
            word.appendChild(inner);
            target.appendChild(word);
          });
        } else if (n.nodeType === Node.ELEMENT_NODE) {
          const clone = n.cloneNode(false);
          walk(n, clone);
          target.appendChild(clone);
        }
      });
    }

    walk(el, frag);
    el.textContent = '';
    el.appendChild(frag);
  }

  if (!reduz) document.querySelectorAll('[data-split]').forEach(split);

  /* ---------- revelação no scroll ---------- */
  const alvos = document.querySelectorAll('.reveal, .rise, [data-split]');

  if (reduz || !('IntersectionObserver' in window)) {
    alvos.forEach((el) => el.classList.add('is-in'));
  } else {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        obs.unobserve(e.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
    alvos.forEach((el) => obs.observe(el));
  }

  /* ---------- header, progresso, CTA fixa e linha do tempo ---------- */
  const header = document.getElementById('header');
  const dock = document.getElementById('dock');
  const bar = document.getElementById('progress');
  const hero = document.getElementById('hero');
  const oferta = document.getElementById('aplicar');
  const timeline = document.getElementById('timeline');
  let tick = false;

  function onScroll() {
    const y = window.scrollY;
    const vh = window.innerHeight;
    const max = document.documentElement.scrollHeight - vh;
    const passouHero = y > (hero ? hero.offsetHeight * 0.7 : 600);

    if (header) header.classList.toggle('is-visible', passouHero);
    if (bar) bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;

    if (dock && oferta) {
      const ofertaTop = oferta.getBoundingClientRect().top + y;
      dock.classList.toggle('is-visible', passouHero && y < ofertaTop - vh);
    }

    if (timeline && !reduz) {
      const r = timeline.getBoundingClientRect();
      const prog = Math.min(Math.max((vh * 0.65 - r.top) / r.height, 0), 1);
      timeline.style.setProperty('--tl-fill', `${prog * (r.height - 24)}px`);
    }

    tick = false;
  }

  function agendar() {
    if (tick) return;
    tick = true;
    requestAnimationFrame(onScroll);
  }

  window.addEventListener('scroll', agendar, { passive: true });
  window.addEventListener('resize', agendar);
  onScroll();

  /* ---------- lightbox dos prints ---------- */
  const lb = document.getElementById('lb');
  const lbImg = document.getElementById('lbImg');
  const lbClose = document.getElementById('lbClose');
  let ultimo = null;

  function abrir(btn) {
    const img = btn.querySelector('img');
    ultimo = btn;
    lbImg.src = img.currentSrc || img.src;
    lbImg.alt = img.alt;
    lb.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  }

  function fechar() {
    lb.classList.remove('is-open');
    document.body.style.overflow = '';
    lbImg.removeAttribute('src');
    if (ultimo) ultimo.focus();
  }

  if (lb && lbImg && lbClose) {
    document.querySelectorAll('.proof__btn').forEach((btn) => {
      btn.addEventListener('click', () => abrir(btn));
    });
    lbClose.addEventListener('click', fechar);
    lb.addEventListener('click', (e) => {
      if (e.target === lb) fechar();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lb.classList.contains('is-open')) fechar();
    });
  }
})();
