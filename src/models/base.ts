import * as changeCase from 'change-case'

export class BaseModel<R> {
  public fill (data: R) {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        this[changeCase.camel(key)] = data[key]
      }
    }
    return this
  }
}
