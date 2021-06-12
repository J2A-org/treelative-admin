import React, { useState, useEffect } from 'react'

import { useQuery } from 'urql'

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

  const [result] = useQuery({ query: WHO_AM_I, pause: isPublic })

  useEffect(() => {
    // set document title
    window.document.title = title
  }, [])

  useEffect(() => {
    // set document title
    window.document.title = title
    // check for auth session if not public route
    if (!result.fetching) {
      if (result.error) {
        logout()
      }
      if (result.data) {
        setAuthUser(result.data.whoAmI)
      }
      setLoading(false)
    }
  }, [result])

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
