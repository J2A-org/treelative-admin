import { gql } from 'urql'

export const QUERY_USER = gql`
  query QUERY_USER ($where: UserFilter $orderBy: [UserOrder!] $take: Int $skip: Int) {
    allData: queryUser (where: $where orderBy: $orderBy take: $take skip: $skip) {
      id
      shortName
      fullName
      dateOfBirth
      parents {
        id
        fullName
      }
      children {
        id
        fullName
      }
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
      shortName
      fullName
      dateOfBirth
      parents {
        id
        fullName
      }
      children {
        id
        fullName
      }
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

export const LIST_USER_AVAILABLE_PARTNERS = gql`
  query LIST_USER_AVAILABLE_PARTNERS ($userID: String! $search: String!) {
    users: getUserAvailablePartners (userID: $userID where: { fullName: { startsWith: $search mode: "insensitive" } } orderBy: { fullName: asc } take: 5) {
      id
      fullName
    }
  }
`

export const LIST_USER_AVAILABLE_CHILDREN = gql`
  query LIST_USER_AVAILABLE_CHILDREN ($userID: String! $search: String!) {
    users: getUserAvailableChildren (userID: $userID where: { fullName: { startsWith: $search mode: "insensitive" } } orderBy: { fullName: asc } take: 5) {
      id
      fullName
    }
  }
`

export const GET_USER_GENERAL = gql`
  query GET_USER_GENERAL ($filter: UserUniqueFilter!) {
    getUser (filter: $filter) {
      id
      username
      avatar
      email
      phoneNumber
      fullName
      shortName
      dateOfBirth
      dateOfDeath
      birthLocation
      currentLocation
    }
  }
`

export const GET_USER_SOCIAL = gql`
  query GET_USER_SOCIAL ($filter: UserUniqueFilter!) {
    getUser (filter: $filter) {
      id
      socialLinks {
        id
        type
        url
      }
    }
  }
`
