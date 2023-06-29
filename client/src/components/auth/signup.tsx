import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  VStack,
  Box,
  useToast,
  HStack,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import * as api from "../../api/index";
import { useState } from "react";
import { setItem } from "../../utils/localStorage.utils";

export default function Signup(): JSX.Element {
  const [signupFormData, setSignupFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    username: "",
  });
  const toast = useToast();
  const navigate = useNavigate();

  const handleFormChange = (event: any) => {
    const { name, value } = event.target;
    setSignupFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignup = async () => {
    try {
      const res = await api.signUp(signupFormData);
      const user = res.data;
      setItem("sydaniForumSession", user);
      toast({
        title: "Account created successfully",
        position: "top-right",
        isClosable: true,
        status: "success",
      });
      navigate("/");
    } catch (error: any) {
      const response = error.response.data;
      toast({
        title: response.message,
        position: "top-right",
        isClosable: true,
        status: "error",
      });
    }
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}>
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}>
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
          User Profile Edit
        </Heading>
        <FormControl id="userName">
          <FormLabel>User Icon</FormLabel>
        </FormControl>
        <HStack>
          <FormControl id="firstName" isRequired>
            <FormLabel>First name</FormLabel>
            <Input
              name="firstName"
              value={signupFormData.firstName}
              onChange={handleFormChange}
              placeholder="First Name"
              _placeholder={{ color: "gray.500" }}
              type="text"
            />
          </FormControl>
          <FormControl id="lastName" isRequired>
            <FormLabel>Last name</FormLabel>
            <Input
              name="lastName"
              value={signupFormData.lastName}
              onChange={handleFormChange}
              placeholder="Last Name"
              _placeholder={{ color: "gray.500" }}
              type="text"
            />
          </FormControl>
        </HStack>
        <FormControl id="email">
          <FormLabel>USername</FormLabel>
          <Input
            type="text"
            name="username"
            value={signupFormData.username}
            onChange={handleFormChange}
          />
        </FormControl>
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            name="email"
            value={signupFormData.email}
            onChange={handleFormChange}
          />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            value={signupFormData.password}
            onChange={handleFormChange}
          />
        </FormControl>
        <VStack spacing={6} direction={["column", "row"]}>
          <Button
            bg={"primary"}
            color={"white"}
            w="full"
            onClick={handleSignup}
            _hover={{
              bg: "blue.500",
            }}>
            Signup
          </Button>
          {/* <Button
            bg={"green.400"}
            color={"white"}
            w="full"
            _hover={{
              bg: "green.500",
            }}>
            Signup with Google
          </Button> */}
          <Box as={Link} to="/auth" color={"primary"}>
            Already have an account? Login!
          </Box>
        </VStack>
      </Stack>
    </Flex>
  );
}
