import React, { useId, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import Colors from '@data/colors.json'
import Breakpoints from '@data/breakpoints'
import { arfcnToFrequency, formatFrequency } from 'mobile-spectrum-data/utils'
import { getOperatorColor } from 'mobile-spectrum-data/OperatorInfo'
import fontColorContrast from 'font-color-contrast'
import Link from '@components/Links/Link'
import { NoSsr } from '@material-ui/core'

import type { SpectrumBlock } from 'mobile-spectrum-data/@types'

export interface IColorPair {
  back: string
  front: string
}

export type ISpectrumAllocation = SpectrumBlock & {
  /**
   * Override the default color provided by the `owner`.
   */
  colorOverride?: IColorPair
}

interface IHighlightedSpectrumARFCN {
  rat: 'nr' | 'lte' | 'umts' | 'gsm'
  startArfcn: number
  endArfcn: number
}

interface IHighlightedSpectrumFrequency {
  startFreq: number | null
  endFreq: number | null
}

export type HighlightedSpectrum = IHighlightedSpectrumARFCN | IHighlightedSpectrumFrequency
export interface ISpectrumMapProps {
  dense?: boolean
  hideDetails?: boolean
  caption?: string
  note?: string
  data: SpectrumBlock[]
  spectrumHighlight?: HighlightedSpectrum[]
  countryCode?: string
  className?: string
  customColors?: Record<string, string[]>
}

export interface ISpectrumMapItemProps {
  unclickable?: boolean
  allocation: SpectrumBlock
  isSelected: boolean
  onClick: (allocation: SpectrumBlock) => void
  descId: string
  countryCode?: string
  customColors?: Record<string, string[]>
}

export interface ISpectrumMapDetailsProps {
  allocation: SpectrumBlock
}

function getSpectrumTypeDescription(type: ISpectrumAllocation['type'] | 'fddUp'): string {
  return {
    fddUp: 'FDD uplink',
    fddDown: 'FDD downlink',
    tdd: 'TDD uplink and downlink',
    unknown: 'Unknown',
    generic: 'Generic spectrum',
    genericPaired: 'Generic spectrum',
    unused: 'Unused',
    sdl: 'Supplemental downlink',
    sul: 'Supplemental uplink',
  }[type]
}

/**
 * Visualisation accuracy in Hertz.
 */
const HERTZ_ACCURACY = 10_000

const useSpectrumMapStyles = makeStyles({
  dense: {
    whiteSpace: 'nowrap',
  },
  root: {
    border: '2px solid #000',
    marginTop: '1em',
    marginBottom: '1em',
    '&$dense': {
      border: 'none',
    },
  },
  container: {
    padding: 16,
    '$dense &': {
      padding: 0,
    },
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
    marginTop: 4,
    gridRow: '3 / span 1',
    gridColumn: '1 / var(--sections)',
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
    '&[role=figure]': {
      cursor: 'default',
    },
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
    wordBreak: 'break-word',
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

export function SpectrumMap({
  dense = false,
  hideDetails = false,
  caption,
  data,
  note,
  spectrumHighlight,
  countryCode,
  className,
  customColors,
}: ISpectrumMapProps) {
  const classes = useSpectrumMapStyles()

  const descId = useId()

  const minMhz = Math.min(...data.map(a => a.startFreq))
  const maxMhz = Math.max(...data.map(a => a.endFreq))
  const gridColumns = Math.round(((maxMhz - minMhz) * 100_000) / HERTZ_ACCURACY)

  const sortedData = data.sort((a, b) => a.startFreq - b.startFreq)

  const [selectedSpectrumBlock, setSelectedSpectrumBlock] = useState<SpectrumBlock | null>(null)

  const isSpectrumHighlighted = !!spectrumHighlight && Array.isArray(spectrumHighlight)
  const highlightedFrequencies: IHighlightedSpectrumFrequency[] | undefined = !isSpectrumHighlighted
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
            startFreq: arfcnToFrequency(r.rat as 'lte', r.startArfcn),
            endFreq: arfcnToFrequency(r.rat as 'lte', r.endArfcn),
          }
        }
      })

  const appropriateHighlightedFrequencies = highlightedFrequencies
    ?.filter(r => {
      if (r.startFreq === null || r.endFreq === null) return false

      return r.startFreq <= maxMhz && r.endFreq >= minMhz
    })
    .map(r => {
      r.startFreq = Math.max(r.startFreq!, minMhz)
      r.endFreq = Math.min(r.endFreq!, maxMhz)

      return r
    })

  return (
    <figure className={clsx(classes.root, className, { [classes.dense]: dense })} style={{ '--sections': gridColumns } as any}>
      <div className={classes.container}>
        {caption && <figcaption className="text-loud text-center">{caption}</figcaption>}

        <div className={classes.map}>
          {sortedData.map(allocation => (
            <SpectrumMapItem
              unclickable={hideDetails}
              key={`${allocation.owner}__${allocation.startFreq}`}
              isSelected={allocation === selectedSpectrumBlock}
              allocation={allocation}
              onClick={() => setSelectedSpectrumBlock(allocation)}
              descId={descId}
              countryCode={countryCode}
              customColors={customColors}
            />
          ))}
          {!hideDetails &&
            isSpectrumHighlighted &&
            appropriateHighlightedFrequencies!.map((r, i) => {
              if (r.startFreq === null || r.endFreq === null) return null

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

          <div className={classes.scale}>
            <span className="text-whisper">{formatFrequency(minMhz)}</span>
            <span className="text-whisper">{formatFrequency(maxMhz)}</span>
          </div>
        </div>

        {!hideDetails && (
          <NoSsr>
            <div aria-live="polite" id={descId} className={classes.spectrumInfo}>
              {!!selectedSpectrumBlock && <SpectrumMapDetails allocation={selectedSpectrumBlock} />}
            </div>
          </NoSsr>
        )}
      </div>

      {(!hideDetails || note) && (
        <footer className={clsx(classes.footer, 'softer-bg')}>
          {!hideDetails && (
            <p className="text-whisper-up">
              Click on a spectrum block to view more information about it.{' '}
              <span className={classes.smallDeviceNote}>On smaller devices, blocks above may not be shown to scale.</span>
            </p>
          )}
          {note && <p className={clsx('text-whisper-up', classes.note)}>{note}</p>}
        </footer>
      )}
    </figure>
  )
}

function getColour(countryCode: string | undefined, { owner, ownerLongName }: ISpectrumAllocation, customColors?: Record<string, string[]>) {
  // Support custom colors
  if (customColors) {
    const found = Object.entries(customColors).find(([key, value]) => value.includes(ownerLongName ?? owner))

    if (found) {
      return found[0]
    }
  }

  const color = getOperatorColor(countryCode ?? 'I_DO_NOT_EXIST', ownerLongName ?? owner)

  if (color === '#dddddd' && ownerLongName) {
    return getOperatorColor(countryCode ?? 'I_DO_NOT_EXIST', owner)
  }

  return color
}

function SpectrumMapItem({ unclickable = false, allocation, onClick, isSelected, descId, countryCode, customColors }: ISpectrumMapItemProps) {
  const classes = useSpectrumMapItemStyles()
  const { owner, startFreq, endFreq } = allocation
  const color = getColour(countryCode, allocation, customColors)

  const bandwidthMhz = endFreq - startFreq
  const columnCount = Math.round((bandwidthMhz * 100_000) / HERTZ_ACCURACY)

  return (
    <button
      role={unclickable ? 'figure' : undefined}
      aria-checked={unclickable ? undefined : isSelected}
      data-selected={unclickable ? false : isSelected}
      aria-describedby={!unclickable && isSelected ? descId : undefined}
      onClick={unclickable ? undefined : () => onClick(allocation)}
      className={classes.itemRoot}
      style={
        {
          '--owner-color': color,
          '--owner-color-front': fontColorContrast(color, 0.6),
          '--bandwidth': columnCount,
        } as any
      }
    >
      <p className="text-center">{owner}</p>
      <p className="text-center text-whisper">{formatFrequency(bandwidthMhz)}</p>
      {!unclickable && <p className="sr-only">Click for more spectrum info</p>}
    </button>
  )
}

function SpectrumMapDetails({ allocation }: ISpectrumMapDetailsProps) {
  const classes = useSpectrumMapDetailsStyles()
  const { owner, ownerLongName, details, startFreq, endFreq, type, arfcns, uarfcns, earfcns, nrarfcns, sourceInfo } = allocation

  const usageInfo: Record<string, string | (string | number)[]> = {}
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
        {formatFrequency(endFreq - startFreq)} ({formatFrequency(startFreq, true)} &ndash; {formatFrequency(endFreq)})
      </dd>

      <dt>Spectrum type:</dt>
      <dd>
        {getSpectrumTypeDescription(type)}
        {'pairedWith' in allocation && (
          <>
            , paired with {formatFrequency(allocation.pairedWith.startFreq, true)} &ndash; {formatFrequency(allocation.pairedWith.endFreq)} of{' '}
            {getSpectrumTypeDescription(allocation.pairedWith.type)}
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

      {sourceInfo && (
        <>
          <dt>Data source:</dt>
          <dd>
            {sourceInfo.type === 'url' ? (
              <Link href={sourceInfo.url}>{sourceInfo.url}</Link>
            ) : (
              <p className="text-speak">{sourceInfo.details}</p>
            )}
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
