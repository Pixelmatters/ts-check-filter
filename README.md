<h1 align="center">
  TS Check Filter
</h1>

<h3 align="center">
  A filter for TypeScript errors.
</h3>

<p align="center">
This is useful when using code-generation tools or while migrating to a strict `tsconfig.json`, allowing a smother and incremental transition.
</p>

<p align="center">
  <a href="https://github.com/Pixelmatters/ts-check-filter/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="ts-check-filter is released under the MIT license." />
  </a>
  <a href="https://www.npmjs.com/package/@pixelmatters/ts-check-filter">
    <img src="https://img.shields.io/npm/v/@pixelmatters/ts-check-filter.svg" alt="Current npm package version." />
  </a>
  <a href="https://github.com/Pixelmatters/ts-check-filter/blob/main/CONTRIBUTING.md">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs welcome!" />
  </a>
  <a href="https://twitter.com/intent/follow?screen_name=pixelmatters_">
    <img src="https://img.shields.io/twitter/follow/pixelmatters_.svg?label=Follow%20@pixelmatters_" alt="Follow @pixelmatters_" />
  </a>
</p>

## Features

* Ignore files based on relative path or regular expression
* Ignore specific TS errors

## Why can not be excluded on TypeScript?

The `exclude` option in `tsconfig.json` makes tsc not directly check the file. Unfortunately, if the file is used from another checked file, it will report an error. This way, it will not solve some use cases.

## Usage

To use the filter pipe the results into `ts-check-filter`:

```bash
tsc --noEmit | npx ts-check-filter
```

> **Note:** If you don't pep anything into the filter it will be waiting for ever for an input.

### Options

Display the list of options by executing:

```
npx ts-check-filter --help
```

## Development

For the development is recommended to use [PNPM](https://pnpm.io/), since is the tool that is being used to manage dependencies. So to install just run:

```bash
pnpm install
```

To test implementation and check if the code follows the right guidelines, please run:

```bash
pnpm test
```

## :memo: License

Licensed under the [BSD-2 License](./LICENSE).
