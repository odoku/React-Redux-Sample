import { IUser } from '~/models'

// Login
// ==================================================================
interface ICredential {
  username: string
  password: string
}

interface ILoginResponse {
  status: string
  data: IUser
  jwt: string
  jwt_error: string
}

// XXX: Mock Function
export const login = async ({ username, password }: ICredential): Promise<ILoginResponse> => {
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
    },
    jwt: 'hogehogehogehoge',
    jwt_error: ''
  }
}

// Login
// ==================================================================
export const logout = async () => {
  return true
}
