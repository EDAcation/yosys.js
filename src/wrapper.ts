export type EmscriptenFS = typeof FS;

export type YosysModuleOptions = Parameters<EmscriptenModuleFactory>[0];

export interface YosysModule extends EmscriptenModule {
    FS: EmscriptenFS;
}

export class Yosys {

    private module: YosysModule;

    protected constructor(module: YosysModule) {
        this.module = module;
    }

    getModule() {
        return this.module;
    }

    getFS() {
        return this.module.FS;
    }
}
