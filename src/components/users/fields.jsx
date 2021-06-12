import React from 'react'

import { Text } from '@chakra-ui/react'

const Example = () => <Text> sds </Text>

const fields = [
  { key: 'view', width: '40px', renderTD: Example },
  { key: 'username', label: 'Username', width: '250px', renderTD: Example },
  { key: 'fullName', label: 'Full Name', width: '150px', renderTD: Example },
  { key: 'email', label: 'Email', width: '150px', renderTD: Example },
  { key: 'role', label: 'Role', width: '120px', renderTD: Example },
  { key: 'createdAt', label: 'Created At ', renderTD: Example },
  { key: 'updatedAt', label: 'Updated At', renderTD: Example }

]

export default fields
