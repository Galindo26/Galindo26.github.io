/**
 * Daniel Galindo Aranda — Language Selector (ES / EN)
 * Spanish is the source text in index.html; English strings are keyed by each
 * element's `data-i18n` value (innerHTML, so <strong>/<em> are allowed).
 * Language priority: ?lang= URL parameter > saved choice > browser language.
 * Runs synchronously before script.js so the page paints in the chosen language.
 */

(function () {
  const EN = {
    'meta.title': 'Daniel Galindo Aranda | Robotics, Mechatronics & AI Engineering',
    'meta.description': 'Professional portfolio of Daniel Galindo Aranda. Electronic, Robotics and Mechatronics Engineering (University of Málaga). Focused on multibody dynamics, Real-to-Sim, computer vision and autonomous systems.',

    'skip': 'Skip to content',
    'nav.aria': 'Sections',
    'nav.about': 'About',
    'nav.areas': 'Expertise',
    'nav.projects': 'Projects',
    'nav.timeline': 'Path',
    'nav.certs': 'Certifications',
    'nav.contact': 'Contact',

    'hero.kicker': 'UNIVERSITY OF MÁLAGA · SCHOOL OF INDUSTRIAL ENGINEERING',
    'hero.tagline': 'Electronic, Robotics and Mechatronics Engineering',
    'hero.subtitle': 'Final-year engineering student working at the intersection of <strong>multibody physical dynamics</strong>, high-fidelity <em>Real-to-Sim</em> simulation, real-time <strong>computer perception</strong> and control architectures for autonomous systems.',
    'hero.cta': 'Technical Expertise',
    'hero.contact': 'Contact',

    'about.tag': 'Technical Profile',
    'about.title': 'About Me & Engineering Principles',
    'about.quote': '"Explicitly model what we know, identify only what the data supports, and learn only what remains unexplained."',
    'about.p1': 'My profile combines the physical and mathematical rigor of <strong>mechatronics</strong> (system dynamics, state-space control, joint kinematics and electronic instrumentation) with <strong>artificial perception and autonomous decision-making models</strong>.',
    'about.p2': 'I have applied training in technical workflow automation, data normalization and sensor instrumentation. My work focuses on reproducible digital twins, reactive teleoperation and vision-based human-robot interaction (HRI).',
    'stat1.label': 'Degree in Electronic, Robotics and Mechatronics Engineering (UMA)',
    'stat2.label': 'Distributed control and navigation architectures',
    'stat3.label': 'Dynamic twins on OpenUSD and physics simulation',
    'stat4.number': '3D Perception',
    'stat4.label': 'Real-time spatial tracking and visual interaction',

    'areas.tag': 'Disciplines',
    'areas.title': 'Technical Expertise',
    'a1.title': 'Robotics & Control',
    'a1.text': 'Kinematic and dynamic modeling of manipulators and mobile robots. Closed-loop joint control, inverse kinematics, <strong>ROS 2</strong> integration and actuator power budgeting.',
    'a2.title': 'Digital Twins & Real-to-Sim',
    'a2.text': 'System identification (SysID), physics simulator calibration and hybrid compensation of dynamic discrepancies on <strong>OpenUSD</strong> and <strong>NVIDIA Isaac Sim</strong>.',
    'a3.title': 'Vision & Spatial Perception',
    'a3.text': 'Real-time 3D joint pose capture and estimation with <strong>MediaPipe</strong> and <strong>OpenCV</strong>. Gesture-based HRI teleoperation, semantic grasping and hand-eye calibration.',
    'a4.title': 'Software for Autonomous Systems',
    'a4.text': 'Software architectures for autonomous systems: local tool orchestration, decision models, <strong>FastAPI</strong> services and automation on embedded hardware.',
    'tag.kinematics': 'Kinematics',
    'tag.embedded': 'Embedded',

    'projects.tag': 'Development',
    'projects.title': 'Projects & Open Source',
    'projects.subtitle': 'Space reserved for upcoming technical publications. Open-source repositories will be added as they reach their validation milestones.',
    'projects.phTitle': 'Modules in Development',
    'projects.phText': 'Currently structuring and validating control libraries, perception interfaces and simulation tools. Public repositories with technical documentation and reproduction guides will be published right here.',
    'projects.github': 'Follow on GitHub',
    'projects.contact': 'Technical Contact',

    'stack.tag': 'Technologies',
    'stack.title': 'Tools & Work Environment',
    'stack.g1': 'Languages',
    'stack.g2': 'Robotics & Simulation',
    'stack.g3': 'Vision, AI & Control',
    'stack.g4': 'Systems & Deployment',

    'timeline.tag': 'Path',
    'timeline.title': 'Education & Experience',
    't1.date': '2021 - Present',
    't1.title': 'B.Sc. in Electronic, Robotics and Mechatronics Engineering · University of Málaga',
    't1.desc': 'School of Industrial Engineering (UMA). Focus on robot control, kinematics and dynamics, perception systems, computer vision, digital electronics and integrated projects.',
    't2.title': 'Electronics Laboratory Assistant · University of Málaga',
    't2.desc': 'Department of Electronic Technology (UMA), with official accreditation from the department. Technical and teaching support in lab sessions: precision instrumentation (oscilloscopes, signal generators, DC power supplies) and help assembling and debugging analog and digital circuits for engineering students.',
    't3.date': 'Next Milestone (2027)',
    't3.title': "Master's Degree in Robotics and Artificial Intelligence",
    't3.desc': 'Planned postgraduate path oriented towards research in intelligent robotics, physical interaction and learning of complex dynamics.',

    'certs.tag': 'Credentials',
    'certs.title': 'Official Certifications & Languages',
    'certs.subtitle': 'Official training courses, accredited skills and international language certification.',
    'c1.issuer': 'European Union · EIT HEI',
    'c1.text': 'Academic training and official European certification in cutting-edge technology skills:',
    'c1.l1': '<strong>Artificial Intelligence</strong> (3 ECTS)',
    'c1.l3': '<strong>Cybersecurity</strong> (3 ECTS)',
    'c2.badge': 'Official B2',
    'c2.title': 'Language Certification',
    'c2.text': 'Technical communication skills and fluency in international research and collaboration settings:',
    'c2.spanish': 'Spanish',
    'c2.native': 'Native',
    'c2.english': 'English',
    'c3.badge': 'Certificate',
    'c3.text': 'Fundamentals and architecture of deep neural networks for computer vision, image classification and regression in technical computing environments.',
    'c3.tagVision': 'Vision',
    'c3.tagModeling': 'Modeling',

    'footer.title': 'Contact & Collaboration',
    'footer.subtitle': 'Available for technical inquiries, research projects or professional exchange in robotics and automation.',
    'footer.email': 'Send Email',
    'footer.copy': 'Copy Email',
    'footer.github': 'GitHub Profile',
    'footer.bottom': '© 2026 Daniel Galindo Aranda · Málaga, Spain',
    'footer.subtext': 'Personal technical website hosted on GitHub Pages'
  };

  // Strings set dynamically by script.js (both languages needed there)
  const UI = {
    es: {
      themeToLight: 'Activar tema claro',
      themeToDark: 'Activar tema oscuro',
      menuOpen: 'Abrir menú',
      menuClose: 'Cerrar menú',
      copied: '¡Copiado!',
      langSwitch: 'Switch to English'
    },
    en: {
      themeToLight: 'Switch to light theme',
      themeToDark: 'Switch to dark theme',
      menuOpen: 'Open menu',
      menuClose: 'Close menu',
      copied: 'Copied!',
      langSwitch: 'Cambiar a español'
    }
  };

  const SUPPORTED = ['es', 'en'];
  const html = document.documentElement;
  const metaDescription = document.querySelector('meta[name="description"]');
  const canonical = document.getElementById('canonical-link');
  const ogLocale = document.querySelector('meta[property="og:locale"]');
  const toggle = document.getElementById('lang-toggle');

  // Capture the Spanish source once so switching back needs no second dictionary
  const textNodes = Array.from(document.querySelectorAll('[data-i18n]')).map(el => ({
    el,
    key: el.getAttribute('data-i18n'),
    es: el.innerHTML
  }));

  const attrNodes = [];
  document.querySelectorAll('[data-i18n-attr]').forEach(el => {
    el.getAttribute('data-i18n-attr').split(';').forEach(pair => {
      const [attr, key] = pair.split(':').map(s => s.trim());
      if (attr && key) attrNodes.push({ el, attr, key, es: el.getAttribute(attr) });
    });
  });

  const metaSource = {
    title: document.title,
    description: metaDescription ? metaDescription.content : ''
  };

  let current = 'es';

  function readUrlLang() {
    try {
      const lang = new URLSearchParams(window.location.search).get('lang');
      return SUPPORTED.includes(lang) ? lang : null;
    } catch (err) {
      return null;
    }
  }

  function readSavedLang() {
    try {
      const lang = localStorage.getItem('lang');
      return SUPPORTED.includes(lang) ? lang : null;
    } catch (err) {
      return null;
    }
  }

  function detectLang() {
    const browser = (navigator.languages && navigator.languages[0]) || navigator.language || 'es';
    return browser.toLowerCase().startsWith('es') ? 'es' : 'en';
  }

  function apply(lang) {
    current = lang;
    const en = lang === 'en';

    textNodes.forEach(({ el, key, es }) => {
      const value = en ? EN[key] : es;
      if (value !== undefined) el.innerHTML = value;
    });
    attrNodes.forEach(({ el, attr, key, es }) => {
      const value = en ? EN[key] : es;
      if (value !== undefined) el.setAttribute(attr, value);
    });

    html.setAttribute('lang', lang);
    document.title = en ? EN['meta.title'] : metaSource.title;
    if (metaDescription) metaDescription.content = en ? EN['meta.description'] : metaSource.description;
    if (canonical) canonical.href = `https://galindo26.github.io/${en ? '?lang=en' : ''}`;
    if (ogLocale) ogLocale.content = en ? 'en_GB' : 'es_ES';
    if (toggle) toggle.setAttribute('aria-label', UI[lang].langSwitch);

    document.dispatchEvent(new CustomEvent('site:langchange', { detail: { lang } }));
  }

  function setLang(lang) {
    try {
      localStorage.setItem('lang', lang);
    } catch (err) {
      // Storage unavailable: the choice still applies for this visit
    }

    // Keep a shared ?lang= link consistent with the visible language
    try {
      const url = new URL(window.location.href);
      if (url.searchParams.has('lang')) {
        url.searchParams.set('lang', lang);
        history.replaceState(null, '', url);
      }
    } catch (err) {
      // file:// or restricted history: nothing to sync
    }

    apply(lang);
  }

  if (toggle) {
    toggle.addEventListener('click', () => setLang(current === 'es' ? 'en' : 'es'));
  }

  window.siteI18n = {
    get lang() {
      return current;
    },
    t(key) {
      return UI[current][key];
    }
  };

  apply(readUrlLang() || readSavedLang() || detectLang());
})();
