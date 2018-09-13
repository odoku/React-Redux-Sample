import { IUser } from '~/models'

// Get User
// ==================================================================
interface IGetUserResponse {
  status: string
  data: IUser
}

// XXX: Mock Function
export const getUser = async (accessToken: string): Promise<IGetUserResponse> => {
  return {
    status: 'ok',
    data: {
      id: 10,
      country_id: 13,
      email: 'hoge@hoge.com',
      password: 'xxxxxxxxxx',
      first_name: '山田',
      last_name: 'たかお',
      company: '山田建設',
      zipcode: '1500011',
      address: '東京都渋谷区東1-1-1',
      is_admin: true,
      is_verified: true,
    }
  }
}
