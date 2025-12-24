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
      description: "Internal Red Teaming, Attack Surface Management, VAPT, and Threat Hunting.",
      details: [
        "Internal Red Teaming: Designed and executed attack simulations (credential attacks, privilege escalation) using Havoc C2 and post-exploitation techniques.",
        "Attack Surface Discovery: Conducted continuous discovery across Linux/Windows, identifying shadow systems and misconfigurations. Automated inventory via Python/Bash.",
        "Collaboration: Worked with SOC teams to improve real-time detection logic and presented results to senior stakeholders for hardening recommendations.",
        "VAPT Operations: Led engagements for BFSI, Government, and Enterprise clients covering Web Apps, APIs, Active Directory, and Network components.",
        "Compliance: Created detailed reports and supported ISO 27001 (ISMS), SOC1, SOC2, and PCI-DSS compliance audits.",
        "Threat Hunting & IR: Optimized SIEM (IBM QRadar) detection rules, delivered forensic analysis, and managed IOC updates based on threat intelligence."
      ],
    },
    {
      id: 2,
      role: "Cybersecurity Red Team Analyst",
      company: "WhiteBand Associates",
      period: "Jun 2021 - May 2022 | Nashik, India",
      description: "Vulnerability Assessment, Penetration Testing, and Training Delivery.",
      details: [
        "VAPT Support: Assisted in security engagements for small enterprises covering web applications, servers, and Active Directory environments.",
        "Offensive Tasks: Performed reconnaissance, scanning, and exploitation validation in lab and client-approved environments.",
        "Training Delivery: Guided trainees through hands-on offensive/defensive exercises and supported client-facing security workshops.",
        "Infrastructure: Maintained physical and virtual lab environments (Linux/Windows) and handled network configuration for simulations.",
        "Documentation: Prepared technical notes, training materials, and assessment findings summaries for internal and client use."
      ],
    }
  ] as ExperienceItem[],
  education: [
    {
      id: 1,
      degree: "M.Sc. in Cybersecurity",
      school: "Dublin Business School, Dublin, Ireland",
      period: "Sept 2024 - Sept 2025",
      details: [
        "[+] Focus on Cloud Automation (Terraform/AWS).",
        "[+] Automated Container Deployment using Terraform, GitHub CI/CD, and Ansible.",
        "[+] Forensic Investigation of Disk Images using FTK/Autopsy and Network Forensics using Wireshark.",
        "[+] Designed secure, high-availability Network Architectures with VLAN segmentation and firewall redundancy."
      ],
    },
    {
      id: 2,
      degree: "B.Tech in Computer Science & Engineering",
      school: "Sandip University, Nashik, Maharashtra, India",
      period: "Jun 2019 - Jun 2022",
      details: "Key learnings: Programming, Web technologies, Servers Architecture, Linux fundamentals, Networking, and Operating Systems.",
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
      desc: "Detecting Encrypted Havoc C2 Communication using Lightweight Machine Learning Models (SVM, XGBoost).",
      tech: ["Python", "Machine Learning", "Wireshark", "Havoc C2"],
    },
    {
      title: "Secure Chat Application",
      category: "Development",
      desc: "End-to-End Encrypted chat app implementing asymmetric cryptography and secure WebSockets.",
      tech: ["Python", "Cryptography", "WebSockets", "SQLite"],
    },
    {
      title: "Automated Cloud Deployment",
      category: "Cloud",
      desc: "Secure containerized deployment pipeline using Terraform IaC and Ansible on AWS.",
      tech: ["Terraform", "Ansible", "AWS", "GitHub Actions"],
    },
  ] as Project[],
  tools: [
    {
      category: "Security Testing",
      items: ["Nessus", "Metasploit Pro", "Burp Suite", "Nmap", "Wireshark"],
    },
    {
      category: "SIEM & Monitoring",
      items: ["IBM QRadar", "Secone", "Log Analysis", "Correlation Rules"],
    },
    {
      category: "Red Team Tools",
      items: ["Sliver", "Havoc C2", "BloodHound", "CrackMapExec", "Mimikatz"],
    },
    {
      category: "Forensics",
      items: ["Autopsy", "FTK", "Cuckoo Sandbox", "Volatility"],
    },
  ] as ToolCategory[],
}

// --- Components ---

const MatrixBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return 

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight
    canvas.width = width
    canvas.height = height

    const alphabet = "01ABCDEFGHIJKLMNOPQRSTUVWXYZアカサタナハマヤラワ"
    const fontSize = 16
    const columns = width / fontSize
    const rainDrops: number[] = Array(Math.floor(columns)).fill(1)

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
      width = window.innerWidth; height = window.innerHeight
      canvas.width = width; canvas.height = height
    }
    window.addEventListener("resize", handleResize)
    return () => { clearInterval(interval); window.removeEventListener("resize", handleResize) }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 opacity-20 pointer-events-none" />
}

const SectionHeading = ({ children, icon: Icon }: { children: React.ReactNode, icon: LucideIcon }) => (
  <div className="flex items-center gap-3 mb-8">
    <div className="p-2 bg-green-500/10 rounded border border-green-500/30">
      <Icon className="text-green-500" size={24} />
    </div>
    <h2 className="text-3xl font-bold text-white tracking-wide uppercase font-mono">{children}</h2>
    <div className="h-px bg-green-500/30 flex-grow ml-4"></div>
  </div>
)

const SkillCard = ({ title, skills, icon: Icon }: { title: string, skills: string[], icon: LucideIcon }) => (
  <div className="bg-zinc-900/50 border border-green-500/20 p-6 rounded-lg backdrop-blur-sm hover:border-green-500/50 transition-all">
    <div className="flex items-center gap-3 mb-4">
      <Icon className="text-green-400" size={24} />
      <h3 className="text-xl font-bold text-gray-100">{title}</h3>
    </div>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, idx) => (
        <span key={idx} className="px-3 py-1 text-sm bg-black/40 border border-zinc-700 text-zinc-300 rounded hover:text-green-400 transition-colors">
          {skill}
        </span>
      ))}
    </div>
  </div>
)

const TimelineItem = ({ data, isLast = false }: { data: ExperienceItem, isLast?: boolean }) => (
  <div className="relative pl-8 pb-12 sm:pl-32 py-6 group">
    {!isLast && <div className="absolute left-8 sm:left-32 top-10 bottom-0 w-px bg-zinc-800 group-hover:bg-green-500/50" />}
    <div className="hidden sm:block absolute left-0 w-24 text-right text-sm font-mono text-green-500/80 pt-1">{data.period}</div>
    <div className="absolute left-[26px] sm:left-[122px] top-7 w-3 h-3 rounded-full bg-zinc-900 border-2 border-green-500 z-10" />
    <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-xl hover:border-green-500/30 transition-all">
      <div className="sm:hidden text-xs font-mono text-green-500 mb-2">{data.period}</div>
      <h3 className="text-xl font-bold text-white mb-1">{data.role || data.degree}</h3>
      <div className="text-zinc-400 mb-4 font-medium">{data.company || data.school}</div>
      {Array.isArray(data.details) ? (
        <ul className="space-y-2">
          {data.details.map((point, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-zinc-400">
              <span className="text-green-500 mt-1">▹</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      ) : <p className="text-sm text-zinc-400">{data.details}</p>}
    </div>
  </div>
)

export default function App() {
  const [activeTab, setActiveTab] = useState("all")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [typewriterText, setTypewriterText] = useState("")
  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentSubtitle = DATA.profile.subtitles[currentSubtitleIndex]
    const timer = setTimeout(() => {
      if (!isDeleting && typewriterText === currentSubtitle) {
        setTimeout(() => setIsDeleting(true), 2000)
      } else if (isDeleting && typewriterText === "") {
        setIsDeleting(false)
        setCurrentSubtitleIndex((prev) => (prev + 1) % DATA.profile.subtitles.length)
      } else {
        setTypewriterText(currentSubtitle.substring(0, typewriterText.length + (isDeleting ? -1 : 1)))
      }
    }, isDeleting ? 50 : 100)
    return () => clearTimeout(timer)
  }, [typewriterText, isDeleting, currentSubtitleIndex])

  return (
    <div className="min-h-screen bg-black text-gray-200 font-sans selection:bg-green-500/30">
      <MatrixBackground />
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50 border-b border-green-500/10">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-mono text-xl font-bold text-white flex items-center gap-2">
            <Terminal size={20} className="text-green-500" />
            <span>PARTH<span className="text-green-500">.SEC</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-xs font-medium uppercase tracking-widest">
            {["About", "Skills", "Experience", "Projects", "Tools", "Contact"].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-green-400 transition-colors">{item}</a>
            ))}
          </div>
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X /> : <Menu />}</button>
        </div>
      </nav>

      <section id="about" className="relative min-h-screen flex items-center justify-center px-6 pt-24">
        <div className="text-center max-w-4xl z-10">
          <div className="inline-block px-3 py-1 mb-6 text-xs font-mono text-green-400 bg-green-900/20 border border-green-500/30 rounded-full">
            System Online • Secure Connection Established
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8">
            Hello, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">{DATA.profile.name}</span>
          </h1>
          <div className="mb-8 flex justify-center">
            <div className="relative w-32 h-32 md:w-40 md:h-40">
              <img 
                src="https://raw.githubusercontent.com/parthbhagat1337/parth-portfolio/main/Parth-bhagat-photo.JPG" 
                alt="Parth" 
                className="w-full h-full rounded-full object-cover border-4 border-green-500/50" 
              />
              <div className="absolute inset-0 rounded-full ring-2 ring-green-400/30 animate-pulse" />
            </div>
          </div>
          <div className="h-12 mb-8 font-mono text-xl md:text-3xl text-zinc-400">
            &gt; <span className="text-green-500">{typewriterText}</span><span className="animate-pulse">_</span>
          </div>
          <p className="text-zinc-400 max-w-2xl mx-auto mb-10 text-lg">{DATA.profile.summary}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={`mailto:${DATA.profile.email}`} className="px-6 py-3 bg-green-500 text-black font-bold rounded flex items-center gap-2 hover:bg-green-400 transition-all"><Mail size={18} /> Contact Me</a>
            <a href={DATA.profile.github} target="_blank" className="px-6 py-3 bg-zinc-800 text-white rounded flex items-center gap-2 hover:text-green-400 transition-all"><Github size={18} /> GitHub</a>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"><ChevronDown className="text-green-500" /></div>
      </section>

      <main className="container mx-auto px-6 py-12 space-y-24">
        <section id="skills" className="scroll-mt-24">
          <SectionHeading icon={Cpu}>Technical Arsenal</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <SkillCard title="Offensive Security" skills={DATA.skills.offensive} icon={Shield} />
            <SkillCard title="Cloud Security" skills={DATA.skills.cloud} icon={Server} />
            <SkillCard title="Defensive Ops" skills={DATA.skills.defensive} icon={Lock} />
            <SkillCard title="Development" skills={DATA.skills.dev} icon={Code} />
          </div>
        </section>

        <section id="experience" className="scroll-mt-24">
          <SectionHeading icon={Briefcase}>Mission Timeline</SectionHeading>
          <div className="max-w-4xl mx-auto">
            {DATA.experience.map((job, idx) => <TimelineItem key={idx} data={job} />)}
            <div className="my-12 flex items-center justify-center">
              <div className="h-px bg-zinc-800 w-full max-w-xs" />
              <span className="px-4 text-zinc-600 font-mono text-sm">ACADEMIC</span>
              <div className="h-px bg-zinc-800 w-full max-w-xs" />
            </div>
            {DATA.education.map((edu, idx) => <TimelineItem key={idx+10} data={edu} isLast={idx === DATA.education.length - 1} />)}
          </div>
        </section>

        <section id="contact" className="scroll-mt-24 max-w-3xl mx-auto text-center">
          <SectionHeading icon={Globe}>Establish Uplink</SectionHeading>
          <div className="flex flex-wrap justify-center gap-6 mt-10">
            <a href={`mailto:${DATA.profile.email}`} className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-green-500 transition-all">
               <Mail className="mx-auto mb-2" /> {DATA.profile.email}
            </a>
            <a href={DATA.profile.linkedin} target="_blank" className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-blue-500 transition-all">
               <Linkedin className="mx-auto mb-2" /> LinkedIn Profile
            </a>
          </div>
          <footer className="mt-20 pt-8 border-t border-zinc-900 text-zinc-600 text-sm font-mono">
            <p>© {new Date().getFullYear()} Parth Bhagat. All systems nominal.</p>
          </footer>
        </section>
      </main>
    </div>
  )
}
