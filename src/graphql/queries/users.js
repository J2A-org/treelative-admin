import { gql } from 'urql'

export const QUERY_USER = gql`
  query QUERY_USER ($where: UserFilter $orderBy: [UserOrder!] $take: Int $skip: Int) {
    allData: queryUser (where: $where orderBy: $orderBy take: $take skip: $skip) {
      id
      username
      fullName
      dateOfBirth
      currentLocation
      couple {
        id
        dateOfMarriage
        marriageLocation
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

export const GET_USER_FAMILY = gql`
  query GET_USER_FAMILY ($userID: String!) {
    allData: getUserFamily (userID: $userID) {
      id
      username
      fullName
      dateOfBirth
      currentLocation
      couple {
        id
        dateOfMarriage
        marriageLocation
        partner {
          id
          fullName
        }
      }
    }
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
