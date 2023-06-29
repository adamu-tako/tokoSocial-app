import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  Input,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SearchInput = ({
  searchTerm,
  setSearchTerm,
}: {
  searchTerm: string;
  setSearchTerm: any;
}) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleSearchPosts = () => {
    if (!pathname.includes("search")) {
      navigate(`/search-page?searchTerm=${encodeURIComponent(searchTerm)}`);
    } else {
      window.history.pushState(
        {},
        "",
        `/search-page?searchTerm=${encodeURIComponent(searchTerm)}`
      );
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") handleSearchPosts();
  };
  return (
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
  );
};

export default SearchInput;
