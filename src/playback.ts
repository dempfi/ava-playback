import * as nock from 'nock'
import * as fs from 'fs'
import { join as path } from 'path'
import { escapeRegExp as escape } from 'lodash'
import matchPath from './match-path'

const bind = (f: Function, ...args: any[]) => f.bind(null, ...args)
const join = (str1: string) => (str2: string) => path(str1, str2)

const definePersistent = (defs: nock.NockDefinition[]) =>
  nock.define(defs).map(m => m.persist())

const definPathMatcher = (def: nock.NockDefinition) =>
  Object.assign(def, { path: bind(matchPath, def.path) })

const readFile = (filePath: string) =>
  fs.readFileSync(filePath, { encoding: 'utf8' })

const readRecord = (recordPath: string) =>
  JSON.parse(readFile(recordPath))

const recordsByScope = (scopeName: string) =>
  fs.readdirSync(scopeName)
    .map(join(scopeName))
    .map(readRecord)
    .map(definPathMatcher)

export default (playbacksPath: string) =>
  fs.readdirSync(playbacksPath)
    .map(join(playbacksPath))
    .map(recordsByScope)
    .map(definePersistent)
