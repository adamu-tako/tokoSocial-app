import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
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
  Wrap,
  Spinner,
  Stack,
  useDisclosure,
  WrapItem,
  SimpleGrid,
} from "@chakra-ui/react";
import PostCard from "../components/postComponents/postCard";
import CreatePostForm from "../components/form/form";
import { SearchIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import * as api from "../api/index.js";
import SearchInput from "../components/postComponents/searchInput";
import { useParams } from "react-router-dom";

const SearchPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const res = await api.fetchPostsBySearch(searchTerm);
      setPosts(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  // }, []);

  const handleSearchPosts = () => {
    fetchPosts();
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") handleSearchPosts();
  };

  return (
    <>
      <Box>
        <Container minW="80vw">
          <Box marginBlock="1rem">
            <Flex justifyContent="space-between" alignItems="center">
              <Button colorScheme="blue" onClick={onOpen}>
                Create Post
              </Button>
              <Box>
                <FormControl>
                  <InputGroup>
                    <Input
                      bgColor="white"
                      placeholder="Search posts"
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <InputRightAddon
                      width="fit-content"
                      p="0"
                      onKeyDown={(e) => handleKeyDown(e)}
                      onClick={handleSearchPosts}>
                      <Button bgColor="transparent">
                        <SearchIcon />
                      </Button>
                    </InputRightAddon>
                  </InputGroup>
                </FormControl>
              </Box>
            </Flex>
          </Box>
          <SimpleGrid columns={[1, 1, 2, 2, 3, 3]} spacing={4}>
            {posts.map((post, i) => (
              <PostCard key={i} post={post} />
            ))}
          </SimpleGrid>
          <Stack w="100%">
            {posts.length <= 0 ? (
              <Center marginBlock="5rem" marginInline="auto" w="full">
                <Flex flexDir="column" justifyContent="center">
                  <Heading>There are no posts to show!</Heading>
                  {/* <Heading>Something went wrong...</Heading> */}
                  <Button
                    marginInlineStart="auto"
                    bgColor="primary"
                    marginTop=".5rem"
                    w="5rem"
                    onClick={() => window.location.reload()}>
                    Retry
                  </Button>
                </Flex>
              </Center>
            ) : null}
          </Stack>
          <Flex></Flex>
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

export default SearchPage;
