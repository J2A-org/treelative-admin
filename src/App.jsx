import React from 'react'

import {
  Center,
  Heading
} from '@chakra-ui/react'

import Example from '@/components/Example.jsx'

export default function App () {
  return (
    <Center h='100vh' flexDirection='column'>
      <Heading as='h1' size='2xl'>Treelative Admin</Heading>
      <Example />
    </Center>
  )
}
