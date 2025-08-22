import styles from "./MoreInfoLC.module.css";
import { FiChevronLeft } from "react-icons/fi";
import { CiLocationOn, CiClock2 } from "react-icons/ci";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useCallback, useRef } from "react";
import {
    getLearningCircleInfo,
    getManageRequests,
    getMeetingsByCircleId,
    createMeetingByCircleId,
    submitRSVP,
    getInterestGroups
} from "../../services/LearningCircleAPIs";
import MuModal from "@/MuLearnComponents/MuModal/MuModal";
import {
    FaBookmark, 
    FaUniversity, 
    FaLayerGroup, 
    FaMapMarkerAlt, 
    FaUsers, 
    FaCalendarAlt, 
    FaLink, 
    FaEdit, 
    FaTrash, 
    FaTimes,
    FaPlus,
    FaEye
} from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { useUserStore } from "../../../../../../ZustandProvider";
import { privateGateway } from "@/MuLearnServices/apiGateways";
import toast from "react-hot-toast";
import { learningCircleRoutes } from "@/MuLearnServices/urls";
import Select from "react-select";

// Types for better type safety
interface CircleData {
    id: string;
    title: string;
    description: string;
    ig: string;
    org: string;
    created_by: {
        id?: string;
        full_name: string;
        profile_pic: string;
        muid: string;
    };
    rank: number;
    total_karma: number;
    total_members: number;
}

interface MeetingData {
    id: string;
    title: string;
    description?: string;
    meet_time: string;
    meet_place?: string;
    mode: string;
    meet_link?: string;
    is_rsvp: boolean;
    attendees_count: number;
    created_by_id?: string;
}

interface MemberData {
    id: string;
    full_name: string;
    muid: string;
    profile_pic?: string;
    ig_karma?: number;
}

interface MeetingForm {
    title: string;
    description: string;
    meet_time: string;
    duration: number;
    meet_link: string;
    meeting_type: 'Online' | 'Offline';
    platform: string;
    location: string;
}

interface EditForm {
    title: string;
    description: string;
    ig: string;
    meeting_type: string;
    location: string;
    time: string;
}

export default function MoreInfoLC() {
    const navigate = useNavigate();
    const params = useParams();
    const userId = useUserStore((state) => state.userProfile.id);
    
    // Main data states
    const [circle, setCircle] = useState<CircleData | null>(null);
    const [meetings, setMeetings] = useState<MeetingData[]>([]);
    const [loading, setLoading] = useState(true);
    
    // Ref to prevent duplicate API calls in Strict Mode
    const dataLoadedRef = useRef(false);
    
    // Modal states
    const [showRequestsModal, setShowRequestsModal] = useState(false);
    const [showMembersModal, setShowMembersModal] = useState(false);
    const [showCreateMeetingModal, setShowCreateMeetingModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    
    // Data states
    const [requests, setRequests] = useState<any[] | null>(null);
    const [members, setMembers] = useState<MemberData[] | null>(null);
    const [igOptions, setIgOptions] = useState<{label: string, value: string}[]>([]);
    
    // Loading states
    const [loadingRequests, setLoadingRequests] = useState(false);
    const [loadingMembers, setLoadingMembers] = useState(false);
    const [creatingMeeting, setCreatingMeeting] = useState(false);
    const [editLoading, setEditLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    
    // Error states
    const [createError, setCreateError] = useState<string | null>(null);
    const [editError, setEditError] = useState<string | null>(null);
    const [deleteError, setDeleteError] = useState<string | null>(null);
    
    // Form states
    const [meetingForm, setMeetingForm] = useState<MeetingForm>({
        title: '',
        description: '',
        meet_time: '',
        duration: 1,
        meet_link: '',
        meeting_type: 'Offline',
        platform: '',
        location: ''
    });
    
    const [editForm, setEditForm] = useState<EditForm>({
        title: "",
        description: "",
        ig: "",
        meeting_type: "Offline",
        location: "",
        time: ""
    });

    // Computed values
    // Check if current user is the creator of the Learning Circle
    const isCircleCreator = !!circle && !!circle.created_by && circle.created_by.id === userId;
    const isMember = !!circle && !!circle.created_by && circle.created_by.muid === userId;

    // Fetch initial data - only essential data
    const fetchCircleData = useCallback(async () => {
        if (!params.id) return;
        
        setLoading(true);
        try {
            // Only fetch essential data initially
            const [circleRes, meetingsRes] = await Promise.all([
                getLearningCircleInfo(params.id),
                getMeetingsByCircleId(params.id)
            ]);
            
            setCircle(circleRes as CircleData);
            setMeetings(meetingsRes || []);
        } catch (error) {
            toast.error("Failed to load learning circle data");
            console.error("Error fetching circle data:", error);
        } finally {
            setLoading(false);
        }
    }, [params.id]);

    // Refresh function for when we need fresh data
    const refreshData = useCallback(async () => {
        await fetchCircleData();
    }, [fetchCircleData]);

    useEffect(() => {
        if (!dataLoadedRef.current) {
            dataLoadedRef.current = true;
            fetchCircleData();
        }
        
        return () => {
            dataLoadedRef.current = false;
        };
    }, [fetchCircleData]);

    // Handlers
    const handleRSVP = async (meetingId: string) => {
        if (!meetingId) return;
        
        try {
        const success = await submitRSVP(meetingId);
        if (success) {
                toast.success('RSVP submitted successfully!');
                // Update local state instead of making new API call
                setMeetings(prev => prev.map(meet => 
                    meet.id === meetingId 
                        ? { ...meet, is_rsvp: true, attendees_count: (meet.attendees_count || 0) + 1 }
                        : meet
                ));
        } else {
                toast.error('Failed to submit RSVP.');
            }
        } catch (error) {
            toast.error('Failed to submit RSVP.');
        }
    };

    const handleOpenRequestsModal = async () => {
        setShowRequestsModal(true);
        setLoadingRequests(true);
        
        try {
        if (params.id) {
            const res = await getManageRequests(params.id);
            setRequests(res || []);
        }
        } catch (error) {
            toast.error("Failed to load requests");
        } finally {
        setLoadingRequests(false);
        }
    };

    const handleOpenMembersModal = async () => {
        setShowMembersModal(true);
        setLoadingMembers(true);
        
            try {
            if (params.id) {
                const res = await privateGateway.get(`/api/v1/dashboard/learningcircle/members/${params.id}`);
                setMembers(res.data.response || []);
            }
        } catch (error) {
            setMembers([]);
            toast.error("Failed to load members");
        } finally {
        setLoadingMembers(false);
        }
    };

    const handleCreateMeeting = async (e: React.FormEvent) => {
        e.preventDefault();
        setCreatingMeeting(true);
        setCreateError(null);
        
        if (!params.id) {
            setCreateError('Circle ID is missing.');
            setCreatingMeeting(false);
            return;
        }
        
        try {
            const res = await createMeetingByCircleId(params.id, meetingForm);
            if (res.data?.hasError) {
                setCreateError(res.data?.message?.general?.[0] || 'Error creating meeting');
            } else {
                setShowCreateMeetingModal(false);
                // Add new meeting to local state instead of making new API call
                const newMeeting = {
                    id: Date.now().toString(), // Temporary ID
                    title: meetingForm.title,
                    description: meetingForm.description,
                    meet_time: meetingForm.meet_time,
                    meet_link: meetingForm.meet_link,
                    mode: 'online',
                    is_rsvp: false,
                    attendees_count: 0,
                    created_by_id: userId
                };
                setMeetings(prev => [...prev, newMeeting]);
                // Reset form
                setMeetingForm({
                    title: '',
                    description: '',
                    meet_time: '',
                    duration: 1,
                    meet_link: '',
                    meeting_type: 'Offline',
                    platform: '',
                    location: ''
                });
                toast.success("Meeting created successfully!");
            }
        } catch (error) {
            setCreateError('Network error');
            toast.error("Failed to create meeting");
        } finally {
        setCreatingMeeting(false);
        }
    };

    // Prefill edit form when opening modal
    useEffect(() => {
        if (showEditModal && circle && igOptions.length > 0) {
            // Find the IG option that matches the current circle.ig (id)
            const defaultIg = igOptions.find(opt => opt.value === circle.ig) || igOptions[0] || { value: '', label: '' };
            setEditForm({
                title: circle.title || "",
                description: circle.description || "",
                ig: defaultIg.value,
                meeting_type: "Offline",
                location: "",
                time: ""
            });
        }
    }, [showEditModal, circle, igOptions]);

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setEditLoading(true);
        setEditError(null);
        try {
            if (!circle) {
                setEditError("Learning Circle not loaded.");
                setEditLoading(false);
                return;
            }
            // Get org ID from user profile
            const orgId = useUserStore.getState().userProfile.college_id;
            // Use ig from editForm (should be ID if using dropdown)
            const payload = {
                ig: editForm.ig, // should be the IG ID
                org: orgId,      // org ID from user profile
                title: editForm.title,
                description: editForm.description
            };
            const res = await privateGateway.put(`/api/v1/dashboard/learningcircle/edit/${circle.id}/`, payload);
            if (res.status === 200 && res.data?.hasError === false) {
                setCircle((prev: any) => ({ ...prev, ...payload }));
                setShowEditModal(false);
                toast.success("Learning Circle updated successfully!");
            } else {
                setEditError(res.data?.message?.general?.[0] || "Failed to update learning circle.");
            }
        } catch (err: any) {
            setEditError(err?.response?.data?.message?.general?.[0] || "Network error");
            toast.error("Failed to update learning circle");
        } finally {
            setEditLoading(false);
        }
    };

    const handleDeleteCircle = async () => {
        setDeleteLoading(true);
        setDeleteError(null);
        
        try {
            const deleteUrl = learningCircleRoutes.deleteLearningCircle.replace("${id}", circle?.id ?? "");
            const res = await privateGateway.delete(deleteUrl);
            if (res.status === 200 && res.data?.response) {
                setShowDeleteConfirm(false);
                toast.success("Learning circle deleted successfully!");
                navigate("/dashboard/learningcircle");
            } else {
                setDeleteError(res.data?.message?.general?.[0] || "Failed to delete learning circle.");
            }
        } catch (err: any) {
            setDeleteError(err?.response?.data?.message?.general?.[0] || "Network error");
            toast.error("Failed to delete learning circle");
        } finally {
        setDeleteLoading(false);
        }
    };

    // Fetch IG options on load
    useEffect(() => {
    getInterestGroups().then((igs) => setIgOptions(igs || []));
    }, []);

    useEffect(() => {
        if (showEditModal && circle && igOptions.length > 0) {
            // Find the IG option that matches the current circle.ig (id)
            const defaultIg = igOptions.find(opt => opt.value === circle.ig) || igOptions[0] || { value: '', label: '' };
            setEditForm({
                title: circle.title || "",
                description: circle.description || "",
                ig: defaultIg.value,
                meeting_type: "Offline",
                location: "",
                time: ""
            });
        }
    }, [showEditModal, circle, igOptions]);

    if (loading) {
        return (
            <div className={styles.container}>
                <div className={styles.loadingContainer}>
                    <div className={styles.loadingSpinner}></div>
                    <p>Loading learning circle details...</p>
                </div>
            </div>
        );
    }

    if (!circle) {
        return (
            <div className={styles.container}>
                <div className={styles.errorContainer}>
                    <h2>Learning Circle Not Found</h2>
                    <p>The learning circle you're looking for doesn't exist or you don't have permission to view it.</p>
                    <button 
                        onClick={() => navigate("/dashboard/learningcircle")}
                        className={styles.backButton}
                    >
                        Back to Learning Circles
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div
                className={styles.backLink}
                onClick={() => navigate(-1)}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    color: '#64748b',
                    fontSize: '1rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    padding: '12px 16px',
                    borderRadius: 8,
                    transition: 'all 0.2s ease',
                    marginBottom: 24,
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#f1f5f9';
                    e.currentTarget.style.color = '#475569';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#f8fafc';
                    e.currentTarget.style.color = '#64748b';
                }}
            >
                <FiChevronLeft style={{ fontSize: '1.2rem' }} />
                <span>Learning Circles</span>
            </div>

            <div className={styles.card} style={{ position: 'relative' }}>
                {/* Action buttons for LC creator only */}
                {isCircleCreator && (
                    <div className={styles.actionButtons}>
                        <button
                            className={`${styles.actionButton} ${styles.edit}`}
                            title="Edit Circle"
                            onClick={() => setShowEditModal(true)}
                        >
                            <FaEdit />
                        </button>
                        <button
                            className={`${styles.actionButton} ${styles.delete}`}
                            title="Delete Circle"
                            onClick={() => setShowDeleteConfirm(true)}
                        >
                            <FaTrash />
                        </button>
                        <button
                            className={styles.primaryButton}
                            onClick={handleOpenRequestsModal}
                        >
                            Pending Requests
                        </button>
                    </div>
                )}
                
                <div className={styles.cardHeaderContent}>
                    <div className={styles.headerSection}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 12, position: 'relative', width: '100%' }}>
                            {/* IG Badge */}
                            {circle?.ig && (
                                <span style={{
                                    display: 'inline-block',
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    color: 'white',
                                    fontWeight: 600,
                                    fontSize: '0.9rem',
                                    borderRadius: 20,
                                    padding: '6px 16px',
                                    marginBottom: 4,
                                    letterSpacing: 0.3,
                                    marginTop: 0,
                                    boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)'
                                }}>
                                    {circle.ig}
                                </span>
                            )}
                            <h1 className={styles.title} style={{
                                marginBottom: 0,
                                fontSize: '2.5rem',
                                fontWeight: 700,
                                color: '#1e293b',
                                lineHeight: 1.2,
                                marginTop: 4
                            }}>
                                {circle?.title || ""}
                            </h1>
                            {/* Description */}
                            <p>{circle.description}</p>
                        </div>
                    </div>
                </div>
                
                
                {/* Organization & Creator Info */}
                <div style={{ gridColumn: '1 / -1', marginBottom: 24, padding: '0 1.5rem' }}>
                    <div style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: 12,
                        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                        padding: '20px 24px',
                        borderRadius: 12,
                        border: '1px solid #e2e8f0'
                    }}>
                        {circle?.org && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div style={{
                                    background: '#3b82f6',
                                    color: 'white',
                                    borderRadius: '50%',
                                    width: 32,
                                    height: 32,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '0.9rem'
                                }}>
                                    <FaUniversity />
                                </div>
                                <div>
                                    <div style={{ color: '#334155', fontSize: '1rem', fontWeight: 600 }}>
                                        {circle.org}
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {circle?.created_by && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div style={{
                                    background: '#10b981',
                                    color: 'white',
                                    borderRadius: '50%',
                                    width: 32,
                                    height: 32,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '0.9rem'
                                }}>
                                    <FaUsers />
                                </div>
                                <div>
                                    <div style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                        Created by
                                    </div>
                                    <div style={{ color: '#334155', fontSize: '1rem', fontWeight: 600 }}>
                                        {circle.created_by.full_name}
                                    </div>
                                    <div style={{ color: '#64748b', fontSize: '0.9rem' }}>
                                        {circle.created_by.muid}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                
                <div className={styles.cardContent}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                        <div className={styles.responsiveDetailsGrid}>
                        {/* Display specific fields from the new API response */}
                        {circle && (
                            <>
                                {/* Rank */}
                                <div 
                                    style={{
                                        background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                                        border: '1px solid #f59e0b',
                                        borderRadius: 16,
                                        padding: '24px 20px',
                                        boxShadow: '0 4px 12px rgba(245, 158, 11, 0.15)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        minHeight: 160,
                                        maxHeight: 160,
                                        height: 160,
                                        width: '16rem',
                                        maxWidth: '700px',
                                        transition: 'all 0.3s ease',
                                        position: 'relative',
                                        gap: 0
                                    }}
                                >
                                    <div style={{
                                        width: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        position: 'relative',
                                        flex: 1
                                    }}>
                                        <div style={{ 
                                            fontWeight: 700, 
                                            color: '#92400e', 
                                            marginBottom: 12, 
                                            textTransform: 'uppercase', 
                                            fontSize: '0.9rem', 
                                            textAlign: 'center',
                                            lineHeight: 1.3,
                                            width: '100%',
                                            letterSpacing: 1
                                        }}>
                                            Rank
                                        </div>
                                        <div style={{
                                            color: '#92400e',
                                            wordBreak: 'break-word',
                                            fontSize: '3rem',
                                            textAlign: 'center',
                                            marginTop: 8,
                                            marginBottom: 0,
                                            fontWeight: 800
                                        }}>
                                            {circle.rank || 0}
                                        </div>
                                    </div>
                                </div>

                                {/* Total Karma */}
                                <div 
                                    style={{
                                        background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                                        border: '1px solid #3b82f6',
                                        borderRadius: 16,
                                        padding: '24px 20px',
                                        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.15)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        minHeight: 160,
                                        maxHeight: 160,
                                        height: 160,
                                        width: '16rem',
                                        maxWidth: '700px',
                                        transition: 'all 0.3s ease',
                                        position: 'relative',
                                        gap: 0
                                    }}
                                >
                                    <div style={{
                                        width: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        position: 'relative',
                                        flex: 1
                                    }}>
                                        <div style={{ 
                                            fontWeight: 700, 
                                            color: '#1e40af', 
                                            marginBottom: 12, 
                                            textTransform: 'uppercase', 
                                            fontSize: '0.9rem', 
                                            textAlign: 'center',
                                            lineHeight: 1.3,
                                            width: '100%',
                                            letterSpacing: 1
                                        }}>
                                            Total Karma
                                        </div>
                                        <div style={{
                                            color: '#1e40af',
                                            wordBreak: 'break-word',
                                            fontSize: '3rem',
                                            textAlign: 'center',
                                            marginTop: 8,
                                            marginBottom: 0,
                                            fontWeight: 800
                                        }}>
                                            {circle.total_karma || 0}
                                        </div>
                                    </div>
                                </div>

                                {/* Total Members */}
                                <div 
                                    onClick={handleOpenMembersModal}
                                    style={{
                                        background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
                                        border: '1px solid #10b981',
                                        borderRadius: 16,
                                        padding: '24px 20px',
                                        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.15)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        minHeight: 160,
                                        maxHeight: 160,
                                        height: 160,
                                        width: '16rem',
                                        maxWidth: '700px',
                                        transition: 'all 0.3s ease',
                                        cursor: 'pointer',
                                        position: 'relative',
                                        gap: 0
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'linear-gradient(135deg, #bbf7d0 0%, #86efac 100%)';
                                        e.currentTarget.style.transform = 'translateY(-4px)';
                                        e.currentTarget.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.25)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)';
                                            e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.15)';
                                    }}
                                >
                                    <div style={{
                                        width: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        position: 'relative',
                                        flex: 1
                                    }}>
                                        <div style={{ 
                                            fontWeight: 700, 
                                            color: '#065f46', 
                                            marginBottom: 12, 
                                            textTransform: 'uppercase', 
                                            fontSize: '0.9rem', 
                                            textAlign: 'center',
                                            lineHeight: 1.3,
                                            width: '100%',
                                            letterSpacing: 1
                                        }}>
                                            Total Members
                                                <span style={{
                                                    position: 'absolute',
                                                top: -8,
                                                right: -8,
                                                background: '#10b981',
                                                    color: 'white',
                                                    borderRadius: '50%',
                                                width: 28,
                                                height: 28,
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                fontSize: '0.8rem',
                                                fontWeight: 700,
                                                boxShadow: '0 2px 8px rgba(16, 185, 129, 0.4)'
                                                }}>
                                                    →
                                                </span>
                                        </div>
                                        <div style={{
                                            color: '#065f46',
                                            wordBreak: 'break-word',
                                            fontSize: '3rem',
                                            textAlign: 'center',
                                            marginTop: 8,
                                            marginBottom: 0,
                                            fontWeight: 800
                                        }}>
                                            {circle.total_members || 0}
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Meetings Section */}
            <div className={styles.card} style={{ marginTop: 0 }}>
                <div className={styles.cardHeaderContent} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'center' }}>
                    <h2 className={styles.sectionTitle} style={{marginBottom: 0, textAlign: 'center'}}>Meetings</h2>
                    <button
                        className={styles.primaryButton}
                        onClick={() => setShowCreateMeetingModal(true)}
                        style={{ padding: '10px 32px', minWidth: '180px', marginLeft: '20px', marginTop: '80px' }}
                    >
                        <FaPlus style={{ marginRight: 8 }} />
                        Create Meeting
                    </button>
                </div>
                {meetings.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%', alignItems: 'flex-start', marginLeft: 32 }}>
                        {meetings.map((meet, idx) => (
                            <div key={meet.id || idx} className={styles.meetingCard}>
                                <div className={styles.meetingTitle}>
                                    {meet.title || 'Meeting'}
                                </div>
                                {meet.description && (
                                    <div className={styles.meetingDescription}>
                                        {meet.description}
                                    </div>
                                )}
                                <div className={styles.meetingInfo}>
                                    <FaCalendarAlt /> 
                                    {meet.meet_time ? new Date(meet.meet_time).toLocaleString() : ''}
                                </div>
                                <div className={styles.meetingInfo}>
                                    <FaMapMarkerAlt /> 
                                    {meet.meet_place || '—'}
                                </div>
                                <div style={{ color: '#334155', fontSize: '1.05rem', marginTop: 6 }}>
                                    <b>Mode:</b> {meet.mode ? (meet.mode.charAt(0).toUpperCase() + meet.mode.slice(1)) : '—'}
                                    <span style={{ marginLeft: 18 }}><b>RSVP:</b> {meet.is_rsvp ? 'Yes' : 'No'}</span>
                                </div>
                                <div className={styles.meetingInfo} style={{ marginTop: 2 }}>
                                    <FaUsers /> <b>Attendees:</b> {meet.attendees_count ?? 0}
                                </div>
                                <div className={styles.meetingActions}>
                                    {meet.meet_link && (
                                        <a
                                            href={meet.meet_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.joinButton}
                                        >
                                            <FaLink />
                                            <span>Join Meeting</span>
                                        </a>
                                    )}
                                    {!isMember && !meet.is_rsvp && (
                                        <button
                                            className={styles.rsvpButton}
                                            onClick={() => handleRSVP(meet.id)}
                                        >
                                            RSVP
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : null}
            </div>
            
            {meetings.length === 0 && (
                <div style={{ 
                    textAlign: 'center', 
                    marginTop: 48, 
                    padding: '40px 20px',
                    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                    borderRadius: 16,
                    border: '1px solid #e2e8f0',
                    maxWidth: '600px',
                    margin: '48px auto 0'
                }}>
                    <div style={{
                        fontSize: '3rem',
                        color: '#94a3b8',
                        marginBottom: 16
                    }}>
                        📅
                    </div>
                    <div style={{ 
                        color: '#475569', 
                        fontSize: '1.2rem',
                        fontWeight: 600,
                        marginBottom: 8
                    }}>
                        No Meetings Scheduled
                    </div>
                    <div style={{ 
                        color: '#64748b', 
                        fontSize: '1rem',
                        lineHeight: 1.5
                    }}>
                        This learning circle doesn't have any meetings scheduled yet.
                    </div>
                </div>
            )}
            {/* Members Modal */}
            <MuModal
                isOpen={showMembersModal}
                onClose={() => setShowMembersModal(false)}
                title="Members"
                type="success"
                showButton={false}
            >
                <button
                    onClick={() => setShowMembersModal(false)}
                    style={{
                        position: 'absolute',
                        top: 10,
                        right: 16,
                        background: 'transparent',
                        border: 'none',
                        fontSize: 22,
                        cursor: 'pointer',
                        color: '#64748b',
                        zIndex: 2
                    }}
                    aria-label="Close"
                >
                    <AiOutlineClose />
                </button>
                
                <div style={{ minWidth: 320, minHeight: 120 }}>
                    {loadingMembers ? (
                        <div style={{ textAlign: 'center', padding: 24 }}>
                            <div className={styles.loadingSpinner}></div>
                            <p>Loading members...</p>
                        </div>
                    ) : members && members.length > 0 ? (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
                            {members.map((member, idx) => (
                                <div key={member.id || idx} style={{
                                    background: '#f8fafc',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: 10,
                                    padding: '16px 18px',
                                    minWidth: 220,
                                    maxWidth: 260,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
                                    transition: 'all 0.2s ease'
                                }}>
                                    {member.profile_pic && (
                                        <img 
                                            src={member.profile_pic} 
                                            alt={member.full_name} 
                                            style={{ 
                                                width: 56, 
                                                height: 56, 
                                                borderRadius: '50%', 
                                                objectFit: 'cover', 
                                                marginBottom: 8 
                                            }} 
                                        />
                                    )}
                                    <div style={{ 
                                        fontWeight: 600, 
                                        color: '#2563eb', 
                                        fontSize: '1.08rem', 
                                        marginBottom: 4 
                                    }}>
                                        {member.full_name || '—'}
                                    </div>
                                    <div style={{ 
                                        color: '#64748b', 
                                        fontSize: '0.98rem', 
                                        marginBottom: 2 
                                    }}>
                                        MUID: {member.muid || '—'}
                                    </div>
                                    <div style={{ 
                                        color: '#334155', 
                                        fontSize: '0.98rem', 
                                        marginBottom: 2 
                                    }}>
                                        IG Karma: {member.ig_karma ?? 0}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', color: '#64748b', fontSize: '1.05rem' }}>
                            No members found.
                        </div>
                    )}
                </div>
            </MuModal>
            
            {/* Create Meeting Modal */}
            <MuModal
                isOpen={showCreateMeetingModal}
                onClose={() => setShowCreateMeetingModal(false)}
                title="Create New Meeting"
                type="success"
                showButton={false}
            >
                <button
                    onClick={() => setShowCreateMeetingModal(false)}
                    style={{
                        position: 'absolute',
                        top: 25,
                        right: 16,
                        background: 'transparent',
                        border: 'none',
                        fontSize: 22,
                        cursor: 'pointer',
                        color: '#64748b',
                        zIndex: 2
                    }}
                    aria-label="Close"
                >
                    <AiOutlineClose />
                </button>
                
                <form onSubmit={handleCreateMeeting} className={styles.modalContent}>
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel} style={{ fontWeight: 600, color: '#3887fe', marginBottom: 10 }}>Meeting Type</label>
                        <div
                            style={{
                                display: 'flex',
                                background: '#f5f7fa',
                                borderRadius: 14,
                                border: '1.5px solid #e5e7eb',
                                padding: 6,
                                width: '100%',
                                gap: 0,
                                marginBottom: 18,
                                minWidth: 0
                            }}
                        >
                            <button
                                type="button"
                                onClick={() => setMeetingForm(f => ({ ...f, meeting_type: 'Offline', meet_link: '', platform: '', location: '' }))}
                                style={{
                                    background: meetingForm.meeting_type === 'Offline' ? '#3887fe' : 'transparent',
                                    color: meetingForm.meeting_type === 'Offline' ? '#fff' : '#222',
                                    border: 'none',
                                    borderRadius: 10,
                                    padding: '10px 0',
                                    fontWeight: 600,
                                    fontSize: 16,
                                    cursor: 'pointer',
                                    transition: 'background 0.2s',
                                    boxShadow: meetingForm.meeting_type === 'Offline' ? '0 2px 8px rgba(56,135,254,0.08)' : 'none',
                                    outline: 'none',
                                    flex: 1,
                                }}
                                tabIndex={0}
                                aria-pressed={meetingForm.meeting_type === 'Offline'}
                            >
                                Offline
                            </button>
                            <button
                                type="button"
                                onClick={() => setMeetingForm(f => ({ ...f, meeting_type: 'Online', meet_link: '', platform: '', location: '' }))}
                                style={{
                                    background: meetingForm.meeting_type === 'Online' ? '#3887fe' : 'transparent',
                                    color: meetingForm.meeting_type === 'Online' ? '#fff' : '#222',
                                    border: 'none',
                                    borderRadius: 10,
                                    padding: '10px 0',
                                    fontWeight: 600,
                                    fontSize: 16,
                                    cursor: 'pointer',
                                    transition: 'background 0.2s',
                                    boxShadow: meetingForm.meeting_type === 'Online' ? '0 2px 8px rgba(56,135,254,0.08)' : 'none',
                                    outline: 'none',
                                    flex: 1,
                                }}
                                tabIndex={0}
                                aria-pressed={meetingForm.meeting_type === 'Online'}
                            >
                                Online
                            </button>
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.formLabel} htmlFor="meeting-title">
                            Title <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                            id="meeting-title"
                            type="text"
                            required
                            placeholder="Enter meeting title"
                            value={meetingForm.title}
                            onChange={e => setMeetingForm(f => ({ ...f, title: e.target.value }))}
                            className={styles.formInput}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.formLabel} htmlFor="meeting-description">
                            Description <span style={{ color: 'red' }}>*</span>
                        </label>
                        <textarea
                            id="meeting-description"
                            required
                            placeholder="Describe the meeting"
                            value={meetingForm.description}
                            onChange={e => setMeetingForm(f => ({ ...f, description: e.target.value }))}
                            className={styles.formTextarea}
                        />
                    </div>

                    {meetingForm.meeting_type === 'Online' && (
                        <>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel} htmlFor="meeting-platform">Meeting Platform</label>
                                <input
                                    id="meeting-platform"
                                    type="text"
                                    placeholder="Enter meeting platform"
                                    value={meetingForm.platform || ''}
                                    onChange={e => setMeetingForm(f => ({ ...f, platform: e.target.value }))}
                                    className={styles.formInput}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel} htmlFor="meeting-link">Meeting Link <span style={{ color: 'red' }}>*</span></label>
                                <input
                                    id="meeting-link"
                                    type="url"
                                    required={meetingForm.meeting_type === 'Online'}
                                    placeholder="Enter meeting link"
                                    value={meetingForm.meet_link}
                                    onChange={e => setMeetingForm(f => ({ ...f, meet_link: e.target.value }))}
                                    className={styles.formInput}
                                />
                            </div>
                        </>
                    )}
                    {meetingForm.meeting_type === 'Offline' && (
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel} htmlFor="meeting-location">Location <span style={{ color: 'red' }}>*</span></label>
                            <input
                                id="meeting-location"
                                type="text"
                                required={meetingForm.meeting_type === 'Offline'}
                                placeholder="Enter location"
                                value={meetingForm.location}
                                onChange={e => setMeetingForm(f => ({ ...f, location: e.target.value }))}
                                className={styles.formInput}
                            />
                        </div>
                    )}


                    <button
                        type="submit"
                        className={styles.primaryButton}
                        style={{ width: '100%', marginTop: 16 }}
                        disabled={creatingMeeting}
                    >
                        {creatingMeeting ? 'Creating...' : 'Create Meeting'}
                    </button>
                </form>
            </MuModal>
            
            {/* Requests Modal */}
            <MuModal
                isOpen={showRequestsModal}
                onClose={() => setShowRequestsModal(false)}
                title="Pending Requests"
                type="success"
                showButton={false}
            >
                <button
                    onClick={() => setShowRequestsModal(false)}
                    style={{
                        position: 'absolute',
                        top: 25,
                        right: 16,
                        background: 'transparent',
                        border: 'none',
                        fontSize: 22,
                        cursor: 'pointer',
                        color: '#64748b',
                        zIndex: 2
                    }}
                    aria-label="Close"
                >
                    <AiOutlineClose />
                </button>
                
                <div style={{ minWidth: 320, minHeight: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {loadingRequests ? (
                        <div style={{ textAlign: 'center', padding: 24 }}>
                            <div className={styles.loadingSpinner}></div>
                            <p>Loading requests...</p>
                        </div>
                    ) : requests && requests.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
                            {requests.map((request, idx) => (
                                <div key={request.id || idx} style={{
                                    background: '#f8fafc',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: 10,
                                    padding: '16px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <div>
                                        <div style={{ fontWeight: 600, color: '#2563eb' }}>
                                            {request.full_name || request.name || 'Unknown User'}
                                        </div>
                                        <div style={{ color: '#64748b', fontSize: '0.9rem' }}>
                                            MUID: {request.muid || '—'}
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: 8 }}>
                                        <button
                                            style={{
                                                background: '#10b981',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: 6,
                                                padding: '6px 12px',
                                                fontSize: '0.9rem',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            Approve
                                        </button>
                                        <button
                                            style={{
                                                background: '#ef4444',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: 6,
                                                padding: '6px 12px',
                                                fontSize: '0.9rem',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <span style={{ color: '#64748b', fontSize: '1.05rem' }}>
                            No pending requests.
                        </span>
                    )}
                </div>
            </MuModal>
            
            {/* Edit Modal */}
            <MuModal
                isOpen={showEditModal}
                onClose={() => setShowEditModal(false)}
                title="Edit Learning Circle"
                type="success"
                showButton={false}
            >
                <form onSubmit={handleEditSubmit} className={styles.modalContent}>
                    <div style={{ fontWeight: 500, color: '#64748b', marginBottom: 8 }}>
                        Edit your learning circle details.
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Title</label>
                        <input
                            type="text"
                            required
                            value={editForm.title}
                            onChange={e => setEditForm(f => ({ ...f, title: e.target.value }))}
                            className={styles.formInput}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Description</label>
                        <textarea
                            required
                            value={editForm.description}
                            onChange={e => setEditForm(f => ({ ...f, description: e.target.value }))}
                            className={styles.formTextarea}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Interest Group</label>
                        <Select
                            options={igOptions}
                            value={igOptions.find(opt => opt.value === editForm.ig) || null}
                            onChange={opt => setEditForm(f => ({ ...f, ig: opt?.value || "" }))}
                            isSearchable
                            placeholder="Select Interest Group"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Organization</label>
                        <input
                            type="text"
                            value={circle.org}
                            disabled
                            style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #e5e7eb', fontSize: '1rem', color: '#888', background: '#f1f5f9' }}
                        />
                    </div>
                    {editError && <div className={styles.errorMessage}>{editError}</div>}
                    <div style={{ display: 'flex', gap: 12, marginTop: 8, justifyContent: 'flex-end' }}>
                        <button 
                            type="button" 
                            onClick={() => setShowEditModal(false)} 
                            style={{ background: '#e5e7eb', color: '#334155', border: 'none', borderRadius: 8, padding: '8px 18px', fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }}
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            disabled={editLoading} 
                            style={{ background: editLoading ? '#a5b4fc' : '#3b82f6', color: 'white', border: 'none', borderRadius: 8, padding: '8px 18px', fontWeight: 700, fontSize: '1.08rem', cursor: editLoading ? 'not-allowed' : 'pointer' }}
                        >
                            {editLoading ? 'Updating...' : 'Update Learning Circle'}
                        </button>
                    </div>
                </form>
            </MuModal>
            
            {/* Delete Confirmation Modal */}
            <MuModal
                isOpen={showDeleteConfirm}
                onClose={() => setShowDeleteConfirm(false)}
                title="Delete Learning Circle"
                type="error"
                showButton={false}
            >
                <div style={{ 
                    minWidth: 320, 
                    minHeight: 120, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: 18 
                }}>
                    <span style={{ color: '#ef4444', fontSize: '1.08rem', fontWeight: 600 }}>
                        Are you sure you want to delete this Learning Circle?
                    </span>
                    <p style={{ color: '#64748b', fontSize: '1rem', textAlign: 'center', margin: 0 }}>
                        This action cannot be undone. All meetings and data associated with this learning circle will be permanently deleted.
                    </p>
                    {deleteError && <div className={styles.errorMessage}>{deleteError}</div>}
                    <div style={{ display: 'flex', gap: 16 }}>
                        <button
                            style={{ 
                                background: '#ef4444', 
                                color: 'white', 
                                border: 'none', 
                                borderRadius: 8, 
                                padding: '8px 18px', 
                                fontWeight: 600, 
                                fontSize: '1rem', 
                                cursor: deleteLoading ? 'not-allowed' : 'pointer' 
                            }}
                            onClick={handleDeleteCircle}
                            disabled={deleteLoading}
                        >
                            {deleteLoading ? 'Deleting...' : 'Delete'}
                        </button>
                        <button
                            style={{ 
                                background: '#e5e7eb', 
                                color: '#334155', 
                                border: 'none', 
                                borderRadius: 8, 
                                padding: '8px 18px', 
                                fontWeight: 600, 
                                fontSize: '1rem', 
                                cursor: 'pointer' 
                            }}
                            onClick={() => setShowDeleteConfirm(false)}
                            disabled={deleteLoading}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </MuModal>
        </div>
    );
}
