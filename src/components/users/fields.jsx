import React from 'react'

import OpenUser from 'components/users/view/OpenUser'

import EditUserFullName from 'components/users/edit/EditUserFullName'
import EditUserEmail from 'components/users/edit/EditUserEmail'

import { Text } from '@chakra-ui/react'

const Example = () => <Text> sds </Text>

const fields = [
  { key: 'view', width: '40px', renderTD: (props) => <OpenUser {...props} self /> },
  { key: 'username', label: 'Username', canSort: true, width: '250px', renderTD: Example },
  { key: 'fullName', label: 'Full Name', canSort: true, width: '150px', renderTD: EditUserFullName },
  { key: 'email', label: 'Email', canSort: true, width: '150px', renderTD: EditUserEmail },
  { key: 'role', label: 'Role', canSort: true, width: '120px', renderTD: Example },
  { key: 'createdAt', label: 'Created At', canSort: true, renderTD: Example },
  { key: 'updatedAt', label: 'Updated At', canSort: true, renderTD: Example }

]

export default fields
