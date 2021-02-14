import React, { useState } from 'react';
import { useRouter } from 'next/router';
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
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await supabase.auth.signUp({
        email,
        password,
      });

      const newUser = await supabase
        .from('users')
        .insert([{ fullname, email, avatar: 'teerapat prommarak' }]);

      setFullname('');
      setEmail('');
      setPassword('');

      setTimeout(() => {
        router.push('/profile');
      }, 5000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxW='xl' centerContent mt={10}>
      <Heading>Sign Up to Pakiki</Heading>
      <Box minWidth='700px'>
        <form action='' onSubmit={handleSubmit}>
          <FormControl id='fullname' isRequired>
            <FormLabel>Fullname</FormLabel>
            <Input
              type='text'
              value={fullname}
              onChange={e => setFullname(e.target.value)}
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
