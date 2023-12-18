# sf-toolbox-aep-utils

[![NPM](https://img.shields.io/npm/v/sf-toolbox-aep-utils.svg?label=sf-toolbox-aep-utils)](https://www.npmjs.com/package/sf-toolbox-aep-utils) [![Downloads/week](https://img.shields.io/npm/dw/sf-toolbox-aep-utils.svg)](https://npmjs.org/package/sf-toolbox-aep-utils) [![License](https://img.shields.io/badge/License-BSD%203--Clause-brightgreen.svg)](https://raw.githubusercontent.com/salesforcecli/sf-toolbox-aep-utils/main/LICENSE.txt)

## Install

```bash
sf plugins install sf-toolbox-aep-utils@x.y.z
```

## Issues

Please report any issues at https://github.com/ImJohnMDaniel/sf-toolbox-aep-utils/issues

### Build

To build the plugin locally, make sure to have yarn installed and run the following commands:

```bash
# Clone the repository
git clone git@github.com:salesforcecli/sf-toolbox-aep-utils

# Install the dependencies and compile
yarn && yarn build
```

To use your plugin, run using the local `./bin/dev` or `./bin/dev.cmd` file.

```bash
# Run using local run file.
./bin/dev {{some command}}
```

There should be no differences when running via the Salesforce CLI or using the local run file. However, it can be useful to link the plugin to do some additional testing or run your commands from anywhere on your machine.

```bash
# Link your plugin to the sf cli
sf plugins link .
# To verify
sf plugins
```

## Commands

<!-- commands -->

<!-- commandsstop -->
