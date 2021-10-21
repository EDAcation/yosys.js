#!/bin/bash
set -e

# Apply patch
patch -p0 -f < Makefile.patch

# Configure Yosys for WebAssembly build
cd yosys
make config-emcc

# Build browser version
make -j $(nproc)
mv yosys.js yosys.browser.js

# Build Node.js version (mostly cached)
make EMCC_LDLIBS=-lnodefs.js -j $(nproc)
mv yosys.js yosys.node.js

# Fix FS exports
sed -i 's|var FS=|var FS=Module.FS=|' yosys.*.js
cd ..

# Publish npm package
yarn run build

# Undo patch
# TODO: always execute after patching, even if previous commands failed
patch -p0 -f -R < Makefile.patch
