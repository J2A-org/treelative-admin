import React, { useState, useMemo } from 'react'

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

  const [skip, setSkip] = useState(0)
  const [where, setWhere] = useState(additionalWhere)
  const [orderBy, setOrderBy] = useState([...defaultOrderBy, ...additionalOrderBy])

  const [searchValue, setSearchValue] = useState('')

  const [result, refetchQuery] = useQuery({
    query,
    variables: {
      skip,
      take: TAKE_LIMIT,
      where,
      orderBy
    },
    requestPolicy: 'cache-and-network'
  })

  const handleRefetch = () => {
    refetchQuery({ requestPolicy: 'network-only' })
  }

  const handleSearch = (fuzzySearch) => {
    setSkip(0)
    if (fuzzySearch) {
      setWhere({
        ...additionalWhere,
        OR: buildSearch(fuzzySearch)
      })
    } else {
      setWhere(additionalWhere)
    }
  }

  const handleOrderBy = (orderBy) => {
    setSkip(0)
    if (orderBy) {
      setOrderBy([
        ...orderBy,
        ...additionalOrderBy
      ])
    } else {
      setOrderBy(additionalOrderBy)
    }
  }

  const handleFetchMore = () => {
    setSkip(result.data.allData.length)
  }

  const CreateNewComponent = CreateNew ? useMemo(() => <CreateNew {...props} refetch={handleRefetch} />, [result?.data?.allData?.length]) : null

  if (result.error) return <ErrorDialog>{result.error.message}</ErrorDialog>

  if (result.fetching && !result?.data?.allData) return <Loading />

  return (
    <DataTable
      rows={result?.data?.allData}
      fields={fields}
      hideFields={hideFields}
      rowKey={rowKey}
      rowType={rowType}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      handleSearch={handleSearch}
      refetch={handleRefetch}
      fetchMore={handleFetchMore}
      hasMoreItems={result?.data?.filteredCount !== result?.data?.allData?.length}
      isRefetching={result.fetching}
      isFetchingMore={result.fetching}
      isFiltering={result.fetching}
      orderBy={orderBy}
      handleOrderBy={handleOrderBy}
      createComponent={CreateNewComponent}
      isEmbedded={isEmbedded}
      filteredCount={result?.data?.filteredCount}
      totalCount={result?.data?.allCount}
    />
  )
}
