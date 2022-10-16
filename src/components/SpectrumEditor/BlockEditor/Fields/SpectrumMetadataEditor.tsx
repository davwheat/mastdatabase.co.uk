import React from 'react'

import Colors from '@data/colors.json'

import { makeStyles } from '@material-ui/core'
import SpectrumNamesEditor from './SpectrumNamesEditor'
import SpectrumExtraDataEditor from './SpectrumExtraDataEditor'

export const useSectionStyles = makeStyles({
  whiteSection: {
    padding: '16px 24px',
    backgroundColor: 'white',

    '& + &': {
      marginTop: 16,
    },
  },
  greySection: {
    padding: '16px 24px',
    backgroundColor: Colors.lightGrey,

    '& + &': {
      marginTop: 16,
    },
  },
})

interface ISpectrumMetadataEditorProps {
  dataIndex: number
}

export default function SpectrumMetadataEditor({ dataIndex }: ISpectrumMetadataEditorProps) {
  return (
    <div>
      <SpectrumNamesEditor dataIndex={dataIndex} />
      <SpectrumExtraDataEditor dataIndex={dataIndex} />
    </div>
  )
}
