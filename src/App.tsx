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
  Mic2,
  Users,
  ExternalLink,
  Send,
  type LucideIcon,
} from "lucide-react"

// --- Types & Interfaces --- 

interface Project {
  title: string
  category: string
  desc: string
  tech: string[]
  link?: string
}

interface ExperienceItem {
  id: number
  role?: string
  degree?: string
  company?: string
  school?: string
  period: string
  details: string[]
}

// --- Assets & Data ---

const DATA = {
  profile: {
    name: "Parth Dinesh Bhagat",
    subtitles: ["Red Team Specialist", "Offensive Security Expert", "Threat Hunter", "CyberSecurity Architect"],
    email: "parthp1337@gmail.com",
    linkedin: "https://www.linkedin.com/in/parth-bhagat-386954113/",
    github: "https://github.com/parthbhagat1337",
    summary: "Cybersecurity Engineer with hands-on experience in offensive security, threat detection, and network security. Specialized in VAPT, Red Teaming, and Incident Response, with a focus on aligning technical defenses with business objectives."
  },
  experience: [
    {
      id: 1,
      role: "Jr. Security Engineer",
      company: "ESDS Software Solutions Limited",
      period: "Jun 2022 - Feb 2024",
      details: [
        "Internal Red Teaming: Executed simulations using Havoc C2 to test security resilience.",
        "Attack Surface Discovery: Identified shadow systems and misconfigurations across Linux/Windows.",
        "VAPT Ops: Led security engagements for BFSI and Government clients.",
        "SIEM & IR: Optimized IBM QRadar rules and handled forensic breach responses."
      ],
    },
    {
      id: 2,
      role: "Cybersecurity Red Team Analyst",
      company: "WhiteBand Associates",
      period: "Jun 2021 - May 2022",
      details: [
        "VAPT Support: Assisted in Active Directory and Web App security assessments.",
        "Infrastructure: Maintained virtual lab environments for attack-defense simulations.",
        "Security Training: Guided junior trainees through hands-on offensive security exercises."
      ],
    }
  ],
  training: [
    {
      role: "Cybersecurity Instructor",
      org: "WhiteBand Associates & Sandip University",
      points: [
        "Instruction: Teaching Advanced Cybersecurity and Ethical Hacking at Sandip University and WhiteBand Associates.",
        "Training: Conducted corporate security awareness programs focused on phishing prevention and incident hygiene.",
        "Lab Design: Developing practical, lab-based training modules for offensive security and network defense."
      ]
    }
  ],
  talks: [
    {
      event: "DUBSEC Conference Speaker",
      topic: "SSH Tunneling & Secure Remote Access",
      desc: "Delivered a technical talk at the Dublin Security Conference covering advanced tunneling techniques and secure data exfiltration bypasses."
    }
  ],
  projects: [
    {
      title: "Secure Network Design",
      category: "Infrastructure",
      desc: "Architected a fortified, high-availability network for a mid-sized outsourcing firm, implementing VLAN segmentation and firewall redundancy.",
      tech: ["Network Design", "Security Architecture", "Firewalls"],
      link: "https://www.linkedin.com/posts/parth-bhagat-386954113_networking-networkdesign-itinfrastructure-activity-7303813046840254465-jTej"
    },
    {
      title: "CTOS WiFi Radar",
      category: "Mobile",
      desc: "Android app for Wi-Fi reconnaissance; implements 7 WPS pin-guessing algorithms including AI-assisted prediction.",
      tech: ["Java/Kotlin", "Android SDK", "WiFi Protocols", "AI"],
    },
    {
      title: "Smart Mirror IoT",
      category: "IoT",
      desc: "Raspberry Pi-powered smart mirror with a Node.js backend. Features modular dashboard auto-launch on boot.",
      tech: ["Raspberry Pi", "Node.js", "IoT", "Linux"],
    },
    {
      title: "ML C2 Detection",
      category: "AI Security",
      desc: "Detection of encrypted Havoc C2 traffic using SVM and XGBoost machine learning models.",
      tech: ["Python", "Machine Learning", "Network Analysis"],
    }
  ] as Project[],
  tools: [
    { 
      category: "Security Testing", 
      items: ["Nessus", "Metasploit Pro", "Burp Suite", "Nmap", "Wireshark", "Custom Github Tools"] 
    },
    { 
      category: "SIEM & Monitoring", 
      items: ["Secone", "IBM QRadar", "Log Analysis", "Correlation Rules", "Custom Detection"] 
    },
    { 
      category: "Red Team Tools", 
      items: ["Sliver", "Havoc C2", "BloodHound", "CrackMapExec", "Mimikatz", "Web Shells"] 
    },
    { 
      category: "Code Security", 
      items: ["SonarQube", "Semgrep", "SAST/DAST", "Mobsf", "Sync"] 
    },
    { 
      category: "Forensics", 
      items: ["Autopsy", "FTK", "Cuckoo Sandbox", "Volatility", "Immunity Debugger"] 
    },
    { 
      category: "Scripting & Automation", 
      items: ["Python", "PowerShell", "Bash", "Windows Utilities", "Linux Utilities"] 
    },
    { 
      category: "OSINT & Recon", 
      items: ["Shodan", "Threat Intelligence", "IOC Management", "Intelx", "OSINT"] 
    }
  ]
}

// --- Components ---

const MatrixBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    let width = window.innerWidth; let height = window.innerHeight;
    canvas.width = width; canvas.height = height;
    const alphabet = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ";
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
    return () => clearInterval(interval);
  }, [])
  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 opacity-20 pointer-events-none" />
}

const SectionHeading = ({ children, icon: Icon }: { children: React.ReactNode, icon: LucideIcon }) => (
  <div className="flex items-center gap-3 mb-8">
    <div className="p-2 bg-green-500/10 rounded border border-green-500/30">
      <Icon className="text-green-500" size={24} />
    </div>
    <h2 className="text-2xl font-bold text-white tracking-widest uppercase font-mono">{children}</h2>
    <div className="h-px bg-green-500/20 flex-grow ml-4"></div>
  </div>
)

export default function App() {
  const [typewriterText, setTypewriterText] = useState("")
  const [subtitleIdx, setSubtitleIdx] = useState(0)

  useEffect(() => {
    const text = DATA.profile.subtitles[subtitleIdx]
    const timeout = setTimeout(() => {
      setTypewriterText(text.slice(0, typewriterText.length + 1))
      if (typewriterText === text) {
        setTimeout(() => {
          setTypewriterText("")
          setSubtitleIdx((subtitleIdx + 1) % DATA.profile.subtitles.length)
        }, 2000)
      }
    }, 100)
    return () => clearTimeout(timeout)
  }, [typewriterText, subtitleIdx])

  return (
    <div className="min-h-screen bg-black text-gray-300 font-sans selection:bg-green-500/30">
      <MatrixBackground />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-md z-50 border-b border-green-500/10 h-16 flex items-center px-6 justify-between">
        <div className="font-mono text-white font-bold flex items-center gap-2">
          <Terminal size={18} className="text-green-500" /> PARTH.SEC
        </div>
        <div className="flex gap-6 text-xs uppercase tracking-tighter">
          <a href="#experience" className="hover:text-green-500 transition-colors">Experience</a>
          <a href="#projects" className="hover:text-green-500 transition-colors">Projects</a>
          <a href="#tools" className="hover:text-green-500 transition-colors">Tools</a>
          <a href="#contact" className="hover:text-green-500 transition-colors">Contact</a>
        </div>
      </nav>

      {/* Hero */}
      <header className="pt-32 pb-20 px-6 text-center">
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <img src="https://raw.githubusercontent.com/parthbhagat1337/parth-portfolio/main/Parth-bhagat-photo.JPG" alt="Parth" className="w-32 h-32 rounded-full border-4 border-green-500/30 object-cover" />
            <div className="absolute inset-0 rounded-full ring-4 ring-green-500/10 animate-pulse" />
          </div>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{DATA.profile.name}</h1>
        <div className="font-mono text-xl text-green-500 h-8 mb-6 uppercase tracking-widest">
          {typewriterText}<span className="animate-pulse">_</span>
        </div>
        <p className="max-w-2xl mx-auto text-zinc-400 mb-8">{DATA.profile.summary}</p>
        <div className="flex justify-center gap-4">
          <a href={DATA.profile.linkedin} target="_blank" className="p-3 bg-zinc-900 rounded-lg hover:text-blue-400 border border-zinc-800 transition-all"><Linkedin /></a>
          <a href={`mailto:${DATA.profile.email}`} className="p-3 bg-zinc-900 rounded-lg hover:text-green-400 border border-zinc-800 transition-all"><Mail /></a>
        </div>
      </header>

      <main className="container mx-auto px-6 space-y-24 pb-20">
        
        {/* Experience Section */}
        <section id="experience">
          <SectionHeading icon={Briefcase}>Timeline</SectionHeading>
          <div className="grid gap-6">
            {DATA.experience.map(exp => (
              <div key={exp.id} className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-xl">
                <span className="text-green-500 font-mono text-xs">{exp.period}</span>
                <h3 className="text-xl font-bold text-white mt-1">{exp.role}</h3>
                <p className="text-zinc-500 mb-4">{exp.company}</p>
                <ul className="space-y-2 text-sm text-zinc-400">
                  {exp.details.map((d, i) => <li key={i} className="flex gap-2"><span>▹</span>{d}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Training and Mentorship */}
        <section id="training">
          <SectionHeading icon={Users}>Training and Mentorship</SectionHeading>
          <div className="grid gap-6">
            {DATA.training.map((ins, i) => (
              <div key={i} className="bg-zinc-900/30 border border-green-500/10 p-6 rounded-xl">
                <h3 className="text-lg font-bold text-white mb-2">{ins.role}</h3>
                <p className="text-green-500/70 text-sm mb-4 font-mono">{ins.org}</p>
                <ul className="space-y-3 text-sm">
                  {ins.points.map((p, j) => <li key={j} className="flex gap-2 text-zinc-400"><span>•</span>{p}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Talks Section */}
        <section id="talks">
          <SectionHeading icon={Mic2}>Talks</SectionHeading>
          {DATA.talks.map((s, i) => (
            <div key={i} className="bg-green-500/5 border border-green-500/20 p-6 rounded-xl">
              <h3 className="text-white font-bold">{s.event}</h3>
              <p className="text-green-500 text-sm font-mono mb-2">{s.topic}</p>
              <p className="text-sm text-zinc-400">{s.desc}</p>
            </div>
          ))}
        </section>

        {/* Projects Section */}
        <section id="projects">
          <SectionHeading icon={Database}>Projects</SectionHeading>
          <div className="grid md:grid-cols-2 gap-6">
            {DATA.projects.map((p, i) => (
              <div key={i} className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-xl hover:border-green-500/30 transition-all flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-mono text-green-500 bg-green-500/10 px-2 py-1 rounded">{p.category}</span>
                  {p.link && <a href={p.link} target="_blank" className="text-zinc-500 hover:text-white"><ExternalLink size={18}/></a>}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{p.title}</h3>
                <p className="text-sm text-zinc-400 mb-6 flex-grow">{p.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tech.map(t => <span key={t} className="text-[10px] text-zinc-500 uppercase tracking-widest border border-zinc-800 px-2 py-1 rounded">#{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tools & Technologies Section (Restored from image) */}
        <section id="tools">
          <SectionHeading icon={Cpu}>Tools & Technologies</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DATA.tools.map(tg => (
              <div key={tg.category} className="bg-zinc-900/50 border border-green-500/20 p-6 rounded-lg backdrop-blur-sm transition-all hover:border-green-500/50">
                <h4 className="text-sm font-bold text-green-400 mb-4 font-mono tracking-tight uppercase">{tg.category}</h4>
                <div className="flex flex-wrap gap-2">
                  {tg.items.map(item => (
                    <span key={item} className="text-xs text-white bg-zinc-800 px-3 py-1.5 rounded border border-zinc-700 hover:border-green-500/50 transition-colors">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="scroll-mt-24">
          <SectionHeading icon={Globe}>Establish Uplink</SectionHeading>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <p className="text-zinc-400">Encrypted communication lines are open. Reach out for security consulting, VAPT engagements, or technical instruction.</p>
              <div className="space-y-4">
                <a href={`mailto:${DATA.profile.email}`} className="flex items-center gap-4 p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg hover:border-green-500/50 transition-all">
                  <Mail className="text-green-500" />
                  <div>
                    <div className="text-[10px] font-mono uppercase text-zinc-500">Email</div>
                    <div className="text-sm text-white">{DATA.profile.email}</div>
                  </div>
                </a>
                <a href={DATA.profile.linkedin} target="_blank" className="flex items-center gap-4 p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg hover:border-blue-500/50 transition-all">
                  <Linkedin className="text-blue-500" />
                  <div>
                    <div className="text-[10px] font-mono uppercase text-zinc-500">LinkedIn</div>
                    <div className="text-sm text-white">Parth Bhagat</div>
                  </div>
                </a>
              </div>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="ID / NAME" className="w-full bg-zinc-900/50 border border-zinc-800 p-3 rounded font-mono text-xs focus:border-green-500 outline-none" />
              <input type="email" placeholder="CONTACT_EMAIL" className="w-full bg-zinc-900/50 border border-zinc-800 p-3 rounded font-mono text-xs focus:border-green-500 outline-none" />
              <textarea placeholder="SECURE_MESSAGE" rows={4} className="w-full bg-zinc-900/50 border border-zinc-800 p-3 rounded font-mono text-xs focus:border-green-500 outline-none resize-none"></textarea>
              <button className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-3 rounded flex items-center justify-center gap-2 text-xs uppercase transition-all">
                <Send size={14} /> Send Transmission
              </button>
            </form>
          </div>
        </section>

      </main>

      <footer className="text-center py-10 border-t border-zinc-900 text-zinc-600 text-[10px] font-mono uppercase tracking-[0.2em]">
        © {new Date().getFullYear()} Parth Bhagat // All Systems Nominal
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }
        html { scroll-behavior: smooth; }
      `}} />
    </div>
  )
}
