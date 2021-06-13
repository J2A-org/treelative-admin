import React, { useEffect, useState } from 'react'

import AsyncSelect from 'components/_select/AsyncSelect'
import CustomSelect from 'components/_select/CustomSelect'

import { useQuery } from 'urql'
import { SELECT_USER } from 'graphql/queries/users'

import Loading from 'components/_common/Loading'
import ErrorDialog from 'components/_common/ErrorDialog'

import { Text } from '@chakra-ui/react'

export default function UserSelection (props) {
  const {
    value,
    onChange,
    placeholder = 'Select a User'
  } = props

  const [search, setSearch] = useState('')

  const [result, executeQuery] = useQuery({
    query: SELECT_USER,
    variables: { search },
    pause: true
  })

  const users = result?.data?.users || []

  useEffect(() => {
    loadUsers('ja')
  }, [])

  if (result.fetching) return <Loading />

  if (result.error) return <ErrorDialog>{result.error.message}</ErrorDialog>

  const transformUsers = (user) => ({ value: user.id, label: user.fullName })

  console.log(users)
  const options = users.map(transformUsers)

  const loadUsers = async inputValue => {
    setSearch(inputValue)
    try {
      console.log('HERE')
      await executeQuery({ requestPolicy: 'network-only' })
      if (users) {
        return users.map(transformUsers)
      } else {
        return []
      }
    } catch (error) {
      console.log(error)
      return []
    }
  }

  return (
    <AsyncSelect
      placeholder={placeholder}
      value={value}
      onInputChange={onChange}
      loadOptions={loadUsers}
    />
  )
}
