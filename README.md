<h1 align="center">Resolve Team</h1>

<div align="center">

![NPM Downloads](https://img.shields.io/npm/d18m/resolve-team)
[![npm version](https://img.shields.io/npm/v/resolve-team.svg?style=flat)](https://www.npmjs.com/package/resolve-team)

</div>

<p align="center">Identify & retrieve sports team data instantly</p>

---

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

## ToC
- [Examples](#examples)
- [Overview](#overview)
- [Installation](#installation)
- [Usage](#usage)
- [`Team` API Reference](#team-api-reference)
- [Contributing](#contributing)
- [Authors](#authors)
- [License](#license)

## Overview
**Resolve Team** is a lightweight, simple API that effortlessly identifies sports teams based on input. Partial or misspelled names or abbreviations are irrelevant. Utilizing Fuse.js, it provides a powerful fuzzy search functionality for resolving sports teams.

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
## Contributing
Contributions are welcome and greatly appreciated! Please make a PR or open an issue. I'd love to expand the library to include:
- More Sports and their teams
- Fine-tune the fuzzy-search
- Provide better filtering options

## Authors
- [@fearandesire](https://github.com/fearandesire) - Initial Creator

## License
This project is licensed under the MIT License—see the [LICENSE](LICENSE) file for details.

[Back To The Top](#toc)
