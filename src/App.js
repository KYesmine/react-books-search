import { useState, useEffect } from "react";
import {
  Alert,
  AlertIcon,
  CloseButton,
  Container,
  Flex,
} from "@chakra-ui/react";
import Books from "./components/Books/Books";
import Header from "./components/Header/Header";
import { VscLoading } from "react-icons/vsc";

import useHttp from "./components/hooks/use-http";

import "./App.css";

const API_URL = "https://www.googleapis.com/books/v1/volumes?q=javascript";

function App() {
  const [books, setBooks] = useState([]);
  const loadData = (data) => {
    const loadedBooks = data.items.map((book) => {
      return {
        id: book.id,
        title: book.volumeInfo.title,
        subtitle: book.volumeInfo.subtitle,
        authors: book.volumeInfo.authors,
        description: book.volumeInfo.description,
        pageCount: book.volumeInfo.pageCount,
        averageRating: book.volumeInfo.averageRating,
        ratingsCount: book.volumeInfo.ratingsCount,
      };
    });
    setBooks(loadedBooks);
  };
  const { isLoading, error, sendRequest } = useHttp(API_URL, loadData);

  useEffect(() => {
    sendRequest();
  }, []);

  return (
    <Container maxW="container.lg">
      {error && (
        <Alert status="error">
          <AlertIcon />
          {error}
          <CloseButton position="absolute" right="8px" top="8px" />
        </Alert>
      )}
      <Header />
      {isLoading && (
        <Flex align="center" justify="center" minH="calc(100vh - 400px)">
          <VscLoading className="spinner" size="35px" />
        </Flex>
      )}
      {!isLoading && !error && books.length !== 0 && <Books books={books} />}
    </Container>
  );
}

export default App;
