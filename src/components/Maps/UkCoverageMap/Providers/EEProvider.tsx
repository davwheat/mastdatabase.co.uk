import CoverageProvider, { ICoverageLayer, ICoverageLayerKey } from './CoverageProvider'

export default class EECoverageMapProvider extends CoverageProvider {
  providerName: string = 'EE'
  defaultLayerId: number = 4
  supportsSites: boolean = false

  getLayers(): ICoverageLayer[] {
    return [
      {
        label: '2G',
        url: 'https://coverage.ee.co.uk/geowebcache/service/gmaps?layers=2g_ee&zoom={z}&x={x}&y={y}&format=image/png',
      },
      {
        label: '3G',
        url: 'https://coverage.ee.co.uk/geowebcache/service/gmaps?layers=3g_ee&zoom={z}&x={x}&y={y}&format=image/png',
      },
      {
        label: '4G (non-VoLTE)',
        url: 'https://coverage.ee.co.uk/geowebcache/service/gmaps?layers=4g_base_ee&zoom={z}&x={x}&y={y}&format=image/png',
      },
      {
        label: '4G (800 MHz only)',
        hidden: true,
        url: 'https://coverage.ee.co.uk/geowebcache/service/gmaps?layers=4g_800_ltea&zoom={z}&x={x}&y={y}&format=image/png',
      },
      {
        label: '4G (all bands)',
        url: 'https://coverage.ee.co.uk/geowebcache/service/gmaps?layers=4g_max_ee&zoom={z}&x={x}&y={y}&format=image/png',
      },
      {
        label: '4G CA only (legacy)',
        hidden: true,
        url: 'https://coverage.ee.co.uk/geowebcache/service/gmaps?layers=4g_ca1826_ltea&zoom={z}&x={x}&y={y}&format=image/png',
      },
      {
        label: '5G (n78)',
        hidden: true,
        url: 'https://coverage.ee.co.uk/geowebcache/service/gmaps?layers=5g_base_ee&zoom={z}&x={x}&y={y}&format=image/png',
      },
      {
        label: '5G (all)',
        url: 'https://coverage.ee.co.uk/geowebcache/service/gmaps?layers=5g_max_ee&zoom={z}&x={x}&y={y}&format=image/png',
      },
    ]
  }

  getLayerKeys(): ICoverageLayerKey[] {
    return [
      {
        key: [
          { color: '#009c9c', label: '2G outdoors and indoors' },
          { color: '#66c4c4', label: '2G outdoors' },
        ],
      },
      {
        key: [
          { color: '#009c9c', label: '3G outdoors and indoors' },
          { color: '#66c4c4', label: '3G outdoors' },
        ],
      },
      {
        key: [
          { color: '#009c9c', label: '4G outdoors and indoors' },
          { color: '#66c4c4', label: '4G outdoors' },
        ],
      },
      {
        key: [
          { color: '#009c9c', label: '4G outdoors and indoors' },
          { color: '#66c4c4', label: '4G outdoors' },
        ],
      },
      {
        key: [
          { color: '#009c9c', label: '4G outdoors and indoors' },
          { color: '#66c4c4', label: '4G outdoors' },
        ],
      },
      {
        key: [{ color: '#f3666b', label: 'LTE CA available' }],
      },
      {
        key: [
          { color: '#ffe600', label: '5G outdoors and indoors' },
          { color: '#fef7ba', label: '5G outdoors' },
          { color: '#009c9c', label: '4G outdoors and indoors' },
          { color: '#66c4c4', label: '4G outdoors' },
        ],
      },
      {
        key: [
          { color: '#ffe600', label: '5G outdoors and indoors' },
          { color: '#fef7ba', label: '5G outdoors' },
          { color: '#009c9c', label: '4G outdoors and indoors' },
          { color: '#66c4c4', label: '4G outdoors' },
        ],
      },
    ]
  }

  getPageMessages(): string[] {
    return []
  }
}
