import React from 'react'

import TableWrapper from 'components/_table/TableWrapper'

import { QUERY_USER } from 'graphql/queries/users'

import fields from 'components/users/fields'

const buildSearch = (search, isEmbedded = false) => {
  // const isNumber = !isNaN(search)
  // const isBigInt = isNumber && search > 294967295

  const OR = []
  OR.push({ email: { contains: search, mode: 'insensitive' } })
  OR.push({ fullName: { contains: search, mode: 'insensitive' } })
  if (['ADMIN', 'USER'].includes(search.toUpperCase())) OR.push({ role: { equals: search.toUpperCase() } })

  return OR
}

export default function Users () {
  return (
    <TableWrapper
      query={QUERY_USER}
      fields={fields}
      rowKey='id'
      rowType='user'
      buildSearch={buildSearch}
      defaultOrderBy={[{ fullName: 'asc' }]}
      // createComponent={CreateUser}
      // selectionVar={selectedUsersVar}
    />
  )
}
