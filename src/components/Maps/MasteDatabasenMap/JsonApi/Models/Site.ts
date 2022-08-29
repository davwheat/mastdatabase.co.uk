import { store } from '../MasteDatabasenStore'
import { IFrequencyBand, IOperator, IServiceType, ITechnology } from '.'

export interface ISite {
  id: number

  mastId: number
  stationName: string
  lat: number
  lon: number

  startDate: Date | null

  houseNumber: string | null
  streetName: string | null
  town: string | null
  streetCode: string | null
  communeCode: string | null
  postNumber: string | null

  // frequencyBandId: number | null
  // operatorId: number | null
  // serviceTypeId: number | null
  // technologyId: number | null

  FrequencyBand(): IFrequencyBand | null
  Operator(): IOperator | null
  ServiceType(): IServiceType | null
  Technology(): ITechnology | null
}

class _Site extends store.Base {
  static className: string = 'Site'
  static queryName: string = 'sites'

  static define() {
    this.hasOne('FrequencyBand', { className: 'FrequencyBand' })
    this.hasOne('Operator', { className: 'Operator' })
    this.hasOne('ServiceType', { className: 'ServiceType' })
    this.hasOne('Technology', { className: 'Technology' })
  }
}

export const Site = store.createResource(_Site)
