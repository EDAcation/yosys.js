import UntypedInitYosys from '../../build/yosys.browser';
import {Yosys, YosysModule, YosysModuleOptions} from '../wrapper';

const InitYosys: EmscriptenModuleFactory<YosysModule> = UntypedInitYosys;

interface YosysBrowserOptions {
    urlPrefix?: string;
}

class YosysBrowser extends Yosys {

    static async initialize(moduleOptions: YosysModuleOptions, options: YosysBrowserOptions = {}) {
        if (options.urlPrefix) {
            moduleOptions.locateFile = (path) => `${options.urlPrefix}${path}`;
        }

        return new Yosys(await InitYosys(moduleOptions));
    }
}

export {
    YosysBrowser as Yosys,
    YosysModule,
    YosysModuleOptions
};
