import * as URL from 'url'
import record from './record'
import { Options } from '../interfaces'
import overrideNatives from '../common/override-natives'
import normalizeOptions from '../common/normalize-options'

export default () => overrideNatives(
  (protocol, overriddenRequest, rawOptions, callback) => {
    const options = normalizeOptions(rawOptions, protocol)
    if (options.__recording__) return overriddenRequest(options, callback)
    options.__recording__ = true

    const request = overriddenRequest(options, response => {
      record(protocol, options, request, response)
      if (callback) callback(response)
      else response.resume()
    })

    return request
  })
