import React from 'react'

import {
  Alert,
  AlertIcon
} from '@chakra-ui/react'

export default function ErrorAlert ({ children }) {
  return (
    <Alert
      status='error'
      borderRadius='lg'
    >
      <AlertIcon />
      {children}
    </Alert>
  )
}
