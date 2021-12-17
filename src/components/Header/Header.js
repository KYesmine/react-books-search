import React, { useState } from "react";
import {
  Box,
  Heading,
  HStack,
  IconButton,
  Input,
  useColorMode,
} from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa";

import styles from "./Header.module.css";

function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [value, setValue] = useState("");

  const toggleThemeHandler = () => {
    toggleColorMode();
  };

  return (
    <HStack justify="space-between" pt="6" pb="6">
      <HStack spacing="20px" flex="1">
        <Heading as="h1">Books</Heading>
        <Input placeholder="search for books..." />
      </HStack>
      <IconButton
        icon={colorMode === "light" ? <FaSun /> : <FaMoon />}
        onClick={toggleThemeHandler}
      />
    </HStack>
  );
}

export default Header;
