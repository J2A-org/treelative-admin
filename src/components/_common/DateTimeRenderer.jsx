import React from 'react'

import { Text } from '@chakra-ui/react'

import { format } from 'date-fns'

export default function DateTimeRenderer ({ value, type = 'time', ...props }) {
  return (
    <Text {...props}>
      {value ? (type === 'time' ? format(new Date(value), 'PPPp') : format(new Date(value), 'PPP')) : '-'}
    </Text>
  )
}
