import * as fs from 'fs'
import * as nock from 'nock'
import { parse } from 'querystring'
import { join as path } from 'path'
import {
  isPlainObject as isObject,
  escapeRegExp as escape,
  isEqualWith as isEqual,
  mapValues,
  isArray
} from 'lodash'

type Definition = nock.NockDefinition & { queries: any }

const bind = (f: Function, ...args: any[]) => f.bind(null, ...args)
const join = (str1: string) => (str2: string) => path(str1, str2)

const definePersistent = (defs: nock.NockDefinition[]) =>
  nock.define(defs).map(m => m.persist())

const skipAsterisk = (s: any) => {
  if (s === '*') return true
}

const pathMatcher = (path: string, queries: any, matching: string) => {
  const [matchingPath, matchingQueries] = matching.split('?')
  if (path !== matchingPath) return false
  const equality = isEqual(queries, parse(matchingQueries), skipAsterisk)
  return equality
}

const asteriskToRx = (value: any): any => {
  if (value === '*') return /.*/gi
  if (isArray(value)) return value.map(asteriskToRx)
  if (isObject(value)) return mapValues(value, asteriskToRx)
  return value
}

const defineMatchers = ({ queries, ...def }: Definition) => Object.assign(def, {
  path: bind(pathMatcher, def.path, queries),
  body: asteriskToRx(def.body)
})

const readFile = (filePath: string) =>
  fs.readFileSync(filePath, { encoding: 'utf8' })

const readRecord = (recordPath: string) =>
  JSON.parse(readFile(recordPath))

const recordsByScope = (scopeName: string) =>
  fs.readdirSync(scopeName)
    .map(join(scopeName))
    .map(readRecord)
    .map(defineMatchers)

export default (playbacksPath: string) => {
  console.log(`📼  [ava-playback] running in play mode. Using playbacks from ${playbacksPath}`)
  fs.readdirSync(playbacksPath)
    .map(join(playbacksPath))
    .map(recordsByScope)
    .map(definePersistent)
}
