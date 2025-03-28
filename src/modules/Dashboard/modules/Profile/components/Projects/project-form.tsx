"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { X, Check, RefreshCw } from "lucide-react"
import styles from './project-form.module.css'

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

interface ProjectFormProps {
  project?: Project
  onClose: () => void
  onSave: (project: Project) => void
  title: string
}

const patterns = [
  "M0,0 C50,0 50,100 100,100 L0,100 Z",
  "M0,0 L100,0 L100,100 L0,100 Z",
  "M0,0 C25,0 75,100 100,100 L0,100 Z",
  "M0,0 L100,0 C75,50 25,50 0,100 Z",
  "M0,0 L100,0 C100,50 0,50 0,100 Z",
]

const categories = [
  "Product Innovation",
  "Product Design",
  "Brand Design",
  "360 Campaign",
  "Contact to See",
  "UX Research",
  "Web Development",
  "Mobile App",
]

export function ProjectForm({ project, onClose, onSave, title }: ProjectFormProps) {
  const currentDate = new Date().toISOString()
  
  const [formData, setFormData] = useState<Project>({
    id: project?.id || `project-${Date.now()}`,
    title: project?.title || "",
    category: project?.category || categories[0],
    logo: project?.logo || "/meta-logo.svg",
    description: project?.description || "",
    color: project?.color || "#3578E5",
    pattern: project?.pattern || patterns[0],
    createdBy: project?.createdBy || "",
    createdAt: project?.createdAt || currentDate,
    muid: project?.muid || "",
    teamMuids: project?.teamMuids || [],
    link: project?.link || "",
    tags: project?.tags || [],
  })

  const [tagInput, setTagInput] = useState("")

  const generateRandomColor = () => {
    const colors = [
      "#3578E5", "#00FF85", "#FF4D4D", "#9C44DC",
      "#FF9500", "#00C2FF", "#FFD600"
    ]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleTeamMuidsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFormData({ ...formData, teamMuids: value.split(",").map(id => id.trim()) })
  }

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value)
  }

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()]
      })
      setTagInput("")
      e.preventDefault()
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <motion.div
      className={styles.formOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className={styles.formContent}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ type: "spring", damping: 25 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.formHeader} style={{ backgroundColor: formData.color }}>
          <h2 className={styles.formTitle}>{title}</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <X className={styles.closeIcon} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGrid}>
            <div className={styles.formColumn}>
              <div className={styles.formGroup}>
                <label htmlFor="title" className={styles.label}>
                  Project Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className={styles.input}
                  placeholder="Enter project title"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="category" className={styles.label}>
                  Interest Group
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className={styles.select}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="color" className={styles.label}>
                  Color
                </label>
                <div className={styles.colorInputGroup}>
                  <input
                    type="color"
                    id="color"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    className={styles.colorPicker}
                  />
                  <input
                    type="text"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    className={`${styles.input} ${styles.colorInput}`}
                    placeholder="#000000"
                  />
                  <motion.button
                    type="button"
                    className={styles.randomColorButton}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFormData({ ...formData, color: generateRandomColor() })}
                  >
                    <RefreshCw className={styles.refreshIcon} />
                  </motion.button>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="pattern" className={styles.label}>
                  Pattern
                </label>
                <select
                  id="pattern"
                  name="pattern"
                  value={formData.pattern}
                  onChange={handleChange}
                  className={styles.select}
                >
                  {patterns.map((pattern, index) => (
                    <option key={index} value={pattern}>
                      Pattern {index + 1}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="createdBy" className={styles.label}>
                  Created By
                </label>
                <input
                  type="text"
                  id="createdBy"
                  name="createdBy"
                  value={formData.createdBy}
                  onChange={handleChange}
                  required
                  className={styles.input}
                  placeholder="Enter creator name"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="muid" className={styles.label}>
                  MUID
                </label>
                <input
                  type="text"
                  id="muid"
                  name="muid"
                  value={formData.muid}
                  onChange={handleChange}
                  required
                  className={styles.input}
                  placeholder="Enter MUID"
                />
              </div>
            </div>

            <div className={styles.formColumn}>
              <div className={styles.formGroup}>
                <label htmlFor="description" className={styles.label}>
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={3}
                  className={styles.textarea}
                  placeholder="Enter project description"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="link" className={styles.label}>
                  Project Link
                </label>
                <input
                  type="url"
                  id="link"
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Enter project URL"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="teamMuids" className={styles.label}>
                  Team MUIDs (comma-separated)
                </label>
                <input
                  type="text"
                  id="teamMuids"
                  value={formData.teamMuids?.join(", ") || ""}
                  onChange={handleTeamMuidsChange}
                  className={styles.input}
                  placeholder="Enter team MUIDs"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="tags" className={styles.label}>
                  Tags (press Enter to add)
                </label>
                <input
                  type="text"
                  id="tags"
                  value={tagInput}
                  onChange={handleTagInputChange}
                  onKeyDown={handleAddTag}
                  className={styles.input}
                  placeholder="Add a tag"
                />
                <div className="mt-2 flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <span key={tag} className="inline-flex items-center px-2 py-1 bg-gray-200 rounded-full text-sm">
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Preview</label>
                <div className={styles.preview} style={{ backgroundColor: formData.color }}>
                  <svg viewBox="0 0 100 100" className={styles.previewSvg}>
                    <path d={formData.pattern} fill="rgba(0,0,0,0.2)" />
                  </svg>
                  <span className={styles.previewLetter}>
                    {formData.title.charAt(0) || "?"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.formActions}>
            <motion.button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              className={styles.saveButton}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Check className={styles.checkIcon} />
              Save Project
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}