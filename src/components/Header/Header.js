import React, { useState } from "react";
import {
  Box,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Container,
  useColorMode,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { FaSun, FaMoon, FaHeart } from "react-icons/fa";

import styles from "./Header.module.css";

function Header({ query, onSearch }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const borderColor = colorMode === "light" ? "gray.300" : "gray.700";

  const toggleThemeHandler = () => {
    toggleColorMode();
  };

  return (
    <Box borderBottom="1px" borderColor={borderColor}>
      <Container maxW="container.lg">
        <HStack justify="space-between" pt="6" pb="6">
          <HStack spacing="20px" flex="1">
            <Heading as="h1">Books</Heading>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color="gray.300" />}
              />
              <Input
                type="text"
                placeholder="search..."
                value={query}
                onChange={(e) => onSearch(e.target.value)}
              />
            </InputGroup>
          </HStack>
          <IconButton icon={<FaHeart />} colorScheme="red" variant="outline" />
          <IconButton
            icon={colorMode === "light" ? <FaSun /> : <FaMoon />}
            onClick={toggleThemeHandler}
            colorScheme="teal"
            variant="outline"
          />
        </HStack>
      </Container>
    </Box>
  );
}

export default Header;
