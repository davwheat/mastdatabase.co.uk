import React from 'react'

import { useParsedSpectrumState } from '@components/SpectrumEditor/useParsedSpectrumState'
import MinorAlert from '@components/Design/MinorAlert'
import { IErrorProps } from '../SpectrumAllocationPreview'

interface MismatchedPairedBandwidthInstance {
  blockIndex: number
  bw: number
  pairedBw: number
}

export default function MismatchedPairedBandwidth({ dataIndex }: IErrorProps) {
  const parsed = useParsedSpectrumState()?.[dataIndex]

  if (!parsed) return null

  const mismatchedPairedBws: MismatchedPairedBandwidthInstance[] = []

  parsed.spectrumData.forEach((spectrum, i) => {
    if (!('pairedWith' in spectrum)) return

    const bw = spectrum.endFreq - spectrum.startFreq
    const pairedBw = spectrum.pairedWith.endFreq - spectrum.pairedWith.startFreq

    if (bw !== pairedBw)
      mismatchedPairedBws.push({
        blockIndex: i,
        bw,
        pairedBw,
      })
  })

  if (mismatchedPairedBws.length === 0) return null

  return (
    <MinorAlert heading="Mismatched paired bandwidth" color="primaryRed">
      One or more spectrum blocks found with mismatched bandwidth and paired bandwidth:
      <ul className="list" style={{ marginTop: 8 }}>
        {mismatchedPairedBws.map(mismatch => (
          <li key={mismatch.blockIndex}>
            <p className="text-speak">
              <strong>Block {mismatch.blockIndex + 1}:</strong> {mismatch.bw} MHz bandwidth, but paired spectrum has {mismatch.pairedBw} MHz
              bandwidth
            </p>
          </li>
        ))}
      </ul>
    </MinorAlert>
  )
}
