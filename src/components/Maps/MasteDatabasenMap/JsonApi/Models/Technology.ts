import { store } from '../MasteDatabasenStore'

export interface ITechnology {
  id: string
  technologyName: string
}

class _Technology extends store.Base {
  static className: string = 'Technology'
  static queryName: string = 'technologies'

  static define() {
    this.belongsTo('sites', { className: 'Site' })
  }
}

export const Technology = store.createResource(_Technology)
