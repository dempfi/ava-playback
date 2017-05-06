import * as nock from 'nock'
import * as fs from 'fs'
import { join as path } from 'path'
import { escapeRegExp as escape } from 'lodash'

const bind = (f: Function, ...args: any[]) => f.bind(null, ...args)
const join = (str1: string) => (str2: string) => path(str1, str2)

const definePersistent = (defs: nock.NockDefinition[]) =>
  nock.define(defs).map(m => m.persist())

const regexPath = (def: nock.NockDefinition) =>
  Object.assign(def, { path: new RegExp(escape(def.path.split('?')[0])) })

const readFile = (filePath: string) =>
  fs.readFileSync(filePath, { encoding: 'utf8' })

const readRecord = (recordPath: string) =>
  JSON.parse(readFile(recordPath))

const recordsByScope = (scopeName: string) =>
  fs.readdirSync(scopeName)
    .map(join(scopeName))
    .map(readRecord)
    .map(regexPath)

export default (playbacksPath: string) =>
  fs.readdirSync(playbacksPath)
    .map(join(playbacksPath))
    .map(recordsByScope)
    .map(definePersistent)
