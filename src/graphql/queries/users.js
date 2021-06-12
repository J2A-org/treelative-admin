import { gql } from 'urql'

export const QUERY_USER = gql`
  query QUERY_USER ($where: UserFilter $orderBy: [UserOrder!] $take: Int $skip: Int) {
    allData: queryUser (where: $where orderBy: $orderBy take: $take skip: $skip) {
      id
      username
      fullName
      email
      role
      createdAt
      updatedAt
    }
    filteredCount: countUser (where: $where)
    allCount: countUser
  }
`
