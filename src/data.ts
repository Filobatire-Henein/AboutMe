// All site content lives here. Everything from the original site (now in /legacy)
// is preserved, merged with the 2025 resume.

const base = import.meta.env.BASE_URL;
export const asset = (p: string) => `${base}${p}`;

export const profile = {
  name: "Filobatire Henein",
  firstName: "Filobatire",
  role: "Software Engineer",
  tagline: "I'm a passionate Software Developer from Seattle, WA",
  location: "Everett, WA · Seattle area",
  emails: ["heneinfilobatire@gmail.com", "Filobatire1@hotmail.com"],
  phone: "+1 206-556-7759",
  phoneHref: "tel:+12065567759",
  github: "https://github.com/Filobatire-Henein",
  linkedin: "https://www.linkedin.com/in/filobatire-henein-693143217",
  resume: asset("Filobatire_Henein_Resume.pdf"),
  summary:
    "Full-stack software engineer with experience designing, building, and supporting production systems across the stack — from backend services and APIs to user-facing interfaces. Skilled in system design, performance optimization, debugging, and collaborating cross-functionally to ship reliable, maintainable software.",
  intro:
    "Hello, my name is Filobatire Henein and welcome to my website! I am a productive, problem solver, and creative Computer Science and Software Engineering graduate.",
  profileText:
    "Over the past few years, I have pursued many opportunities related to computer science. I gained experience from internships in many organizations by leading the communication, strategy, and creative ideas on the project. My first collaborative project was to create a website. I had the chance to work with others and learn different coding languages. My dream is to become a lead developer and to lead my team and the company to reach new heights of success.",
  hobbies: ["Movies", "Building Unity games", "Reading", "Coding"],
};

export const navLinks = [
  { id: "about", title: "About" },
  { id: "experience", title: "Experience" },
  { id: "skills", title: "Skills" },
  { id: "projects", title: "Projects" },
  { id: "story", title: "My Story" },
  { id: "contact", title: "Contact" },
];

export const stats = [
  { value: "30%", label: "faster peak-period course registration" },
  { value: "50%", label: "lower page load & system load times" },
  { value: "20K+", label: "new international users reached" },
  { value: "40%", label: "less data-preparation time" },
];

export const services = [
  { title: "Full-Stack Web", icon: "🌐", text: "React, Node.js, Express and ColdFusion apps — from data model to accessible UI." },
  { title: "Backend & APIs", icon: "⚙️", text: ".NET Minimal API, REST services, MySQL, AWS and GCP deployments." },
  { title: "3D & Unity Games", icon: "🎮", text: "Physics-based gameplay, procedural levels and multiplayer in Unity / C#." },
  { title: "Automation & Tooling", icon: "🤖", text: "JavaScript and C# tools that remove manual steps from IT workflows." },
];

export type Experience = {
  title: string;
  company: string;
  place?: string;
  date: string;
  accent: string;
  initials: string;
  note?: string;
  points: string[];
};

export const experiences: Experience[] = [
  {
    title: "Full-Stack Web Developer",
    company: "Everett Community College",
    place: "Everett, WA",
    date: "Feb 2024 – Present",
    accent: "#38bdf8",
    initials: "EvCC",
    points: [
      "Gathered requirements from stakeholders and designed, implemented, and deployed a full-stack course registration system — building both the ColdFusion backend and the user-facing frontend — within an Agile environment, increasing peak-period registration throughput by 30%.",
      "Presented full-stack design and architecture proposals to tech leads, covering API contracts, data models, and UI/UX flows, and obtained approval before implementing new features. Built registration forms following accessibility best practices, including semantic HTML, proper labeling, and keyboard navigation.",
      "Refactored legacy ColdFusion backend modules and optimized frontend rendering using test-driven development (TDD), eliminating bottlenecks in data queries for the medical/nursing imaging database and cutting average system load and page load times by 50%.",
      "Reviewed full-stack code (frontend and backend) from other team members, providing feedback on code quality, style guidelines, and adherence to best practices.",
      "Monitored system health post-deployment using Splunk dashboards, identifying and resolving frontend and backend degradation issues proactively before they affected end users during high-traffic enrollment windows.",
      "Triaged full-stack product and system issues, debugging, tracking, and resolving them by analyzing root causes and their impact on hardware, network, and service operations and quality.",
    ],
  },
  {
    title: "Unity Project Coordinator",
    company: "University of Washington",
    place: "Bothell, WA",
    date: "Sep 2023 – Jan 2024",
    accent: "#a78bfa",
    initials: "UW",
    points: [
      "Project Scope: Developed a captivating two-player game, \"Tunnel Pong,\" as part of the UW Bothell Unity Project.",
      "Technical Proficiency: Demonstrated expertise in game development using Unity.",
      "Collaborative Teamwork: Played a hands-on role in designing and implementing interactive gameplay, controls, and graphics.",
      "Multiplayer Integration: Successfully incorporated multiplayer functionality for an enhanced gaming experience.",
      "Creativity and Innovation: Contributed creatively to the design process, aiming for a visually stunning and engaging game.",
      "Quality Deliverables: Tunnel Pong serves as a testament to dedication, technical skills, and the ability to deliver high-quality, innovative gaming experiences.",
    ],
  },
  {
    title: "IT Support Analyst (started as Intern)",
    company: "Zumiez HQ",
    place: "Lynnwood, WA",
    date: "Mar 2022 – Dec 2024",
    accent: "#f472b6",
    initials: "Z",
    points: [
      "Identified a repetitive multi-step IT support process, proposed an automated solution to leadership, and built and got it approved for team-wide use — eliminating manual steps and reducing triage time on routine tickets by 30%.",
      "Wrote JavaScript automation scripts for recurring IT workflows, including account provisioning, device inventory syncing, and ticket pre-categorization.",
      "Built additional automation helper tools in C# to further streamline IT operations, consolidating repetitive multi-step processes into single-run scripts used across the support team.",
      "Played a pivotal role at the IT Solutions Desk as the Lead Architect supporting multiple products in the onboarding space.",
      "Provided expert assistance resolving technical issues for 50+ developers across international and domestic teams.",
      "Proactively identified and resolved issues, troubleshooting hardware and helping employees with account changes and access modifications — always with a timely, accessible response.",
      "Collaborated with Technical Support and fellow colleagues to proficiently address and resolve their issues.",
      "Trained and onboarded employees on internal tools and systems, improving team-wide adoption and reducing repeat support requests.",
      "Contributed to internal IT documentation, keeping support guides and onboarding materials up to date as tools and processes evolved.",
    ],
  },
  {
    title: "Payroll Coordinator",
    company: "Fred Meyer",
    place: "Mill Creek, WA",
    date: "Nov 2020 – Aug 2022",
    accent: "#facc15",
    initials: "FM",
    points: [
      "Led significant improvements to payroll computer systems, spearheading the automation of payment processes and optimizing the code for faster execution.",
      "Identified and successfully implemented usability and connectivity updates to the system, enhancing overall efficiency and user experience.",
      "Collaborated cross-functionally with IT and HR teams to ensure seamless integration of payroll enhancements, fostering better communication and data flow.",
      "Conducted comprehensive system testing and debugging, ensuring the accuracy and reliability of the payroll system, resulting in a smoother payroll processing cycle.",
      "Introduced real-time reporting features, allowing for better tracking and analysis of payroll data, which significantly enhanced decision-making for financial planning and resource allocation.",
    ],
  },
  {
    title: "Software Engineer (Volunteer)",
    company: "Catena",
    date: "Jan 2020 – Sep 2022",
    accent: "#34d399",
    initials: "C",
    points: [
      "Built backend text-processing pipelines in C# that merged, normalized, and aligned Bible texts and commentary across multiple sources, using regex-driven parsers to handle inconsistent source formatting and unify parallel passages into a single data model.",
      "Refactored legacy text-processing code and optimized regex performance, reducing data preparation time by 40% and improving search and lookup responsiveness across iOS and Android.",
      "Shipped multi-language text support with careful Unicode handling and locale-aware backend logic, expanding the user base to 20,000+ new international users.",
      "Collaborated with designers and product managers on advanced search and annotation features, increasing average session interaction depth by 25% based on telemetry data.",
    ],
  },
];

export const education = [
  {
    school: "University of Washington",
    place: "Bothell, WA",
    degree: "Bachelor of Science, Computer Science & Software Engineering",
    date: "2022 – 2024",
    details: ["GPA: 3.5", "Dean's List (2 consecutive years)", "Computer Science Tutoring Club"],
  },
  {
    school: "Cascadia Community College",
    place: "Bothell, WA",
    degree: "Computer Science Major",
    date: "Sep 2018 – Jun 2022",
    details: ["GPA: 3.9 on a 4.0 scale"],
  },
];

// Shown as 3D orbs.
export const orbSkills = [
  "C#", "C++", "Java", "JS", "TS", "SQL", "React", "Node", ".NET", "Unity",
  "AWS", "GCP", "Docker", "Git", "MySQL", "Firebase", "HTML", "CSS",
];

export const skillGroups = [
  { title: "Languages", items: ["C#", "C++", "JavaScript", "TypeScript", "SQL", "HTML/CSS", "Java"] },
  { title: "Frameworks & Libraries", items: ["Unity", "React", "React Native", "Node.js", "Express", ".NET (Minimal API)", "ASP.NET", "Firebase", "ColdFusion"] },
  { title: "Cloud & DevOps", items: ["AWS", "Google Cloud Platform", "Docker", "Git", "CI/CD pipelines"] },
  { title: "Databases", items: ["MySQL", "Firebase"] },
  { title: "Tools & Methods", items: ["Splunk", "Jira", "Agile", "Test-Driven Development", "Regex", "REST APIs"] },
];

export const technicalLevels = [
  { name: "HTML", level: 90 },
  { name: "Unity", level: 90 },
  { name: "Java", level: 80 },
  { name: "HTTPS", level: 100 },
  { name: "CS fundamentals", level: 70 },
  { name: "ASP.NET framework", level: 60 },
  { name: "C++", level: 50 },
  { name: "Binary code", level: 20 },
];

export const softSkills = [
  { name: "Supportive", level: 100 },
  { name: "Punctual", level: 100 },
  { name: "Accessible", level: 100 },
  { name: "Proactive", level: 100 },
  { name: "Responsible", level: 100 },
  { name: "Competitive", level: 100 },
  { name: "Team Motivator", level: 95 },
  { name: "Adaptable", level: 85 },
  { name: "Leadership", level: 80 },
  { name: "Design Thinking", level: 80 },
];

export type Project = {
  name: string;
  description: string;
  tags: string[];
  icon: string;
  gradient: string;
  live?: string;
  code?: string;
  status?: string;
};

const gh = (repo: string) => `https://github.com/Filobatire-Henein/${repo}`;
const pages = (repo: string) => `https://filobatire-henein.github.io/${repo}/`;

export const projects: Project[] = [
  {
    name: "Tunnel Pong — 3D Unity Game",
    description:
      "A fast-paced tunnel pong game with physics-based ball mechanics, procedurally generated obstacles, score tracking, multiplayer, and smooth controls for an immersive cylindrical gameplay experience.",
    tags: ["Unity", "C#", "3D"],
    icon: "🏓",
    gradient: "from-fuchsia-500/30 to-indigo-600/30",
    live: pages("PongDemo"),
    code: gh("PongDemo"),
  },
  {
    name: "Ride-share App (Uber Clone)",
    description:
      "Cross-platform mobile rideshare app for iOS and Android with real-time driver tracking, live location updates, and rider/driver matching via Firebase Realtime Database.",
    tags: ["React Native", "Expo", "Firebase"],
    icon: "🚗",
    gradient: "from-sky-500/30 to-cyan-400/20",
    status: "In progress",
  },
  {
    name: "Appointment Scheduler",
    description:
      "Calendly-style scheduling platform with availability logic, time-slot conflict detection, automated email confirmations, and personal calendar integration.",
    tags: [".NET Minimal API", "C#", "MySQL"],
    icon: "📅",
    gradient: "from-violet-500/30 to-purple-400/20",
  },
  {
    name: "URL Shortener",
    description:
      "URL shortening service with collision-resistant hashing, CRUD operations, and concurrent write handling via an Express/MySQL backend deployed on AWS.",
    tags: ["Node.js", "Express", "MySQL", "AWS"],
    icon: "🔗",
    gradient: "from-emerald-500/30 to-teal-400/20",
    code: gh("CAP_API_URLShortner"),
  },
  {
    name: "Church Management System",
    description:
      "Full-stack church attendance and confession scheduling app with real-time sync across admin and member views.",
    tags: ["React", "Firebase"],
    icon: "⛪",
    gradient: "from-amber-500/30 to-orange-400/20",
  },
  {
    name: "Kitchen Menu Website",
    description:
      "Restaurant menu and ordering site integrated with the Square API for menu management, pricing, and order processing.",
    tags: ["Square API", "JavaScript"],
    icon: "🍽️",
    gradient: "from-rose-500/30 to-pink-400/20",
    live: "https://website-ochre-nu.vercel.app",
  },
  {
    name: "Battleship Game",
    description:
      "Two-player Battleship game with ship placement, turn-based hit/miss detection, and win condition logic.",
    tags: ["JavaScript"],
    icon: "🚢",
    gradient: "from-blue-600/30 to-slate-400/20",
  },
  {
    name: "Calculator",
    description:
      "Demonstrates a solid grasp of web development principles in HTML and JavaScript. The simple design reflects an understanding of user-friendly interfaces, balancing theory and practical implementation.",
    tags: ["HTML", "JavaScript"],
    icon: "🧮",
    gradient: "from-lime-500/30 to-green-400/20",
    live: pages("Basic-Calculator"),
    code: gh("Basic-Calculator"),
  },
  {
    name: "Cities Guessing",
    description:
      "An engaging, interactive cities guessing game blending geographical knowledge with web development — an intuitive UI on top of a thoughtful JavaScript and HTML implementation.",
    tags: ["HTML", "JavaScript"],
    icon: "🏙️",
    gradient: "from-cyan-500/30 to-blue-400/20",
    live: pages("Guessing-game"),
    code: gh("Guessing-game"),
  },
  {
    name: "Hangman",
    description:
      "The classic thrill of Hangman brought to life as an HTML game — a clever mix of JavaScript and HTML with a seamless user experience and clean design.",
    tags: ["HTML", "JavaScript"],
    icon: "🔤",
    gradient: "from-orange-500/30 to-red-400/20",
    live: pages("Hangman"),
    code: gh("Hangman"),
  },
  {
    name: "State Guessing",
    description:
      "A state guessing game where geographic knowledge meets web development — explore and identify states across the United States map with interactive features.",
    tags: ["HTML", "JavaScript"],
    icon: "🗺️",
    gradient: "from-indigo-500/30 to-sky-400/20",
    live: pages("State-Guess"),
    code: gh("State-Guess"),
  },
];

export const story = [
  "In 2010, my family began seriously considering the idea of moving from Egypt to the United States. While my family was living comfortably in Egypt, religious persecutions and terrorist attacks were increasing, which made it difficult for me to continue my education peacefully, even though I was 10 years old and living a happy childhood. Terrorist attacks led my family to decide to immigrate to the United States. Suddenly my childhood was replaced by responsibilities such as caring for my two-year-old sister and translating from English to Arabic for my parents. It made me jealous to see my friends in Egypt living their daily lives peacefully while I was here living a different life.",
  "I still couldn't believe that the country where I was born and raised, the country I love, had become a breeding ground for extreme prejudice. I started thinking about the ways that I could help prevent more violence, and when I did my research I realized that terrorists get their information by hacking the government's database. An idea began to take shape in my mind. A career in Computer Science would provide me with a concrete way to combat and prevent terrorist organizations from spreading. Armed with the knowledge and education I would receive, I could focus my work on discovering and identifying terrorist and illegal organizations.",
  "Over the past few years, I have pursued many opportunities related to computer science. My first collaborative project was to help create a website. I had the chance to work with others and learn different coding languages such as HTML, Java, the ASP.NET framework, and HTTPS. Using what I learned, I was able to create a website with event schedules, announcements, calls to action, media resources, and video and audio content.",
  "I later started working at Fred Meyer in Mill Creek, WA in 2018 as a payroll coordinator. The company realized how interested I was in working with technology, so I was tasked by management to help improve our computer systems. I was able to identify and implement usability and connectivity updates, such as implementing code for payroll, which led to significant improvements to the store's systems.",
  "Since I was 15 years old I have loved solving complicated puzzles. When I try to solve a Rubik's puzzle, my mind is saturated with all the possibilities that can be used to find one solution. When I started my first computer science class, I was thrilled that I found something that connected to my brain's way of thinking. Despite family challenges and needing to move back and forth, I was able to focus on my classes and maintain a 4.0 GPA. But ultimately, I don't just understand Computer Science. I love it.",
  "My love for Computer Science got me to expand my knowledge. Being accepted into the Computer Science and Software Engineering program at the University of Washington Bothell has been a pivotal achievement for me. This opportunity has not only allowed me to enhance my collaborative skills but has also provided a platform to develop expertise in crafting solutions that can positively impact communities, be it in the United States or Egypt. I am enthusiastic about leveraging my education to contribute meaningfully to real-world challenges and make a difference.",
];
