import React, { useState, useEffect, useCallback, memo } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LearningCirclesSection.module.css";
import { deleteScheduleMeetup, getMeetups } from "../../LearningCircleV2/services/LearningCircleAPIs";
import { CircleMeetupInfo } from "../../LearningCircleV2/services/LearningCircleInterface";
import EventDetailsModal from "../../LearningCircleV2/components/EventDetailsModal/EventDetailsModal";
import EmptyImage from "../assets/empty.webp";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import { LearningCircleListItem } from "../../LearningCircleV2/pages/landing/components/learning-circle-list-item";
import { LearningCircleCard } from "../../LearningCircleV2/pages/landing/components/learning-circle-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CreateLearningCircleForm } from "../../LearningCircleV2/pages/landing/components/create-learning-circle-form";
import MuLoader from "@/components/MuComponents/MuLoader/MuLoader";
import { currentIgsData } from "./InterestGroups";

interface LearningCircleProps {
  domain: string;
}

const meetupCache: { [key: string]: CircleMeetupInfo[] } = {};

const useMeetups = (category: string, limit: number = 6) => {
  const [meetups, setMeetups] = useState<CircleMeetupInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMeetups = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getMeetups(category);
      meetupCache[category] = res;
      setMeetups(res.slice(0, limit));
    } catch (error) {
      console.error("Failed to fetch meetups:", error);
      setMeetups([]);
    } finally {
      setIsLoading(false);
    }
  }, [category, limit]);

  useEffect(() => {
    fetchMeetups();
  }, [fetchMeetups]);

  return { meetups, isLoading, refetch: fetchMeetups };
};

const LearningCirclesSection: React.FC<LearningCircleProps> = ({ domain }) => {
  const { meetups, isLoading, refetch } = useMeetups("all");
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCircle, setSelectedCircle] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [meetup, setMeetup] = useState<CircleMeetupInfo>();
  const [open, setOpen] = useState(false);
  const [selectedMeetup, setSelectedMeetup] = useState<CircleMeetupInfo | undefined>(undefined);

  const handleCreateFormClose = useCallback(() => {
    setMeetup(undefined);
    setShowCreateForm(false);
    refetch(); // Refresh meetups after form close (successful edit/create)
  }, [refetch]);

  const handleCircleClick = useCallback((meetup: CircleMeetupInfo) => {
    setSelectedMeetup(meetup);
    setIsModalOpen(true);
  }, []);

  const handleNavigate = useCallback(() => {
    navigate("/dashboard/learningcircle");
  }, [navigate]);

  const handleEdit = useCallback((meetupId: string) => {
    setMeetup(meetups.find(m => m.id === meetupId));
    setOpen(false);
    setShowCreateForm(true);
  }, [meetups]);

  const handleDelete = useCallback(async (meetupId: string) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await deleteScheduleMeetup({ meetId: meetupId });
        await refetch(); // Refresh meetups after successful deletion
        setSelectedCircle(null);
      } catch (error) {
        console.error("Failed to delete meetup:", error);
      }
    }
  }, [refetch]);

  const handleClick = useCallback((id: string) => {
    setSelectedCircle(id);
    setOpen(true);
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h3 className={styles.title}>Learning Circles</h3>
          <span className={styles.arrow} onClick={handleNavigate}>
            ›
          </span>
        </div>

        {isLoading ? (
          <div className={styles.loaderContainer}>
            <MuLoader />
          </div>
        ) : meetups.filter(circle => {
          const domainIds = currentIgsData[domain.toLowerCase()] || [];
          return domainIds.includes(circle.ig_id);
        }).length === 0 ? (
          <div className={styles.noLc}>
            <img src={EmptyImage} alt="No Learning Circle Found!" className={styles.emptyImage} />
            <div className={styles.content}>
              <h2 className={styles.title}>No Learning Circle Found!</h2>
              <button
                className={styles.createButton}
                onClick={() => navigate("/dashboard/learningcircle")}
              >
                Create Now
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.gridContainer}>
            {meetups.filter(circle => {
              const domainIds = currentIgsData[domain.toLowerCase()] || [];
              return domainIds.includes(circle.ig_id);
            }).map((circle) => (
              <LearningCircleListItem
                {...meetups.find((circle) => circle.id === selectedCircle)!}
                key={circle.id}
                {...circle}
                onClick={() => handleClick(circle.id)}
              />
            ))}
          </div>
        )}
        {selectedCircle && (
          <LearningCircleCard
            {...meetups.find((circle) => circle.id === selectedCircle)!}
            onClose={() => setSelectedCircle(null)}
            open={open}
            setOpen={setOpen}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        )}
        <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
          <DialogOverlay />
          <DialogContent className={styles.dialogContent}>
            <CreateLearningCircleForm onClose={handleCreateFormClose} meetUp={meetup} />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default memo(LearningCirclesSection);