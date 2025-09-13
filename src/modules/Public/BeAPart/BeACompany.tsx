import React from "react";
import HomeNav from "@/modules/Common/HomeNav/HomeNav";
import Footer from "@/modules/Common/Footer/Footer";
import { motion } from "framer-motion";

const BeACompany = () => {
  return (
    <div style={{ background: "linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <HomeNav />
      <main style={{ flex: 1, width: "100%", maxWidth: 900, margin: "0 auto", padding: "2rem 1rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          style={{ fontSize: "2.2rem", fontWeight: 800, textAlign: "center", color: "#2d2d4d", marginBottom: 16, lineHeight: 1.2 }}
        >
          μLearn x Companies – Partnership & Collaboration Playbook
        </motion.h1>
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          style={{ background: "#fff", borderRadius: 18, boxShadow: "0 2px 16px rgba(80,80,180,0.07)", padding: "2rem 1.5rem", margin: "1rem 0", width: "100%", maxWidth: 800 }}
        >
          <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#4f46e5", marginBottom: 12 }}>Why Partner with μLearn?</h2>
          <ul style={{ marginBottom: 18 }}>
            <li>Access 50,000+ <b>proof-of-work validated learners</b> across 1,900+ campuses</li>
            <li><b>CSR impact</b> at scale with real reports for compliance</li>
            <li><b>Hiring pipeline</b> through Launchpad & Top 100</li>
            <li><b>Innovation-as-a-Service</b> → product testing, feedback, prototyping, market validation</li>
            <li><b>GovTech & Civic Tech pilots</b> with government and academia</li>
            <li><b>Brand positioning</b> as a youth ally & future-of-work enabler</li>
          </ul>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#4f46e5", marginBottom: 12 }}>Collaboration Tracks</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: 18 }}>
            {/* CSR & Skilling */}
            <div style={{ background: '#f1f5f9', borderRadius: 16, boxShadow: '0 2px 12px rgba(80,80,180,0.07)', padding: '1.5rem 2rem', borderLeft: '6px solid #6366f1' }}>
              <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#4f46e5', marginBottom: 6 }}>1. CSR & Skilling</div>
              <ul style={{ marginLeft: 18 }}>
                <li>Fund <b>Learning Circles</b> in tech, creative, or management domains</li>
                <li><b>Rural skilling initiatives</b> → take digital literacy & AI/ML to villages</li>
                <li><b>Women in Tech programs</b> with mentorship + bootcamps</li>
                <li><b>Campus infra build-outs</b> (labs, makerspaces, IoT labs)</li>
                <li>Sponsor <b>scholarships/fellowships</b> for top performers</li>
              </ul>
            </div>
            {/* Talent & Workforce Development */}
            <div style={{ background: '#f1f5f9', borderRadius: 16, boxShadow: '0 2px 12px rgba(80,80,180,0.07)', padding: '1.5rem 2rem', borderLeft: '6px solid #6366f1' }}>
              <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#4f46e5', marginBottom: 6 }}>2. Talent & Workforce Development</div>
              <ul style={{ marginLeft: 18 }}>
                <li><b>Launchpad</b> → year-round hiring of pre-validated project-ready talent</li>
                <li><b>Top 100 Series</b> → access elite student pool for future leadership roles</li>
                <li><b>In50Hours</b> → rapid prototyping hack-sprints with student teams</li>
                <li><b>Learning Circles-as-a-Service</b> for corporates (upskilling bench strength, DEI onboarding)</li>
                <li><b>Peer Coaching Marketplace</b> → flexible gig economy & skill-sharing</li>
              </ul>
            </div>
            {/* Innovation & Community-as-a-Service */}
            <div style={{ background: '#f1f5f9', borderRadius: 16, boxShadow: '0 2px 12px rgba(80,80,180,0.07)', padding: '1.5rem 2rem', borderLeft: '6px solid #6366f1' }}>
              <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#4f46e5', marginBottom: 6 }}>3. Innovation & Community-as-a-Service (CaaS)</div>
              <ul style={{ marginLeft: 18 }}>
                <li><b>Product Testing/UX Feedback Labs</b> – student-led product validation</li>
                <li><b>Community-driven Research-as-a-Service</b> – surveys, pilots, reports</li>
                <li><b>Student Media & Content Studio</b> – campaigns, storytelling, youth brand amplification</li>
                <li><b>Global Challenge Hosting</b> – crowdsource bold solutions in climate, AI, health</li>
                <li><b>Open Source Fellowship Sponsorships</b> – co-sponsor contributors to global OSS projects</li>
              </ul>
            </div>
            {/* Research & Ecosystem Co-Creation */}
            <div style={{ background: '#f1f5f9', borderRadius: 16, boxShadow: '0 2px 12px rgba(80,80,180,0.07)', padding: '1.5rem 2rem', borderLeft: '6px solid #6366f1' }}>
              <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#4f46e5', marginBottom: 6 }}>4. Research & Ecosystem Co-Creation</div>
              <ul style={{ marginLeft: 18 }}>
                <li><b>Research-as-a-Service</b> → domain research, policy papers, field data</li>
                <li><b>Proof-of-Work IP Licensing</b> → tap into student-built code, designs, problem-solutions</li>
                <li><b>Academic Collaboration</b> – via 1,900+ colleges, driven by industry problems</li>
                <li><b>GovTech Sandbox-as-a-Service</b> – test civic innovation tools at scale</li>
              </ul>
            </div>
          </div>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#4f46e5", margin: '2rem 0 12px 0' }}>How To Partner</h2>
          <ol style={{ marginBottom: 18, marginLeft: 18 }}>
            <li>Email us at <a href="mailto:partners@mulearn.org" style={{ color: '#6366f1', fontWeight: 600 }}>partners@mulearn.org</a> for the partnership.</li>
            <li>Schedule a <b>Discovery Call</b> (30 minutes)</li>
            <li>Get a <b>Co-designed Proposal</b> in 7–10 days</li>
            <li><b>Agreement & Kickoff</b></li>
            <li><b>Launch</b> within 2 weeks</li>
          </ol>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#4f46e5", marginBottom: 8 }}>What You’ll Need to Apply</h3>
          <ul style={{ marginBottom: 18 }}>
            <li>Company profile & key contacts</li>
            <li>Engagement preference → CSR | Hiring | Innovation | Research</li>
            <li>Objectives & success metrics expected</li>
            <li>Timeline & budget range</li>
          </ul>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#4f46e5", margin: '2rem 0 12px 0' }}>Quick Wins for Companies</h2>
          <ul style={{ marginBottom: 18 }}>
            <li>Execute annual CSR obligations with <b>0% overhead</b></li>
            <li>Run <b>talent branding campaigns</b> across 500+ Kerala campuses</li>
            <li>Get <b>products tested by 10,000+ students</b> before launch</li>
            <li><b>Upskill bench employees rapidly</b> through Learning Circle formats</li>
            <li>Build <b>GovTech/social impact pilots</b> with Kerala’s government ecosystem</li>
            <li><b>Hire pre-validated talent</b> without traditional recruitment lag</li>
          </ul>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#4f46e5", margin: '2rem 0 12px 0' }}>Contact Us</h2>
          <div style={{ background: '#f1f5f9', borderRadius: 16, boxShadow: '0 2px 12px rgba(80,80,180,0.07)', padding: '1.5rem 2rem', borderLeft: '6px solid #6366f1', marginBottom: 18 }}>
            <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#2d2d4d', marginBottom: 8 }}>Contact</div>
            <div style={{ marginBottom: 6 }}><b>Email:</b> <a href="mailto:partners@mulearn.org" style={{ color: '#4f46e5', textDecoration: 'underline' }}>partners@mulearn.org</a></div>
            <div style={{ marginBottom: 6 }}><b>Phone:</b> <a href="tel:+918943647000" style={{ color: '#4f46e5', textDecoration: 'underline' }}>+91 8943647000</a></div>
            <div><b>Website:</b> <a href="https://www.mulearn.org/" target="_blank" rel="noopener noreferrer" style={{ color: '#4f46e5', textDecoration: 'underline' }}>www.mulearn.org</a></div>
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
};

export default BeACompany;