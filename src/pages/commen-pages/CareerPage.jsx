import React, { useState } from "react";
import {
  Briefcase,
  Zap,
  Users,
  Target,
  Code2,
  Server,
  ClipboardCheck,
  CheckCircle2,
  Mail,
  ChevronDown,
  ArrowRight,
  Rocket,
} from "lucide-react";
import "../../CSS/utils/theme.css";
import "../../CSS/careerPage.css";

const jobs = [
  {
    id: 1,
    icon: <Code2 size={22} />,
    title: "Frontend Developer",
    tag: "React",
    type: "Full-Time · Remote",
    desc: "You'll build user-facing features like room listings, search, filters, and dashboards.",
    skills: [
      "Strong React fundamentals",
      "Clean HTML, CSS, JavaScript",
      "Experience with REST APIs",
    ],
  },
  {
    id: 2,
    icon: <Server size={22} />,
    title: "Backend Developer",
    tag: "Java / Spring",
    type: "Full-Time · Remote",
    desc: "You'll work on APIs, authentication, payments, and data reliability.",
    skills: [
      "Java + Spring Boot",
      "JPA / MySQL knowledge",
      "API design & security basics",
    ],
  },
  {
    id: 3,
    icon: <ClipboardCheck size={22} />,
    title: "Operations & Field Executive",
    tag: "Field",
    type: "Full-Time · On-site",
    desc: "You'll verify rooms, coordinate with owners, and ensure listing accuracy.",
    skills: [
      "Good communication skills",
      "Comfortable with field work",
      "Basic smartphone usage",
    ],
  },
];

const whyUs = [
  {
    icon: <Target size={20} />,
    text: "Real-world problems, not demo projects",
  },
  { icon: <Zap size={20} />, text: "Fast execution, minimal meetings" },
  { icon: <Users size={20} />, text: "Direct impact on users' daily lives" },
  {
    icon: <Rocket size={20} />,
    text: "Ownership over features, not just tasks",
  },
];

const expectations = [
  "You take responsibility — no excuses",
  "You learn fast and adapt faster",
  "You don't wait to be told everything",
  "You care about users, not just salary",
];

const CareerPage = () => {
  const [openJob, setOpenJob] = useState(null);

  return (
    <main className="career-page">
      {/* ===== HERO ===== */}
      <section className="career-hero-section">
        <div className="career-hero-content">
          <div className="career-badge">
            <Briefcase size={13} /> We're Hiring
          </div>
          <h1>
            Build Products That Solve{" "}
            <span className="career-highlight">Real Problems</span>
          </h1>
          <p className="career-intro">
            We're building a room-rental platform that removes brokers, fake
            listings, and wasted time. If you want comfort, corporate perks, or
            spoon-feeding — this is not for you.
          </p>
          <a href="#open-positions" className="career-cta-btn">
            See Open Positions <ArrowRight size={16} />
          </a>
        </div>
        <div className="career-hero-img-wrap">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80"
            alt="Startup team working together"
          />
        </div>
      </section>

      {/* ===== WHY US ===== */}
      <section className="career-section">
        <div className="career-section-label">
          <Zap size={14} /> Why Join Us
        </div>
        <h2>Why Work With Us?</h2>
        <div className="why-grid">
          {whyUs.map((item, i) => (
            <div className="why-card" key={i}>
              <span className="why-icon">{item.icon}</span>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== OPEN POSITIONS ===== */}
      <section className="career-section" id="open-positions">
        <div className="career-section-label">
          <Briefcase size={14} /> Open Roles
        </div>
        <h2>Open Positions</h2>
        <div className="jobs-list">
          {jobs.map((job) => {
            const isOpen = openJob === job.id;
            return (
              <div key={job.id} className={`job-card ${isOpen ? "open" : ""}`}>
                <div
                  className="job-card-header"
                  onClick={() => setOpenJob(isOpen ? null : job.id)}
                >
                  <div className="job-card-left">
                    <span className="job-icon">{job.icon}</span>
                    <div>
                      <h3>{job.title}</h3>
                      <div className="job-meta">
                        <span className="job-tag">{job.tag}</span>
                        <span className="job-type">{job.type}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`job-chevron ${isOpen ? "open" : ""}`}
                  />
                </div>

                <div className={`job-card-body ${isOpen ? "open" : ""}`}>
                  <p className="job-desc">{job.desc}</p>
                  <ul className="job-skills">
                    {job.skills.map((skill, i) => (
                      <li key={i}>
                        <CheckCircle2 size={14} /> {skill}
                      </li>
                    ))}
                  </ul>
                  <div className="coming-soon-btn">
                    <Rocket size={15} /> Applications Opening Soon
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===== CULTURE IMAGE ===== */}
      <section className="career-culture-section">
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
          alt="Startup work culture"
          className="culture-img"
        />
        <div className="culture-overlay">
          <p>"Move fast, own your work, and build for real users."</p>
        </div>
      </section>

      {/* ===== EXPECTATIONS ===== */}
      <section className="career-section">
        <div className="career-section-label">
          <Target size={14} /> No Sugarcoating
        </div>
        <h2>What We Expect</h2>
        <div className="expect-list">
          {expectations.map((item, i) => (
            <div className="expect-item" key={i}>
              <span className="expect-number">0{i + 1}</span>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== HOW TO APPLY ===== */}
      <section className="career-section">
        <div className="career-section-label">
          <Mail size={14} /> Apply Now
        </div>
        <h2>How to Apply</h2>
        <div className="apply-card">
          <Mail size={28} />
          <div>
            <p>
              Send your resume and a short intro explaining why you want to work
              on a room-rental product — not just <em>"I need a job"</em>.
            </p>
            <a href="mailto:careers@roomsdekho.com" className="apply-email">
              careers@roomsdekho.com
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CareerPage;
