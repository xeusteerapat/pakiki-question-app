import React from 'react';
import { Button, Flex, Box } from '@chakra-ui/react';
import NextLink from 'next/link';
import styled from '@emotion/styled';

import { supabase } from '../utils/supabase';

import useSWR from 'swr';

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

const Profile = () => {
  const session = supabase.auth.session();

  const { data, error } = useSWR(
    session ? ['/api/getUser', session.access_token] : null,
    fetchUser
  );

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
          {!data && <p>loading...</p>}
          {data && (
            <NextLink href='/blog' passHref>
              <Button as='a' variant='ghost' p={[1, 2, 4]}>
                {data.email}
              </Button>
            </NextLink>
          )}
        </Box>
      </StickyNav>
    </>
  );
};

export default Profile;
