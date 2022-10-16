import React from 'react'

import { SpectrumMap } from '@components/MobileNetworking/SpectrumMap'
import { useParsedSpectrumState } from '../../useParsedSpectrumState'
import Colors from '@data/colors.json'

import { makeStyles } from '@material-ui/core'
import SpectrumOverlap from './Errors/SpectrumOverlap'
import MismatchedPairedBandwidth from './Errors/MismatchedPairedBandwidth'

const useStyles = makeStyles({
  root: {
    backgroundColor: Colors.lightGrey,
    padding: 24,
    position: 'sticky',
    top: 24,
    alignSelf: 'start',
  },
  inner: {
    padding: 24,
    marginTop: 24,
    marginBottom: 24,
    backgroundColor: 'white',
    position: 'relative',

    // Torn paper effect
    '&::before, &::after': {
      content: "''",
      height: 4,
      position: 'absolute',
      left: 0,
      right: 0,
      clipPath:
        'polygon(0 0, 5%  100%, 10% 0, 15%  100%, 20% 0, 25% 100%, 30% 0, 35%  100%, 40% 0, 45%  100%, 50% 0, 55%  100%, 60% 0, 65%  100%, 70% 0, 75%  100%, 80% 0, 85%  100%, 90% 0, 95%  100%, 100% 0)',
    },

    '&::before': {
      backgroundColor: Colors.lightGrey,
      top: -0.5,
    },

    '&::after': {
      backgroundColor: 'white',
      bottom: -3.5,
    },
  },

  errorsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
})

interface ISpectrumAllocationPreviewProps {
  dataIndex: number
}

export interface IErrorProps {
  dataIndex: number
}

export default function SpectrumAllocationPreview({ dataIndex }: ISpectrumAllocationPreviewProps) {
  const classes = useStyles()
  const spectrumBlock = useParsedSpectrumState()![dataIndex]

  const caption = `Spectrum deployment for Band${spectrumBlock.names.length !== 1 ? 's' : ''} ${spectrumBlock.names.join(', ')}`

  return (
    <div className={classes.root}>
      <h3 className="text-loud">Preview</h3>
      <p className="text-speak">This is a preview of what your spectrum configuration would look like if embedded on this site.</p>
      <p className="text-speak">
        <strong>Note:</strong> for spectrum details, you will need to click the block on the diagram to refresh the data.
      </p>

      <div className={classes.inner}>
        <h3 className="text-loud">
          {spectrumBlock.names.length === 1 ? 'Band' : 'Bands'} {spectrumBlock.names.join(', ')}{' '}
          {spectrumBlock.extraInfo?.shortAddendum && `(${spectrumBlock.extraInfo?.shortAddendum})`}
        </h3>

        {spectrumBlock.extraInfo?.description && <p className="text-speak">{spectrumBlock.extraInfo?.description}</p>}

        <SpectrumMap data={spectrumBlock.spectrumData} caption={caption} />
      </div>

      <h3 className="text-loud">Errors</h3>
      <p className="text-speak">Some easily detectable errors will show below. These must be fixed in order for the data to render correctly.</p>

      <div className={classes.errorsList}>
        <SpectrumOverlap dataIndex={dataIndex} />
        <MismatchedPairedBandwidth dataIndex={dataIndex} />
      </div>
    </div>
  )
}
