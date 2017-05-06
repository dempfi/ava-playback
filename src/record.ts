import * as nock from 'nock'
import * as path from 'path'
import * as sh from 'shorthash'
import * as fs from 'fs'

const bind = (f: Function, ...args: any[]) => f.bind(null, ...args)

const recordName = ({ method, path, body }: nock.NockDefinition) => {
  const hash = sh.unique(body || 'empty')
  const address = path.split('?')[0].replace(/\W+?/g, '_')
  return `${method}${address}-${hash}.json`.toLowerCase()
}

const saveRecord = (collection: string, record: nock.NockDefinition) => {
  const scope = record.scope.match(/^https?:\/\/[w.]*([\S][^\/:]+)/)![1]
  const scopeFolder = path.join(collection, scope)
  if (!fs.existsSync(scopeFolder)) fs.mkdirSync(scopeFolder)
  const recordPath = path.join(scopeFolder, recordName(record))
  if (fs.existsSync(recordPath)) return
  fs.writeFileSync(recordPath, JSON.stringify(record, null, 2), { encoding: 'utf8' })
}

const onMessage = (message: string, cb: () => void) =>
  process.on('message', ({ name }: { name: string }) => name === message && cb())

export default (collection: string) => {
  onMessage('ava-run', bind(nock.recorder.rec, { output_objects: true, dont_print: true }))
  onMessage('ava-teardown', () => (nock.recorder.play() as any).map(bind(saveRecord, collection)))
}
