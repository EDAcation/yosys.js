# Development

## Setup
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

## Running
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
