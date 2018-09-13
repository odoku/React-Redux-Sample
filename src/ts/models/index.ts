import { BaseModel } from './base'

interface RawUser {
  id: number
  country_id: number
  email: string
  password: string
  first_name: string
  last_name: string
  company: string
  zipcode: string
  address: string
  is_admin: boolean
  is_verified: boolean
}

export class User extends BaseModel<RawUser> {
  public id: number
  public countryId: number
  public email: string
  public password: string
  public firstName: string
  public lastName: string
  public company: string
  public zipcode: string
  public address: string
  public isAdmin: boolean
  public isVerified: boolean

  public get fullname (): string {
    return `${this.firstName} ${this.lastName}`
  }
}
