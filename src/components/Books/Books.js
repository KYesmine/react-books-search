import React from "react";
import Book from "./Book";

import { Box, Wrap } from "@chakra-ui/react";
import styles from "./Books.module.css";

function Books({ books }) {
  return (
    <Box className={styles.books}>
      <Wrap justify="space-between" spacing="1.3em">
        {books.map((book) => {
          return book.thumbnail && <Book key={book.id} book={book} />;
        })}
      </Wrap>
    </Box>
  );
}

export default Books;
