# React-js + Electron + Sqlite3

#### Install React
```bash
$ sudo create-react-app react-js-electron
$ cd react-js-electron
$ npm install
```

#### Install Electron
```bash
$ npm install electron 
```

#### Install Wait-on
* en: (Wait-on)[https://www.npmjs.com/package/wait-on] is a cross-platform command line utility which will wait for files, ports, sockets, and http(s) resources to become available (or not available using reverse mode). Functionality is also available via a Node.js API. Cross-platform - runs everywhere Node.js runs (linux, unix, mac OS X, windows)
```bash
$ npm install wait-on
```

#### Install Concurrently
* en: Run multiple commands (concurrently)[https://www.npmjs.com/package/concurrently]
```bash
$ npm install concurrently
```

#### Electron index 
* en: Open **package.json** file add insert above "scripts"
> "main": "main.js",
* en: Insert inside "scripts" 
> "electron-react": "concurrently \"BROWSER=none npm start\" \"wait-on http://localhost:3000 && electron .\"",

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
