import React from "react";

import { Box, Image, HStack, VStack } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import styles from "./Book.module.css";

// TODO add book details
function Book({ book }) {
  return (
    <Box w="310px" className={styles.book} borderWidth="1px" borderRadius="lg">
      <VStack justify="space-between" align="flex-start" h="100%">
        <Box w="100%">
          <Image src={book.thumbnail} width="70%" mx="auto" pt="4" />
          <Box px="4" pt="8" pb="0" color="orange">
            {book.title}
          </Box>
          <Box px="4" pb="4">
            {book.subtitle}
          </Box>
          <Box px="4" pb="4">
            {`${book.description?.substring(0, 150)}...`}
          </Box>
        </Box>
        <HStack px="4" pb="4" spacing="5px">
          {Array(5)
            .fill("")
            .map((_, i) => {
              return (
                <StarIcon
                  key={i}
                  color={i < book.averageRating ? "teal.500" : "gray.300"}
                />
              );
            })}
        </HStack>
      </VStack>
    </Box>
  );
}

export default Book;
