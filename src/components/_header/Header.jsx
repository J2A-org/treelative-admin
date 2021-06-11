import React from 'react'

import {
  Flex,
  Badge,
  Heading
} from '@chakra-ui/react'

import ProfileMenu from 'components/auth/ProfileMenu'

export default () => {
  return (
    <Flex
      as='header'
      alignItems='center'
      justifyContent='space-between'
      px='4'
      py='2'
      bg='blue.800'
    >
      <Heading as='h1' color='white'>
        Treelative
        <Badge
          fontSize='xs'
          textTransform='none'
          borderRadius='md'
          mb='6'
          ml='1'
        >
          Admin
        </Badge>
      </Heading>
      <ProfileMenu />
    </Flex>
  )
}
