export const personalInfo = {
  name: "Satyam Singh",
  role: "Android Developer",
  subline: "Building AI-assisted productivity tools with Kotlin & Jetpack Compose.",
  location: "Kolkata, India",
  email: "satyamsingh92637@gmail.com",
  phone: "+91 8580160331",
  github: "https://github.com/satyamsingh-2s",
  linkedin: "#",
  resumeUrl: "#",
};

export const omegaProject = {
  title: "Omega",
  subtitle: "AI-Assisted Productivity & Planning Platform",
  status: "Ongoing",
  stack: [
    "Kotlin",
    "Java",
    "Jetpack Compose",
    "MVVM",
    "StateFlow",
    "Room",
    "Google Gemini API",
  ],
  description:
    "A modular Android productivity platform built from scratch — state-driven Compose UI, a layered ViewModel/Repository/Room architecture, and recursive tree rendering for nested project workspaces. Integrates Google Gemini API for AI-assisted features, with handling for requests, rate limits, and error cases.",
  stats: [
    { value: 13, suffix: "+", label: "Screens" },
    { value: 5, suffix: "", label: "Core Workflows" },
    { value: 1, suffix: "", label: "AI Integration" },
  ],
  link: "#",
};

export const otherProjects = [
  {
    title: "Screesher",
    domain: "Android",
    shortDescription:
      "Screenshot organization within Android's modern storage model.",
    expandedDescription:
      "An event-driven screenshot organizer built around Android's modern storage constraints.",
    stack: "Kotlin · Jetpack Compose · MediaStore · FileObserver",
    link: "#",
  },
  {
    title: "Secura",
    domain: "Android",
    shortDescription: "Exploring application security and system permissions.",
    expandedDescription:
      "An Android app-locking project exploring system permissions, usage access, and background execution.",
    stack: "Java · Android Services · UsageStatsManager",
    link: "#",
  },
  {
    title: "Macer",
    domain: "Systems",
    shortDescription: "Input automation through low-level system hooks.",
    expandedDescription:
      "A lightweight Windows automation utility built around mouse hooks, gesture recognition, and event-driven input.",
    stack: "C++ · Win32 API · Windows Hooks",
    link: "#",
  },
  {
    title: "Portfolio Website",
    domain: "Web",
    shortDescription: "Designing and building my digital presence.",
    expandedDescription:
      "A full-stack portfolio combining frontend development, backend architecture, and deliberate design decisions.",
    stack: "Next.js · React · Prisma · PostgreSQL",
    link: "#",
  },
  {
    title: "AI Financial Assistant",
    domain: "AI / Backend",
    shortDescription: "Financial analysis and AI-assisted queries.",
    expandedDescription:
      "A financial-query system combining backend APIs, data analysis, and AI-assisted retrieval workflows.",
    stack: "Python · FastAPI · Pandas · RAG",
    link: "#",
  },
];

export const skillCategories = [
  {
    name: "Android",
    skills: [
      "Kotlin",
      "Jetpack Compose",
      "Android SDK",
      "MVVM",
      "ViewModel",
      "StateFlow",
      "Navigation",
      "Room",
      "SQLite",
      "SharedPreferences",
      "MediaStore",
      "Storage Access Framework",
      "DocumentFile",
    ],
  },
  {
    name: "Web",
    skills: ["Next.js", "React", "Prisma ORM", "PostgreSQL"],
  },
  {
    name: "Systems",
    skills: ["C++", "Win32 API"],
  },
  {
    name: "AI & APIs",
    skills: ["Google Gemini API", "REST API integration"],
  },
  {
    name: "Core CS",
    skills: ["Data Structures & Algorithms", "OOP", "SQL", "System Design Basics", "Debugging"],
  },
  {
    name: "Languages",
    skills: ["Kotlin", "Java", "C++", "Python", "JavaScript", "TypeScript"],
  },
  {
    name: "Tools",
    skills: ["Git/GitHub", "Android Studio", "VS Code", "Logcat", "App Inspection"],
  },
];

export const designUXContent = {
  eyebrow: "Design / UX Sensibility",
  header: "Designing the experience, not just the interface",
  supporting: "Three design decisions / select to deconstruct",
  intro:
    "Design isn't a separate phase for me — it's part of how I think through a product. Before implementing a screen, I consider what someone needs to see first, how much information should be visible at once, how users move through the product, and how visual decisions can make complex features easier to understand.",
  caseStudies: [
    {
      id: "identity",
      title: "One Identity, Multiple Layers",
      titleLines: ["One Identity,", "Multiple Layers"],
      summary: "A clear primary identity without hiding the range behind it.",
      color: "#E8590C",
      colorSoft: "#FFB27A",
      palette: ["#E8590C", "#F59F00", "#E03131", "#F06595"],
      problem:
        "Android work, web and Windows projects, DSA, leadership and athletics all competing for equal attention.",
      thinking:
        "What should someone understand about me in the first few seconds?",
      decision:
        "Make Android development the primary visual and professional anchor, with everything else layered around it as support.",
      result:
        "The portfolio reads with one clear identity while still showing genuine technical range.",
      layers: [
        { label: "Core CS / DSA", color: "#F59F00" },
        { label: "Web Development", color: "#E03131" },
        { label: "Systems & Windows", color: "#FD7E14" },
        { label: "Leadership Experience", color: "#F06595" },
      ],
      center: { label: "Android", sub: "Primary Identity", color: "#E8590C" },
    },
    {
      id: "nested",
      title: "Navigating Nested Projects in Omega",
      titleLines: ["Navigating", "Nested Projects", "in Omega"],
      summary: "Depth should increase without orientation disappearing.",
      color: "#1C7ED6",
      colorSoft: "#74C0FC",
      palette: ["#1C7ED6", "#22B8CF", "#7048E8", "#4C6EF5"],
      problem:
        "Omega nests projects inside projects. Moving deeper removed the user's sense of where they were.",
      thinking:
        "Users need the current level and the path above it visible at the same time.",
      decision:
        "Keep parent context permanently visible with a breadcrumb trail above the task list, plus an active-node cue in the hierarchy.",
      result:
        "People can move deep into nested work without losing the bigger picture or relying on the back button.",
      tree: {
        root: { label: "Project", color: "#1C7ED6" },
        branches: [
          {
            label: "Sub Project A",
            color: "#7048E8",
            children: ["Task", "Task"],
            active: true,
          },
          {
            label: "Sub Project B",
            color: "#22B8CF",
            children: ["Task", "Task"],
            active: false,
          },
        ],
        breadcrumb: ["Project", "Sub Project A", "Task"],
      },
    },
    {
      id: "mark",
      title: "Three Modes, One Mark",
      titleLines: ["Three Modes.", "One Mark."],
      summary: "Three ways of working, expressed through one symbol.",
      color: "#7048E8",
      colorSoft: "#B197FC",
      palette: ["#7048E8", "#1C7ED6", "#E64980", "#22B8CF"],
      problem:
        "Omega has three core modes — Planned Work, Unplanned Work and Daily Record — and needed one icon, not three symbols.",
      thinking:
        "How can three distinct behaviours be represented without breaking a single recognizable mark?",
      decision:
        "Split one mark into three visually distinct zones: a purple half, a blue half and a circular centre cutout.",
      result:
        "The modes stay conceptually separate while contributing to one coherent visual identity.",
      zones: [
        { label: "Planned Work", code: "ZONE_01", color: "#7048E8", shape: "half-left" },
        { label: "Unplanned Work", code: "ZONE_02", color: "#1C7ED6", shape: "pie" },
        { label: "Daily Record", code: "ZONE_03", color: "#E64980", shape: "ring" },
      ],
    },
  ],
};


export const education = {
  degree: "B.Tech, Electrical Engineering",
  school: "Heritage Institute of Technology, Kolkata",
  period: "2023–2027",
  cgpa: "8.41",
  coursework: "Data Structures & Algorithms, Operating Systems, DBMS, Object-Oriented Programming",
  seniorSecondary: "Motilal Nehru Public School (ICSE)",
  secondary: "Ramakrishna Mission School (ICSE)",
};

export const leadership = {
  primary: {
    role: "Finance Head & Operations Lead",
    org: "Dakshh (Technical Fest)",
    school: "Heritage Institute of Technology",
    description: [
      "Led end-to-end operations for Dakshh — the college's technical fest's first edition in 9 years — taking ownership of reviving it from scratch.",
      "Owned budget and financial coordination pre-event; ran live operations and on-ground execution on event day.",
      "Coordinated a cross-functional volunteer team across logistics, vendor management, budgeting, and execution over multiple event days.",
    ],
    stats: [
      { value: 10, suffix: "–12L", label: "Budget Managed" },
      { value: 120, suffix: "", label: "Member Team" },
      { value: 9, suffix: " yrs", label: "First Edition In" },
    ],
  },
  secondary: {
    role: "Operations Head",
    org: "Lakshaya (Sports Fest)",
    school: "Heritage Institute of Technology",
    description: [
      "Headed operations for the institute's annual sports fest — scheduling, resource allocation, and coordination across multiple sporting events.",
      "Led a team of volunteers and coordinators handling on-ground execution, participant experience, and last-minute problem-solving.",
    ],
    stats: [{ value: 200, suffix: "–300", label: "Participants" }],
  },
  footnote: {
    event: "Prothoma 2025",
    note: "Organized Prothoma 2025, a pre–Durga Puja college event.",
  },
  internship: {
    role: "Industrial Intern",
    org: "Tata Steel Limited, Jamshedpur",
    period: "June 2026",
    note: "3-week training program in Electrical T&D and Power Systems; authored a technical report covering drive architecture, protection systems, and IEC/ISO compliance.",
  },
};

export const athletics = {
  title: "100m & 200m Sprinter",
  achievements: [
    "Gold medalist, East Singhbhum District (2019) — 100m & 200m",
    "Represented at state-level competitions in both events",
    "Consecutive winner in 100m & 200m across all academic years",
  ],
};
