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
  const getInitialTimeValue = () => {
    // Start with the meetUp time or current time
    const date = meetUp?.meet_time ? new Date(meetUp.meet_time) : new Date();
    
    // Format it to the required format for datetime-local input (YYYY-MM-DDThh:mm)
    return date.toISOString().slice(0, 16);
  };
  const [formData, setFormData] = useState({
    title: meetUp?.title || "",
    description: meetUp?.description || "",
    category: meetUp?.ig_id || "",
    isOnline: meetUp?.meet_link ? true : false,
    imageUrl: "",
    meetLink: meetUp?.meet_link || "",
    location: meetUp?.meet_place || "",
    time: getInitialTimeValue(),
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

    // Convert local time to UTC for API submission
    const convertToUTC = (localTimeStr: string) => {
      const localDate = new Date(localTimeStr);
      return localDate.toISOString();
    };

    const utcTime = convertToUTC(formData.time);

    const data = {
      ...(meetUp && meetUp.id ? { meetId: meetUp.id } : {}),
      title: formData.title,
      description: formData.description,
      meetingType: formData.isOnline ? "online" : "offline",
      meetLink: formData.isOnline ? formData.meetLink : "",
      location: formData.isOnline ? "Google Meet" : formData.location,
      time: utcTime, // Use UTC time for API submission
      org,
      ig: formData.category,
      is_recurring: false,
      recurrence_type: "weekly",
      recurrence: 1,
    }
    if (meetUp?.id) {
      if (data.meetingType === "online") {
        editScheduleMeetup({
          meetId: data.meetId,
          // circle_id: meetUp.circle_id.includes('LearningCircle object') ? meetUp.circle_id.match(/\(([^)]+)\)/)?.[1] : meetUp.circle_id,
          title: data.title,
          description: data.description,
          meet_time: data.time,
          duration: 4,
          mode: data.meetingType,
          coord_x: 0,
          coord_y: 0,
          is_report_needed: false,
          report_description: '',
          meet_link: data.meetLink,
          meet_place: data.location,
        }).then((response) => {
          if (response) {
            if (onRefresh) onRefresh();
            onClose();
          }
        });
      } else {
        editScheduleMeetup({
          meetId: data.meetId,
          title: data.title,
          description: data.description,
          meet_place: data.location,
          meet_time: data.time,
          duration: 4,
          mode: data.meetingType,
          coord_x: 0,
          coord_y: 0,
          is_report_needed: false,
          report_description: '',
        }).then((response) => {
          if (response) {
            if (onRefresh) onRefresh();
            onClose();
          }
        });
      }
    } else {
      if (data.meetingType === "online") {
        createLearningCircle(data).then(status => {
          if (status) {
            scheduleMeetup({
              circle_id: status as string,
              title: data.title,
              description: data.description,
              meet_time: data.time,
              duration: 4,
              mode: data.meetingType,
              coord_x: 0,
              coord_y: 0,
              is_report_needed: false,
              report_description: '',
              meet_link: data.meetLink,
              meet_place: data.location, // platform
            }).then((data) => {
              if (data) {
                if (onRefresh) onRefresh();
              }
              onClose();
            });
          }
        });
      } else {
        createLearningCircle(data).then(status => {
          if (status) {
            scheduleMeetup({
              circle_id: status as string,
              title: data.title,
              description: data.description,
              meet_place: data.location,
              meet_time: data.time,
              duration: 4,
              mode: data.meetingType,
              coord_x: 0,
              coord_y: 0,
              is_report_needed: false,
              report_description: '',
            }).then((data) => {
              if (data) {
                if (onRefresh) onRefresh();
              }
              onClose();
            });
          }
        });
      }
    }
    onClose();
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
          {/* <Select onValueChange={(value) => handleChange("category", value)}>
            <SelectTrigger id="category">
              <SelectValue placeholder="Select an interest group" />
            </SelectTrigger>
            <SelectContent>
              {interestOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select> */}
          <ReactSelect
            options={interestOptions}
            name="interestGroup"
            placeholder="Select Interest Group"
            value={interestOptions.find((option) => option.value === formData.category)}
            onChange={(selectedOption) => handleChange('category', selectedOption?.value || '')}
            isDisabled={meetUp?.ig_id ? true : false}
          />
          {/* {meetUp?.ig_id && (
                    <div className="helper-text" style={{ color: "red", marginTop: "4px", fontSize: '0.85rem' }}>
                        {'Interest Group Cannot be modified'}
                    </div>
                )} */}

          {meetUp?.ig_id && (
            <p className={styles.helperText}>Interest Group Cannot be modified</p>
          )}
        </div>

    {/* Meeting Type */ }
    < div className = { styles.switchContainer } >
          <Label htmlFor="isOnline" className={styles.switchLabel}>Online Learning Circle</Label>
          <Switch
            id="isOnline"
            checked={formData.isOnline}
            onCheckedChange={(checked) => handleChange("isOnline", checked)}
          />
        </div >

    {/* Conditional Fields for Online/Offline */ }
  {
    formData.isOnline ? (
      <div className={styles.formField}>
        <Label htmlFor="meetLink">Online Meeting Link</Label>
        <Input
          id="meetLink"
          type="url"
          placeholder="Enter meeting link"
          value={formData.meetLink}
          onChange={(e) => handleChange("meetLink", e.target.value)}
          required
        />
      </div>
    ) : (
    <div className={styles.formField}>
      <Label htmlFor="location">Location</Label>
      <Input
        id="location"
        type="text"
        placeholder="Enter location"
        value={formData.location}
        onChange={(e) => handleChange("location", e.target.value)}
        required
      />
    </div>
  )
  }

        {/* Meeting Time */}
        <div className={styles.formField}>
          <Label htmlFor="time">Time</Label>
          <Input
            id="time"
            type="datetime-local"
            value={formData.time}
            onChange={(e) => handleChange("time", e.target.value)}
            required
          />
        </div>
      </div>

    {/* Buttons */ }
    < DialogFooter >
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">{meetUp ? "Update" : "Create"} Learning Circle</Button>
      </DialogFooter >
    </form >
  );
}
