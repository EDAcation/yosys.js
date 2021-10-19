import {Yosys, YosysModule, YosysModuleOptions} from './wrapper';

interface YosysBrowserOptions {
    urlPrefix?: string;
}

class YosysBrowser extends Yosys {

    static async initialize(moduleOptions: YosysModuleOptions, options: YosysBrowserOptions) {
        if (options.urlPrefix) {
            moduleOptions.locateFile = (path) => `${options.urlPrefix}${path}`;
        }

        return super.initialize(moduleOptions);
    }
}

export {
    YosysBrowser as Yosys,
    YosysModule,
    YosysModuleOptions
};
