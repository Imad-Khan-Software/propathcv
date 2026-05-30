// ── CV Templates ──

const CV_TEMPLATES = [
  {
    id: 'modern',
    name: 'Modern Blue',
    badge: 'Modern',
    badgeClass: 'badge-modern',
    description: 'Clean two-column layout with a deep navy header and blue accents.',
    render: renderModern
  },
  {
    id: 'classic',
    name: 'Classic Elegant',
    badge: 'Classic',
    badgeClass: 'badge-classic',
    description: 'Traditional serif typography with gold ruled lines. Timeless.',
    render: renderClassic
  },
  {
    id: 'creative',
    name: 'Creative Bold',
    badge: 'Creative',
    badgeClass: 'badge-creative',
    description: 'Bold red header, dark sidebar, skill bars. Stand out.',
    render: renderCreative
  },
  {
    id: 'minimal',
    name: 'Minimal Clean',
    badge: 'Minimal',
    badgeClass: 'badge-minimal',
    description: 'Pure white, ultra-clean layout. Perfect for tech & finance.',
    render: renderMinimal
  },
  {
    id: 'executive',
    name: 'Executive Dark',
    badge: 'Premium',
    badgeClass: 'badge-modern',
    description: 'Dark theme with gold accents. Bold. Professional.',
    render: renderExecutive
  }
];

function renderTemplateGrid() {
  const grid = document.getElementById('templatesGrid');
  grid.innerHTML = '';
  const data = window.cvData || {};

  CV_TEMPLATES.forEach((tpl, i) => {
    const card = document.createElement('div');
    card.className = 'template-card';
    card.style.animationDelay = `${i * 0.08}s`;

    // Inline mini preview HTML
    const previewHTML = tpl.render(data);

    card.innerHTML = `
      <div class="template-thumbnail">
        <iframe srcdoc="${escapeAttr(previewHTML)}" scrolling="no" loading="lazy"></iframe>
      </div>
      <div class="template-info">
        <span class="template-name">${tpl.name}</span>
        <span class="template-badge ${tpl.badgeClass}">${tpl.badge}</span>
      </div>
      <button class="template-select-btn" onclick="selectTemplate('${tpl.id}')">
        Use This Template →
      </button>
    `;
    grid.appendChild(card);
  });
}

function escapeAttr(str) {
  return str.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function selectTemplate(id) {
  const tpl = CV_TEMPLATES.find(t => t.id === id);
  if (!tpl) return;
  const data = window.cvData || {};
  document.getElementById('cvPreview').innerHTML = tpl.render(data);
  document.getElementById('previewTemplateName').textContent = tpl.name;
  window.currentTemplate = id;
  showPage('preview');
}

// ── Helper functions ──
function initials(name) {
  return (name || 'CV').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

function renderContacts(data) {
  const parts = [];
  if (data.email) parts.push(`<span>✉ ${data.email}</span>`);
  if (data.phone) parts.push(`<span>☎ ${data.phone}</span>`);
  if (data.location) parts.push(`<span>⌖ ${data.location}</span>`);
  if (data.website) parts.push(`<span>⊕ ${data.website}</span>`);
  return parts.join('');
}

function renderExpSection(data, cls, template) {
  if (!data.experience || !data.experience.length) return '';
  return data.experience.map(exp => {
    if (!exp.title && !exp.company) return '';
    if (template === 'creative') {
      return `<div class="exp-item">
        <div class="exp-title">${exp.title}</div>
        <div class="exp-company">${exp.company}</div>
        <div class="exp-dates">${[exp.start, exp.end].filter(Boolean).join(' – ')}</div>
        ${exp.desc ? `<div class="exp-desc">${exp.desc}</div>` : ''}
      </div>`;
    }
    if (template === 'minimal') {
      return `<div class="exp-item">
        <div class="exp-meta">
          <div class="exp-dates">${[exp.start, exp.end].filter(Boolean).join(' – ')}</div>
          <div class="exp-company">${exp.company}</div>
        </div>
        <div>
          <div class="exp-title">${exp.title}</div>
          ${exp.desc ? `<div class="exp-desc">${exp.desc}</div>` : ''}
        </div>
      </div>`;
    }
    if (template === 'classic') {
      return `<div class="exp-item">
        <div class="exp-header">
          <span class="exp-title">${exp.title}</span>
          <span class="exp-dates">${[exp.start, exp.end].filter(Boolean).join(' – ')}</span>
        </div>
        <div class="exp-company">${exp.company}</div>
        ${exp.desc ? `<div class="exp-desc">${exp.desc}</div>` : ''}
      </div>`;
    }
    return `<div class="exp-item">
      <div class="exp-title">${exp.title}</div>
      <div class="exp-company">${exp.company}</div>
      <div class="exp-dates">${[exp.start, exp.end].filter(Boolean).join(' – ')}</div>
      ${exp.desc ? `<div class="exp-desc">${exp.desc}</div>` : ''}
    </div>`;
  }).join('');
}

function renderEduSection(data, template) {
  if (!data.education || !data.education.length) return '';
  return data.education.map(edu => {
    if (!edu.degree && !edu.school) return '';
    if (template === 'minimal') {
      return `<div class="exp-item">
        <div class="exp-meta">
          <div class="exp-dates">${[edu.start, edu.end].filter(Boolean).join(' – ')}</div>
        </div>
        <div>
          <div class="exp-title">${edu.degree}</div>
          <div class="exp-desc">${edu.school}${edu.note ? ` · ${edu.note}` : ''}</div>
        </div>
      </div>`;
    }
    if (template === 'classic') {
      return `<div class="exp-item">
        <div class="exp-header">
          <span class="exp-title">${edu.degree}</span>
          <span class="exp-dates">${[edu.start, edu.end].filter(Boolean).join(' – ')}</span>
        </div>
        <div class="exp-company">${edu.school}${edu.note ? ` · ${edu.note}` : ''}</div>
      </div>`;
    }
    return `<div class="exp-item">
      <div class="exp-title">${edu.degree}</div>
      <div class="exp-company">${edu.school}</div>
      <div class="exp-dates">${[edu.start, edu.end].filter(Boolean).join(' – ')}${edu.note ? ` · ${edu.note}` : ''}</div>
    </div>`;
  }).join('');
}

const BASE_CSS = `
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"/>
  <style>*{box-sizing:border-box;margin:0;padding:0}</style>
`;

// ── Template Renderers ──

function renderModern(data) {
  const skills = (data.skills || []).map(s => `<span class="skill-tag">${s}</span>`).join('');
  const langs = (data.languages || []).map(l => `<div class="lang-item"><span>${l}</span></div>`).join('');
  return `<!DOCTYPE html><html><head>${BASE_CSS}
  <link rel="stylesheet" href="css/preview.css"/></head><body>
  <div class="cv-modern">
    <div class="cv-header">
      <div class="cv-avatar">${initials(data.fullName)}</div>
      <div class="cv-header-info">
        <h1>${data.fullName || 'Your Name'}</h1>
        <div class="cv-jobtitle">${data.jobTitle || 'Professional Title'}</div>
        <div class="cv-contacts">${renderContacts(data)}</div>
      </div>
    </div>
    <div class="cv-body">
      <div class="cv-sidebar">
        ${skills ? `<div class="cv-section"><div class="cv-section-title">Skills</div>${skills}</div>` : ''}
        ${langs ? `<div class="cv-section"><div class="cv-section-title">Languages</div>${langs}</div>` : ''}
        ${data.certifications ? `<div class="cv-section"><div class="cv-section-title">Certifications</div><div style="font-size:0.82rem;color:#555;line-height:1.7">${data.certifications}</div></div>` : ''}
        ${data.hobbies ? `<div class="cv-section"><div class="cv-section-title">Interests</div><div style="font-size:0.82rem;color:#555">${data.hobbies}</div></div>` : ''}
      </div>
      <div class="cv-main">
        ${data.summary ? `<div class="cv-section"><div class="cv-section-title">Professional Summary</div><div class="cv-summary">${data.summary}</div></div>` : ''}
        ${data.experience?.length ? `<div class="cv-section"><div class="cv-section-title">Work Experience</div>${renderExpSection(data, 'cv-modern', 'modern')}</div>` : ''}
        ${data.education?.length ? `<div class="cv-section"><div class="cv-section-title">Education</div>${renderEduSection(data, 'modern')}</div>` : ''}
        ${data.projects ? `<div class="cv-section"><div class="cv-section-title">Projects & Achievements</div><div class="cv-summary">${data.projects}</div></div>` : ''}
      </div>
    </div>
  </div></body></html>`;
}

function renderClassic(data) {
  const skills = (data.skills || []).concat(data.languages || []).join(', ');
  return `<!DOCTYPE html><html><head>${BASE_CSS}
  <link rel="stylesheet" href="css/preview.css"/></head><body>
  <div class="cv-classic">
    <div class="cv-header">
      <h1>${data.fullName || 'Your Name'}</h1>
      <div class="cv-jobtitle">${data.jobTitle || 'Professional Title'}</div>
      <div class="cv-contacts">${renderContacts(data)}</div>
    </div>
    ${data.summary ? `<div class="cv-section"><div class="cv-section-title">Profile</div><div class="cv-summary">${data.summary}</div></div>` : ''}
    ${data.experience?.length ? `<div class="cv-section"><div class="cv-section-title">Professional Experience</div>${renderExpSection(data, 'cv-classic', 'classic')}</div>` : ''}
    <div class="two-col">
      ${data.education?.length ? `<div class="cv-section"><div class="cv-section-title">Education</div>${renderEduSection(data, 'classic')}</div>` : '<div></div>'}
      <div>
        ${skills ? `<div class="cv-section"><div class="cv-section-title">Skills & Languages</div><div class="skills-inline">${skills}</div></div>` : ''}
        ${data.certifications ? `<div class="cv-section"><div class="cv-section-title">Certifications</div><div class="skills-inline">${data.certifications}</div></div>` : ''}
      </div>
    </div>
    ${data.projects ? `<div class="cv-section"><div class="cv-section-title">Notable Projects</div><div class="cv-summary">${data.projects}</div></div>` : ''}
  </div></body></html>`;
}

function renderCreative(data) {
  const skillBars = (data.skills || []).slice(0, 8).map(s =>
    `<div class="skill-bar-wrap"><div class="skill-bar-label">${s}</div><div class="skill-bar"><div class="skill-bar-fill" style="width:${75 + Math.random()*20 | 0}%"></div></div></div>`
  ).join('');
  return `<!DOCTYPE html><html><head>${BASE_CSS}
  <link rel="stylesheet" href="css/preview.css"/></head><body>
  <div class="cv-creative">
    <div class="cv-header">
      <h1>${data.fullName || 'Your Name'}</h1>
      <div class="cv-jobtitle">${data.jobTitle || 'Professional Title'}</div>
      <div class="cv-contacts">${renderContacts(data)}</div>
    </div>
    <div class="cv-body">
      <div class="cv-main">
        ${data.summary ? `<div class="cv-section"><div class="cv-section-title">About Me</div><div class="cv-summary">${data.summary}</div></div>` : ''}
        ${data.experience?.length ? `<div class="cv-section"><div class="cv-section-title">Experience</div>${renderExpSection(data, 'cv-creative', 'creative')}</div>` : ''}
        ${data.education?.length ? `<div class="cv-section"><div class="cv-section-title">Education</div>${renderEduSection(data, 'creative')}</div>` : ''}
        ${data.projects ? `<div class="cv-section"><div class="cv-section-title">Projects</div><div class="cv-summary" style="color:#555">${data.projects}</div></div>` : ''}
      </div>
      <div class="cv-sidebar">
        ${skillBars ? `<div class="sidebar-section-title" style="margin-top:0">Skills</div>${skillBars}` : ''}
        ${data.languages?.length ? `<div class="sidebar-section-title">Languages</div>${data.languages.map(l => `<div style="font-size:0.82rem;color:#ccc;margin-bottom:6px">${l}</div>`).join('')}` : ''}
        ${data.certifications ? `<div class="sidebar-section-title">Certifications</div><div style="font-size:0.8rem;color:#999;line-height:1.7">${data.certifications}</div>` : ''}
        ${data.hobbies ? `<div class="sidebar-section-title">Interests</div><div style="font-size:0.8rem;color:#999">${data.hobbies}</div>` : ''}
      </div>
    </div>
  </div></body></html>`;
}

function renderMinimal(data) {
  const skills = (data.skills || []).map(s => `<span class="skill-tag">${s}</span>`).join('');
  return `<!DOCTYPE html><html><head>${BASE_CSS}
  <link rel="stylesheet" href="css/preview.css"/>
  <style>body{background:#fff}</style></head><body>
  <div class="cv-minimal">
    <div class="cv-header">
      <div class="cv-header-left">
        <h1>${data.fullName || 'Your Name'}</h1>
        <div class="cv-jobtitle">${data.jobTitle || ''}</div>
      </div>
      <div class="cv-contacts">
        ${data.email ? `<span>${data.email}</span>` : ''}
        ${data.phone ? `<span>${data.phone}</span>` : ''}
        ${data.location ? `<span>${data.location}</span>` : ''}
        ${data.website ? `<span>${data.website}</span>` : ''}
      </div>
    </div>
    ${data.summary ? `<div class="cv-section"><div class="cv-section-title">Summary</div><div class="cv-summary">${data.summary}</div></div>` : ''}
    ${data.experience?.length ? `<div class="cv-section"><div class="cv-section-title">Experience</div>${renderExpSection(data, 'cv-minimal', 'minimal')}</div>` : ''}
    ${data.education?.length ? `<div class="cv-section"><div class="cv-section-title">Education</div>${renderEduSection(data, 'minimal')}</div>` : ''}
    ${skills ? `<div class="cv-section"><div class="cv-section-title">Skills</div><div class="skills-wrap">${skills}</div></div>` : ''}
    ${data.languages?.length ? `<div class="cv-section"><div class="cv-section-title">Languages</div><div class="skills-wrap">${data.languages.map(l=>`<span class="skill-tag">${l}</span>`).join('')}</div></div>` : ''}
    ${data.projects ? `<div class="cv-section"><div class="cv-section-title">Projects & Achievements</div><div class="cv-summary">${data.projects}</div></div>` : ''}
  </div></body></html>`;
}

function renderExecutive(data) {
  const skills = (data.skills || []).map(s => `<span class="skill-tag">${s}</span>`).join('');
  const langs = (data.languages || []).map(l => `<div class="lang-item"><span>${l}</span></div>`).join('');
  return `<!DOCTYPE html><html><head>${BASE_CSS}
  <link rel="stylesheet" href="css/preview.css"/></head><body>
  <div class="cv-executive">
    <div class="cv-header">
      <div class="cv-header-info">
        <h1>${data.fullName || 'Your Name'}</h1>
        <div class="cv-jobtitle">${data.jobTitle || 'Professional Title'}</div>
      </div>
      <div class="cv-contacts">
        ${data.email ? `<span>✉ ${data.email}</span>` : ''}
        ${data.phone ? `<span>☎ ${data.phone}</span>` : ''}
        ${data.location ? `<span>⌖ ${data.location}</span>` : ''}
        ${data.website ? `<span>⊕ ${data.website}</span>` : ''}
      </div>
    </div>
    <div class="cv-body">
      <div class="cv-sidebar">
        ${skills ? `<div class="cv-section"><div class="cv-section-title">Skills</div>${skills}</div>` : ''}
        ${langs ? `<div class="cv-section"><div class="cv-section-title">Languages</div>${langs}</div>` : ''}
        ${data.certifications ? `<div class="cv-section"><div class="cv-section-title">Certifications</div><div style="font-size:0.82rem;color:#7a8099;line-height:1.7">${data.certifications}</div></div>` : ''}
        ${data.hobbies ? `<div class="cv-section"><div class="cv-section-title">Interests</div><div style="font-size:0.82rem;color:#7a8099">${data.hobbies}</div></div>` : ''}
      </div>
      <div class="cv-main">
        ${data.summary ? `<div class="cv-section"><div class="cv-section-title">Executive Profile</div><div class="cv-summary">${data.summary}</div></div>` : ''}
        ${data.experience?.length ? `<div class="cv-section"><div class="cv-section-title">Career History</div>${renderExpSection(data, 'cv-executive', 'executive')}</div>` : ''}
        ${data.education?.length ? `<div class="cv-section"><div class="cv-section-title">Education</div>${renderEduSection(data, 'executive')}</div>` : ''}
        ${data.projects ? `<div class="cv-section"><div class="cv-section-title">Key Achievements</div><div class="cv-summary">${data.projects}</div></div>` : ''}
      </div>
    </div>
  </div></body></html>`;
}

function downloadCV() {
  const el = document.getElementById('cvPreview');
  if (!el) return;

  const name = (window.cvData?.fullName || 'My-CV').replace(/\s+/g, '-');

  const opt = {
    margin: 0,
    filename: `${name}-CVCraft.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, logging: false },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  const btn = document.querySelector('.preview-toolbar .btn-primary');
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
  btn.disabled = true;

  html2pdf().set(opt).from(el).save().then(() => {
    btn.innerHTML = '<i class="fas fa-download"></i> Download PDF';
    btn.disabled = false;
  });
}
