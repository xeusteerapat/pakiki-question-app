import React from 'react';
import {
  FormControl,
  FormLabel,
  Box,
  Input,
  Container,
  Textarea,
  Button,
  Heading,
} from '@chakra-ui/react';
import { useAuth } from '../lib/useSupabase';

const question = () => {
  return (
    <Container>
      <Box>
        <Heading>Add New Question</Heading>
        <form action=''>
          <FormControl id='title'>
            <FormLabel>Question Title</FormLabel>
            <Input type='text' />
            <FormLabel>Details</FormLabel>
            <Textarea size='lg' />
          </FormControl>
          <Button>Submit</Button>
        </form>
      </Box>
    </Container>
  );
};

export default question;
