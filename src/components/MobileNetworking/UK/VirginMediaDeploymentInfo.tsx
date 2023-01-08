import dayjs from 'dayjs'
import React from 'react'

type ServiceState = 'LS'

interface ServiceStatusDetails {
  code: ServiceState
  previouslySeen: boolean
  saleable: boolean
}

interface ServiceStatusDetailsItem {
  code: ServiceState
  serviceCategoryCode: 'D' | 'C' | 'T'
  typeOfService: 'CableBroadbandService' | 'AnalogueTelevisionService' | 'DigitalTelevisionService' | 'CableTelephonyService'
}

function pluraliseOr(values: string[]): string {
  if (values.length === 1) {
    return values[0]
  }
  return values.slice(0, -1).join(', ') + ' or ' + values.slice(-1)
}

interface VirginMediaDeploymentInfo {
  addressData:
    | false
    | {
        address?: string
        displayAddress: string
        latitude: string
        longitude: string
        postcode: string
        premiseId: null | string
        siteId: string
        uprn: string
        looseMatch?: true
      }
  message?: {
    active: boolean
    address: string
    addressDetails: {
      town: string
    }
    maxBBspeed: string
    networkServiceabilityDetails: {
      /**
       * Date that VM coverage went live if known (YYYY-MM-DD).
       */
      actualReleaseDate?: string
      deliveryMethod: 'FTTP' | 'HFC'
      /**
       * Part of VM Project Lightning
       *
       * @see https://www.virginmedia.com/corporate/about-us/our-key-projects
       */
      lightningPremise: boolean
      nex: number
      /**
       * Built through access to existing infrastructure (e.g., Openreach ducting and telegraph poles). (Part of VM Project Lightning)
       *
       * @see https://www.ispreview.co.uk/index.php/2021/03/virgin-media-uk-hails-pia-and-rapid-fttp-rollout-in-swadlincote.html
       */
      piaPremise: boolean
      /**
       * Served through existing in-building coax for apartment complexes. (Part of VM Project Lightning)
       *
       * @see https://www.southeastconsortium.org.uk/wp-content/uploads/2019/08/Virgin-VM-over-IRS-Solution-2019.pdf
       */
      premiseServedByIRS: boolean
    }
    outcomeId: number
    postcode: string
    premise: string
    premiseType: 'Infill' | 'STANDARD'
    premiseUid: string
    prewired: boolean
    qsCableEligible: boolean
    qsOutletEligible: boolean
    qsTelephonyEligible: boolean
    quickStartAOAllowed: boolean
    siteId: string
    spotters: boolean
    status: 'active' | 'serviceable'
    statusDetails: {
      bb: ServiceStatusDetails
      tel: ServiceStatusDetails
      tv: ServiceStatusDetails
      commStatus: 'rejected' | 'Launch' | 'Coming Soon' | 'Maybe'
      details: []
    }

    bb: ServiceState
    tel: ServiceState
    tv: ServiceState
    telephonyTechnologyTypes: ('DOCSIS' | 'TDM')[]
    uprn: string
  }
  friendlyName: 'Virgin Media'
  fttp: boolean
  provider: 'virgin-media'
  serviceable: boolean
  success: boolean
}

export interface VirginMediaDeploymentInfoProps {
  data: VirginMediaDeploymentInfo
}

const DEPLOYMENT_METHOD_FRIENDLY_NAMES: Record<
  Required<VirginMediaDeploymentInfo>['message']['networkServiceabilityDetails']['deliveryMethod'],
  string
> = {
  HFC: 'hybrid fibre coaxial',
  FTTP: 'fibre to the premises',
}

const TELEPHONY_TYPE_FRIENDLY_NAMES: Record<Required<VirginMediaDeploymentInfo>['message']['telephonyTechnologyTypes'][number], string> = {
  DOCSIS: 'DOCSIS digital voice',
  TDM: 'traditional public switched telephone network',
}

export default function VirginMediaDeploymentInfo({ data }: VirginMediaDeploymentInfoProps) {
  const { addressData, message } = data

  if (!addressData) {
    return (
      <div>
        <p className="text-speak">The provided address couldn't be found.</p>
      </div>
    )
  }

  if (!message) {
    return (
      <div>
        <p className="text-speak">
          This property does not seem to have a connection to the Virgin Media network. Try again with another postcode or house number.
        </p>
      </div>
    )
  }

  const segments: React.ReactNode[] = []

  if (message.active) {
    segments.push(
      <p className="text-speak" key="live">
        An existing Virgin Media line <strong>is active</strong> at this address.
      </p>,
    )
  } else {
    if (message.statusDetails.commStatus === 'Coming Soon') {
      segments.push(
        <p className="text-speak" key="live-soon">
          Virgin Media is <strong>not currently live</strong> at this address, but will be available soon.
        </p>,
      )
    } else {
      segments.push(
        <p className="text-speak" key="live-no">
          Virgin Media is <strong>not currently live</strong> at this address, but is available.
        </p>,
      )
    }
  }

  const { networkServiceabilityDetails: serviceabilityDetails, statusDetails } = message

  segments.push(
    <p className="text-speak" key="speed">
      Your maximum available broadband speed from Virgin Media is {message.maxBBspeed} Mbps, over a{' '}
      <strong>{DEPLOYMENT_METHOD_FRIENDLY_NAMES[serviceabilityDetails.deliveryMethod] ?? serviceabilityDetails.deliveryMethod}</strong>{' '}
      connection.
    </p>,
  )

  if (serviceabilityDetails.actualReleaseDate) {
    segments.push(
      <p className="text-speak" key="actual-release-date">
        Virgin Media coverage went live at this address on {dayjs(serviceabilityDetails.actualReleaseDate).format('DD MMMM YYYY')}.
      </p>,
    )
  } else {
    segments.push(
      <p className="text-speak" key="actual-release-date">
        It is not known when Virgin Media coverage went live at this address.
      </p>,
    )
  }

  if (serviceabilityDetails.lightningPremise || serviceabilityDetails.piaPremise || serviceabilityDetails.premiseServedByIRS) {
    segments.push(
      <p className="text-speak" key="lightning-premise">
        Coverage at this address was delivered{serviceabilityDetails.lightningPremise ? ' as part of Project Lightning' : ''}
        {serviceabilityDetails.piaPremise ? ' through existing infrastructure (ducting and/or telegraph poles)' : ''}
        {serviceabilityDetails.premiseServedByIRS && serviceabilityDetails.piaPremise ? ' and' : ''}
        {serviceabilityDetails.premiseServedByIRS ? ' through existing coaxial cables available in the building complex' : ''}.
      </p>,
    )
  }

  segments.push(
    <p className="text-speak" key="premise-info">
      The installation type is <strong>{message.premiseType.toLowerCase()}</strong>. The unique premises ID is{' '}
      <strong>{message.premiseUid}</strong>.
    </p>,
  )

  if (message.spotters) {
    segments.push(
      <p className="text-speak" key="spotters">
        Spotters are required to investigate whether an installation is possible at this address.
      </p>,
    )
  }

  if (message.prewired) {
    segments.push(
      <p className="text-speak" key="prewired">
        All cabling outside the property is already installed.
      </p>,
    )
  }

  if (message.quickStartAOAllowed) {
    segments.push(
      <p className="text-speak" key="quickstart-ao-allowed">
        QuickStart is available at this address. The property is registered to have {message.qsOutletEligible ? 'a' : 'no'} QuickStart outlet,{' '}
        {message.qsCableEligible ? 'a' : 'no'} QuickStart cable, and {message.qsTelephonyEligible ? '' : 'no'} QuickStart telephony capability.
      </p>,
    )
  } else {
    segments.push(
      <p className="text-speak" key="quickstart-ao-not-allowed">
        QuickStart is <strong>not</strong> currently available at this address.{' '}
        {message.active
          ? 'This is likely due to an existing line being active at the address.'
          : 'The property may require additional installation works from an engineer prior to activation.'}{' '}
        The property is registered to have {message.qsOutletEligible ? 'a' : 'no'} QuickStart outlet, {message.qsCableEligible ? '' : 'no'}{' '}
        QuickStart cable, and {message.qsTelephonyEligible ? 'support for' : 'no support for'} QuickStart telephony capability.
      </p>,
    )
  }

  segments.push(
    <p className="text-speak" key="prev-seen-bb">
      <strong>Broadband</strong> has {statusDetails.bb.previouslySeen ? '' : <strong>not </strong>}been seen at this property before and is{' '}
      {statusDetails.bb.saleable ? '' : <strong>not </strong>}saleable.
    </p>,
    <p className="text-speak" key="prev-seen-tel">
      Telephony has {statusDetails.tel.previouslySeen ? '' : <strong>not </strong>}been seen at this property before and is{' '}
      {statusDetails.tel.saleable ? '' : <strong>not </strong>}saleable.
    </p>,
    <p className="text-speak" key="prev-seen-tv">
      (Unreliable) TV has {statusDetails.tv.previouslySeen ? '' : <strong>not </strong>}
      been seen at this property before and is {statusDetails.tv.saleable ? '' : <strong>not </strong>}saleable.
    </p>,
  )

  segments.push(
    <p className="text-speak" key="telephony-type">
      Telephone service is available via{' '}
      <strong>{pluraliseOr(message.telephonyTechnologyTypes.map(type => TELEPHONY_TYPE_FRIENDLY_NAMES[type] ?? type))}</strong>.
    </p>,
  )

  return <div>{segments}</div>
}
