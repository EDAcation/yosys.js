import fs from 'fs';
import path from 'path';

import {Yosys, YosysModule, YosysModuleOptions} from './wrapper';

const WASM_BINARY = fs.readFileSync(path.join(__dirname, 'yosys.wasm'));

class YosysNodeJS extends Yosys {
    static async initialize(moduleOptions: YosysModuleOptions) {
        return super.initialize({
            wasmBinary: WASM_BINARY,
            ...moduleOptions
        });
    }
}

export {
    YosysNodeJS as Yosys,
    YosysModule,
    YosysModuleOptions
};
