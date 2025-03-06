import React from "react";
import { Box, Flex, Text, Image, Badge, Button } from "@chakra-ui/react";

const levels = [
  { id: "1", label: "Level 1" },
  { id: "2", label: "Level 2" },
  { id: "3", label: "Level 3" },
  { id: "4", label: "Level 4" },
  { id: "5", label: "Level 5" },
  { id: "6", label: "Level 6" },
  { id: "7", label: "Level 7" },
];

const LevelMap = () => {
  const handleLevelClick = (level: { id: string; label: string }) => {
  };

  const handleChallengeAction = (level: { id: string; label: string }) => {
  };

  return (
    <Flex
      direction="column"
      align="center"
      p={4}
      bg="#222"      // Dark contrasting background
      minH="100vh"
    >
      {levels.map((level, index) => (
        <React.Fragment key={level.id}>
          {/* Level Circle */}
          <Box
            as="button"
            onClick={() => handleLevelClick(level)}
            bg="radial-gradient(circle, #3457d5, #456ff6)"
            color="white"
            w="80px"
            h="80px"
            borderRadius="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
            border="2px solid #456ff6"
            mb={2}
          >
            <Text fontWeight="bold">{level.label}</Text>
          </Box>

          {/* Only add connectors and challenge card if not the last level */}
          {index < levels.length - 1 && (
            <>
              {/* Connector Line from Circle to Card */}
              <Box bg="#FFD700" w="4px" h="50px" mb={2} />

              {/* Challenge Card */}
              <Flex
                bg="white"
                border="1px solid #ccc"
                borderRadius="md"
                p={3}
                w="300px"
                align="center"
                mb={2}
              >
                <Image
                  src="https://via.placeholder.com/50"
                  boxSize="50px"
                  objectFit="cover"
                  mr={3}
                  alt="Challenge"
                />
                <Box flex="1">
                  <Text fontWeight="bold">Challenge for {level.label}</Text>
                  <Text fontSize="sm">
                    Complete this challenge to unlock the next level!
                  </Text>
                  <Flex mt={1}>
                    <Badge mr={1} colorScheme="teal">
                      easy
                    </Badge>
                    <Badge mr={1} colorScheme="teal">
                      quiz
                    </Badge>
                  </Flex>
                  <Text fontSize="xs" mt={1}>
                    Karma: 10
                  </Text>
                </Box>
                <Button
                  size="sm"
                  onClick={() => handleChallengeAction(level)}
                >
                  Go
                </Button>
              </Flex>

              {/* Connector Line from Card to Next Circle */}
              <Box bg="#FFD700" w="4px" h="50px" mb={2} />
            </>
          )}
        </React.Fragment>
      ))}
    </Flex>
  );
};

export default LevelMap;
