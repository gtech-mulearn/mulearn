import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  VStack,
} from "@chakra-ui/react";

interface DashboardTopBarProps {
  title: string;
}

const DashboardTopBar: React.FC<DashboardTopBarProps> = ({ title }) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={8}
    >
      <Heading as="h1" size="lg">
        {title}
      </Heading>
      <HStack>
        <VStack spacing={0} mr={4} alignItems="flex-end">
          <Heading as="h3" size="sm">
            John Doe
          </Heading>
          <Button variant="link" size="sm">
            MuLearn Admin
          </Button>
        </VStack>
        <Avatar
          size="md"
          src="https://c0.wallpaperflare.com/preview/901/119/723/face-man-model-person-thumbnail.jpg"
        />
      </HStack>
    </Box>
  );
};

export default DashboardTopBar;
