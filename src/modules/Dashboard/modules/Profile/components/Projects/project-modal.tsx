"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { X, Edit } from "lucide-react"
import styles from './project-modal.module.css'

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

interface ProjectModalProps {
  project: Project
  onClose: () => void
  onEdit: () => void
}

export function ProjectModal({ project, onClose, onEdit }: ProjectModalProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [onClose])

  return (
    <motion.div
      className={styles.modalOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className={styles.modalContent}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ type: "spring", damping: 25 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalHeader} style={{ backgroundColor: project.color }}>
          <svg viewBox="0 0 100 100" className={styles.patternSvg}>
            <path d={project.pattern || "M0,0 C50,0 50,100 100,100 L0,100 Z"} fill="rgba(0,0,0,0.2)" />
          </svg>
          <span className={styles.initialLetter}>
            {project.title.charAt(0)}
          </span>

          <div className={styles.headerButtons}>
            <motion.button
              onClick={(e) => {
                e.stopPropagation()
                onEdit()
              }}
              className={styles.iconButton}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Edit className={styles.icon} />
            </motion.button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                onClose()
              }}
              className={styles.iconButton}
            >
              <X className={styles.icon} />
            </button>
          </div>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.projectInfo}>
            <h2 className={styles.projectTitle}>{project.title}</h2>
            <span className={styles.projectCategory}>{project.category}</span>
          </div>

          <div className="space-y-2 mb-4">
            <p className={styles.projectDescription}>{project.description}</p>
            <p><strong>Created By:</strong> {project.createdBy}</p>
            <p><strong>Created At:</strong> {new Date(project.createdAt).toLocaleDateString()}</p>
            <p><strong>MUID:</strong> {project.muid}</p>
            {project.link && (
              <p>
                <strong>Link:</strong> <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{project.link}</a>
              </p>
            )}
          </div>

          <div className={styles.projectFooter}>
            <div className={styles.tags}>
              {project.tags.map((tag) => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
              {project.teamMuids && project.teamMuids.length > 0 && project.teamMuids.map((muid) => (
                <span key={muid} className={styles.tag}>{muid}</span>
              ))}
            </div>

            <motion.button
              className={styles.viewProjectButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Project
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}