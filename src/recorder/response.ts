import { Response } from '../interfaces'
import { Resolvable } from '../common/resolvable'

export const onData = (response: Response, cb: (chunk: Buffer) => any) => {
  let encoding: string
  const originalSetEncoding = response.setEncoding
  response.setEncoding = (encoding: string) => {
    encoding = encoding
    return originalSetEncoding.call(response, encoding)
  }

  const originalPush = response.push
  response.push = (chunk: any) => {
    if (!chunk) return originalPush.call(response, chunk, encoding)
    if (encoding) cb(new Buffer(chunk, encoding))
    else cb(chunk)
    return originalPush.call(response, chunk, encoding)
  }
}

export const waitEnd = (response: Response) => {
  const resolvable = new Resolvable()
  response.once('end', () => resolvable.resolve())
  return resolvable.promise
}
