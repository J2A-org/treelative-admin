import React from 'react'

import {
  Center,
  Heading
} from '@chakra-ui/react'

import Example from '@/components/Example.jsx'

export default function App () {
  return (
    <Center h='100vh' flexDirection='column'>
      <Heading size='2xl'>Treelative Admin</Heading>
      <Example />
    </Center>
  )
}
