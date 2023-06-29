import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
  FormControl,
  Textarea,
  Avatar,
  useToast,
  IconButton,
  HStack,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { MdLocalShipping } from "react-icons/md";
import * as api from "../api/index";
import { Link, useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { getItem } from "../utils/localStorage.utils";
import { Menu } from "iconsax-react";
import { AiTwotoneDelete } from "react-icons/ai";
import { LuEdit } from "react-icons/lu";

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

export default function PostDetails() {
  const [post, setPost] = useState<IPost>({} as IPost);
  const [comment, setComment] = useState("");
  const params = useParams();
  const user = JSON.parse(getItem("sydaniForumSession") as string)?.result;
  const [commentsArray, setCommentsArray] = useState<IComment[]>();
  const hasLikedPost = post?.likes?.find((like) => like === user._id);
  const toast = useToast();
  const parsedTime = new Date(post?.createdAt);
  const convertedDate = moment(parsedTime).fromNow();
  const navigate = useNavigate();

  const reverseArray = (array: any | undefined) => {
    const reversedArray: IComment[] = [];

    for (let i = array?.length - 1; i >= 0; i--) {
      const valueAtIndex = array[i];

      reversedArray.push(valueAtIndex);
    }

    return setCommentsArray(reversedArray);
  };

  const fetchPost = async () => {
    try {
      const res = await api.fetchPost(params.slug);
      setPost(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  useEffect(() => {
    reverseArray(post?.comments);
  }, [post]);

  const handleComment = async () => {
    if (!user) {
      toast({
        title: "You have to be logged in to post a comment",
        status: "error",
      });
      return;
    }
    let reqBody = {
      comment: comment,
      creator: user.username,
    };

    try {
      toast({
        title: "Saving comment...",
        status: "loading",
        duration: 50,
        isClosable: true,
      });
      if (!comment) return;
      console.log(post);

      const commentResp = await api.comment(reqBody, post._id);
      setPost(commentResp.data);
      setComment("");
      toast({
        title: "Cooment saved",
        position: "top-right",
        isClosable: true,
        status: "success",
      });
    } catch (error: any) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : "An error occurred while creating the comment.";

      toast({
        title: errorMessage,
        position: "top-right",
        isClosable: true,
        status: "error",
      });
      console.log(error);
    }
  };

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
      setPost(commentResp.data);
      setComment("");
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

  const handleDeletePost = async () => {
    try {
      const res = await api.deletePost(post._id);

      toast({
        title: res.data.message,
        position: "top-right",
        isClosable: true,
        status: "success",
      });
      navigate(-1);
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
    <Container maxW={"7xl"}>
      <SimpleGrid
        columns={1}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}>
        <Box as={"header"}>
          <Heading
            lineHeight={1.5}
            fontWeight={"bold"}
            fontSize={{ base: "xl", sm: "2xl", lg: "3xl" }}>
            {post?.title}
          </Heading>
        </Box>
        <Flex>
          <Image
            rounded={"md"}
            alt={"product image"}
            src={post?.selectedFile}
            fit={"cover"}
            align={"center"}
            w={"100%"}
            h={{ base: "100%", sm: "400px", lg: "500px" }}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <HStack paddingInline=".5rem" justifyContent="space-between">
            <Stack
              alignSelf="start"
              mt={6}
              direction={"row"}
              spacing={4}
              align={"center"}>
              <Avatar name={post?.creator} />
              <Stack direction={"column"} spacing={0} fontSize={"sm"}>
                <Text fontWeight={600}>{post?.creator}</Text>
                <Text color={"gray.500"}>{convertedDate}</Text>
              </Stack>
            </Stack>
            <Flex columnGap=".5rem">
              <IconButton
                aria-label="delete-post"
                icon={<AiTwotoneDelete />}
                variant="outline"
                onClick={handleDeletePost}></IconButton>
              <IconButton
                aria-label="delete-post"
                icon={<LuEdit />}
                variant="outline"
                onClick={() =>
                  toast({
                    title: "This feature is in development",
                    position: "top-right",
                    isClosable: true,
                    status: "info",
                  })
                }></IconButton>
            </Flex>
          </HStack>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.200", "gray.600")}
              />
            }>
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text fontSize={"lg"}>{post?.message}</Text>
            </VStack>
            <Box>
              <Flex columnGap="1rem" alignItems="center">
                <IconButton
                  aria-label="Like"
                  onClick={handleLike}
                  variant="outline"
                  cursor="pointer"
                  fontSize="20px">
                  {hasLikedPost ? <AiOutlineLike /> : <AiFillLike />}
                </IconButton>
                {post?.likes?.length > 0 ? (
                  <Text fontSize={{ base: "16px", lg: "18px" }} mb={"1"}>
                    <b>Liked by</b> {post?.likes && post?.likes[0]?.likedBy}
                    and <b>{post?.likes?.length}</b> others
                  </Text>
                ) : (
                  <Text fontSize={{ base: "16px", lg: "18px" }} mb={"1"}>
                    No likes
                  </Text>
                )}
              </Flex>
            </Box>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={"primary"}
                fontWeight={"bold"}
                textTransform={"uppercase"}
                mb={"1"}>
                Tags
              </Text>
              <List>
                <Flex columnGap="1rem">
                  {post?.tags?.map((tag) => (
                    <Link key={tag} to={`/search/${tag}`}>
                      <ListItem>
                        <Heading
                          color={"blue.900"}
                          textDecoration={"underline"}
                          fontSize={"lg"}>{`#${tag}`}</Heading>
                      </ListItem>
                    </Link>
                  ))}
                </Flex>
              </List>
            </Box>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={"primary"}
                fontWeight={"bold"}
                textTransform={"uppercase"}
                mb={"4"}>
                Post a reply
              </Text>

              <FormControl>
                <Textarea
                  name="commentBox"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </FormControl>
            </Box>
          </Stack>

          <Button
            rounded={"none"}
            w={"full"}
            mt={8}
            size={"lg"}
            py={"7"}
            bg="primary"
            color={useColorModeValue("white", "gray.900")}
            textTransform={"uppercase"}
            onClick={handleComment}
            _hover={{
              transform: "translateY(2px)",
              boxShadow: "lg",
            }}>
            Comment
          </Button>
        </Stack>
      </SimpleGrid>
      <Box>
        <Text
          fontSize={{ base: "16px", lg: "18px" }}
          color={"primary"}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          mb={"4"}>
          Comments
        </Text>
        <Container minW="100%">
          {commentsArray?.map((comment, i) => (
            <Box
              key={i}
              border="1px solid gray"
              shadow="md"
              p="1rem"
              my="1rem"
              rounded="lg">
              <Stack
                alignSelf="start"
                mt={6}
                direction={"row"}
                spacing={4}
                align={"center"}>
                <Avatar name={comment?.creator} />
                <Stack direction={"column"} spacing={0} fontSize={"sm"}>
                  <Text fontWeight={600}>{comment?.creator}</Text>
                  <Text color={"gray.500"}>
                    {moment(comment?.createdAt).fromNow()}
                  </Text>
                </Stack>
              </Stack>
              <Text>{comment?.comment}</Text>
            </Box>
          ))}
        </Container>
      </Box>
    </Container>
  );
}
