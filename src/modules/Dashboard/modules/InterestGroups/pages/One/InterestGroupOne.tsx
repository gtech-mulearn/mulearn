import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './InterestGroupOne.module.css';
import SidebarBannerSlider from '../../components/SideBannerSlider/SideBannerSlider';
import IGActionSection from '../../components/ActionSection/IGActionSection';
import { interestGroups } from '../../data/interestGroups';
import ComingSoonPage from '/src/modules/Common/Authentication/pages/ComingSoon';
import { FiArrowLeft } from 'react-icons/fi';
import { BsCalendar2, BsDiscord } from 'react-icons/bs';


const interestGroupsObject = Object.fromEntries(
  interestGroups.map(group => [group.id, group])
);

const CommunityForum = () => {

  const { id } = useParams();

  const groupData = useMemo(() => (id ? interestGroupsObject[id] : null), [id]);
  const navigate = useNavigate();

  const handleAddToCalendar = (eventName: string, dayTimeString: string, durationMinutes = 60) => {
    const [dayName, timeString] = dayTimeString.split(" ");

    // Map days of the week to their index (Sunday = 0, Monday = 1, ..., Saturday = 6)
    const daysMap: { [key: string]: number } = {
      Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3,
      Thursday: 4, Friday: 5, Saturday: 6
    };

    const targetDay = daysMap[dayName];
    if (targetDay === undefined) {
      console.error("Invalid day name:", dayName);
      return;
    }

    // ✅ Convert timeString (e.g., "8:30PM") to 24-hour format
    const timeMatch = timeString.match(/(\d+):(\d+)(AM|PM)/);
    if (!timeMatch) {
      console.error("Invalid time format:", timeString);
      return;
    }

    let [_, hour, minute, period] = timeMatch;
    let hours = parseInt(hour, 10);
    let minutes = parseInt(minute, 10);

    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;

    // Get next occurrence of the given weekday
    const now = new Date();
    let eventDate = new Date(now);
    eventDate.setDate(now.getDate() + ((targetDay + 7 - now.getDay()) % 7));
    eventDate.setHours(hours, minutes, 0, 0);

    // Calculate end time (default duration = 60 minutes)
    let endDate = new Date(eventDate.getTime() + durationMinutes * 60000);

    // Convert to Google Calendar format (YYYYMMDDTHHmmssZ)
    const formatGoogleDate = (date: Date) => date.toISOString().replace(/-|:|\.\d+/g, "");

    const startGoogleDate = formatGoogleDate(eventDate);
    const endGoogleDate = formatGoogleDate(endDate);

    // Google Calendar Event URL
    const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventName)}&dates=${startGoogleDate}/${endGoogleDate}`;

    // Open Google Calendar in a new tab
    window.open(googleCalendarUrl, "_blank", "noopener,noreferrer");
  };






  if (!groupData) {
    return <div className='w-full h-full flex justify-center items-center'><ComingSoonPage /></div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.mainGrid}>
        <div className={styles.mainContent}>
          <div className={styles.forumCard}>
            <button className={styles.backButton} onClick={() => window.history.back()}> <FiArrowLeft /> </button>
            <div className={styles.bannerWrapper}>
              <img
                src={groupData.bannerImage}
                alt={`${groupData.title} Banner`}
                className={styles.bannerImage}
                loading="lazy"
              />
              <div className={styles.bannerOverlay}>
                <div className={styles.bannerLogo}>{groupData.title.slice(0, 1).toUpperCase()}</div>
                {/* <div className={styles.bannerMemberInfo}>Member since {groupData.memberSince}</div> */}
              </div>
              {/* <button className={styles.bellButton} aria-label="Notifications">
                <Bell className={styles.bellIcon} />
              </button> */}
            </div>

            <div className={styles.communityInfo}>
              <h1 className={styles.forumTitle}>{groupData.title}</h1>
              <div className={styles.forumSubInfo}>
                {/* <span><span></span>{groupData.isPublic ? "Public" : "Private"} Community</span> */}

                {/* <span><span>• </span>{(groupData.memberCount / 1000).toFixed(1)}k members</span> */}

                <span> <span>• </span>Office Hours: {groupData.officeHours}</span>
                {groupData.thinkTankMeeting && (
                  <span> <span>• </span>Think Tank Meeting: {groupData.thinkTankMeeting}</span>
                )}

              </div>
            </div>

            <div className={styles.memberSection}>
              <div className={styles.avatarGroup}>
                {/* <div className={styles.avatarStack}>
                  {memberAvatars.map((avatar, index) => (
                    <img
                      key={index}
                      src={avatar}
                      alt={`Member ${index + 1}`}
                      className={styles.avatarImage}
                      loading="lazy"
                    />
                  ))}
                </div> */}
                {/* <span className={styles.memberText}>Jiso and 5 other friends are members</span> */}
              </div>
              {/* <button className={styles.moreButton} aria-label="More options">
                <MoreHorizontal className={styles.moreIcon} />
              </button> */}
            </div>
            <IGActionSection data={groupData} />
          </div>
        </div>

        <div className={styles.sidebar}>
          {/* <div className={styles.sidebarSection}>
            <h2 className={styles.sidebarTitle}>Happening Now</h2>
            <div className={styles.sidebarBanner}>
              <SidebarBannerSlider events={groupData.tabs.events || []} />
            </div>
          </div> 
          */}
          {groupData.officeHours !== "TBA" && (

            <div className={styles.officeHoursCard}>
              <h3>Office Hours Timings</h3>
              <div className={styles.officeHoursCardTiming}>
                <div>
                  <p>{groupData.officeHours}</p>
                  <div className={styles.joinCommunityButton}>
                    <button
                      className={styles.officeHoursButton}
                      onClick={() => handleAddToCalendar(`${groupData.title} Office Hours`, groupData.officeHours, 60)}
                      aria-label="Join office hours"
                    >
                      <BsCalendar2 /> Add to calendar
                    </button>
                    <button
                      className={styles.officeHoursButton}
                      onClick={() => window.open("https://discord.com/invite/gtech-mulearn-771670169691881483", "_blank")}
                      aria-label="Join Community"
                    >
                      <BsDiscord /> Join Community
                    </button>
                  </div>
                </div>

              </div>
            </div>

          )}
          {/* <div className={styles.officeHoursCard}>
            <h3>Office Hours Timings</h3>
            <div className={styles.officeHoursCardTiming}>
              <p>{groupData.officeHours}</p>
             
            </div>
          </div> */}
          {/* <div className={styles.sidebarSection}>
            <h2 className={styles.sidebarTitle}>Partner Companies</h2>
            <div className={styles.sidebarList}>
              {groupData.partnerCompanies?.map((partner) => (
                <div key={partner.id} className={styles.sidebarItem}>
                  <div className={styles.sidebarItemLeft}>
                    <img src={partner.image} alt={partner.title} className={styles.communityIcon} />
                    <span className={styles.sidebarItemText}>{partner.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div> */}
          {groupData.communityPartners && groupData.communityPartners.length > 0 && (
            <div className={styles.sidebarSection}>
              <h2 className={styles.sidebarTitle}>Community Partners</h2>
              <div className={styles.sidebarList}>
                {groupData.communityPartners?.map((partner) => (
                  <div key={partner.id} className={styles.sidebarItem}>
                    <div className={styles.sidebarItemLeft}>
                      <img src={partner.image} alt={partner.title} className={styles.communityIcon} />
                      {/* <span className={styles.sidebarItemText}>{partner.title}</span> */}
                    </div>
                  </div>
                ))}
              </div>
            </div>)}
        </div>
      </div>
    </div>
  );
};

export default CommunityForum;