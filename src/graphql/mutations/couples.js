import { gql } from 'urql'

export const ADD_COUPLE = gql`
  mutation ADD_COUPLE ($input: AddCoupleInput!) {
    addCouple(input: $input) {
      id
      userOne {
        id
        couple {
          id
          partner {
            id
          }
        }
      }
      userTwo {
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
`

export const DELETE_COUPLE = gql`
  mutation DELETE_COUPLE ($coupleID: String!) {
    deleteCouple(coupleID: $coupleID) {
      id
      userOne {
        id
        couple {
          id
        }
      }
      userTwo {
        id
        couple {
          id
        }
      }
    }
  }
`
