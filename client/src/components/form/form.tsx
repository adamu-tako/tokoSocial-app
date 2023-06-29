import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import dummyImage from "../../assets/dummyImage.svg";
import { SmallCloseIcon } from "@chakra-ui/icons";
import * as api from "../../api/index";
import { getItem } from "../../utils/localStorage.utils";

const CreatePostForm = ({ onClose }: { onClose: () => void }) => {
  const [images, setImages] = useState<File[] | []>([]);
  const [imageLink, setImageLink] = useState("");
  const [tags, setTags] = useState("");
  const [createPostForm, setCreatePostForm] = useState({
    selectedFile: imageLink,
    title: "",
    message: "",
    tags: [""],
  });
  const toast = useToast();
  const user = JSON.parse(getItem("sydaniForumSession") as string)?.result;

  const handleFormChange = (event: any) => {
    const { name, value } = event.target;
    setCreatePostForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = (file: File | undefined) => {
    if (images.length === 1) return;
    setImages((oldImageList) => {
      const copyOldImageList = [...oldImageList];
      if (file) {
        copyOldImageList.push(file);
      }
      return copyOldImageList;
    });
  };

  function handleImageDelete(index: number) {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      newImages.splice(index, 1);
      return newImages;
    });
  }

  const getImageUrl = (index: number) => {
    if (!images[index]) return "";
    return URL.createObjectURL(images[index]);
  };

  const createPost = async () => {
    try {
      if (!user) throw new Error("You have to be logged in to create a post");
      const formData = new FormData();
      formData.append("file", images[0]);
      formData.append("upload_preset", "pel3nsyu");
      formData.append("cloud_name", "dye8ruhut");

      const cloudinaryResp = await fetch(
        "https://api.cloudinary.com/v1_1/dye8ruhut/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!cloudinaryResp.ok) {
        throw new Error("Failed to upload image to Cloudinary.");
      }

      const cloudinaryData = await cloudinaryResp.json();
      const imageLink = cloudinaryData.secure_url;

      const postData = {
        selectedFile: imageLink,
        title: createPostForm.title,
        message: createPostForm.message,
        tags: tags.split(","),
        creator: user.username,
      };

      const createPostResp = await api.createPost(postData);

      toast({
        title: "Post created",
        position: "top-right",
        isClosable: true,
        status: "success",
      });

      console.log(createPostResp);

      setCreatePostForm({
        selectedFile: imageLink,
        title: "",
        message: "",
        tags: [""],
      });
      onClose();
    } catch (error: any) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : "An error occurred while creating the post.";

      toast({
        title: !user ? "You are no logged in!" : errorMessage,
        position: "top-right",
        isClosable: true,
        status: "error",
      });
    }
  };

  return (
    <Box
      bgColor="whiteAlpha.900"
      shadow="md"
      rounded="lg"
      p="1rem"
      marginBlock="2rem"
      h="fit">
      <Heading fontSize="1.2rem">Create a new post</Heading>
      <FormControl>
        <FormControl>
          {images ? (
            <Flex justifyContent="space-between" gap="10px">
              {[0].map((index) => (
                <div key={index} className="button-container">
                  {images[index] && (
                    <button
                      style={{ color: "red" }}
                      onClick={() => handleImageDelete(index)}>
                      remove
                    </button>
                  )}

                  <FormLabel
                    width="10rem"
                    h="10rem"
                    objectFit="cover"
                    key={index}
                    overflow="hidden"
                    marginY=".5rem"
                    // active={images.length === index}
                    htmlFor={images.length === index ? "add-i-1" : ""}>
                    {images.length > index ? (
                      <Image src={getImageUrl(index)} alt="upload" />
                    ) : null}
                    {images.length === index ? (
                      <Flex
                        flexDir="column"
                        justifyContent="center"
                        border="1px dashed"
                        borderColor="primary">
                        <Text textAlign="center" color="textMuted">
                          Upload image
                        </Text>
                        <Image h="8rem" src={dummyImage} alt="" />
                      </Flex>
                    ) : null}
                  </FormLabel>
                </div>
              ))}
            </Flex>
          ) : null}
          <Input
            type="file"
            id="add-i-1"
            display="none"
            accept="image/"
            onChange={(e) => handleImageUpload(e.target?.files?.[0])}
            placeholder={"Your file ..."}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input
            type="text"
            name="title"
            value={createPostForm.title}
            onChange={handleFormChange}
            bgColor="white"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Caption</FormLabel>
          <Textarea
            name="message"
            value={createPostForm.message}
            onChange={handleFormChange}
            bgColor="white"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Tags</FormLabel>
          <InputGroup>
            <Input
              name="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              bgColor="white"
              type="text"
            />
          </InputGroup>
          <FormHelperText fontSize=".5rem" color="primary">
            You can add multiple tags seperated by commas
          </FormHelperText>
        </FormControl>
      </FormControl>
      <Flex justifyContent="flex-end" marginBlock="1rem" alignItems="center">
        <Button bgColor="transparent" color="primary" mr={3} onClick={onClose}>
          Close
        </Button>
        <Button onClick={createPost} colorScheme="blue" mr={3}>
          Create Post
        </Button>
      </Flex>
    </Box>
  );
};

export default CreatePostForm;
