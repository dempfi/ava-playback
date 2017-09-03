import { RequestOptions, IncomingMessage, ClientRequest } from 'http'

export type Request = ClientRequest
export type Options = RequestOptions & { __recording__: boolean, __https__: boolean }
export type Response = IncomingMessage
export type Callback = (res: Response) => void
export type RequestMaker = (options: Options, cb?: Callback) => Request
export type Overrider = (
  protocol: string,
  overridenRequest: RequestMaker,
  options: string | Options,
  callback?: Callback
) => Request
