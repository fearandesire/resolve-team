<p align="center">

</p>

<h3 align="center">Resolve Team</h3>

<div align="center">

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> Quickly resolve sports team's names
    <br> 
</p>

  - [🧐 About](#🧐-About)
  - [🎈 Usage](#🎈-Usage)
  - [⛏️ Built Using](#⛏️-Built-Using)
  - [✍️ Authors](#✍️-Authors)



## 🧐 About
Resolve Team is a sports team name resolver that returns to you the name of the team via fuzzy search, using FuseJS.

This module was created as I was unable to locate anything similar, and had this implmented in an existing project.

### Installing

Simply run the following command

```
npm i resolve-team
```

# 🎈 Usage

### Parameters

`teamResolver` accepts 3 parameters, with the third one being optional:

| Parameter  | Type   | Description               |
| ---------- | ------ | ------------------------- |
| sport      | string | 'nba' or 'nfl'            |
| query      | string | Team name or abbreviation |
| options    | object | Customization options     |

### Options

`options` is an object with the following properties:

| Property   | Type    | Default | Description                                   |
| ---------- | ------- | ------- | --------------------------------------------- |
| threshold  | number  | 0.4     | Controls the FuseJS search threshold (0-1).   |
| full       | boolean | false   | If true, returns the full team object.        |

- `threshold`: Accepts a number between 0 and 1 which controls the search sensitivity. Lower values are stricter matches.
- `full`: If set to true, returns the full team object instead of just the name.

### Examples

```js
import teamResolver from 'resolve-team'

// Example 1: Using the team abbreviation
const team1 = teamResolver('nba', 'BOS');
console.log(team1); // => 'Boston Celtics'

// Example 2: Using a partial team name
const team2 = teamResolver('nfl', 'New Y');
console.log(team2); // => 'New York Giants'

// Example 3: Customizing the search threshold
const options = { threshold: 0.6 };
const team3 = teamResolver('nba', 'Warrios', options);
console.log(team3); // => 'Golden State Warriors'

// Example 4: Getting the full team object
const options = { full: true };
const team4 = teamResolver('nfl', 'CHI', fullTeamOptions);
console.log(team4); 

/**  Returns =>
{
name: 'Chicago Bears',
colors: ['#0B162A', '#C83803'],
nicknames: ['bears', 'chicago', 'chi'],


}
**/
```

## ⛏️ Built Using

### Dependencies

- [fuse.js](https://www.npmjs.com/package/fuse)
- [typescript](https://www.npmjs.com/package/typescript)

### Dev Dependencies
- [@types/node](https://www.npmjs.com/package/@types/node)

## ✍️ Authors

- [@fearandesire](https://github.com/fearandesire) - Creator
