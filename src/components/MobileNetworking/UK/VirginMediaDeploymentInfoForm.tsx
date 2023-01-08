import MinorAlert from '@components/Design/MinorAlert'
import Section from '@components/Design/Section'
import Button from '@components/Inputs/Button'
import TextBox from '@components/Inputs/TextBox'
import { makeStyles } from '@material-ui/core'
import React, { useState } from 'react'
import VirginMediaDeploymentInfo from './VirginMediaDeploymentInfo'

const useStyles = makeStyles({
  formGroup: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
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
    whiteSpace: 'break-spaces',
  },
  houseNumber: {
    width: 86,
    marginRight: 16,
  },
})

interface IFormState {
  postcode: string
  houseNumber: string
  errorText: string | null
}

export default function VirginMediaDeploymentInfoForm() {
  const classes = useStyles()

  const [formState, setFormState] = useState<IFormState>({
    postcode: '',
    houseNumber: '',
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

    const uri = new URL('https://proxies.mastdatabase.co.uk/uk/virgin-media/deployment-info')

    const params = uri.searchParams
    params.append('postcode', formState.postcode)
    params.append('houseNumber', formState.houseNumber)

    let data

    try {
      const response = await fetch(uri.toString())
      data = await response.json()

      if (!response.ok) {
        setFormState(state => ({ ...state, errorText: 'Your API request failed for some reason. Please try again later.' }))
        setFormResponse(data)
        setFormLoading(false)
        return
      }
    } catch (ex) {
      setFormState(state => ({ ...state, errorText: 'Failed to fetch data from the API. Please try again later.' }))
      setFormLoading(false)
      return
    }

    // Ignore content wrapper
    const apiData = data.data

    if (apiData && apiData.errors && apiData.errors.length) {
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
        <h2 className="text-louder">Address info</h2>
        <p className="text-speak">Please enter the house number and postcode of the location to check.</p>

        <div className={classes.formGroup}>
          <TextBox
            className={classes.houseNumber}
            label="Number"
            value={formState.houseNumber}
            onInput={s => setFormState(f => ({ ...f, houseNumber: s }))}
            disabled={formLoading}
          />

          <TextBox
            label="Postcode"
            value={formState.postcode}
            onInput={s => setFormState(f => ({ ...f, postcode: s.toUpperCase() }))}
            disabled={formLoading}
          />
        </div>

        <Button className={classes.submitButton} loading={formLoading} onClick={() => handleFormSubmit()}>
          Fetch info
        </Button>

        {formState.errorText && (
          <MinorAlert className={classes.validationAlert} color="primaryRed" heading="Invalid input" coloredBackground>
            {formState.errorText}
          </MinorAlert>
        )}
      </Section>

      <Section darker>
        <h2 className="text-louder">Virgin Media coverage</h2>

        {!formResponse && <p className="text-speak">Please enter a valid address to check.</p>}

        {formResponse && <VirginMediaDeploymentInfo data={formResponse as any} />}
      </Section>

      {formResponse && (
        <Section width="wider">
          <h2 className="text-louder">Raw JSON response</h2>

          <pre className={classes.monospace}>
            <code>{JSON.stringify(formResponse, ' ' as any, 2)}</code>
          </pre>
        </Section>
      )}
    </>
  )
}
