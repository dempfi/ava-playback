import { RequestOptions, IncomingMessage, ClientRequest } from 'http'

export type Callback = (res: IncomingMessage) => void
export type Request = (options: RequestOptions, cb?: Callback) => ClientRequest
export type Overrider = (
  protocol: string,
  overridenRequest: Request,
  options: string | RequestOptions,
  callback?: Callback
) => ClientRequest
