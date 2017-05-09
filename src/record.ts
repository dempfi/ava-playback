import * as stringify from 'json-stable-stringify'
import { unique as shorthash } from 'shorthash'
import * as qs from 'querystring'
import * as nock from 'nock'
import { join } from 'path'
import * as fs from 'fs'

type Definition = nock.NockDefinition & { queries: any }

const lower = (s: string) => s.toLowerCase()
const bind = (f: Function, ...args: any[]) => f.bind(null, ...args)
const hash = (obj: any) => shorthash(stringify(obj))

const escapePath = (path: string) =>
  lower(path.replace(/\W+?/g, '_'))

const domain = (s: string) =>
  s.match(/^https?:\/\/[w.]*([\S][^\/:]+)/)![1]

const parse = (raw: string) => {
  try { return JSON.parse(raw) } catch (e) { return qs.parse(raw) }
}

const title = ({ method, path, body, queries }: Definition) => {
  return `${lower(method)}${escapePath(path)}-${hash(queries)}-${hash(body)}.json`
}

const prepareRecord = ({ path, body, ...rest }: Definition) => Object.assign(rest, {
  queries: qs.parse(path.split('?')[1]),
  body: body ? parse(body) : body,
  path: path.split('?')[0]
})


const saveRecord = (collection: string, record: Definition) => {
  const scopeFolder = join(collection, domain(record.scope))
  if (!fs.existsSync(scopeFolder)) fs.mkdirSync(scopeFolder)
  record = prepareRecord(record)
  const recordPath = join(scopeFolder, title(record))
  if (fs.existsSync(recordPath)) return
  console.log(`📼  [ava-playback] new playback is recorded: ${recordPath}`)
  fs.writeFileSync(recordPath, stringify(record, { space: 2 }), { encoding: 'utf8' })
}

export default (collection: string) => {
  console.log('📼  [ava-playback] running in record mode')
  nock.recorder.rec({ output_objects: true, dont_print: true })
  process.on('message', ({ name }: { name: string }) => {
    if (name === 'ava-teardown') (nock.recorder.play() as any).map(bind(saveRecord, collection))
  })
}
