import styles from "../components/SideNavBar.module.css";
import { Outlet, useNavigate } from "react-router-dom";
import SideNavBar from "../components/SideNavBar";
import TopNavBar from "../components/TopNavBar";
import { AlertBanner } from "../components/AlertBanner";
import React, { Suspense, useEffect, useCallback, useState } from "react";
import { FaRocket, FaUser, FaUserFriends } from "react-icons/fa";
import { FaMagnifyingGlass, FaMapLocationDot, FaHouse, FaRankingStar } from "react-icons/fa6";
import { IoGlobeOutline } from "react-icons/io5";
import { FiRefreshCw } from "react-icons/fi";
import { roles, managementTypes } from "@/MuLearnServices/types";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";
import { dashboardRoutes, qseverseRoutes } from "@/MuLearnServices/urls";
import { privateGateway, publicGateway } from "@/MuLearnServices/apiGateways";
import { UserProfile, useUserStore, useQseverseStore } from "/src/ZustandProvider";
import { sendRefreshToken } from "@/modules/utils/cdr";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import toast from "react-hot-toast";

interface CrateType {
  navigate: (channelId: string) => void;
  toggle: (open?: boolean) => void;
}

declare global {
  interface Window {
    crate?: CrateType;
  }
}

const DashboardRootLayout = (props: { component?: any }) => {
  const navigate = useNavigate();
  const Management: ManagementTypes[] = Object.values(managementTypes).slice(2);
  const { setUserInfo, userProfile, setUserProfile, userInfo } = useUserStore();
  const {
    connectionStatus: qseverseStatus,
    hasCheckedConnection: hasCheckedQseverse,
    setConnectionStatus: setQseverseStatus,
    setHasCheckedConnection: setHasCheckedQseverse
  } = useQseverseStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeUserData = async () => {
      try {
        setIsLoading(true);

        // Check if user has refresh token (is logged in)
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
          // For non-logged-in users, skip API calls and set loading to false
          setIsLoading(false);
          return;
        }

        // Always fetch fresh user data on dashboard load to ensure we have the latest information
        // This is important for detecting level changes, karma updates, etc.
        const profileResponse = await privateGateway.get(dashboardRoutes.getUserProfile);
        if (!profileResponse?.data) {
          throw new Error('Invalid user profile API response');
        }
        const fetchedUserProfile: UserProfile = profileResponse.data.response;
        setUserProfile(fetchedUserProfile);

        const infoResponse = await privateGateway.get(dashboardRoutes.getInfo);
        if (!infoResponse?.data) {
          throw new Error('Invalid user info API response');
        }
        const user_info: UserInfo = infoResponse.data.response;
        const processedUserInfo = {
          ...user_info,
          first_name: user_info.full_name.split(" ")[0]
        };
        setUserInfo(processedUserInfo);

        // Check QSeverse connection status if not already checked (for banner display only)
        if (!hasCheckedQseverse && processedUserInfo.muid) {
          try {
            setQseverseStatus('loading');
            const response = await publicGateway.get(qseverseRoutes.getConnectedUsers, {
              params: { key: 'muid', value: processedUserInfo.muid }
            });
            const dids = response?.data?.response?.dids;
            // Only check if user has ANY DIDs - don't store which one
            if (dids && Array.isArray(dids) && dids.length > 0) {
              setQseverseStatus('connected');
            } else {
              setQseverseStatus('not_connected');
            }
          } catch (qsError) {
            console.error("Error checking QSeverse connection:", qsError);
            setQseverseStatus('error');
          } finally {
            setHasCheckedQseverse(true);
          }
        }

        const hasDomains = Array.isArray(user_info.user_domains) && user_info.user_domains.length > 0;
        const hasEndgoals = Array.isArray(user_info.user_endgoals) && user_info.user_endgoals.length > 0;
        if (!hasDomains || !hasEndgoals) {
          navigate("/register/pathfinder?ruri=/dashboard/home");
        }
      } catch (err) {
        console.error("Failed to fetch user data:", err);
        // if (err?.response?.status === 401) {
        //   useUserStore.getState().resetUserInfo();
        //   useUserStore.getState().resetUserProfile();
        // }
      } finally {
        setIsLoading(false);
        const token = localStorage.getItem("refreshToken");
        if (token) {
          sendRefreshToken();
        }
      }
    };

    let isMounted = true;
    const fetchData = async () => {
      if (isMounted) {
        await initializeUserData();
      }
    };
    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const buttons = [
    {
      url: "/dashboard/home",
      title: "Home",
      hasView: true,
      icon: <FaHouse />
    },
    {
      url: "/dashboard/profile",
      title: "Profile",
      hasView: true,
      icon: <FaUser />
    },
    {
      url: "/dashboard/mujourney",
      title: "µJourney",
      hasView: true,
      icon: <FaMapLocationDot />
    },
    {
      url: "/dashboard/interestgroups",
      title: "Interest Groups",
      hasView: true,
      icon: <FaUserFriends />
    },
    {
      url: "/dashboard/learningcircle",
      title: "Learning Circle",
      hasView: true,
      icon: <i className="fi fi-sr-books"></i>
    },
    {
      url: "/dashboard/search",
      title: "Search",
      hasView: true,
      icon: <FaMagnifyingGlass />
    },
    {
      url: "/dashboard/leaderboard",
      title: "Leaderboard",
      hasView: true,
      icon: <FaRankingStar />
    },
    {
      url: "/dashboard/launchpad",
      title: "Launchpad",
      hasView: true,
      icon: <FaRocket />
    },
    {
      url: "/dashboard/special-events",
      title: "Special Events",
      hasView: true,
      icon: <IoGlobeOutline />
    },
    {
      url: "/dashboard/courses",
      title: "Courses",
      hasView: true,
      icon: <i className="fi fi-sr-building"></i>
    },
    // {
    //     url: "/dashboard/muVerse",
    //     title: "μVerse",
    //     hasView: true,
    //     icon: <IoIosRocket />
    // },
    // {
    //     url: "/dashboard/profile",
    //     title: "Profile",
    //     hasView: true,
    //     icon: <i className="fi fi-sr-clipboard-user"></i>
    // },
    {
      url: "/dashboard/management",
      title: "Management",
      hasView: true,
      roles: [roles.ADMIN],
      icon: <i className="fi fi-sr-layout-fluid"></i>,
      dynamicType: Management
    },
    {
      url: "/dashboard/campus-details",
      title: "Campus Details",
      hasView: true,
      roles: [roles.CAMPUS_LEAD, roles.LEAD_ENABLER, roles.ADMIN],
      icon: <i className="fi fi-sr-book-arrow-right"></i>
    },
    {
      url: "/dashboard/url-shortener",
      title: "URL Shortner",
      hasView: true,
      roles: [roles.ADMIN, roles.ASSOCIATE],
      icon: <i className="fi fi-sr-link"></i>
    }
    // {
    //     url: "/dashboard/zonal-dashboard",
    //     title: "Zonal Dashboard",
    //     hasView: true,
    //     roles: [roles.ZONAL_CAMPUS_LEAD, roles.ADMIN],
    //     icon: <i className="fi fi-sr-marker"></i>
    // },
    // {
    //     url: "/dashboard/district-dashboard",
    //     title: "District Dashboard",
    //     hasView: true,
    //     roles: [roles.DISTRICT_CAMPUS_LEAD, roles.ADMIN],
    //     icon: <i className="fi fi-sr-map-marker"></i>
    // }
  ];

  // Modal for connect wallet
  const { isOpen: isConnectModalOpen, onOpen: onConnectModalOpen, onClose: onConnectModalClose } = useDisclosure();
  const [isRefreshingConnection, setIsRefreshingConnection] = useState(false);

  // Handler for QSeverse connect action - opens modal
  const handleConnectQseverse = useCallback(() => {
    onConnectModalOpen();
  }, [onConnectModalOpen]);

  // Handler for refreshing connection status
  const handleRefreshConnection = useCallback(async () => {
    if (!userInfo.muid) {
      toast.error("Unable to check connection - user info not available");
      return;
    }

    setIsRefreshingConnection(true);
    try {
      const response = await publicGateway.get(qseverseRoutes.getConnectedUsers, {
        params: { key: 'muid', value: userInfo.muid }
      });
      const dids = response?.data?.response?.dids;
      if (dids && Array.isArray(dids) && dids.length > 0) {
        setQseverseStatus('connected');
        toast.success("Wallet connected successfully!");
        onConnectModalClose();
      } else {
        toast.error("No connected wallet found. Please link your wallet in the QSeverse app first.");
      }
    } catch (error) {
      console.error("Error refreshing connection:", error);
      toast.error("Failed to check connection status.");
    } finally {
      setIsRefreshingConnection(false);
    }
  }, [userInfo.muid, setQseverseStatus, onConnectModalClose]);

  const refreshToken = localStorage.getItem("refreshToken");
  const showQseverseBanner = refreshToken && qseverseStatus === 'not_connected';

  if (isLoading) {
    return <div className={styles.loader}>
      <MuLoader />
    </div>
  }


  return (
    <div className={styles.full_page}>
      <SideNavBar sidebarButtons={buttons} />
      <div className={styles.right_side}>
        <TopNavBar setUserInfo={setUserInfo} userInfo={userInfo} />
        <div className={styles.main_content}>
          <Suspense fallback={<MuLoader />}>
            <Outlet />
          </Suspense>
        </div>
        {showQseverseBanner && (
          <div style={{
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000,
            maxWidth: '90vw',
          }}>
            <AlertBanner
              variant="warning"
              title="Connect your QSeverse Wallet"
              description="Link your wallet to claim verifiable credentials."
              actionLabel="Connect Now"
              onAction={handleConnectQseverse}
              dismissible={false}
              icon={<i className="fi fi-rr-wallet"></i>}
              className="floating-pill"
            />
          </div>
        )}
      </div>

      {/* Connect Wallet Modal */}
      <Modal isOpen={isConnectModalOpen} onClose={onConnectModalClose} isCentered>
        <ModalOverlay />
        <ModalContent mx={4}>
          <ModalHeader>Connect your QSeverse Wallet</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <Text fontSize="sm" color="gray.600">
                To claim verifiable credentials for your achievements, you need to link your QSeverse wallet.
              </Text>
              <Text fontSize="sm" fontWeight="medium">
                Steps to connect:
              </Text>
              <VStack as="ol" spacing={2} align="stretch" pl={4} fontSize="sm">
                <Text as="li">Download the QSeverse app from your app store and sign up</Text>
                <Text as="li">Connect your MuLearn account</Text>
                <Text as="li">Your wallet will be automatically linked</Text>
                <Text as="li">Click "Refresh Status" below to verify</Text>
              </VStack>
            </VStack>
          </ModalBody>
          <ModalFooter flexWrap="wrap" gap={2} justifyContent="center">
            <Button
              as="a"
              href="https://apps.apple.com/us/app/qs-passport/id6477819506"
              target="_blank"
              colorScheme="blue"
              size="sm"
            >
              App Store
            </Button>
            <Button
              as="a"
              href="https://play.google.com/store/apps/details?id=com.qseverse.passport"
              target="_blank"
              colorScheme="blue"
              size="sm"
            >
              Play Store
            </Button>
            <Button
              colorScheme="green"
              size="sm"
              leftIcon={<FiRefreshCw />}
              onClick={handleRefreshConnection}
              isLoading={isRefreshingConnection}
              loadingText="Checking..."
            >
              Refresh Status
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default DashboardRootLayout;