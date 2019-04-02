import * as fs from 'fs'
import * as path from 'path'
import * as config from 'pkg-conf'
import playback from './playback'
import record from './record'

// Get project path - looks for required 'name' property in package.json
// then using 'pkg-conf' gets filepath and thus the dirname of the package.json
const projectPath = path.dirname(config.filepath(config.sync('name')))

let avaConfig
const avaConfigPath = path.join(projectPath, 'ava.config.js')
if(fs.existsSync(avaConfigPath)) {
    avaConfig = require(avaConfigPath).default
    avaConfig = avaConfig.playbacks ? avaConfig : { playbacks: 'playbacks' }
} else {
    avaConfig = config.sync<{ playbacks?: string }>('ava', { defaults: { playbacks: 'playbacks' } })
}

const playbacksPath = path.join(projectPath, avaConfig.playbacks)
if (!fs.existsSync(playbacksPath)) fs.mkdirSync(playbacksPath)

const mode = process.env.AVA_PLAYBACK
if (mode === 'record') record(playbacksPath)
if (mode === 'play') playback(playbacksPath)
