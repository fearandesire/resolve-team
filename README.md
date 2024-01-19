<h1 align="center">Resolve Team</h1>

<div align="center">

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)
[![npm version](https://img.shields.io/npm/v/resolve-team.svg?style=flat)](https://www.npmjs.com/package/resolve-team)

</div>

---

<p align="center"> An intuitive sports team name / details resolver using fuzzy search. </p>



## Table of Contents
- [Table of Contents](#table-of-contents)
- [🚨 Breaking Changes in v1.4 🚨](#-breaking-changes-in-v14-)
  - [Changed Default Import](#changed-default-import)
  - [API Param Change](#api-param-change)
  - [Search All Sports](#search-all-sports)
- [About Resolve Team](#about-resolve-team)
- [Getting Started](#getting-started)
  - [Installation](#installation)
- [Usage, Parameters, and Options](#usage-parameters-and-options)
  - [Usage](#usage)
  - [Parameters](#parameters)
  - [Options](#options)
  - [Examples](#examples)
- [Built With](#built-with)
  - [Contributing, Authors, and License](#contributing-authors-and-license)
- [Contributing](#contributing)
- [Authors](#authors)
- [License](#license)
- [Back To The Top](#back-to-the-top)

## 🚨 Breaking Changes in v1.4 🚨
We've made some significant improvements in version 1.4! Here's what you need to know:

### Changed Default Import
The default export has been changed from 'teamResolver' to 'resolveTeam'
- **Old**: `import teamResolver from 'resolve-team'`
  
- **New**: `import resolveTeam from 'resolve-team'`

### API Param Change
The API has updated the order of parameters.

- **Old**: `resolveTeam(sport, team, options)`

- **New**: `resolveTeam(team, options)`

### Search All Sports
`sport` parameter has moved into `options` and **by default, it is set to search `all` sports if one is not provided.**

## About Resolve Team
Resolve Team is a sports team name resolver that efficiently translates team abbreviations or partial names into complete team information. Using the power of Fuse.js for fuzzy search, it's perfect for quickly identifying sports teams across the NBA and NFL.

Currently resolves the following team information:
- Name
- Nicknames
- Abbreviations
- Colors


## Getting Started

### Installation
To use Resolve Team in your project, install it via npm:

```bash
npm install resolve-team
```


## Usage, Parameters, and Options

### Usage

### Parameters

The `teamResolver` API accepts the following parameters:

| Parameter | Type   | Description                           |
|-----------|--------|---------------------------------------|
| team     | string | Team name or abbreviation to search.  |
| options   | object | (Optional) Customization options.     |

### Options

Customize your search with the following options:

| Property  | Type    | Default | Description                               |
|-----------|---------|---------|-------------------------------------------|
| sport     | string  | 'all'   | The sport category ('nba' or 'nfl').    |
| threshold | number  | 0.4     | Search sensitivity (0-1). Lower is stricter. |
| full      | boolean | false   | If true, returns the complete team object.   |


### Examples

```js
import teamResolver from 'resolve-team';

// Basic name resolution
const nbaTeam = teamResolver(`Bos`); // 'Boston Celtics'

// Fuzzy search
const nflTeam = teamResolver('gia'); // 'New York Giants'

// Full team object
const fullTeam = teamResolver('celtics', { full: true });
/**
 // Resolves to:
 {
  name: 'Boston Celtics',
  colors: ['#007A33', '#BA9653', '#000000'],
  nicknames: ['celtics', 'boston', 'bos', 'celt'],
  abbrev: ['BOS']
 }
 */

// Limit to sport
const nbaTeam2 = teamResolver('nyk', { sport: 'nba' }); // 'New York Knicks'
```

## Built With
Fuse.js - Fuzzy search library
TypeScript - JavaScript with syntax for types


### Contributing, Authors, and License

## Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

## Authors
- [@fearandesire](https://github.com/fearandesire) - Initial work

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## [Back To The Top](#table-of-contents)