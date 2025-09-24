import React from "react";
import HomeNav from "@/modules/Common/HomeNav/HomeNav";
import Footer from "@/modules/Common/Footer/Footer";
import { motion } from "framer-motion";

const BeACompany = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div style={{ background: "linear-gradient(135deg, #456ff6 0%, #3b5bdb 100%)", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <HomeNav />
      
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ 
          background: "rgba(255,255,255,0.1)", 
          backdropFilter: "blur(10px)",
          padding: "4rem 2rem 2rem", 
          textAlign: "center",
          borderBottom: "1px solid rgba(255,255,255,0.1)"
        }}
      >
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <h1 style={{ 
            fontSize: "3rem", 
            fontWeight: 900, 
            color: "#fff", 
            marginBottom: 20, 
            lineHeight: 1.1,
            textShadow: "0 2px 20px rgba(0,0,0,0.2)"
          }}>
            μLearn x Companies
          </h1>
          <p style={{ 
            fontSize: "1.3rem", 
            color: "rgba(255,255,255,0.9)", 
            marginBottom: 30,
            fontWeight: 500,
            maxWidth: 800,
            margin: "0 auto 30px"
          }}>
            Partnership & Collaboration Playbook
          </p>
          <a href="https://airtable.com/app0v220Yc0G3CPMr/shrpiEQrpuIFTMNh1">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: "linear-gradient(135deg, #456ff6, #3b5bdb)",
              color: "#fff",
              border: "2px solid #fff",
              padding: "1rem 2.5rem",
              fontSize: "1.1rem",
              fontWeight: 700,
              borderRadius: 50,
              cursor: "pointer",
              boxShadow: "0 8px 25px rgba(69,111,246,0.4)"
            }}
          >
            🚀 Start Partnership Journey
          </motion.button>
          </a>
        </div>
      </motion.section>

      <main style={{ flex: 1, background: "linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)" }}>
        
        {/* Why Partner Section */}
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ 
            padding: "4rem 2rem", 
            maxWidth: 1200, 
            margin: "0 auto" 
          }}
        >
          <motion.div variants={itemVariants} style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 style={{ 
              fontSize: "2.5rem", 
              fontWeight: 800, 
              background: "linear-gradient(135deg, #456ff6, #3b5bdb)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: 16 
            }}>
              Why Partner with μLearn?
            </h2>
            <div style={{ width: 100, height: 4, background: "linear-gradient(135deg, #456ff6, #3b5bdb)", margin: "0 auto", borderRadius: 2 }}></div>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", marginBottom: "3rem" }}>
            <motion.div 
              variants={itemVariants}
              style={{ 
                background: "#fff", 
                borderRadius: 20, 
                padding: "2rem", 
                boxShadow: "0 10px 40px rgba(69,111,246,0.15)",
                border: "1px solid rgba(69,111,246,0.1)",
                position: "relative",
                overflow: "hidden"
              }}
            >
              <div style={{ 
                position: "absolute", 
                top: 0, 
                left: 0, 
                width: "100%", 
                height: 4, 
                background: "#456ff6" 
              }}></div>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#2d3748", marginBottom: 16 }}>
                🌟 59,000+ Strong Ecosystem
              </h3>
              <p style={{ color: "#4a5568", lineHeight: 1.6, marginBottom: 16 }}>
                We're not just a student community—we're a <strong style={{ color: "#456ff6" }}>59,000+ strong ecosystem</strong> across 1,900+ institutions, building the future workforce, innovation pipelines, and social impact solutions.
              </p>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              style={{ 
                background: "#fff", 
                borderRadius: 20, 
                padding: "2rem", 
                boxShadow: "0 10px 40px rgba(69,111,246,0.15)",
                border: "1px solid rgba(69,111,246,0.1)",
                position: "relative",
                overflow: "hidden"
              }}
            >
              <div style={{ 
                position: "absolute", 
                top: 0, 
                left: 0, 
                width: "100%", 
                height: 4, 
                background: "#456ff6" 
              }}></div>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#2d3748", marginBottom: 16 }}>
                🎯 What You Gain
              </h3>
              <ul style={{ color: "#4a5568", lineHeight: 1.7, paddingLeft: 0, listStyle: "none" }}>
                <li style={{ marginBottom: 12 }}>✅ <strong style={{ color: "#456ff6" }}>Impact at Scale</strong> – execute CSR programs with transparent outcomes</li>
                <li style={{ marginBottom: 12 }}>✅ <strong style={{ color: "#456ff6" }}>Hire Smarter</strong> – access pre-validated, project-ready talent</li>
                <li style={{ marginBottom: 12 }}>✅ <strong style={{ color: "#456ff6" }}>Innovate Faster</strong> – test products and crowdsource solutions</li>
                <li style={{ marginBottom: 12 }}>✅ <strong style={{ color: "#456ff6" }}>Shape the Future</strong> – co-create GovTech and Education 4.0</li>
              </ul>
            </motion.div>
          </div>
        </motion.section>

        {/* Collaboration Tracks */}
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ 
            background: "linear-gradient(135deg, #456ff6 0%, #3b5bdb 100%)", 
            padding: "4rem 2rem",
            color: "#fff"
          }}
        >
          <motion.div variants={itemVariants} style={{ textAlign: "center", marginBottom: "3rem", maxWidth: 1200, margin: "0 auto 3rem" }}>
            <h2 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: 16, color: "#fff" }}>
              Collaboration Tracks
            </h2>
            <div style={{ width: 100, height: 4, background: "#fff", margin: "0 auto", borderRadius: 2 }}></div>
          </motion.div>

          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(3, minmax(350px, 1fr))", 
            gap: "2rem", 
            maxWidth: 1200, 
            margin: "0 auto" 
          }}>
            
            {/* Track 1 */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              style={{ 
                background: "rgba(255,255,255,0.95)", 
                borderRadius: 20, 
                padding: "2rem", 
                color: "#2d3748",
                boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
                backdropFilter: "blur(10px)"
              }}
            >
              <div style={{ 
                background: "#456ff6", 
                color: "#fff", 
                padding: "0.5rem 1rem", 
                borderRadius: 25, 
                display: "inline-block", 
                marginBottom: 16,
                fontSize: "0.9rem",
                fontWeight: 700
              }}>
                1️⃣ CSR & Skilling
              </div>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: 12, color: "#456ff6" }}>
                Transformational Skilling Programs
              </h3>
              <ul style={{ lineHeight: 1.6, paddingLeft: 20 }}>
                <li>Fund <strong style={{ color: "#456ff6" }}>Learning Circles</strong> in tech, creative arts, or leadership</li>
                <li>Drive <strong style={{ color: "#456ff6" }}>Rural Skilling</strong> → AI, ML & digital literacy to villages</li>
                <li>Champion <strong style={{ color: "#456ff6" }}>Women in Tech</strong> with mentorship + bootcamps</li>
                <li>Build <strong style={{ color: "#456ff6" }}>Makerspaces, IoT labs, digital classrooms</strong></li>
              </ul>
            </motion.div>

            {/* Track 2 */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              style={{ 
                background: "rgba(255,255,255,0.95)", 
                borderRadius: 20, 
                padding: "2rem", 
                color: "#2d3748",
                boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
                backdropFilter: "blur(10px)"
              }}
            >
              <div style={{ 
                background: "linear-gradient(135deg, #456ff6, #3b5bdb)", 
                color: "#fff", 
                padding: "0.5rem 1rem", 
                borderRadius: 25, 
                display: "inline-block", 
                marginBottom: 16,
                fontSize: "0.9rem",
                fontWeight: 700
              }}>
                2️⃣ Talent & Workforce
              </div>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: 12, color: "#456ff6" }}>
                Pre-Validated Talent Pipeline
              </h3>
              <ul style={{ lineHeight: 1.6, paddingLeft: 20 }}>
                <li><strong style={{ color: "#456ff6" }}>Launchpad</strong> → year-round hiring from validated pool</li>
                <li><strong style={{ color: "#456ff6" }}>Top 100 Series</strong> → access best-of-the-best</li>
                <li><strong style={{ color: "#456ff6" }}>In50Hours</strong> → rapid prototyping sprints</li>
                <li><strong style={{ color: "#456ff6" }}>Learning Circles-as-a-Service</strong> → corporate upskilling</li>
              </ul>
            </motion.div>

            {/* Track 3 */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              style={{ 
                background: "rgba(255,255,255,0.95)", 
                borderRadius: 20, 
                padding: "2rem", 
                color: "#2d3748",
                boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
                backdropFilter: "blur(10px)"
              }}
            >
              <div style={{ 
                background: "rgba(69,111,246,0.1)", 
                color: "#456ff6", 
                padding: "0.5rem 1rem", 
                borderRadius: 25, 
                display: "inline-block", 
                marginBottom: 16,
                fontSize: "0.9rem",
                fontWeight: 700,
                border: "1px solid #456ff6"
              }}>
                3️⃣ Innovation CaaS
              </div>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: 12, color: "#456ff6" }}>
                Living Lab of Innovation
              </h3>
              <ul style={{ lineHeight: 1.6, paddingLeft: 20 }}>
                <li><strong style={{ color: "#456ff6" }}>Product Testing & UX Labs</strong> → insights from thousands</li>
                <li><strong style={{ color: "#456ff6" }}>Community-driven Research</strong> → surveys, pilots, reports</li>
                <li><strong style={{ color: "#456ff6" }}>Student Media Studio</strong> → authentic youth storytelling</li>
                <li><strong style={{ color: "#456ff6" }}>Global Challenge Hosting</strong> → crowdsource solutions</li>
              </ul>
            </motion.div>

            {/* Track 4 - Centered */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              style={{ 
                background: "rgba(255,255,255,0.95)", 
                borderRadius: 20, 
                padding: "2rem", 
                color: "#2d3748",
                boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
                backdropFilter: "blur(10px)",
                gridColumn: "2",
                margin: "0 auto",
                width: "100%",
                maxWidth: "400px"
              }}
            >
              <div style={{ 
                background: "linear-gradient(135deg, #456ff6, #7c3aed)", 
                color: "#fff", 
                padding: "0.5rem 1rem", 
                borderRadius: 25, 
                display: "inline-block", 
                marginBottom: 16,
                fontSize: "0.9rem",
                fontWeight: 700
              }}>
                4️⃣ Research & GovTech
              </div>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: 12, color: "#456ff6" }}>
                Decentralized Research Network
              </h3>
              <ul style={{ lineHeight: 1.6, paddingLeft: 20 }}>
                <li><strong style={{ color: "#456ff6" }}>Research-as-a-Service</strong> → policy papers, market studies</li>
                <li><strong style={{ color: "#456ff6" }}>Proof-of-Work IP Licensing</strong> → student-built solutions</li>
                <li><strong style={{ color: "#456ff6" }}>Academic Collaboration</strong> across 1,900+ institutions</li>
                <li><strong style={{ color: "#456ff6" }}>GovTech Sandbox</strong> → civic innovation pilots</li>
              </ul>
            </motion.div>
          </div>
        </motion.section>

        {/* Quick Wins & CTA */}
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ 
            padding: "4rem 2rem", 
            maxWidth: 1200, 
            margin: "0 auto",
            textAlign: "center"
          }}
        >
          <motion.div variants={itemVariants}>
            <h2 style={{ 
              fontSize: "2.5rem", 
              fontWeight: 800, 
              background: "linear-gradient(135deg, #456ff6, #3b5bdb)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: 16 
            }}>
              🌟 Quick Wins for Companies
            </h2>
            <div style={{ width: 100, height: 4, background: "linear-gradient(135deg, #456ff6, #3b5bdb)", margin: "0 auto 3rem", borderRadius: 2 }}></div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            style={{ 
              background: "#fff", 
              borderRadius: 20, 
              padding: "3rem 2rem", 
              boxShadow: "0 15px 40px rgba(69,111,246,0.1)",
              marginBottom: "3rem",
              border: "1px solid rgba(69,111,246,0.1)"
            }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem", textAlign: "left" }}>
              <div>
                <div style={{ fontSize: "2rem", marginBottom: 12, color: "#456ff6" }}>💼</div>
                <h4 style={{ fontWeight: 700, color: "#456ff6", marginBottom: 8 }}>Execute CSR compliance with 0% overhead</h4>
                <p style={{ color: "#4a5568", fontSize: "0.95rem" }}>Transparent, auditable outcomes across thousands of learners</p>
              </div>
              <div>
                <div style={{ fontSize: "2rem", marginBottom: 12, color: "#456ff6" }}>🎯</div>
                <h4 style={{ fontWeight: 700, color: "#456ff6", marginBottom: 8 }}>Run talent branding campaigns in 500+ campuses</h4>
                <p style={{ color: "#4a5568", fontSize: "0.95rem" }}>Direct access to Kerala's brightest minds</p>
              </div>
              <div>
                <div style={{ fontSize: "2rem", marginBottom: 12, color: "#456ff6" }}>🧪</div>
                <h4 style={{ fontWeight: 700, color: "#456ff6", marginBottom: 8 }}>Test products with 10,000+ students pre-launch</h4>
                <p style={{ color: "#4a5568", fontSize: "0.95rem" }}>Real user feedback before market entry</p>
              </div>
              <div style={{ gridColumn: "2", justifySelf: "center" }}>
                <div style={{ fontSize: "2rem", marginBottom: 12, color: "#456ff6" }}>🚀</div>
                <h4 style={{ fontWeight: 700, color: "#456ff6", marginBottom: 8 }}>Build GovTech pilots with Kerala ecosystem</h4>
                <p style={{ color: "#4a5568", fontSize: "0.95rem" }}>Government-backed innovation opportunities</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}
          >
            <a href="https://airtable.com/app0v220Yc0G3CPMr/shrpiEQrpuIFTMNh1">
              <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 15px 40px rgba(69,111,246,0.4)" }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: "linear-gradient(135deg, #456ff6, #3b5bdb)",
                color: "#fff",
                border: "none",
                padding: "1.2rem 2.5rem",
                fontSize: "1.1rem",
                fontWeight: 700,
                borderRadius: 50,
                cursor: "pointer",
                boxShadow: "0 10px 30px rgba(69,111,246,0.3)"
              }}
            >
              📋 Partnership Form
            </motion.button>
            </a>
            
          </motion.div>
        </motion.section>

        {/* Contact Section */}
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ 
            background: "linear-gradient(135deg, #456ff6 0%, #3b5bdb 100%)", 
            padding: "4rem 2rem",
            color: "#fff"
          }}
        >
          <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
            <motion.h2 
              variants={itemVariants}
              style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "2rem" }}
            >
              Ready to Partner?
            </motion.h2>
            <motion.div 
              variants={itemVariants}
              style={{ 
                background: "rgba(255,255,255,0.1)", 
                borderRadius: 20, 
                padding: "2rem", 
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(69,111,246,0.3)"
              }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem", textAlign: "left" }}>
                <div>
                  <h4 style={{ fontWeight: 700, marginBottom: 8, color: "#e2e8f0" }}>📧 Email</h4>
                  <a href="mailto:partners@mulearn.org" style={{  textDecoration: "none", fontWeight: 600 }}>
                    partners@mulearn.org
                  </a>
                </div>
                <div>
                  <h4 style={{ fontWeight: 700, marginBottom: 8, color: "#e2e8f0" }}>📱 Phone</h4>
                  <a href="tel:+918943647000" style={{  textDecoration: "none", fontWeight: 600 }}>
                    +91 8943647000
                  </a>
                </div>
                <div>
                  <h4 style={{ fontWeight: 700, marginBottom: 8, color: "#e2e8f0" }}>🌐 Website</h4>
                  <a href="https://www.mulearn.org/" target="_blank" rel="noopener noreferrer" style={{  textDecoration: "none", fontWeight: 600 }}>
                    www.mulearn.org
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </main>
      
      <Footer />
    </div>
  );
};

export default BeACompany;