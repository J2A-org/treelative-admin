import { gql } from 'urql'

export const ADD_USER = gql`
  mutation ADD_USER ($input: AddUserInput!) {
    addUser(input: $input) {
      id
    }
  }
`

export const UPDATE_USER_USERNAME = gql`
  mutation UPDATE_USER_USERNAME ($user: UserUniqueFilter! $input: UpdateUserInput!) {
    updateUser(user: $user input: $input) {
      id
      username
    }
  }
`

export const UPDATE_USER_FULL_NAME = gql`
  mutation UPDATE_USER_FULL_NAME ($user: UserUniqueFilter! $input: UpdateUserInput!) {
    updateUser(user: $user input: $input) {
      id
      fullName
    }
  }
`

export const UPDATE_USER_EMAIL = gql`
  mutation UPDATE_USER_EMAIL ($user: UserUniqueFilter! $input: UpdateUserInput!) {
    updateUser(user: $user input: $input) {
      id
      email
    }
  }
`

export const UPDATE_USER_PHONE_NUMBER = gql`
  mutation UPDATE_USER_PHONE_NUMBER ($user: UserUniqueFilter! $input: UpdateUserInput!) {
    updateUser(user: $user input: $input) {
      id
      phoneNumber
    }
  }
`

export const UPDATE_USER_DATE_OF_BIRTH = gql`
  mutation UPDATE_USER_DATE_OF_BIRTH ($user: UserUniqueFilter! $input: UpdateUserInput!) {
    updateUser(user: $user input: $input) {
      id
      dateOfBirth
    }
  }
`

export const UPDATE_USER_CURRENT_LOCATION = gql`
  mutation UPDATE_USER_CURRENT_LOCATION ($user: UserUniqueFilter! $input: UpdateUserInput!) {
    updateUser(user: $user input: $input) {
      id
      currentLocation
    }
  }
`

export const ADD_USER_PARTNER = gql`
  mutation ADD_USER_PARTNER ($user: UserUniqueFilter! $partner: UserUniqueFilter!) {
    addUserPartner(user: $user partner: $partner) {
      id
      couple {
        id
        partner {
          id
          couple {
            id
            partner {
              id
            }
          }
        }
      }
    }
  }
`
