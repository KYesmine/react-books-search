import { useState, useEffect, useReducer } from "react";
import {
  Alert,
  AlertIcon,
  Button,
  CloseButton,
  Container,
  Flex,
  HStack,
} from "@chakra-ui/react";
import Books from "./components/Books/Books";
import Header from "./components/Header/Header";
import { VscLoading } from "react-icons/vsc";

import useHttp from "./hooks/use-http";
import paginationReducer from "./reducers/pagination/reducer";
import { ACTIONS } from "./reducers/pagination/actions";

import "./App.css";

const getAPI = (startedIndex) => {
  return `https://www.googleapis.com/books/v1/volumes?q=css&printType=books&startIndex=${startedIndex}&maxResults=12`;
};

const init = {
  startedIndex: 0,
  pageUrl: getAPI(0),
  isNext: true,
  isPrevious: false,
};

function App() {
  const [books, setBooks] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [state, dispatch] = useReducer(paginationReducer, init);

  const loadData = (data) => {
    const loadedBooks = data.items.map((book) => {
      return {
        id: book.id,
        title: book.volumeInfo.title,
        subtitle: book.volumeInfo.subtitle,
        authors: book.volumeInfo.authors,
        description: book.volumeInfo.description,
        thumbnail: book.volumeInfo.imageLinks?.thumbnail,
        pageCount: book.volumeInfo.pageCount,
        averageRating: book.volumeInfo.averageRating,
        ratingsCount: book.volumeInfo.ratingsCount,
      };
    });
    setBooks(loadedBooks);
    setTotalItems(data.totalItems);
  };
  const { isLoading, error, sendRequest } = useHttp(
    getAPI(state.startedIndex),
    loadData
  );

  const { pageUrl } = state;
  useEffect(() => {
    sendRequest();
  }, [pageUrl]);

  const nextPageHandler = () => {
    dispatch({ type: ACTIONS.NEXT_PAGE, getAPI, totalItems: totalItems });
  };
  const previousPageHandler = () => {
    dispatch({ type: ACTIONS.PREVIOUS_PAGE, getAPI });
  };

  return (
    <Container maxW="container.lg">
      <Header />
      {error && (
        <Alert status="error">
          <AlertIcon />
          {error}
          <CloseButton position="absolute" right="8px" top="8px" />
        </Alert>
      )}
      {isLoading && !error && (
        <Flex align="center" justify="center" minH="calc(100vh - 400px)">
          <VscLoading className="spinner" size="35px" />
        </Flex>
      )}
      <HStack justify="space-between">
        <Button
          colorScheme="blue"
          disabled={!state.isPrevious}
          onClick={previousPageHandler}
        >
          previous
        </Button>
        <Button
          colorScheme="blue"
          disabled={!state.isNext}
          onClick={nextPageHandler}
        >
          next
        </Button>
      </HStack>
      {!isLoading && !error && books.length !== 0 && <Books books={books} />}
    </Container>
  );
}

export default App;
