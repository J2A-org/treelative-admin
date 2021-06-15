import React from 'react'

import OpenUser from 'components/users/view/OpenUser'

import EditUserUsername from 'components/users/edit/EditUserUsername'
import EditUserShortName from 'components/users/edit/EditUserShortName'
import EditUserFullName from 'components/users/edit/EditUserFullName'
import EditUserDateOfBirth from 'components/users/edit/EditUserDateOfBirth'

import EditUserParents from 'components/users/edit/EditUserParents'
import EditUserChildren from 'components/users/edit/EditUserChildren'
import EditUserPartner from 'components/users/edit/EditUserPartner'
import ViewUserFamily from 'components/users/view/ViewUserFamily'

const fields = [
  {
    key: 'view',
    width: '60px',
    forwardRefetch: true,
    renderTD: (props) => <OpenUser {...props} self />
  },
  {
    key: 'username',
    label: 'Username',
    canSort: true,
    width: '150px',
    renderTD: EditUserUsername
  },
  {
    key: 'shortName',
    label: 'Short Name',
    canSort: true,
    width: '150px',
    renderTD: EditUserShortName
  },
  {
    key: 'fullName',
    label: 'Full Name',
    canSort: true,
    width: '270px',
    renderTD: EditUserFullName
  },
  {
    key: 'dateOfBirth',
    label: 'Date of Birth',
    canSort: true,
    width: '200px',
    renderTD: EditUserDateOfBirth
  },
  {
    key: 'parents',
    label: 'Parents',
    forwardRefetch: true,
    justifyContent: 'center',
    renderTD: EditUserParents
  },
  {
    key: 'children',
    label: 'Children',
    forwardRefetch: true,
    justifyContent: 'center',
    renderTD: EditUserChildren
  },
  {
    key: 'partner',
    label: 'Partner',
    forwardRefetch: true,
    justifyContent: 'center',
    renderTD: EditUserPartner
  },
  {
    key: 'family',
    label: 'Family',
    justifyContent: 'center',
    renderTD: ViewUserFamily
  }
]

export default fields
