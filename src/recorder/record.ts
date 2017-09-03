import * as I from '../interfaces'
import * as Request from './request'
import * as Response from './response'
import chunksToBody from '../common/chunks-to-body'

const getScope = ({ host, __https__, port }: I.Options) => {
  let scope = `${__https__ ? 'https' : 'http'}://${host}`
  const isDefaultPort = port.toString() === (__https__ ? '443' : '80')
  const needPort = !host.includes(':') && port && isDefaultPort
  return needPort ? `${scope}:${port}` : scope
}

const generatePlayback = (
  req: I.Request,
  res: I.Response,
  options: I.Options,
  requestBody: Buffer[],
  responseBody: Buffer[]
) => ({
  scope: getScope(options),
  path: options.path,
  method: options.method || 'GET',
  status: res.statusCode,
  body: chunksToBody(requestBody),
  response: chunksToBody(responseBody, res.headers),
  rawHeaders: res.rawHeaders || res.headers
})

export default async (protocol: string, options: I.Options, req: I.Request, res: I.Response) => {
  const requestBody: Buffer[] = []
  const responseBody: Buffer[] = []
  Request.onData(req, requestBody.push.bind(requestBody))
  Response.onData(res, responseBody.push.bind(responseBody))
  await Response.waitEnd(res)

  const playback = generatePlayback(req, res, options, requestBody, responseBody)
  console.dir(playback, {colors: true, depth: 5})
}
