import styles from "./MoreInfoLC.module.css";
import { FiChevronLeft } from "react-icons/fi";
import { CiLocationOn, CiClock2 } from "react-icons/ci";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    getMeetupInfo,
    joinMeetup,
    unsaveMeetup,
    getLearningCircleInfo,
    getManageRequests,
    getMeetingsByCircleId,
    createMeetingByCircleId,
    submitRSVP
} from "../../services/LearningCircleAPIs";
import MuModal from "@/MuLearnComponents/MuModal/MuModal";
import { FaBookmark, FaUniversity, FaLayerGroup, FaMapMarkerAlt, FaUsers, FaCalendarAlt, FaLink, FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import {
    getLocalDateTimeFormatted,
    getLocalDateTimeObject
} from "../../../../utils/common";
import { m } from "framer-motion";
import { CircleMeetupInfo } from "../../services/LearningCircleInterface";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";
import { useUserStore } from "../../../../../../ZustandProvider";

export default function MoreInfoLC() {
    const navigate = useNavigate();
    const [circle, setCircle] = useState<any | null>(null);
    const [meetings, setMeetings] = useState<any[]>([]);
    const params = useParams();
    const [showRequestsModal, setShowRequestsModal] = useState(false);
    const [requests, setRequests] = useState<any[] | null>(null);
    const [loadingRequests, setLoadingRequests] = useState(false);
    const [showMembersModal, setShowMembersModal] = useState(false);
    const [members, setMembers] = useState<any[] | null>(null);
    const [loadingMembers, setLoadingMembers] = useState(false);
    const userId = useUserStore((state) => state.userProfile.id);
    const isMeetingCreator = meetings.some(meet => meet.created_by_id && userId === meet.created_by_id);
    // Debug logs for button visibility
    console.log('userId:', userId, 'meetings:', meetings.map(m => m.created_by_id));
    // State for create meeting modal
    const [showCreateMeetingModal, setShowCreateMeetingModal] = useState(false);
    const [creatingMeeting, setCreatingMeeting] = useState(false);
    const [createError, setCreateError] = useState<string | null>(null);
    const [meetingForm, setMeetingForm] = useState({
        title: '',
        description: '',
        meet_time: '',
        duration: 1,
        meet_link: ''
    });
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    // Add logic for member
    // Assume circle.members is an array of member IDs or objects with id
    // Adjust this logic based on your actual API response
    const isMember = circle && circle.members && Array.isArray(circle.members)
        ? circle.members.some((m: any) => m.id === userId || m === userId)
        : false;

    // Stub for RSVP handler
    const handleRSVP = async (meetingId: string) => {
        if (!meetingId) return;
        const success = await submitRSVP(meetingId);
        if (success) {
            alert('RSVP submitted successfully!');
            // Optionally refresh meetings or circle info
            if (params.id) {
                getMeetingsByCircleId(params.id).then(res => setMeetings(res));
            }
        } else {
            alert('Failed to submit RSVP.');
        }
    };

    useEffect(() => {
        getLearningCircleInfo(params.id ?? "").then(res => {
            setCircle(res as any);
        });
        // Fetch meetings for this circle
        if (params.id) {
            getMeetingsByCircleId(params.id)
                .then(res => setMeetings(res));
        }
    }, []);

    // Debug log to check what fields are present
    console.log('Circle details:', circle);

    const handleOpenRequestsModal = async () => {
        setShowRequestsModal(true);
        setLoadingRequests(true);
        setRequests(null);
        if (params.id) {
            const res = await getManageRequests(params.id);
            setRequests(res || []);
        }
        setLoadingRequests(false);
    };

    const handleOpenMembersModal = async () => {
        setShowMembersModal(true);
        setLoadingMembers(true);
        setMembers(null);
        if (params.id) {
            try {
                const res = await axios.get(`/api/v1/dashboard/learningcircle/meeting/list/${params.id}`);
                setMembers(res.data.response || []);
            } catch (e) {
                setMembers([]);
            }
        }
        setLoadingMembers(false);
    };

    // Add this function to handle meeting creation
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
                // Refresh meetings list
                const meetRes = await getMeetingsByCircleId(params.id);
                setMeetings(meetRes);
                // Reset form
                setMeetingForm({ title: '', description: '', meet_time: '', duration: 1, meet_link: '' });
            }
        } catch (e) {
            setCreateError('Network error');
        }
        setCreatingMeeting(false);
    };

    return (
        <div className={styles.container}>
            <div
                className={styles.backLink}
                onClick={() => {
                    navigate(-1);
                }}
            >
                <FiChevronLeft />
                <span>Learning Circles</span>
            </div>
            <div className={styles.card} style={{ position: 'relative' }}>
                {/* Options bar at very top right: Edit, Delete, Pending Requests (for creators) */}
                {isMeetingCreator && (
                    <div style={{
                        position: 'absolute',
                        top: 10,
                        right: 24,
                        display: 'flex',
                        gap: 14,
                        alignItems: 'center',
                        zIndex: 2
                    }}>
                        <button
                            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 22, color: '#fbbf24' }}
                            title="Edit Circle"
                            onClick={() => setShowEditModal(true)}
                        >
                            <FaEdit />
                        </button>
                        <button
                            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 22, color: '#ef4444' }}
                            title="Delete Circle"
                            onClick={() => setShowDeleteConfirm(true)}
                        >
                            <FaTrash />
                        </button>
                        <button
                            style={{
                                background: '#3b82f6',
                                color: 'white',
                                border: 'none',
                                borderRadius: 8,
                                padding: '8px 18px',
                                fontWeight: 600,
                                fontSize: '1rem',
                                cursor: 'pointer',
                                boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
                            }}
                            onClick={handleOpenRequestsModal}
                        >
                            Pending Requests
                        </button>
                    </div>
                )}
                <div className={styles.cardHeaderContent}>
                    <div className={styles.headerSection}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8, position: 'relative', width: '100%' }}>
                            {/* IG Badge */}
                            {(circle?.ig || circle?.ig_name) && (
                                <span style={{
                                    display: 'inline-block',
                                    background: '#e0e7ff',
                                    color: '#3730a3',
                                    fontWeight: 600,
                                    fontSize: '0.85rem',
                                    borderRadius: 5,
                                    padding: '2px 8px',
                                    marginBottom: 2,
                                    letterSpacing: 0.2,
                                    marginTop: 2
                                }}>
                                    {circle.ig || circle.ig_name}
                                </span>
                            )}
                            <h1 className={styles.title} style={{marginBottom: 0}}>{circle?.circle_title || circle?.title || circle?.name || ""}</h1>
                        </div>
                    </div>
                </div>
                {/* Description below title */}
                {circle?.description && (
                    <div style={{ gridColumn: '1 / -1', marginBottom: 24, marginTop: 8 }}>
                        <div style={{ color: '#4b5563', fontSize: '1.05rem', lineHeight: 1.6 }}>{circle.description}</div>
                    </div>
                )}
                <div className={styles.cardContent}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                        <div className={styles.responsiveDetailsGrid}>
                        {circle && Object.entries(circle)
                            .filter(([key]) => !['title', 'org', 'ig', 'description', 'id', 'circle_id', 'ig_id', 'circle_title', 'ig_name', 'pending_requests', 'pending_invites'].includes(key))
                            .map(([key, value]) => (
                                <div 
                                    key={key} 
                                    onClick={
                                        key === 'pending_members' || key === 'pending_requests' || key.includes('pending') ? handleOpenRequestsModal :
                                        key === 'member_count' || key === 'members_count' || key === 'membercount' || key === 'members' || key.includes('member') ? handleOpenMembersModal :
                                        undefined
                                    }
                                    style={{
                                        background: '#f8fafc',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: 12,
                                        padding: '20px 16px',
                                        boxShadow: '0 1px 2px rgba(211, 1, 1, 0.03)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        minHeight: 140,
                                        maxHeight: 140,
                                        height: 140,
                                        width: '15rem',
                                        maxWidth: '700px',
                                        transition: 'all 0.2s ease',
                                        cursor: (key === 'pending_members' || key === 'pending_requests' || key.includes('pending') || key === 'member_count' || key === 'members_count' || key === 'membercount' || key === 'members' || key.includes('member')) ? 'pointer' : 'default',
                                        position: 'relative',
                                        gap: 0
                                    }}
                                    onMouseEnter={(e) => {
                                        if (key === 'pending_members' || key === 'pending_requests' || key.includes('pending') || key === 'member_count' || key === 'members_count' || key === 'membercount' || key === 'members' || key.includes('member')) {
                                            e.currentTarget.style.background = '#f1f5f9';
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.08)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (key === 'pending_members' || key === 'pending_requests' || key.includes('pending') || key === 'member_count' || key === 'members_count' || key === 'membercount' || key === 'members' || key.includes('member')) {
                                            e.currentTarget.style.background = '#f8fafc';
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = '0 1px 2px rgba(211, 1, 1, 0.03)';
                                        }
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
                                            fontWeight: 600, 
                                            color: '#3b82f6', 
                                            marginBottom: 10, 
                                            textTransform: 'capitalize', 
                                            fontSize: 'clamp(0.9rem, 2.5vw, 1.08rem)', 
                                            textAlign: 'center',
                                            lineHeight: 1.3,
                                            width: '100%'
                                        }}>
                                            {key.replace(/_/g, ' ')}
                                            {(key === 'pending_members' || key === 'pending_requests' || key.includes('pending') || key === 'member_count' || key === 'members_count' || key === 'membercount' || key === 'members' || key.includes('member')) && (
                                                <span style={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    right: 0,
                                                    background: '#3b82f6',
                                                    color: 'white',
                                                    borderRadius: '50%',
                                                    width: 20,
                                                    height: 20,
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: '0.7rem',
                                                    fontWeight: 600
                                                }}>
                                                    →
                                                </span>
                                            )}
                                        </div>
                                        <div style={{
                                            color: '#334155',
                                            wordBreak: 'break-word',
                                            fontSize: '2rem',
                                            textAlign: 'center',
                                            marginTop: 16,
                                            marginBottom: 0,
                                            fontWeight: 400
                                        }}>
                                            {typeof value === 'object' && Array.isArray(value) ? value.length : (typeof value === 'number' ? value : String(value))}
                                        </div>
                                    </div>
                                </div>
                        ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* Meeting Details Section */}
            {meetings.length > 0 && (
                <div className={styles.card} style={{ marginTop: 0 }}>
                    <div className={styles.cardHeaderContent} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <h2 className={styles.sectionTitle} style={{marginBottom: 16}}>Meetings</h2>
                        {isMeetingCreator && (
                            <button
                                style={{
                                    background: '#3b82f6',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: 8,
                                    padding: '10px 22px',
                                    fontWeight: 600,
                                    fontSize: '1rem',
                                    cursor: 'pointer',
                                    boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                                    transition: 'background 0.2s',
                                    marginLeft: 16
                                }}
                                onClick={() => setShowCreateMeetingModal(true)}
                            >
                                + Create Meeting
                            </button>
                        )}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%', alignItems: 'flex-start', marginLeft: 32 }}>
                        {meetings.map((meet, idx) => (
                            <div
                                key={meet.id || idx}
                                style={{
                                    background: '#fff',
                                    border: '1.5px solid #e0e7ff',
                                    borderLeft: '5px solid #3b82f6',
                                    borderRadius: 14,
                                    padding: '24px 24px 18px 24px',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                                    marginBottom: 18,
                                    minWidth: 320,
                                    maxWidth: 500,
                                    width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                    gap: 10
                                }}
                            >
                                <div style={{ fontWeight: 700, color: '#2563eb', fontSize: '1.3rem', marginBottom: 6 }}>
                                    {meet.title || 'Meeting'}
                                </div>
                                {meet.description && (
                                    <div style={{ color: '#64748b', fontSize: '1.01rem', marginBottom: 10 }}>
                                        {meet.description}
                                    </div>
                                )}
                                <div style={{ color: '#64748b', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <FaCalendarAlt /> {meet.meet_time ? new Date(meet.meet_time).toLocaleString() : ''}
                                </div>
                                <div style={{ color: '#64748b', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <FaMapMarkerAlt /> {meet.meet_place || '—'}
                                </div>
                                <div style={{ color: '#334155', fontSize: '1.05rem', marginTop: 6 }}>
                                    <b>Mode:</b> {meet.mode ? (meet.mode.charAt(0).toUpperCase() + meet.mode.slice(1)) : '—'}
                                    <span style={{ marginLeft: 18 }}><b>RSVP:</b> {meet.is_rsvp ? 'Yes' : 'No'}</span>
                                </div>
                                <div style={{ color: '#334155', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: 8, marginTop: 2 }}>
                                    <FaUsers /> <b>Attendees:</b> {meet.attendees_count ?? 0}
                                </div>
                                <div style={{ display: 'flex', gap: 12, marginTop: 10 }}>
                                    {meet.meet_link && (
                                        <a
                                            href={meet.meet_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                color: '#fff',
                                                background: '#2563eb',
                                                padding: '8px 18px',
                                                borderRadius: 6,
                                                fontWeight: 600,
                                                textDecoration: 'none',
                                                fontSize: '1.05rem',
                                                boxShadow: '0 1px 4px rgba(37,99,235,0.08)',
                                                gap: 8
                                            }}
                                        >
                                            <FaLink style={{ verticalAlign: 'middle' }} />
                                            <span>Join Meeting</span>
                                        </a>
                                    )}
                                    {!isMember && !meet.is_rsvp && (
                                        <button
                                            style={{
                                                background: '#2563eb',
                                                color: '#fff',
                                                border: 'none',
                                                borderRadius: 8,
                                                padding: '8px 18px',
                                                fontWeight: 600,
                                                fontSize: '1rem',
                                                cursor: 'pointer',
                                                boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
                                            }}
                                            onClick={() => handleRSVP(meet.id)}
                                        >
                                            RSVP
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {meetings.length === 0 && (
                <div style={{ textAlign: 'center', color: '#64748b', marginTop: 32, fontSize: '1.1rem' }}>
                    No meetings scheduled for this learning circle yet.
                </div>
            )}
            {/* Modal for Members */}
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
                        <div style={{ textAlign: 'center', padding: 24 }}>Loading...</div>
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
                                    boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
                                }}>
                                    {member.profile_pic && (
                                        <img src={member.profile_pic} alt={member.full_name} style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', marginBottom: 8 }} />
                                    )}
                                    <div style={{ fontWeight: 600, color: '#2563eb', fontSize: '1.08rem', marginBottom: 4 }}>{member.full_name || '—'}</div>
                                    <div style={{ color: '#64748b', fontSize: '0.98rem', marginBottom: 2 }}>MUID: {member.muid || '—'}</div>
                                    <div style={{ color: '#334155', fontSize: '0.98rem', marginBottom: 2 }}>IG Karma: {member.ig_karma ?? 0}</div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', color: '#64748b', fontSize: '1.05rem' }}>No members found.</div>
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
                <form
                    onSubmit={handleCreateMeeting}
                    style={{
                        minWidth: 340,
                        minHeight: 120,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 18,
                        background: '#f8fafc',
                        borderRadius: 12,
                        padding: 24,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                    }}
                >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <label style={{ fontWeight: 600, color: '#3b82f6', textAlign: 'left' }} htmlFor="meeting-title">
                            Title <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                            id="meeting-title"
                            type="text"
                            required
                            placeholder="Enter meeting title"
                            value={meetingForm.title}
                            onChange={e => setMeetingForm(f => ({ ...f, title: e.target.value }))}
                            style={{
                                width: '100%',
                                padding: 10,
                                borderRadius: 6,
                                border: '1px solid #e5e7eb',
                                fontSize: '1rem',
                                color: '#000'
                            }}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <label style={{ fontWeight: 600, color: '#3b82f6', textAlign: 'left' }} htmlFor="meeting-description">
                            Description <span style={{ color: 'red' }}>*</span>
                    </label>
                        <textarea
                            id="meeting-description"
                            required
                            placeholder="Describe the meeting"
                            value={meetingForm.description}
                            onChange={e => setMeetingForm(f => ({ ...f, description: e.target.value }))}
                            style={{
                                width: '100%',
                                padding: 10,
                                borderRadius: 6,
                                border: '1px solid #e5e7eb',
                                fontSize: '1rem',
                                minHeight: 60,
                                color: '#000'
                            }}
                        />
                    </div>
                    <div style={{ display: 'flex', gap: 16 }}>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                            <label style={{ fontWeight: 600, color: '#3b82f6', textAlign: 'left' }} htmlFor="meeting-datetime">
                                Date & Time <span style={{ color: 'red' }}>*</span>
                    </label>
                        <input
                                id="meeting-datetime"
                            type="datetime-local"
                            required
                            value={meetingForm.meet_time}
                            onChange={e => setMeetingForm(f => ({ ...f, meet_time: e.target.value }))}
                                style={{
                                    width: '100%',
                                    padding: 10,
                                    borderRadius: 6,
                                    border: '1px solid #e5e7eb',
                                    fontSize: '1rem',
                                    color: '#000'
                                }}
                            />
                        </div>
                        <div style={{ width: 120, display: 'flex', flexDirection: 'column', gap: 8 }}>
                            <label style={{ fontWeight: 600, color: '#3b82f6', textAlign: 'left' }} htmlFor="meeting-duration">
                                Duration (hrs) <span style={{ color: 'red' }}>*</span>
                    </label>
                        <input
                                id="meeting-duration"
                            type="number"
                            min={1}
                            required
                            value={meetingForm.duration}
                            onChange={e => setMeetingForm(f => ({ ...f, duration: Number(e.target.value) }))}
                                style={{
                                    width: '100%',
                                    padding: 10,
                                    borderRadius: 6,
                                    border: '1px solid #e5e7eb',
                                    fontSize: '1rem',
                                    color: '#000'
                                }}
                            />
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <label style={{ fontWeight: 600, color: '#3b82f6', textAlign: 'left' }} htmlFor="meeting-link">
                            Meeting Link <span style={{ color: 'red' }}>*</span>
                    </label>
                        <input
                            id="meeting-link"
                            type="url"
                            required
                            placeholder="https://meet.example.com/..."
                            value={meetingForm.meet_link}
                            onChange={e => setMeetingForm(f => ({ ...f, meet_link: e.target.value }))}
                            style={{
                                width: '100%',
                                padding: 10,
                                borderRadius: 6,
                                border: '1px solid #e5e7eb',
                                fontSize: '1rem',
                                color: '#000'
                            }}
                        />
                    </div>
                    {createError && (
                        <div style={{ color: 'red', fontSize: '0.98rem', marginTop: 4 }}>
                            {createError}
                        </div>
                    )}
                    <button
                        type="submit"
                        disabled={creatingMeeting}
                        style={{
                            background: creatingMeeting ? '#a5b4fc' : '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: 8,
                            padding: '12px 0',
                            fontWeight: 700,
                            fontSize: '1.08rem',
                            cursor: creatingMeeting ? 'not-allowed' : 'pointer',
                            marginTop: 8,
                            transition: 'background 0.2s'
                        }}
                    >
                        {creatingMeeting ? 'Creating...' : 'Create Meeting'}
                    </button>
                </form>
            </MuModal>
            {/* Modal for Requests */}
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
                    <span style={{ color: '#64748b', fontSize: '1.05rem' }}>Pending requests content goes here.</span>
                </div>
            </MuModal>
            {/* Edit Modal (stub) */}
            <MuModal
                isOpen={showEditModal}
                onClose={() => setShowEditModal(false)}
                title="Edit Learning Circle"
                type="success"
                showButton={false}
            >
                <div style={{ minWidth: 320, minHeight: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: '#64748b', fontSize: '1.05rem' }}>Edit form goes here.</span>
                </div>
            </MuModal>
            {/* Delete Confirmation Modal (stub) */}
            <MuModal
                isOpen={showDeleteConfirm}
                onClose={() => setShowDeleteConfirm(false)}
                title="Delete Learning Circle"
                type="error"
                showButton={false}
            >
                <div style={{ minWidth: 320, minHeight: 120, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18 }}>
                    <span style={{ color: '#ef4444', fontSize: '1.08rem', fontWeight: 600 }}>Are you sure you want to delete this Learning Circle?</span>
                    <div style={{ display: 'flex', gap: 16 }}>
                        <button
                            style={{ background: '#ef4444', color: 'white', border: 'none', borderRadius: 8, padding: '8px 18px', fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }}
                            onClick={() => { /* TODO: implement delete logic */ setShowDeleteConfirm(false); }}
                        >
                            Delete
                        </button>
                        <button
                            style={{ background: '#e5e7eb', color: '#334155', border: 'none', borderRadius: 8, padding: '8px 18px', fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }}
                            onClick={() => setShowDeleteConfirm(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </MuModal>
        </div>
    );
}
    