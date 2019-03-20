import * as fs from 'fs'
import * as path from 'path'
import * as config from 'pkg-conf'
import playback from './playback'
import record from './record'

const projectPath = __dirname

let avaConfig
if(fs.existsSync(path.join(__dirname, 'ava.config.js'))) {
    avaConfig = require(path.join(projectPath, 'ava.config.js'))
} else {
    avaConfig = config.sync<{ playbacks?: string }>('ava', { defaults: { playbacks: 'playbacks' } })
}

const playbacksPath = path.join(projectPath, avaConfig.playbacks)

if (!fs.existsSync(playbacksPath)) fs.mkdirSync(playbacksPath)

const mode = process.env.AVA_PLAYBACK
if (mode === 'record') record(playbacksPath)
if (mode === 'play') playback(playbacksPath)
