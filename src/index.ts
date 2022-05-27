import fs from 'fs';
import path from 'path';

/* eslint-disable @typescript-eslint/no-var-requires */
const packageJson = require('../package.json');

const InitYosys: EmscriptenModuleFactory<YosysModule> = require('./yosys.node.js');
/* eslint-enable @typescript-eslint/no-var-requires */

export type EmscriptenFS = typeof FS;

export interface YosysModule extends EmscriptenModule {
    FS: EmscriptenFS;
}

export class Yosys {

    static getVersion() {
        return packageJson.version;
    }

    static async initialize({wasmBinary, ...args}: Parameters<EmscriptenModuleFactory>[0] = {}) {
        return new Yosys(await InitYosys({
            wasmBinary: wasmBinary ? wasmBinary : fs.readFileSync(path.join(__dirname, 'yosys.wasm')),
            ...args
        }));
    }

    private module: YosysModule;

    constructor(module: YosysModule) {
        this.module = module;
    }

    getModule() {
        return this.module;
    }

    getFS() {
        return this.module.FS;
    }
}
