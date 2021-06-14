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
    additionalOrderBy = [],
    createComponent: CreateNew = null,
    isEmbedded = false
  } = props

  const [variables, setVariables] = useState({
    take: TAKE_LIMIT,
    skip: 0,
    where: additionalWhere,
    orderBy: [...defaultOrderBy, ...additionalOrderBy]
  })

  const [searchValue, setSearchValue] = useState('')

  const [result, refetchQuery] = useQuery({ query, variables, requestPolicy: 'cache-and-network' })

  const [hasInitiallyLoaded, setHasInitiallyLoaded] = useState(false)
  const [isRefetching, setIsRefetching] = useState(false)
  const [isFiltering, setIsFiltering] = useState(false)
  const [hasMoreItems, setHasMoreItems] = useState(false)
  const [isFetchingMore, setIsFetchingMore] = useState(false)

  const [allData, setAllData] = useState([])
  const [filteredCount, setFilteredCount] = useState(0)
  const [totalCount, setTotalCount] = useState(0)

  const turnOffAllLoading = () => {
    setIsFetchingMore(false)
    setIsRefetching(false)
    setIsFiltering(false)
  }

  // on initial load
  useEffect(() => {
    if (!hasInitiallyLoaded) {
      if (!result.fetching && result?.data?.allData) {
        setAllData(result.data.allData)
        setHasMoreItems(result.data.allData.length >= TAKE_LIMIT)
        setFilteredCount(result?.data?.filteredCount)
        setTotalCount(result?.data?.allCount)
        setHasInitiallyLoaded(true)
      }
    }
  }, [result.data, hasInitiallyLoaded])

  // on cache changes
  useEffect(() => {
    if (hasInitiallyLoaded) {
      if (!result.fetching && result?.data?.allData) {
        setAllData(result.data.allData)
        setHasMoreItems(result.data.allData.length >= TAKE_LIMIT)
        setFilteredCount(result?.data?.filteredCount)
        setTotalCount(result?.data?.allCount)
      }
    }
  }, [result.data, hasInitiallyLoaded])

  // on load more
  useEffect(() => {
    if (hasInitiallyLoaded) {
      if (!result.fetching && isFetchingMore && result?.data?.allData) {
        setAllData([...allData, ...result.data.allData])
        setHasMoreItems(result.data.allData.length >= TAKE_LIMIT)
        turnOffAllLoading()
      }
    }
  }, [result, hasInitiallyLoaded])

  // on refetch
  useEffect(() => {
    if (hasInitiallyLoaded) {
      if (!result.fetching && isRefetching && result?.data?.allData) {
        // setAllData([...allData.slice(0, allData.length - result.data.allData.length), ...result.data.allData])
        setAllData(result?.data?.allData)
        setHasMoreItems(result.data.allData.length >= TAKE_LIMIT)
        setFilteredCount(result?.data?.filteredCount)
        setTotalCount(result?.data?.allCount)
        turnOffAllLoading()
      }
    }
  }, [result, hasInitiallyLoaded])

  // on filter
  useEffect(() => {
    if (hasInitiallyLoaded) {
      if (!result.fetching && isFiltering && result?.data?.allData) {
        setAllData(result.data.allData)
        setHasMoreItems(result.data.allData.length >= TAKE_LIMIT)
        turnOffAllLoading()
      }
    }
  }, [result, hasInitiallyLoaded])

  const handleRefetch = () => {
    setIsRefetching(true)
    return refetchQuery({ requestPolicy: 'network-only' })
  }

  const handleSearch = (fuzzySearch) => {
    if (fuzzySearch) {
      setIsFiltering(true)
      setVariables({
        ...variables,
        where: {
          ...additionalWhere,
          OR: buildSearch(fuzzySearch)
        },
        skip: 0
      })
    } else {
      setVariables({
        ...variables,
        where: additionalWhere,
        skip: 0
      })
    }
  }

  const handleOrderBy = (orderBy) => {
    setIsFiltering(true)
    if (orderBy) {
      setVariables({
        ...variables,
        orderBy: [
          ...orderBy,
          ...additionalOrderBy
        ],
        skip: 0
      })
    } else {
      setVariables({
        ...variables,
        orderBy: additionalOrderBy,
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

  const CreateNewComponent = CreateNew ? useMemo(() => <CreateNew {...props} refetch={handleRefetch} />, [allData.length]) : null

  if (result.error) return <ErrorDialog>{result.error.message}</ErrorDialog>

  if (!hasInitiallyLoaded) return <Loading />

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
      fetchMore={handleFetchMore}
      hasMoreItems={hasMoreItems}
      isRefetching={isRefetching}
      isFetchingMore={isFetchingMore}
      isFiltering={isFiltering}
      orderBy={variables.orderBy}
      handleOrderBy={handleOrderBy}
      createComponent={CreateNewComponent}
      isEmbedded={isEmbedded}
      filteredCount={filteredCount}
      totalCount={totalCount}
    />
  )
}
