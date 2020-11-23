# React-js + Electron + Sqlite3

#### Install React
```bash
$ sudo create-react-app react-js-electron-sqlite
$ cd react-js-electron-sqlite
$ npm install
```

#### Install Electron
```bash
$ npm install electron --save-dev
```

#### Install Wait-on
* en: [Wait-on](https://www.npmjs.com/package/wait-on) is a cross-platform command line utility which will wait for files, ports, sockets, and http(s) resources to become available (or not available using reverse mode). Functionality is also available via a Node.js API. Cross-platform - runs everywhere Node.js runs (linux, unix, mac OS X, windows)
```node
$ npm install wait-on
```

#### Install Concurrently
* en: Run multiple commands [concurrently](https://www.npmjs.com/package/concurrently)
```bash
$ npm install concurrently
```

#### Electron index 
* en: Open **package.json** file add insert above "scripts"
> "main": "main.js",
* en: Insert inside "scripts" 
> "electron-react": "concurrently \"BROWSER=none npm start\" \"wait-on http://localhost:3000 && electron .\"",

#### Create main.js file
* en: Copy this script: 
```js
const { app, BrowserWindow } = require('electron')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('http://127.0.0.1:3000')
  win.webContents.openDevTools()
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
```
* Make sure this line: 
> loadFile('http://127.0.0.1:3000')

#### Run app
```bash
$ npm run-script electron-react
```
## Nice. Welcome React-Electron project!

#### Install react react-dom
```bash
$ npm install react react-dom
```
#### Install electron-packager
```bash
$ npm install -g electron-packager --save-dev
```
#### Create OS files
```bash
$ sudo electron-packager . --overwrite --platform=win32 --arch=ia32 --out=out
# or
$ sudo electron-packager . --overwrite --platform=win32 --arch=ia32 --out=out --icon=assets/app-icon/win/app.ico

```
> All 
```bash
"package:mac": "electron-packager . --overwrite --platform=darwin --arch=x64 --out=out --icon=assets/app-icon/mac/app.icns --osx-sign.identity='Developer ID Application: GitHub' --extend-info=assets/mac/info.plist",
"package-mac": "electron-packager . --overwrite --platform=darwin --arch=x64 --icon=assets/icons/mac/icon.icns --prune=true --out=release-builds",

"package:win": "electron-packager . --overwrite --platform=win32 --arch=ia32 --out=out --icon=assets/app-icon/win/app.ico",
"package-win": "electron-packager . --overwrite --asar=true --platform=win32 --arch=ia32 --icon=assets/icons/win/icon.ico --prune=true --out=release-builds --version-string.CompanyName=CE --version-string.FileDescription=CE --version-string.ProductName=\"Electron Tutorial App\"",

"package:linux": "electron-packager . --overwrite --platform=linux --arch=x64 --out=out",
"package-linux" : "electron-packager . --overwrite --platform=linux --arch=x64 --icon=assets/icons/png/1024x1024.png --prune=true --out=release-builds"

"package:sign-exe": "signcode './out/Electron API Demos-win32-ia32/Electron API Demos.exe' --cert ~/electron-api-demos.p12 --prompt --name 'Electron API Demos' --url 'http://electron.atom.io'",

"package:installer": "node ./script/installer.js",

"package:sign-installer": "signcode './out/windows-installer/ElectronAPIDemosSetup.exe' --cert ~/electron-api-demos.p12 --prompt --name 'Electron API Demos' --url 'http://electron.atom.io'",




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
