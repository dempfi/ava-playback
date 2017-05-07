import * as stringify from 'json-stable-stringify'
import { parse } from 'querystring'
import * as sh from 'shorthash'
import * as nock from 'nock'
import { join } from 'path'
import * as fs from 'fs'

const bind = (f: Function, ...args: any[]) => f.bind(null, ...args)

const domain = (s: string) => s.match(/^https?:\/\/[w.]*([\S][^\/:]+)/)![1]

const recordTitle = ({ method, path, body }: nock.NockDefinition) => {
  const [address, qs] = path.split('?')
  const bodyHash = sh.unique(body || 'empty')
  const qsHash = sh.unique(stringify(Object.keys(parse(qs)).sort()))
  return `${method}${address.replace(/\W+?/g, '_')}-${qsHash}-${bodyHash}.json`.toLowerCase()
}

const saveRecord = (collection: string, record: nock.NockDefinition) => {
  const scopeFolder = join(collection, domain(record.scope))
  if (!fs.existsSync(scopeFolder)) fs.mkdirSync(scopeFolder)
  const recordPath = join(scopeFolder, recordTitle(record))
  if (fs.existsSync(recordPath)) return
  fs.writeFileSync(recordPath, stringify(record, { space: 2 }), { encoding: 'utf8' })
}

const onMessage = (message: string, cb: () => void) =>
  process.on('message', ({ name }: { name: string }) => name === message && cb())

export default (collection: string) => {
  onMessage('ava-run', bind(nock.recorder.rec, { output_objects: true, dont_print: true }))
  onMessage('ava-teardown', () => (nock.recorder.play() as any).map(bind(saveRecord, collection)))
}
