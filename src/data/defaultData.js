export const SAMPLE_PROFILES = {
  tech: {
    id: 'tech',
    name: 'Tech / Software Engineer',
    data: {
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      showPhoto: false, // Tech ATS usually prefers no photo
      photoShape: 'circle',
      personal: {
        fullName: 'Alex Rivera',
        title: 'Senior Full-Stack Engineer & Cloud Architect',
        email: 'alex.rivera@techflow.dev',
        phone: '+1 (555) 382-9012',
        location: 'San Francisco, CA (Open to Remote)',
        linkedin: 'linkedin.com/in/alex-rivera-dev',
        github: 'github.com/alexrivera',
        website: 'alexrivera.io'
      },
      industry: 'tech',
      experienceLevel: 'senior',
      targetRegion: 'us',
      recommendedTemplate: 'modern-ats',
      summary: 'High-impact Full-Stack Software Engineer with 7+ years of experience architecting resilient distributed systems, event-driven microservices, and modern web applications. Proven track record scaling platforms from 50K to 4.2M daily active users while reducing AWS cloud infrastructure costs by 34%. Passionate about developer tooling, API design, and team mentorship.',
      experience: [
        {
          id: 'exp-1',
          title: 'Senior Software Engineer & Tech Lead',
          company: 'CloudScale Technologies',
          location: 'San Francisco, CA',
          startDate: '2022-03',
          endDate: 'Present',
          current: true,
          highlights: [
            'Architected and led migration of monolithic core billing service to Go and AWS Lambda microservices, improving 99th-percentile response latency by 58%.',
            'Spearheaded real-time telemetry pipeline processing over 180M events/day using Apache Kafka and PostgreSQL, reducing incident detection time from 25m to 90s.',
            'Mentored 6 junior/mid-level engineers, instituted automated CI/CD testing gates that elevated test coverage from 62% to 94% across 14 services.'
          ]
        },
        {
          id: 'exp-2',
          title: 'Full-Stack Software Engineer',
          company: 'Nexus Media Lab',
          location: 'Seattle, WA',
          startDate: '2019-06',
          endDate: '2022-02',
          current: false,
          highlights: [
            'Engineered customer-facing collaborative canvas in React, TypeScript, and WebSockets utilized by 650,000+ monthly active enterprise creators.',
            'Optimized Redis caching layer and GraphQL queries, lowering database CPU load by 42% during peak seasonal traffic spikes.',
            'Collaborated with UX and product teams in two-week agile sprints, delivering 18 high-priority roadmap features on schedule.'
          ]
        }
      ],
      education: [
        {
          id: 'edu-1',
          degree: 'B.S. in Computer Science (Honors)',
          school: 'University of Washington',
          location: 'Seattle, WA',
          gradYear: '2019',
          gpa: '3.85 / 4.0',
          details: 'Dean’s Honor List (6 terms), President of ACM Student Chapter, Capstone: Distributed Consensus Engine'
        }
      ],
      skills: [
        { category: 'Languages', items: ['TypeScript', 'JavaScript (ESNext)', 'Go (Golang)', 'Python', 'SQL'] },
        { category: 'Frontend & UI', items: ['React 18', 'Next.js', 'Tailwind CSS', 'Redux Toolkit', 'GraphQL'] },
        { category: 'Backend & Cloud', items: ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'AWS (ECS, Lambda, S3)'] },
        { category: 'DevOps & Practices', items: ['CI/CD (GitHub Actions)', 'Kafka', 'Terraform', 'System Design', 'TDD'] }
      ],
      projects: [
        {
          id: 'proj-1',
          name: 'HyperQueue - Distributed Task Scheduler',
          link: 'github.com/alexrivera/hyperqueue',
          tech: 'Go, Redis, gRPC, Docker',
          description: 'Open-source distributed background job scheduler processing 25,000+ jobs/second with zero-downtime leader election.'
        },
        {
          id: 'proj-2',
          name: 'OmniDash Cloud Monitoring UI',
          link: 'omnidash.dev',
          tech: 'Next.js, TypeScript, WebSockets, Tailwind',
          description: 'Real-time observability dashboard for microservices with interactive flame graphs and anomalous latency alerts.'
        }
      ],
      certifications: [
        { id: 'cert-1', name: 'AWS Certified Solutions Architect – Associate', issuer: 'Amazon Web Services', year: '2023' },
        { id: 'cert-2', name: 'Certified Kubernetes Administrator (CKA)', issuer: 'Linux Foundation', year: '2022' }
      ],
      languages: [
        { language: 'English', proficiency: 'Native / Bilingual' },
        { language: 'Spanish', proficiency: 'Professional Working' }
      ]
    }
  },
  executive: {
    id: 'executive',
    name: 'Executive / Finance & Consulting',
    data: {
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
      showPhoto: false,
      photoShape: 'rounded',
      personal: {
        fullName: 'Victoria Sterling',
        title: 'Vice President of Global Strategy & Operations',
        email: 'v.sterling@meridianadvisory.com',
        phone: '+1 (212) 840-7719',
        location: 'New York, NY',
        linkedin: 'linkedin.com/in/victoria-sterling-exec',
        github: '',
        website: 'victoriasterling.com'
      },
      industry: 'executive',
      experienceLevel: 'executive',
      targetRegion: 'us',
      recommendedTemplate: 'executive-ivy',
      summary: 'Dynamic C-Suite advisor and operational executive with 12+ years directing global corporate transformation, M&A integration, and cross-functional P&L management across North America and EMEA. Orchestrated $140M in cost rationalization while driving 28% YoY revenue acceleration across multinational portfolios. Recognized for building world-class analytical teams and steering executive governance.',
      experience: [
        {
          id: 'exp-1',
          title: 'Vice President of Corporate Strategy',
          company: 'Meridian Capital Partners',
          location: 'New York, NY',
          startDate: '2020-01',
          endDate: 'Present',
          current: true,
          highlights: [
            'Direct a 34-person international strategy division managing portfolio companies generating $850M+ aggregate recurring annual revenue.',
            'Spearheaded $230M strategic acquisition of European B2B logistics tech leader, completing synergy integration 4 months ahead of schedule and capturing $18M in annualized EBITDA expansion.',
            'Restructured go-to-market pricing model across 3 primary business units, unlocking $42M in enterprise contract value within first 18 months.'
          ]
        },
        {
          id: 'exp-2',
          title: 'Senior Engagement Manager',
          company: 'Beacon Strategic Consulting',
          location: 'Boston, MA',
          startDate: '2015-08',
          endDate: '2019-12',
          current: false,
          highlights: [
            'Delivered 14 high-stakes transformation engagements for Fortune 100 industrial and healthcare clients with 100% executive sponsor satisfaction.',
            'Devised digital supply-chain overhaul for $4B retail conglomerate, reducing inventory holding expenditure by 22% ($55M savings).',
            'Recruited, mentored, and sponsored 22 business analysts and associates; co-chaired firm-wide Women in Leadership initiative.'
          ]
        }
      ],
      education: [
        {
          id: 'edu-1',
          degree: 'Master of Business Administration (MBA)',
          school: 'Columbia Business School',
          location: 'New York, NY',
          gradYear: '2015',
          gpa: '',
          details: 'Dean’s Honors, Concentration in Private Equity & Corporate Turnarounds, Beta Gamma Sigma'
        },
        {
          id: 'edu-2',
          degree: 'B.S. in Economics & Financial Accounting',
          school: 'Georgetown University',
          location: 'Washington, DC',
          gradYear: '2011',
          gpa: '3.91 / 4.0',
          details: 'Magna Cum Laude, President of Student Investment Fund'
        }
      ],
      skills: [
        { category: 'Executive Leadership', items: ['P&L Management ($100M+)', 'M&A Due Diligence & Integration', 'Board Governance', 'Executive Stakeholder Relations'] },
        { category: 'Strategic Execution', items: ['Go-to-Market Strategy', 'Supply Chain Optimization', 'Cost Rationalization', 'Organizational Restructuring'] },
        { category: 'Finance & Analytics', items: ['DCF Modeling', 'EBITDA Expansion', 'Capital Allocation', 'Enterprise Risk Management'] }
      ],
      projects: [
        {
          id: 'proj-1',
          name: 'Global Supply Chain Modernization Blueprint',
          link: '',
          tech: 'Enterprise ERP, Executive Governance, Analytics',
          description: 'Framework adopted by 4 Fortune 500 manufacturers yielding collective savings exceeding $110M across 12 countries.'
        }
      ],
      certifications: [
        { id: 'cert-1', name: 'Chartered Financial Analyst (CFA)', issuer: 'CFA Institute', year: '2016' }
      ],
      languages: [
        { language: 'English', proficiency: 'Native' },
        { language: 'French', proficiency: 'Fluent (C1)' }
      ]
    }
  },
  creative: {
    id: 'creative',
    name: 'Creative / Product Designer',
    data: {
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
      showPhoto: true,
      photoShape: 'circle',
      personal: {
        fullName: 'Maya Lin Chen',
        title: 'Lead Product & Brand Designer',
        email: 'maya@chencreative.co',
        phone: '+1 (415) 790-2341',
        location: 'Los Angeles, CA / Remote',
        linkedin: 'linkedin.com/in/mayalinchen',
        github: '',
        website: 'mayalinchen.design'
      },
      industry: 'creative',
      experienceLevel: 'senior',
      targetRegion: 'global',
      recommendedTemplate: 'creative-studio',
      summary: 'Passionate Lead Product & Visual Experience Designer with 6+ years transforming complex user workflows into intuitive, award-winning digital experiences. Specializes in scalable multi-platform design systems, empathetic user research, and emotive visual storytelling. Led redesigns that boosted checkout conversion by 47% for consumer platforms reaching 2M+ users.',
      experience: [
        {
          id: 'exp-1',
          title: 'Lead Product Designer',
          company: 'Aura Lifestyle & FinTech',
          location: 'San Francisco, CA',
          startDate: '2021-09',
          endDate: 'Present',
          current: true,
          highlights: [
            'Spearheaded end-to-end design of flagship mobile banking app (iOS & Android) with a 4.9 App Store rating across 70,000+ reviews.',
            'Constructed and governed “Prism Design System” with 240+ accessible Figma components, slashing designer-to-developer handoff time by 40%.',
            'Conducted 45+ qualitative customer discovery interviews, translating insights into an onboarding flow that increased Day-7 user retention by 26%.'
          ]
        },
        {
          id: 'exp-2',
          title: 'Senior Brand & UI Designer',
          company: 'Studio Pixel & Craft',
          location: 'Los Angeles, CA',
          startDate: '2018-04',
          endDate: '2021-08',
          current: false,
          highlights: [
            'Delivered brand identities and responsive web apps for 16 high-growth startups, earning 2 Awwwards Site of the Day honors.',
            'Collaborated with frontend engineers to build micro-interactions using Framer Motion and Lottie, driving engagement up by 33%.'
          ]
        }
      ],
      education: [
        {
          id: 'edu-1',
          degree: 'B.F.A. in Interaction Design & Digital Media',
          school: 'ArtCenter College of Design',
          location: 'Pasadena, CA',
          gradYear: '2018',
          gpa: '3.9 / 4.0',
          details: 'Graduated with Highest Distinction; Outstanding Senior Portfolio Award'
        }
      ],
      skills: [
        { category: 'Design Craft', items: ['Design Systems', 'Mobile App Design (iOS/Android)', 'Prototyping', 'User Research', 'Design Thinking'] },
        { category: 'Software & Tools', items: ['Figma', 'Framer', 'Adobe Creative Cloud', 'Lottie', 'Webflow', 'Principle'] },
        { category: 'Collaboration', items: ['Agile Sprints', 'Design Mentorship', 'User Testing', 'Accessibility (WCAG 2.1 AA)'] }
      ],
      projects: [
        {
          id: 'proj-1',
          name: 'Prism Multi-Brand Design System',
          link: 'prism.chencreative.co',
          tech: 'Figma Tokens, Storybook, Zeroheight',
          description: 'A comprehensive, WCAG AA compliant multi-brand UI system powering 8 enterprise web and mobile applications.'
        },
        {
          id: 'proj-2',
          name: 'Bloom Mental Wellness iOS App',
          link: 'bloom-app.design',
          tech: 'Figma, Swift UI Prototypes, Brand Identity',
          description: 'Holistic wellness tracking app designed with soothing kinetic typography and personalized daily reflection prompts.'
        }
      ],
      certifications: [
        { id: 'cert-1', name: 'NN/g UX Master Certified', issuer: 'Nielsen Norman Group', year: '2021' }
      ],
      languages: [
        { language: 'English', proficiency: 'Native' },
        { language: 'Mandarin Chinese', proficiency: 'Bilingual' }
      ]
    }
  },
  student: {
    id: 'student',
    name: 'Student / Early Career / Switcher',
    data: {
      photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80',
      showPhoto: false,
      photoShape: 'circle',
      personal: {
        fullName: 'Jordan Taylor',
        title: 'Junior Data Analyst & Business Intelligence Specialist',
        email: 'jordan.taylor@alumni.edu',
        phone: '+1 (312) 555-0149',
        location: 'Chicago, IL',
        linkedin: 'linkedin.com/in/jordantaylor-analytics',
        github: 'github.com/jordantaylor',
        website: 'jordantaylor.me'
      },
      industry: 'student',
      experienceLevel: 'student',
      targetRegion: 'us',
      recommendedTemplate: 'minimalist-nordic',
      summary: 'Motivated Data Analyst with a rigorous foundation in quantitative statistical analysis, Python data modeling, and Tableau visualization. Passionate about uncovering actionable commercial insights from unstructured datasets to optimize marketing spend and operational efficiency. Winner of the 2024 University Midwest Hackathon for predictive healthcare modeling.',
      experience: [
        {
          id: 'exp-1',
          title: 'Business Analytics Intern',
          company: 'Civic Data Solutions',
          location: 'Chicago, IL',
          startDate: '2023-06',
          endDate: '2023-12',
          current: false,
          highlights: [
            'Built automated SQL pipelines that aggregated daily sales figures across 120 retail store locations, saving 6 hours of weekly manual reporting.',
            'Created executive Tableau dashboard monitoring customer acquisition cost (CAC) and lifetime value (LTV) across 8 promotional channels.',
            'Identified $35K in redundant software subscription fees through systematic vendor expense clustering.'
          ]
        }
      ],
      education: [
        {
          id: 'edu-1',
          degree: 'B.S. in Statistics & Data Analytics',
          school: 'University of Illinois Urbana-Champaign',
          location: 'Champaign, IL',
          gradYear: '2024',
          gpa: '3.78 / 4.0',
          details: 'Relevant Coursework: Applied Regression, Machine Learning, Database Systems, Business Econometrics, Operations Research'
        }
      ],
      skills: [
        { category: 'Data & Analytics', items: ['Python (Pandas, NumPy, Scikit-learn)', 'SQL (PostgreSQL, BigQuery)', 'Tableau', 'Power BI', 'Excel (VBA, PowerQuery)'] },
        { category: 'Techniques', items: ['Exploratory Data Analysis', 'A/B Testing', 'Hypothesis Testing', 'Predictive Modeling', 'ETL Pipelines'] },
        { category: 'Professional', items: ['Data Storytelling', 'Technical Documentation', 'Cross-functional Collaboration'] }
      ],
      projects: [
        {
          id: 'proj-1',
          name: 'E-Commerce Customer Churn Prediction Engine',
          link: 'github.com/jordantaylor/churn-predictor',
          tech: 'Python, Random Forest, Flask, Streamlit',
          description: 'Trained machine learning classification model on 85,000 user events achieving 89% precision in flagging churn risks 14 days in advance.'
        },
        {
          id: 'proj-2',
          name: 'Urban Transit Delay Real-Time Visualizer',
          link: 'github.com/jordantaylor/transit-flow',
          tech: 'PostgreSQL, Python, Mapbox API, Tableau',
          description: 'Parsed open municipal transit GTFS feeds to highlight bottleneck intersections with live interactive congestion heatmaps.'
        }
      ],
      certifications: [
        { id: 'cert-1', name: 'Google Data Analytics Professional Certificate', issuer: 'Coursera / Google', year: '2023' }
      ],
      languages: [
        { language: 'English', proficiency: 'Native' },
        { language: 'German', proficiency: 'Intermediate (B1)' }
      ]
    }
  },
  europass: {
    id: 'europass',
    name: 'International / Europass CV',
    data: {
      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
      showPhoto: true,
      photoShape: 'circle',
      personal: {
        fullName: 'Elena Dumitru',
        title: 'International Project & Supply Chain Manager',
        email: 'elena.dumitru@globalventures.eu',
        phone: '+49 176 8923 4410',
        location: 'Berlin, Germany (EU Citizen)',
        linkedin: 'linkedin.com/in/elena-dumitru-pm',
        github: '',
        website: 'elenadumitru.eu'
      },
      industry: 'international',
      experienceLevel: 'senior',
      targetRegion: 'eu',
      recommendedTemplate: 'international-europass',
      summary: 'Trilingual International Project Manager with 8 years of cross-border supply chain and operations experience across Germany, France, and Eastern Europe. Adept at navigating multi-cultural regulatory environments, European procurement directives, and Lean Six Sigma process improvements. Successfully spearheaded a €14M warehouse automation transition.',
      experience: [
        {
          id: 'exp-1',
          title: 'Senior European Supply Chain Coordinator',
          company: 'EuroLogistics GmbH',
          location: 'Frankfurt & Berlin, Germany',
          startDate: '2021-02',
          endDate: 'Present',
          current: true,
          highlights: [
            'Oversee cross-border freight network spanning 7 fulfillment hubs across Central & Western Europe managing €48M annual distribution budget.',
            'Negotiated pan-European carrier contracts cutting freight expenditure by 14% while preserving 99.2% on-time delivery SLA.',
            'Implemented automated carbon emission tracking compliance in accordance with EU Green Deal corporate guidelines.'
          ]
        },
        {
          id: 'exp-2',
          title: 'Operations & Procurement Specialist',
          company: 'Alliance Commerciale S.A.',
          location: 'Lyon, France',
          startDate: '2017-09',
          endDate: '2021-01',
          current: false,
          highlights: [
            'Directed sourcing operations across 45 verified suppliers in accordance with ISO 9001 and ISO 14001 international standards.',
            'Reduced supply delivery cycle times by 19 days through vendor Scorecard performance management.'
          ]
        }
      ],
      education: [
        {
          id: 'edu-1',
          degree: 'M.Sc. in International Business & Operations',
          school: 'ESCP Business School',
          location: 'Paris, France',
          gradYear: '2017',
          gpa: 'First Class Honours',
          details: 'Erasmus Scholar, Specialization in Global Trade Law and Sustainable Sourcing'
        }
      ],
      skills: [
        { category: 'Management', items: ['Cross-Border Logistics', 'Vendor Procurement', 'Lean Six Sigma', 'Contract Negotiation', 'Budget Governance (€50M+)'] },
        { category: 'Tools & ERP', items: ['SAP S/4HANA', 'Oracle NetSuite', 'Microsoft Power BI', 'Jira / Confluence'] }
      ],
      projects: [
        {
          id: 'proj-1',
          name: 'Pan-European Automated Fulfillment Center',
          link: '',
          tech: 'Warehouse Management Systems (WMS), Robotics, Lean',
          description: 'Spearheaded commissioning of €14M robotic sorting hub in Leipzig reducing order fulfillment turnaround by 50%.'
        }
      ],
      certifications: [
        { id: 'cert-1', name: 'Project Management Professional (PMP)', issuer: 'Project Management Institute', year: '2020' },
        { id: 'cert-2', name: 'Lean Six Sigma Green Belt', issuer: 'TÜV Rheinland', year: '2019' }
      ],
      languages: [
        { language: 'German', proficiency: 'Proficient / C1' },
        { language: 'English', proficiency: 'Bilingual / C2' },
        { language: 'French', proficiency: 'Fluent / B2' },
        { language: 'Romanian', proficiency: 'Native' }
      ]
    }
  }
};

export const TEMPLATES_CATALOG = [
  {
    id: 'modern-ats',
    name: 'Modern ATS Pro',
    tagline: 'Clean, Single-Column, 100% Robot & Recruiter Tested',
    recommendedFor: 'Tech, Software Engineering, IT, Finance, Corporate Roles',
    accentColor: '#2563eb',
    previewType: 'single-column',
    bestMatchCriteria: {
      industries: ['tech', 'engineering', 'finance', 'healthcare'],
      regions: ['us', 'ca', 'uk'],
      reasons: [
        'Single-column structure guarantees zero parsing errors on ATS software (Workday, Greenhouse, Taleo).',
        'Clean hierarchy allows recruiter scanning in under 6 seconds.',
        'No distracting graphics, high data density for technical projects and metrics.'
      ]
    }
  },
  {
    id: 'executive-ivy',
    name: 'Executive Ivy / Wall Street',
    tagline: 'Authoritative, Classic Serif, Harvard & Law Standard',
    recommendedFor: 'Executive, Directors, VP, Finance, Legal, Consulting, Strategy',
    accentColor: '#1e293b',
    previewType: 'ivy-serif',
    bestMatchCriteria: {
      industries: ['executive', 'finance', 'consulting', 'legal', 'operations'],
      levels: ['senior', 'executive'],
      reasons: [
        'Timeless serif typography exudes executive gravitas and board-level credibility.',
        'Emphasizes quantitative impact, P&L ownership, and strategic leadership.',
        'Standard among Fortune 500 leadership, Wall Street investment banking, and premier consulting firms.'
      ]
    }
  },
  {
    id: 'creative-studio',
    name: 'Creative Studio & Dynamic',
    tagline: 'Modern Asymmetrical 2-Column with Visual Balance',
    recommendedFor: 'UI/UX, Product Design, Marketing, Branding, Creative Directors',
    accentColor: '#7c3aed',
    previewType: 'two-column-sidebar',
    bestMatchCriteria: {
      industries: ['creative', 'design', 'marketing', 'media', 'product'],
      reasons: [
        'Distinctive left sidebar highlights design aesthetic, portfolio links, and visual competencies.',
        'Allows profile photo to humanize your creative personal brand.',
        'Balanced white space demonstrates an innate eye for typography and layout composition.'
      ]
    }
  },
  {
    id: 'minimalist-nordic',
    name: 'Minimalist Nordic',
    tagline: 'Refined Whitespace, Modern Clean Lines & Focus',
    recommendedFor: 'Early Career, Students, Career Switchers, Generalist Roles',
    accentColor: '#059669',
    previewType: 'minimal',
    bestMatchCriteria: {
      industries: ['student', 'general', 'nonprofit', 'education'],
      levels: ['student', 'entry'],
      reasons: [
        'Generous spacing makes early-career resumes look substantial and intentional rather than sparse.',
        'Highlights education, relevant projects, and technical skills with sleek modern aesthetics.',
        'Extremely versatile across varied industries without feeling rigid.'
      ]
    }
  },
  {
    id: 'tech-terminal',
    name: 'Tech Terminal / Silicon',
    tagline: 'Monospace Accents, Code-Inspired, Project-Forward',
    recommendedFor: 'DevOps, Backend Engineers, Cybersecurity, Data Scientists, Web3',
    accentColor: '#0284c7',
    previewType: 'terminal',
    bestMatchCriteria: {
      industries: ['tech', 'cybersecurity', 'devops', 'data'],
      reasons: [
        'Subtle monospace headers and tech chips appeal directly to engineering hiring managers.',
        'Project and open-source contribution sections take center stage.',
        'Compact layout packs deep technical stacks, certifications, and architectures.'
      ]
    }
  },
  {
    id: 'international-europass',
    name: 'International Europass / Compact',
    tagline: 'Structured 2-Column, Photo-Friendly, Multi-Lingual CEFR',
    recommendedFor: 'European Union, International Expat, Global Supply Chain, Multilingual',
    accentColor: '#0d9488',
    previewType: 'europass',
    bestMatchCriteria: {
      regions: ['eu', 'asia', 'latam', 'global'],
      industries: ['international', 'logistics', 'hospitality', 'academia'],
      reasons: [
        'Complies with European and global recruiting conventions where professional headshots and languages are standard.',
        'Includes dedicated CEFR language proficiency ratings (Native, C1, B2).',
        'Structured two-column division provides clear compartmentalization of global credentials.'
      ]
    }
  }
];

export const COLOR_THEMES = [
  { id: 'slate', name: 'Executive Slate', primary: '#1e293b', secondary: '#475569', text: '#0f172a', bgLight: '#f8fafc', border: '#cbd5e1' },
  { id: 'blue', name: 'Corporate Cobalt', primary: '#2563eb', secondary: '#1d4ed8', text: '#0f172a', bgLight: '#eff6ff', border: '#bfdbfe' },
  { id: 'emerald', name: 'Forest Emerald', primary: '#059669', secondary: '#047857', text: '#064e3b', bgLight: '#ecfdf5', border: '#a7f3d0' },
  { id: 'indigo', name: 'Royal Indigo', primary: '#4f46e5', secondary: '#4338ca', text: '#1e1b4b', bgLight: '#eef2ff', border: '#c7d2fe' },
  { id: 'purple', name: 'Creative Purple', primary: '#7c3aed', secondary: '#6d28d9', text: '#2e1065', bgLight: '#f5f3ff', border: '#ddd6fe' },
  { id: 'teal', name: 'Nordic Teal', primary: '#0d9488', secondary: '#0f766e', text: '#134e4a', bgLight: '#f0fdfa', border: '#99f6e4' },
  { id: 'crimson', name: 'Harvard Crimson', primary: '#991b1b', secondary: '#7f1d1d', text: '#450a0a', bgLight: '#fef2f2', border: '#fecaca' },
  { id: 'charcoal', name: 'Monochrome Jet', primary: '#18181b', secondary: '#27272a', text: '#09090b', bgLight: '#fafafa', border: '#e4e4e7' }
];

export const FONT_OPTIONS = [
  { id: 'sans', name: 'Modern Sans (Inter)', fontFamily: "'Inter', sans-serif" },
  { id: 'serif', name: 'Executive Serif (Merriweather)', fontFamily: "'Merriweather', serif" },
  { id: 'garamond', name: 'Classic Garamond', fontFamily: "'Cormorant Garamond', serif" },
  { id: 'display', name: 'Friendly Display (Poppins)', fontFamily: "'Poppins', sans-serif" },
  { id: 'mono', name: 'Tech Code (JetBrains)', fontFamily: "'JetBrains Mono', monospace" }
];
