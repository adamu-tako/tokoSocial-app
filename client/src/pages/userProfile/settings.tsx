import { Box, Divider, HStack, Heading, Stack, Text } from "@chakra-ui/react";
import { FaRegEdit } from "react-icons/fa";

const Settings = () => {
  return (
    <Box>
      <HStack>
        <Heading marginBlock="1rem" color="primary">
          Settings
        </Heading>
        <FaRegEdit color="#2C3E50" />
      </HStack>

      <Stack width={{ base: "100%", md: "50%" }} marginBlock="2rem">
        <HStack justifyContent="space-between">
          <Text fontWeight="bold">Theme</Text>
          <Text>Light</Text>
        </HStack>
        <Divider borderColor="blue.900" />
      </Stack>
    </Box>
  );
};

export default Settings;
