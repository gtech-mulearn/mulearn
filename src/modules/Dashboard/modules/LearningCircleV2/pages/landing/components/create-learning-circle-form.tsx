"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import styles from "./create-learning-circle.module.css"
import { useUserStore } from "/src/ZustandProvider";
import { CircleMeetupInfo } from "../../../services/LearningCircleInterface"
import { createLearningCircle, editScheduleMeetup, scheduleMeetup } from "../../../services/LearningCircleAPIs"
import { getInterests } from "@/modules/Dashboard/modules/ManageUsers/apis"
import ReactSelect from "react-select"

interface CreateLearningCircleFormProps {
  onClose: () => void
  meetUp?: CircleMeetupInfo
  onRefresh?: () => void
}

export function CreateLearningCircleForm({ onClose, meetUp, onRefresh }: CreateLearningCircleFormProps) {
  const [formData, setFormData] = useState({
    title: meetUp?.title || "",
    description: meetUp?.description || "",
    category: meetUp?.ig_id || ""
  })

  const [interestOptions, setInterestOptions] = useState<{ label: string, value: string }[]>([]);
  const org = useUserStore((state) => state.userProfile.college_id || "028b4fb3-6b24-46ac-b26a-092889c5c44f");

  useEffect(() => {
    getInterests().then(setInterestOptions);
  }, []);

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      title: formData.title,
      description: formData.description,
      org,
      ig: formData.category,
      is_recurring: false,
      recurrence_type: ""
    };
    createLearningCircle(data).then(status => {
      if (status && onRefresh) onRefresh();
      onClose();
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <DialogHeader>
        <DialogTitle>{meetUp ? "Edit Learning Circle" : "Create Learning Circle"}</DialogTitle>
        <DialogDescription>
          {meetUp ? "Edit your learning circle details." : "Fill in the details to create a new learning circle. Others will be able to join using a generated code."}
        </DialogDescription>
      </DialogHeader>

      <div className={styles.formGrid}>
        {/* Title */}
        <div className={styles.formField}>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="e.g., AI for Beginners"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div className={styles.formField}>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Describe what participants will learn in this circle..."
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            required
            className={styles.textarea}
          />
        </div>

        {/* Interest Group Selection */}
        <div className={styles.formField}>
          <Label htmlFor="category">Interest Group</Label>
          <ReactSelect
            options={interestOptions}
            name="interestGroup"
            placeholder="Select Interest Group"
            value={interestOptions.find((option) => option.value === formData.category)}
            onChange={(selectedOption) => handleChange('category', selectedOption?.value || '')}
            isDisabled={meetUp?.ig_id ? true : false}
          />
          {meetUp?.ig_id && (
            <p className={styles.helperText}>Interest Group Cannot be modified</p>
          )}
        </div>
      </div>

      {/* Buttons */}
      < DialogFooter >
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">{meetUp ? "Update" : "Create"} Learning Circle</Button>
      </DialogFooter >
    </form >
  );
}
