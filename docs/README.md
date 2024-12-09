# WIN CHECK BATTERY

Check battery health for Windows

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/prettier-%23F7B93E.svg?style=for-the-badge&logo=prettier&logoColor=black)
![Semantic Release](https://img.shields.io/badge/semantic%20release-conventionalcommits-e10079?style=for-the-badge&logo=semanticrelease&logoColor=white)

[![NPM Version](https://img.shields.io/npm/v/win-check-bat?style=for-the-badge&logo=npm)](https://www.npmjs.com/package/win-check-bat)
[![NPM Downloads](https://img.shields.io/npm/dy/win-check-bat?style=for-the-badge&logo=npm)](https://www.npmjs.com/package/win-check-bat)

---

## TABLE OF CONTENTS

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [USAGE](#usage)
  - [NodeJS](#nodejs)
  - [Executable file](#executable-file)
- [SHOWCASE](#showcase)
- [DEV](#dev)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

---

## USAGE

### NodeJS

> [!IMPORTANT]
> Require [NodeJS](https://nodejs.org/en/download/)

```sh
# Install via npm
npm i -g win-check-bat
win-check-bat

# Or temporary download and run. Not install to system $PATH
npx win-check-bat@latest # @latest is optional (to allways check for latest ver)
```

### Executable file

> [!NOTE]
> Ouhm... not yet

---

## SHOWCASE

```
$ win-check-bat

Design capacity: 54,000 mWh
Full charged capacity: 49,680 mWh
Battery health: 92%
```

```
$ win-check-bat -t

┌─────────────┬──────────────┐
│ (index)     │ Values       │
├─────────────┼──────────────┤
│ design      │ '54,000 mWh' │
│ fullCharged │ '49,680 mWh' │
│ health      │ '92%'        │
└─────────────┴──────────────┘
```

```
$ win-check-bat -h

Usage: win-check-bat [options]

check battery health for Windows

Options:
  -t, --table                       print as table
  -p, --precise-health              calculate precise health (not round)
  -o, --open-html                   open HTML exported file
  -T, --open-html-timeout <number>  open HTML timeout (s) before deleting temp file. Increase if your browser cannot open soon enough before open
                                    HTML file. (default: "1")
  -h, --help                        display help for command
```

---

## DEV

```sh
npm i
npm run dev -- -- -- -t -p -o
```
