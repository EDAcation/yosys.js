/* eslint-disable @typescript-eslint/no-var-requires */
// @ts-ignore File only exists in dist folder
const InitYosys: EmscriptenModuleFactory<YosysModule> = require('../yosys/yosys.js');
/* eslint-enable @typescript-eslint/no-var-requires */

export type YosysModuleOptions = Parameters<EmscriptenModuleFactory>[0];

export interface YosysModule extends EmscriptenModule {
    // TODO: typing
    run: () => void;
}

export class Yosys {

    static async initialize(moduleOptions?: YosysModuleOptions, _options?: unknown) {
        return new Yosys(await InitYosys(moduleOptions));
    }

    private module: YosysModule;

    protected constructor(module: YosysModule) {
        this.module = module;
    }

    getModule() {
        return this.module;
    }
}
