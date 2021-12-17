import React, { useState } from "react";
import {
  Box,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  useColorMode,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { FaSun, FaMoon } from "react-icons/fa";

import styles from "./Header.module.css";

function Header({ query, onSearch }) {
  const { colorMode, toggleColorMode } = useColorMode();

  const toggleThemeHandler = () => {
    toggleColorMode();
  };

  return (
    <HStack justify="space-between" pt="6" pb="6">
      <HStack spacing="20px" flex="1">
        <Heading as="h1">Books</Heading>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.300" />}
          />
          <Input
            type="tel"
            placeholder="Phone number"
            value={query}
            onChange={(e) => onSearch(e.target.value)}
          />
        </InputGroup>
      </HStack>
      <IconButton
        icon={colorMode === "light" ? <FaSun /> : <FaMoon />}
        onClick={toggleThemeHandler}
      />
    </HStack>
  );
}

export default Header;
