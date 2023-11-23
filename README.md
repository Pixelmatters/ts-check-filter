<h1 align="center">
  TS Check Filter
</h1>

<h3 align="center">
  A filter for TypeScript errors.
</h3>

<p align="center">
This is useful when using code-generation tools or while migrating to a strict <code>tsconfig.json</code>, allowing a smother and incremental transition.
</p>

<p align="center">
  <a href="https://github.com/Pixelmatters/ts-check-filter/blob/main/LICENSE">
    <img src="https://img.shields.io/npm/l/@pixelmatters/ts-check-filter" alt="ts-check-filter license." />
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

To install:

```bash
npm i @pixelmatters/ts-check-filter
```

To use the filter pipe the results into `ts-check-filter`:

```bash
tsc --noEmit | npx ts-check-filter
```

To define the paths to be ignored create a new `ts-check-filter.js` file on the project root:

```js
module.exports = {
  pathFilterRules: [/src\/__generated__\/.*/],
}
```

The `pathFilterRules` is an array of `string`s or `RegExp`. In the example above, we use a regular expression to ignore all the files under the `__generated__` directory.

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

## 🤝 How to Contribute

Whether you're helping us fix bugs, improve the docs, or spread the word, thank you! 💪 🧡

Check out our [**Contributing Guide**](https://github.com/Pixelmatters/tes-check-filter/blob/main/CONTRIBUTING.md) for ideas on contributing and setup steps.

## 📝 License

Licensed under the [BSD-2 License](./LICENSE).
