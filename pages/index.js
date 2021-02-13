import React, { useState } from 'react';
import NextLink from 'next/link';
import {
  Box,
  Container,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Heading,
  Flex,
  Center,
} from '@chakra-ui/react';
import { supabase } from '../utils/supabase';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();

    await supabase.auth.signIn({ email, password });

    setEmail('');
    setPassword('');

    router.push('/profile');
  };

  return (
    <Container maxW='xl' centerContent mt={10}>
      <Heading>Welcome To Pakiki</Heading>
      <Box minWidth='700px'>
        <form action='' onSubmit={handleSubmit}>
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
          <Flex alignItems='center' justifyContent='center'>
            <Box>
              <Button mt={4} colorScheme='teal' type='submit'>
                Login
              </Button>
            </Box>
            <Box mt={4} ml={2} mr={2}>
              or
            </Box>
            <Box>
              <NextLink href='/signup'>
                <Button mt={4} colorScheme='blue'>
                  SignUp
                </Button>
              </NextLink>
            </Box>
          </Flex>
        </form>
      </Box>
    </Container>
  );
}
