import React from 'react'

import useDevice from 'hooks/useDevice'

import {
  Flex,
  Stack,
  Badge,
  Heading
} from '@chakra-ui/react'

import ProfileMenu from 'components/auth/ProfileMenu'
import Logout from 'components/auth/Logout'

export default () => {
  const { responsive } = useDevice()

  return (
    <Flex
      as='header'
      alignItems='center'
      justifyContent='space-between'
      px='1'
      py={responsive(['2', '1'])}
      bg='blue.800'
    >
      <Heading
        as='h1'
        color='white'
        pl='4'
        fontSize={responsive(['24', '32'])}
        textTransform='uppercase'
        letterSpacing='1px'
      >
        Treelative
        <Badge
          fontSize='xs'
          textTransform='none'
          borderRadius='md'
          mb={responsive(['4', '6'])}
          ml='1'
        >
          ADMIN
        </Badge>
      </Heading>
      <Stack direction='row' alignItems='center' spacing={responsive(['2', '4'])} pr='4'>
        <ProfileMenu />
        <Logout />
      </Stack>
    </Flex>
  )
}
