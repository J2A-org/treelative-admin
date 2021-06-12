import React from 'react'

import { Text } from '@chakra-ui/react'

const Example = () => <Text> sds </Text>

const fields = [
  { key: 'view', width: '40px', renderTD: Example },
  { key: 'username', label: 'Username', canSort: true, width: '250px', renderTD: Example },
  { key: 'fullName', label: 'Full Name', canSort: true, width: '150px', renderTD: Example },
  { key: 'email', label: 'Email', canSort: true, width: '150px', renderTD: Example },
  { key: 'role', label: 'Role', canSort: true, width: '120px', renderTD: Example },
  { key: 'createdAt', label: 'Created At', canSort: true, renderTD: Example },
  { key: 'updatedAt', label: 'Updated At', canSort: true, renderTD: Example }

]

export default fields
