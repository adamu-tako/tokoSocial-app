import {
  Box,
  BoxProps,
  CloseButton,
  Drawer,
  DrawerContent,
  Flex,
  useColorModeValue,
  useDisclosure,
  Icon,
  FlexProps,
  Avatar,
  Text,
} from "@chakra-ui/react";
import { HambergerMenu, User } from "iconsax-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import theme from "../../utils/theme";
import { ArrowDown, Home2, Setting, TickCircle, TrendUp } from "iconsax-react";

interface LinkItemProps {
  name: string;
  icon: any;
  link: string;
}

const DashboardSidebar = ({ LinkItems }: { LinkItems: LinkItemProps[] }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box width={["0", "0", "25vw", "20vw"]}>
      <SidebarContent
        LinkItems={LinkItems}
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent LinkItems={LinkItems} onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <Box display={["block", "block", "none", "none"]} onClick={onOpen}>
        <HambergerMenu />
      </Box>
    </Box>
  );
};

export default DashboardSidebar;

interface SidebarProps extends BoxProps {
  onClose: () => void;
  LinkItems: LinkItemProps[];
}

const SidebarContent = ({ LinkItems, onClose, ...rest }: SidebarProps) => {
  const userAccount = JSON.parse(
    localStorage.getItem("sydaniForumSession") as string
  );

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: "full" }}
      h="90vh"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.link} link={link.link} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
      <Flex
        position="absolute"
        padding="5px"
        bg="primary"
        width="100%"
        height="100px"
        borderTopRadius="12px"
        bottom="0"
        alignItems="center"
        columnGap=".4rem">
        <Avatar size={"sm"} src={""} name={userAccount?.result?.name} />
        <Text textDecoration="none">{userAccount?.result?.name}</Text>
      </Flex>
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: any;
  children: any;
  link: string;
}
const NavItem = ({ icon, children, link, ...rest }: NavItemProps) => {
  const { pathname } = useLocation();

  return (
    <Link to={link} style={{ textDecoration: "none" }} key={link}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        color={pathname === link ? "primary" : "none"}
        _hover={{
          bg: "secondary",
          color: "primary",
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "primary",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};
