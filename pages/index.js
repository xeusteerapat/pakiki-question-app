import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
  Box,
  Container,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Heading,
} from '@chakra-ui/react';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);
export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    console.log('submit');

    // const { user, session, error } = await supabase.auth.signUp({
    //   email,
    //   password,
    // });

    // console.log(email);
    // console.log('user', user);
    // console.log('session', session);
    // console.log(error);
  };

  return (
    <Container maxW='xl' centerContent>
      <Heading>Welcome To Pakiki</Heading>
      <Box minWidth='700px'>
        <FormControl id='email' onSubmit={handleSubmit}>
          <FormLabel>Email address</FormLabel>
          <Input
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <FormLabel>Password</FormLabel>
          <Input
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button
            mt={4}
            colorScheme='teal'
            // isLoading={props.isSubmitting}
            type='submit'
          >
            Submit
          </Button>
        </FormControl>
      </Box>
    </Container>
  );
}
