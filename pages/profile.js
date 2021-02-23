import React, { useEffect, useState } from 'react';
import { Button, Flex, Box, Heading, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import styled from '@emotion/styled';
import useSWR from 'swr';

import { supabase } from '../utils/supabase';
import { useRouter } from 'next/router';

const StickyNav = styled(Flex)`
  position: sticky;
  z-index: 10;
  top: 0;
  backdrop-filter: saturate(180%) blur(20px);
  transition: height 0.5s, line-height 0.5s;
`;

const fetchUser = (url, token) =>
  fetch(url, {
    method: 'GET',
    headers: new Headers({ 'Content-Type': 'application/json', token }),
    credentials: 'same-origin',
  }).then(res => res.json());

export default function Profile() {
  const session = supabase.auth.session();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState({});

  const { data, error } = useSWR(
    session ? ['/api/getUser', session.access_token] : null,
    fetchUser
  );

  useEffect(async () => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .match({ email: session.user.email });

    const [currentUser] = data;
    setCurrentUser(currentUser);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();

    if (error) {
      return error;
    } else {
      router.push('/');
    }
  };

  return (
    <>
      <StickyNav
        flexDirection='row'
        justifyContent='space-between'
        alignItems='center'
        maxWidth='800px'
        minWidth='356px'
        width='100%'
        as='nav'
        px={[2, 6, 6]}
        py={2}
        mt={8}
        mb={[0, 0, 8]}
        mx='auto'
      >
        <Box>
          <NextLink href='/' passHref>
            <Button as='a' variant='ghost' p={[1, 2, 4]}>
              Home
            </Button>
          </NextLink>
          {error && <p>error fetch user</p>}
          {!data && (
            <Button as='a' variant='ghost' p={[1, 2, 4]} isLoading>
              Loading
            </Button>
          )}
          {data && (
            <Button variant='ghost' p={[1, 2, 4]}>
              {data.email}
            </Button>
          )}
          <Button variant='ghost' p={[1, 2, 4]} onClick={handleLogout}>
            Log Out
          </Button>
        </Box>
      </StickyNav>
      <Box
        flexDirection='row'
        justifyContent='space-between'
        alignItems='center'
        maxWidth='800px'
        minWidth='356px'
        width='100%'
        px={[2, 6, 6]}
        py={2}
        mt={8}
        mb={[0, 0, 8]}
        mx='auto'
      >
        <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
          <Box m='5' as='a' href='/blog-post-thing'>
            <Heading m='5' mb='0' as='h4' size='md'>
              Blog Post by {currentUser.fullname}
            </Heading>
            <Text m='5' mt='0'>
              My cool blog post
            </Text>
          </Box>
        </Box>
      </Box>
    </>
  );
}
