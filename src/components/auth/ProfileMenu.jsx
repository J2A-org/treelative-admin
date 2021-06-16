import React, { useState } from 'react'

import useAuthUser from 'hooks/useAuthUser'

import useDevice from 'hooks/useDevice'

import {
  Text,
  Flex,
  Button,
  Avatar
} from '@chakra-ui/react'

import ViewMyProfile from 'components/auth/ViewMyProfile'

export default function ProfileMenu () {
  const { isDesktop, responsive } = useDevice()

  const authUser = useAuthUser()

  const [viewProfile, setViewProfile] = useState(false)

  return (
    <>
      {viewProfile && <ViewMyProfile user={authUser} onClose={() => setViewProfile(false)} />}
      <Button
        color='white'
        variant='header'
        borderRadius='md'
        size='lg'
        px='2'
        onClick={() => setViewProfile(true)}
      >
        <Flex alignItems='center'>
          {isDesktop && <Text fontSize='sm' fontWeight='semibold' mr='2'>{authUser.fullName}</Text>}
          <Avatar
            src={authUser.avatar}
            name={authUser.fullName}
            size={responsive(['md', 'sm'])}
            bg='blue.500'
          />
        </Flex>
      </Button>
    </>
  )
}
