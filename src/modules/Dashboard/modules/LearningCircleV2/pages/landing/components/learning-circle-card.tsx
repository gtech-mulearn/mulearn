"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, Dialog, DialogOverlay } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet";
import { Users, Wifi, WifiOff, QrCode, X, Copy, Edit, Trash2, CheckCircle, User, LocateFixedIcon, Clock } from "lucide-react";
import styles from "./learning-circle-card.module.css";
import { CircleMeetingAttendee } from "../../../services/LearningCircleInterface";
import { useUserStore } from "/src/ZustandProvider";
import toast from "react-hot-toast";
import { fetchURLQRCode } from "@/modules/Dashboard/modules/LearningCircle/services/LearningCircleAPIs";
import { joinMeetup } from "../../../services/LearningCircleAPIs";
import { VisuallyHidden } from "@chakra-ui/react";
import { IDetectedBarcode, Scanner } from '@yudiel/react-qr-scanner';
import { AxiosError } from "axios";

interface Member {
  id: string;
  name: string;
}

interface LearningCircleCardProps {
  id: string;
  title: string;
  description?: string;
  created_by_id?: string;
  ig_name: string;
  ig?: string;
  imageUrl?: string;
  meet_code?: string;
  mode: string;
  meet_place: string;
  meet_link: string;
  meet_time: string;
  attendees: CircleMeetingAttendee[] | null;
  is_joined?: boolean;
  hasCompleted?: boolean;
  is_rsvp: boolean;
  members?: Member[];
  open: boolean;
  created_by: string;
  setOpen: (value: boolean) => void;
  onClose: () => void;
  handleDelete: (meetUpId: string) => void;
  handleEdit: (meetupId: string) => void;
}

// Helper function to format attendees display
const formatAttendeesDisplay = (attendees: CircleMeetingAttendee[]) => {
  if (!attendees || attendees.length === 0) return "No attendees yet";

  const visibleAttendees = attendees.slice(0, 5);
  const remainingCount = attendees.length - 5;

  const attendeeNames = visibleAttendees.map(attendee => attendee.full_name).join(", ");

  if (remainingCount > 0) {
    return `${attendeeNames} +${remainingCount} others`;
  }
  return attendeeNames;
};

export function LearningCircleCard({
  id,
  title,
  description,
  ig_name,
  ig,
  mode,
  attendees = [],
  meet_place,
  meet_link,
  meet_time,
  imageUrl,
  meet_code,
  is_joined,
  hasCompleted,
  is_rsvp,
  open,
  setOpen,
  handleDelete,
  handleEdit,
  created_by,
  created_by_id,
  members = [],
  onClose,
  ...data
}: LearningCircleCardProps) {
  const [showJoinInput, setShowJoinInput] = useState(false);
  const [joiningCodeInput, setJoiningCodeInput] = useState("");
  const [isJoined, setIsJoined] = useState(is_joined);
  const [isCompleted, setIsCompleted] = useState(hasCompleted);
  const [blob, setBlob] = useState('');
  const [showQrCode, setShowQrCode] = useState(false);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [learningSummary, setLearningSummary] = useState("");
  const [showMembersList, setShowMembersList] = useState(false);
  const [showQrScanner, setShowQrScanner] = useState(false);

  const [isMeetJoinable, setIsMeetJoinable] = useState(false);

  useEffect(() => {
    const currentTime = new Date().getTime();
    const meetTime = new Date(meet_time).getTime();
    setIsMeetJoinable(currentTime >= meetTime);
  }, [meet_time]);

  useEffect(() => {
    fetchURLQRCode(
      setBlob,
      meet_code as string,
    );
  }, [meet_code]);

  const currentLoggedInUser = useUserStore((state) => state.userProfile.id);
  const isCreator = created_by_id === currentLoggedInUser;

  const handleClose = () => {
    setOpen(false);
    setJoiningCodeInput('');
    setShowJoinInput(false);
    onClose();
  };

  const handleBadgeClick = () => {
    if (mode === 'online') {
      navigator.clipboard.writeText(meet_link);
      toast.success('Meet link is copied');
    }
  };


  const handleJoin = async () => {
    if (!isMeetJoinable) {
      toast.error("The meeting hasn't started yet. Please wait until the scheduled time.");
      return;
    }
    try {
      const response = await joinMeetup(id, joiningCodeInput);
      setIsJoined(true);
      setShowJoinInput(false);
      toast.success("Successfully joined the learning circle");
    } catch (err: any) {
      console.error('Failed to join meetup:', err, id);
      if (err?.message?.general) {
        toast.error(err.message?.general[0]);
      } else {
        toast.error("Failed to join learning circle");
      }
    }
  };

  const handleSubmitReport = () => {
    if (learningSummary.trim()) {
      setIsCompleted(true);
      setShowCongratulations(true);
    }
  };

  const copyJoiningCode = () => {
    navigator.clipboard.writeText(meet_code || '');
    toast.success('Copied joining code');
  };

  const handleScan = (detectedCodes: IDetectedBarcode[]) => {
    if (detectedCodes.length > 0) {
      const data = detectedCodes[0].rawValue;
      setJoiningCodeInput(data);
      setShowQrScanner(false);
      if (joiningCodeInput === meet_code) {
        handleJoin();
      }
    }
  };

  const handleError = (err: any) => {
    console.error('QR Scan Error:', err);
    // toast.error('Failed to scan QR code. Please try again.');
    return;
  };

  return (
    <>
      <Dialog open={open} onOpenChange={(value) => { setOpen(value); if (!value) onClose(); }}>
        <DialogOverlay />
        <DialogContent className={styles.dialogContent} title="Learning Circle Details" aria-describedby="learning-circle-description">
          <VisuallyHidden>
            <DialogTitle>Learning circle Description</DialogTitle>
          </VisuallyHidden>
          <Card className={styles.card}>
            <CardContent className={styles.cardContent}>
              <h2 className={styles.cardTitle}>
                {title}
                <span className={styles.memberCount}>
                  <Users className={styles.memberIcon} />
                  <span>{attendees?.length} {attendees?.length === 1 ? 'member' : 'members'}</span>
                </span>
              </h2>
              <p className={styles.cardDescription}>{description}</p>

              <div className={styles.badgeContainer}>
                <Badge variant="secondary" className={styles.categoryBadge}>{ig}</Badge>
                <Badge variant="outline" className={styles.onlineBadge}>
                  {mode === 'online' ? <><Wifi className={styles.onlineIcon} /><span>Online</span></>
                    : <><WifiOff className={styles.offlineIcon} /><span>Offline</span></>}
                </Badge>

                {/* <Sheet open={showMembersList} onOpenChange={setShowMembersList}> */}
                {/* <SheetTrigger asChild> */}
                <Badge variant="outline" className={styles.membersBadge}>
                  <Users className={styles.icon} />
                  <span>{attendees?.length} {attendees?.length === 1 ? 'member' : 'members'}</span>
                </Badge>
                {/* </SheetTrigger> */}
                {/* <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Members</SheetTitle>
                      <SheetDescription>People who have joined this learning circle.</SheetDescription>
                    </SheetHeader>
                    <div className={styles.membersList}>
                      {members.map((member) => (
                        <div key={member.id} className={styles.memberItem}>
                          <div className={styles.memberAvatar}>
                            <User className={styles.icon} />
                          </div>
                          <span>{member.name}</span>
                        </div>
                      ))}
                    </div>
                  </SheetContent> */}
                {/* </Sheet> */}
              </div>

              <div className={styles.badgeContainer}>
                <Badge variant="outline" className={styles.onlineBadge} onClick={handleBadgeClick}>
                  <LocateFixedIcon className={styles.icon} />
                  {mode === 'online' ? <span>Meet Link</span> : <span>{meet_place}</span>}
                </Badge>
                <Badge variant="outline" className={styles.onlineBadge}>
                  <Clock className={styles.clockIcon} />
                  <span>{(new Date(meet_time).toLocaleString("en-IN", { hour12: true })).toUpperCase()}</span>
                </Badge>
                {is_rsvp && (
                  <Badge className={styles.onlineBadge}>
                    <CheckCircle className={styles.icon} />
                    RSVP Confirmed
                  </Badge>
                )}
              </div>

              {/* Attendees Section */}
              {/* <div className={styles.attendeesContainer}>
                <p className={styles.attendeesLabel}>Attendees:</p>
                <p className={styles.attendeesNames}>
                  {formatAttendeesDisplay(attendees || [])}
                </p>
              </div> */}

              {isCreator && (
                <>
                  <div className={styles.joiningCodeContainer}>
                    <div className={styles.joiningCodeDetails}>
                      <p className={styles.joiningCodeLabel}>Joining Code</p>
                      <p className={styles.joiningCode}>{meet_code}</p>
                    </div>
                    <div className={styles.joiningCodeActions}>
                      <Button size="icon" variant="outline" onClick={copyJoiningCode}>
                        <Copy className={styles.icon} />
                      </Button>
                      <Button size="icon" variant="outline" onClick={() => setShowQrCode(!showQrCode)}>
                        <QrCode className={styles.icon} />
                      </Button>
                    </div>
                  </div>
                  {showQrCode && (
                    <div className={styles.qrCodeContainer}>
                      <img src={blob} alt="QR Code" className={styles.qrCode} />
                    </div>
                  )}
                </>
              )}

              {isJoined && !isCompleted && (
                <div className={styles.learningSummaryContainer}>
                  <label className={styles.learningSummaryLabel}>Learning Summary</label>
                  <Textarea
                    placeholder="Share what you've learned in this circle..."
                    className={styles.textarea}
                    value={learningSummary}
                    onChange={(e) => setLearningSummary(e.target.value)}
                  />
                </div>
              )}

              {showJoinInput && !isJoined && !isCreator && (
                <div className={styles.joinInputContainer}>
                  <Input
                    placeholder="Enter joining code"
                    className={styles.input}
                    value={joiningCodeInput}
                    onChange={(e) => setJoiningCodeInput(e.target.value)}
                  />
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => setShowQrScanner(true)}
                  >
                    <QrCode className={styles.icon} />
                  </Button>
                </div>
              )}
            </CardContent>

            <CardFooter className={styles.cardFooter}>
              {isCreator && (
                <div className={styles.actionButtons}>
                  <Button size="icon" variant="outline" className={styles.editButton} onClick={() => handleEdit(id)}>
                    <Edit className={styles.icon} />
                  </Button>
                  <Button size="icon" variant="outline" className={styles.deleteButton} onClick={() => handleDelete(id)}>
                    <Trash2 className={styles.icon} />
                  </Button>
                </div>
              )}
              <Button variant="outline" className={styles.closeButton} onClick={handleClose}>
                <X className={styles.icon} />Close
              </Button>
              {!isJoined && !isCreator ? (
                <Button
                  className={styles.joinButton}
                  onClick={() => (showJoinInput ? handleJoin() : setShowJoinInput(true))}
                >
                  {showJoinInput ? "Join Circle" : "Enter Code"}
                </Button>
              ) : isJoined && !isCompleted ? (
                <Button
                  className={styles.submitButton}
                  onClick={handleSubmitReport}
                  disabled={!learningSummary.trim()}
                >
                  Submit Report
                </Button>
              ) : null}
            </CardFooter>
          </Card>
        </DialogContent>
      </Dialog>

      <Dialog open={showQrScanner} onOpenChange={setShowQrScanner}>
        <DialogContent className={styles.dialogContent} title="Scan QR Code" aria-describedby="qr-scan-description">
          <VisuallyHidden>
            <DialogTitle>QR Scanner</DialogTitle>
          </VisuallyHidden>
          <DialogHeader>
            <DialogTitle>Scan QR Code</DialogTitle>
            <DialogDescription>
              Point your camera at the QR code to scan the joining code.
            </DialogDescription>
          </DialogHeader>
          <div className={styles.qrScannerContainer}>
            <Scanner
              onScan={handleScan}
              onError={handleError}
              constraints={{ facingMode: 'environment' }}
              components={{
                audio: false,
                finder: true,
              }}
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowQrScanner(false)}
            className={styles.closeButton}
          >
            <X className={styles.icon} /> Close
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog open={showCongratulations} onOpenChange={setShowCongratulations}>
        <DialogContent className={styles.dialogContent} title="Congratulations!" aria-describedby="congrats-description">
          <VisuallyHidden>
            <DialogTitle>Congratulations!</DialogTitle>
          </VisuallyHidden>
          <DialogHeader>
            <DialogTitle className={styles.congratsTitle}>🎉 Congratulations! 🎉</DialogTitle>
            <DialogDescription className={styles.congratsDescription}>
              You've successfully completed the <span className={styles.bold}>{title}</span> learning circle.
            </DialogDescription>
          </DialogHeader>
          <div className={styles.congratsIconContainer}>
            <div className={styles.congratsIcon}>
              <CheckCircle className={styles.icon} />
            </div>
          </div>
          <div className={styles.congratsMessage}>
            <p>Keep exploring and growing your skills!</p>
            <div className={styles.continueButtonContainer}>
              <Button onClick={() => { setShowCongratulations(false); handleClose(); }}>
                Continue Learning
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}