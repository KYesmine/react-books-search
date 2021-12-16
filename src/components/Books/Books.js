import React from "react";
import Book from "./Book";

import { List } from "@chakra-ui/react";
import styles from "./Books.module.css";

function Books({ books }) {
  return (
    <List spacing="10px">
      {books.map((book) => {
        return <Book key={book.id} book={book} />;
      })}
    </List>
  );
}

export default Books;
