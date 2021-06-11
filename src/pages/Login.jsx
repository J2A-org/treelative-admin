import React from 'react'

import {
  Stack,
  Heading
} from '@chakra-ui/react'

import LoginBox from 'components/auth/LoginBox'

export default function Login () {
  return (
    <Stack
      h='100vh'
      spacing='8'
      direction='column'
      alignItems='center'
      justifyContent='center'
    >
      <Heading>Treelative Admin</Heading>
      <LoginBox />
    </Stack>

  )
}
