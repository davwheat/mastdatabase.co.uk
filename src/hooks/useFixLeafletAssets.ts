import fixLeafletAssets from '@functions/fixLeaflet'
import { useEffect } from 'react'

export default function useFixLeafletAssets() {
  useEffect(() => fixLeafletAssets())
}
