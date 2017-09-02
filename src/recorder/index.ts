import { RequestOptions, ClientRequest } from 'http'
import * as URL from 'url'
import * as common from '../common'
import { Response } from './response'

const records = new Set()
let currentRecordingId = 0

const normalizeOptions = (options: string | RequestOptions) => {
  if (typeof options !== 'string') return options
  const { hostname, port, path } = URL.parse(options)
  return { hostname, method: 'GET', port: Number(port), path }
}

export default () => {
  currentRecordingId += 1
  common.override((protocol, overriddenRequest, rawOptions, callback) => {
    const requestBodyChunks: Buffer[] = []
    const options = normalizeOptions(rawOptions)

    const request = overriddenRequest(options, response => {
      Response.onEnd(response, chunks => {
        console.log(requestBodyChunks)
        console.log(Buffer.concat(chunks).toString('utf8'))
      })

      if (callback) callback(response)
      else response.resume()
    })

    const write = request.write
    request.write = function (chunk: string | Buffer, encoding?: any) {
      if (typeof chunk === 'undefined') return write.apply(request, arguments)
      if (!Buffer.isBuffer(chunk)) chunk = new Buffer(chunk, encoding)
      requestBodyChunks.push(chunk)
      return write.apply(request, arguments)
    }

    return request
  })
}
