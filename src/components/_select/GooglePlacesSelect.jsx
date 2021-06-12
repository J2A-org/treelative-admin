import React from 'react'

import GooglePlacesAutocomplete from 'react-google-places-autocomplete'

import useStyles from './useStyles'

export default function GooglePlacesSelect (props) {
  const styles = useStyles()

  return (
    <GooglePlacesAutocomplete
      apiKey={import.meta.env.SNOWPACK_PUBLIC_GOOGLE_LOCATION_API_KEY}
      selectProps={{ ...props, styles }}
    />
  )
}
