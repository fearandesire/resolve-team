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

## 📝 Table of Contents

- [About](#about)
- [Install](#install)
- [Usage](#usage)
- [Built Using](#built_using)
- [Authors](#authors)

## 🧐 About <a name = "about"></a>

Resolve Team is a sports team name resolver that returns to you the name of the team via fuzzy search, using FuseJS.

This module was created as I was unable to locate anything similar, and had this implmented in an existing project.

### Installing <a name = 'install'></a>

Simply run the following command

```
npm i resolve-team
```


## 🎈 Usage <a name="usage"></a>

### Parameters

`teamResolver` accepts 3 parameters, with the third one beingoptional:


| Parameter      | Type | Description
| ----------- |  ----------- |  ----------- |
| sport     | string | 'nba' or 'nfl' |
| name   | string | team
| threshold | number | 0 - 1

- `threshold` accepts a number between 0 to 1 which controls the FuseJS threshold. <b>By default, it is 0.4</b> You should be fine most of the time not provding a treshoold value. 
	- 0 is a perfect match, while 1 is a very broad range
<br/>

```js

import teamResolver from 'resolve-team'

// Example 1 | Using the nickname

const team = teamResolver(`nba`, `BOS`)

console.log(team) // => `Boston Celtics`


// Example 2 | Using the abbrevation

const team = teamResolver(`nba`, `LA`)

console.log(team) // => `Los Angeles Lakers`
```
## ⛏️ Built Using <a name = "built_using"></a>

### Dependencies

- [fuse.js](https://www.npmjs.com/package/fuse)
- [typescript](https://www.npmjs.com/package/typescript)

### Dev Dependencies
- [@types/node](https://www.npmjs.com/package/@types/node)

## ✍️ Authors <a name = "authors"></a>

- [@fearandesire](https://github.com/fearandesire) - Creator
