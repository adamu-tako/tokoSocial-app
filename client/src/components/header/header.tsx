import { ReactNode } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Heading,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Link, useLocation } from "react-router-dom";
import { setItem } from "../../utils/localStorage.utils";
import DashboardSidebar from "../userProfile/sidebar";
import { LinkItems } from "../../pages/userProfile/dashboard";

const Links = [
  {
    link: "Posts",
    to: "/posts",
  },
  {
    link: "Search Posts",
    to: "/search-page",
  },
  {
    link: "About",
    to: "/about",
  },
];

const NavLink = ({ children, to }: { children: ReactNode; to: string }) => (
  <Box
    as={Link}
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "underline",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    to={to}>
    {children}
  </Box>
);

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { pathname } = useLocation();

  const userAccount = JSON.parse(
    localStorage.getItem("sydaniForumSession") as string
  );

  const handleLogout = () => {
    setItem("sydaniForumSession", "");
    location.reload();
  };

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box
            display={{
              base: pathname.includes("/user-profile") ? "block" : "none",
              md: "none",
            }}
            position="relative"
            h="auto"
            width="fit-content">
            <DashboardSidebar LinkItems={LinkItems} />
          </Box>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{
              base: pathname.includes("/user-profile") ? "none" : "block",
              md: "none",
            }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box as={Link} to="/">
              <Heading color="primary" fontSize="1.5rem">
                tokoSocial
              </Heading>
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}>
              {Links.map((link) => (
                <NavLink to={link.to} key={link.link}>
                  {link.link}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          {userAccount ? (
            <Flex alignItems={"center"}>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}>
                  <Flex alignItems="center" columnGap=".4rem">
                    <Text
                      textDecoration="none"
                      display={{ base: "none", md: "block" }}>
                      {userAccount?.result?.name}
                    </Text>
                    <Avatar
                      size={"sm"}
                      src={""}
                      name={userAccount?.result?.name}
                    />
                    <ChevronDownIcon />
                  </Flex>
                </MenuButton>
                <MenuList>
                  <MenuItem as={Link} to="/user-profile">
                    My profile
                  </MenuItem>
                  <MenuItem as={Link} to="/user-profile/settings">
                    Settings
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          ) : (
            <Link to="/auth">
              <Button fontWeight="normal">Signin or Signup</Button>
            </Link>
          )}
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink to={link.to} key={link.link}>
                  {link.link}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
