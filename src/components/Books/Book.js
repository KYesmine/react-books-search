import React from "react";

import { Box, Image } from "@chakra-ui/react";
import styles from "./Book.module.css";

function Book({ book }) {
  return (
    <Box w="160px" height="250px" className={styles.book}>
      <Image src={book.thumbnail} w="100%" h="100%" objectFit="cover" />
    </Box>
  );
}

export default Book;
