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
      px='1'
      py='1'
      bg='blue.800'
    >
      <Heading
        as='h1'
        color='white'
        pl='4'
        fontSize='32'
        textTransform='uppercase'
        letterSpacing='1px'
      >
        Treelative
        <Badge
          fontSize='xs'
          textTransform='none'
          borderRadius='md'
          mb='6'
          ml='1'
        >
          ADMIN
        </Badge>
      </Heading>
      <ProfileMenu />
    </Flex>
  )
}
