import fs from 'fs';

import {Yosys} from '../dist';

const yosys = Yosys.initialize({
    // TODO: this does not work unless yosys.wasm is inside the project root (i.e. the demo folder) or its subfolders
    wasmBinary: fs.readFileSync(__dirname + '/../dist/yosys.wasm')
});
console.log(yosys);
