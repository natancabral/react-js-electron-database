# React-js + Electron + Sqlite3

#### Install React
```bash
$ sudo create-react-app react-js-electron
$ cd react-js-electron
$ npm install
```

#### Install Electron
```bash
$ npm install electron --save-dev
```
#### package.json
* en: Add above "scripts"
> "main": "main.js",

#### Install (Concurrently)[https://www.npmjs.com/package/concurrently]
* en: Run multiple commands concurrently
```bash
$ npm install concurrently
```

####
* en: Edit package.json file, on scripts: 
> "electron-react": "concurrently \"BROWSER=none npm start\" \"wait-on http://localhost:3000 && electron .\""

####
```bash
```
####
```bash
```
####
```bash
```
####
```bash
```
####
```bash
```
####
```bash
```

<!-- 
React + Electron
https://www.youtube.com/watch?v=2_fROfS8FPE
--
