import React from 'react'

import { Flex } from '@chakra-ui/react'

export default ({ children, ...rest }) => {
  return (
    <Flex
      as='td'
      borderBottom='1px solid #E2E8F0'
      alignItems='center'
      minH='8'
      maxH='12'
      px='2'
      overflowY='auto'
      {...rest}
    >
      {children}
    </Flex>
  )
}
