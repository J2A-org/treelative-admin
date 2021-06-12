import React, { useState, useEffect, useMemo } from 'react'

import { useQuery } from 'urql'

import Loading from 'components/_common/Loading'
import ErrorDialog from 'components/_common/ErrorDialog'

import DataTable from 'components/_table/DataTable'

import { TAKE_LIMIT } from 'utils/table'

export default function TableWrapper (props) {
  const {
    query,
    fields,
    hideFields = [],
    rowKey,
    rowType,
    buildSearch,
    additionalWhere = {},
    defaultOrderBy = [],
    createComponent: CreateNew = null,
    isEmbedded = false
  } = props

  const [variables, setVariables] = useState({
    take: TAKE_LIMIT,
    skip: 0,
    where: additionalWhere,
    orderBy: defaultOrderBy
  })

  const [searchValue, setSearchValue] = useState('')

  const [result, refetchQuery] = useQuery({ query, variables })

  const [hasInitiallyLoaded, setHasInitiallyLoaded] = useState(false)
  const [isRefetching, setIsRefetching] = useState(false)
  const [isFiltering, setIsFiltering] = useState(false)
  const [hasMoreItems, setHasMoreItems] = useState(false)
  const [isFetchingMore, setIsFetchingMore] = useState(false)

  const [allData, setAllData] = useState(result?.data?.allData || [])

  // on initial load
  useEffect(() => {
    if (!hasInitiallyLoaded) {
      if (!result.fetching && result?.data?.allData) {
        setAllData(result.data.allData)
        setHasMoreItems(result.data.allData.length >= TAKE_LIMIT)
        setHasInitiallyLoaded(true)
      }
    }
  }, [result.fetching, hasInitiallyLoaded])

  // on load more
  useEffect(() => {
    if (hasInitiallyLoaded) {
      if (!result.fetching && isFetchingMore && result?.data?.allData) {
        setAllData([...allData, ...result.data.allData])
        setHasMoreItems(result.data.allData.length >= TAKE_LIMIT)
        setIsFetchingMore(false)
      }
    }
  }, [result.fetching, hasInitiallyLoaded])

  // on refetch
  useEffect(() => {
    if (hasInitiallyLoaded) {
      if (!result.fetching && isRefetching && result?.data?.allData) {
        setAllData([...allData.slice(0, allData.length - result.data.allData.length), ...result.data.allData])
        setIsRefetching(false)
      }
    }
  }, [result.fetching, hasInitiallyLoaded])

  // on filter
  useEffect(() => {
    if (hasInitiallyLoaded) {
      if (!result.fetching && isFiltering && result?.data?.allData) {
        setAllData(result.data.allData)
        setHasMoreItems(result.data.allData.length >= TAKE_LIMIT)
        setIsRefetching(false)
      }
    }
  }, [result.fetching, hasInitiallyLoaded])

  const handleRefetch = () => {
    setIsRefetching(true)
    refetchQuery({ requestPolicy: 'network-only' })
  }

  const handleSearch = (fuzzySearch) => {
    setIsFiltering(true)
    if (fuzzySearch) {
      setVariables({
        ...variables,
        where: {
          ...additionalWhere,
          OR: buildSearch(fuzzySearch)
        },
        skip: 0
      })
    } else {
      handleRefetch()
    }
  }

  const handleOrderBy = (orderBy) => {
    setIsFiltering(true)
    if (orderBy) {
      setVariables({
        ...variables,
        orderBy,
        skip: 0
      })
    } else {
      setVariables({
        ...variables,
        orderBy: defaultOrderBy,
        skip: 0
      })
    }
  }

  const handleFetchMore = () => {
    setIsFetchingMore(true)
    setVariables({
      ...variables,
      skip: allData.length
    })
  }

  const CreateNewComponent = CreateNew ? useMemo(() => <CreateNew {...props} />, []) : null

  if (result.error) return <ErrorDialog>{result.error.message}</ErrorDialog>

  if (!hasInitiallyLoaded) return <Loading />

  const filteredCount = result?.data?.filteredCount || 0
  const totalCount = result?.data?.allCount || 0

  return (
    <DataTable
      rows={allData}
      fields={fields}
      hideFields={hideFields}
      rowKey={rowKey}
      rowType={rowType}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      handleSearch={handleSearch}
      refetch={handleRefetch}
      isRefetching={isRefetching}
      hasMoreItems={hasMoreItems}
      fetchMore={handleFetchMore}
      isFetchingMore={isFetchingMore}
      orderBy={variables.orderBy}
      handleOrderBy={handleOrderBy}
      createComponent={CreateNewComponent}
      isEmbedded={isEmbedded}
      filteredCount={filteredCount}
      totalCount={totalCount}
    />
  )
}
