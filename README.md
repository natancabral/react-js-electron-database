# React-js + Electron + Sqlite3

* Create project
  * Begin with: [React](#begin-with-react)
  * Begin with: Electron
* Create server
  * Working with: Babel
  * Working with: Concurrently + Wait-on
* Build App

## Begin with: React
#### Create project and install React
```bash
# you need node.js
$ npx create-react-app react-js-electron-sqlite
$ cd react-js-electron-sqlite
```

#### Install Electron
```bash
# need sudo
$ npm install electron --save-dev
```
## Option one (linux|mac|win)
* read: https://medium.com/@michael.m/creating-an-electron-and-react-template-5173d086549a
* read: https://github.com/onmyway133/blog/issues/352
* read: https://github.com/hamzaak/electron-react-webpack-boilerplate

#### Install Babel
```node
$ npm install 
```
#### Watch JSX files (react files)
* en: Open **gulpfile.js** and insert watch .jsx (.js*) files.
```js
// sample change js to js*
gulp.task('js*', () => {
return gulp.src(['src/**/*.js*'])
gulp.watch('src/**/*.js*', gulp.series('js*'));  
gulp.task('build', gulp.series('html', 'css', 'js*', 'images'));

```
----

## Option two (linux|mac)
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
//const url = require('url')

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

## Done!
Welcome React-Electron project!

---

## Create App

#### Install react react-dom
```bash
$ npm install react react-dom
```
#### Create App files (linux|mac|win) + Installer package
* en: Install [electron-packager](https://github.com/electron/electron-packager/) and [electron-builder](https://www.npmjs.com/package/electron-builder/)
```bash
$ npm install electron-packager electron-builder --save-dev
```
#### Create App OS files
```bash
# windows
$ electron-packager . --overwrite --platform=win32 --arch=ia32 --out=release-builds
# Linux
$ electron-packager . --overwrite --platform=linux --arch=x64 --out=release-builds
# Mac
$ electron-packager . --overwrite --platform=darwin --arch=x64 --icon=assets/icons/mac/icon.icns --prune=true --out=release-builds
```
#### Shotcut to create App 
* en: Open **package.json** and insert inside on scripts:
```json
"packager:win:1": "electron-packager . --overwrite --platform=win32 --arch=ia32 --out=release-builds",
"packager:win:2": "electron-packager . --overwrite --platform=win32 --arch=ia32 --out=release-builds --icon=assets/icons/win/app.ico",
"packager:win:3": "electron-packager . --overwrite --platform=win32 --arch=ia32 --out=release-builds --icon=assets/icons/win/icon.ico --prune=true --version-string.CompanyName=CE --version-string.FileDescription=CE --version-string.ProductName=\"React Electron Sqlite\"",

"packager:mac:1": "electron-packager . --overwrite --platform=darwin --arch=x64 --out=release-builds",
"packager:mac:2": "electron-packager . --overwrite --platform=darwin --arch=x64 --out=release-builds --icon=assets/icons/mac/icon.icns --prune=true",
"packager:mac:3": "electron-packager . --overwrite --platform=darwin --arch=x64 --out=release-builds --icon=assets/icons/mac/app.icns --osx-sign.identity='React Electron Sqlite' --extend-info=assets/mac/info.plist",

"packager:linux:1": "electron-packager . --overwrite --platform=linux --arch=x64 --out=release-builds",
"packager:linux:2": "electron-packager . --overwrite --platform=linux --arch=x64 --out=release-builds --icon=assets/icons/png/1024x1024.png --prune=true"

"packager:sign-exe": "signcode './release-builds/Electron API Demos-win32-ia32/Electron API Demos.exe' --cert ~/electron-api-demos.p12 --prompt --name 'React Electron Sqlite' --url 'http://electron.atom.io'",
"packager:installer": "node ./script/installer.js",
"packager:sign-installer": "signcode './release-builds/windows-installer/ElectronAPIDemosSetup.exe' --cert ~/electron-api-demos.p12 --prompt --name 'React Electron Sqlite' --url 'http://electron.atom.io'",
```

#### Install find-process to close server x.x.x.x:3000
* en: Install find-process
```bash
$ npm install find-process
```
* en: main.js
```js
const find = require('find-process');

app.on('before-quit', (e) => {
  find('port', 3000)
  .then(function (list) {  
    if (list[0] != null) { 
      console.log('---kill---:', list[0].pid);
      process.kill(list[0].pid, 'SIGHUP'); 
    }
  })
  .catch((e) => {
    console.log('---error---',e.stack || e);
  });
});
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
