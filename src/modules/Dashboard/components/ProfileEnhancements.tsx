import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

const initialData = {
  bio: "Passionate developer...",
  projects: [{ title: "App", link: "https://..." }],
  experience: [{ role: "Intern", company: "μLearn" }]
};

export default function ProfileEnhancements() {
  const [bio, setBio] = useState(initialData.bio);
  const [editBio, setEditBio] = useState(false);
  const [projects, setProjects] = useState(initialData.projects);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [projectForm, setProjectForm] = useState({ title: "", link: "" });
  const [editProjectIdx, setEditProjectIdx] = useState<number | null>(null);
  const [experience, setExperience] = useState(initialData.experience);
  const [showExpModal, setShowExpModal] = useState(false);
  const [expForm, setExpForm] = useState({ role: "", company: "" });
  const [editExpIdx, setEditExpIdx] = useState<number | null>(null);

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <h2>Bio</h2>
      {editBio ? (
        <div>
          <textarea
            value={bio}
            onChange={e => setBio(e.target.value)}
            rows={4}
            style={{ width: "100%" }}
          />
          <button onClick={() => setEditBio(false)}>Save</button>
        </div>
      ) : (
        <div>
          <ReactMarkdown>{bio}</ReactMarkdown>
          <button onClick={() => setEditBio(true)}>Edit Bio</button>
        </div>
      )}

      <h2>Projects</h2>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        {projects.map((p, i) => (
          <div key={i} style={{ border: "1px solid #ccc", padding: 12, borderRadius: 8, minWidth: 200 }}>
            <a href={p.link} target="_blank" rel="noopener noreferrer">{p.title}</a>
            <div>
              <button onClick={() => { setEditProjectIdx(i); setProjectForm(p); setShowProjectModal(true); }}>Edit</button>
              <button onClick={() => setProjects(projects.filter((_, idx) => idx !== i))}>Delete</button>
            </div>
          </div>
        ))}
        <button onClick={() => { setEditProjectIdx(null); setProjectForm({ title: "", link: "" }); setShowProjectModal(true); }}>Add Project</button>
      </div>
      {showProjectModal && (
        <div style={{ position: "fixed", top: 100, left: 0, right: 0, margin: "auto", background: "#fff", border: "1px solid #ccc", padding: 24, zIndex: 10, maxWidth: 320 }}>
          <input
            placeholder="Title"
            value={projectForm.title}
            onChange={e => setProjectForm({ ...projectForm, title: e.target.value })}
            style={{ width: "100%", marginBottom: 8 }}
          />
          <input
            placeholder="Link"
            value={projectForm.link}
            onChange={e => setProjectForm({ ...projectForm, link: e.target.value })}
            style={{ width: "100%", marginBottom: 8 }}
          />
          <button onClick={() => {
            if (editProjectIdx !== null) {
              setProjects(projects.map((p, i) => i === editProjectIdx ? projectForm : p));
            } else {
              setProjects([...projects, projectForm]);
            }
            setShowProjectModal(false);
          }}>Save</button>
          <button onClick={() => setShowProjectModal(false)}>Cancel</button>
        </div>
      )}

      <h2>Experience</h2>
      <div>
        {experience.map((exp, i) => (
          <div key={i} style={{ border: "1px solid #ccc", padding: 12, borderRadius: 8, marginBottom: 8 }}>
            <div>{exp.role} at {exp.company}</div>
            <button onClick={() => { setEditExpIdx(i); setExpForm(exp); setShowExpModal(true); }}>Edit</button>
            <button onClick={() => setExperience(experience.filter((_, idx) => idx !== i))}>Delete</button>
          </div>
        ))}
        <button onClick={() => { setEditExpIdx(null); setExpForm({ role: "", company: "" }); setShowExpModal(true); }}>Add Experience</button>
      </div>
      {showExpModal && (
        <div style={{ position: "fixed", top: 100, left: 0, right: 0, margin: "auto", background: "#fff", border: "1px solid #ccc", padding: 24, zIndex: 10, maxWidth: 320 }}>
          <input
            placeholder="Role"
            value={expForm.role}
            onChange={e => setExpForm({ ...expForm, role: e.target.value })}
            style={{ width: "100%", marginBottom: 8 }}
          />
          <input
            placeholder="Company"
            value={expForm.company}
            onChange={e => setExpForm({ ...expForm, company: e.target.value })}
            style={{ width: "100%", marginBottom: 8 }}
          />
          <button onClick={() => {
            if (editExpIdx !== null) {
              setExperience(experience.map((exp, i) => i === editExpIdx ? expForm : exp));
            } else {
              setExperience([...experience, expForm]);
            }
            setShowExpModal(false);
          }}>Save</button>
          <button onClick={() => setShowExpModal(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
} 