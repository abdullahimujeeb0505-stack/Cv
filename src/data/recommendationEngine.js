import { TEMPLATES_CATALOG } from './defaultData';

export function determineBestFormat({
  industry = 'tech',
  experienceLevel = 'mid',
  targetRegion = 'us',
  showPhoto = false,
  jobTitle = ''
}) {
  const titleLower = (jobTitle || '').toLowerCase();
  
  let scores = {
    'modern-ats': 70,
    'executive-ivy': 60,
    'creative-studio': 55,
    'minimalist-nordic': 65,
    'tech-terminal': 60,
    'international-europass': 50
  };

  let reasons = [];
  let photoAdvice = '';

  // 1. Evaluate Industry
  if (['tech', 'software', 'engineering', 'devops', 'cybersecurity'].includes(industry) || 
      titleLower.includes('developer') || titleLower.includes('engineer') || titleLower.includes('software')) {
    scores['modern-ats'] += 35;
    scores['tech-terminal'] += 30;
    reasons.push('Technical hiring relies heavily on automated ATS scanners that parse clean, single-column text best.');
  } else if (['finance', 'executive', 'consulting', 'legal', 'accounting', 'banking'].includes(industry) || 
             titleLower.includes('director') || titleLower.includes('vp') || titleLower.includes('chief') || titleLower.includes('partner')) {
    scores['executive-ivy'] += 45;
    scores['modern-ats'] += 15;
    reasons.push('Corporate, finance, and executive boards favor traditional serif typography with strong emphasis on quantifiable metrics and revenue impact.');
  } else if (['creative', 'design', 'marketing', 'media', 'branding', 'fashion'].includes(industry) || 
             titleLower.includes('designer') || titleLower.includes('art') || titleLower.includes('ux') || titleLower.includes('ui') || titleLower.includes('creative')) {
    scores['creative-studio'] += 45;
    reasons.push('Visual, product, and design roles benefit immensely from a curated aesthetic, structured sidebar, and direct portfolio showcase.');
  } else if (['student', 'entry', 'freshman'].includes(industry) || experienceLevel === 'student' || experienceLevel === 'entry') {
    scores['minimalist-nordic'] += 40;
    scores['modern-ats'] += 20;
    reasons.push('Entry-level and academic resumes look most polished when generous modern whitespace balances concise accomplishments.');
  } else if (industry === 'international' || targetRegion === 'eu' || targetRegion === 'asia') {
    scores['international-europass'] += 45;
    reasons.push('International and European employers routinely expect standardized multi-column CVs with language CEFR proficiencies.');
  }

  // 2. Evaluate Experience Level
  if (experienceLevel === 'executive' || experienceLevel === 'senior') {
    scores['executive-ivy'] += 20;
    scores['modern-ats'] += 15;
  } else if (experienceLevel === 'student' || experienceLevel === 'entry') {
    scores['minimalist-nordic'] += 25;
  }

  // 3. Evaluate Target Region & Photo
  if (targetRegion === 'us' || targetRegion === 'ca' || targetRegion === 'uk') {
    scores['modern-ats'] += 20;
    scores['executive-ivy'] += 10;
    photoAdvice = 'In the US, Canada, and UK, omitting your photo is standard best practice to prevent unconscious hiring bias and ensure ATS compliance.';
  } else if (targetRegion === 'eu' || targetRegion === 'asia' || targetRegion === 'latam') {
    scores['international-europass'] += 30;
    scores['creative-studio'] += 15;
    photoAdvice = 'In European and international markets, a professional headshot is customary and helps personalize your application dossier.';
  }

  if (showPhoto) {
    scores['creative-studio'] += 20;
    scores['international-europass'] += 20;
    scores['minimalist-nordic'] += 10;
  }

  // Find top template
  let bestId = 'modern-ats';
  let highestScore = -1;
  for (const [tplId, score] of Object.entries(scores)) {
    if (score > highestScore) {
      highestScore = score;
      bestId = tplId;
    }
  }

  const matchedTemplate = TEMPLATES_CATALOG.find(t => t.id === bestId) || TEMPLATES_CATALOG[0];

  // Secondary alternatives
  const sortedTemplates = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([id]) => TEMPLATES_CATALOG.find(t => t.id === id))
    .filter(Boolean);

  const alternatives = sortedTemplates.filter(t => t.id !== bestId).slice(0, 2);

  // Confidence percentage
  const confidence = Math.min(99, Math.max(82, Math.round((highestScore / 160) * 100)));

  return {
    templateId: bestId,
    template: matchedTemplate,
    confidence,
    reasons: reasons.length > 0 ? reasons : matchedTemplate.bestMatchCriteria.reasons,
    photoAdvice,
    alternatives,
    sectionOrderRecommendation: experienceLevel === 'student' 
      ? ['personal', 'education', 'skills', 'projects', 'experience']
      : ['personal', 'summary', 'experience', 'skills', 'projects', 'education']
  };
}

export function calculateATSScore(resumeData) {
  let score = 0;
  let feedback = [];
  let checks = [];

  // Check 1: Contact info
  const p = resumeData.personal || {};
  let contactPoints = 0;
  if (p.fullName && p.fullName.trim().length > 2) contactPoints += 5;
  if (p.email && p.email.includes('@')) contactPoints += 5;
  if (p.phone && p.phone.trim().length > 5) contactPoints += 5;
  if (p.location && p.location.trim().length > 2) contactPoints += 5;
  if (p.linkedin && p.linkedin.trim().length > 4) contactPoints += 5;

  score += contactPoints;
  checks.push({
    title: 'Complete Contact Details',
    passed: contactPoints >= 20,
    score: `${contactPoints}/25`,
    detail: contactPoints >= 20 ? 'Name, Email, Phone, and Professional Links present.' : 'Add missing contact info (Email, Phone, LinkedIn or Location).'
  });

  // Check 2: Professional Summary
  const summary = (resumeData.summary || '').trim();
  const summaryWords = summary ? summary.split(/\s+/).length : 0;
  let summaryPoints = 0;
  if (summaryWords >= 25 && summaryWords <= 120) {
    summaryPoints = 15;
    checks.push({
      title: 'Strong Professional Summary',
      passed: true,
      score: '15/15',
      detail: `Optimal summary length (${summaryWords} words). Clearly states value proposition.`
    });
  } else if (summaryWords > 0) {
    summaryPoints = 8;
    checks.push({
      title: 'Summary Needs Expansion',
      passed: false,
      score: '8/15',
      detail: `Summary is ${summaryWords} words. Aim for 30–75 words highlighting your key impact.`
    });
  } else {
    checks.push({
      title: 'Missing Summary',
      passed: false,
      score: '0/15',
      detail: 'A strong executive summary immediately anchors recruiter attention.'
    });
  }
  score += summaryPoints;

  // Check 3: Quantifiable Metrics in Experience
  const exp = resumeData.experience || [];
  let totalBullets = 0;
  let metricBullets = 0;
  const actionVerbs = ['led', 'architected', 'spearheaded', 'built', 'reduced', 'increased', 'developed', 'delivered', 'optimized', 'scaled', 'managed', 'created', 'designed', 'automated', 'orchestrated'];
  let actionVerbCount = 0;

  exp.forEach(e => {
    (e.highlights || []).forEach(b => {
      totalBullets++;
      // Check for numbers, %, $, M, K
      if (/\d+%|\$\d+|\d+M|\d+K|\b\d+\b/.test(b)) {
        metricBullets++;
      }
      const lower = b.toLowerCase();
      if (actionVerbs.some(verb => lower.includes(verb))) {
        actionVerbCount++;
      }
    });
  });

  let expPoints = 0;
  if (exp.length >= 1 && totalBullets >= 2) {
    expPoints += 10;
    if (metricBullets >= 2) expPoints += 10;
    if (actionVerbCount >= 2) expPoints += 10;
  }

  score += expPoints;
  checks.push({
    title: 'Experience & Quantifiable Metrics',
    passed: expPoints >= 20,
    score: `${expPoints}/30`,
    detail: metricBullets >= 2
      ? `Found ${metricBullets} quantifiable metric(s) ($/ % / numbers) and strong action verbs.`
      : 'Add quantifiable metrics! E.g. "Increased revenue by 24%", "Cut latency by 45%".'
  });

  // Check 4: Skills Section Density
  const skills = resumeData.skills || [];
  let totalSkills = 0;
  skills.forEach(s => {
    totalSkills += (s.items || []).length;
  });

  let skillsPoints = 0;
  if (totalSkills >= 8) skillsPoints = 15;
  else if (totalSkills >= 4) skillsPoints = 8;

  score += skillsPoints;
  checks.push({
    title: 'Keyword & Skill Optimization',
    passed: totalSkills >= 8,
    score: `${skillsPoints}/15`,
    detail: totalSkills >= 8
      ? `${totalSkills} keyword skills listed across categories. Great for ATS matching.`
      : `Only ${totalSkills} skills listed. Add 8+ relevant technical and industry skills.`
  });

  // Check 5: Education & Credentials
  const edu = resumeData.education || [];
  const certs = resumeData.certifications || [];
  let credPoints = 0;
  if (edu.length > 0) credPoints += 10;
  if (certs.length > 0) credPoints += 5;

  score += credPoints;
  checks.push({
    title: 'Education & Verified Credentials',
    passed: credPoints >= 10,
    score: `${credPoints}/15`,
    detail: edu.length > 0 ? 'Degree and academic institution recorded.' : 'Add your degree, university or relevant certifications.'
  });

  return {
    score: Math.min(100, score),
    checks,
    grade: score >= 85 ? 'Exceptional (A+)' : score >= 70 ? 'Strong (B+)' : 'Needs Improvement (C)',
    readyForApplication: score >= 75
  };
}
