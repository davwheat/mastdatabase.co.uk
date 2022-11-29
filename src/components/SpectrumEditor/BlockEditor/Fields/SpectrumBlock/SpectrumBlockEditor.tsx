import Button from '@components/Inputs/Button'
import SelectDropdown from '@components/Inputs/SelectDropdown'
import TextBox from '@components/Inputs/TextBox'
import { useParsedSpectrumState } from '@components/SpectrumEditor/useParsedSpectrumState'
import { useSetSpectrumBlockState } from '@components/SpectrumEditor/useSetSpectrumBlockState'
import { makeStyles } from '@material-ui/core'
import clsx from 'clsx'
import PlusIcon from 'mdi-react/PlusBoldIcon'
import { SourceType, SpectrumBlock } from 'mobile-spectrum-data/@types'
import React, { useState } from 'react'
import TrashIcon from 'mdi-react/TrashOutlineIcon'

import { useSectionStyles } from '../SpectrumMetadataEditor'
import SpectrumBlockARFCNEditor from './SpectrumBlockARFCNEditor'

function isValidFloat(value: string) {
  return !isNaN(Number(value))
}

const useStyles = makeStyles({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },

  headerDeleteSplit: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 24,

    '& h3': {
      margin: 0,
    },

    '& button': {
      marginLeft: 'auto',
      padding: '6px 12px',
    },
  },

  pairedItems: {
    display: 'grid',
    gap: 16,
    gridTemplateColumns: '1fr 1fr',
    justifyItems: 'stretch',
  },

  pairedItemsOffset: {
    gridTemplateColumns: '1fr 3fr',
  },

  detailTextbox: {
    display: 'flex',
    gap: 16,
    alignItems: 'baseline',

    '& + &': {
      marginTop: 8,
    },

    '& .textbox-label': {
      minWidth: '80px',
    },

    '& .textbox-wrapper': {
      margin: 0,
      flexGrow: 1,
    },

    '& .textbox-endAppendix': {
      display: 'block',
      paddingRight: 0,
      alignSelf: 'stretch',
    },
  },

  textboxRemoveButton: {
    padding: 0,
    height: '100%',
    width: 48,
    justifyContent: 'center',
  },

  addDetailButton: {
    marginTop: 16,
  },
})

interface ISpectrumBlockEditorProps {
  dataIndex: number
  blockIndex: number
}

export default function SpectrumBlockEditor({ dataIndex, blockIndex }: ISpectrumBlockEditorProps) {
  const sectClasses = useSectionStyles()
  const classes = useStyles()
  const blockData = useParsedSpectrumState()![dataIndex].spectrumData[blockIndex]
  const setSpectrumBlockState = useSetSpectrumBlockState(dataIndex, blockIndex)

  const [freqInputsState, setFreqInputsState] = useState({
    startDl: blockData.startFreq.toString(),
    endDl: blockData.endFreq.toString(),

    // @ts-expect-error
    startUl: blockData.pairedWith?.startFreq.toString() || '0',
    // @ts-expect-error
    endUl: blockData.pairedWith?.endFreq.toString() || '0',
  })

  const details = typeof blockData.details === 'string' ? [blockData.details] : blockData.details

  return (
    <div className={sectClasses.whiteSection}>
      <div className={classes.headerDeleteSplit}>
        <h5 className="text-loud">
          Block {blockIndex + 1} of {useParsedSpectrumState()![dataIndex].spectrumData.length}
        </h5>
        <Button
          icon={<TrashIcon />}
          variant="danger"
          onClick={() => {
            if (confirm('You will lose all information about this spectrum block. Are you sure you want to delete this block?')) {
              setSpectrumBlockState(null)
            }
          }}
        >
          Delete block
        </Button>
      </div>

      <div className={classes.form}>
        <TextBox
          label="Spectrum owner"
          value={blockData.owner}
          onInput={val => {
            setSpectrumBlockState(blockData => {
              return { ...blockData, owner: val }
            })
          }}
        />

        <TextBox
          label="Spectrum owner (long name)"
          helpText="If provided, this appears when clicking on a block to view full details."
          value={blockData.ownerLongName}
          onInput={val => {
            setSpectrumBlockState(blockData => {
              const newState: SpectrumBlock = { ...blockData, ownerLongName: val }

              if (!val) delete newState.ownerLongName

              return newState
            })
          }}
        />

        <SelectDropdown
          label="Spectrum type"
          helpText="This determines other options that are available for this block"
          options={[
            { label: 'FDD', value: 'fddDown' },
            { label: 'TDD', value: 'tdd' },
            { label: 'SDL', value: 'sdl' },
            { label: 'Generic (paired)', value: 'genericPaired' },
            { label: 'Generic (unpaired)', value: 'generic' },
          ]}
          value={blockData.type}
          onChange={val => {
            setSpectrumBlockState(blockData => {
              const newState: SpectrumBlock = { ...blockData, type: val as SpectrumBlock['type'] } as SpectrumBlock

              switch (newState.type) {
                case 'fddDown':
                  newState.pairedWith ||= {
                    type: 'fddUp',
                    startFreq: 0,
                    endFreq: 0,
                  }
                  break

                case 'genericPaired':
                  newState.pairedWith ||= {
                    type: 'genericPaired',
                    startFreq: 0,
                    endFreq: 0,
                  }
                  break

                case 'tdd':
                case 'sdl':
                case 'generic':
                default:
                  // @ts-expect-error
                  delete newState.pairedWith
                  break
              }

              return newState
            })
          }}
        />

        <div className={clsx(classes.pairedItems, classes.pairedItemsOffset)}>
          <SelectDropdown
            label="Source type"
            helpText="The type of source you got the spectrum data from"
            options={[
              { label: 'None', value: 'none' },
              { label: 'Website', value: 'url' },
              { label: 'Other', value: 'other' },
            ]}
            value={blockData.sourceInfo?.type ?? 'none'}
            onChange={val => {
              setSpectrumBlockState(blockData => {
                const newSourceInfo = {
                  type: val as 'url' | 'other' | 'none',
                } as SourceType | { type: 'none' }

                const newState: SpectrumBlock = { ...blockData, sourceInfo: newSourceInfo } as SpectrumBlock

                switch (newSourceInfo.type) {
                  case 'url':
                    // @ts-expect-error
                    newSourceInfo.url = blockData.sourceInfo?.url || blockData.sourceInfo?.details || ''
                    break

                  case 'other':
                    // @ts-expect-error
                    newSourceInfo.details = blockData.sourceInfo?.details || blockData.sourceInfo?.url || ''
                    break

                  case 'none':
                  default:
                    delete newState.sourceInfo
                    break
                }

                return newState
              })
            }}
          />

          <TextBox
            label={blockData.sourceInfo?.type === 'url' ? 'Source URL' : 'Source description'}
            helpText="The URL or a description of the source of the spectrum data"
            disabled={!blockData.sourceInfo}
            value={blockData.sourceInfo ? (blockData.sourceInfo?.type === 'url' ? blockData.sourceInfo.url : blockData.sourceInfo?.details) : ''}
            onInput={val => {
              setSpectrumBlockState(blockData => {
                const newState: SpectrumBlock = { ...blockData } as SpectrumBlock

                if (blockData.sourceInfo!.type === 'url') {
                  // @ts-expect-error
                  newState.sourceInfo!.url = val
                } else {
                  // @ts-expect-error
                  newState.sourceInfo!.details = val
                }

                return newState
              })
            }}
          />
        </div>

        <div className={classes.pairedItems}>
          <TextBox
            label="Downlink start frequency (MHz)"
            value={freqInputsState.startDl}
            helpText={!isValidFloat(freqInputsState.startDl) ? 'Invalid frequency' : undefined}
            onInput={val => {
              setFreqInputsState(state => ({ ...state, startDl: val }))

              if (!isValidFloat(val)) return

              setSpectrumBlockState(blockData => {
                return { ...blockData, startFreq: Number(val) }
              })
            }}
          />

          <TextBox
            label="Downlink end frequency (MHz)"
            value={freqInputsState.endDl}
            helpText={!isValidFloat(freqInputsState.endDl) ? 'Invalid frequency' : undefined}
            onInput={val => {
              setFreqInputsState(state => ({ ...state, endDl: val }))

              if (!isValidFloat(val)) return

              setSpectrumBlockState(blockData => {
                return { ...blockData, endFreq: Number(val) }
              })
            }}
          />
        </div>

        {'pairedWith' in blockData && (
          <div className={classes.pairedItems}>
            <TextBox
              label="Uplink start frequency (MHz)"
              value={freqInputsState.startUl}
              helpText={!isValidFloat(freqInputsState.startUl) ? 'Invalid frequency' : undefined}
              onInput={val => {
                setFreqInputsState(state => ({ ...state, startUl: val }))

                if (!isValidFloat(val)) return

                setSpectrumBlockState(blockData => {
                  return {
                    ...blockData,
                    pairedWith: {
                      // @ts-expect-error
                      ...blockData.pairedWith,
                      startFreq: Number(val),
                    },
                  }
                })
              }}
            />

            <TextBox
              label="Uplink end frequency (MHz)"
              value={freqInputsState.endUl}
              helpText={!isValidFloat(freqInputsState.endUl) ? 'Invalid frequency' : undefined}
              onInput={val => {
                setFreqInputsState(state => ({ ...state, endUl: val }))

                if (!isValidFloat(val)) return

                setSpectrumBlockState(blockData => {
                  return {
                    ...blockData,
                    pairedWith: {
                      // @ts-expect-error
                      ...blockData.pairedWith,
                      endFreq: Number(val),
                    },
                  }
                })
              }}
            />
          </div>
        )}

        <div className={sectClasses.greySection}>
          <h5 className="text-loud">Details</h5>
          <p className="text-speak">
            Additional info about this spectrum block, such as typical deployments (e.g., how LTE bandwidth might affect the deployment of
            2G/3G/5G), or explaining that this is often used for NR DSS, or any regional restrictions or spectrum license limitations. Really
            anything you want!
          </p>

          {details?.map((detail, detailIndex) => (
            <TextBox
              key={detailIndex}
              className={classes.detailTextbox}
              label={`Detail line ${detailIndex + 1}`}
              value={detail}
              onInput={(val: string) => {
                setSpectrumBlockState(blockData => {
                  const details = [...(typeof blockData.details === 'string' ? [blockData.details] : blockData.details || [])]
                  const newDetails = [...details]

                  newDetails[detailIndex] = val

                  return { ...blockData, details: newDetails }
                })
              }}
              endAdornment={
                <Button
                  className={classes.textboxRemoveButton}
                  title="Remove name"
                  onClick={() => {
                    setSpectrumBlockState(blockData => {
                      const details = [...(typeof blockData.details === 'string' ? [blockData.details] : blockData.details || [])]
                      const newDetails = [...details]

                      newDetails.splice(detailIndex, 1)

                      return { ...blockData, details: newDetails }
                    })
                  }}
                >
                  X
                </Button>
              }
            />
          ))}

          <Button
            className={classes.addDetailButton}
            onClick={() => {
              setSpectrumBlockState(blockData => {
                const details = [...(typeof blockData.details === 'string' ? [blockData.details] : blockData.details || [])]
                const newDetails = [...details]

                newDetails.push('')

                return { ...blockData, details: newDetails }
              })
            }}
            icon={<PlusIcon />}
          >
            Add another detail
          </Button>
        </div>

        <div className={classes.pairedItems}>
          <SpectrumBlockARFCNEditor dataIndex={dataIndex} blockIndex={blockIndex} type="nrarfcns" />
          <SpectrumBlockARFCNEditor dataIndex={dataIndex} blockIndex={blockIndex} type="earfcns" />
          <SpectrumBlockARFCNEditor dataIndex={dataIndex} blockIndex={blockIndex} type="uarfcns" />
          <SpectrumBlockARFCNEditor dataIndex={dataIndex} blockIndex={blockIndex} type="arfcns" />
        </div>
      </div>
    </div>
  )
}
