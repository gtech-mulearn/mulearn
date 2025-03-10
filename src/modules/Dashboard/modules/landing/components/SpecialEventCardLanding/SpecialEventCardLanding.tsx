import React from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Text,
    Tag,
    HStack,
    VStack,
    Icon,
    useDisclosure,
    Box,
    Avatar,
    Badge,
    Flex
} from "@chakra-ui/react";
import { FaMapMarkerAlt } from "react-icons/fa";
import {
    FiCalendar,
    FiClock,
    FiInfo,
    FiX,
    FiExternalLink
} from "react-icons/fi";
import styles from "./SpecialEventCardLanding.module.css";

interface SpecialEvent {
    id: number;
    title: string;
    description: string;
    date?: string;
    recurrence?: string;
    participants?: number;
    image: string;
    link: string;
    isLive: boolean;
    isExpired?: boolean | null;
    isComingSoon?: boolean | null;
    organization?: string;
    tags?: string[];
    location?: string;
    time?: string;
}

const SpecialEventCardLanding: React.FC<{ specialevent: SpecialEvent }> = ({
    specialevent
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const getStatusBadge = () => {
        if (specialevent.isLive) {
            return (
                <div className={styles.statusBadge} data-status="live">
                    LIVE NOW
                </div>
            );
        } else if (specialevent.isComingSoon) {
            return (
                <div className={styles.statusBadge} data-status="coming">
                    COMING SOON
                </div>
            );
        } else if (specialevent.isExpired) {
            return (
                <div className={styles.statusBadge} data-status="expired">
                    ENDED
                </div>
            );
        }
        return null;
    };

    return (
        <>
            <div className={styles.card} onClick={onOpen}>
                <div className={styles.imageContainer}>
                    <img
                        src={specialevent.image || "/placeholder.svg"}
                        alt={specialevent.title}
                        className={styles.image}
                    />
                    <div className={styles.overlay}></div>
                    {getStatusBadge()}
                </div>
                <div className={styles.content}>
                    <h3 className={styles.title}>{specialevent.title}</h3>
                    {specialevent.date && (
                        <div className={styles.dateInfo}>
                            <Icon as={FiCalendar} className={styles.icon} />
                            <span>{specialevent.date}</span>
                        </div>
                    )}
                    <button className={styles.readMoreButton}>
                        Learn More{" "}
                        <FiExternalLink style={{ marginLeft: "5px" }} />
                    </button>
                </div>
            </div>

            <Modal isOpen={isOpen} onClose={onClose} size="lg">
                <ModalOverlay backdropFilter="blur(4px)" />
                <ModalContent borderRadius="lg" overflow="hidden">
                    <Box position="relative" height="200px" overflow="hidden">
                        <Box
                            bgImage={`url(${
                                specialevent.image || "/placeholder.svg"
                            })`}
                            bgSize="cover"
                            bgPosition="center"
                            position="absolute"
                            top="0"
                            left="0"
                            right="0"
                            bottom="0"
                            filter="brightness(0.85)"
                        />
                        <Box
                            position="absolute"
                            top="0"
                            left="0"
                            right="0"
                            bottom="0"
                            bgGradient="linear(to-b, transparent 30%, rgba(0,0,0,0.8))"
                        />
                        <Box position="absolute" top="4" right="4">
                            <Icon
                                as={FiX}
                                w={6}
                                h={6}
                                color="white"
                                cursor="pointer"
                                onClick={onClose}
                                bg="rgba(0,0,0,0.3)"
                                p={1}
                                borderRadius="full"
                                _hover={{ bg: "rgba(0,0,0,0.5)" }}
                            />
                        </Box>
                        <Box
                            position="absolute"
                            bottom="4"
                            left="4"
                            color="white"
                        >
                            <Text fontSize="2xl" fontWeight="bold">
                                {specialevent.title}
                            </Text>
                            {specialevent.organization && (
                                <Text fontSize="sm">
                                    Organized by {specialevent.organization}
                                </Text>
                            )}
                        </Box>
                        {specialevent.isLive && (
                            <Badge
                                position="absolute"
                                top="4"
                                left="4"
                                colorScheme="red"
                                variant="solid"
                                px={3}
                                py={1}
                                borderRadius="full"
                            >
                                LIVE NOW
                            </Badge>
                        )}
                        {specialevent.isComingSoon && (
                            <Badge
                                position="absolute"
                                top="4"
                                left="4"
                                colorScheme="purple"
                                variant="solid"
                                px={3}
                                py={1}
                                borderRadius="full"
                            >
                                COMING SOON
                            </Badge>
                        )}
                    </Box>

                    <ModalBody pt={6}>
                        <VStack align="start" spacing={6}>
                            <Text color="gray.700">
                                {specialevent.description}
                            </Text>

                            <Box
                                bg="gray.50"
                                p={4}
                                borderRadius="md"
                                w="full"
                                border="1px solid"
                                borderColor="gray.200"
                            >
                                <VStack align="start" spacing={3}>
                                    {specialevent.date && (
                                        <HStack>
                                            <Icon
                                                as={FiCalendar}
                                                color="#007bff"
                                            />
                                            <Text fontWeight="medium">
                                                {specialevent.date}
                                            </Text>
                                        </HStack>
                                    )}
                                    <HStack>
                                        <Icon as={FiClock} color="#007bff" />
                                        <Text>
                                            {specialevent.time || "10:00 AM"}
                                        </Text>
                                    </HStack>
                                    <HStack>
                                        <Icon
                                            as={FaMapMarkerAlt}
                                            color="#007bff"
                                        />
                                        <Text>
                                            {specialevent.location || "mulearn"}
                                        </Text>
                                    </HStack>
                                </VStack>
                            </Box>

                            {specialevent.tags &&
                                specialevent.tags.length > 0 && (
                                    <Box w="full">
                                        <Text
                                            fontSize="sm"
                                            fontWeight="medium"
                                            mb={2}
                                            color="gray.600"
                                        >
                                            Event Tags
                                        </Text>
                                        <Flex gap={2} flexWrap="wrap">
                                            {specialevent.tags.map(
                                                (tag, index) => (
                                                    <Tag
                                                        key={index}
                                                        colorScheme="blue"
                                                        variant="subtle"
                                                    >
                                                        {tag}
                                                    </Tag>
                                                )
                                            )}
                                        </Flex>
                                    </Box>
                                )}

                            {specialevent.participants && (
                                <Box w="full">
                                    <HStack mb={2}>
                                        <Icon as={FiInfo} color="blue.500" />
                                        <Text
                                            fontSize="sm"
                                            fontWeight="medium"
                                            color="gray.700"
                                        >
                                            {specialevent.participants} people
                                            attending
                                        </Text>
                                    </HStack>
                                    <Flex align="center">
                                        <HStack spacing={1} mr={3}>
                                            <Avatar
                                                size="sm"
                                                name="User 1"
                                                bg="blue.500"
                                                borderWidth="2px"
                                                borderColor="white"
                                            />
                                            <Avatar
                                                size="sm"
                                                name="User 2"
                                                bg="green.500"
                                                ml="-3"
                                                borderWidth="2px"
                                                borderColor="white"
                                            />
                                            <Avatar
                                                size="sm"
                                                name="User 3"
                                                bg="purple.500"
                                                ml="-3"
                                                borderWidth="2px"
                                                borderColor="white"
                                            />
                                            <Avatar
                                                size="sm"
                                                name="User 4"
                                                bg="pink.500"
                                                ml="-3"
                                                borderWidth="2px"
                                                borderColor="white"
                                            />
                                        </HStack>
                                        <Text
                                            fontSize="sm"
                                            color="gray.600"
                                            fontWeight="medium"
                                        >
                                            Join 127 others
                                        </Text>
                                    </Flex>
                                </Box>
                            )}
                        </VStack>
                    </ModalBody>

                    <ModalFooter
                        bg="gray.50"
                        borderTop="1px solid"
                        borderColor="gray.200"
                    >
                        <Button
                            bg="#007bff"
                            color="white"
                            _hover={{
                                bg: "#0069d9",
                                transform: "translateY(-2px)",
                                boxShadow: "md"
                            }}
                            width="full"
                            borderRadius="md"
                            onClick={() =>
                                window.open(specialevent.link, "_blank")
                            }
                            leftIcon={<FiExternalLink />}
                            transition="all 0.2s"
                        >
                            Register for Event
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default SpecialEventCardLanding;
