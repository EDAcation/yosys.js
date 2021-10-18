#!/bin/bash
set -e

# Apply patch
patch -p0 -f < Makefile.patch

# Build WebAssembly
cd yosys
make config-emcc
make -j $(nproc)
sed -i 's|var FS=|var FS=Module.FS=|' yosys.js
cd ..

# Publish npm package
yarn run build

# Undo patch
patch -p0 -f -R < Makefile.patch
