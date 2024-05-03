<h1 align="center">Resolve Team</h1>

<div align="center">

![NPM Downloads](https://img.shields.io/npm/d18m/resolve-team)
[![npm version](https://img.shields.io/npm/v/resolve-team.svg?style=flat)](https://www.npmjs.com/package/resolve-team)

</div>

<p align="center"> An intuitive sports team name and details resolver using fuzzy search. </p>

---

## Contents
- [Overview](#overview)
- [Installation](#installation)
- [Usage](#usage)
- [`Team` API Reference](#team-api-reference)
- [Examples](#examples)
- [Contributing](#contributing)
- [Authors](#authors)
- [License](#license)

## Overview
**Resolve Team** is a lightweight, easy-to-use library that effortlessly identifies sports teams based on partial input, misspelled, or full names, making basic team data available instantly. Utilizing Fuse.js, it provides a powerful fuzzy search functionality for resolving sports team names, the best and only library to do this.

---


## Installation
To integrate Resolve Team into your project, you can install it via npm:

_Via `npm`_
```bash
npm install resolve-team
```
_Via `yarn`_
```bash
yarn add resolve-team
```
---
## Usage
After installation, you can use the library to resolve sports team names by importing the `resolveTeam` function.

### Parameters

| Parameter | Type   | Description                                        |
|-----------|--------|----------------------------------------------------|
| team      | string | The team name or abbreviation to search.           |
| options   | object | (Optional) Configures the search and returned data |

#### _Options_

Customization options available:

| Property  | Type    | Default | Description                                           |
|-----------|---------|---------|-------------------------------------------------------|
| sport     | string  | 'all'   | Specific sport category (e.g., 'nba', 'nfl').         |
| threshold | number  | 0.4     | Search sensitivity (0-1). Lower values are stricter.  |
| full      | boolean | false   | If true, returns the complete team object.            |
## `Team` API Reference
[Team](src/interfaces.ts) Interface - This is provided when you use the `full` option from the library. 

```ts
interface Team {
  name: string
  colors: string[]
  nicknames: string[]
  abbrev: string[]
}
```

## Examples

Basic usage and examples of the `resolveTeam` function:

```ts
import { resolveTeam } from 'resolve-team'

// Standard usage, resolves the team name directly.
const nbaTeam = resolveTeam(`Bos`) // 'Boston Celtics'

// Fuzzy search example
const nflTeam = resolveTeam('gia') // 'New York Giants'

// Retrieving the full team object
const fullTeam = resolveTeam('celtics', { full: true })
/**
 * Resolves with the complete team object:
	{
	    name: 'Boston Celtics',
	    colors: ['#007A33', '#BA9653', '#000000'],
	    nicknames: ['celtics', 'boston', 'bos', 'celt'],
	    abbrev: ['BOS'],
	}
 */

// Limit search to a specific sport
const nbaTeam2 = resolveTeam('nyk', { sport: 'nba' }) // 'New York Knicks'
```

## Contributing
Contributions are welcome and greatly appreciated! Please make a PR or open an issue. I'd love to expand the library to include more sports, teams, nicknmaes, etc.

## Authors
- [@fearandesire](https://github.com/fearandesire) - Initial Creator

## License
This project is licensed under the MIT License—see the [LICENSE](LICENSE) file for details.

[Back To The Top](#table-of-contents)
