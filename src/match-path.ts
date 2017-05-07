import { parse } from 'querystring'
import { isEqualWith as isEqual } from 'lodash'

const skipAsterisk = (s: any) => { if (s === '*') return true }

export default (matcher: string, matching: string) => {
  const [matcherBase, matcherQs] = matcher.split('?')
  const [matchingBase, matchingQs] = matching.split('?')
  if (matcherBase !== matchingBase) return false
  if (matcherQs === matchingQs) return true
  return isEqual(parse(matcherQs), parse(matchingQs), skipAsterisk)
}
