import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Icon,
  IconProps,
  Image,
  VStack,
  Wrap,
  WrapItem,
  SimpleGrid,
  Box,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Collabo from "../assets/collabo.jpg";
import PostCard from "../components/postComponents/postCard";
import * as api from "../api/index.js";
import { useEffect, useState } from "react";

export default function Home() {
  const [post, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchPosts = async () => {
    try {
      const res = await api.fetchPosts(1);
      setPosts(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (post.length > 0) {
      setLoading(false);
    }
  }, [post]);

  return (
    <>
      <Box
        color="white"
        paddingY="2rem"
        minH="60vh"
        maxH="85vh"
        backgroundImage={`linear-gradient(0deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${Collabo})`}
        backgroundPosition="center"
        backgroundRepeat="no-repeat">
        <Center h="full">
          <VStack
            minH="20rem"
            as={Flex}
            flexDir="column"
            justifyContent="space-between">
            <Heading
              as={Flex}
              columnGap={{ base: ".3rem", md: "1rem" }}
              paddingInline={{ base: "1rem", md: "auto" }}
              fontWeight={600}
              textAlign="center"
              fontSize={{ base: ".8rem", md: "2rem" }}
              lineHeight={"110%"}>
              Elevate Your Collaboration Game:
              <Text as={"span"} color={"primary"}>
                Connect and Innovate with Colleagues
              </Text>
            </Heading>
            <Text
              paddingInline={{ base: "1rem", md: "auto" }}
              color={"white"}
              maxW={"3xl"}
              fontSize={{ base: ".7rem", md: "1rem" }}>
              Welcome to our dynamic question bank where colleagues from all
              over the world can come together to share ideas and ask questions!
              Whether you're working from the comfort of your home office or on
              the go, our platform is designed to bring you closer to your
              colleagues and help you stay connected. With a user-friendly
              interface and powerful features, you'll be able to collaborate and
              learn from your peers in no time. So come on in, ask away, and
              let's build a community of knowledge-sharing and innovation!
            </Text>
            <Stack spacing={6} direction={"row"}>
              <Button
                fontWeight="normal"
                color="white"
                as={Link}
                to="/auth"
                rounded={"full"}
                px={6}
                colorScheme={"orange"}
                bg={"orange.400"}
                _hover={{ bg: "orange.500" }}>
                Get started
              </Button>
              <Button
                fontWeight="normal"
                color="white"
                as={Link}
                to="/about"
                rounded={"full"}
                px={6}>
                Learn more
              </Button>
            </Stack>
          </VStack>
        </Center>
      </Box>
      <Container maxW={"6xl"}>
        <Stack
          textAlign={"center"}
          align={"center"}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 10, md: 18 }}>
          {/* <Flex w={"full"}>
          <Image src={Collabo} />
        </Flex> */}
          <VStack>
            <Heading
              fontWeight={600}
              fontSize={{ base: "xl", sm: "2xl", md: "3xl" }}
              lineHeight={"110%"}>
              Top Posts
            </Heading>
            <SimpleGrid columns={[1, 2]} spacing={4}>
              {post.map((post, i) => (
                <PostCard key={i} post={post} />
              ))}
              {loading ? (
                <Center marginBlock="2rem" marginInline="auto">
                  <Spinner />
                </Center>
              ) : null}
            </SimpleGrid>
          </VStack>
        </Stack>
      </Container>
    </>
  );
}
