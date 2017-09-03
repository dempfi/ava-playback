import test from 'ava'
import * as requet from 'request-promise-native'
import record from '../recorder'

record()

test('Flow', async t => {
  const response = await requet.get('http://api.github.com/repos/octokit/octokit.rb', {
    headers: { 'user-agent': 'ava-playback' }, json: true })
  t.true(typeof response === 'object')
})
