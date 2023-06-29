import { Box, Flex } from "@chakra-ui/react";
import SimpleSidebar from "../../components/userProfile/sidebar";
import { Outlet } from "react-router-dom";
import { InfoCircle, SearchNormal, Setting, User } from "iconsax-react";
import { FiHome } from "react-icons/fi";

export const LinkItems = [
  { name: "My Profile", icon: User, link: "/user-profile" },
  { name: "My posts", icon: SearchNormal, link: "/user-profile/posts" },
  { name: "Settings", icon: Setting, link: "/user-profile/settings" },
  { name: "Posts", icon: FiHome, link: "/posts" },
  { name: "about", icon: InfoCircle, link: "/about" },
];
const Dashboard = () => {
  return (
    <Flex
      flexDir={{ base: "column", md: "row" }}
      width="98vw"
      justifyContent="space-around"
      maxH="100vh"
      columnGap="2rem">
      <Box
        display={{ base: "none", md: "block" }}
        position="relative"
        minH={{ base: "70px", md: "fit-content" }}
        h="auto"
        width={{ base: "100%", md: "fit-content" }}>
        <SimpleSidebar LinkItems={LinkItems} />
      </Box>
      <Box
        css={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
        position="relative"
        width={{ base: "100%", md: "60%" }}
        // marginBlock="auto"
        overflowY="scroll"
        marginInline="auto">
        <Outlet />
      </Box>
    </Flex>
  );
};

export default Dashboard;
