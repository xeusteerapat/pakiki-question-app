import React, { useState } from 'react';
import {
  Box,
  Container,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
} from '@chakra-ui/react';
import { supabase } from '../utils/supabase';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    const { user, session, error } = await supabase.auth.signUp({
      email,
      password,
    });

    setUsername('');
    setEmail('');
    setPassword('');
  };

  return (
    <Container maxW='xl' centerContent mt={10}>
      <Heading>Sign Up to Pakiki</Heading>
      <Box minWidth='700px'>
        <form action='' onSubmit={handleSubmit}>
          <FormControl id='username' isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              type='text'
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </FormControl>
          <FormControl id='email' isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              type='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </FormControl>
          <FormControl id='password' isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </FormControl>
          <Button
            mt={4}
            colorScheme='teal'
            // isLoading={props.isSubmitting}
            type='submit'
          >
            Sign Up
          </Button>
        </form>
      </Box>
    </Container>
  );
}
