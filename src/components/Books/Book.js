import React from "react";

import { ListItem } from "@chakra-ui/react";
import styles from "./Book.module.css";

function Book({ book }) {
  console.log(book);
  return <ListItem>{book.title}</ListItem>;
}

export default Book;
