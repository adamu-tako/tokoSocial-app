import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Spinner,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import PostCard from "../components/postComponents/postCard";
import CreatePostForm from "../components/form/form";
import { SearchIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import * as api from "../api/index.js";
import SearchInput from "../components/postComponents/searchInput";

const PostsPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState<number>(1);

  const fetchPosts = async () => {
    console.log(page);

    try {
      const res = await api.fetchPosts(page);
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
    }
  }, [posts]);

  console.log(posts);

  return (
    <>
      <Box>
        <Container minW="80vw">
          <Box marginBlock="1rem">
            <Flex justifyContent="space-between" alignItems="center">
              <Button colorScheme="blue" onClick={onOpen}>
                Create Post
              </Button>
              <SearchInput
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </Flex>
          </Box>
          <SimpleGrid columns={[1, 1, 2, 2, 3, 3]} spacing={4}>
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
          <Flex justifyContent="center" marginBlock="2.5rem">
            <Button bgColor="transparent" color="primary" mr={3}>
              Previous page
            </Button>
            <Button
              onClick={async () => {
                await setPage((prev) => prev + 1);
                fetchPosts();
              }}
              colorScheme="blue"
              mr={3}>
              Next Page
            </Button>
          </Flex>
        </Container>
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

export default PostsPage;
