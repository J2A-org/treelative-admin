import React, { useState, useEffect } from 'react'

import client from 'graphql/client'
import { WHO_AM_I } from 'graphql/queries/auth'

import Loading from 'components/_common/Loading'
import Unauthorized from 'components/_common/Unauthorized'

import { Box } from '@chakra-ui/react'

import Header from 'components/_header/Header'

const logout = () => {
  window.localStorage.removeItem('AUTH_SESSION_ID')
  window.localStorage.setItem('REDIRECT_REFERRAL', window.location.href)
  window.location.href = '/login'
}

const withLayout = (WrappedComponent) => () => {
  const [authUser, setAuthUser] = useState()

  const {
    title = 'Treelative',
    isPublic = false,
    isAdminOnly = false
  } = WrappedComponent.props

  const [loading, setLoading] = useState(!isPublic)

  useEffect(() => {
    // set document title
    window.document.title = title
    // check for auth session if not public route
    if (!isPublic) {
      client
        .query(WHO_AM_I)
        .toPromise()
        .then(({ data, error }) => {
          setAuthUser(data.whoAmI)
          if (error) {
            logout()
          }
        })
        .catch(() => {
          logout()
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [])

  // no need to perform any additional checks for public route
  if (isPublic) {
    return WrappedComponent
  }

  // show loading while verifying auth session
  if (loading) {
    return <Loading />
  }

  if (!authUser) {
    // wait for authUser to be set in cache
    return <Loading />
  }

  // if adminOnly page, check if the auth user is an admin
  if (isAdminOnly && authUser.role !== 'ADMIN') {
    return <Unauthorized />
  }

  return (
    <Box height='100%' overflow='hidden'>
      <Header />
      <Box height='100%' as='main' p='4'>
        {WrappedComponent}
      </Box>
    </Box>
  )
}

export default withLayout
