<h1 align="center">Resolve Team</h1>

<div align="center">

![NPM Downloads](https://img.shields.io/npm/d18m/resolve-team)
[![npm version](https://img.shields.io/npm/v/resolve-team.svg?style=flat)](https://www.npmjs.com/package/resolve-team)

</div>

<p align="center">Identify & retrieve sports team data instantly</p>

---

> [!WARNING]  
> Breaking Change: The standalone `resolveTeam` function is now deprecated and will be removed in future versions. We recommend migrating to the new `TeamResolver` class for improved functionality and future updates.


## Examples 

```ts
import { teamResolver } from 'resolve-team'

// Standard usage - returns team name
const nbaTeam = await teamResolver.resolve('Bos') // 'Boston Celtics'

// Fuzzy search example
const nflTeam = await teamResolver.resolve('gia') // 'New York Giants'

// Retrieving the full team object (name, colors, nicknames, abbrev, sport)
const fullTeam = await teamResolver.resolve('celtics', { full: true })
/**
  {
      name: 'Boston Celtics',
      colors: ['#007A33', '#BA9653', '#000000'],
      nicknames: ['celtics', 'boston', 'bos', 'celt'],
      abbrev: ['BOS'],
      sport: 'nba'
  }
 */

// Compare if two queries resolve to the same team
const areSame = await teamResolver.compare('lakers', 'lal') // true

// Legacy usage (deprecated)
import { resolveTeam } from 'resolve-team'
const legacyResult = await resolveTeam('nyk', { sport: 'nba' }) // 'New York Knicks'
```

## ToC
1. [Examples](#examples)
2. [ToC](#toc)
3. [Overview](#overview)
4. [Installation](#installation)
5. [Usage](#usage)
   1. [Parameters](#parameters)
      1. [_Options_](#options)
   2. [Methods](#methods)
      1. [`resolve()`](#resolve)
      2. [`compare()`](#compare)
6. [`Team` API Reference](#team-api-reference)
7. [Purpose](#purpose)
8. [Notes](#notes)
9. [Contributing](#contributing)
10. [Authors](#authors)
11. [License](#license)

## Overview
**Resolve Team** is a lightweight, simple API that effortlessly identifies sports teams based on input. Partial or misspelled names or abbreviations are irrelevant. Utilizing Fuse.js, it provides a powerful fuzzy search functionality for resolving sports teams.

## Installation
To integrate Resolve Team into your project, you can install it via your favorite package manager.

```bash
npm i resolve-team

yarn i resolve-team

pnpm i resolve-team

bun i resolve-team
```

---
## Usage
After installation, you can use the library by importing the `teamResolver`.

### Parameters

| Parameter | Type   | Description                              |
| --------- | ------ | ---------------------------------------- |
| query     | string | The team name or abbreviation to search. |
| options   | object | Configures the search and returned data  |

#### _Options_

Customization options available:

| Property  | Type    | Default   | Options             | Description                                             |
| --------- | ------- | --------- | ------------------- | ------------------------------------------------------- |
| sport     | string  | **'all'** | 'all', 'nba', 'nfl' | Filter search to a specific sport (e.g., 'nba', 'nfl'). |
| threshold | number  | 0.4       | 0-1                 | Search sensitivity (0-1). Lower values are stricter.    |
| full      | boolean | false     | true                | If true, returns the complete team object.              |

### Methods

#### `resolve()`
```ts
// Basic resolution
const team = await teamResolver.resolve('lakers')

// Full team data
const fullTeam = await teamResolver.resolve('lakers', { full: true })

// With options
const result = await teamResolver.resolve('ny', {
  sport: 'nfl',
  threshold: 0.3
})
```

#### `compare()`
```ts
// Compare two team queries
const areSame = await teamResolver.compare('lakers', 'lal')
console.log(areSame) // true

// With custom options
const strictCompare = await teamResolver.compare('giants', 'nyg', {
  threshold: 0.3
})
```

## `Team` API Reference
[Team](src/interfaces.ts) Interface - This is the expected response when you enable the `full` option from the library. 

```ts
interface Team {
  name: string
  colors: string[]
  nicknames: string[]
  abbrev: string[]
  sport: string
}
```

## Purpose

This library was designed as I work on several sports related projects and was often in need of a simple way to identify sports teams based on abbreviations and the like.
At it's core - this library will remain as lightweight as possible while focusing on it's core ability to identify sports teams. Future updates will focus on more complex features, while aiming to keep the library's core principles.

## Notes

While this library allows specifying a sport in the options, this acts as a search preference rather than a strict filter. The fuzzy search algorithm will still return the best matching team across all sports if a closer match exists. This design choice maintains the library's core strength of always finding the most relevant team match.

## Contributing
Contributions are welcome and greatly appreciated! Please make a PR or open an issue. I'd love to expand the library to include:
- More Sports and their teams
- Fine-tune the fuzzy-search
- Provide better filtering options
- Add strict sport validation options
  - i.e. ability to specify a sport and when a match is for another sport, it returns null/false

## Authors
- [@fearandesire](https://github.com/fearandesire) - Initial Creator

## License
This project is licensed under the MIT License—see the [LICENSE](LICENSE) file for details.

[Back To The Top](#toc)
