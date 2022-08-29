import { store } from '../MasteDatabasenStore'

export interface IServiceType {
  id: string
  serviceType: string
}

class _ServiceType extends store.Base {
  static className: string = 'ServiceType'
  static queryName: string = 'service-types'

  static define() {
    this.belongsTo('sites', { className: 'Site' })
  }
}

export const ServiceType = store.createResource(_ServiceType)
