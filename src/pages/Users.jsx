import React from 'react'

import TableWrapper from 'components/_table/TableWrapper'

import { QUERY_USER } from 'graphql/queries/users'

import fields from 'components/users/fields'

import CreateUser from 'components/users/CreateUser'

import { startCase } from 'lodash'

const buildSearch = (search, isEmbedded = false) => {
  // const isNumber = !isNaN(search)
  // const isBigInt = isNumber && search > 294967295

  const OR = []
  OR.push({ username: { contains: search, mode: 'insensitive' } })
  OR.push({ fullName: { contains: search, mode: 'insensitive' } })
  OR.push({ shortName: { contains: search, mode: 'insensitive' } })
  OR.push({ email: { contains: search, mode: 'insensitive' } })
  OR.push({ phoneNumber: { contains: search, mode: 'insensitive' } })
  OR.push({ currentLocation: { path: ['description'], string_contains: startCase(search) } })
  OR.push({ birthLocation: { path: ['description'], string_contains: startCase(search) } })
  OR.push({ deathLocation: { path: ['description'], string_contains: startCase(search) } })

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
      additionalOrderBy={[{ id: 'asc' }]}
      createComponent={CreateUser}
    />
  )
}
