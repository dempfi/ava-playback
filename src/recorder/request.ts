import { Request } from '../interfaces'

export const onData = (request: Request, cb: (chunk: Buffer) => any) => {
  const originalWrite = request.write
  request.write = function(chunk: string | Buffer, encoding?: any) {
    if (typeof chunk === 'undefined') return originalWrite.apply(request, arguments)
    if (!Buffer.isBuffer(chunk)) cb(new Buffer(chunk, encoding))
    else cb(chunk)
    return originalWrite.apply(request, arguments)
  }
}
