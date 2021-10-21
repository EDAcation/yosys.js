import fs from 'fs';
import path from 'path';

import UntypedInitYosys from '../../build/yosys.node';
import {Yosys, YosysModule, YosysModuleOptions} from '../wrapper';

const InitYosys: EmscriptenModuleFactory<YosysModule> = UntypedInitYosys;

const WASM_BINARY = fs.readFileSync(path.join(__dirname, 'yosys.wasm'));

class YosysNodeJS extends Yosys {
    static async initialize(moduleOptions: YosysModuleOptions) {
        return new Yosys(await InitYosys({
            wasmBinary: WASM_BINARY,
            ...moduleOptions
        }));
    }
}

export {
    YosysNodeJS as Yosys,
    YosysModule,
    YosysModuleOptions
};
