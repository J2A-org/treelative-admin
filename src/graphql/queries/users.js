import { gql } from 'urql'

export const QUERY_USER = gql`
  query QUERY_USER ($where: UserFilter $orderBy: [UserOrder!] $take: Int $skip: Int) {
    allData: queryUser (where: $where orderBy: $orderBy take: $take skip: $skip) {
      id
      username
      fullName
      email
      phoneNumber
      dateOfBirth
      currentLocation
      couple {
        id
        partner {
          id
          fullName
        }
      }
    }
    filteredCount: countUser (where: $where)
    allCount: countUser
  }
`

export const LIST_USERS = gql`
  query LIST_USERS ($search: String!) {
    users: queryUser (where: { fullName: { startsWith: $search mode: "insensitive" } } orderBy: { fullName: asc } take: 5) {
      id
      fullName
    }
  }
`

export const LIST_USER_PARTNERS = gql`
  query LIST_USER_PARTNERS ($userID: String! $search: String!) {
    users: getUserAvailablePartners (userID: $userID where: { fullName: { startsWith: $search mode: "insensitive" } } orderBy: { fullName: asc } take: 5) {
      id
      fullName
    }
  }
`
