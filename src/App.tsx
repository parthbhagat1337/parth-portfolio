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
    offensive: ["Red Teaming", "VAPT", "Web Pentesting", "Mobile Security", "API Security", "C2 Frameworks", "Active Directory", "MITRE ATT&CK"],
    defensive: ["Threat Hunting", "Incident Response", "IBM QRadar", "SOC Radar", "Digital Forensics", "Wireshark", "FTK", "SIEM"],
    cloud: ["AWS Security", "GuardDuty", "Terraform", "Ansible", "CI/CD Security", "IAM", "Azure/GCP", "Network Security"],
    dev: ["Python", "Bash", "PowerShell", "SAST/DAST", "SonarQube", "Semgrep", "Burp Suite", "Secure Coding"],
  },
  experience: [
    {
      id: 1,
      role: "Jr. Security Engineer",
      company: "ESDS Software Solutions Limited",
      period: "Jun 2022 - Feb 2024 | Nashik, India",
      details: [
        "Internal Red Teaming: Designed and executed attack simulations using Havoc C2 and post-exploitation techniques.",
        "Attack Surface Discovery: Conducted continuous discovery across Linux/Windows, identifying shadow systems and misconfigurations.",
        "Collaboration: Worked with SOC teams to improve detection logic and presented results to senior stakeholders.",
        "VAPT Operations: Led engagements for BFSI, Government, and Enterprise clients.",
        "Compliance: Supported ISO 27001 (ISMS), SOC1, SOC2, and PCI-DSS compliance audits.",
        "Threat Hunting: Optimized SIEM (IBM QRadar) detection rules and delivered forensic analysis."
      ],
    },
    {
      id: 2,
      role: "Cybersecurity Red Team Analyst",
      company: "WhiteBand Associates",
      period: "Jun 2021 - May 2022 | Nashik, India",
      details: [
        "VAPT Support: Assisted in security engagements covering web applications, servers, and Active Directory.",
        "Offensive Tasks: Performed reconnaissance, scanning, and exploitation validation.",
        "Training Delivery: Guided trainees through hands-on offensive/defensive exercises.",
        "Infrastructure: Maintained physical and virtual lab environments (Linux/Windows).",
        "Documentation: Prepared technical notes and assessment findings summaries."
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
        "[+] Automated Container Deployment using Terraform and GitHub CI/CD.",
        "[+] Forensic Investigation using FTK, Autopsy, and Wireshark."
      ],
    },
    {
      id: 2,
      degree: "B.Tech in Computer Science & Engineering",
      school: "Sandip University, India",
      period: "Jun 2019 - Jun 2022",
      details: "Key learnings: Programming, Web technologies, Servers, Linux, and Networking.",
    },
  ] as ExperienceItem[],
  certifications: [
    "Certified Cybersecurity Professional (ISC2)",
    "Certified Ethical Hacker (CEH v12 equiv)",
    "Red Hat Certified Engineer (RHCE)",
    "Cisco Certified Network Associate (CCNA)",
    "CompTIA A+ & N+",
    "Fortinet NSE 3 Associate",
  ],
  projects: [
    {
      title: "ML-Based C2 Detection",
      category: "AI Security",
      desc: "Detecting Encrypted Havoc C2 Communication using Machine Learning Models (SVM, XGBoost).",
      tech: ["Python", "ML", "Wireshark", "Havoc C2"],
    },
    {
      title: "Secure Chat Application",
      category: "Development",
      desc: "End-to-End Encrypted chat app implementing asymmetric cryptography and WebSockets.",
      tech: ["Python", "Cryptography", "WebSockets"],
    },
    {
      title: "Automated Cloud Deployment",
      category: "Cloud",
      desc: "Secure containerized deployment pipeline using Terraform IaC and Ansible on AWS.",
      tech: ["Terraform", "Ansible", "AWS", "GitHub Actions"],
    },
  ] as Project[],
  tools: [
    { category: "Security Testing", items: ["Nessus", "Metasploit", "Burp Suite", "Nmap", "Wireshark"] },
    { category: "SIEM & Monitoring", items: ["IBM QRadar", "Secone", "Log Analysis", "Correlation"] },
    { category: "Red Team Tools", items: ["Sliver", "Havoc C2", "BloodHound", "Mimikatz"] },
    { category: "Forensics", items: ["Autopsy", "FTK", "Cuckoo Sandbox", "Volatility"] },
  ] as ToolCategory[],
}

// --- Components ---

const MatrixBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    let width = window.innerWidth; let height = window.innerHeight;
    canvas.width = width; canvas.height = height;
    const alphabet = "01ABCDEFGHIJKLMNOPQRSTUVWXYZアカサタナハマヤラワ";
    const fontSize = 16; const columns = width / fontSize;
    const rainDrops: number[] = Array(Math.floor(columns)).fill(1);
    const draw = () => {
      ctx.fillStyle = "rgba(10, 10, 10, 0.05)"; ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = "#0F0"; ctx.font = fontSize + "px monospace";
      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
        if (rainDrops[i] * fontSize > height && Math.random() > 0.975) rainDrops[i] = 0;
        rainDrops[i]++;
      }
    };
    const interval = setInterval(draw, 30);
    const handleResize = () => { width = window.innerWidth; height = window.innerHeight; canvas.width = width; canvas.height = height; };
    window.addEventListener("resize", handleResize);
    return () => { clearInterval(interval); window.removeEventListener("resize", handleResize); };
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
            {["About", "Experience", "Projects", "Tools", "Contact"].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-green-400 transition-colors">{item}</a>
            ))}
          </div>
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X /> : <Menu />}</button>
        </div>
      </nav>

      <section id="about" className="relative min-h-screen flex items-center justify-center px-6 pt-24">
        <div className="text-center max-w-4xl z-10">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8">
            Hello, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">{DATA.profile.name}</span>
          </h1>
          <div className="mb-8 flex justify-center">
            <div className="relative w-32 h-32 md:w-40 md:h-40">
              <img src="https://raw.githubusercontent.com/parthbhagat1337/parth-portfolio/main/Parth-bhagat-photo.JPG" alt="Parth" className="w-full h-full rounded-full object-cover border-4 border-green-500/50" />
              <div className="absolute inset-0 rounded-full ring-2 ring-green-400/30 animate-pulse" />
            </div>
          </div>
          <div className="h-12 mb-8 font-mono text-xl md:text-3xl text-zinc-400">
            &gt; <span className="text-green-500">{typewriterText}</span><span className="animate-pulse">_</span>
          </div>
          <p className="text-zinc-400 max-w-2xl mx-auto mb-10 text-lg leading-relaxed">{DATA.profile.summary}</p>
          <div className="flex justify-center gap-4">
            <a href={`mailto:${DATA.profile.email}`} className="px-6 py-3 bg-green-500 text-black font-bold rounded flex items-center gap-2 hover:bg-green-400 transition-all"><Mail size={18} /> Contact</a>
            <a href={DATA.profile.github} target="_blank" className="px-6 py-3 bg-zinc-800 text-white rounded flex items-center gap-2 hover:text-green-400 transition-all"><Github size={18} /> GitHub</a>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-6 py-12 space-y-24">
        <section id="experience" className="scroll-mt-24">
          <SectionHeading icon={Briefcase}>Mission Timeline</SectionHeading>
          <div className="max-w-4xl mx-auto space-y-8">
            {DATA.experience.map((job) => (
              <div key={job.id} className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-xl">
                <div className="text-green-500 font-mono text-sm mb-2">{job.period}</div>
                <h3 className="text-xl font-bold text-white">{job.role}</h3>
                <div className="text-zinc-400 mb-4">{job.company}</div>
                <ul className="space-y-2">
                  {(job.details as string[]).map((d, i) => (
                    <li key={i} className="text-sm text-zinc-400 flex gap-2">
                      <span className="text-green-500">▹</span>{d}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="text-center text-zinc-600 font-mono text-sm py-4">ACADEMIC HISTORY</div>
            {DATA.education.map((edu) => (
              <div key={edu.id} className="bg-zinc-900/20 border border-zinc-800/50 p-6 rounded-xl">
                <div className="text-zinc-500 font-mono text-sm mb-2">{edu.period}</div>
                <h3 className="text-lg font-bold text-white">{edu.degree}</h3>
                <div className="text-zinc-500 mb-4">{edu.school}</div>
                {Array.isArray(edu.details) && (
                  <ul className="space-y-1">
                    {edu.details.map((d, i) => <li key={i} className="text-xs text-zinc-500 flex gap-2"><span>+</span>{d}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        <section id="certifications" className="scroll-mt-24">
          <SectionHeading icon={Award}>Certifications</SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {DATA.certifications.map((cert, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-zinc-900/50 border border-zinc-800 rounded">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-sm text-zinc-300">{cert}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="scroll-mt-24">
          <SectionHeading icon={Database}>Classified Projects</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DATA.projects.map((p, i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl hover:border-green-500/50 transition-all">
                <div className="text-xs font-mono text-green-500 mb-2">{p.category}</div>
                <h3 className="text-xl font-bold text-white mb-3">{p.title}</h3>
                <p className="text-zinc-400 text-sm mb-4">{p.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tech.map((t, j) => <span key={j} className="text-xs text-zinc-500">#{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="tools" className="scroll-mt-24">
          <SectionHeading icon={Terminal}>Tools & Arsenal</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {DATA.tools.map((tg, i) => (
              <div key={i} className="bg-zinc-900/50 border border-green-500/20 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-green-400 mb-4 font-mono">{tg.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {tg.items.map((item, j) => <span key={j} className="px-2 py-1 bg-black text-xs text-zinc-300 rounded border border-zinc-800">{item}</span>)}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="text-center py-12">
          <SectionHeading icon={Globe}>Establish Uplink</SectionHeading>
          <div className="flex justify-center gap-6 mt-8">
            <a href={DATA.profile.linkedin} target="_blank" className="hover:text-blue-500 transition-colors"><Linkedin size={32} /></a>
            <a href={`mailto:${DATA.profile.email}`} className="hover:text-green-500 transition-colors"><Mail size={32} /></a>
            <a href={DATA.profile.github} target="_blank" className="hover:text-gray-400 transition-colors"><Github size={32} /></a>
          </div>
          <p className="mt-12 text-zinc-600 font-mono text-sm">© {new Date().getFullYear()} Parth Bhagat. All systems nominal.</p>
        </section>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }
      `}} />
    </div>
  )
}
