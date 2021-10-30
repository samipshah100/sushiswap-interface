import React, { FC } from 'react'

import Typography from '../../components/Typography'
import CurrencyInputPanel from '../legacy/limit-order/CurrencyInputPanel'

interface OutputPanelProps {
  label: string
}

const OutputPanel: FC<OutputPanelProps> = ({ label }) => {
  return (
    <CurrencyInputPanel
      id="token-output"
      className="flex items-center p-0 px-5 border-2 rounded border-dark-800"
      selectComponent={
        <Typography variant="lg" className="text-primary" weight={700}>
          {label}
        </Typography>
      }
      inputComponent={<div className="h-16 rounded-r bg-dark-900 sm:w-3/5" />}
    />
  )
}

export default OutputPanel
