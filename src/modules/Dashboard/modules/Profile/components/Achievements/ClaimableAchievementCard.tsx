/**
 * ClaimableAchievementCard Component
 * Displays an achievement that can be claimed by the user
 */
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
    VStack,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Progress,
    Box,
    Badge,
    Spinner,
    HStack,
} from "@chakra-ui/react";
import { FiCheck, FiAward, FiTrendingUp, FiLock } from "react-icons/fi";
import toast from "react-hot-toast";
import { claimAchievement } from "../../services/achievementApi";
import { EligibleAchievement, ClaimResult } from "../../services/achievementTypes";

interface ClaimableAchievementCardProps {
    achievement: EligibleAchievement;
    onClaimed?: () => void;
}

const Colors: Record<string, string> = {
    lavender: "#CDC1FF",
    pink: "#FFCCEA",
    green: "#BFF6C3",
    blue: "#7BD3EA",
    orange: "#FFD7A8",
};

const getColorByPercentage = (percentage: number): string => {
    if (percentage >= 100) return "#48BB78"; // green
    if (percentage >= 75) return "#4299E1"; // blue
    if (percentage >= 50) return "#ECC94B"; // yellow
    if (percentage >= 25) return "#ED8936"; // orange
    return "#FC8181"; // red
};

const getRandomColor = (): string => {
    const colorValues = Object.values(Colors);
    return colorValues[Math.floor(Math.random() * colorValues.length)];
};

const ClaimableAchievementCard: React.FC<ClaimableAchievementCardProps> = ({
    achievement,
    onClaimed,
}) => {
    const bgColor = getRandomColor();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isClaiming, setIsClaiming] = useState(false);
    const [claimResult, setClaimResult] = useState<ClaimResult | null>(null);

    const percentage = achievement.progress?.percentage || 0;
    const isEligible = achievement.eligible;

    const handleClaimClick = () => {
        setClaimResult(null);
        onOpen();
    };

    const handleClaim = async () => {
        setIsClaiming(true);
        try {
            const result = await claimAchievement(achievement.achievement_id);
            setClaimResult(result);

            if (result.success) {
                toast.success(result.message);
                onClaimed?.();
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error("Failed to claim achievement");
        } finally {
            setIsClaiming(false);
        }
    };

    const handleClose = () => {
        onClose();
        setClaimResult(null);
    };

    return (
        <>
            <Card
                maxW={{ base: "100%", sm: "xs", md: "sm" }}
                height={{ base: "auto", md: "md" }}
                borderRadius={{ base: 8, md: 12 }}
                boxShadow="0 4px 20px rgba(0,0,0,0.08)"
                border="1px solid"
                borderColor={isEligible ? "green.200" : "gray.200"}
                w="full"
                transition="all 0.3s ease"
                _hover={{
                    transform: isEligible ? "translateY(-4px)" : "none",
                    boxShadow: isEligible ? "0 8px 30px rgba(0,0,0,0.12)" : "0 4px 20px rgba(0,0,0,0.08)",
                }}
                opacity={isEligible ? 1 : 0.85}
            >
                <CardBody className="flex flex-col items-center px-4 py-6">
                    <Box position="relative">
                        <Box
                            bg={bgColor}
                            className="rounded-full flex items-center justify-center"
                            w={{ base: "120px", md: "160px" }}
                            h={{ base: "120px", md: "160px" }}
                            p={3}
                        >
                            <Text fontSize={{ base: "3xl", md: "5xl" }}>
                                {achievement.icon || "🏆"}
                            </Text>
                        </Box>
                        {isEligible && (
                            <Badge
                                position="absolute"
                                top="-2"
                                right="-2"
                                colorScheme="green"
                                borderRadius="full"
                                px={2}
                                py={1}
                                fontSize="xs"
                            >
                                Ready to Claim!
                            </Badge>
                        )}
                    </Box>

                    <Stack mt={{ base: 4, md: 5 }} spacing={{ base: 2, md: 3 }} w="full">
                        <Heading
                            size={{ base: "sm", md: "md" }}
                            className="text-center"
                            noOfLines={2}
                        >
                            {achievement.achievement_name}
                        </Heading>

                        <Text
                            color="gray.600"
                            fontSize={{ base: "xs", md: "sm" }}
                            align="center"
                            noOfLines={2}
                        >
                            {achievement.reason}
                        </Text>

                        {/* Progress Bar */}
                        <Box w="full" px={2}>
                            <HStack justify="space-between" mb={1}>
                                <Text fontSize="xs" color="gray.500">
                                    Progress
                                </Text>
                                <Text
                                    fontSize="xs"
                                    fontWeight="bold"
                                    color={getColorByPercentage(percentage)}
                                >
                                    {percentage}%
                                </Text>
                            </HStack>
                            <Progress
                                value={percentage}
                                colorScheme={percentage >= 100 ? "green" : "blue"}
                                size="sm"
                                borderRadius="full"
                                bg="gray.100"
                            />
                            {achievement.progress && (
                                <Text fontSize="xs" color="gray.500" mt={1} textAlign="center">
                                    {achievement.progress.current} / {achievement.progress.required}
                                </Text>
                            )}
                        </Box>
                    </Stack>
                </CardBody>

                <CardFooter className="flex justify-center pb-6">
                    <Button
                        bg={isEligible ? "#007bff" : "gray.400"}
                        color="white"
                        _hover={{ bg: isEligible ? "#0056b3" : "gray.400" }}
                        size={{ base: "sm", md: "md" }}
                        onClick={handleClaimClick}
                        leftIcon={isEligible ? <FiAward /> : <FiLock />}
                        isDisabled={!isEligible}
                        px={{ base: 6, md: 8 }}
                    >
                        {isEligible ? "Claim Now" : "Locked"}
                    </Button>
                </CardFooter>
            </Card>

            {/* Claim Modal */}
            <Modal isOpen={isOpen} onClose={handleClose} isCentered size={{ base: "sm", md: "md" }}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        {claimResult?.success
                            ? "🎉 Achievement Claimed!"
                            : `Claim: ${achievement.achievement_name}`}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {isClaiming ? (
                            <VStack spacing={4} py={8}>
                                <Spinner size="xl" color="blue.500" />
                                <Text>Claiming your achievement...</Text>
                            </VStack>
                        ) : claimResult?.success ? (
                            <VStack spacing={4}>
                                <Alert
                                    status="success"
                                    variant="subtle"
                                    flexDirection="column"
                                    alignItems="center"
                                    justifyContent="center"
                                    textAlign="center"
                                    borderRadius="lg"
                                    py={6}
                                >
                                    <AlertIcon boxSize="40px" mr={0} />
                                    <AlertTitle mt={4} mb={1} fontSize="lg">
                                        Congratulations!
                                    </AlertTitle>
                                    <AlertDescription maxWidth="sm">
                                        You've successfully claimed "{claimResult.achievement_name}"!
                                        {claimResult.vc_pending && (
                                            <>
                                                <br />
                                                <Text mt={2} fontWeight="semibold" color="blue.600">
                                                    Your Verifiable Credential is being generated...
                                                </Text>
                                            </>
                                        )}
                                    </AlertDescription>
                                </Alert>
                            </VStack>
                        ) : claimResult ? (
                            <VStack spacing={4}>
                                <Alert status="error" borderRadius="lg">
                                    <AlertIcon />
                                    <Box>
                                        <AlertTitle>Unable to Claim</AlertTitle>
                                        <AlertDescription>{claimResult.message}</AlertDescription>
                                    </Box>
                                </Alert>
                                {claimResult.progress && (
                                    <Box w="full">
                                        <Text mb={2} fontWeight="semibold">
                                            Current Progress:
                                        </Text>
                                        <Progress
                                            value={claimResult.progress.percentage}
                                            colorScheme="blue"
                                            borderRadius="full"
                                        />
                                        <Text fontSize="sm" color="gray.600" mt={1}>
                                            {claimResult.progress.current} / {claimResult.progress.required}
                                        </Text>
                                    </Box>
                                )}
                            </VStack>
                        ) : (
                            <VStack spacing={4} align="stretch">
                                <Text>
                                    You're about to claim the "{achievement.achievement_name}" achievement!
                                </Text>
                                <Box bg="gray.50" p={4} borderRadius="md">
                                    <HStack mb={2}>
                                        <FiTrendingUp />
                                        <Text fontWeight="semibold">Your Progress</Text>
                                    </HStack>
                                    <Progress
                                        value={percentage}
                                        colorScheme="green"
                                        borderRadius="full"
                                        mb={2}
                                    />
                                    <Text fontSize="sm" color="gray.600">
                                        {achievement.progress?.current || 0} / {achievement.progress?.required || 0} ({percentage}%)
                                    </Text>
                                </Box>
                                {achievement.has_vc && (
                                    <Alert status="info" borderRadius="md">
                                        <AlertIcon />
                                        <Box>
                                            <AlertTitle fontSize="sm">Verifiable Credential</AlertTitle>
                                            <AlertDescription fontSize="xs">
                                                A VC will be issued to your wallet upon claiming.
                                            </AlertDescription>
                                        </Box>
                                    </Alert>
                                )}
                            </VStack>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        {claimResult?.success ? (
                            <Button colorScheme="green" onClick={handleClose}>
                                <FiCheck style={{ marginRight: 8 }} />
                                Done
                            </Button>
                        ) : claimResult ? (
                            <Button variant="ghost" onClick={handleClose}>
                                Close
                            </Button>
                        ) : (
                            <>
                                <Button variant="ghost" onClick={handleClose} mr={3}>
                                    Cancel
                                </Button>
                                <Button
                                    colorScheme="blue"
                                    onClick={handleClaim}
                                    isLoading={isClaiming}
                                    loadingText="Claiming..."
                                    leftIcon={<FiAward />}
                                >
                                    Claim Achievement
                                </Button>
                            </>
                        )}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ClaimableAchievementCard;
