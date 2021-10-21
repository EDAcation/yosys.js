#!/bin/bash
set -e

# Create build directory
rm -rf build
mkdir -p build

# Apply patch
patch -p0 -f < Makefile.patch

# Configure Yosys for WebAssembly build
cd yosys
make config-emcc

# Build browser version
make -j $(nproc) EMCC_LDLIBS="-lidbfs.js -lworkerfs.js"
mv yosys.js ../build/yosys.browser.js
cp yosys.wasm ../build

# Build Node.js version (mostly cached)
make -j $(nproc) EMCC_LDLIBS="-lnodefs.js"
mv yosys.js ../build/yosys.node.js

# Fix FS exports
# sed -i 's|var FS=|var FS=Module.FS=|' ../build/yosys.*.js

# Publish npm package
cd ..
yarn run build

# Undo patch
patch -p0 -f -R < Makefile.patch
