import * as I from '../interfaces'
import * as Request from './request'
import * as Response from './response'

export default async (protocol: string, options: I.Options, req: I.Request, res: I.Response) => {
  const requestBody: Buffer[] = []
  const responseBody: Buffer[] = []
  Request.onData(req, chunk => requestBody.push(chunk))
  Response.onData(res, chunk => responseBody.push(chunk))
  await Response.waitEnd(res)

  console.dir(Buffer.concat(requestBody).toString('utf8'))
  console.dir(Buffer.concat(responseBody).toString('utf8'))
}
