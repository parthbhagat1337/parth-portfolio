"use client"

import { useState, useEffect, useRef } from "react"
import {
  Shield,
  Terminal,
  Server,
  Lock,
  Cpu,
  Globe,
  Database,
  Code,
  Github,
  Linkedin,
  Mail,
  ChevronDown,
  Menu,
  X,
  Award,
  Briefcase,
  type LucideIcon,
} from "lucide-react"

// --- Types & Interfaces --- 

interface Project {
  title: string
  category: string
  desc: string
  tech: string[]
}

interface ExperienceItem {
  id: number
  role?: string
  degree?: string
  company?: string
  school?: string
  period: string
  description?: string
  details: string[] | string
}

interface ToolCategory {
  category: string
  items: string[]
}

// --- Assets & Data ---

const DATA = {
  profile: {
    name: "Parth Dinesh Bhagat",
    title: "Cybersecurity Engineer",
    subtitles: [
      "Red Team Specialist",
      "Offensive Security Expert",
      "Threat Hunter & Incident Response",
      "CyberSecurity Architect",
    ],
    location: "India",
    email: "parthp1337@gmail.com",
    linkedin: "https://www.linkedin.com/in/parth-bhagat-386954113/",
    github: "https://github.com/parthbhagat1337",
    medium: "https://medium.com/@parthbhagat1337",
    summary:
      "Cybersecurity Engineer with hands-on experience in offensive security, threat detection, and network security with Masters in Cybersecurity. I specialize in Vulnerability Assessment, Red Teaming, Threat hunting, Secure Network Design, and Incident Response Management. I excel at aligning technical defences with business objectives, ensuring compliance with industry standards.",
  },
  skills: {
    offensive: [
      "Red Teaming",
      "VAPT",
      "Web application Pentesting",
      "Mobile Application Pentesting",
      "API security testing",
      "Command & Control(C2)",
      "Phishing Campaign",
      "Active Directory Exploitation",
      "MITRE ATT&CK",
      "OWASP Top 10",
      "CyberKill Chain",
    ],
    defensive: [
      "Threat Hunting",
      "Incident Response",
      "IBM QRadar",
      "Secone",
      "SOC Radar",
      "Digital Forensics",
      "Wireshark",
      "FTK",
      "Autopsy",
      "Shodan",
      "Volatility",
      "Cuckoo/Anyrun Sandbox",
      "SIEM/Log Analysis",
      "IOC Management",
    ],
    cloud: [
      "AWS Security",
      "GuardDuty", 
      "CloudTrail",
      "Security Hub ",
      "Azure & GCP",
      "Terraform",
      "Ansible",
      "CI/CD (GitHub Actions)",
      "MFA",
      "IAM security",
      "Firewall Configuration",
    ],
    dev: [
      "Python",
      "Bash",
      "PowerShell",
      "Secure Scripting",
      "SAST / DAST",
      "SonarQube",
      "Semgrep",
      "OWASP ZAP",
      "Burp Suite",
      "Mobile Security Testing (MobSF)",
      "CI/CD Security Integration",
      "Secure Code Review"
    ],
  },
  experience: [
    {
      id: 1,
      role: "Jr. Security Engineer",
      company: "ESDS Software Solutions Limited",
      period: "Jun 2022 - Feb 2024 | Nashik, India",
      description:
        "Multi-faceted role covering Internal Red Teaming, Attack Surface Management, VAPT, Threat Hunting, and Incident Response for BFSI, Government, and Enterprise clients.",
      details: [
        "Internal Red Teaming: Designed and executed attack simulations including credential attacks, privilege escalation, and controlled exploitation using Havoc C2, web shells, and post-exploitation techniques across Linux and Windows environments.",
        "Attack Surface Discovery: Conducted continuous attack surface discovery and security assessments, identifying shadow systems, outdated services, misconfigurations, and weak controls. Automated inventory checks using Python and Bash scripts.",
        "VAPT Operations: Led VAPT engagements for BFSI, Government, and Enterprise clients covering internal applications, servers, APIs, Active Directory, and network components using both automated scanners and deep manual testing.",
        "Compliance & Reporting: Created detailed reports with severity ratings, evidence, and remediation steps. Supported achieving ISMS, SOC1, SOC2, and PCI-DSS compliance requirements.",
        "Threat Hunting & IR: Worked with IBM QRadar for log analysis and correlation. Delivered forensic analysis and breach response using Sandbox and monitoring tools. Reviewed and updated IOCs regularly based on threat intelligence.",
        "SIEM Integration: Helped set up and integrate SIEM tools like IBM QRadar to improve log visibility, alerting, and security monitoring. Contributed to tuning detection rules and creating custom rules per client requirements.",
      ],
    },
  ] as ExperienceItem[],
  education: [
    {
      id: 1,
      degree: "M.Sc. in Cybersecurity",
      school: "Dublin Business School, Dublin, Ireland",
      period: "Sept 2024 - Sept 2025",
      details: [
        "[+] Focus on Cloud Automation (Terraform/AWS).",
        "[+]  Automated Container Deployment using Terraform, GitHub CI/CD pipeline, Ansible and Administration in the Cloud (AWS).",
        "[+] Forensic Investigation of Disk Image using FTK and Autopsy and Network Forensics using Wireshark.
        "[+]  Proposed a Network Architecture Design for a mid-sized company with secure, scalable, high-availability network with firewall configurations, VLAN segmentation, redundancy, and remote access security.",
        "[+]  Performing SAST/DAST on provided applications.",
        "[+] Created, Designed and Implemented a CTF Virtual Machine.",
        "[+] Developed and delivered a Business Continuity and Disaster Recovery Plan for the Dublin City Hospital Scenario.",
        ],
    },
    {
      id: 2,
      degree: "B.Tech in Computer Science & Engineering",
      school: "Sandip University, Nashik, Maharashtra, India",
      period: "Jun 2019 - Jun 2022",
      details:
        "Key learnings: Programming, Web technologies, Servers Architecture, Linux fundamentals, Networking, and Operating Systems.",
    },
  ] as ExperienceItem[],
  certifications: [
    "Certified Cybersecurity Professional (ISC2)",
    "Certified Ethical Hacker (CEH v12 equiv)",
    "Red Hat Certified Engineer (RHCE)",
    "Cisco Certified Network Associate (CCNA)",
    "CompTIA A+ & N+",
    "Fortinet NSE 3 Network Security Associate",
  ],
  projects: [
    {
      title: "ML-Based C2 Detection",
      category: "AI Security",
      desc: "Detecting Encrypted Havoc C2 Communication using Lightweight Machine Learning Models (SVM, XGBoost) for network traffic analysis and threat detection.",
      tech: ["Python", "Machine Learning", "Wireshark", "Havoc C2", "Network Analysis"],
    },
    {
      title: "Secure Chat Application",
      category: "Development",
      desc: "End-to-End Encrypted chat application implementing asymmetric cryptography and secure WebSocket communication with SQLite backend.",
      tech: ["Python", "Cryptography", "WebSockets", "SQLite"],
    },
    {
      title: "Automated Cloud Deployment",
      category: "Cloud",
      desc: "Secure containerized deployment pipeline using Terraform IaC and Ansible configuration management integrated with GitHub Actions CI/CD on AWS infrastructure.",
      tech: ["Terraform", "Ansible", "AWS", "CI/CD", "GitHub Actions"],
    },
    {
      title: "CTF Virtual Machine",
      category: "Development",
      desc: "Designed and implemented a comprehensive Capture The Flag virtual machine environment for cybersecurity training and skills assessment.",
      tech: ["Linux", "Security Tools", "Virtualization", "CTF Design"],
    },
    {
      title: "Network Architecture Design",
      category: "Cloud",
      desc: "Proposed secure, scalable, high-availability network architecture for mid-sized company including firewall configurations, VLAN segmentation, redundancy, and remote access security.",
      tech: ["Network Design", "Firewall", "VLAN", "Security Architecture"],
    },
    {
      title: "Android WiFi Radar",
      category: "Mobile",
      desc: "Android app for scanning WiFi networks and detecting WPS routers with pin-guessing algorithms for security assessment.",
      tech: ["Java/Kotlin", "Android SDK", "WiFi Protocols"],
    },
    {
      title: "Smart Mirror IoT",
      category: "IoT",
      desc: "Raspberry Pi based smart mirror displaying weather, news, and calendar with modular Node.js backend and customizable interface.",
      tech: ["Raspberry Pi", "Node.js", "IoT"],
    },
  ] as Project[],
  tools: [
    {
      category: "Security Testing",
      items: ["Nessus", "Metasploit Pro", "Burp Suite", "Nmap", "Wireshark","Custom Github Tools"],
    },
    {
      category: "SIEM & Monitoring",
      items: ["Secone", "IBM QRadar", "Log Analysis", "Correlation Rules", "Custom Detection"],
    },
    {
      category: "Red Team Tools",
      items: ["Sliver", "Havoc C2", "BloodHound", "CrackMapExec", "Mimikatz", "Web Shells"],
    },
    {
      category: "Code Security",
      items: ["SonarQube", "Semgrep", "SAST/DAST", "Mobsf", "Sync"],
    },
    {
      category: "Forensics",
      items: ["Autopsy", "FTK", "Cuckoo Sandbox", "Volatility", "Immunity Debugger"],
    },
    {
      category: "Scripting & Automation",
      items: ["Python", "PowerShell", "Bash", "Windows Utilities", "Linux Utilities"],
    },
    {
      category: "OSINT & Recon",
      items: ["Shodan", "Threat Intelligence", "IOC Management", "Intelx", "OSINT"],
    },
  ] as ToolCategory[],
}

// --- Components ---

const MatrixBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return // Null check fix

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight
    canvas.width = width
    canvas.height = height

    const katakana =
      "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポ1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const nums = "01"
    const alphabet = katakana + nums

    const fontSize = 16
    const columns = width / fontSize

    const rainDrops: number[] = [] // Typed array
    for (let x = 0; x < columns; x++) {
      rainDrops[x] = 1
    }

    const draw = () => {
      ctx.fillStyle = "rgba(10, 10, 10, 0.05)"
      ctx.fillRect(0, 0, width, height)

      ctx.fillStyle = "#0F0"
      ctx.font = fontSize + "px monospace"

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length))
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize)

        if (rainDrops[i] * fontSize > height && Math.random() > 0.975) {
          rainDrops[i] = 0
        }
        rainDrops[i]++
      }
    }

    const interval = setInterval(draw, 30)

    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    window.addEventListener("resize", handleResize)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 opacity-20 pointer-events-none" />
}

interface SectionHeadingProps {
  children: React.ReactNode
  icon: LucideIcon
}

const SectionHeading = ({ children, icon: Icon }: SectionHeadingProps) => (
  <div className="flex items-center gap-3 mb-8">
    <div className="p-2 bg-green-500/10 rounded border border-green-500/30">
      <Icon className="text-green-500" size={24} />
    </div>
    <h2 className="text-3xl font-bold text-white tracking-wide uppercase font-mono">{children}</h2>
    <div className="h-px bg-green-500/30 flex-grow ml-4"></div>
  </div>
)

interface SkillCardProps {
  title: string
  skills: string[]
  icon: LucideIcon
}

const SkillCard = ({ title, skills, icon: Icon }: SkillCardProps) => (
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
)

interface TimelineItemProps {
  data: ExperienceItem
  isLast?: boolean
}

const TimelineItem = ({ data, isLast = false }: TimelineItemProps) => (
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
      <div className="sm:hidden text-xs font-mono text-green-500 mb-2">{data.period}</div>

      <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">{data.role || data.degree}</h3>
      <div className="text-zinc-400 mb-4 font-medium flex items-center gap-2">{data.company || data.school}</div>

      {data.description && <p className="text-zinc-300 mb-4 text-sm leading-relaxed">{data.description}</p>}

      {data.details && Array.isArray(data.details) ? (
        <ul className="space-y-2">
          {data.details.map((point, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-zinc-400">
              <span className="text-green-500 mt-1">▹</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-zinc-400 border-l-2 border-green-500/30 pl-3">{data.details}</p>
      )}
    </div>
  </div>
)

interface ProjectCardProps {
  project: Project
}

const ProjectCard = ({ project }: ProjectCardProps) => (
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

      <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-grow">{project.desc}</p>

      <div className="flex flex-wrap gap-2 mt-auto">
        {project.tech.map((t, i) => (
          <span key={i} className="text-xs text-zinc-500 font-mono">
            #{t}
          </span>
        ))}
      </div>
    </div>
  </div>
)

// Fallback icon helper
interface FolderIconProps {
  size: number
  className?: string
}

const FolderIcon = ({ size, className }: FolderIconProps) => (
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
)

export default function App() {
  const [activeTab, setActiveTab] = useState("all")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [typewriterText, setTypewriterText] = useState("")
  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  // Typewriter effect logic
  useEffect(() => {
    const currentSubtitle = DATA.profile.subtitles[currentSubtitleIndex]
    const typeSpeed = isDeleting ? 50 : 100

    const timer = setTimeout(() => {
      if (!isDeleting && typewriterText === currentSubtitle) {
        setTimeout(() => setIsDeleting(true), 2000)
      } else if (isDeleting && typewriterText === "") {
        setIsDeleting(false)
        setCurrentSubtitleIndex((prev) => (prev + 1) % DATA.profile.subtitles.length)
      } else {
        setTypewriterText(currentSubtitle.substring(0, typewriterText.length + (isDeleting ? -1 : 1)))
      }
    }, typeSpeed)

    return () => clearTimeout(timer)
  }, [typewriterText, isDeleting, currentSubtitleIndex])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <div className="min-h-screen bg-black text-gray-200 font-sans selection:bg-green-500/30 selection:text-green-200">
      <MatrixBackground />

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50 border-b border-green-500/10">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-mono text-xl font-bold text-white flex items-center gap-2">
            <Terminal size={20} className="text-green-500" />
            <span className="tracking-tighter">
              PARTH<span className="text-green-500">.SEC</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            {["About", "Skills", "Experience", "Projects", "Tools", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-green-400 transition-colors uppercase tracking-widest text-xs"
              >
                {item}
              </a>
            ))}
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
              {["About", "Skills", "Experience", "Projects", "Tools", "Contact"].map((item) => (
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
      <section id="about" className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-16">
        <div className="text-center max-w-4xl z-10">
          <div className="inline-block px-3 py-1 mb-6 text-xs font-mono text-green-400 bg-green-900/20 border border-green-500/30 rounded-full animate-pulse">
            System Online • Secure Connection Established
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
            Hello, I'm{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
              {DATA.profile.name}
            </span>
          </h1>

          <div className="mb-8 flex justify-center">
            <div className="relative w-32 h-32 md:w-40 md:h-40">
              <img
                src="https://github.com/parthbhagat1337/parth-portfolio/blob/main/Parth-bhagat-photo.JPG"
                alt="Parth Dinesh Bhagat"
                className="w-full h-full rounded-full object-cover border-4 border-green-500/50 shadow-lg shadow-green-500/20"
              />
              <div className="absolute inset-0 rounded-full ring-2 ring-green-400/30 ring-offset-2 ring-offset-zinc-900 animate-pulse"></div>
            </div>
          </div>

          <div className="h-8 md:h-12 mb-8 font-mono text-xl md:text-3xl text-zinc-400">
            <span>&gt; </span>
            <span className="text-green-500">{typewriterText}</span>
            <span className="animate-blink">_</span>
          </div>

          <p className="text-zinc-400 max-w-2xl mx-auto mb-10 text-lg leading-relaxed">{DATA.profile.summary}</p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`mailto:${DATA.profile.email}`}
              className="px-6 py-3 bg-green-500 text-black font-bold rounded hover:bg-green-400 transition-all flex items-center gap-2 hover:scale-105 shadow-lg shadow-green-500/30"
            >
              <Mail size={18} />
              Get In Touch
            </a>
            <a
              href={DATA.profile.github}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 bg-zinc-800 text-white border border-zinc-700 rounded hover:border-green-500/50 hover:text-green-400 transition-all flex items-center gap-2"
            >
              <Github size={18} />
              GitHub
            </a>
            <a
              href={DATA.profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 bg-zinc-800 text-white border border-zinc-700 rounded hover:border-green-500/50 hover:text-green-400 transition-all flex items-center gap-2"
            >
              <Linkedin size={18} />
              LinkedIn
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-green-500" size={32} />
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
              <TimelineItem key={idx} data={job} />
            ))}
            <div className="my-12 flex items-center justify-center">
              <div className="h-px bg-zinc-800 w-full max-w-xs"></div>
              <span className="px-4 text-zinc-600 font-mono text-sm">ACADEMIC</span>
              <div className="h-px bg-zinc-800 w-full max-w-xs"></div>
            </div>
            {DATA.education.map((edu, idx) => (
              <TimelineItem key={idx + 10} data={edu} isLast={idx === DATA.education.length - 1} />
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="scroll-mt-24">
          <SectionHeading icon={Database}>Classified Projects</SectionHeading>

          <div className="flex flex-wrap gap-4 mb-8 justify-center">
            {["all", "AI Security", "Cloud", "Development", "Mobile", "IoT"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === cat
                    ? "bg-green-600 text-black shadow-[0_0_10px_rgba(22,163,74,0.5)]"
                    : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DATA.projects
              .filter((p) => activeTab === "all" || p.category === activeTab)
              .map((project, idx) => (
                <ProjectCard key={idx} project={project} />
              ))}
          </div>
        </section>

        {/* Tools & Technologies Section */}
        <section id="tools" className="scroll-mt-24">
          <SectionHeading icon={Terminal}>Tools & Technologies</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DATA.tools.map((toolGroup, idx) => (
              <div
                key={idx}
                className="bg-zinc-900/50 border border-green-500/20 p-6 rounded-lg backdrop-blur-sm hover:border-green-500/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(34,197,94,0.1)] group"
              >
                <h3 className="text-lg font-bold text-green-400 mb-4 font-mono">{toolGroup.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {toolGroup.items.map((tool, toolIdx) => (
                    <span
                      key={toolIdx}
                      className="px-3 py-1 text-xs bg-black/40 border border-zinc-700 text-zinc-300 rounded hover:border-green-500/50 hover:text-green-400 transition-colors cursor-default"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section className="scroll-mt-24">
          <SectionHeading icon={Award}>Certifications</SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {DATA.certifications.map((cert, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-4 bg-zinc-900 border border-zinc-800 rounded hover:border-green-500/30 transition-colors"
              >
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
            Open to opportunities in Red Teaming, Application Security, Threat Hunting, and Incident Response. Whether
            you have a question or just want to say hi, my inbox is always open.
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
  )
}
