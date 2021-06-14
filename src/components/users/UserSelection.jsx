import React, { useEffect, useState } from 'react'

import AsyncSelect from 'components/_select/AsyncSelect'

import { useQuery } from 'urql'
import { SELECT_USER } from 'graphql/queries/users'

import { Stack } from '@chakra-ui/react'
import ErrorAlert from 'components/_common/ErrorAlert'

export default function UserSelection (props) {
  const {
    value,
    onChange,
    placeholder = 'Select a User'
  } = props

  const [search, setSearch] = useState('')

  const [result] = useQuery({
    query: SELECT_USER,
    variables: { search }
  })

  const users = result?.data?.users || []

  useEffect(() => {
    loadUsers('ja')
  }, [])

  const transformUsers = (user) => ({ value: user.id, label: user.fullName })

  const options = users.map(transformUsers)

  const loadUsers = async search => {
    setSearch(search)
    return new Promise(resolve => {
      setTimeout(() => {
        if (users) {
          resolve(users.map(transformUsers))
        } else {
          resolve([])
        }
      }, 1000)
    })
  }

  return (
    <Stack spacing='4'>
      {result.error && <ErrorAlert> {result.error.message} </ErrorAlert>}
      <AsyncSelect
        placeholder={placeholder}
        value={value}
        options={options}
        onChange={onChange}
        loadOptions={loadUsers}
      />
    </Stack>

  )
}
