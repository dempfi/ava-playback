type Headers = { [k: string]: string }

const isBuffer = Buffer.isBuffer
const isString = (a: any): a is string => typeof a === 'string'

const isContentEncoded = (headers: Headers) => {
  const encoding = headers['content-encoding']
  return isString(encoding) && encoding !== ''
}

const isBinaryBuffer = (buffer: Buffer) => {
  if (!isBuffer(buffer)) return false

  const reconstructedBuffer = new Buffer(buffer.toString('utf8'), 'utf8')
  if (buffer.length !== reconstructedBuffer.length) return true

  for (var i = 0; i < buffer.length; ++i)
    if (buffer[i] !== reconstructedBuffer[i])
      return true

  return false
}

const mergeBuffers = (chunks: Buffer[]) => {
  if (chunks.length === 0) return new Buffer(0)
  if (!isBuffer(chunks[0])) return new Buffer(chunks.join(''), 'utf8')
  return Buffer.concat(chunks)
}

const processEncodedBuffers = (chunks: Buffer[]) => chunks.map(c => {
  if (!isBuffer(c) && isString(c)) c = new Buffer(c)
  return c.toString('hex')
})

export default (chunks: Buffer[], headers: Headers = {}) => {
  if (isContentEncoded(headers)) return processEncodedBuffers(chunks)
  const mergedBuffers = mergeBuffers(chunks)
  if (isBinaryBuffer(mergedBuffers)) return mergedBuffers.toString('hex')

  const stringified = mergedBuffers.toString('utf8')
  if (stringified.length === 0) return {}
  try { return JSON.parse(stringified) }
  catch (errr) { return stringified }
}
