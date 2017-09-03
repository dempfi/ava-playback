import * as URL from 'url'
import record from './record'
import * as common from '../common'
import { Options } from '../interfaces'

const normalizeOptions = (options: string | Options) => {
  if (typeof options !== 'string') return options
  const { hostname, port, path } = URL.parse(options)
  return { hostname, method: 'GET', port: Number(port), path }
}

export default () => common.override(
  (protocol, overriddenRequest, rawOptions, callback) => {
    const options = normalizeOptions(rawOptions)

    const request = overriddenRequest(options, response => {
      record(protocol, options, request, response)
      if (callback) callback(response)
      else response.resume()
    })

    return request
  })

