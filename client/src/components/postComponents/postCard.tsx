import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Image,
  Avatar,
  useColorModeValue,
  VStack,
  useToast,
  HStack,
  Flex,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import moment from "moment";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getItem } from "../../utils/localStorage.utils";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import * as api from "../../api/index";
import { AxiosError } from "axios";

interface IComment {
  comment: string;
  creator: string;
  id: string;
  createdAt: string;
}
interface ILike {
  like: string;
  likedBy: string;
  _id: string;
}

interface IPost {
  tags: [""];
  likes: ILike[];
  comments: IComment[];
  createdAt: "";
  _id: "";
  selectedFile: "";
  title: "";
  message: "";
  creator: "";
  slug: "";
}

export default function PostCard({ post }: { post: IPost }) {
  const parsedTime = new Date(post.createdAt);
  const convertedDate = moment(parsedTime).fromNow();
  const user = JSON.parse(getItem("sydaniForumSession") as string)?.result;
  const hasLikedPost = post?.likes?.find((like) => like === user?._id);
  const toast = useToast();
  const navigate = useNavigate();

  const handleLike = async () => {
    if (!user) {
      toast({
        title: "You have to be logged in to like a post",
        status: "error",
      });
      return;
    }
    let reqBody = {
      like: user._id,
      likedBy: user.username ?? user.name,
    };

    try {
      toast({
        title: "Liking post...",
        status: "loading",
        duration: 500,
        isClosable: true,
      });

      const commentResp = await api.likePost(reqBody, post._id);
      console.log(commentResp.data);
      toast({
        title: "You just liked a post",
        position: "top-right",
        isClosable: true,
        status: "success",
      });
    } catch (error: any) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : "An error occurred while saving the like.";

      toast({
        title: errorMessage,
        position: "top-right",
        isClosable: true,
        status: "error",
      });
      console.error(error);
    }
  };

  const handleNavigate = () => {
    navigate(`/posts/${post.slug}`);
  };

  const handleDeletePost = async () => {
    try {
      const res = await api.deletePost(post._id);

      toast({
        title: res.data.message,
        position: "top-right",
        isClosable: true,
        status: "success",
      });
      window.location.reload();
    } catch (error: any) {
      console.log(error);
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : "An error occurred while saving the like.";

      toast({
        title: errorMessage,
        position: "top-right",
        isClosable: true,
        status: "error",
      });
    }
  };

  return (
    // <Link to={`/posts/${post.slug}`}>
    <Center py={6}>
      <Box
        maxW={"350px"}
        minW={"200px"}
        minH="25rem"
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"lg"}>
        <Box
          onClick={handleNavigate}
          cursor="pointer"
          bg={"gray.100"}
          minH="fit-content"
          roundedTop="lg"
          w="100%">
          <Image
            minHeight="250px"
            maxHeight="250px"
            width="100%"
            roundedTop="lg"
            src={post?.selectedFile}
          />
        </Box>
        <VStack
          justifyContent="space-between"
          minH="200px"
          m={6}
          textAlign="left">
          <Stack onClick={handleNavigate} cursor="pointer" w="full">
            <Heading
              noOfLines={3}
              color={useColorModeValue("gray.700", "white")}
              fontSize={"2xl"}>
              {post?.title}
            </Heading>
            <Text noOfLines={2} color={"gray.500"}>
              {post?.message}
            </Text>
          </Stack>
          <HStack
            alignSelf="center"
            width="100%"
            justifyContent="space-between"
            mt={6}
            direction={"row"}
            spacing={4}
            align={"center"}>
            <Flex columnGap=".5rem">
              <Avatar name={post?.creator} />
              <Stack direction={"column"} spacing={0} fontSize={"sm"}>
                <Text fontWeight={600}>{post?.creator}</Text>
                <Text color={"gray.500"}>{convertedDate}</Text>
              </Stack>
            </Flex>
            <Flex columnGap=".5rem">
              <IconButton
                aria-label="Like"
                onClick={handleLike}
                variant="outline"
                cursor="pointer"
                fontSize="20px">
                {hasLikedPost ? <AiOutlineLike /> : <AiFillLike />}
              </IconButton>
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<BsThreeDotsVertical />}
                  variant="outline"
                />
                <MenuList>
                  <MenuItem onClick={handleDeletePost}>Delete Post</MenuItem>
                  <MenuItem
                    onClick={() =>
                      toast({
                        title: "This feature is in development",
                        position: "top-right",
                        isClosable: true,
                        status: "error",
                      })
                    }>
                    Edit Post
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </HStack>
        </VStack>
      </Box>
    </Center>
    // </Link>
  );
}
