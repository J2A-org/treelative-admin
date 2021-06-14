import React, { useState } from 'react'

import AsyncSelect from 'components/_select/AsyncSelect'

import { useQuery, useClient } from 'urql'
import { LIST_USERS } from 'graphql/queries/users'

import { Stack } from '@chakra-ui/react'
import ErrorAlert from 'components/_common/ErrorAlert'

export default function UserSelection (props) {
  const client = useClient()

  const {
    query = LIST_USERS,
    variables = {},
    placeholder = 'Select a User',
    value: defaultValue,
    ...rest
  } = props

  const [error, setError] = useState()

  const [result] = useQuery({
    query,
    variables: { ...variables, search: '' }
  })

  const users = result?.data?.users || []

  const transformUsers = (user) => ({ value: user.id, label: user.fullName })

  const loadUsers = async search => {
    try {
      const result = await client.query(query, { ...variables, search }).toPromise()
      if (result.data) {
        return result?.data?.users.map(transformUsers)
      } else {
        if (result.error) {
          setError(result.error)
        }
        return []
      }
    } catch (error) {
      setError(error)
    }
  }

  return (
    <Stack spacing='4'>
      {error && <ErrorAlert> {error.message} </ErrorAlert>}
      <AsyncSelect
        {...rest}
        options={users.map(transformUsers)}
        defaultValue={defaultValue}
        placeholder={placeholder}
        loadOptions={loadUsers}
      />
    </Stack>

  )
}
