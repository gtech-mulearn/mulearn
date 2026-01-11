import React, { useEffect, useState } from "react";
import {
    Card,
    CardBody,
    CardFooter,
    Stack,
    Text,
    Heading,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    VStack,
    Alert,
    AlertTitle,
    AlertDescription,
    Img,
    FormControl,
    FormLabel,
    Switch,
    Box,
    RadioGroup,
    Radio,
    Spinner,
} from "@chakra-ui/react";
import { FiBookOpen, FiRefreshCw, FiType } from "react-icons/fi";
import { AchievementData } from "../../../ManageAchievements/ManageAchievementsInterface";
import level7 from "../../../Profile/components/MuVoyage/assets/images/Level7.webp";
import level6 from "../../../Profile/components/MuVoyage/assets/images/Level6.webp";
import level5 from "../../../Profile/components/MuVoyage/assets/images/Level5.webp";
import level4 from "../../../Profile/components/MuVoyage/assets/images/Level4.webp";
import level3 from "../../../Profile/components/MuVoyage/assets/images/Level3.webp";
import level2 from "../../../Profile/components/MuVoyage/assets/images/Level2.webp";
import level1 from "../../../Profile/components/MuVoyage/assets/images/Level1.webp";
import { getConnectedUsers, issueVerifiableCredential, updateVCURL } from "../../services/api";
import toast from "react-hot-toast";
import { useUserStore } from "../../../../../../ZustandProvider";

const Colors: Record<string, string> = {
    lavender: "#CDC1FF",
    pink: "#FFCCEA",
    green: "#BFF6C3",
    blue: "#7BD3EA",
};

interface AchievementCardOneProps {
    achievement: AchievementData;
    userDID?: string;
    muid?: string;
    usersName?: string;
    fromUserSearch?: boolean;
    onAchievementUpdate?: () => void;
    onDIDUpdate?: (newDID: string) => void;
}

const getRandomColor = (): string => {
    const colorValues = Object.values(Colors);
    return colorValues[Math.floor(Math.random() * colorValues.length)];
};

type IssuedCredentialResponse = {
    message: string;
    subject_info: {
        completed_date: string;
        course_name: string;
        credential_id: string;
        credential_type: "Badge" | "Certificate" | "Recognition";
        description: string;
        did: string;
        email: string;
        full_name: string;
        s3_url: string;
        template_id: string;
        type: "Badge" | "Certificate" | "Recognition";
    };
}[];

const AchievementCardOne: React.FC<AchievementCardOneProps> = ({
    achievement,
    userDID: initialUserDID,
    muid,
    usersName,
    fromUserSearch,
    onAchievementUpdate,
    onDIDUpdate,
}) => {
    const bgColor = getRandomColor();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [cardIcon, setCardIcon] = useState("");
    const [issuedCredential, setIssuedCredential] = useState<IssuedCredentialResponse | null>(null);
    const [availableDIDs, setAvailableDIDs] = useState<string[]>([]); // Changed to array
    const [selectedDID, setSelectedDID] = useState<string>(""); // New state for selected DID
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [didLinkStatus, setDidLinkStatus] = useState<'checking' | 'linked' | 'not-linked'>('not-linked');
    const userEmail = useUserStore((state) => state.userInfo?.email || "");

    const levelIcons: Record<string, string> = {
        "Level 1": level1,
        "Level 2": level2,
        "Level 3": level3,
        "Level 4": level4,
        "Level 5": level5,
        "Level 6": level6,
        "Level 7": level7,
    };

    useEffect(() => {
        if (!achievement?.achievement) return;

        // Check for icon from API first (icon_url or icon field)
        const apiIcon = achievement.achievement.icon_url || achievement.achievement.icon;

        if (apiIcon) {
            // If it's already a full URL, use it directly
            if (apiIcon.startsWith('http://') || apiIcon.startsWith('https://')) {
                setCardIcon(apiIcon);
                return;
            }
            // If it's a relative path, prepend the backend URL
            const backendUrl = (import.meta.env.VITE_BACKEND_URL as string).replace(/\/$/, "");
            if (apiIcon.startsWith("media/")) {
                setCardIcon(`${backendUrl}/${apiIcon}`);
            } else if (apiIcon.includes("/") && !apiIcon.startsWith("/")) {
                setCardIcon(`${backendUrl}/media/${apiIcon}`);
            } else {
                setCardIcon(`${backendUrl}${apiIcon.startsWith("/") ? "" : "/"}${apiIcon}`);
            }
            return;
        }

        // Fallback to level-based icons
        const achievementName = achievement.achievement.achievement_name || "";
        setCardIcon(levelIcons[achievementName] || levelIcons["Level 1"]);
    }, [achievement]);

    const handleButtonClick = async () => {
        if (fromUserSearch && !achievement.is_issued) return;

        // Fetch DIDs when modal opens
        if (!achievement.is_issued && muid) {
            setDidLinkStatus('checking');
            onOpen();

            try {
                const dids = await getConnectedUsers('muid', muid);
                if (dids && dids.length > 0) {
                    setAvailableDIDs(dids);
                    setSelectedDID(dids[0]); // Default to first DID
                    setDidLinkStatus('linked');
                } else {
                    setAvailableDIDs([]);
                    setSelectedDID("");
                    setDidLinkStatus('not-linked');
                }
            } catch (error) {
                console.error("Error fetching DIDs:", error);
                setAvailableDIDs([]);
                setSelectedDID("");
                setDidLinkStatus('not-linked');
            }
        } else {
            onOpen();
        }
    };

    const handleRefreshDID = async () => {
        if (!muid) {
            toast.error("MUID not available for refresh.");
            return;
        }

        setIsRefreshing(true);
        setDidLinkStatus('checking');

        try {
            const connectedUsersResponse = await getConnectedUsers('muid', muid);

            if (connectedUsersResponse && connectedUsersResponse.length > 0) {
                setAvailableDIDs(connectedUsersResponse);
                setSelectedDID(connectedUsersResponse[0]); // Default to first DID
                setDidLinkStatus('linked');
                toast.success("DID(s) linked successfully! You can now issue your credential.");

                // Update parent component with first DID
                if (onDIDUpdate) {
                    onDIDUpdate(connectedUsersResponse[0]);
                }
            } else {
                setDidLinkStatus('not-linked');
                setAvailableDIDs([]);
                setSelectedDID("");
                toast.error("DID not found. Please make sure you've linked your account in the QSeverse app.");
            }
        } catch (error) {
            console.error("Error refreshing DID:", error);
            setDidLinkStatus('not-linked');
            setAvailableDIDs([]);
            setSelectedDID("");
            toast.error("Failed to refresh DID status. Please try again.");
        } finally {
            setIsRefreshing(false);
        }
    };

    const handleIssueVC = async () => {
        if (!selectedDID) {
            toast.error("Please select a DID to issue the Verifiable Credential.");
            return;
        }

        try {
            const subject_info: SubjectInfo = {
                type: "Badge",
                did: selectedDID,
                full_name: usersName || "",
                email: userEmail || "",
            };

            const template_id = achievement.achievement.template_id;
            const credential_info: CredentialInfo = {
                course_name: achievement.achievement?.achievement_name || "",
                tags: achievement.achievement?.tags || [],
                description: achievement.achievement?.description || "",
                name: achievement.achievement?.achievement_name || "",
            };

            const response = await issueVerifiableCredential(subject_info, credential_info, template_id);
            const vc_url = response.response[0].subject_info.s3_url;

            if (!vc_url) {
                toast.error("Failed to issue VC. Please try again.");
                return;
            }

            await updateVCURL(achievement.achievement?.id || "", vc_url);
            setIssuedCredential(response.response);
            toast.success("Verifiable Credential has been issued successfully!");

            if (onAchievementUpdate) {
                onAchievementUpdate();
            }
        } catch (error) {
            console.error("Error issuing VC:", error);
            toast.error("An error occurred while issuing the VC.");
        }
    };

    const renderModalContent = () => {
        if (didLinkStatus === 'checking') {
            return (
                <VStack spacing={4} align="stretch" py={8}>
                    <Spinner size="xl" mx="auto" />
                    <Text textAlign="center">Loading your DIDs...</Text>
                </VStack>
            );
        }

        if (availableDIDs.length === 0 && !issuedCredential) {
            return (
                <VStack spacing={{ base: 3, md: 4 }} align="stretch">
                    <Text fontSize={{ base: "sm", md: "md" }}>
                        It seems you haven't linked your DID yet. Please link it to proceed.
                    </Text>
                    <Text fontSize={{ base: "xs", md: "sm" }} color="gray.600">
                        Note: Your name ({usersName || "Unknown"}) and muid ({muid || "Not provided"}) will be shared when you issue this credential.
                    </Text>
                    <ul className="list-disc pl-5 text-sm">
                        <li>Go to Play Store or App Store and download the QSeverse app.</li>
                        <li>Log in to your existing MuLearn account.</li>
                        <li>That's it! Your DID is linked to your account.</li>
                    </ul>
                </VStack>
            );
        }

        if (issuedCredential) {
            return (
                <VStack spacing={{ base: 3, md: 4 }} align="stretch">
                    <Alert
                        status="success"
                        variant="subtle"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        textAlign="center"
                        py={4}
                    >
                        <AlertTitle mt={4} mb={1} fontSize={{ base: "md", md: "lg" }}>
                            Credential Issued Successfully!
                        </AlertTitle>
                        <AlertDescription maxWidth="sm" fontSize={{ base: "sm", md: "md" }}>
                            Your Verifiable Credential has been issued. Scan the QR to add it to your wallet.
                        </AlertDescription>
                    </Alert>
                    <Img
                        src={issuedCredential[0].message}
                        alt="Credential Badge"
                        maxH={{ base: "200px", md: "300px" }}
                        objectFit="contain"
                        mx="auto"
                    />
                    <Stack direction={{ base: "column", sm: "row" }} spacing={2} wrap="wrap" justify="center">
                        <Text className="bg-green-300 text-white !px-2 !py-1 rounded-full text-xs flex justify-center items-center gap-2">
                            <FiBookOpen /> {issuedCredential[0].subject_info.course_name}
                        </Text>
                        <Text className="bg-orange-300 text-white !px-2 !py-1 rounded-full text-xs flex justify-center items-center gap-2">
                            <FiType /> {issuedCredential[0].subject_info.type}
                        </Text>
                    </Stack>
                </VStack>
            );
        }

        if (fromUserSearch && achievement.is_issued) {
            return (
                <VStack spacing={{ base: 3, md: 4 }} align="stretch">
                    <Alert
                        status="success"
                        variant="subtle"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        textAlign="center"
                        py={4}
                    >
                        <AlertTitle mt={4} mb={1} fontSize={{ base: "md", md: "lg" }}>
                            Here's the user's credential!
                        </AlertTitle>
                        <AlertDescription maxWidth="sm" fontSize={{ base: "sm", md: "md" }}>
                            This is the issued Verifiable Credential.
                        </AlertDescription>
                    </Alert>
                    <Img
                        src={achievement.vc_url}
                        alt="Credential Badge"
                        maxH={{ base: "200px", md: "300px" }}
                        objectFit="contain"
                        mx="auto"
                    />
                    <Stack direction={{ base: "column", sm: "row" }} spacing={2} wrap="wrap" justify="center">
                        <Text className="bg-green-300 text-white !px-2 !py-1 rounded-full text-xs flex justify-center items-center gap-2">
                            <FiBookOpen /> <span>{achievement.achievement?.achievement_name}</span>
                        </Text>
                        <Text className="bg-red-300 text-white !px-2 !py-1 rounded-full text-xs flex justify-center items-center gap-2">
                            <FiType /> {achievement.achievement?.tags[0]}
                        </Text>
                    </Stack>
                </VStack>
            );
        }

        if (achievement.is_issued) {
            return (
                <VStack spacing={{ base: 3, md: 4 }} align="stretch">
                    <Alert
                        status="success"
                        variant="subtle"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        textAlign="center"
                        py={4}
                    >
                        <AlertTitle mt={4} mb={1} fontSize={{ base: "md", md: "lg" }}>
                            Here's your credential!
                        </AlertTitle>
                        <AlertDescription maxWidth="sm" fontSize={{ base: "sm", md: "md" }}>
                            Scan the QR to add it to your wallet.
                        </AlertDescription>
                    </Alert>
                    <Img
                        src={achievement.vc_url}
                        alt="Credential Badge"
                        maxH={{ base: "200px", md: "300px" }}
                        objectFit="contain"
                        mx="auto"
                    />
                    <Stack direction={{ base: "column", sm: "row" }} spacing={2} wrap="wrap" justify="center">
                        <Text className="bg-green-300 text-white !px-2 !py-1 rounded-full text-xs flex justify-center items-center gap-2">
                            <FiBookOpen /> <span>{achievement.achievement?.achievement_name}</span>
                        </Text>
                        <Text className="bg-red-300 text-white !px-2 !py-1 rounded-full text-xs flex justify-center items-center gap-2">
                            <FiType /> {achievement.achievement?.tags[0]}
                        </Text>
                    </Stack>
                </VStack>
            );
        }

        return (
            <VStack spacing={{ base: 3, md: 4 }} align="stretch">
                <Text fontSize={{ base: "sm", md: "md" }}>
                    {achievement.achievement.description}
                </Text>

                {availableDIDs.length > 1 && (
                    <FormControl>
                        <FormLabel fontSize={{ base: "sm", md: "md" }}>
                            Select DID to issue credential to:
                        </FormLabel>
                        <RadioGroup value={selectedDID} onChange={setSelectedDID}>
                            <VStack align="stretch" spacing={2}>
                                {availableDIDs.map((did, index) => (
                                    <Radio
                                        key={did}
                                        value={did}
                                        size="sm"
                                        colorScheme="blue"
                                    >
                                        <Text fontSize="sm" wordBreak="break-all">
                                            DID {index + 1}: {did}
                                        </Text>
                                    </Radio>
                                ))}
                            </VStack>
                        </RadioGroup>
                    </FormControl>
                )}

                {availableDIDs.length === 1 && (
                    <Box bg="gray.50" p={3} borderRadius="md">
                        <Text fontSize="xs" color="gray.600" fontWeight="semibold" mb={1}>
                            Your DID:
                        </Text>
                        <Text fontSize="xs" wordBreak="break-all">
                            {availableDIDs[0]}
                        </Text>
                    </Box>
                )}

                <Text fontSize={{ base: "xs", md: "sm" }} color="gray.600">
                    Ready to issue your Verifiable Credential?
                </Text>
            </VStack>
        );
    };

    const renderModalFooter = () => {
        if (availableDIDs.length === 0) {
            return (
                <>
                    <Button
                        bg="#007bff"
                        color="white"
                        mr={{ base: 0, md: 3 }}
                        as="a"
                        href="https://apps.apple.com/us/app/qs-passport/id6477819506"
                        target="_blank"
                        size={{ base: "sm", md: "md" }}
                        w={{ base: "full", sm: "auto" }}
                        mb={{ base: 2, sm: 0 }}
                    >
                        Link DID (App Store)
                    </Button>
                    <Button
                        bg="#007bff"
                        color="white"
                        mr={{ base: 0, md: 3 }}
                        as="a"
                        href="https://play.google.com/store/apps/details?id=com.qseverse.passport"
                        target="_blank"
                        size={{ base: "sm", md: "md" }}
                        w={{ base: "full", sm: "auto" }}
                        mb={{ base: 2, sm: 0 }}
                    >
                        Link DID (Play Store)
                    </Button>
                    <Button
                        bg="#28a745"
                        color="white"
                        onClick={handleRefreshDID}
                        isLoading={isRefreshing}
                        loadingText="Checking..."
                        leftIcon={<FiRefreshCw />}
                        size={{ base: "sm", md: "md" }}
                        w={{ base: "full", sm: "auto" }}
                        mb={{ base: 2, sm: 0 }}
                    >
                        Refresh Status
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={onClose}
                        size={{ base: "sm", md: "md" }}
                        w={{ base: "full", sm: "auto" }}
                    >
                        Cancel
                    </Button>
                </>
            );
        }

        if (issuedCredential) {
            return (
                <Button
                    bg="#007bff"
                    color="white"
                    onClick={() => {
                        onClose();
                        setIssuedCredential(null);
                    }}
                    size={{ base: "sm", md: "md" }}
                    w={{ base: "full", sm: "auto" }}
                >
                    Close
                </Button>
            );
        }

        if (achievement.is_issued) {
            return (
                <Button
                    bg="#007bff"
                    color="white"
                    onClick={onClose}
                    size={{ base: "sm", md: "md" }}
                    w={{ base: "full", sm: "auto" }}
                >
                    Close
                </Button>
            );
        }

        return (
            <Button
                bg="#007bff"
                color="white"
                onClick={handleIssueVC}
                size={{ base: "sm", md: "md" }}
                w={{ base: "full", sm: "auto" }}
            >
                Issue VC
            </Button>
        );
    };

    return (
        <>
            <Card
                maxW={{ base: "100%", sm: "xs", md: "sm", lg: "xs" }}
                height={{ base: "auto", md: "md" }}
                borderRadius={{ base: 8, md: 10 }}
                boxShadow="none"
                border="1px solid #E2E8F0"
                w="full"
            >
                <CardBody className="flex flex-col items-center px-4 py-6">
                    <Box
                        bg={bgColor}
                        className="rounded-full flex items-center justify-center"
                        w={{ base: "40vw", sm: "180px", md: "200px" }}
                        h={{ base: "40vw", sm: "180px", md: "200px" }}
                        p={3}
                    >
                        <Img
                            src={cardIcon}
                            alt="Achievement icon"
                            className="w-full h-full object-cover rounded-full"
                        />
                    </Box>
                    <Stack mt={{ base: 4, md: 6 }} spacing={{ base: 2, md: 3 }} w="full">
                        <Box className="flex flex-col w-full items-center">
                            <Heading size={{ base: "sm", md: "md" }} className="text-center !mb-3" noOfLines={2}>
                                {achievement.achievement.achievement_name}
                            </Heading>
                            <Text color="blue.600" fontSize={{ base: "xs", md: "sm" }} align="center" noOfLines={3}>
                                {achievement.achievement.description}
                            </Text>
                        </Box>
                    </Stack>
                </CardBody>
                <CardFooter className="flex justify-center pb-6">
                    {!fromUserSearch && (
                        <Button
                            bg="#007bff"
                            color="white"
                            _hover={{ bg: "#0056b3" }}
                            size={{ base: "xs", md: "sm" }}
                            onClick={handleButtonClick}
                            px={{ base: 4, md: 6 }}
                        >
                            {achievement.is_issued ? "View" : "Issue VC"}
                        </Button>
                    )}
                    {fromUserSearch && achievement.is_issued && (
                        <Button
                            bg="#007bff"
                            color="white"
                            _hover={{ bg: "#0056b3" }}
                            size={{ base: "xs", md: "sm" }}
                            onClick={handleButtonClick}
                            px={{ base: 4, md: 6 }}
                        >
                            View
                        </Button>
                    )}
                    {fromUserSearch && !achievement.is_issued && (
                        <Text fontSize={{ base: "xs", md: "sm" }} color="gray.600" textAlign="center" px={4}>
                            The user hasn't claimed this achievement yet.
                        </Text>
                    )}
                </CardFooter>
            </Card>

            <Modal
                isOpen={isOpen}
                onClose={() => {
                    onClose();
                    setIssuedCredential(null);
                }}
                isCentered
                size={{ base: "xs", sm: "sm", md: "md", lg: "lg" }}
                motionPreset="slideInBottom"
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader fontSize={{ base: "lg", md: "xl" }}>
                        {didLinkStatus === 'checking'
                            ? "Loading..."
                            : availableDIDs.length === 0
                                ? "Link Your DID"
                                : issuedCredential
                                    ? "Credential Issued"
                                    : achievement.is_issued
                                        ? "Achievement Details"
                                        : "Issue Credential"}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody px={{ base: 4, md: 6 }} py={4}>
                        {renderModalContent()}
                    </ModalBody>
                    <ModalFooter justifyContent="center" flexWrap="wrap" gap={2}>
                        {renderModalFooter()}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default AchievementCardOne;