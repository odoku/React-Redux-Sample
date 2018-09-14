import fakeServer from 'sw-loader!./server'

import { createClient } from 'service-mocker/client'

export const register = () => {
  return createClient(fakeServer, { forceLegacy: true })
}
