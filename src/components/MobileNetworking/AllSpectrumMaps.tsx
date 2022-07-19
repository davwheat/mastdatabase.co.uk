import React, { useRef, useState } from 'react'

import Section from '@components/Design/Section'
import { HighlightedSpectrum, SpectrumMap } from '@components/MobileNetworking/SpectrumMap'
import TextBox from '@components/Inputs/TextBox'

import Breakpoints from '@data/breakpoints'

import { makeStyles } from '@material-ui/core'
import clsx from 'clsx'
import { nanoid } from 'nanoid'
import useStateWithLocalStorage from '@hooks/useStateWithLocalStorage'
import { SpectrumData } from 'mobile-spectrum-data/@types'
import { arfcnToBandInfo, arfcnToFrequency, bandNumberToHumanName } from 'mobile-spectrum-data/utils'
import Link from '@components/Links/Link'
import generateIdSlug from '@functions/generateIdSlug'

const useStyles = makeStyles({
  heading: {
    marginTop: 28,
  },
  fieldsetsContainer: {
    marginTop: 16,
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    gap: 16,

    [Breakpoints.upTo.tablet]: {
      gridTemplateColumns: '1fr',
    },
  },
  highlightFieldset: {
    padding: '16px 24px',
    background: '#fff',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',

    '& legend': {
      // Prevent browser rendering it as a fieldset legend
      float: 'left',
      marginBottom: 12,
      fontWeight: 'bold',
    },
  },
  freqFieldset: {
    display: 'grid',
    gap: 16,
    placeContent: 'center',
    gridTemplateColumns: '1fr',

    '& > a': {
      justifySelf: 'center',
    },

    [Breakpoints.downTo.tablet]: {
      gridTemplateColumns: '1fr 1fr',
      rowGap: 4,

      '& > a': {
        gridColumn: 'span 2',
      },

      '& > label': {
        // Visually centring because actual centring looks offset
        transform: 'translateY(-4px)',
      },
    },
  },
  clearfix: {
    '&::after': {
      display: 'block',
      content: '""',
      clear: 'both',
    },
  },
  radioGroup: {
    '&:not(:last-child)': {
      marginBottom: 12,
    },
  },
  radio: {
    opacity: 0,
    position: 'absolute',

    '& + label': {
      display: 'block',
      position: 'relative',
      paddingLeft: 'var(--left-pad)',
      WebkitUserSelect: 'none',
      userSelect: 'none',

      '--left-pad': 'calc(1em + 16px)',
      '--radio-size': '1.35em',
      '--radio-border-size': '2px',
      '--radio-y-offset': '0.05em',

      '&::before, &::after': {
        content: '""',
        display: 'block',
        position: 'absolute',
        borderRadius: '50%',
        overflow: 'hidden',

        top: 'calc(50% - var(--radio-y-offset))',
        transform: 'translateY(-50%)',

        width: 'var(--size)',
        height: 'var(--size)',

        cursor: 'pointer',
      },

      '&::before': {
        '--size': 'var(--radio-size)',
        left: 0,
        background: 'white',
        border: 'var(--radio-border-size) solid black',
      },

      '&::after': {
        '--bg': 'white',
        '--x-pad': 'calc(var(--radio-border-size) + 4px)',
        '--size': 'calc(var(--radio-size) - (2 * var(--x-pad)))',
        left: 'var(--x-pad)',
        background: 'var(--bg)',
      },
    },

    '&:checked + label::after': {
      '--bg': 'black',
    },
  },
})

interface IAllSpectrumMaps {
  bandsData: SpectrumData[]
  locationName: string
}

export default function AllSpectrumMaps({ bandsData, locationName }: IAllSpectrumMaps) {
  const classes = useStyles()

  const [highlightValueType, setHighlightValueType] = useStateWithLocalStorage<'EARFCN' | 'frequency' | 'EARFCN+BW'>(
    'spectrumMapHighlightType',
    'EARFCN+BW',
  )
  const [startHighlight, setStartHighlight] = useState<{ text: string; val: number | null }>({ text: '', val: NaN })
  const [endHighlight, setEndHighlight] = useState<{ text: string; val: number | null }>({ text: '', val: NaN })
  const [highlightBandwidth, setHighlightBandwidth] = useState<{ text: string; val: number | null }>({ text: '', val: NaN })

  const { current: formIds } = useRef({
    highlightTypeArfcn: nanoid(),
    highlightTypeArfcnBw: nanoid(),
    highlightTypeFreq: nanoid(),
  })

  const isHighlightPresent = (() => {
    if (!startHighlight.val) return false

    if (['EARFCN', 'frequency'].includes(highlightValueType)) {
      if (!endHighlight.val || isNaN(startHighlight.val) || isNaN(endHighlight.val)) return false
    }

    if (highlightValueType === 'EARFCN+BW') {
      if (!highlightBandwidth.val || isNaN(startHighlight.val) || isNaN(highlightBandwidth.val)) return false
    }

    if (highlightValueType === 'EARFCN') {
      if (!arfcnToFrequency('lte', startHighlight.val)) return false
      if (!endHighlight.val || !arfcnToFrequency('lte', endHighlight.val)) return false
    }

    if (highlightValueType === 'EARFCN+BW') {
      if (!arfcnToFrequency('lte', startHighlight.val)) return false
      if (!highlightBandwidth.val || isNaN(highlightBandwidth.val)) return false
    }

    return true
  })()

  const spectrumHighlight: HighlightedSpectrum[] | undefined = ((): HighlightedSpectrum[] | undefined => {
    if (!isHighlightPresent) return undefined

    if (highlightValueType === 'EARFCN+BW') {
      const earfcnCtr = startHighlight.val

      if (isNaN(earfcnCtr!)) return undefined

      const freqCtr = arfcnToFrequency('lte', earfcnCtr!)

      if (freqCtr === null) return undefined

      return [
        {
          startFreq: freqCtr - highlightBandwidth.val! / 2,
          endFreq: freqCtr + highlightBandwidth.val! / 2,
          rat: 'lte',
        } as unknown as HighlightedSpectrum,
      ]
    }

    if (highlightValueType === 'frequency') {
      return [
        {
          startFreq: Math.min(startHighlight.val!, endHighlight.val!),
          endFreq: Math.max(startHighlight.val!, endHighlight.val!),
          rat: 'lte',
        } as unknown as HighlightedSpectrum,
      ]
    }

    return [
      {
        startArfcn: Math.min(startHighlight.val!, endHighlight.val!),
        endArfcn: Math.max(startHighlight.val!, endHighlight.val!),
        rat: 'lte',
      } as unknown as HighlightedSpectrum,
    ]
  })()

  console.log(spectrumHighlight)

  return (
    <Section width="wider">
      <h2 className="text-louder">Frequency deployment</h2>

      <Section width="full" darker>
        <h3 className="text-loud">Highlight spectrum</h3>
        <p>
          Highlight a section of spectrum with a pink line on the visualisations below using an EARFCN and bandwidth, start and end EARFCN, or
          start and end frequency.
        </p>

        <div className={classes.fieldsetsContainer}>
          <fieldset className={classes.highlightFieldset}>
            <legend>Highlight by</legend>
            <span className={classes.clearfix} />

            <div className={classes.radioGroup}>
              <input
                type="radio"
                className={classes.radio}
                name="highlight-data-type"
                id={formIds.highlightTypeArfcnBw}
                value="arfcn+bw"
                onChange={() => setHighlightValueType('EARFCN+BW')}
                checked={highlightValueType === 'EARFCN+BW'}
              />
              <label htmlFor={formIds.highlightTypeArfcnBw}>EARFCN + Bandwidth</label>
            </div>

            <div className={classes.radioGroup}>
              <input
                type="radio"
                className={classes.radio}
                name="highlight-data-type"
                id={formIds.highlightTypeArfcn}
                value="arfcn"
                onChange={() => setHighlightValueType('EARFCN')}
                checked={highlightValueType === 'EARFCN'}
              />
              <label htmlFor={formIds.highlightTypeArfcn}>Start/end EARFCN</label>
            </div>

            <div className={classes.radioGroup}>
              <input
                type="radio"
                className={classes.radio}
                name="highlight-data-type"
                id={formIds.highlightTypeFreq}
                value="frequency"
                onChange={() => setHighlightValueType('frequency')}
                checked={highlightValueType === 'frequency'}
              />
              <label htmlFor={formIds.highlightTypeFreq}>Start/end Frequency</label>
            </div>
          </fieldset>

          <fieldset className={clsx(classes.highlightFieldset, classes.freqFieldset)}>
            {highlightValueType === 'EARFCN' && (
              <>
                <TextBox
                  label="Start EARFCN"
                  onInput={v => setStartHighlight({ text: v, val: parseFloat(v) })}
                  defaultValue={startHighlight.text}
                  pattern="[0-9]*"
                  inputMode="numeric"
                />
                <TextBox
                  label="End EARFCN"
                  onInput={v => setEndHighlight({ text: v, val: parseFloat(v) })}
                  defaultValue={endHighlight.text}
                  pattern="[0-9]*"
                  inputMode="numeric"
                />
              </>
            )}
            {highlightValueType === 'frequency' && (
              <>
                <TextBox
                  label="Start frequency"
                  screenReaderLabel="Start frequency, in MHz"
                  endAdornment="MHz"
                  defaultValue={startHighlight.text}
                  onInput={v => setStartHighlight({ text: v, val: parseFloat(v) })}
                  pattern="[0-9]*"
                  inputMode="numeric"
                />
                <TextBox
                  label="End frequency"
                  screenReaderLabel="End frequency, in MHz"
                  endAdornment="MHz"
                  defaultValue={endHighlight.text}
                  onInput={v => setEndHighlight({ text: v, val: parseFloat(v) })}
                  pattern="[0-9]*"
                  inputMode="numeric"
                />
              </>
            )}
            {highlightValueType === 'EARFCN+BW' &&
              (() => {
                const band = startHighlight.val === null && arfcnToBandInfo('lte', startHighlight.val!)
                const bandName = band && bandNumberToHumanName(parseInt(band.band.substring(1)), 'lte')

                return (
                  <>
                    <TextBox
                      helpText={(() => {
                        if (startHighlight.text === '') return ''
                        if (!startHighlight.val || isNaN(startHighlight.val)) return 'Invalid EARFCN'
                        if (!band) return 'Unrecognised EARFCN'

                        return `LTE Band ${band.band} (${arfcnToFrequency('lte', startHighlight.val)} MHz)`
                      })()}
                      label="EARFCN"
                      defaultValue={startHighlight.text}
                      onInput={v => setStartHighlight({ text: v, val: parseInt(v) })}
                      pattern="[0-9]*"
                      inputMode="numeric"
                    />
                    <TextBox
                      helpText={(() => {
                        if (!isHighlightPresent) return ''

                        const earfcnCtr = startHighlight.val
                        const freqCtr = arfcnToFrequency('lte', earfcnCtr!)
                        return `${Math.max(0, freqCtr! - highlightBandwidth.val! / 2)} - ${freqCtr! + highlightBandwidth.val! / 2} MHz`
                      })()}
                      label="Bandwidth"
                      screenReaderLabel="Bandwidth, in MHz"
                      endAdornment="MHz"
                      defaultValue={highlightBandwidth.text}
                      onInput={v => setHighlightBandwidth({ text: v, val: parseFloat(v) })}
                      pattern="[0-9]*"
                      inputMode="numeric"
                    />
                    {!!(
                      band &&
                      bandsData
                        .map(b => b.names)
                        .flat()
                        .includes(band.band) &&
                      bandName
                    ) && (
                      <Link className="text-whisper-loud" href={`#${generateIdSlug(bandName)}`}>
                        Scroll to {band.band}
                      </Link>
                    )}
                  </>
                )
              })()}
          </fieldset>
        </div>
      </Section>

      {bandsData.map(bandData => {
        const bandNum = parseInt(bandData.names[0].substring(1))
        const bandHumanName = bandNumberToHumanName(bandNum, 'lte') ?? bandNumberToHumanName(bandNum, 'nr')

        return (
          <React.Fragment key={JSON.stringify(bandData.names)}>
            <h3 id={bandHumanName ? generateIdSlug(bandHumanName) : undefined} className={clsx('text-loud', classes.heading)}>
              {bandData.names.length === 1 ? 'Band' : 'Bands'} {bandData.names.join(', ')}
            </h3>

            <SpectrumMap
              data={bandData.spectrumData}
              spectrumHighlight={spectrumHighlight}
              caption={`${locationName} spectrum deployment for ${bandData.names.length === 1 ? 'Band' : 'Bands'} ${bandData.names.join(', ')}`}
            />
          </React.Fragment>
        )
      })}
    </Section>
  )
}
