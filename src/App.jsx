import React from 'react'

import useRoutes from 'hooks/useRoutes'
import withLayout from 'hocs/withLayout'

import Example from 'pages/Example.jsx'
import Login from 'pages/Login.jsx'
import ResetPassword from 'pages/ResetPassword.jsx'

const routes = {
  '/': [Example, { title: 'Example' }],
  '/login': [Login, { title: 'Login', isPublic: true }],
  '/resetPassword/:userID/:hash': [ResetPassword, { title: 'Reset Password', isPublic: true }]
}

export default function App () {
  const MatchedComponent = withLayout(useRoutes(routes, '/'))

  return <MatchedComponent />
}
