
<h1 align="center">resolve-team</h1>

<div align="center">

![NPM Downloads](https://img.shields.io/npm/dm/resolve-team)
[![npm version](https://img.shields.io/npm/v/resolve-team.svg?style=flat)](https://www.npmjs.com/package/resolve-team)
[![License](https://img.shields.io/npm/l/resolve-team)](https://github.com/fearandesire/resolve-team/blob/main/LICENSE)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/resolve-team)](https://bundlephobia.com/package/resolve-team)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/fearandesire/resolve-team/pulls)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)](https://www.typescriptlang.org/)

</div>

<p align="center"><strong>Instantly identify & resolve sports team names with fuzzy search & more</strong></p>

<div align="center">
  <a href="#-features">Features</a> •
  <a href="#-installation">Installation</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-api-reference">API Reference</a> •
  <a href="#-examples">Examples</a>
</div>

---

> [!WARNING]  
> **Breaking Change**: The standalone `resolveTeam` function is now deprecated and will be removed in future versions. Please migrate to use `teamResolver` for improved functionality and future updates.

## ✨ Features

- **Fuzzy Search** - Resolves team names even with misspellings or partial matches
- **Multi-Sport Support** - Currently supports NBA and NFL teams, with plans to expand to other sports leagues
- **TypeScript Ready** - Full type definitions included
- **Lightweight** - resolve-team currently has 1 dependency, [fuse.js](https://fusejs.io/)
- **Team Comparison** - Compare if two queries resolve to the same team
- **Full Team Data** - Access team colors, nicknames, abbreviations, and more

## 📦 Installation

```bash
# Using npm
npm install resolve-team

# Using yarn
yarn add resolve-team

# Using pnpm
pnpm add resolve-team

# Using bun
bun add resolve-team
```

## 🚀 Quick Start

```typescript
import { teamResolver } from 'resolve-team';

// Resolve a team name with fuzzy matching
const team = await teamResolver.resolve('lakers');
console.log(team); // 'Los Angeles Lakers'

// Get full team details
const fullTeam = await teamResolver.resolve('celtics', { full: true });
console.log(fullTeam);
/*
{
  name: 'Boston Celtics',
  colors: ['#007A33', '#BA9653', '#000000'],
  nicknames: ['celtics', 'boston', 'bos', 'celt'],
  abbrev: ['BOS'],
  sport: 'nba'
}
*/

// Compare if two queries refer to the same team
const isSameTeam = await teamResolver.compare('nyg', 'giants');
console.log(isSameTeam); // true
```

## 🧰 API Reference

### `teamResolver.resolve(query, options?)`

Resolves a team based on the provided query string.

#### Parameters

| Parameter | Type     | Description                             | Required |
| --------- | -------- | --------------------------------------- | -------- |
| query     | `string` | Team name, nickname, or abbreviation    | Yes      |
| options   | `object` | Configuration options (see table below) | No       |

#### Options

| Option    | Type      | Default | Description                                          |
| --------- | --------- | ------- | ---------------------------------------------------- |
| sport     | `string`  | `'all'` | Limit search to a specific sport (`'nba'`, `'nfl'`)  |
| threshold | `number`  | `0.4`   | Search sensitivity (0-1). Lower = stricter matching  |
| full      | `boolean` | `false` | Return complete team object instead of just the name |

#### Returns

- If `options.full` is `false`: `Promise<string>` - Team name
- If `options.full` is `true`: `Promise<Team>` - Complete team object

### `teamResolver.compare(query1, query2, options?)`

Compares if two queries resolve to the same team.

#### Parameters

| Parameter | Type     | Description                        | Required |
| --------- | -------- | ---------------------------------- | -------- |
| query1    | `string` | First team query                   | Yes      |
| query2    | `string` | Second team query                  | Yes      |
| options   | `object` | Same options as `resolve()` method | No       |

#### Returns

`Promise<boolean>` - `true` if queries resolve to the same team

### Sports League Information Data

```typescript
// Get all NBA teams
const nbaTeams = await teamResolver.getNbaTeams(); // ['Atlanta Hawks', 'Boston Celtics', ....]

// Get all NFL teams
const nflTeams = await teamResolver.getNflTeams(); // ['Arizona Cardinals', 'Atlanta Falcons', ....]
```

### Team Interface

```typescript
interface Team {
  name: string;       // Full team name
  colors: string[];   // Team colors as hex codes
  nicknames: string[]; // Common nicknames and variations
  abbrev: string[];   // Official abbreviations
  sport: string;      // Sport identifier ('nba' or 'nfl')
}
```

## 📚 Examples

### Basic Usage

```typescript
import { teamResolver } from 'resolve-team';

// Works with partial names
const team1 = await teamResolver.resolve('Bos');  // 'Boston Celtics'

// Works with misspellings
const team2 = await teamResolver.resolve('cetis');  // 'Boston Celtics'

// Works with abbreviations
const team3 = await teamResolver.resolve('gia');  // 'New York Giants'
```

### Sport-Specific Resolution

```typescript
// Limit search to NFL teams
const nflTeam = await teamResolver.resolve('giants', { 
  sport: 'nfl',
  threshold: 0.3
});
console.log(nflTeam);  // 'New York Giants'
```

### Advanced Comparison

```typescript
// Check if teams are the same with custom threshold
const sameTeam = await teamResolver.compare('nyknicks', 'new york', {
  threshold: 0.2,
  sport: 'nba'
});
console.log(sameTeam);  // true
```

## 🛠️ Contributing

Contributions are welcome and greatly appreciated! Here are some ways you can contribute:

- Add support for additional sports leagues
- Fine-tune the fuzzy search algorithm
- Improve filtering options
- Add strict sport validation

Please check out our [contribution guidelines](CONTRIBUTING.md) before submitting PRs.

## 🔮 Roadmap

- [ ] Add MLB (Major League Baseball) teams
- [ ] Add NHL (National Hockey League) teams
- [ ] Add Premier League teams
- [ ] Strict sport validation option
- [ ] Team logo URL support

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- [@fearandesire](https://github.com/fearandesire) - Creator & Maintainer
