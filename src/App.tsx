import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, 
  Terminal, 
  Server, 
  Lock, 
  Cpu, 
  Globe, 
  Database, 
  Code, 
  ExternalLink, 
  Github, 
  Linkedin, 
  Mail, 
  FileText,
  ChevronDown,
  Menu,
  X,
  Award,
  Briefcase,
  GraduationCap
} from 'lucide-react';

// --- Assets & Data ---

const DATA = {
  profile: {
    name: "Parth Dinesh Bhagat",
    title: "Cybersecurity Engineer",
    subtitles: [
      "Red Team Specialist",
      "Cloud Security Architect",
      "SOC & Incident Response",
      "Application Security Engineer"
    ],
    location: "Nashik, Maharashtra, India",
    email: "parthp1337@gmail.com",
    linkedin: "https://www.linkedin.com/in/parth-bhagat-386954113/",
    github: "https://github.com/parthbhagat1337",
    medium: "https://medium.com/@parthbhagat1337",
    summary: "Versatile Security Engineer with 2+ years of experience bridging offensive and defensive security. I specialize in aligning technical defenses with business objectives through Red Teaming, Cloud Hardening, and Proactive Threat Hunting. Masters in Cybersecurity with deep expertise in AWS/Azure/GCP, ML-driven threat detection, and secure SDLC."
  },
  skills: {
    offensive: ["Red Teaming", "VAPT", "Burp Suite", "Metasploit", "Cobalt Strike/Havoc", "Active Directory Exploitation", "Payload Development"],
    defensive: ["SOC Analyst", "Threat Hunting", "Incident Response", "Digital Forensics (FTK/Autopsy)", "SIEM (QRadar/Splunk/Sentinel)", "Malware Triage"],
    cloud: ["AWS Security", "Azure & GCP", "Terraform (IaC)", "Docker/Kubernetes", "CSPM/CNAPP", "Identity (IAM/Azure AD)"],
    dev: ["Python", "Bash", "PowerShell", "Secure SDLC", "SAST/DAST", "API Security", "Android Security"]
  },
  experience: [
    {
      id: 1,
      role: "Jr. Security Engineer",
      company: "ESDS Software Solutions Limited",
      period: "Jun 2022 - Feb 2024",
      description: "A multi-faceted role covering Red Teaming, Cloud Security, and SOC operations.",
      details: [
        "Internal Red Teaming: Conducted attack simulations, privilege escalation, and lateral movement tests using Havoc C2.",
        "Cloud Architecture: Designed secure architectures for AWS/Azure/GCP and implemented VPC baselines and IAM policies.",
        "AppSec: Integrated security into SDLC, performed SAST/DAST, and conducted API penetration testing.",
        "Incident Response: Led high-severity incident triage, malware containment, and root cause analysis (RCA)."
      ]
    }
  ],
  education: [
    {
      id: 1,
      degree: "M.Sc. in Cybersecurity",
      school: "Dublin Business School, Ireland",
      period: "Sept 2024 - Sept 2025",
      details: "Focus on Cloud Automation (Terraform/AWS), Forensics, and Network Architecture. Thesis: Detecting Encrypted C2 Traffic using ML."
    },
    {
      id: 2,
      degree: "B.Tech in Computer Science & Engineering",
      school: "Sandip University, Nashik",
      period: "Jun 2019 - Jun 2022",
      details: "Key learnings in Servers Architecture, Linux, Networking, and OS."
    }
  ],
  certifications: [
    "Certified Cybersecurity Professional (ISC2)",
    "Certified Ethical Hacker (CEH v12 equiv)",
    "Red Hat Certified Engineer (RHCE)",
    "Cisco Certified Network Associate (CCNA)",
    "CompTIA A+ & N+",
    "Fortinet NSE 3 Network Security Associate"
  ],
  projects: [
    {
      title: "ML-Based C2 Detection",
      category: "AI Security",
      desc: "Detecting Encrypted Havoc C2 Communication using Lightweight Machine Learning Models (SVM, XGBoost).",
      tech: ["Python", "Machine Learning", "Wireshark", "Havoc C2"]
    },
    {
      title: "Secure Chat App",
      category: "Development",
      desc: "End-to-End Encrypted chat application using asymmetric cryptography and secure WebSocket communication.",
      tech: ["Python", "Cryptography", "WebSockets", "SQLite"]
    },
    {
      title: "Automated Cloud Deployment",
      category: "Cloud",
      desc: "Secure containerized deployment pipeline using Terraform and Ansible integrated with GitHub Actions.",
      tech: ["Terraform", "Ansible", "AWS", "CI/CD"]
    },
    {
      title: "Android WiFi Radar",
      category: "Mobile",
      desc: "Android app for scanning WiFi networks and detecting WPS routers with pin-guessing algorithms.",
      tech: ["Java/Kotlin", "Android SDK", "WiFi Protocols"]
    },
    {
      title: "Smart Mirror IoT",
      category: "IoT",
      desc: "Raspberry Pi based smart mirror displaying weather, news, and calendar with modular Node.js backend.",
      tech: ["Raspberry Pi", "Node.js", "IoT"]
    }
  ]
};

// --- Types for TypeScript ---

interface Profile {
  name: string;
  title: string;
  subtitles: string[];
  location: string;
  email: string;
  linkedin: string;
  github: string;
  medium: string;
  summary: string;
}

interface Skills {
  offensive: string[];
  defensive: string[];
  cloud: string[];
  dev: string[];
}

interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
  details: string[];
}

interface EducationItem {
  id: number;
  degree: string;
  school: string;
  period: string;
  details: string;
}

interface Project {
  title: string;
  category: string;
  desc: string;
  tech: string[];
}

interface SectionHeadingProps {
  children: React.ReactNode;
  icon: React.ComponentType<{ className?: string; size?: number }>;
}

interface SkillCardProps {
  title: string;
  skills: string[];
  icon: React.ComponentType<{ className?: string; size?: number }>;
}

interface TimelineItemProps {
  data: ExperienceItem | EducationItem;
  isLast?: boolean;
}

interface ProjectCardProps {
  project: Project;
}

interface FolderIconProps {
  size?: number;
  className?: string;
}

// --- Components ---

const MatrixBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポ1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '01';
    const alphabet = katakana + nums;

    const fontSize = 16;
    const columns = Math.floor(width / fontSize);

    const rainDrops: number[] = [];
    for (let x = 0; x < columns; x++) {
      rainDrops[x] = 1;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#0F0';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };

    const interval = setInterval(draw, 30);

    const handleResize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-20 pointer-events-none"
    />
  );
};

const SectionHeading: React.FC<SectionHeadingProps> = ({ children, icon: Icon }) => (
  <div className="flex items-center gap-3 mb-8">
    <div className="p-2 bg-green-500/10 rounded border border-green-500/30">
      <Icon className="text-green-500" size={24} />
    </div>
    <h2 className="text-3xl font-bold text-white tracking-wide uppercase font-mono">
      {children}
    </h2>
    <div className="h-px bg-green-500/30 flex-grow ml-4"></div>
  </div>
);

const SkillCard: React.FC<SkillCardProps> = ({ title, skills, icon: Icon }) => (
  <div className="bg-zinc-900/50 border border-green-500/20 p-6 rounded-lg backdrop-blur-sm hover:border-green-500/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(34,197,94,0.1)] group">
    <div className="flex items-center gap-3 mb-4">
      <Icon className="text-green-400 group-hover:text-green-300 transition-colors" size={24} />
      <h3 className="text-xl font-bold text-gray-100">{title}</h3>
    </div>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, idx) => (
        <span 
          key={idx} 
          className="px-3 py-1 text-sm bg-black/40 border border-zinc-700 text-zinc-300 rounded hover:border-green-500/50 hover:text-green-400 transition-colors cursor-default"
        >
          {skill}
        </span>
      ))}
    </div>
  </div>
);

const TimelineItem: React.FC<TimelineItemProps> = ({ data, isLast = false }) => (
  <div className="relative pl-8 pb-12 sm:pl-32 py-6 group">
    {/* Line */}
    {!isLast && (
      <div className="absolute left-8 sm:left-32 top-10 bottom-0 w-px bg-zinc-800 group-hover:bg-green-500/50 transition-colors" />
    )}
    
    {/* Date (Desktop) */}
    <div className="hidden sm:block absolute left-0 w-24 text-right text-sm font-mono text-green-500/80 pt-1">
      {data.period}
    </div>

    {/* Dot */}
    <div className="absolute left-[26px] sm:left-[122px] top-7 w-3 h-3 rounded-full bg-zinc-900 border-2 border-green-500 z-10 group-hover:scale-125 transition-transform shadow-[0_0_10px_rgba(34,197,94,0.5)]" />

    {/* Content */}
    <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-xl hover:border-green-500/30 transition-all backdrop-blur-md">
      {/* Date (Mobile) */}
      <div className="sm:hidden text-xs font-mono text-green-500 mb-2">
        {data.period}
      </div>
      
      <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
        {('role' in data ? data.role : data.degree) as string}
      </h3>
      <div className="text-zinc-400 mb-4 font-medium flex items-center gap-2">
        {('company' in data ? data.company : data.school) as string}
      </div>
      
      {'description' in data && data.description && (
        <p className="text-zinc-300 mb-4 text-sm leading-relaxed">
          {data.description}
        </p>
      )}

      {'details' in data && Array.isArray(data.details) ? (
        <ul className="space-y-2">
          {data.details.map((point, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-zinc-400">
              <span className="text-green-500 mt-1">▹</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-zinc-400 border-l-2 border-green-500/30 pl-3">
          {data.details}
        </p>
      )}
    </div>
  </div>
);

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => (
  <div className="group relative bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-green-500/50 transition-all duration-300 flex flex-col h-full">
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    
    <div className="p-6 flex flex-col flex-grow">
      <div className="flex justify-between items-start mb-4">
        <div className="px-3 py-1 text-xs font-mono rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
          {project.category}
        </div>
        <div className="text-zinc-600 group-hover:text-green-500 transition-colors">
          <FolderIcon size={20} />
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">
        {project.title}
      </h3>
      
      <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-grow">
        {project.desc}
      </p>
      
      <div className="flex flex-wrap gap-2 mt-auto">
        {project.tech.map((t, i) => (
          <span key={i} className="text-xs text-zinc-500 font-mono">
            #{t}
          </span>
        ))}
      </div>
    </div>
  </div>
);

// Fallback icon helper
const FolderIcon: React.FC<FolderIconProps> = ({ size = 24, className = '' }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
  </svg>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('all');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [typewriterText, setTypewriterText] = useState('');
  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Typewriter effect logic
  useEffect(() => {
    const currentSubtitle = DATA.profile.subtitles[currentSubtitleIndex];
    const typeSpeed = isDeleting ? 50 : 100;

    const timer = setTimeout(() => {
      if (!isDeleting && typewriterText === currentSubtitle) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && typewriterText === '') {
        setIsDeleting(false);
        setCurrentSubtitleIndex((prev) => (prev + 1) % DATA.profile.subtitles.length);
      } else {
        setTypewriterText(
          currentSubtitle.substring(0, typewriterText.length + (isDeleting ? -1 : 1))
        );
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [typewriterText, isDeleting, currentSubtitleIndex]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen bg-black text-gray-200 font-sans selection:bg-green-500/30 selection:text-green-200">
      <MatrixBackground />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50 border-b border-green-500/10">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-mono text-xl font-bold text-white flex items-center gap-2">
            <Terminal size={20} className="text-green-500" />
            <span className="tracking-tighter">PARTH<span className="text-green-500">.SEC</span></span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="hover:text-green-400 transition-colors uppercase tracking-widest text-xs"
              >
                {item}
              </a>
            ))}
            <a 
              href={DATA.profile.github} 
              target="_blank" 
              rel="noreferrer"
              className="px-4 py-2 bg-green-500/10 text-green-500 border border-green-500/50 rounded hover:bg-green-500 hover:text-black transition-all"
            >
              Resume
            </a>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-white" onClick={toggleMenu}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-zinc-900 border-b border-zinc-800">
            <div className="flex flex-col p-4 space-y-4">
              {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-300 hover:text-green-400 block"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center px-6 pt-16">
        <div className="text-center max-w-4xl z-10">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-mono text-green-400 bg-green-900/20 border border-green-500/30 rounded-full animate-pulse">
            System Online • Secure Connection Established
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Hello, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">{DATA.profile.name}</span>
          </h1>
          <div className="h-8 md:h-12 mb-8 font-mono text-xl md:text-3xl text-zinc-400">
            <span>&gt; </span>
            <span className="text-green-500">{typewriterText}</span>
            <span className="animate-blink">_</span>
          </div>
          <p className="text-zinc-400 max-w-2xl mx-auto mb-10 text-lg leading-relaxed">
            {DATA.profile.summary}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="#projects"
              className="px-8 py-3 bg-green-600 hover:bg-green-500 text-black font-bold rounded transition-colors flex items-center gap-2"
            >
              View Operations <ChevronDown size={18} />
            </a>
            <a 
              href={DATA.profile.github}
              target="_blank"
              rel="noreferrer" 
              className="px-8 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded transition-colors flex items-center gap-2 border border-zinc-700"
            >
              <Github size={18} /> GitHub Profile
            </a>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-6 py-12 space-y-24">
        
        {/* Skills Section */}
        <section id="skills" className="scroll-mt-24">
          <SectionHeading icon={Cpu}>Technical Arsenal</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <SkillCard title="Offensive Security" skills={DATA.skills.offensive} icon={Shield} />
            <SkillCard title="Cloud Security" skills={DATA.skills.cloud} icon={Server} />
            <SkillCard title="Defensive Ops" skills={DATA.skills.defensive} icon={Lock} />
            <SkillCard title="Development" skills={DATA.skills.dev} icon={Code} />
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="scroll-mt-24">
          <SectionHeading icon={Briefcase}>Mission Timeline</SectionHeading>
          <div className="max-w-4xl mx-auto">
            {DATA.experience.map((job, idx) => (
              <TimelineItem key={job.id} data={job} isLast={idx === DATA.experience.length - 1} />
            ))}
            <div className="my-12 flex items-center justify-center">
              <div className="h-px bg-zinc-800 w-full max-w-xs"></div>
              <span className="px-4 text-zinc-600 font-mono text-sm">ACADEMIC</span>
              <div className="h-px bg-zinc-800 w-full max-w-xs"></div>
            </div>
            {DATA.education.map((edu, idx) => (
              <TimelineItem key={edu.id} data={edu} isLast={idx === DATA.education.length - 1} />
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="scroll-mt-24">
          <SectionHeading icon={Database}>Classified Projects</SectionHeading>
          
          <div className="flex flex-wrap gap-4 mb-8 justify-center">
            {['all', 'AI Security', 'Cloud', 'Development', 'Mobile', 'IoT'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === cat 
                    ? 'bg-green-600 text-black shadow-[0_0_10px_rgba(22,163,74,0.5)]' 
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DATA.projects
              .filter(p => activeTab === 'all' || p.category === activeTab)
              .map((project, idx) => (
                <ProjectCard key={idx} project={project} />
              ))}
          </div>
        </section>

        {/* Certifications */}
        <section className="scroll-mt-24">
          <SectionHeading icon={Award}>Certifications</SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {DATA.certifications.map((cert, idx) => (
              <div key={idx} className="flex items-center gap-3 p-4 bg-zinc-900 border border-zinc-800 rounded hover:border-green-500/30 transition-colors">
                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_5px_#22c55e]" />
                <span className="text-zinc-300 text-sm font-medium">{cert}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="scroll-mt-24 max-w-3xl mx-auto text-center">
          <SectionHeading icon={Globe}>Establish Uplink</SectionHeading>
          <p className="text-zinc-400 mb-8">
            Currently looking for new opportunities in Red Teaming, Cloud Security, and Incident Response.
            Whether you have a question or just want to say hi, my inbox is always open.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            <a 
              href={`mailto:${DATA.profile.email}`}
              className="flex items-center gap-3 px-6 py-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-green-500/50 hover:bg-zinc-800 transition-all group"
            >
              <Mail className="text-zinc-400 group-hover:text-green-500" />
              <div className="text-left">
                <div className="text-xs text-zinc-500 font-mono">EMAIL</div>
                <div className="text-white font-medium">{DATA.profile.email}</div>
              </div>
            </a>

            <a 
              href={DATA.profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 px-6 py-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-blue-500/50 hover:bg-zinc-800 transition-all group"
            >
              <Linkedin className="text-zinc-400 group-hover:text-blue-500" />
              <div className="text-left">
                <div className="text-xs text-zinc-500 font-mono">LINKEDIN</div>
                <div className="text-white font-medium">Parth Bhagat</div>
              </div>
            </a>
          </div>

          <footer className="mt-20 pt-8 border-t border-zinc-900 text-zinc-600 text-sm font-mono">
            <p>© {new Date().getFullYear()} Parth Bhagat. All systems nominal.</p>
          </footer>
        </section>

      </main>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}
