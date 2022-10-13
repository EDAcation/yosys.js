#!/bin/bash
set -e

# Ensure all submodules are present (recursive)
git submodule update --init --recursive

# Create build directory
rm -rf build
mkdir -p build

# Apply patches
patch -p0 -f < yosys.patch

# Configure WebAssembly build
cd yosys
make config-emcc

# Build browser version
make -j $(nproc) EMCC_LDLIBS="-lidbfs.js -lworkerfs.js"
sed -i 's|var FS=|var FS=Module.FS=|' yosys.js
mv yosys.js ../build/yosys.browser.js
cp yosys.wasm ../build

# Build Node,js version (mostly cached)
make -j $(nproc) EMCC_LDLIBS="-lnodefs.js"
sed -i 's|var FS=|var FS=Module.FS=|' yosys.js
mv yosys.js ../build/yosys.node.js

# Clean up
make clean
cd ..

# Undo patches
patch -p0 -f -R < yosys.patch

# Build npm package
yarn run build
