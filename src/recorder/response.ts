import { IncomingMessage } from 'http'

type Callback = (chunks: Buffer[]) => void

export class Response {
  private encoding?: string
  private chunks: Buffer[] = []

  private constructor(
    private response: IncomingMessage,
    private subscriber: Callback
  ) {
    this.subscribe()
    this.mockPush()
    this.mockSetEncoding()
  }

  static onEnd = (response: IncomingMessage, cb: Callback) =>
    new Response(response, cb)

  private mockSetEncoding() {
    const original = this.response.setEncoding
    this.response.setEncoding = (encoding: string) => {
      this.encoding = encoding
      return original.call(this.response, encoding)
    }
  }

  private mockPush() {
    const original = this.response.push
    this.response.push = (chunk: any, encoding?: string) => {
      if (!chunk) return original.call(this.response, chunk, encoding)
      if (this.encoding) chunk = new Buffer(chunk, this.encoding)
      this.chunks.push(chunk)
      return original.call(this.response, chunk, encoding)
    }
  }

  private subscribe() {
    this.response.once('end', () => this.subscriber(this.chunks))
  }
}
