import { Search, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch" // Import the Switch component
import { LearningCircleCard } from "./components/learning-circle-card"
import { LearningCircleListItem } from "./components/learning-circle-list-item"
import { Dialog, DialogContent, DialogOverlay, DialogTrigger } from "@/components/ui/dialog"
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";
import styles from "./LearningCircleLanding2.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteScheduleMeetup,
  getMeetupInfo,
  getMeetups,
} from "../../services/LearningCircleAPIs";
import { CircleMeetupInfo } from "../../services/LearningCircleInterface";
import { useUserStore } from "/src/ZustandProvider";
import { CreateLearningCircleForm } from "./components/create-learning-circle-form"
import { getInterests } from "../../../ManageUsers/apis"
import ReactSelect from "react-select"
import { Label } from "@/components/ui/label"

interface Option {
  value: string;
  label: string;
}

const INITIAL_INTERESTS = [
  { label: "All Categories", value: "all" },
  { label: "Coder", value: "coder" },
  { label: "Maker", value: "maker" },
  { label: "Manager", value: "manager" },
  { label: "Creative", value: "creative" }
];

// Sample data
const imageUrls = [
  { title: "UI UX", image: "/assets/IG/Cover/1.png" },
  { title: "Web Development", image: "/assets/IG/Cover/2.png" },
  { title: "Cyber Security", image: "/assets/IG/Cover/3.png" },
  { title: "Digital Marketing", image: "/assets/IG/Cover/4.png" },
  { title: "Game Dev", image: "/assets/IG/Cover/5.png" },
  { title: "Cloud And Devops", image: "/assets/IG/Cover/6.png" },
  { title: "Product Management", image: "/assets/IG/Cover/7.png" }
];

export default function LearningCircleLanding() {
  const [isLoading, setisLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Option | null>(
    INITIAL_INTERESTS[0]
  );
  const [meetups, setMeetups] = useState<CircleMeetupInfo[]>([]);
  const [meetup, setMeetup] = useState<CircleMeetupInfo>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMeetup, setSelectedMeetup] = useState<CircleMeetupInfo>();
  const navigate = useNavigate();

  // Existing states
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCircle, setSelectedCircle] = useState<string | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [open, setOpen] = useState(false)

  // New filter states
  const currentLoggedInUser = useUserStore((state) => state.userProfile.id);
  const [createdByMe, setCreatedByMe] = useState(false);
  const [interestOptions, setInterestOptions] = useState<Option[]>(INITIAL_INTERESTS);
  const [selectedInterest, setSelectedInterest] = useState<Option | null>(INITIAL_INTERESTS[0]);
  const [showOld, setShowOld] = useState(false);

  useEffect(() => {
    getInterests().then((interests) => {
      // Assuming interests is an array of { label, value }
      setInterestOptions([{ label: "All Categories", value: "all" }, ...interests]);
    });
  }, []);

  useEffect(() => {
    setisLoading(true);
    getMeetups(selectedCategory?.value).then(res => {
      setMeetups(res);
      setisLoading(false);
    });
  }, [selectedCategory]);


  useEffect(() => {
    if (selectedCircle) {
      getMeetupInfo(selectedCircle as string).then(res => {
        setSelectedMeetup(res as CircleMeetupInfo);
      });
    }
  }, [selectedCircle]);

  const handleModalOpen = (event: CircleMeetupInfo) => {
    setSelectedMeetup(event)
    setIsModalOpen(true)
  }

  const handleEdit = (meetupId: string) => {
    setMeetup(meetups.find(m => m.id === meetupId))
    setOpen(false)
    setShowCreateForm(true);
  };

  const handleDelete = async (meetupId: string) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      deleteScheduleMeetup({ meetId: meetupId }).then((data) => {
        if (data) {
          setisLoading(true);
          onRefresh();
          setSelectedCircle(null);
          setOpen(false);
        }
      })
    }
  };

  const filteredCircles = meetups
    .filter((circle) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        circle.title.toLowerCase().includes(searchLower) ||
        circle.description.toLowerCase().includes(searchLower) ||
        circle.ig_name.toLowerCase().includes(searchLower)
      );
    })
    .filter((circle) => {
      // Filter for circles created by the current user if toggle is on
      if (createdByMe) {
        return circle.created_by_id === currentLoggedInUser;
      }
      return true;
    })
    .filter((circle) => {
      // Filter by interest group if a specific interest is selected
      if (selectedInterest && selectedInterest.value !== "all") {
        return circle.ig_id === selectedInterest.value;
      }
      return true;
    })
    .filter((circle) => {
      const meetupTime = new Date(circle.meet_time);
      if (isNaN(meetupTime.getTime())) return false;
      const twentyFourHoursAgo = new Date();
      twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 72); // Changed from 2 to 24
      // If showOld is true, show circles that are already in the past; otherwise show upcoming ones
      return showOld ? meetupTime < twentyFourHoursAgo : meetupTime >= twentyFourHoursAgo;
    })
    .sort((a, b) => {
      // First, sort circles created by the current user to the top
      const aIsMine = a.created_by_id === currentLoggedInUser;
      const bIsMine = b.created_by_id === currentLoggedInUser;
      if (aIsMine && !bIsMine) return -1;
      if (!aIsMine && bIsMine) return 1;
      // Then, sort by meeting time (upcoming ones first)
      const dateA = new Date(a.meet_time).getTime();
      const dateB = new Date(b.meet_time).getTime();
      return dateA - dateB;
    });

  const handleCreateFormClose = () => {
    setMeetup(undefined)
    setShowCreateForm(false)
  }

  const handleClick = (id: string) => {
    setSelectedCircle(id)
    setOpen(true);
  }

  const onRefresh = () => {
    getMeetups(selectedCategory?.value).then(res => {
      setMeetups(res);
      setisLoading(false);
    });
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.headerSection}>
          <div className={styles.headerTextContainer}>
            <h1 className={styles.headerTitle}>Learning Circles</h1>
            <p className={styles.headerDescription}>
              Join collaborative learning groups focused on specific topics. Learn together, share knowledge, and track your progress in a supportive community.
            </p>
          </div>
          <div className={styles.createButtonContainer}>
            <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
              <DialogTrigger asChild>
                <Button className={styles.createButton}>
                  <Plus className={styles.icon} />
                  Create Learning Circle
                </Button>
              </DialogTrigger>
              <DialogOverlay />
              <DialogContent className={styles.dialogContent}>
                <CreateLearningCircleForm onClose={handleCreateFormClose} meetUp={meetup} onRefresh={() => {
                  setisLoading(true);
                  onRefresh();
                }
                } />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* New Filters Container */}
        {/* <div className={styles.filtersMainWrapper}> */}
          <div className={styles.filtersWrapper}>
            <div className={styles.searchContainer}>
              <Search className={styles.searchIcon} />
              <Input
                placeholder="Search by title, description or category..."
                className={styles.searchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className={styles.filterItem}>
              {/* <select
                value={selectedInterest ? selectedInterest.value : "all"}
                onChange={(e) => {
                  const value = e.target.value;
                  const option =
                    interestOptions.find((opt) => opt.value === value) || {
                      label: "All Categories",
                      value: "all",
                    };
                  setSelectedInterest(option);
                }}
              >
                {interestOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select> */}
              <ReactSelect<Option, false>
                options={interestOptions}
                name="interestGroup"
                placeholder="Select Interest Group"
                value={selectedInterest}
                onChange={(selectedOption) => setSelectedInterest(selectedOption)}
              />
            </div>
            {/* <div className={styles.filtersWrapper}>
              <div className={styles.filterItem}>
                <Label style={{ marginLeft: '4px' }} htmlFor="isOnline">
                  Created By Me
                </Label>
                <Switch
                  id="createdByMe"
                  checked={createdByMe}
                  onCheckedChange={(checked) => setCreatedByMe(checked)}
                />
              </div>
              <div className={styles.filterItem}>
                <Label style={{ marginLeft: '4px' }} htmlFor="showOld">
                  Old Learning Circles
                </Label>
                <Switch
                  id="showOld"
                  checked={showOld}
                  onCheckedChange={(checked) => setShowOld(checked)}
                />
              </div>
            </div> */}
          </div>
        {/* </div> */}

        {/* End New Filters Container */}

        {isLoading && <MuLoader />}

        <div className={styles.gridContainer}>
          {filteredCircles.map((circle) => {
            return <LearningCircleListItem key={circle.id} {...circle} attendees_count={circle.attendees_count} onClick={() => handleClick(circle.id)} />
          })}
        </div>

        {filteredCircles.length === 0 && !isLoading && (
          <div className={styles.noResultsContainer}>
            <h3 className={styles.noResultsTitle}>No learning circles found</h3>
            <p className={styles.noResultsDescription}>Try adjusting your search or create a new learning circle</p>
          </div>
        )}
      </div>

      <LearningCircleCard
        {...selectedMeetup!}
        onClose={() => setSelectedCircle(null)}
        open={open}
        setOpen={setOpen}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </main>
  )
}