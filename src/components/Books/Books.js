import React from "react";
import Book from "./Book";

import { Box, Heading, Wrap } from "@chakra-ui/react";
import styles from "./Books.module.css";

function Books({ books }) {
  return (
    <Box className={styles.books}>
      <Heading as="h2" pb="1em">
        Results
      </Heading>
      <Wrap spacing="2.3em">
        {books.map((book) => {
          return book.thumbnail && <Book key={book.id} book={book} />;
        })}
      </Wrap>
    </Box>
  );
}

export default Books;
