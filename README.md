<h1 align="center">Resolve Team</h1>

<div align="center">

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)
[![npm version](https://img.shields.io/npm/v/resolve-team.svg?style=flat)](https://www.npmjs.com/package/resolve-team)
[![Build Status](https://img.shields.io/travis/fearandesire/resolve-team/master.svg?style=flat)](https://travis-ci.org/fearandesire/resolve-team)

</div>

---

<p align="center"> An intuitive sports team name / details resolver using fuzzy search. </p>

## Table of Contents
- [Table of Contents](#table-of-contents)
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

`teamResolver` function accepts the following parameters:

| Parameter | Type   | Description                           |
|-----------|--------|---------------------------------------|
| sport     | string | The sport category ('nba' or 'nfl').  |
| query     | string | Team name or abbreviation to search.  |
| options   | object | (Optional) Customization options.     |

### Options

Customize your search with the following options:

| Property  | Type    | Default | Description                               |
|-----------|---------|---------|-------------------------------------------|
| threshold | number  | 0.4     | Search sensitivity (0-1). Lower is stricter. |
| full      | boolean | false   | If true, returns the complete team object.   |


### Examples

```js
import teamResolver from 'resolve-team';

// Basic name resolution
const nbaTeam = teamResolver('nba', 'BOS'); // 'Boston Celtics'

// Fuzzy search with threshold
const nflTeam = teamResolver('nfl', 'New Y', { threshold: 0.6 }); // 'New York Giants'

// Full team object
const fullTeam = teamResolver('nfl', 'CHI', { full: true });
// Returns full Chicago Bears team object
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