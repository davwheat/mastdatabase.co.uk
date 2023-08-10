import React, { useState } from 'react'

import Section from '@components/Design/Section'
import TextBox from '@components/Inputs/TextBox'
import LoadingSpinner from '@components/LoadingSpinner'
import Button from '@components/Inputs/Button'

import type { Map } from 'leaflet'
import MinorAlert from '@components/Design/MinorAlert'
import { makeStyles } from '@material-ui/core'
import useIsFirstRender from '@hooks/useIsFirstRender'

export interface PostcodeSearchProps {
  map: Map | null
}

const useStyles = makeStyles({
  input: {
    display: 'block',
    maxWidth: 300,
  },
  button: {
    marginTop: 16,
  },
  error: {
    marginTop: 16,
  },
})

export default function PostcodeSearch({ map }: PostcodeSearchProps) {
  const classes = useStyles()
  const [postcodeInput, setPostcodeInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSearch() {
    setLoading(true)
    setError(null)

    const response = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(postcodeInput)}`)

    if (!response.ok) {
      // Error
      try {
        const json = await response.json()

        if ('error' in json && typeof json.error === 'string') {
          setError(json.error)
        } else {
          setError('An unknown error occurred while looking up this postcode. Please get in touch if you keep seeing this.')
        }
      } catch (ex) {
        setError('An unknown error occurred while looking up this postcode. Please get in touch if you keep seeing this.')
      }
    } else {
      try {
        const json = await response.json()

        setPostcodeInput(json.result.postcode)

        if (map) {
          map.setView([json.result.latitude, json.result.longitude], 14, {
            animate: true,
          })
        } else {
          setError('An error occurred while looking up this postcode: invalid map instance.')
        }
      } catch (ex) {
        setError('An unknown error occurred while looking up this postcode. Please get in touch if you keep seeing this.')
      }
    }

    setLoading(false)
  }

  return (
    <Section>
      <TextBox
        label="Jump to postcode"
        helpText="Search for any UK postcode to centre the map on it"
        className={classes.input}
        onInput={val => setPostcodeInput(val)}
        value={postcodeInput}
        placeholder="SW1A 1AA"
        disabled={loading}
        endAdornment={!loading ? undefined : <LoadingSpinner size="1.25em" />}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            handleSearch()
          }
        }}
      />

      {error && (
        <MinorAlert role="status" aria-live="assertive" color="primaryRed" coloredBackground heading="Error" className={classes.error}>
          {error}
        </MinorAlert>
      )}

      <Button className={classes.button} aria-live="polite" disabled={loading} onClick={handleSearch}>
        {loading ? 'Searching...' : 'Search'}
      </Button>
    </Section>
  )
}
