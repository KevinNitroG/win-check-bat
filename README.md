# WIN CHECK BATTERY

Check battery health for Windows

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/prettier-%23F7B93E.svg?style=for-the-badge&logo=prettier&logoColor=black)
![Semantic Release](https://img.shields.io/badge/semantic%20release-e10079?style=for-the-badge&logo=semanticrelease&logoColor=white)
![Conventionalcommits](https://img.shields.io/badge/conventionalcommits-fe5196?style=for-the-badge&logo=conventionalcommits&logoColor=white)
![Renovate Bot](https://img.shields.io/badge/renovate%20bot-308be3?style=for-the-badge&logo=renovate&logoColor=white)

![Hits](https://hits.sh/github.com/KevinNitroG/VNULIB-Downloader.svg?view=today-total&style=for-the-badge&label=hits)
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
# Temporary download and run. Not install to system $PATH
# @latest tag is optional (to always check for latest ver)
npx win-check-bat

# Or install via NPM
npm i -g win-check-bat
win-check-bat
```

### Executable file

> [!NOTE]
> Ouhm... not yet
>
> Maybe never because pkg doesn't support ESM
>
> > More detail: https://github.com/vercel/pkg/issues/1291#issuecomment-910262419

---

## SHOWCASE

```
$ win-check-bat

┌─────────────────┬───────────────────────┬────────┬───────────┐
│ Design Capacity │ Full Charged Capacity │ Health │  Status   │
├─────────────────┼───────────────────────┼────────┼───────────┤
│   54,000 mWh    │      49,680 mWh       │  92%   │ Excellent │
└─────────────────┴───────────────────────┴────────┴───────────┘
```

```
$ win-check-bat --line --description

Design capacity: 54,000 mWh
Full charged capacity: 49,680 mWh
Battery health: 92%
Status: Excellent
Description: The battery is in optimal condition, exhibiting minimal degradation and maintaining near-peak performance. It retains most of its original capacity.
```

```
$ win-check-bat -h

Usage: win-check-bat [options]

check battery health for Windows

Options:
  --no-status                       don't print out the status
  -d, --description                 show silly description
  -l, --line                        print line by line
  -p, --precise-health              calculate precise health (not round)
  -o, --open-html                   open HTML exported file
  -t, --open-html-timeout <second>  open HTML timeout (s) before deleting
                                    temp file. Increase if your browser
                                    cannot open soon enough before open
                                    HTML file. (default: "1")
  -h, --help                        display help for command
```

---

## DEV

```sh
npm i
npm run dev -- -- -- -t -p -o
```
