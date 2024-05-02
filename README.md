<h1 align="center">Resolve Team</h1>

<div align="center">

![NPM Downloads](https://img.shields.io/npm/d18m/resolve-team)
[![npm version](https://img.shields.io/npm/v/resolve-team.svg?style=flat)](https://www.npmjs.com/package/resolve-team)

</div>

<p align="center"> An intuitive sports team name and details resolver using fuzzy search. </p>

---

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Usage](#usage)
- [API Reference](#api-reference)
  - [Parameters](#parameters)
  - [Options](#options)
  - [Examples](#examples)
- [Contributing](#contributing)
- [Authors](#authors)
- [License](#license)

## Introduction
**Resolve Team** is a lightweight, easy-to-use library that effortlessly identifies sports teams based on partial input, misspelled, or full names, making basic team data available instantly. Utilizing Fuse.js, it provides a powerful fuzzy search functionality for resolving sports team names, the best and only library to do this.

## Features
- **Fuzzy Search**: Resolve sports teams via misspelled, partial, or full names using Fuse.js.
- **Team Details**: Get detailed information about the resolved team, including name, nicknames, abbreviations, and colors.
- **Customizable**: Offers options to customize the search sensitivity and limit searches to specific sports.

## Getting Started

### Installation
To integrate Resolve Team into your project, you can install it via npm:

_Via `npm`_
```bash
npm install resolve-team
```
_Via `yarn`_
```bash
yarn add resolve-team
```

## Usage
After installation, you can use the library to resolve sports team names by importing the `resolveTeam` function.

### Parameters

The `resolveTeam` function accepts the following parameters:

| Parameter | Type   | Description                           |
|-----------|--------|---------------------------------------|
| team      | string | The team name or abbreviation to search. |
| options   | object | (Optional) Customization options.     |

#### Options

Customization options available:

| Property  | Type    | Default | Description                                           |
|-----------|---------|---------|-------------------------------------------------------|
| sport     | string  | 'all'   | Specific sport category (e.g., 'nba', 'nfl').         |
| threshold | number  | 0.4     | Search sensitivity (0-1). Lower values are stricter.  |
| full      | boolean | false   | If true, returns the complete team object.            |

#### Examples

Basic usage and examples of the `resolveTeam` function:

```js
import { resolveTeam } from 'resolve-team';

// Standard usage, will resolve the team name directly.
const nbaTeam = resolveTeam(`Bos`); // 'Boston Celtics'

// Fuzzy search example
const nflTeam = resolveTeam('gia'); // 'New York Giants'

// Retrieving the full team object
const fullTeam = resolveTeam('celtics', { full: true });
// Resolves to full team details

// Limit search to a specific sport
const nbaTeam2 = resolveTeam('nyk', { sport: 'nba' }); // 'New York Knicks'
```

## Contributing
Contributions are welcome and greatly appreciated. See [CONTRIBUTING.md](/CONTRIBUTING.md) for guidelines on how to contribute.

## Authors
- [@fearandesire](https://github.com/fearandesire) - Initial Creator

## License
This project is licensed under the MIT License—see the [LICENSE](LICENSE) file for details.

[Back To The Top](#table-of-contents)
