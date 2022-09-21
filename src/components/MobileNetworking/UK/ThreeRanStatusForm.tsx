import MinorAlert from '@components/Design/MinorAlert'
import Section from '@components/Design/Section'
import Button from '@components/Inputs/Button'
import RadioButtonGroup from '@components/Inputs/RadioButtonGroup'
import TextBox from '@components/Inputs/TextBox'
import Breakpoints from '@data/breakpoints'
import { makeStyles } from '@material-ui/core'
import React, { useState } from 'react'

const useStyles = makeStyles({
  formGroup: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    [Breakpoints.upTo.bigPhone]: {
      flexDirection: 'column',

      '& > *': {
        '&:not(:first-child)': {
          marginTop: 24,
        },
      },
    },

    [Breakpoints.downTo.bigPhone]: {
      '& > *': {
        '&:not(:first-child)': {
          marginLeft: 24,
        },
      },
    },
  },
  postcode: {
    flexGrow: 1,
    maxWidth: 200,
  },
  submitButton: {
    marginTop: 24,
    margin: 'auto',
  },
  validationAlert: {
    marginTop: 24,
  },
  monospace: {
    fontFamily: `'Consolas', 'Courier New', Courier, monospace`,
    fontSize: 14,
    lineHeight: 1.25,
    padding: 32,
    background: 'white',
    cursor: 'text',
  },
})

interface IFormState {
  postcode: string
  endpoint: 'coverage' | 'outages' | 'hbb'
  errorText: string | null
}

export default function ThreeRanStatusForm() {
  const classes = useStyles()

  const [formState, setFormState] = useState<IFormState>({
    postcode: '',
    endpoint: 'coverage',
    errorText: null,
  })
  const [formLoading, setFormLoading] = useState(false)
  const [formResponse, setFormResponse] = useState<null | Record<string, unknown>>(null)

  async function handleFormSubmit() {
    setFormLoading(true)

    if (!formState.postcode.length) {
      setFormState(state => ({ ...state, errorText: 'Please enter a valid postcode' }))
      setFormLoading(false)
      return
    }

    const params = new URLSearchParams()
    params.append('postcode', formState.postcode)
    params.append('endpoint', formState.endpoint)

    let data

    try {
      const response = await fetch(`https://proxies.mastdatabase.co.uk/uk/three/ran-status?${params.toString()}`)
      data = await response.json()
    } catch (ex) {
      setFormState(state => ({ ...state, errorText: 'Failed to fetch data from the API. Please try again later.' }))
      setFormLoading(false)
      return
    }

    // Ignore content wrapper
    const apiData = data.data

    if (apiData.errors && apiData.errors.length) {
      const errorTexts = (apiData.errors as Record<string, string>[]).map(error => {
        if (!error.description) return 'Unknown error'

        if (error.query) {
          return `${error.description} (${error.query}).`
        }

        return error.description
      })

      setFormState(state => ({ ...state, errorText: errorTexts.join(' ') || 'Unknown error' }))
      setFormLoading(false)
      return
    }

    setFormResponse(apiData)
    setFormState(state => ({ ...state, errorText: null }))
    setFormLoading(false)
  }

  return (
    <>
      <Section>
        <h2 className="text-louder">Parameters</h2>
        <p className="text-speak">Please enter the postcode of the location to check, and the endpoint to access.</p>

        <div className={classes.formGroup}>
          <RadioButtonGroup
            groupLabel="API endpoint"
            value={formState.endpoint}
            options={[
              { label: 'Coverage', value: 'coverage' },
              { label: 'Outages', value: 'outages' },
              { label: 'Home broadband', value: 'hbb' },
            ]}
            onChange={s => setFormState(f => ({ ...f, endpoint: s }))}
            disabled={formLoading}
          />

          <TextBox
            className={classes.postcode}
            label="Postcode"
            value={formState.postcode}
            onInput={s => setFormState(f => ({ ...f, postcode: s.toUpperCase() }))}
            disabled={formLoading}
          />
        </div>

        <Button className={classes.submitButton} loading={formLoading} onClick={() => handleFormSubmit()}>
          Fetch data
        </Button>

        {formState.errorText && (
          <MinorAlert className={classes.validationAlert} color="primaryRed" heading="Invalid input" coloredBackground>
            {formState.errorText}
          </MinorAlert>
        )}
      </Section>

      {formResponse && (
        <Section darker width="wider">
          <h2 className="text-louder">Response</h2>

          <pre className={classes.monospace}>
            <code>{JSON.stringify(formResponse, ' ' as any, 2)}</code>
          </pre>
        </Section>
      )}
    </>
  )
}
