import * as url from 'url'
import { Options } from '../interfaces'

const fromString = (str: string): Options => {
  const { hostname, port, path } = url.parse(str)
  return {
    hostname,
    method: 'GET',
    port: Number(port),
    __recording__: false,
    __https__: false,
    path,
  }
}

export default (raw: Options | string, protocol: string): Options => {
  const options = typeof raw === 'string' ? fromString(raw) : raw
  options.__https__ = protocol === 'https'
  options.method = options.method || 'GET'
  options.port = options.port || (options.__https__ ? 443 : 80)

  if (options.host && !options.hostname) {
    if (options.host.split(':').length === 2)
      options.hostname = options.host.split(':')[0]
    else options.hostname = options.host
  }

  options.__recording__ = options.__recording__ || false

  options.host = (options.hostname || 'localhost') + ':' + options.port
  options.hostname = options.hostname.toLowerCase()
  options.host = options.host.toLowerCase()

  return options
}
