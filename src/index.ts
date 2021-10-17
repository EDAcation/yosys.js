import fs from 'fs';
import path from 'path';

/* eslint-disable import/no-unresolved */
// @ts-ignore File only exists in dist folder
const InitYosys: EmscriptenModuleFactory<YosysModule> = import('./yosys.js');
/* eslint-enable import/no-unresolved */

export interface YosysModule extends EmscriptenModule {
    // TODO: typing
    run: () => void;
}

export class Yosys {
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
}
