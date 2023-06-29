import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Spinner,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import PostCard from "../../components/postComponents/postCard";
import CreatePostForm from "../../components/form/form";
import { SearchIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import * as api from "../../api/index.js";
import SearchInput from "../../components/postComponents/searchInput";
import { getItem } from "../../utils/localStorage.utils";

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [fetchError, setFetchError] = useState(false);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(getItem("sydaniForumSession") as string)?.result;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetchPosts = async () => {
    try {
      const res = await api.fetchPostsByCreator(user.username);
      setPosts(res.data.data);
      console.log(res);
      setPosts(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
    if (posts.length > 0) {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (posts.length > 0) {
      setLoading(false);
    } else if (posts.length === 0) {
      setFetchError(true);
    }
    console.log(posts);
  }, [posts]);

  return (
    <>
      <Box>
        <Heading marginBlock="1rem" color="primary">
          My Posts
        </Heading>
        {posts.length === 0 && fetchError ? (
          <Box>
            <Heading marginTop="2.5rem">You have not made any posts</Heading>
            <Button colorScheme="blue" onClick={onOpen}>
              Create Post
            </Button>
          </Box>
        ) : (
          <Container minW="fit-content">
            <SimpleGrid columns={[1, 1, 2, 2]} spacing={4}>
              {posts.map((post, i) => (
                <PostCard key={i} post={post} />
              ))}
            </SimpleGrid>
            <Stack w="100%">
              {loading ? (
                <Center marginBlock="2rem" marginInline="auto" w="full">
                  <Spinner />
                </Center>
              ) : null}
            </Stack>
            <Flex></Flex>
          </Container>
        )}
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a new Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box marginBlock="1rem">
              <CreatePostForm onClose={onClose} />
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MyPosts;
