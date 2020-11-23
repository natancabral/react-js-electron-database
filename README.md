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
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      //webSecurity: false,
      //allowRunningInsecureContent: true,
      //preload: path.join(__dirname, 'preload.js')
      nodeIntegration: true
    }
  })

  win.loadFile('index.html')
  //win.webContents.openDevTools()
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
* en: Change from this: (file)
> .loadFile('index.html')
* en: To this: (url)
> .loadURL('http://127.0.0.1:3000')

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
$ sudo electron-packager . --overwrite --platform=win32 --arch=ia32 --out=release-builds
$ sudo electron-packager . --overwrite --platform=linux --arch=x64 --out=release-builds
$ sudo electron-packager . --overwrite --platform=darwin --arch=x64 --icon=assets/icons/mac/icon.icns --prune=true --out=release-builds
```
> All 
* en: Open **package.json** and insert inside on scripts:
```json
"package:win:1": "electron-packager . --overwrite --platform=win32 --arch=ia32 --out=release-builds",
"package:win:2": "electron-packager . --overwrite --platform=win32 --arch=ia32 --out=release-builds --icon=assets/icons/win/app.ico",
"package:win:3": "electron-packager . --overwrite --platform=win32 --arch=ia32 --out=release-builds --icon=assets/icons/win/icon.ico --prune=true --version-string.CompanyName=CE --version-string.FileDescription=CE --version-string.ProductName=\"React Electron Sqlite\"",

"package:mac:1": "electron-packager . --overwrite --platform=darwin --arch=x64 --out=release-builds",
"package:mac:2": "electron-packager . --overwrite --platform=darwin --arch=x64 --out=release-builds --icon=assets/icons/mac/icon.icns --prune=true",
"package:mac:3": "electron-packager . --overwrite --platform=darwin --arch=x64 --out=release-builds --icon=assets/icons/mac/app.icns --osx-sign.identity='React Electron Sqlite' --extend-info=assets/mac/info.plist",

"package:linux:1": "electron-packager . --overwrite --platform=linux --arch=x64 --out=release-builds",
"package:linux:2": "electron-packager . --overwrite --platform=linux --arch=x64 --out=release-builds --icon=assets/icons/png/1024x1024.png --prune=true"

"package:sign-exe": "signcode './release-builds/Electron API Demos-win32-ia32/Electron API Demos.exe' --cert ~/electron-api-demos.p12 --prompt --name 'React Electron Sqlite' --url 'http://electron.atom.io'",
"package:installer": "node ./script/installer.js",
"package:sign-installer": "signcode './release-builds/windows-installer/ElectronAPIDemosSetup.exe' --cert ~/electron-api-demos.p12 --prompt --name 'React Electron Sqlite' --url 'http://electron.atom.io'",
```

#### Close server x.x.x.x:3000
* en: main.js
```js
const find = require('find-process');

app.on('before-quit' , (e) => {
    find('port', 3000)
        console.log(e.stack || e);
      .then(function (list) {
        console.log('---list---:',list[0].pid, list);
      if(list[0] != null){
          process.kill(list[0].pid, 'SIGHUP');
      }
    }.catch((e) => {
        console.log(e.stack || e);
    });
});
```

#### 
```bash
$ npm install electron-package electron-builder
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
