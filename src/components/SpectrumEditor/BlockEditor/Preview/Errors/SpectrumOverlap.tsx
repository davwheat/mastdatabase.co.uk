import React from 'react'

import { useParsedSpectrumState } from '@components/SpectrumEditor/useParsedSpectrumState'
import MinorAlert from '@components/Design/MinorAlert'
import { IErrorProps } from '../SpectrumAllocationPreview'

interface SpectrumOverlapInstance {
  blockIndex: number
  startFreq: number
  endFreq: number
  lastEnd: number
}

export default function SpectrumOverlap({ dataIndex }: IErrorProps) {
  const parsed = useParsedSpectrumState()?.[dataIndex]

  if (!parsed) return null

  const spectrumOverlaps: SpectrumOverlapInstance[] = []

  let lastEnd = parsed.spectrumData[0]?.startFreq

  parsed.spectrumData.forEach((spectrum, i) => {
    if (spectrum.startFreq < lastEnd) {
      spectrumOverlaps.push({
        blockIndex: i,
        startFreq: spectrum.startFreq,
        endFreq: spectrum.endFreq,
        lastEnd,
      })
    }

    lastEnd = Math.max(spectrum.endFreq, lastEnd)
  })

  if (spectrumOverlaps.length === 0) return null

  return (
    <MinorAlert heading="Spectrum overlaps" color="primaryRed">
      One or more overlapping spectrum blocks were detected:
      <ul className="list" style={{ marginTop: 8 }}>
        {spectrumOverlaps.map(overlap => (
          <li key={overlap.blockIndex}>
            <p className="text-speak">
              <strong>Block {overlap.blockIndex + 1}:</strong> {overlap.startFreq} MHz &mdash; {overlap.endFreq} MHz overlaps with a block ending
              at {overlap.lastEnd} MHz
            </p>
          </li>
        ))}
      </ul>
    </MinorAlert>
  )
}
