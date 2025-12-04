
import React from "react";
import HomeNav from "@/modules/Common/HomeNav/HomeNav";
import Footer from "@/modules/Common/Footer/Footer";
import { motion } from "framer-motion";

const BeACampus = () => {
  return (
    <div style={{ background: "linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <HomeNav />
      <main style={{ flex: 1, width: "100%", maxWidth: 900, margin: "0 auto", padding: "2rem 1rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <motion.img
          src={"/assets/careers/illustration.webp"}
          alt="Campus Illustration"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ width: "min(400px, 90vw)", marginBottom: 32, borderRadius: 24, boxShadow: "0 8px 32px rgba(80,80,180,0.08)" }}
        />
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          style={{ fontSize: "2.2rem", fontWeight: 800, textAlign: "center", color: "#2d2d4d", marginBottom: 16, lineHeight: 1.2 }}
        >
          μLearn Campus Chapters: Ignite Your Community, Build Your Future.
        </motion.h1>
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          style={{ background: "#fff", borderRadius: 18, boxShadow: "0 2px 16px rgba(80,80,180,0.07)", padding: "2rem 1.5rem", margin: "1rem 0", width: "100%", maxWidth: 800 }}
        >
          <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#4f46e5", marginBottom: 12 }}>1. Why Start a μLearn Campus Chapter?</h2>
          <ul style={{ marginBottom: 18 }}>
            <li style={{ marginBottom: 8 }}><b>For Students</b>
              <ul style={{ marginLeft: 18 }}>
                <li>Learn by doing: Earn <b>Karma Points</b> as proof-of-work, not paper certificates.</li>
                <li>Build peer-to-peer learning circles across domains (Tech, Non-Tech, Civic Tech, Culture).</li>
                <li>Internships, projects, and placements via <b>Launchpad</b> & <b>Top 100 Series</b>.</li>
                <li>Recognition in a <b>55,000+ strong community</b> + 400+ partner companies.</li>
              </ul>
            </li>
            <li style={{ marginBottom: 8 }}><b>For Colleges</b>
              <ul style={{ marginLeft: 18 }}>
                <li>Align with <b>Education 4.0</b> – industry-academia bridge.</li>
                <li>Proof of student skilling & community engagement for NAAC/CSR metrics.</li>
                <li>Connect to Kerala’s largest skilling and innovation ecosystem.</li>
              </ul>
            </li>
          </ul>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#4f46e5", marginBottom: 12 }}>2. Structure of a μLearn Campus Chapter</h2>
          <ul style={{ marginBottom: 18 }}>
            <li><b>Core Team (5–10 students):</b> Campus Champions trained through <i>Mutate</i> (leadership onboarding).</li>
            <li><b>Faculty Mentor:</b> One faculty member as anchor, ensuring continuity and credibility.</li>
            <li><b>Learning Circles:</b> Domain-focused peer groups — AI, Web Development, Design, Public Speaking, Civic Tech, etc.</li>
            <li><b>Chapter Lead:</b> Acts as coordinator between college chapter & μLearn Foundation.</li>
          </ul>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#4f46e5", marginBottom: 12 }}>3. What Does a Campus Chapter Do?</h2>
          <ul style={{ marginBottom: 18 }}>
            <li>Weekly <b>Learning Circles</b> (1-hour peer-led sessions).</li>
            <li>Monthly <b>Skill Challenges</b> & Proof-of-Work submissions.</li>
            <li>Quarterly <b>Innovation Sprints</b> (mini-In50Hours).</li>
            <li>Annual <b>Inter-chapter Meetups & μLearn Flagship Events</b> (Permute, Mutate, Amuse).</li>
            <li>Community-driven <b>CSR or social impact initiatives</b> in the local area.</li>
          </ul>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#4f46e5", marginBottom: 12 }}>4. The Chapter Journey (Step-by-Step)</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: 18 }}>
            {[
              { title: 'Interest Form', desc: 'Students/faculty express interest in creating a chapter.' },
              { title: 'Orientation', desc: 'μLearn Foundation conducts an induction session for the college.' },
              { title: 'Core Team Selection', desc: 'Students nominate/volunteer to form the initial μLearn team.' },
              { title: 'Official Onboarding', desc: 'Core team members attend Mutate (leadership onboarding).' },
              { title: 'Kick-off Event', desc: 'Chapter officially launches with an intro meetup + learning circle demo.' },
              { title: 'Sustain & Scale', desc: 'Regular cycles of challenges, learning circles, and collaborations.' },
              { title: 'Review & Recognition', desc: 'Chapters are spotlighted based on Karma, activities, and impact.' },
            ].map((step, idx) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                style={{
                  background: '#f1f5f9',
                  borderRadius: 16,
                  boxShadow: '0 2px 12px rgba(80,80,180,0.07)',
                  padding: '1.5rem 2rem',
                  minWidth: 220,
                  maxWidth: 500,
                  borderLeft: '6px solid #6366f1',
                  textAlign: 'left',
                  margin: '0 auto',
                  width: '100%',
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#4f46e5', marginBottom: 6 }}>{step.title}</div>
                <div style={{ color: '#2d2d4d', fontSize: '1rem' }}>{step.desc}</div>
              </motion.div>
            ))}
          </div>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#4f46e5", marginBottom: 12 }}>5. How to Apply?</h2>
          <div style={{ marginBottom: 18, display: 'flex', justifyContent: 'center' }}>
            <a href="https://mulearn.org/r/campuscall" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: "#6366f1", color: "#fff", fontWeight: 600, padding: "0.7em 1.5em", borderRadius: 8, fontSize: "1.1rem", textDecoration: "none", boxShadow: "0 2px 8px rgba(80,80,180,0.10)", transition: "background 0.2s" }}>Apply here to start a μLearn Campus Chapter</a>
          </div>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#4f46e5", marginBottom: 12 }}>6. Best Practices for a Thriving Chapter</h2>
          <ul style={{ marginBottom: 18 }}>
            <li>Keep it <b>peer-driven</b>: Students teach students.</li>
            <li>Focus on <b>proof-of-work</b> (GitHub repos, design portfolios, public demos).</li>
            <li>Gamify growth with <b>Karma Points & leaderboards</b>.</li>
            <li>Create <b>mini communities inside the community</b> (e.g., interest groups and learning circles).</li>
            <li>Celebrate <b>small wins</b>: A weekly circle is as important as a big event.</li>
          </ul>
          <blockquote style={{ background: "#f1f5f9", borderLeft: "4px solid #6366f1", padding: "1em 1.5em", borderRadius: 8, fontStyle: "italic", color: "#374151", marginBottom: 18 }}>
            A Campus Chapter isn’t about events. It’s about building a culture of learning by doing.<br /><br />
            <b>Start small. Stay consistent. The impact compounds.</b>
          </blockquote>
         
        </motion.section>
      </main>
      <Footer />
    </div>
  );
};

export default BeACampus;
