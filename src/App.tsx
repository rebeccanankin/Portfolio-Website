import React, { useState, useEffect } from "react";
import {
  Github,
  Mail,
  MapPin,
  School,
  Terminal,
  Code2,
  BookOpen,
  Award,
  ChevronRight,
  Menu,
  X,
  Send,
  CheckCircle2,
  ArrowUpRight
} from "lucide-react";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import EducationTimeline from "./components/EducationTimeline";
import GuestbookSection from "./components/GuestbookSection";

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Form states
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("rebeccanankin21@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setFormLoading(true);
    setTimeout(() => {
      setFormLoading(false);
      setFormSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setFormSubmitted(false), 5000);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-zinc-300 flex flex-col font-sans relative selection:bg-zinc-800 selection:text-white">
      
      {/* Abstract Background Accents */}
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-zinc-900/20 via-transparent to-transparent pointer-events-none z-0"></div>
      <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-zinc-800/5 rounded-full filter blur-[120px] pointer-events-none"></div>
      <div className="absolute top-[55%] right-[5%] w-[500px] h-[500px] bg-zinc-700/5 rounded-full filter blur-[150px] pointer-events-none"></div>

      {/* FIXED HEADER NAVIGATION */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          scrolled
            ? "bg-[#080808]/90 backdrop-blur-md border-zinc-900 shadow-lg py-3.5"
            : "bg-transparent border-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-2.5 group" id="nav-logo">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-100 group-hover:bg-zinc-100 group-hover:text-zinc-950 transition duration-300">
              <Terminal className="w-4 h-4 font-bold" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-semibold text-xs tracking-wider text-zinc-100 leading-none group-hover:text-zinc-450 transition">
                REBECCA N. LAR
              </span>
              <span className="text-[9px] font-mono text-zinc-500 tracking-widest font-medium mt-1">
                B.Sc. COMPUTER SCIENCE
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-medium tracking-wider text-zinc-400">
            <a href="#about" className="hover:text-zinc-100 transition duration-205" id="nav-about">
              About
            </a>
            <a href="#skills" className="hover:text-zinc-100 transition duration-205" id="nav-skills">
              Skills
            </a>
            <a href="#projects" className="hover:text-zinc-100 transition duration-205" id="nav-projects">
              Projects
            </a>
            <a href="#timeline" className="hover:text-zinc-100 transition duration-205" id="nav-timeline">
              Timeline
            </a>
            <a href="#guestbook" className="hover:text-zinc-100 transition duration-205" id="nav-guestbook">
              Guestbook
            </a>
            <a
              href="#contact"
              className="py-2.5 px-4.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-950 font-semibold text-xs transition duration-300"
              id="nav-contact-btn"
            >
              Contact Me
            </a>
          </nav>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-zinc-200 focus:outline-none"
            id="mobile-menu-trigger"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* MOBILE NAV PANEL */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-[#080808]/98 backdrop-blur-lg z-40 flex flex-col justify-center items-center gap-7 text-lg font-display font-medium text-zinc-300">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-5 right-5 p-2 text-zinc-400"
            id="mobile-menu-close"
          >
            <X className="w-6 h-6" />
          </button>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-zinc-100 transition"
          >
            About
          </a>
          <a
            href="#skills"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-zinc-100 transition"
          >
            Skills
          </a>
          <a
            href="#projects"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-zinc-100 transition"
          >
            Projects
          </a>
          <a
            href="#timeline"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-zinc-100 transition"
          >
            Timeline
          </a>
          <a
            href="#guestbook"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-zinc-100 transition"
          >
            Guestbook
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="py-3 px-8 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-950 text-sm font-semibold transition"
          >
            Contact Me
          </a>
        </div>
      )}

      {/* HERO SECTION */}
      <section id="hero" className="relative pt-36 pb-20 md:py-40 flex items-center justify-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Hero Left Info */}
          <div className="lg:col-span-7 space-y-7">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-zinc-400 block"></span>
              <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-500 uppercase">
                Active Level 100 • Second Semester Student
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-zinc-100 tracking-tight leading-[1.1]" id="hero-title">
                Hello, I'm <br />
                <span className="bg-gradient-to-r from-zinc-100 via-zinc-300 to-zinc-500 bg-clip-text text-transparent">
                  Rebecca Nankin Lar
                </span>
              </h1>
              <p className="text-base md:text-lg font-display text-zinc-400 font-light max-w-xl">
                Learning Software Engineering and Computing Foundations at Miva Open University.
              </p>
            </div>

            <p className="text-xs md:text-sm text-zinc-500 leading-relaxed max-w-xl">
              An aspiring Computer Science student based in Abuja, Nigeria. I am learning to pair structural mathematical
              logic with modern programming tools like React, Tailwind, and Python. Currently focused on building my first software applications, I enjoy designing practical, regional solutions for Abuja communities.
            </p>

            {/* Quick Contacts / Badges */}
            <div className="flex flex-wrap gap-x-5 gap-y-3 text-[11px] text-zinc-500 font-mono pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                <span>Dutse Sokale, Abuja, NG</span>
              </div>
              <div className="flex items-center gap-2">
                <School className="w-3.5 h-3.5 text-zinc-500" />
                <span>Miva Open University</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-zinc-500" />
                <span>Passionate Learner</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <a
                href="#projects"
                className="py-3 px-6 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-950 font-semibold text-xs flex items-center justify-center gap-2 transition"
                id="hero-cta-primary"
              >
                <Code2 className="w-4 h-4" /> Run Projects Simulators
              </a>
              <a
                href="#contact"
                className="py-3 px-6 rounded-xl bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800 text-zinc-300 font-medium text-xs flex items-center justify-center gap-2 transition"
                id="hero-cta-secondary"
              >
                Get in Touch <ChevronRight className="w-4 h-4 text-zinc-500" />
              </a>
            </div>
          </div>

          {/* Hero Right Card (Interactive Visual Terminal Profile) */}
          <div className="lg:col-span-5 relative w-full max-w-md mx-auto">
            <div className="absolute inset-0 bg-gradient-to-tr from-zinc-700/10 to-zinc-900/10 rounded-2xl blur-2xl opacity-35"></div>
            
            <div className="relative bg-[#0c0c0c] rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden font-mono text-[11px]">
              
              {/* Header */}
              <div className="bg-zinc-950 px-4 py-3 border-b border-zinc-900 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-zinc-800"></div>
                  <div className="w-2 h-2 rounded-full bg-zinc-700"></div>
                  <div className="w-2 h-2 rounded-full bg-zinc-600"></div>
                </div>
                <span className="text-[9px] text-zinc-500 font-medium">rebecca_profile_matrix.sh</span>
              </div>

              {/* Body */}
              <div className="p-5 space-y-4 text-zinc-400">
                <div className="space-y-1">
                  <span className="text-zinc-650 text-[10px]"># Academic Identification</span>
                  <p>
                    <span className="text-zinc-500">STUDENT_NAME</span>="Rebecca Nankin Lar"
                  </p>
                  <p>
                    <span className="text-zinc-500">INSTITUTION</span>="Miva Open University"
                  </p>
                  <p>
                    <span className="text-zinc-500">MATRIC_STATUS</span>="L100, Semester 2"
                  </p>
                  <p>
                    <span className="text-zinc-500">COURSE_LOAD</span>=["CSS 121", "CSS 122", "MTH 112"]
                  </p>
                </div>

                <div className="space-y-1 pt-2 border-t border-zinc-900">
                  <span className="text-zinc-650 text-[10px]"># Geolocation Metrics</span>
                  <p>
                    <span className="text-zinc-400">REGION</span>="Federal Capital Territory, Abuja"
                  </p>
                  <p>
                    <span className="text-zinc-400">ADDRESS</span>="Dutse Sokale, Bwari Area Council"
                  </p>
                </div>

                <div className="space-y-1 pt-2 border-t border-zinc-900">
                  <span className="text-zinc-650 text-[10px]"># Contact Channels</span>
                  <p>
                    <span className="text-zinc-300">EMAIL</span>="rebeccanankin21@gmail.com"
                  </p>
                  <p>
                    <span className="text-zinc-300">GITHUB</span>="rebeccanankin21"
                  </p>
                </div>

                <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-900 space-y-1 text-[10px]">
                  <span className="text-zinc-300 font-semibold">Miva_System_Prompt:~$</span>
                  <p className="text-zinc-500 animate-pulse">Ready to compile and debug regional problems.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ABOUT REBECCA SECTION */}
      <section id="about" className="py-20 border-t border-zinc-900 bg-zinc-950/20 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="relative aspect-video lg:aspect-square bg-[#0c0c0c] rounded-2xl border border-zinc-800 overflow-hidden flex flex-col justify-between p-6">
              <div className="absolute top-0 right-0 p-3">
                <BookOpen className="w-8 h-8 text-zinc-100/10" />
              </div>
              
              <div className="space-y-2">
                <div className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 font-bold">Miva Open University</div>
                <h3 className="text-lg font-display font-medium text-zinc-100">B.Sc. Computer Science</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Miva University is a pioneering, highly flexible digital institution licensed by the National
                  Universities Commission (NUC) of Nigeria. It facilitates real-time, online high-standard coursework matching top international syllabi.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-900 flex items-center justify-between text-[10px] font-mono text-zinc-600">
                <span>Flexible Online Pathway</span>
                <span className="text-zinc-400 font-semibold">Abuja Hub</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold uppercase text-zinc-500 tracking-wider">My Background & Core Focus</span>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-zinc-100">
                Pioneering Software Solutions from Dutse Sokale, Abuja
              </h2>
            </div>

            <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
              Being a first-year Computer Science student at Miva University gives me a unique advantage: combining 
              NUC-accredited computer architecture theories with active programming exercises. Situated in the Dutse Sokale region of Abuja, I experience daily the local infrastructural issues—such as transport route delays and budgeting constraints. 
            </p>

            <p className="text-xs md:text-sm text-zinc-500 leading-relaxed">
              I am driven to utilize discrete mathematics, database design, and procedural algorithm structures to resolve 
              real-world challenges. Whether writing robust python command shell scripts to optimize finance tracking, or writing Dijkstra models to simulate local public transport routes, my aim is to make technology responsive, useful, and fully functional.
            </p>

            {/* Quick stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
              <div className="bg-zinc-900/30 border border-zinc-800 p-4 rounded-xl text-center">
                <div className="text-xl font-display font-semibold text-zinc-100">Semester 2</div>
                <div className="text-[9px] text-zinc-500 font-medium uppercase tracking-wider mt-1">Current Term</div>
              </div>
              <div className="bg-zinc-900/30 border border-zinc-800 p-4 rounded-xl text-center">
                <div className="text-xl font-display font-semibold text-zinc-200">100%</div>
                <div className="text-[9px] text-zinc-500 font-medium uppercase tracking-wider mt-1">Miva Attendance</div>
              </div>
              <div className="bg-zinc-900/30 border border-zinc-800 p-4 rounded-xl text-center col-span-2 sm:col-span-1">
                <div className="text-xl font-display font-semibold text-zinc-350">Abuja</div>
                <div className="text-[9px] text-zinc-500 font-medium uppercase tracking-wider mt-1">Geographic Base</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="py-20 max-w-7xl mx-auto px-4 md:px-8 border-t border-zinc-900">
        <SkillsSection />
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="py-20 border-t border-zinc-900 bg-zinc-950/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <ProjectsSection />
        </div>
      </section>

      {/* TIMELINE SECTION */}
      <section id="timeline" className="py-20 max-w-7xl mx-auto px-4 md:px-8 border-t border-zinc-900">
        <EducationTimeline />
      </section>

      {/* GUESTBOOK SECTION */}
      <section id="guestbook" className="py-20 border-t border-zinc-900 bg-zinc-950/20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <GuestbookSection />
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-20 border-t border-zinc-900 max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold uppercase text-zinc-500 tracking-wider">Get in Touch</span>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-zinc-100">
                Let's Collaborate On Core Projects
              </h2>
            </div>

            <p className="text-xs md:text-sm text-zinc-500 leading-relaxed">
              I am open to junior internships, study-circle partnerships, open-source projects, and regional tech problem solving.
              Feel free to copy my direct email, reach out via Github, or drop a prompt.
            </p>

            {/* Quick Contact Cards */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleCopyEmail}
                className="w-full bg-[#0c0c0c] hover:bg-zinc-900/60 border border-zinc-800 p-4 rounded-xl flex items-center justify-between text-left transition duration-200 group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-zinc-950 rounded-lg border border-zinc-900 text-zinc-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[9px] text-zinc-500 font-mono">DIRECT EMAIL</div>
                    <div className="text-xs text-zinc-200 font-semibold font-mono">rebeccanankin21@gmail.com</div>
                  </div>
                </div>
                <span className="text-[10px] bg-zinc-900 text-zinc-300 px-2.5 py-1 rounded-md border border-zinc-800 font-semibold group-hover:bg-zinc-100 group-hover:text-zinc-950 transition">
                  {copiedEmail ? "Copied!" : "Copy Address"}
                </span>
              </button>

              <div className="bg-[#0c0c0c] border border-zinc-800 p-4 rounded-xl flex items-center gap-3">
                <div className="p-2 bg-zinc-950 rounded-lg border border-zinc-900 text-zinc-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[9px] text-zinc-500 font-mono">ADDRESS / GEOLOCATION</div>
                  <div className="text-xs text-zinc-200 font-semibold font-sans">Dutse Sokale, Abuja, FCT, Nigeria</div>
                </div>
              </div>

              <a
                href="https://github.com/rebeccanankin21"
                target="_blank"
                rel="noreferrer"
                className="block bg-[#0c0c0c] hover:bg-zinc-900/60 border border-zinc-800 p-4 rounded-xl flex items-center gap-3 transition"
              >
                <div className="p-2 bg-zinc-950 rounded-lg border border-zinc-900 text-zinc-400">
                  <Github className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[9px] text-zinc-500 font-mono">GITHUB PROFILE</div>
                  <div className="text-xs text-zinc-200 font-semibold font-mono flex items-center gap-1">
                    github.com/rebeccanankin21 <ArrowUpRight className="w-3.5 h-3.5 text-zinc-600" />
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Form container */}
          <div className="lg:col-span-7">
            <form onSubmit={handleFormSubmit} className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800/80 space-y-4">
              <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Send a Direct Message</div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[9px] text-zinc-500 block mb-1 uppercase font-mono">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-zinc-900/30 border border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-200 outline-none focus:border-zinc-500"
                  />
                </div>
                <div>
                  <label className="text-[9px] text-zinc-500 block mb-1 uppercase font-mono">Your Email</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. johndoe@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-zinc-900/30 border border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-200 outline-none focus:border-zinc-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-[9px] text-zinc-500 block mb-1 uppercase font-mono">Subject</label>
                <input
                  type="text"
                  placeholder="e.g. Collab Project"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-zinc-900/30 border border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-200 outline-none focus:border-zinc-500"
                />
              </div>

              <div>
                <label className="text-[9px] text-zinc-500 block mb-1 uppercase font-mono">Your Message</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Type your message here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-zinc-900/30 border border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-200 outline-none focus:border-zinc-500 resize-none"
                ></textarea>
              </div>

              {formSubmitted && (
                <div className="bg-zinc-900/80 border border-zinc-800 p-3 rounded-lg flex items-center gap-2 text-zinc-300 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                  <span>Thank you! Your message was simulated successfully. I will reach out shortly.</span>
                </div>
              )}

              <button
                type="submit"
                disabled={formLoading}
                className="w-full py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-950 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 transition"
              >
                {formLoading ? (
                  <>Simulating message transmission...</>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 text-zinc-950" /> Submit Message
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-zinc-950/60 border-t border-zinc-900 py-8 text-center text-zinc-500 text-[11px] relative z-10 font-mono">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display font-medium text-zinc-300">REBECCA NANKIN LAR</span>
            <span className="text-zinc-800">|</span>
            <span>Miva Open University Portfolio</span>
          </div>
          <div className="flex items-center gap-5 text-zinc-400">
            <a href="mailto:rebeccanankin21@gmail.com" className="hover:text-zinc-100 transition">rebeccanankin21@gmail.com</a>
            <span>•</span>
            <a href="https://github.com/rebeccanankin21" target="_blank" rel="noreferrer" className="hover:text-zinc-100 transition">GitHub</a>
          </div>
          <div>
            <p>© {new Date().getFullYear()} Rebecca Nankin Lar. Designed with high-contrast precision.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
