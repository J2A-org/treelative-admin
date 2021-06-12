import React from 'react'

import useDevice from 'hooks/useDevice'

import FuzzySearch from './FuzzySearch'

import TableDataCell from './TableDataCell'
import TableHeaderCell from './TableHeaderCell'

import {
  TAKE_LIMIT,
  generateGridTemplateColumns
} from 'utils/table'

import {
  Box,
  Text,
  Flex,
  Grid,
  Alert,
  Stack,
  Button,
  AlertIcon
} from '@chakra-ui/react'

export default function DataTable (props) {
  const { responsive } = useDevice()

  const {
    rows,
    fields,
    hideFields = [],
    rowKey,
    rowType,
    searchValue = '',
    setSearchValue,
    handleSearch,
    refetch,
    isRefetching,
    hasMoreItems,
    fetchMore,
    isFetchingMore,
    orderBy = [],
    handleOrderBy,
    createComponent: CreateRecord,
    isEmbedded,
    filteredCount,
    totalCount
  } = props

  const filteredFields = hideFields.length > 0 ? fields.filter(({ key }) => !hideFields.includes(key)) : fields

  return (
    <Box overflow='hidden' width='100%' height='100%'>
      {(refetch || CreateRecord) && (
        <Flex
          justifyContent='space-between'
          alignItems='center'
          height={responsive(['75x', '45px'])}
          px={responsive(['0', '4'])}
          mb={responsive(['2', '4'])}
          direction={responsive(['column', 'row'])}
        >
          {CreateRecord && CreateRecord}
          <Flex flex='1' mx={responsive(['1', '8'])} mt={responsive(['2', '0'])}>
            <FuzzySearch
              value={searchValue}
              setSearchValue={setSearchValue}
              handleSearch={handleSearch}
              refetch={refetch}
              isRefetching={isRefetching}
            />
          </Flex>
        </Flex>
      )}
      <Box height={responsive(['calc(100% - 205px)', 'calc(100% - 150px)'])} overflow='auto'>
        <Grid as='table' gridTemplateColumns={generateGridTemplateColumns(filteredFields)}>
          <Box as='thead' display='contents'>
            <Box as='tr' display='contents'>
              {filteredFields.map(({ key, label, canSort, justifyContent = 'left' }, idx) => (
                <TableHeaderCell
                  key={key}
                  field={key}
                  fontSize='xs'
                  justifyContent={justifyContent}
                  isLeftEdge={idx === 0}
                  isRightEdge={idx === filteredFields.length - 1}
                  canSort={canSort}
                  orderBy={orderBy}
                  handleOrderBy={handleOrderBy}
                >
                  {label}
                </TableHeaderCell>
              ))}
            </Box>
          </Box>
          <Box as='tbody' my='20px' display='contents'>
            {rows.map(row => (
              <Box key={row[rowKey]} as='tr' display='contents'>
                {filteredFields.map(({ key: columnKey, renderTD: RenderTD, justifyContent = 'left', ...rest }) => {
                  const cellProps = { ...rest, [rowType]: row, justifyContent }
                  return (
                    <TableDataCell key={`${rowKey}-${columnKey}`} justifyContent={justifyContent} fontSize='sm'>
                      <RenderTD {...cellProps} />
                    </TableDataCell>
                  )
                })}
              </Box>
            ))}
            {rows.length === 0 && (
              <Flex as='tr' display='contents'>
                <Alert as='td' gridColumn='1/-1' status='warning' justifyContent='center' borderRadius='md' my='2'>
                  <AlertIcon />
                  <Text>No Data</Text>
                </Alert>
              </Flex>
            )}
          </Box>
        </Grid>
      </Box>
      <Stack direction={responsive(['column', 'row'])} alignItems='center' mt={isEmbedded && rows.length < 10 ? '12' : '1'}>
        {totalCount > 0 && (
          <Stack justifyContent='space-evenly' direction='row' minW={responsive(['100%', '300px'])}>
            <Text fontSize='sm'>Showing: <strong>{rows.length}</strong></Text>
            <Text fontSize='sm'>Filtered: <strong>{filteredCount}</strong></Text>
            <Text fontSize='sm'>Total: <strong>{totalCount}</strong></Text>
          </Stack>
        )}
        <Button
          isFullWidth
          variant='outline'
          size='sm'
          onClick={fetchMore}
          isLoading={isFetchingMore}
          my={totalCount > 0 ? '2' : '0'}
          isDisabled={!(hasMoreItems && rows && rows.length >= TAKE_LIMIT)}
        >
          Load More
        </Button>
      </Stack>
    </Box>
  )
}
