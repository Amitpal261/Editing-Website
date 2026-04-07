
  /* ── NAVIGATION ────────────────────────────────────────── */
  function navigate(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-' + page).classList.add('active');

    document.querySelectorAll('.nav-links a').forEach(a => {
      a.classList.remove('active');
      if (a.dataset.page === page) a.classList.add('active');
    });

    window.scrollTo({ top: 0 });
    document.getElementById('navLinks').classList.remove('open');
    initReveal();
  }

  function toggleMenu() {
    document.getElementById('navLinks').classList.toggle('open');
  }

  /* ── SCROLL REVEAL ─────────────────────────────────────── */
  function initReveal() {
    const els = document.querySelectorAll('.page.active .reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    els.forEach(el => observer.observe(el));
  }

  /* ── BACK TO TOP ───────────────────────────────────────── */
  window.addEventListener('scroll', () => {
    document.getElementById('btt').classList.toggle('show', window.scrollY > 400);
  });

  /* ── HERO REEL BADGE ───────────────────────────────────────── */

 const badge = document.querySelector(".hero-reel-badge");

badge.addEventListener("mousemove", (e) => {
  const rect = badge.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const rotateX = (y / rect.height - 0.5) * 10;
  const rotateY = (x / rect.width - 0.5) * -10;

  badge.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
});

badge.addEventListener("mouseleave", () => {
  badge.style.transform = "rotateX(0) rotateY(0)";
});

// badge.addEventListener("click", () => {
//   openModal('videos/reel-preview.mp4');
// });
/* ── PROJECT DATA ───────────────── */
const projects = [
  {
    title: 'Wedding Highlight Reel',
    cat: 'long',
    video: 'https://res.cloudinary.com/dmtcpwldk/video/upload/v1775586324/Video_Project_6_y1x4tw.mp4',
    type: 'landscape',
  },
  {
    title: 'YouTube Documentary',
    cat: 'short',
    video: 'https://res.cloudinary.com/dmtcpwldk/video/upload/v1775586336/sample_3_bgfe2c.mp4',
   type: 'landscape',
  },
  {
    title: 'Brand Cinematic Grade',
    cat: 'color',
    video: 'https://res.cloudinary.com/dmtcpwldk/video/upload/v1775586317/4ff978b528984570242c47e925e9566d_720w_kqpfpb.mp4',
    type: 'landscape',
  },
  {
    title: 'UGC Marketing Video',
    cat: 'corporate',
    video: 'https://res.cloudinary.com/dmtcpwldk/video/upload/v1775586310/money_fjqytd.mp4',
    type: 'landscape',
  },
  {
    title: 'Travel Vlog — Jaipur',
    cat: 'short',
    video: 'https://res.cloudinary.com/dmtcpwldk/video/upload/v1775586317/travel_sample_4_tfhlb2.mp4',
    type: 'landscape',
  },
  {
    title: 'Instagram Reel Cuts',
    cat: 'short',
    video: 'https://res.cloudinary.com/dmtcpwldk/video/upload/v1775586313/15226557_1920_1080_24fps_z6ule3.mp4',
    type: 'portrait',
  },
  {
    title: 'Car cutting and grading',
    cat: 'color',
    video: 'https://res.cloudinary.com/dmtcpwldk/video/upload/v1775586312/bmw_jupjf6.mp4',
    type: 'landscape',
  },
  {
    title: 'taking head video',
    cat: 'corporate',
    video: 'images/client video 2.mp4',
    type: 'landscape',
  },
  {
    title: 'Fitness Motivational',
    cat: 'short',
    video: 'https://res.cloudinary.com/dmtcpwldk/video/upload/v1775586314/gym_ohpt6h.mp4',
    type: 'landscape',

  },
    {
    title: 'Ads Teaser Cut',
    cat: 'short',
    video: 'https://res.cloudinary.com/dmtcpwldk/video/upload/v1775586335/client_video_1_fkodrz.mp4',
    type: 'landscape',

  },
];

/* ── RENDER ───────────────── */
function renderPortfolio(filter = 'all') {
  const grid = document.getElementById('portfolioGrid');

  const filtered = filter === 'all'
    ? projects
    : projects.filter(p => p.cat === filter);

  grid.innerHTML = filtered.map((p) => `
    <div class="portfolio-item ${p.type}"  onclick="openModal('${p.video}')">
      
      <div class="portfolio-item-inner">
        <video muted loop playsinline preload="none" data-src="${p.video}"></video>
      </div>

      <div class="play-icon">▶</div>

      <div class="portfolio-overlay">
        <div class="portfolio-tag">${formatCategory(p.cat)}</div>
        <div class="portfolio-name">${p.title}</div>
      </div>

    </div>
  `).join('');

  lazyLoadVideos();
  attachHoverPlayback();
}

/* ── CATEGORY LABEL ───────────────── */
function formatCategory(cat) {
  return cat
    .replace('color','Color Grading')
    .replace('short','Short Form')
    .replace('long','Long Form')
    .replace('corporate','Corporate');
}

/* ── FILTER ───────────────── */
function filterPortfolio(cat, btn) {
  document.querySelectorAll('.filter-btn')
    .forEach(b => b.classList.remove('active'));

  btn.classList.add('active');
  renderPortfolio(cat);
}

/* ── HOVER PLAY ───────────────── */
function attachHoverPlayback() {
  const items = document.querySelectorAll('.portfolio-item');

  items.forEach(item => {
    const video = item.querySelector('video');

    item.addEventListener('mouseenter', () => {
      video.play();
    });

    item.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = 0;
    });
  });
}

/* ── LAZY LOAD (🔥 performance) ───────────────── */
function lazyLoadVideos() {
  const videos = document.querySelectorAll('video[data-src]');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const video = entry.target;
        video.src = video.dataset.src;
        observer.unobserve(video);
      }
    });
  }, { threshold: 0.5 });

  videos.forEach(v => observer.observe(v));
}

/* ── MODAL ───────────────── */
function openModal(src) {
  const modal = document.getElementById('videoModal');
  const video = document.getElementById('modalVideo');

  video.src = src;
  modal.classList.add('active');
}

function closeModal() {
  const modal = document.getElementById('videoModal');
  const video = document.getElementById('modalVideo');

  video.pause();
  video.src = '';
  modal.classList.remove('active');
}

/* ESC to close */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

/* INIT */
renderPortfolio();

  /* ── PRICING TOGGLE ────────────────────────────────────── */
  const basePrices = { p1: 499, p2: 2999, p3: 5999 };
  let bundleMode = false;

  function togglePricing() {
    bundleMode = !bundleMode;
    document.getElementById('toggleSwitch').classList.toggle('on', bundleMode);
    ['p1','p2','p3'].forEach(id => {
      const base = basePrices[id];
      const val = bundleMode ? Math.round(base * 0.8) : base;
      document.getElementById(id).innerHTML = `<sub>₹</sub>${val.toLocaleString('en-IN')}`;
    });
  }

  /* ── FAQ ───────────────────────────────────────────────── */
  const faqs = [
    { q: 'How do I send my footage?', a: 'You can share your raw files via Google Drive, WeTransfer, or Dropbox. I\'ll send you a link to upload securely once we confirm the project.' },
    { q: 'How long does editing take?', a: 'Short edits are typically done within 24–48 hours. Long-form projects (10+ minutes) take 3–5 business days. Rush delivery is available for an additional fee.' },
    { q: 'How many revisions do I get?', a: 'It depends on the plan — Starter gets 1 round, Creator gets 3 rounds, and Pro gets unlimited revisions until you\'re fully satisfied.' },
    { q: 'What format will I receive the final video in?', a: 'By default I export in MP4 (H.264) at 1080p. I can also export in 4K, ProRes, or any custom resolution/format you need.' },
    { q: 'Do you work with international clients?', a: 'Absolutely! I work with clients worldwide. Communication is in English and files are exchanged digitally, so location is never a barrier.' },
    { q: 'Can I see your previous work before hiring?', a: 'Yes! Check out the Portfolio page to see a selection of my recent projects. I can also share more samples relevant to your specific project type.' },
  ];

  function renderFAQ() {
    document.getElementById('faqList').innerHTML = faqs.map((f, i) => `
      <div class="faq-item" id="faq${i}">
        <div class="faq-q" onclick="toggleFAQ(${i})">
          <span>${f.q}</span>
          <div class="faq-icon">+</div>
        </div>
        <div class="faq-a">${f.a}</div>
      </div>
    `).join('');
  }

  function toggleFAQ(i) {
    const item = document.getElementById('faq' + i);
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  }

  /* ── CONTACT FORM ──────────────────────────────────────── */
  function submitForm() {
    const name = document.getElementById('fname').value.trim();
    const email = document.getElementById('femail').value.trim();
    const service = document.getElementById('fservice').value;
    const message = document.getElementById('fmessage').value.trim();
    if (!name || !email || !service || !message) {
      alert('Please fill in all required fields.');
      return;
    }
    document.getElementById('formSuccess').style.display = 'block';
    document.getElementById('fname').value = '';
    document.getElementById('femail').value = '';
    document.getElementById('fservice').selectedIndex = 0;
    document.getElementById('fbudget').selectedIndex = 0;
    document.getElementById('fmessage').value = '';
    setTimeout(() => { document.getElementById('formSuccess').style.display = 'none'; }, 5000);
  }

  /* ── INIT ──────────────────────────────────────────────── */
  renderPortfolio();
  renderFAQ();
  initReveal();
