# yosys.js

WebAssembly version of [Yosys](https://github.com/YosysHQ/yosys). Automatic updates through a GitHub Actions workflow.

- [Installation](#installation)
  - [Node.js](#node.js)
  - [Browser](#browser)
  - [Parcel (and other bundlers)](#parcel)
- [Usage](#usage)
- [Example](#example)
- [Contributing](#Contributing)

## Installation
### Node.js
Add the dependency to your project.
```bash
# Using npm
npm install yosys

# Using yarn
yarn add yosys
```

In Node.js the WebAssembly binary is loaded from the file system, so no additional configuration is required.

```ts
import {Yosys} from 'yosys';

const yosys = await Yosys.initialize();
```

### Browser
Without using a bundler, like Parcel, you can't currently make use of the TypeScript wrapper. Instead, you need to directly load the Emscripten module from a CDN, from example from [unpkg.com](https://unpkg.com).
```html
<!-- Lock to a certain version (recommended) -->
<script src="https://unpkg.com/yosys@0.10.5/dist/yosys.js"></script>

<!-- Use latest version -->
<script src="https://unpkg.com/yosys/dist/yosys.js"></script>
```

The Emscripten module is now available on the global Window object. It will automatically load the WebAssembly binary from the same URL prefix. Again, note this is not the wrapper API as detailed below.
```html
<script>
    (async () => {
        const yosys = await Yosys();
    })();
</script>
```

### Parcel
Add the dependency to your project.
```bash
# Using npm
npm install yosys

# Using yarn
yarn add yosys
```

The WebAssembly binary has to be loaded from some external source, because Parcel does not replace the Node.js file system loading by itself. The easiest way to achieve this is by including it in the bundle using [Parcel's Node FS emulation](https://parceljs.org/features/node-emulation/#inlining-fs.readfilesync).

```ts
import fs from 'fs';
import path from 'path';

import {Yosys} from 'yosys';

const yosys = await Yosys.initialize({
    wasmBinary: fs.readFileSync(path.join(__dirname, '..', 'node_modules', 'yosys', 'dist', 'yosys.wasm'))
});
```

Alternatively, the WebAssembly binary can be loaded using for example the Fetch API.

```ts
import {Yosys} from 'yosys';

const request = await fetch('yosys.wasm');

const yosys = await Yosys.initialize({
    wasmBinary: await request.arrayBuffer();
});
```

## Usage
_TODO_

## Example
_TODO_

## Contributing
### Setup
The initial development setup can be performed as follows (at least for Debian/Ubuntu based systems).
```bash
# Clone the Git repository
git clone git@github.com:EDAcation/yosys.js.git
cd yosys.js

# Initialize Git submodules
git submodule update --init --recursive

# Install Yosys dependencies (see https://github.com/YosysHQ/yosys#setup for alternatives)
sudo apt update
sudo apt install -y bison build-essential clang flex gawk libboost-filesystem-dev libboost-python-dev libboost-system-dev libffi-dev libreadline-dev git graphviz pkg-config python3 tcl-dev xdot zlib1g-dev

# Install Node.js dependencies
yarn

# Install Node.js dependencies for the demo
cd example
yarn
cd ..

# Build Yosys
./build.sh
```

### Development
Start watching `src` for changes in the TypeScript code:
```
yarn run dev
```

Start the development server for the demo in another terminal tab:
```
cd example
yarn run dev
```

Go to http://localhost:1234 in a browser to see the demo.

### Submitting changes
Please create a pull request for each separate feature/fix on GitHub and clearly describe the changes.
