import React, { useState } from "react";
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
    FormControl,
    FormLabel,
    VStack,
    Box,
    Switch,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Img,
} from "@chakra-ui/react";
import { issueVerifiableCredential } from "../../services/api";
import { useUserStore } from "/src/ZustandProvider";
import { FiBookOpen, FiCalendar, FiType } from "react-icons/fi";

const Colors: Record<string, string> = {
    lavender: "#CDC1FF",
    pink: "#FFCCEA",
    green: "#BFF6C3",
    blue: "#7BD3EA",
};

// Define SubjectInfo type based on your new structure
type SubjectInfo = {
    type: "Badge" | "Certificate" | "Recognition";
    full_name: string;
    email: string;
    name: string; 
    did: string;
};

type CredentialInfo = {
    course_name: string;
    quiz_name: string;
    tags: string[];
    description: string;
};

// Define the API response type based on your example
type IssuedCredentialResponse = {
    message: string; // S3 URL
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

interface AchievementCardProps {
    id: string;
    subject_info: {
        type: "Badge" | "Certificate" | "Recognition";
    };
    credential_info: CredentialInfo;
    template_id: string;
    buttonText: string;
    icon: string;
}

const getRandomColor = (): string => {
    const colorValues = Object.values(Colors);
    return colorValues[Math.floor(Math.random() * colorValues.length)];
};

const AchievementCard: React.FC<AchievementCardProps> = ({
    id,
    subject_info,
    credential_info,
    template_id,
    buttonText,
    icon,
}) => {
    const bgColor = getRandomColor();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const userInfo = useUserStore((state) => state.userInfo);
    const didValue = "did:key:z6MkegpqqSYKFAKE1dX6bqCbusLQyzCv9XsZJL9dSDwHmZpB"

    // State for switches and API response
    const [shareEmail, setShareEmail] = useState(false);
    const [sharePhone, setSharePhone] = useState(false);
    const [issuedCredential, setIssuedCredential] = useState<IssuedCredentialResponse | null>(null);

    const handleButtonClick = async () => {
        onOpen(); // Always open modal for user interaction
    };

    const handleIssueVC = async () => {
        if (didValue !== null) {
            try {
                const subjectData: SubjectInfo = {
                    type: subject_info.type,
                    full_name: userInfo?.full_name || "Unknown",
                    email: shareEmail && userInfo?.email ? userInfo.email : "",
                    did: didValue,
                    name: userInfo?.full_name || "",
                };

                const response = await issueVerifiableCredential(
                    subjectData,
                    credential_info,
                    template_id
                );
                setIssuedCredential(response); // Store the response to show success
                console.log("VC Issued:", response);
            } catch (error) {
                console.error("Error issuing VC:", error);
            }
        }
    };

    return (
        <>
            <Card maxW="xs" height="md" borderRadius={10} boxShadow="none" border="1px solid #E2E8F0">
                <CardBody className="flex flex-col items-center">
                    <div
                        style={{ backgroundColor: bgColor }}
                        className="rounded-full p-3 w-48 h-48 flex items-center justify-center"
                    >
                        <p className="text-3xl">{icon}</p>
                    </div>
                    <Stack mt="6" spacing="3">
                        <div className="flex flex-col w-full items-center">
                            <Heading className="text-center !mb-4">
                                {credential_info.course_name}
                            </Heading>
                            <Text color="blue.600" fontSize="sm" align="center">
                                {credential_info.description}
                            </Text>
                        </div>
                    </Stack>
                </CardBody>
                <CardFooter className="flex justify-center">
                    <Button
                        bg="#007bff"
                        color="white"
                        _hover={{ bg: "#0056b3" }}
                        size="sm"
                        onClick={handleButtonClick}
                    >
                        {buttonText}
                    </Button>
                </CardFooter>
            </Card>

            {/* Modal Logic */}
            <Modal isOpen={isOpen} onClose={() => { onClose(); setIssuedCredential(null); }} isCentered size="lg">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        {didValue === null ? "Link Your DID" : issuedCredential ? "Credential Issued" : "Achievement Details"}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {didValue === null ? (
                            <VStack spacing={4} align="stretch">
                                <Text>
                                    It seems you haven't linked your DID yet. Please link it to proceed.
                                </Text>
                                <Text fontSize="sm" color="gray.600">
                                    Note: Your name ({userInfo?.full_name || "Unknown"}) and DID will be shared by default.
                                </Text>
                                <div className="bg-gray-100 !p-4 rounded-md">
                                    <FormControl className="flex justify-between items-center">
                                        <FormLabel htmlFor="email-switch" mb="0">
                                            Share Email
                                        </FormLabel>
                                        <Switch
                                            id="email-switch"
                                            isChecked={shareEmail}
                                            onChange={(e) => setShareEmail(e.target.checked)}
                                        />
                                    </FormControl>
                                    <FormControl className="flex justify-between items-center">
                                        <FormLabel htmlFor="phone-switch" mb="0">
                                            Share Phone Number
                                        </FormLabel>
                                        <Switch
                                            id="phone-switch"
                                            isChecked={sharePhone}
                                            onChange={(e) => setSharePhone(e.target.checked)}
                                        />
                                    </FormControl>
                                </div>
                                <Box>
                                    <Text mb={2}>How to Link Your DID:</Text>
                                    <iframe
                                        width="100%"
                                        height="200"
                                        src="https://www.youtube.com/embed/your-video-id" // Replace with actual video URL
                                        title="How to Link Your DID"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </Box>
                            </VStack>
                        ) : issuedCredential ? (
                            <VStack spacing={4} align="stretch">
                                <Alert status="success" variant="subtle" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center">
                                    <AlertIcon boxSize="20px" mr={0} />
                                    <AlertTitle mt={4} mb={1} fontSize="lg">
                                        Credential Issued Successfully!
                                    </AlertTitle>
                                    <AlertDescription maxWidth="sm">
                                        Your Verifiable Credential has been issued.<br /> Scan the QR to add it to your wallet.
                                    </AlertDescription>
                                </Alert>
                                <Img src={issuedCredential[0].message} alt="Credential Badge" />
                                <Stack direction="row" spacing={4} wrap="wrap" className="items-start justify-start gap-4">
                                <Text className="bg-green-300 text-white !px-2 !py-1 rounded-full text-xs flex justify-center items-center gap-2"><FiBookOpen/> {issuedCredential[0].subject_info.course_name}</Text>
                                <Text className="bg-orange-300 text-white !px-2 !py-1 rounded-full text-xs flex justify-center items-center gap-2"><FiType/> {issuedCredential[0].subject_info.type}</Text>
                                <Text className="bg-red-300 text-white !px-2 !py-1 rounded-full text-xs flex justify-center items-center gap-2"><FiCalendar/> {issuedCredential[0].subject_info.completed_date}</Text>
                                </Stack>

                            </VStack>
                        ) : (
                            <Text>
                                {credential_info.description}
                                <br />
                                Ready to issue your Verifiable Credential?
                            </Text>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        {didValue === null ? (
                            <>
                                <Button
                                    bg="#007bff"
                                    color="white"
                                    mr={3}
                                    as="a"
                                    href="https://your-did-link-url.com" // Replace with actual DID link URL
                                    target="_blank"
                                >
                                    Link DID
                                </Button>
                                <Button variant="ghost" onClick={onClose}>
                                    Cancel
                                </Button>
                            </>
                        ) : issuedCredential ? (
                            <Button
                                bg="#007bff"
                                color="white"
                                onClick={() => { onClose(); setIssuedCredential(null); }}
                            >
                                Close
                            </Button>
                        
                        ) : (
                            <Button
                                bg="#007bff"
                                color="white"
                                onClick={handleIssueVC}
                            >
                                Issue VC
                            </Button>
                        )}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default AchievementCard;