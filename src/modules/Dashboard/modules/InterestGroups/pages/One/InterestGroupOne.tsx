import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Bell, MoreHorizontal } from 'lucide-react';
import styles from './InterestGroupOne.module.css';
import SidebarBannerSlider from '../../components/SideBannerSlider/SideBannerSlider';
import IGActionSection from '../../components/ActionSection/IGActionSection';
import { InterestGroupData, interestGroups } from '../../data/interestGroups';
import ComingSoonPage from '/src/modules/Common/Authentication/pages/ComingSoon';

const memberAvatars = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&q=80",
  "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=40&h=40&q=80",
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&q=80",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40&h=40&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&q=80",
];

const interestGroupsObject = Object.fromEntries(
  interestGroups.map(group => [group.id, group])
);

const CommunityForum = () => {
  const { id } = useParams();

  const groupData = useMemo(() => (id ? interestGroupsObject[id] : null), [id]);

  if (!groupData) {
    return <div className='w-full h-full flex justify-center items-center'><ComingSoonPage /></div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.mainGrid}>
        <div className={styles.mainContent}>
          <div className={styles.forumCard}>
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
                {/* <span><span>•</span>{groupData.isPublic ? "Public" : "Private"} Community</span> */}
              
                {/* <span><span>•</span>{(groupData.memberCount / 1000).toFixed(1)}k members</span> */}
                
                <span> <span>• </span>Office Hours: {groupData.officeHours}</span>
               
                {/* <span> <span>•</span>Think Tank Meeting: {groupData.thinkTankMeeting}</span> */}
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
          <div className={styles.sidebarSection}>
            <h2 className={styles.sidebarTitle}>Happening Now</h2>
            <div className={styles.sidebarBanner}>
              <SidebarBannerSlider events={groupData.tabs.events || []} />
            </div>
          </div>
          <div className={styles.officeHoursCard}>
            <h3>Office Hours Timings</h3>
            <div className={styles.officeHoursCardTiming}>
              <p>{groupData.officeHours}</p>
              <button
                className={styles.officeHoursButton}
                onClick={() => window.location.href = "https://discord.gg/yourchannel"}
                aria-label="Join office hours"
              >
                Add to calendar
              </button>
            </div>
          </div>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityForum;