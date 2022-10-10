import EECoverageMapProvider from '@components/Maps/UkCoverageMap/Providers/EEProvider'
import UkCoverageMapPage from '@components/Maps/UkCoverageMap/UkCoverageMapPage'

/**
 * NOTE:
 *
 * Some layers are hidden from this map by default.
 *
 * To show them, append `?hidden` to the coverage map page URL.
 */

export default UkCoverageMapPage(EECoverageMapProvider)
