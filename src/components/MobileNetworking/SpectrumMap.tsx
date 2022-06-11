import React, { useRef, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import Colors from '@data/colors.json'
import Breakpoints from '@data/breakpoints'
import { arfcnToFreq } from '@functions/ArfcnConversion'
import { nanoid } from 'nanoid'

export interface IColorPair {
  back: string
  front: string
}

export interface ISpectrumAllocation {
  owner: string
  ownerLongName?: string
  /**
   * Override the default color provided by the `owner`.
   */
  colorOverride?: IColorPair
  details?: string | string[]
  /**
   * Start of allocation in MHz.
   */
  freqStart: number
  /**
   * End of allocation in MHz.
   */
  freqEnd: number
  type: 'fddUp' | 'fddDown' | 'tdd' | 'sdl' | 'sul' | 'unused' | 'unknown'
  /**
   * The other piece of spectrum which this is paired with.
   */
  pairedWith?: {
    /**
     * Start of allocation in MHz.
     */
    freqStart: number
    /**
     * End of allocation in MHz.
     */
    freqEnd: number
    type: 'fddUp' | 'fddDown' | 'tdd' | 'sdl' | 'sul' | 'unused' | 'unknown'
  }

  arfcns?: string | number[]
  uarfcns?: number[]
  earfcns?: number[]
  nrarfcns?: number[]
}

interface IHighlightedSpectrumARFCN {
  rat: 'nr' | 'lte' | 'umts' | 'gsm'
  startArfcn: number
  endArfcn: number
}

interface IHighlightedSpectrumFrequency {
  startFreq: number
  endFreq: number
}

export type HighlightedSpectrum = IHighlightedSpectrumARFCN | IHighlightedSpectrumFrequency
export interface ISpectrumMapProps {
  caption?: string
  note?: string
  data: ISpectrumAllocation[]
  spectrumHighlight?: HighlightedSpectrum[]
}

export interface ISpectrumMapItemProps {
  allocation: ISpectrumAllocation
  isSelected: boolean
  onClick: (allocation: ISpectrumAllocation) => void
  descId: string
}

export interface ISpectrumMapDetailsProps {
  allocation: ISpectrumAllocation
}

export const OwnerColorMap: Record<string, IColorPair> = {
  O2: {
    back: '#000066',
    front: '#fff',
  },
  Vodafone: {
    back: '#e60000',
    front: '#fff',
  },
  VF: {
    back: '#e60000',
    front: '#fff',
  },
  EE: {
    back: '#007b85',
    front: '#fff',
  },
  Three: {
    back: '#ff7c69',
    front: '#000',
  },
  '3': {
    back: '#ff7c69',
    front: '#000',
  },
  '3 DK': {
    back: '#f37423',
    front: '#000',
  },
  TT: {
    back: '#663989',
    front: '#fff',
  },
  TDC: {
    back: '#006cb7',
    front: '#fff',
  },
  Cibicom: {
    back: '#1abbec',
    front: '#000',
  },
  Telekom: {
    back: '#e2007a',
    front: '#fff',
  },
  '1&1': {
    back: '#174195',
    front: '#fff',
  },
}

function round(num: number): number {
  return Math.round(num * 100) / 100
}

function getSpectrumTypeDescription(type: ISpectrumAllocation['type']): string {
  return {
    fddUp: 'FDD uplink',
    fddDown: 'FDD downlink',
    tdd: 'TDD uplink and downlink',
    unknown: 'Unknown',
    unused: 'Unused',
    sdl: 'Supplemental downlink',
    sul: 'Supplemental uplink',
  }[type]
}

function getOwnerColor(owner: string): IColorPair {
  return (
    OwnerColorMap[owner] || {
      back: '#ddd',
      front: '#000',
    }
  )
}

/**
 * Visualisation accuracy in Hertz.
 */
const HERTZ_ACCURACY = 10_000

const useSpectrumMapStyles = makeStyles({
  root: {
    border: '2px solid #000',
    marginTop: '1em',
    marginBottom: '1em',
  },
  container: {
    padding: 16,
  },
  map: {
    marginTop: 12,
    padding: 4,
    display: 'grid',
    gridTemplateColumns: 'repeat(var(--sections), minmax(min-content, 1fr))',
    minWidth: '100%',
    overflowX: 'auto',
    justifyItems: 'stretch',
  },
  spectrumInfo: {
    marginTop: 12,
  },
  footer: {
    borderTop: `2px solid ${Colors.neutralGrey}`,
    padding: '8px 16px',
    '& p': {
      marginBottom: '0 !important',
    },
  },
  scale: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  note: {
    marginTop: 8,
  },
  smallDeviceNote: {
    [Breakpoints.downTo.tablet]: {
      display: 'none',
    },
  },
  spectrumHighlight: {
    marginTop: 8,
    height: 6,
    background: Colors.primaryRed,
    gridColumn: 'var(--start-col) / span var(--span-col)',
    position: 'relative',
  },
})

const useSpectrumMapItemStyles = makeStyles({
  itemRoot: {
    // reset
    appearance: 'none',
    background: 'none',
    border: 'none',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    display: 'inline',
    margin: 0,
    position: 'relative',

    '&:not(:focus-visible)': {
      outline: `2px solid #000`,
      outlineOffset: -1,
    },

    cursor: 'pointer',
    backgroundColor: 'var(--owner-color)',
    color: 'var(--owner-color-front)',
    padding: 4,
    height: '100%',
    gridColumn: 'span var(--bandwidth)',

    '&:focus-visible': {
      '&': {
        outline: '5px auto -webkit-focus-ring-color',
      },
      outline: '5px auto Highlight',
    },

    '&[data-selected=true]': {
      outlineColor: Colors.excessiveYellow,
      zIndex: 10,

      '&:not(:focus-visible)': {
        outlineWidth: 4,
      },
    },

    '&:focus-visible ': {
      zIndex: 11,
    },

    '& p': {
      margin: '0 !important',
    },
  },
})

const useSpectrumMapDetailsStyles = makeStyles({
  detailsRoot: {
    '& dt': {
      fontWeight: 'bold',
    },
    '& dd:not(:last-child)': {
      marginBottom: 6,
    },
    '& dd p': {
      marginBottom: 2,
      '&:last-child': {
        marginBottom: 0,
      },
    },
  },
})

export function SpectrumMap({ caption, data, note, spectrumHighlight }: ISpectrumMapProps) {
  const classes = useSpectrumMapStyles()
  const {
    current: { descId },
  } = useRef({ descId: nanoid() })

  const minMhz = Math.min(...data.map(a => a.freqStart))
  const maxMhz = Math.max(...data.map(a => a.freqEnd))
  const gridColumns = Math.floor(((maxMhz - minMhz) * 100_000) / HERTZ_ACCURACY)

  const sortedData = data.sort((a, b) => a.freqStart - b.freqStart)

  const [selectedSpectrumBlock, setSelectedSpectrumBlock] = useState<ISpectrumAllocation>(null)

  const isSpectrumHighlighted = !!spectrumHighlight && Array.isArray(spectrumHighlight)
  const highlightedFrequencies: IHighlightedSpectrumFrequency[] = !isSpectrumHighlighted
    ? undefined
    : spectrumHighlight.map(r => {
        if ('startFreq' in r && 'endFreq' in r) {
          return {
            startFreq: r.startFreq,
            endFreq: r.endFreq,
          }
        } else {
          // Need to convert from ARFCN
          return {
            startFreq: arfcnToFreq(r.rat, r.startArfcn, 'dl'),
            endFreq: arfcnToFreq(r.rat, r.endArfcn, 'dl'),
          }
        }
      })

  const appropriateHighlightedFrequencies = highlightedFrequencies
    ?.filter(r => r.startFreq <= maxMhz && r.endFreq >= minMhz)
    .map(r => {
      r.startFreq = Math.max(r.startFreq, minMhz)
      r.endFreq = Math.min(r.endFreq, maxMhz)

      return r
    })

  return (
    <figure className={classes.root} style={{ '--sections': gridColumns } as any}>
      <div className={classes.container}>
        {caption && <figcaption className="text-loud text-center">{caption}</figcaption>}

        <div className={classes.map}>
          {sortedData.map(allocation => (
            <SpectrumMapItem
              key={`${allocation.owner}__${allocation.freqStart}`}
              isSelected={allocation === selectedSpectrumBlock}
              allocation={allocation}
              onClick={() => setSelectedSpectrumBlock(allocation)}
              descId={descId}
            />
          ))}
          {isSpectrumHighlighted &&
            appropriateHighlightedFrequencies.map((r, i) => {
              const startColumn = Math.floor(((r.startFreq - minMhz) * 100_000) / HERTZ_ACCURACY)
              const columnCount = Math.floor(((r.endFreq - r.startFreq) * 100_000) / HERTZ_ACCURACY)

              return (
                <div
                  key={`${r.startFreq}_${r.endFreq}_${i}`}
                  className={classes.spectrumHighlight}
                  aria-label={`Highlighted: ${formatFrequency(r.startFreq)} to ${formatFrequency(r.endFreq)}`}
                  style={
                    {
                      '--start-col': Math.max(startColumn + 1, 1),
                      '--span-col': Math.max(columnCount, 1),
                    } as any
                  }
                />
              )
            })}
        </div>

        <div className={classes.scale}>
          <span className="text-whisper">{formatFrequency(minMhz)}</span>
          <span className="text-whisper">{formatFrequency(maxMhz)}</span>
        </div>

        <div aria-live="polite" id={descId} className={classes.spectrumInfo}>
          {selectedSpectrumBlock !== null && <SpectrumMapDetails allocation={selectedSpectrumBlock} />}
        </div>
      </div>

      <footer className={clsx(classes.footer, 'softer-bg')}>
        <p className="text-whisper-up">
          Click on a spectrum block to view more information about it.{' '}
          <span className={classes.smallDeviceNote}>On smaller devices, blocks above may not be shown to scale.</span>
        </p>
        {note && <p className={clsx('text-whisper-up', classes.note)}>{note}</p>}
      </footer>
    </figure>
  )
}

function SpectrumMapItem({ allocation, onClick, isSelected, descId }: ISpectrumMapItemProps) {
  const classes = useSpectrumMapItemStyles()
  const { owner, details, freqStart, freqEnd, type, pairedWith } = allocation
  const color = allocation.colorOverride || getOwnerColor(owner)

  const bandwidthMhz = freqEnd - freqStart
  const columnCount = Math.floor((bandwidthMhz * 100_000) / HERTZ_ACCURACY)

  return (
    <button
      data-selected={isSelected}
      aria-describedby={isSelected ? descId : undefined}
      onClick={() => onClick(allocation)}
      className={classes.itemRoot}
      style={
        {
          '--owner-color': color.back,
          '--owner-color-front': color.front,
          '--bandwidth': columnCount,
        } as any
      }
    >
      <p className="text-center">{owner}</p>
      <p className="text-center text-whisper">{formatFrequency(bandwidthMhz)}</p>
      <p className="sr-only">Click for more spectrum info</p>
    </button>
  )
}

function formatFrequency(freq: number, hideUnits: boolean = false) {
  if (freq >= 10_000) {
    return `${round(freq) / 1000}` + (hideUnits ? '' : ' GHz')
  }

  return `${round(freq)}` + (hideUnits ? '' : ' MHz')
}

function SpectrumMapDetails({ allocation }: ISpectrumMapDetailsProps) {
  const classes = useSpectrumMapDetailsStyles()
  const { owner, ownerLongName, details, freqStart, freqEnd, type, pairedWith, arfcns, uarfcns, earfcns, nrarfcns } = allocation

  const usageInfo: Record<string, number[] | string> = {}
  arfcns && (usageInfo['2G GSM'] = arfcns)
  uarfcns && (usageInfo['3G UMTS'] = uarfcns)
  earfcns && (usageInfo['4G LTE'] = earfcns)
  nrarfcns && (usageInfo['5G NR'] = nrarfcns)

  return (
    <dl className={classes.detailsRoot}>
      <dt>Operated by:</dt>
      <dd>{ownerLongName || owner}</dd>

      <dt>Bandwidth:</dt>
      <dd>
        {formatFrequency(freqEnd - freqStart)} ({formatFrequency(freqStart, true)} &ndash; {formatFrequency(freqEnd)})
      </dd>

      <dt>Spectrum type:</dt>
      <dd>
        {getSpectrumTypeDescription(type)}
        {pairedWith && (
          <>
            , paired with {formatFrequency(pairedWith.freqStart, true)} &ndash; {formatFrequency(pairedWith.freqEnd)} of{' '}
            {getSpectrumTypeDescription(pairedWith.type)}
          </>
        )}
      </dd>

      {(arfcns || uarfcns || earfcns || nrarfcns) && Object.keys(usageInfo).length !== 0 && (
        <>
          <dt>Used for:</dt>
          <dd>
            {Object.entries(usageInfo).map(([tech, arfcns]) => (
              <p className="text-speak" key={tech}>
                <strong>{tech}: </strong>
                {arfcns.length ? (
                  typeof arfcns === 'string' ? (
                    arfcns
                  ) : (
                    <>
                      {arfcnLabel(tech, arfcns.length !== 1)} {arfcns.join(', ')}
                    </>
                  )
                ) : (
                  'various/unconfirmed'
                )}
              </p>
            ))}
          </dd>
        </>
      )}

      {details && (
        <>
          <dt>Details:</dt>
          <dd>{Array.isArray(details) ? details.map(detail => <p key={detail}>{detail}</p>) : details}</dd>
        </>
      )}
    </dl>
  )
}

function arfcnLabel(rat: string, plural: boolean) {
  return (
    (() => {
      switch (rat) {
        case '2G GSM':
          return 'ARFCN'
        case '3G UMTS':
          return 'UARFCN'
        case '4G LTE':
          return 'EARFCN'
        case '5G NR':
          return 'NRARFCN'
      }
    })() + (plural ? 's' : '')
  )
}
