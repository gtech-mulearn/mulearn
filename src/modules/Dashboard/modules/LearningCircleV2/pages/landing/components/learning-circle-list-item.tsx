"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Users, Wifi, WifiOff, CheckCircle } from "lucide-react"
import styles from "./learning-circle-list-item.module.css";
import { submitRSVP } from "../../../services/LearningCircleAPIs";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface LearningCircleListItemProps {
  id: string
  title: string
  description?: string
  ig_name: string
  mode: string
  attendees_count: number
  hasJoined?: boolean
  hasCompleted?: boolean
  is_rsvp?: boolean
  coord_x: number
  coord_y: number
  is_started: boolean
  onClick: () => void
  onRSVPSuccess?: () => void
}

export function LearningCircleListItem({
  id,
  title,
  description,
  ig_name,
  mode,
  attendees_count,
  hasJoined,
  hasCompleted,
  is_rsvp,
  coord_x,
  coord_y,
  is_started,
  onClick,
  onRSVPSuccess,
}: LearningCircleListItemProps) {
  const [isRSVPing, setIsRSVPing] = useState(false);
  const [hasRSVPed, setHasRSVPed] = useState(is_rsvp);

  const getDirections = () => {
    const coordx = coord_x || 0;
    const coordy = coord_y || 0;
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${coordx},${coordy}`, '_blank');
  }

  const handleRSVP = async () => {
    if (hasRSVPed) {
      toast.success("You've already RSVPed to this learning circle.");
      return;
    }

    setIsRSVPing(true);
    try {
      const success = await submitRSVP(id);
      if (success) {
        setHasRSVPed(true);
        if (onRSVPSuccess) {
          onRSVPSuccess();
        }
      }
    } catch (error) {
      console.error("Error submitting RSVP:", error);
      toast.error("Failed to submit RSVP. Please try again.");
    } finally {
      setIsRSVPing(false);
    }
  };


  return (
    <Card className={styles.card}>
      <CardContent className={styles.cardContent}>
        <h3 className={styles.cardTitle}>
          {title}
        </h3>
        <p className={styles.cardDescription}>
          {(description || '').length > 150 ? (description || '').substring(0, 150) + "..." : (description || '')}
        </p>
        <div className={styles.badgeContainer}>
          <Badge variant="secondary" className={styles.categoryBadge}>{ig_name}</Badge>
        </div>
      </CardContent>
      <CardFooter className={styles.cardFooter}>
        <Button className={styles.secondaryButton} onClick={onClick}>
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}

