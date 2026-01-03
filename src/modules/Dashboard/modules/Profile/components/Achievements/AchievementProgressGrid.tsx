/**
 * AchievementProgressGrid Component
 * Displays all achievements with their progress in a responsive grid
 */
import React, { useState, useEffect } from "react";
import {
    Box,
    SimpleGrid,
    Heading,
    Text,
    Spinner,
    VStack,
    HStack,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Badge,
    Input,
    InputGroup,
    InputLeftElement,
    Select,
} from "@chakra-ui/react";
import { FiSearch, FiAward, FiCheck, FiLock } from "react-icons/fi";
import ClaimableAchievementCard from "./ClaimableAchievementCard";
import {
    getEligibleAchievements,
    getAchievementProgress,
} from "../../services/achievementApi";
import { EligibleAchievement, AchievementProgress } from "../../services/achievementTypes";
import emptyAchievements from "../../assets/images/empty achievements.webp";

interface AchievementProgressGridProps {
    muid?: string;
}

const AchievementProgressGrid: React.FC<AchievementProgressGridProps> = ({ muid }) => {
    const [eligibleAchievements, setEligibleAchievements] = useState<EligibleAchievement[]>([]);
    const [allProgress, setAllProgress] = useState<AchievementProgress[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState<"all" | "eligible" | "locked">("all");

    useEffect(() => {
        loadAchievements();
    }, []);

    const loadAchievements = async () => {
        setIsLoading(true);
        try {
            const [eligible, progress] = await Promise.all([
                getEligibleAchievements(),
                getAchievementProgress(),
            ]);
            setEligibleAchievements(eligible);
            setAllProgress(progress);
        } catch (error) {
            console.error("Error loading achievements:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClaimed = () => {
        // Refresh achievements after claiming
        loadAchievements();
    };

    // Filter and search logic
    const filteredProgress = allProgress.filter((achievement) => {
        const matchesSearch = achievement.achievement_name
            .toLowerCase()
            .includes(searchQuery.toLowerCase());

        if (!matchesSearch) return false;

        if (filterStatus === "eligible") return achievement.eligible;
        if (filterStatus === "locked") return !achievement.eligible;
        return true;
    });

    const eligibleCount = allProgress.filter((a) => a.eligible).length;
    const lockedCount = allProgress.filter((a) => !a.eligible).length;

    if (isLoading) {
        return (
            <VStack py={12} spacing={4}>
                <Spinner size="xl" color="blue.500" thickness="4px" />
                <Text color="gray.500">Loading your achievements...</Text>
            </VStack>
        );
    }

    return (
        <Box w="full">
            {/* Header */}
            <VStack align="start" spacing={4} mb={6}>
                <HStack justify="space-between" w="full" flexWrap="wrap" gap={4}>
                    <Heading size="lg">Achievements</Heading>
                    <HStack spacing={2}>
                        <Badge colorScheme="green" fontSize="sm" px={3} py={1} borderRadius="full">
                            <FiCheck style={{ display: "inline", marginRight: 4 }} />
                            {eligibleCount} Ready to Claim
                        </Badge>
                        <Badge colorScheme="gray" fontSize="sm" px={3} py={1} borderRadius="full">
                            <FiLock style={{ display: "inline", marginRight: 4 }} />
                            {lockedCount} Locked
                        </Badge>
                    </HStack>
                </HStack>

                {/* Search and Filter */}
                <HStack w="full" spacing={4} flexWrap="wrap">
                    <InputGroup maxW={{ base: "full", md: "300px" }}>
                        <InputLeftElement pointerEvents="none">
                            <FiSearch color="gray.400" />
                        </InputLeftElement>
                        <Input
                            placeholder="Search achievements..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            borderRadius="lg"
                        />
                    </InputGroup>
                    <Select
                        maxW={{ base: "full", md: "200px" }}
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value as any)}
                        borderRadius="lg"
                    >
                        <option value="all">All Achievements</option>
                        <option value="eligible">Ready to Claim</option>
                        <option value="locked">Locked</option>
                    </Select>
                </HStack>
            </VStack>

            {/* Tabs for organization */}
            <Tabs variant="soft-rounded" colorScheme="blue">
                <TabList mb={4}>
                    <Tab>
                        <FiAward style={{ marginRight: 6 }} />
                        All ({filteredProgress.length})
                    </Tab>
                    <Tab>
                        <FiCheck style={{ marginRight: 6 }} />
                        Claimable ({eligibleAchievements.length})
                    </Tab>
                </TabList>

                <TabPanels>
                    {/* All Achievements Tab */}
                    <TabPanel p={0}>
                        {filteredProgress.length === 0 ? (
                            <VStack py={12} spacing={4}>
                                <Box
                                    as="img"
                                    src={emptyAchievements}
                                    alt="No achievements"
                                    maxW="200px"
                                    opacity={0.7}
                                />
                                <Text color="gray.500" textAlign="center">
                                    {searchQuery
                                        ? "No achievements match your search"
                                        : "No achievements available yet"}
                                </Text>
                            </VStack>
                        ) : (
                            <SimpleGrid
                                columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
                                spacing={{ base: 4, md: 6 }}
                            >
                                {filteredProgress.map((achievement) => (
                                    <ClaimableAchievementCard
                                        key={achievement.achievement_id}
                                        achievement={{
                                            ...achievement,
                                            icon: "🏆",
                                            has_vc: true,
                                        }}
                                        onClaimed={handleClaimed}
                                    />
                                ))}
                            </SimpleGrid>
                        )}
                    </TabPanel>

                    {/* Claimable Only Tab */}
                    <TabPanel p={0}>
                        {eligibleAchievements.length === 0 ? (
                            <VStack py={12} spacing={4}>
                                <Box
                                    as="img"
                                    src={emptyAchievements}
                                    alt="No claimable achievements"
                                    maxW="200px"
                                    opacity={0.7}
                                />
                                <Text color="gray.500" textAlign="center">
                                    Keep going! You'll unlock achievements soon.
                                </Text>
                            </VStack>
                        ) : (
                            <SimpleGrid
                                columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
                                spacing={{ base: 4, md: 6 }}
                            >
                                {eligibleAchievements.map((achievement) => (
                                    <ClaimableAchievementCard
                                        key={achievement.achievement_id}
                                        achievement={{
                                            ...achievement,
                                            icon: "🏆",
                                            has_vc: true,
                                        }}
                                        onClaimed={handleClaimed}
                                    />
                                ))}
                            </SimpleGrid>
                        )}
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
};

export default AchievementProgressGrid;
