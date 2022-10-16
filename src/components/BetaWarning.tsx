import React from 'react'

import MinorAlert from './Design/MinorAlert'
import Link from './Links/Link'

interface IBetaWarningProps {
  className?: string
}

export default function BetaWarning({ className }: IBetaWarningProps) {
  return (
    <MinorAlert heading="This service is in beta" color="cautioningAmber" coloredBackground className={className}>
      You may encounter bugs, glitches, missing features or various other issues. Please report any issues to{' '}
      <Link href="https://t.me/davwheat">@davwheat on Telegram</Link> or <Link href="https://twitter.com/davwheat_">@davwheat_ on Twitter</Link>,
      or <Link href="https://github.com/davwheat/mastdatabase.co.uk/issues">open an issue on GitHub</Link>.
    </MinorAlert>
  )
}
