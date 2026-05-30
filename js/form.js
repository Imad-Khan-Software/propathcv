// ── CV Form Logic ──

let expCount = 0;
let eduCount = 0;

function goStep(stepNum) {
  // Validate step 1 before proceeding
  if (stepNum > 1) {
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const jobTitle = document.getElementById('jobTitle').value.trim();
    const summary = document.getElementById('summary').value.trim();

    if (stepNum === 2) {
      if (!firstName || !lastName || !email || !phone || !jobTitle || !summary) {
        alert('Please fill in all required fields in Personal Information.');
        return;
      }
    }
  }

  document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
  document.getElementById('step' + stepNum).classList.add('active');

  document.querySelectorAll('.progress-step').forEach(s => {
    const n = parseInt(s.dataset.step);
    s.classList.remove('active', 'completed');
    if (n === stepNum) s.classList.add('active');
    if (n < stepNum) s.classList.add('completed');
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function addExperience() {
  expCount++;
  const container = document.getElementById('experienceContainer');
  const div = document.createElement('div');
  div.className = 'exp-entry';
  div.id = 'exp-' + expCount;
  div.innerHTML = `
    <div class="entry-header">
      <span class="entry-title"><i class="fas fa-briefcase"></i> Experience #${expCount}</span>
      <button type="button" class="btn-remove" onclick="removeEntry('exp-${expCount}')">
        <i class="fas fa-trash"></i> Remove
      </button>
    </div>
    <div class="form-grid-2">
      <div class="cv-field">
        <label>Job Title *</label>
        <input type="text" name="expTitle" placeholder="e.g. Software Engineer" />
      </div>
      <div class="cv-field">
        <label>Company *</label>
        <input type="text" name="expCompany" placeholder="e.g. Google Inc." />
      </div>
    </div>
    <div class="form-grid-2">
      <div class="cv-field">
        <label>Start Date</label>
        <input type="text" name="expStart" placeholder="e.g. Jan 2021" />
      </div>
      <div class="cv-field">
        <label>End Date</label>
        <input type="text" name="expEnd" placeholder="e.g. Dec 2023 or Present" />
      </div>
    </div>
    <div class="cv-field">
      <label>Description / Responsibilities</label>
      <textarea name="expDesc" rows="3" placeholder="Describe your key responsibilities and achievements..."></textarea>
    </div>
  `;
  container.appendChild(div);
}

function addEducation() {
  eduCount++;
  const container = document.getElementById('educationContainer');
  const div = document.createElement('div');
  div.className = 'edu-entry';
  div.id = 'edu-' + eduCount;
  div.innerHTML = `
    <div class="entry-header">
      <span class="entry-title"><i class="fas fa-graduation-cap"></i> Education #${eduCount}</span>
      <button type="button" class="btn-remove" onclick="removeEntry('edu-${eduCount}')">
        <i class="fas fa-trash"></i> Remove
      </button>
    </div>
    <div class="form-grid-2">
      <div class="cv-field">
        <label>Degree / Qualification</label>
        <input type="text" name="eduDegree" placeholder="e.g. BSc Computer Science" />
      </div>
      <div class="cv-field">
        <label>Institution</label>
        <input type="text" name="eduSchool" placeholder="e.g. MIT" />
      </div>
    </div>
    <div class="form-grid-2">
      <div class="cv-field">
        <label>Start Year</label>
        <input type="text" name="eduStart" placeholder="e.g. 2018" />
      </div>
      <div class="cv-field">
        <label>End Year</label>
        <input type="text" name="eduEnd" placeholder="e.g. 2022 or Expected 2025" />
      </div>
    </div>
    <div class="cv-field">
      <label>Notes / Grade</label>
      <input type="text" name="eduNote" placeholder="e.g. First Class Honours, GPA 3.9" />
    </div>
  `;
  container.appendChild(div);
}

function removeEntry(id) {
  document.getElementById(id)?.remove();
}

function collectCVData() {
  const data = {};

  // Personal
  data.firstName = document.getElementById('firstName').value.trim();
  data.lastName = document.getElementById('lastName').value.trim();
  data.fullName = `${data.firstName} ${data.lastName}`;
  data.jobTitle = document.getElementById('jobTitle').value.trim();
  data.email = document.getElementById('email').value.trim();
  data.phone = document.getElementById('phone').value.trim();
  data.location = document.getElementById('location').value.trim();
  data.website = document.getElementById('website').value.trim();
  data.summary = document.getElementById('summary').value.trim();

  // Experience
  data.experience = [];
  document.querySelectorAll('.exp-entry').forEach(entry => {
    data.experience.push({
      title: entry.querySelector('[name="expTitle"]')?.value.trim() || '',
      company: entry.querySelector('[name="expCompany"]')?.value.trim() || '',
      start: entry.querySelector('[name="expStart"]')?.value.trim() || '',
      end: entry.querySelector('[name="expEnd"]')?.value.trim() || '',
      desc: entry.querySelector('[name="expDesc"]')?.value.trim() || '',
    });
  });

  // Education
  data.education = [];
  document.querySelectorAll('.edu-entry').forEach(entry => {
    data.education.push({
      degree: entry.querySelector('[name="eduDegree"]')?.value.trim() || '',
      school: entry.querySelector('[name="eduSchool"]')?.value.trim() || '',
      start: entry.querySelector('[name="eduStart"]')?.value.trim() || '',
      end: entry.querySelector('[name="eduEnd"]')?.value.trim() || '',
      note: entry.querySelector('[name="eduNote"]')?.value.trim() || '',
    });
  });

  // Skills & more
  data.skills = (document.getElementById('skills').value || '')
    .split(',').map(s => s.trim()).filter(Boolean);
  data.languages = (document.getElementById('languages').value || '')
    .split(',').map(s => s.trim()).filter(Boolean);
  data.certifications = document.getElementById('certifications').value.trim();
  data.projects = document.getElementById('projects').value.trim();
  data.hobbies = document.getElementById('hobbies').value.trim();

  return data;
}

function saveAndChooseTemplate() {
  const data = collectCVData();
  if (!data.firstName || !data.lastName || !data.email) {
    alert('Please fill in at least your name and email before building your CV.');
    goStep(1);
    return;
  }
  // Save to localStorage
  const session = getSession();
  if (session) {
    localStorage.setItem('cvcraft_data_' + session.email, JSON.stringify(data));
  }
  window.cvData = data;
  showPage('templates');
}

function loadSavedData() {
  const session = getSession();
  if (!session) return;
  const saved = localStorage.getItem('cvcraft_data_' + session.email);
  if (!saved) return;
  const data = JSON.parse(saved);

  // Populate personal
  document.getElementById('firstName').value = data.firstName || '';
  document.getElementById('lastName').value = data.lastName || '';
  document.getElementById('jobTitle').value = data.jobTitle || '';
  document.getElementById('email').value = data.email || '';
  document.getElementById('phone').value = data.phone || '';
  document.getElementById('location').value = data.location || '';
  document.getElementById('website').value = data.website || '';
  document.getElementById('summary').value = data.summary || '';

  // Experience
  (data.experience || []).forEach(exp => {
    addExperience();
    const entries = document.querySelectorAll('.exp-entry');
    const last = entries[entries.length - 1];
    last.querySelector('[name="expTitle"]').value = exp.title;
    last.querySelector('[name="expCompany"]').value = exp.company;
    last.querySelector('[name="expStart"]').value = exp.start;
    last.querySelector('[name="expEnd"]').value = exp.end;
    last.querySelector('[name="expDesc"]').value = exp.desc;
  });

  // Education
  (data.education || []).forEach(edu => {
    addEducation();
    const entries = document.querySelectorAll('.edu-entry');
    const last = entries[entries.length - 1];
    last.querySelector('[name="eduDegree"]').value = edu.degree;
    last.querySelector('[name="eduSchool"]').value = edu.school;
    last.querySelector('[name="eduStart"]').value = edu.start;
    last.querySelector('[name="eduEnd"]').value = edu.end;
    last.querySelector('[name="eduNote"]').value = edu.note;
  });

  document.getElementById('skills').value = (data.skills || []).join(', ');
  document.getElementById('languages').value = (data.languages || []).join(', ');
  document.getElementById('certifications').value = data.certifications || '';
  document.getElementById('projects').value = data.projects || '';
  document.getElementById('hobbies').value = data.hobbies || '';

  window.cvData = data;
}
