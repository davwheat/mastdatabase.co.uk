import React from 'react'

import CoverageProvider, { ICoverageLayer, ICoverageLayerKey } from './CoverageProvider'
import { DynamicMapLayer } from 'react-esri-leaflet'

export default class VodafoneCoverageMapProvider extends CoverageProvider {
  providerName: string = 'Vodafone'
  defaultLayerId: number = 2
  supportsSites: boolean = false

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
        key: [
          { color: '#00ffff', label: 'Variable service' },
          { color: '#ffaa00', label: 'Good service' },
          { color: '#ff0000', label: 'Very good service' },
        ],
      },
      {
        key: [
          { color: '#00ffff', label: 'Variable service' },
          { color: '#ffaa00', label: 'Good service' },
          { color: '#ff0000', label: 'Very good service' },
        ],
      },
      {
        key: [
          { color: '#00ffff', label: 'Variable service' },
          { color: '#ffaa00', label: 'Good service' },
          { color: '#ff0000', label: 'Very good service' },
        ],
      },
      {
        key: [
          { color: '#00ffff', label: 'Variable service' },
          { color: '#ffaa00', label: 'Good service' },
          { color: '#ff0000', label: 'Very good service' },
        ],
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
        layers: <DynamicMapLayer opacity={0.5} url="https://mapserver.vodafone.co.uk/arcgis/rest/services/Vodafone_2G_Live_Service/MapServer" />,
      },
      {
        label: '2G (planned)',
        layers: <DynamicMapLayer opacity={0.5} url="https://mapserver.vodafone.co.uk/arcgis/rest/services/Vodafone_2G_Plan_Service/MapServer" />,
      },
      {
        label: '3G',
        layers: <DynamicMapLayer opacity={0.5} url="https://mapserver.vodafone.co.uk/arcgis/rest/services/Vodafone_3G_Live_Service/MapServer" />,
      },
      {
        label: '3G (planned)',
        layers: <DynamicMapLayer opacity={0.5} url="https://mapserver.vodafone.co.uk/arcgis/rest/services/Vodafone_3G_Plan_Service/MapServer" />,
      },
      {
        label: '4G',
        layers: <DynamicMapLayer opacity={0.5} url="https://mapserver.vodafone.co.uk/arcgis/rest/services/Vodafone_4G_Live_Service/MapServer" />,
      },
      {
        label: '4G (planned)',
        layers: <DynamicMapLayer opacity={0.5} url="https://mapserver.vodafone.co.uk/arcgis/rest/services/Vodafone_4G_Plan_Service/MapServer" />,
      },
      {
        label: '5G',
        layers: <DynamicMapLayer opacity={0.5} url="https://mapserver.vodafone.co.uk/arcgis/rest/services/Vodafone_5G_Live_Service/MapServer" />,
      },
      {
        label: '5G (planned)',
        layers: <DynamicMapLayer opacity={0.5} url="https://mapserver.vodafone.co.uk/arcgis/rest/services/Vodafone_5G_Plan_Service/MapServer" />,
      },
      {
        label: 'Paknet',
        layers: <DynamicMapLayer opacity={0.5} url="https://mapserver.vodafone.co.uk/arcgis/rest/services/Paknet/MapServer" />,
      },
      {
        label: 'Flex paging',
        layers: <DynamicMapLayer opacity={0.5} url="https://mapserver.vodafone.co.uk/arcgis/rest/services/Pager_Flex/MapServer" />,
      },
      {
        label: 'Select paging',
        layers: <DynamicMapLayer opacity={0.5} url="https://mapserver.vodafone.co.uk/arcgis/rest/services/Pager_Select/MapServer" />,
      },
      {
        label: 'Premier paging',
        layers: <DynamicMapLayer opacity={0.5} url="https://mapserver.vodafone.co.uk/arcgis/rest/services/Pager_Premier/MapServer" />,
      },
    ]
  }
}
