import React, { forwardRef } from 'react'

import AsyncSelect from 'react-select/async'

import useStyles from './useStyles'

const CustomSelect = forwardRef((props, ref) => {
  const styles = useStyles()

  return (
    <AsyncSelect
      ref={ref}
      styles={styles}
      maxMenuHeight='200px'
      {...props}
    />
  )
})

export default CustomSelect
