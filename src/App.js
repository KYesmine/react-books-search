import { useState, useEffect, useReducer } from "react";
import {
  Alert,
  AlertIcon,
  Button,
  CloseButton,
  Container,
  Flex,
  Heading,
  HStack,
  Text,
} from "@chakra-ui/react";
import Books from "./components/Books/Books";
import Header from "./components/Header/Header";
import { VscLoading } from "react-icons/vsc";

import useHttp from "./hooks/use-http";
import paginationReducer from "./reducers/pagination/reducer";
import { ACTIONS } from "./reducers/pagination/actions";

import "./App.css";

const getAPI = (startedIndex, query = "") => {
  return `https://www.googleapis.com/books/v1/volumes?q=${query}&printType=books&startIndex=${startedIndex}&maxResults=40`;
};

const init = {
  startedIndex: 0,
  pageUrl: getAPI(0),
  isNext: true,
  isPrevious: false,
};

function App() {
  // TODO Build add to my favorite
  const [books, setBooks] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [state, dispatch] = useReducer(paginationReducer, init);
  const [query, setQuery] = useState("");

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
    if (totalItems === 0) setTotalItems(data.totalItems);
  };
  const { isLoading, error, sendRequest } = useHttp(
    getAPI(state.startedIndex, query),
    loadData
  );

  const { pageUrl } = state;
  useEffect(() => {
    if (query !== "") sendRequest();
  }, [pageUrl, query]);

  const nextPageHandler = () => {
    dispatch({ type: ACTIONS.NEXT_PAGE, getAPI, totalItems: totalItems });
  };

  const previousPageHandler = () => {
    dispatch({ type: ACTIONS.PREVIOUS_PAGE, getAPI });
  };

  const searchBookHandler = (query) => {
    setQuery(query);
  };

  return (
    <>
      <Header query={query} onSearch={searchBookHandler} />
      <Container maxW="container.lg">
        {error && (
          <Alert status="error">
            <AlertIcon />
            {error}
            <CloseButton position="absolute" right="8px" top="8px" />
          </Alert>
        )}
        <Heading as="h2" pb="1em" mt=".8em">
          Results
        </Heading>
        {books.length !== 0 && (
          <HStack justify="space-between" mb="2em">
            <Button
              colorScheme="teal"
              disabled={!state.isPrevious}
              onClick={previousPageHandler}
              variant="outline"
            >
              Previous
            </Button>
            <Button
              colorScheme="teal"
              disabled={!state.isNext}
              onClick={nextPageHandler}
              variant="outline"
            >
              Next
            </Button>
          </HStack>
        )}
        {isLoading && !error && (
          <Flex align="center" justify="center" minH="calc(100vh - 400px)">
            <VscLoading className="spinner" size="35px" />
          </Flex>
        )}
        {!isLoading && !error && books.length !== 0 && <Books books={books} />}
        {!isLoading && !error && (books.length === 0 || query === "") && (
          <Text>Search for books...</Text>
        )}
      </Container>
    </>
  );
}

export default App;
