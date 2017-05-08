import * as fs from 'fs'
import * as path from 'path'
import * as config from 'pkg-conf'
import playback from './playback'
import record from './record'

const avaConfing = config.sync<{ playbacks?: string }>('ava', { defaults: { playbacks: 'playbacks' } })
const projectPath = path.dirname(config.filepath(avaConfing))
const playbacksPath = path.join(projectPath, avaConfing.playbacks)

if (!fs.existsSync(playbacksPath)) fs.mkdirSync(playbacksPath)

const mode = process.env.AVA_PLAYBACK || 'play'
if (mode === 'record') record(playbacksPath)
if (mode === 'play') playback(playbacksPath)
