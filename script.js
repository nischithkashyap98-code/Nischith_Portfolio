/* Typed subtitle */
const typed = document.getElementById('typed');
const phrases = ['Building scalable web apps.', 'Automating CI/CD pipelines.', 'Bridging mechanical systems with cloud.'];
let pi = 0, ci = 0, forward = true;
function typer(){
  const p = phrases[pi];
  if(forward){ ci++; typed.textContent = p.slice(0,ci); if(ci===p.length){ forward=false; setTimeout(typer,1200); return; } }
  else{ ci--; typed.textContent = p.slice(0,ci); if(ci===0){ forward=true; pi=(pi+1)%phrases.length; } }
  setTimeout(typer,80);
}
if(typed) typer();

/* mobile menu toggle */
const menuToggle = document.getElementById('menu-toggle');
const nav = document.querySelector('.nav');
menuToggle && menuToggle.addEventListener('click', e => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  if(nav.style.display && nav.style.display !== 'none') nav.style.display = 'none'; else nav.style.display = 'flex';
});

/* animated skill bars on reveal */
const fills = document.querySelectorAll('.bar-fill');
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if(en.isIntersecting) {
      en.target.style.transform = 'scaleX(1)';
      const pct = en.target.getAttribute('data-fill') || 80;
      en.target.style.width = pct + '%';
    }
  });
}, {threshold: 0.25});
fills.forEach(f => skillObserver.observe(f));

/* carousel logic */
const carousel = document.getElementById('carousel');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
let index = 0;
function showSlide(i){
  index = (i + slides.length) % slides.length;
  const offset = slides[0].clientWidth + 16;
  carousel.scrollTo({ left: offset * index, behavior: 'smooth' });
}
prevBtn && prevBtn.addEventListener('click', ()=> showSlide(index-1));
nextBtn && nextBtn.addEventListener('click', ()=> showSlide(index+1));
/* autoplay */
let auto = setInterval(()=> showSlide(index+1), 5000);
carousel && carousel.addEventListener('mouseenter', ()=> clearInterval(auto));
carousel && carousel.addEventListener('mouseleave', ()=> auto = setInterval(()=> showSlide(index+1), 5000));

/* slide click -> modal */
const modal = document.getElementById('project-modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalGH = document.getElementById('modal-gh');
const modalLive = document.getElementById('modal-live');
const modalClose = document.getElementById('modal-close');

document.querySelectorAll('.slide').forEach(sl=>{
  sl.addEventListener('click', ()=>{
    const img = sl.dataset.img || 'assets/profile.jpg';
    const title = sl.dataset.title || '';
    const desc = sl.dataset.desc || '';
    const gh = sl.dataset.gh || '#';
    const live = sl.dataset.live || '#';
    modalImg.src = img; modalTitle.textContent = title; modalDesc.textContent = desc;
    modalGH.href = gh; modalLive.href = live;
    modal.classList.add('open'); modal.setAttribute('aria-hidden','false');
  });
});
modalClose && modalClose.addEventListener('click', ()=> { modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); });
modal && modal.addEventListener('click', e => { if(e.target === modal) { modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); }});
document.addEventListener('keydown', e => { if(e.key === 'Escape') { modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); }});

/* progress bar and back-to-top */
const progress = document.getElementById('progress-bar');
const backTop = document.getElementById('back-to-top');
window.addEventListener('scroll', ()=>{
  const sc = window.scrollY, h = document.documentElement.scrollHeight - window.innerHeight;
  const pct = (sc / h) * 100; progress.style.width = pct + '%';
  if(sc > 400) backTop.style.display = 'block'; else backTop.style.display = 'none';
});
backTop && backTop.addEventListener('click', ()=> window.scrollTo({top:0,behavior:'smooth'}));

/* reveal animations (pop + zoom) */
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
  });
},{threshold:0.12});
document.querySelectorAll('.section, .slide, .card, .profile-card').forEach(el=> io.observe(el));
