import { store } from '../MasteDatabasenStore'

export interface IFrequencyBand {
  id: string
  frequencyBand: number
}

class _FrequencyBand extends store.Base {
  static className: string = 'FrequencyBand'
  static queryName: string = 'frequency-bands'

  static define() {
    this.belongsTo('sites', { className: 'Site' })
  }
}

export const FrequencyBand = store.createResource(_FrequencyBand)
