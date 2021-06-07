import React, { useState } from 'react'

import { useQuery } from '@apollo/client'

import { Text, useToast } from '@chakra-ui/react'

import AlertDialog from '@/components/_common/AlertDialog'

export default function useCustomQuery (query, opts = {}) {
  const toast = useToast()

  const handleError = error => {
    if (error.message && error.message.includes('token')) {
      toast({
        render: () => <AlertDialog status='error'><Text>Your session has expired, please login again</Text></AlertDialog>,
        position: 'top',
        duration: null,
        isClosable: false
      })
    } else {
      toast({
        render: () => <AlertDialog status='error'><Text>{error.message}</Text></AlertDialog>,
        position: 'top',
        duration: null,
        isClosable: false
      })
    }
  }

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()

  const onCompleted = (data) => {
    setLoading(false)
    opts.onCompleted && opts.onCompleted(data)
  }

  const onError = (error) => {
    const parsedError = JSON.parse(JSON.stringify(error))
    let errorData = parsedError
    setError(errorData)
    setLoading(false)
    if (!opts.onError) {
      // only show error alert if onError is not given by caller
      if (parsedError.graphQLErrors) {
        parsedError.graphQLErrors.forEach(handleError)
      }
      if (parsedError.networkError && parsedError.networkError.result) {
        errorData = parsedError.networkError.result.errors[0]
        handleError(errorData)
      }
    } else {
      opts.onError(errorData)
    }
  }

  const [isRefetching, setIsRefetching] = useState(false)
  const [isRefetchingMore, setIsFetchingMore] = useState(false)

  const response = useQuery(query, { ...opts, onError, onCompleted })

  const refetchWrapper = async (variables) => {
    setIsRefetching(true)
    try {
      const data = await response.refetch(variables)
      setIsRefetching(false)
      return data
    } catch (error) {
      setIsRefetching(false)
      onError(error)
    }
  }

  const fetchMoreWrapper = async (opts) => {
    setIsFetchingMore(true)
    try {
      const data = await response.fetchMore(opts)
      setIsFetchingMore(false)
      return data
    } catch (error) {
      setIsFetchingMore(false)
      onError(error)
    }
  }

  return {
    ...response,
    loading,
    error,
    refetch: refetchWrapper,
    isRefetching,
    fetchMore: fetchMoreWrapper,
    isRefetchingMore
  }
}
