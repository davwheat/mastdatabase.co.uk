import React from 'react'

import CoverageProvider, { ICoverageLayer, ICoverageLayerKey } from './CoverageProvider'
import { DynamicMapLayer } from 'react-esri-leaflet'
import VodafoneLogo from '@assets/icons/brands/vodafone.inline.svg'

export default class VodafoneCoverageMapProvider extends CoverageProvider {
  providerName: string = 'Vodafone'
  defaultLayerId: number = this.getLayers().findIndex(layer => layer.label === '4G')
  supportsSites: boolean = false
  readonly supportsVersionHistory = false

  readonly providerIcon = (<VodafoneLogo />)

  protected allVersions: undefined
  protected version: undefined

  getLayerKeys(): ICoverageLayerKey[] {
    const genericKey = [
      { color: '#e60000', label: 'Good outdoors and indoors' },
      { color: '#f57676', label: 'Good outdoors' },
      { color: '#f3afaf', label: 'Limited coverage' },
    ]

    return [
      {
        key: genericKey,
      },
      {
        key: genericKey,
      },
      {
        key: genericKey,
      },
      {
        key: genericKey,
      },
      {
        key: genericKey,
      },
      {
        key: genericKey,
      },
      {
        key: genericKey,
      },
      {
        key: genericKey,
      },
      {
        key: [{ color: '', label: 'Random colours for each area surrounding an impacted site' }],
      },
      {
        key: genericKey,
      },
      {
        key: genericKey,
      },
      {
        key: genericKey,
      },
      {
        key: genericKey,
      },
    ]
  }

  getPageMessages(): string[] {
    return []
  }

  getLayers(): ICoverageLayer[] {
    return [
      {
        label: '2G',
        layers: (
          <DynamicMapLayer
            className="coverage-tiles"
            opacity={0.5}
            url="https://mapserver.vodafone.co.uk/arcgis/rest/services/VF_LIVE_2G/MapServer"
          />
        ),
      },
      {
        label: '2G (planned)',
        layers: (
          <DynamicMapLayer
            className="coverage-tiles"
            opacity={0.5}
            url="https://mapserver.vodafone.co.uk/arcgis/rest/services/VF_PLAN_2G/MapServer"
          />
        ),
      },
      {
        label: '3G',
        layers: (
          <DynamicMapLayer
            className="coverage-tiles"
            opacity={0.5}
            url="https://mapserver.vodafone.co.uk/arcgis/rest/services/VF_LIVE_3G/MapServer"
          />
        ),
      },
      {
        label: '3G (planned)',
        layers: (
          <DynamicMapLayer
            className="coverage-tiles"
            opacity={0.5}
            url="https://mapserver.vodafone.co.uk/arcgis/rest/services/VF_PLAN_3G/MapServer"
          />
        ),
      },
      {
        label: '4G',
        layers: (
          <DynamicMapLayer
            className="coverage-tiles"
            opacity={0.5}
            url="https://mapserver.vodafone.co.uk/arcgis/rest/services/VF_LIVE_4G/MapServer"
          />
        ),
      },
      {
        label: '4G (planned)',
        layers: (
          <DynamicMapLayer
            className="coverage-tiles"
            opacity={0.5}
            url="https://mapserver.vodafone.co.uk/arcgis/rest/services/VF_PLAN_4G/MapServer"
          />
        ),
      },
      {
        label: '5G',
        layers: (
          <DynamicMapLayer
            className="coverage-tiles"
            opacity={0.5}
            url="https://mapserver.vodafone.co.uk/arcgis/rest/services/VF_LIVE_5G/MapServer"
          />
        ),
      },
      {
        label: '5G (planned)',
        layers: (
          <DynamicMapLayer
            className="coverage-tiles"
            opacity={0.5}
            url="https://mapserver.vodafone.co.uk/arcgis/rest/services/VF_PLAN_5G/MapServer"
          />
        ),
      },
      {
        label: 'Network outage impact map',
        hidden: true,
        layers: (
          <DynamicMapLayer
            className="coverage-tiles"
            opacity={0.7}
            url="https://mapserver.vodafone.co.uk/arcgis/rest/services/VF_IMPACT_FOOTPRINT/MapServer"
          />
        ),
      },
      {
        label: 'IoT (indoor)',
        layers: (
          <DynamicMapLayer
            className="coverage-tiles"
            opacity={0.5}
            url="https://mapserver.vodafone.co.uk/arcgis/rest/services/VF_LIVE_IOT_IN/MapServer"
          />
        ),
      },
      {
        label: 'IoT (outdoor)',
        layers: (
          <DynamicMapLayer
            className="coverage-tiles"
            opacity={0.5}
            url="https://mapserver.vodafone.co.uk/arcgis/rest/services/VF_PLAN_IOT_OUT/MapServer"
          />
        ),
      },
      {
        label: 'IoT (planned indoor)',
        layers: (
          <DynamicMapLayer
            className="coverage-tiles"
            opacity={0.5}
            url="https://mapserver.vodafone.co.uk/arcgis/rest/services/VF_PLAN_IOT_IN/MapServer"
          />
        ),
      },
      {
        label: 'IoT (planned outdoor)',
        layers: (
          <DynamicMapLayer
            className="coverage-tiles"
            opacity={0.5}
            url="https://mapserver.vodafone.co.uk/arcgis/rest/services/VF_PLAN_IOT_OUT/MapServer"
          />
        ),
      },
    ]
  }
}
