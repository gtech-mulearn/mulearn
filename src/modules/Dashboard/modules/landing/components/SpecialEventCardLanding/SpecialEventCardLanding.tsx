import type React from "react";
import styles from "./SpecialEventCardLanding.module.css";
import { 
    FiCalendar, 
    FiClock, 
    FiInfo, 
    FiX, 
    FiExternalLink 
} from "react-icons/fi";
import { FaMapMarkerAlt } from "react-icons/fa";
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

const SpecialEventCardLanding: React.FC<{ specialevent: SpecialEvent }> = ({ specialevent }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            {/* Card */}
            <div className={styles.card}>
                <img
                    src={specialevent.image || "/placeholder.svg"}
                    alt={specialevent.title}
                    className={styles.image}
                />
                <div className={styles.content}>
                    <button className={styles.readMoreButton} onClick={onOpen}>
                        Read More
                    </button>
                </div>
            </div>

            {/* Modal */}
            <Modal isOpen={isOpen} onClose={onClose} size="lg">
                <ModalOverlay backdropFilter="blur(4px)" />
                <ModalContent borderRadius="lg" overflow="hidden">
                    <Box position="relative" height="200px" overflow="hidden">
                        <Box
                            bgImage={`url(${specialevent.image || "/placeholder.svg"})`}
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
                        <Box position="absolute" bottom="4" left="4" color="white">
                            <Text fontSize="2xl" fontWeight="bold">{specialevent.title}</Text>
                            {specialevent.organization && (
                                <Text fontSize="sm">Organized by {specialevent.organization}</Text>
                            )}
                        </Box>
                    </Box>

                    <ModalBody pt={6} >
                        <VStack align="start" spacing={6}>
                            <Text color="gray.700">{specialevent.description}</Text>
                            <Box p={4} borderRadius="md" w="full" paddingLeft={0}>
                                <HStack align="start" spacing={4}>
                                    {specialevent.date && (
                                        <HStack className="bg-[#90ee90] !p-2 rounded-full text-[.7rem] md:text-xs ">
                                            <Icon as={FiCalendar} color="#007bff" />
                                            <Text fontWeight="medium">{specialevent.date}</Text>
                                        </HStack>
                                    )}
                                    <HStack  className="bg-[#87cefa] !p-2 rounded-full  text-[.7rem] md:text-xs">
                                        <Icon as={FiClock} color="#007bff" />
                                        <Text>{specialevent.time || "10:00 AM"}</Text>
                                    </HStack >
                                    <HStack className="bg-[#ffb6c1] !p-2 rounded-full  text-[.7rem] md:text-xs">
                                        <Icon as={FaMapMarkerAlt} color="#007bff" />
                                        <Text>{specialevent.location || "mulearn"}</Text>
                                    </HStack>
                                </HStack>
                            </Box>
                        </VStack>
                    </ModalBody>

                    <ModalFooter bg="gray.50" borderTop="1px solid" borderColor="gray.200">
                        <Button
                            bg="#007bff"
                            color="white"
                            _hover={{ bg: "#0069d9", transform: "translateY(-2px)", boxShadow: "md" }}
                            width="full"
                            borderRadius="md"
                            onClick={() => window.open(specialevent.link, "_blank")}
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
