[![CI](https://github.com/blok-codes/-blok-codes-red-twig/actions/workflows/main.yml/badge.svg)](https://github.com/blok-codes/-blok-codes-red-twig/actions/workflows/main.yml)
[![Node](https://img.shields.io/node/v/@blok-codes/red-twig.svg)](https://nodejs.org/download/release/latest-v16.x/)
![GitHub](https://img.shields.io/github/license/blok-codes/-blok-codes-red-twig)

@blok-codes/red-twig
=================

    Famix TypeScript Importer

<br/>

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->


# Usage
<!-- usage -->
```sh
$ git clone https://github.com/blok-codes/-blok-codes-red-twig.git
$ cd path/to/-blok-codes-red-twig
$ yarn install && yarn build

$ node ./bin/run COMMAND
running command...

$ node ./bin/run (--version)
@blok-codes/red-twig/0.0.1 linux-x64 node-v16.14.2

$ node ./bin/run --help [COMMAND]
USAGE
  $ red-twig COMMAND
...
```
<!-- usagestop -->


### Alternative usage
<!-- usage -->
```sh
$ git clone https://github.com/blok-codes/-blok-codes-red-twig.git
$ cd path/to/-blok-codes-red-twig
$ yarn install && yarn start

$ red-twig COMMAND
running command...

$ red-twig (--version)
@blok-codes/red-twig/0.0.1 linux-x64 node-v16.14.2

$ red-twig --help [COMMAND]
USAGE
  $ red-twig COMMAND
...
```
<!-- usagestop -->

# Commands
<!-- commands -->
* [`red-twig import [PROJECT]`](#red-twig-import-project)
* [`red-twig autocomplete [SHELL]`](#red-twig-autocomplete-shell)
* [`red-twig help [COMMAND]`](#red-twig-help-command)

## `red-twig import [PROJECT]`
import typescript project to generate a model

```
USAGE
  $ node ./bin/run import [PROJECT] -o <output> -f <format>
  $ red-twig import [PROJECT] -o <output> -f <format>

ARGUMENTS
  PROJECT  path to the typescript project to import

FLAGS
  -o, --output=<value>  (required) path to generate the model the output file
  -f, --format=<value>  (option) format of the output file (json)

DESCRIPTION
  Import typescript project to generate a model

EXAMPLES
  $ node ./bin/run import path/to/typescript/project -o path/to/output/ -f json
  $ red-twig import path/to/typescript/project -o path/to/output/ -f json
```

_See code: [import command](app/Console/import.ts)_

## `red-twig autocomplete [SHELL]`

display autocomplete installation instructions

```
USAGE
  $ node ./bin/run autocomplete [SHELL] [-r]
  $ red-twig autocomplete [SHELL] [-r]

ARGUMENTS
  SHELL  shell type

FLAGS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

DESCRIPTION
  display autocomplete installation instructions

EXAMPLES
  $ node ./bin/run autocomplete
  $ red-twig autocomplete

  $ node ./bin/run autocomplete bash
  $ red-twig autocomplete bash

  $ node ./bin/run autocomplete zsh
  $ red-twig autocomplete zsh

  $ node ./bin/run autocomplete --refresh-cache
  $ red-twig autocomplete --refresh-cache
```

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v1.2.0/src/commands/autocomplete/index.ts)_

## `red-twig help [COMMAND]`

Display help for red-twig.

```
USAGE
  $ node ./bin/run help [COMMAND] [-n]
  $ red-twig help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for red-twig.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.11/src/commands/help.ts)_
<!-- commandsstop -->

# Known Issues
_See [issues](./ISSUES.md)_

## Import the JSON into Moose 🫎

```st
'.\JSONModels\TypeScriptModel.json' asFileReference readStreamDo:
[ :stream | model := FamixTypeScriptModel new importFromJSONStream: stream. model install ].
```
