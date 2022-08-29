import { store } from '../MasteDatabasenStore'

export interface IOperator {
  id: string
  operatorName: string
}

class _Operator extends store.Base {
  static className: string = 'Operator'
  static queryName: string = 'operators'

  static define() {
    this.belongsTo('sites', { className: 'Site' })
  }
}

export const Operator = store.createResource(_Operator)
