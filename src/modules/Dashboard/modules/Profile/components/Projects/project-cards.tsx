"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus } from "lucide-react"
import { ProjectModal } from "./project-modal"
import { ProjectForm } from "./project-form"
import styles from './project-cards.module.css'

type Project = {
  id: string
  title: string
  category: string
  logo: string
  description: string
  color: string
  pattern?: string
  createdBy: string
  createdAt: string
  muid: string
  teamMuids?: string[]
  link: string
  tags: string[]
}


export function ProjectCards() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "proj-001",
      title: "EcoSmart Home",
      category: "Product Innovation",
      logo: "/ecosmart-logo.svg",
      description: "A smart home system that optimizes energy usage through AI-driven controls and real-time monitoring, reducing carbon footprint by 30%.",
      color: "#00FF85",
      pattern: "M0,0 C50,0 50,100 100,100 L0,100 Z",
      createdBy: "Jane Smith",
      createdAt: "2025-01-15T10:30:00Z",
      muid: "jane@mulearn",
      teamMuids: ["mike@mulearn", "kelly@mulearn"],
      link: "https://ecosmart.example.com",
      tags: ["Sustainability", "AI", "Smart Home"]
    },
    {
      id: "proj-002",
      title: "Pulse Fitness",
      category: "Mobile App",
      logo: "/pulse-logo.svg",
      description: "A fitness tracking app with personalized workout plans and integration with wearable devices, featuring gamified challenges.",
      color: "#FF4D4D",
      pattern: "M0,0 L100,0 L100,100 L0,100 Z",
      createdBy: "Mike Johnson",
      createdAt: "2025-02-20T14:15:00Z",
      muid: "mike@mulearn",
      teamMuids: ["jane@mulearn", "alex@mulearn"],
      link: "https://pulsefitness.example.com",
      tags: ["Fitness", "Mobile", "Wearables"]
    },
    {
      id: "proj-003",
      title: "BrandVibe",
      category: "Brand Design",
      logo: "/brandvibe-logo.svg",
      description: "A comprehensive brand identity system for a startup, including logo, typography, and color scheme guidelines.",
      color: "#3578E5",
      pattern: "M0,0 C25,0 75,100 100,100 L0,100 Z",
      createdBy: "Kelly Lee",
      createdAt: "2025-03-10T09:45:00Z",
      muid: "kelly@mulearn",
      teamMuids: [],
      link: "https://brandvibe.example.com",
      tags: ["Branding", "Design", "Identity"]
    },
    {
      id: "proj-004",
      title: "CityPulse",
      category: "Web Development",
      logo: "/citypulse-logo.svg",
      description: "An interactive web platform providing real-time city data including traffic, weather, and events for urban dwellers.",
      color: "#9C44DC",
      pattern: "M0,0 L100,0 C75,50 25,50 0,100 Z",
      createdBy: "Alex Lopez",
      createdAt: "2025-03-25T16:20:00Z",
      muid: "alex@mulearn",
      teamMuids: ["mike@mulearn", "jane@mulearn", "kelly@mulearn"],
      link: "https://citypulse.example.com",
      tags: ["Web", "Urban", "Data"]
    },
    {
      id: "proj-005",
      title: "MindSpace",
      category: "UX Research",
      logo: "/mindspace-logo.svg",
      description: "A research project exploring user preferences in mental health apps, resulting in a prototype with guided meditation features.",
      color: "#FF9500",
      pattern: "M0,0 L100,0 C100,50 0,50 0,100 Z",
      createdBy: "Sarah Chen",
      createdAt: "2025-04-05T11:00:00Z",
      muid: "sarah@mulearn",
      teamMuids: ["jane@mulearn"],
      link: "https://mindspace.example.com",
      tags: ["UX", "Mental Health", "Research"]
    }

  ])

  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  const handleAddProject = (newProject: Project) => {
    setProjects([
      ...projects,
      {
        ...newProject,
        id: newProject.id || `project-${Date.now()}`,
      },
    ])
    setIsFormOpen(false)
  }

  const handleEditProject = (updatedProject: Project) => {
    setProjects(projects.map((p) => (p.id === updatedProject.id ? updatedProject : p)))
    setEditingProject(null)
    setSelectedProject(updatedProject)
  }

  const openEditForm = (project: Project) => {
    setSelectedProject(null)
    setEditingProject(project)
  }

  return (
    <>
      <div className={styles.projectList}>
        {projects.map((project) => (
          <motion.div
            key={project.id}
            className={styles.projectCard}
            onHoverStart={() => setHoveredId(project.id)}
            onHoverEnd={() => setHoveredId(null)}
            onClick={() => setSelectedProject(project)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.projectContent}>
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <span className={styles.projectCategory}>{project.category}</span>
              {/* <div className={styles.projectLogo}>
                {project.logo && (
                  <img
                    src={
                      project.logo === "/7-eleven-logo.svg"
                        ? "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgMkM2LjQ3NyAyIDIgNi40NzcgMiAxMkMyIDE3LjUyMyA2LjQ3NyAyMiAxMiAyMkMxNy41MjMgMjIgMjIgMTcuNTIzIDIyIDEyQzIyIDYuNDc3IDE3LjUyMyAyIDEyIDJaTTEyIDIwQzcuNTgyIDIwIDQgMTYuNDE4IDQgMTJDNCAxMC41ODIgNC4zNjcgOS4yNjUgNSA4LjEyOFYxNEg3VjhIOVYxNEgxMVY4SDEzVjE0SDE1VjhIMTdWMTRIMTlWOC4xMjhDMTkuNjMzIDkuMjY1IDIwIDEwLjU4MiAyMCAxMkMyMCAxNi40MTggMTYuNDE4IDIwIDEyIDIwWiIgZmlsbD0iYmxhY2siLz48L3N2Zz4="
                        : project.logo === "/volta-logo.svg"
                          ? "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgMkM2LjQ3NyAyIDIgNi40NzcgMiAxMkMyIDE3LjUyMyA2LjQ3NyAyMiAxMiAyMkMxNy41MjMgMjIgMjIgMTcuNTIzIDIyIDEyQzIyIDYuNDc3IDE3LjUyMyAyIDEyIDJaTTEyIDIwQzcuNTgyIDIwIDQgMTYuNDE4IDQgMTJDNCAxMC41ODIgNC4zNjcgOS4yNjUgNSA4LjEyOFYxNEg3VjhIOVYxNEgxMVY4SDEzVjE0SDE1VjhIMTdWMTRIMTlWOC4xMjhDMTkuNjMzIDkuMjY1IDIwIDEwLjU4MiAyMCAxMkMyMCAxNi40MTggMTYuNDE4IDIwIDEyIDIwWiIgZmlsbD0iYmxhY2siLz48L3N2Zz4="
                          : project.logo === "/quit-logo.svg"
                            ? "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgMkM2LjQ3NyAyIDIgNi40NzcgMiAxMkMyIDE3LjUyMyA6LjQ3NyAyMiAxMiAyMkMxNy41MjMgMjIgMjIgMTcuNTIzIDIyIDEyQzIyIDYuNDc3IDE3LjUyMyAyIDEyIDJaTTEyIDIwQzcuNTgyIDIwIDQgMTYuNDE4IDQgMTJDNCAxMC41ODIgNC4zNjcgOS4yNjUgNSA4LjEyOFYxNEg3VjhIOVYxNEgxMVY4SDEzVjE0SDE1VjhIMTdWMTRIMTlWOC4xMjhDMTkuNjMzIDkuMjY1IDIwIDEwLjU4MiAyMCAxMkMyMCAxNi40MTggMTYuNDE4IDIwIDEyIDIwWiIgZmlsbD0iYmxhY2siLz48L3N2Zz4="
                            : "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgMkM2LjQ3NyAyIDIgNi40NzcgMiAxMkMyIDE3LjUyMyA2LjQ3NyAyMiAxMiAyMkMxNy41MjMgMjIgMjIgMTcuNTIzIDIyIDEyQzIyIDYuNDc3IDE3LjUyMyAyIDEyIDJaTTEyIDIwQzcuNTgyIDIwIDQgMTYuNDE4IDQgMTJDNCAxMC41ODIgNC4zNjcgOS4yNjUgNSA4LjEyOFYxNEg3VjhIOVYxNEgxMVY4SDEzVjE0SDE1VjhIMTdWMTRIMTlWOC4xMjhDMTkuNjMzIDkuMjY5IDIwIDEwLjU4MiAyMCAxMkMyMCAxNi40MTggMTYuNDE4IDIwIDEyIDIwWiIgZmlsbD0iYmxhY2siLz48L3N2Zz4="
                    }
                    alt={`${project.title} logo`}
                    className={styles.logoImage}
                  />
                )}
              </div> */}
            </div>

            {/* Hover effect - expanding colored section */}
            <AnimatePresence>
              {hoveredId === project.id && (
                <motion.div
                  className={styles.hoverEffect}
                  initial={{ height: 0 }}
                  animate={{ height: "100%" }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div
                    className={styles.hoverEffect}
                    style={{ backgroundColor: project.color }}
                  >
                    <svg viewBox="0 0 100 100" className={styles.patternSvg}>
                      <path d={project.pattern || "M0,0 C50,0 50,100 100,100 L0,100 Z"} fill="rgba(0,0,0,0.2)" />
                    </svg>
                    <span className={styles.initialLetter}>{project.title.charAt(0)}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}

        {/* Add Project Button */}
        <motion.button
          className={styles.addProjectButton}
          onClick={() => setIsFormOpen(true)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus className={styles.plusIcon} />
          <span>Add New Project</span>
        </motion.button>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            onEdit={() => openEditForm(selectedProject)}
          />
        )}
      </AnimatePresence>

      {/* Add Project Form Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <ProjectForm onClose={() => setIsFormOpen(false)} onSave={handleAddProject} title="Add New Project" />
        )}
      </AnimatePresence>

      {/* Edit Project Form Modal */}
      <AnimatePresence>
        {editingProject && (
          <ProjectForm
            project={editingProject}
            onClose={() => setEditingProject(null)}
            onSave={handleEditProject}
            title="Edit Project"
          />
        )}
      </AnimatePresence>
    </>
  )
}