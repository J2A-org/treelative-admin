import React from 'react'

import useRoutes from 'hooks/useRoutes'
import withLayout from 'hocs/withLayout'

import Example from 'pages/Example.jsx'
import Users from 'pages/Users.jsx'

import Login from 'pages/Login.jsx'
import ResetPassword from 'pages/ResetPassword.jsx'

const routes = {
  '/': [Users, { title: 'Treelative Admin', isAdminOnly: true }],
  '/login': [Login, { title: 'Login', isPublic: true }],
  '/resetPassword/:hash': [ResetPassword, { title: 'Reset Password', isPublic: true }]
}

export default function App () {
  const MatchedComponent = withLayout(useRoutes(routes, '/'))

  return <MatchedComponent />
}
