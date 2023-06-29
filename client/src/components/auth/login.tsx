import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as api from "../../api/index";
import { setItem } from "../../utils/localStorage.utils";

export default function Login() {
  const [loginFormData, setLoginFOrmData] = useState({
    email: "",
    password: "",
  });
  const toast = useToast();
  const navigate = useNavigate();

  const handleFormChange = (event: any) => {
    const { name, value } = event.target;
    setLoginFOrmData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      const res = await api.signIn(loginFormData);
      console.log(res);
      toast({
        title: "Login successful",
        position: "top-right",
        isClosable: true,
        status: "success",
      });
      setItem("sydaniForumSession", res.data);
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
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to collaborate and share ideas with like minds ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="email"
                value={loginFormData.email}
                onChange={handleFormChange}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={loginFormData.password}
                onChange={handleFormChange}
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}>
                <Checkbox>Remember me</Checkbox>
                <Box as={Link} to="/auth" color={"primary"}>
                  Forgot password?
                </Box>
              </Stack>
              <Button
                bg={"primary"}
                onClick={handleLogin}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}>
                Sign in
              </Button>
              <Box as={Link} to="signup" color={"primary"}>
                Don't have an account? Signup!
              </Box>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
