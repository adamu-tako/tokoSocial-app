import {
  Box,
  Center,
  Checkbox,
  Flex,
  HStack,
  Heading,
  Text,
} from "@chakra-ui/react";
import { FaRegEdit } from "react-icons/fa";
import { formatDateJoined } from "../../utils/format.utils";
import { getItem } from "../../utils/localStorage.utils";

const UserProfile = () => {
  const user = JSON.parse(getItem("sydaniForumSession") as string)?.result;
  console.log(user);

  return (
    <Flex flexDirection="column" marginTop={{ base: "2rem", md: "0" }}>
      <Box marginBlock="1rem">
        <HStack>
          <Heading size="lg">{user.name || "Unsigned User"}</Heading>
          <FaRegEdit color="#2C3E50" />
        </HStack>
        <Box my={2}>
          <Text color="primary">Date Joined</Text>
          <Text>{formatDateJoined(user.createdAt)}</Text>
        </Box>

        <Box my={2}>
          <Text color="primary">Email</Text>
          <Text>{user.email || ""}</Text>
        </Box>

        <Box my={2}>
          <Text color="primary">Username</Text>
          <Text color="gray.400">{user.username || "Not available"}</Text>
        </Box>
      </Box>
    </Flex>
  );
};

export default UserProfile;
