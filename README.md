# React-js + Electron + Sqlite3

* Create project
  * Begin with: [React](#begin-with-react) (advanced)
  * Begin with: [Electron](#begin-with-electron) (easy)
* Create server
  * Working with: [Babel](#working-with-babel)
  * Working with: [Concurrently + Wait-on](#working-with-wait-on-and-concurrently) (slow)
* [Packaging App](#packaging-app)
  * [Electron Builder](#electron-builder)
  * [Electron Packager](#electron-packager)
* Update (npm audit fix, npm update)
* [Kill Process](#kill-process-port3000)
* [Test](#test)
* [Error](#error)

## Begin with: React
<!--
* read: https://medium.com/@michael.m/creating-an-electron-and-react-template-5173d086549a
* read: https://github.com/onmyway133/blog/issues/352
* read: https://github.com/hamzaak/electron-react-webpack-boilerplate
-->
First option begin with React
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
#### Update package.json file
* en: Open **package.json** file add insert above "scripts"
> "main": "main.js",
* en: Insert inside "scripts"
> "electron": "electron .",

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
  //win.loadURL('http://127.0.0.1:3000')
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

#### Create index.html file
```html
<html>
  <body>
    <h1>Hello Electron World</h1>
    <h5>This is simple electron app</h5>
  </body>
</html>
```

## Begin with: Electron
Second option begin with Electron
#### Clone electron-quick-start project
```bash
# you need node.js
$ git clone https://github.com/electron/electron-quick-start react-js-electron-sqlite
$ cd react-js-electron-sqlite
$ npm install
$ npm start
```
#### Install react react-dom
```bash
$ npm install react react-dom
```
#### Files
* I will create a **src/** folder 
* and move **index.html** and **renderer.js**, 
* renamed as **renderer.js** to **index.js**.
* I will create an **index.css** and link it to the html. Finally, add an **app** container div.
* Replace **index.html** file:
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <link rel="stylesheet" type="text/css" href="./index.css">
    <title>Electrate</title>
  </head>
  <body>
    <div id="app">
    </div>
    <script src="./index.js"></script>
  </body>
</html>
```
#### Change main.js file
With a small change to **main.js** so that it points to the correct file:
```js
mainWindow.loadFile(path.join(__dirname, 'index.html'))
```
and **preload.js** to **index.j**
```js
webPreferences: {
  preload: path.join(__dirname, 'index.js')
}
```    
## Working with: Babel
Transpiling ES6 with Babel 7. 
#### Install Babel + Preset
```bash
$ npm i @babel/core --save-dev # this will install babel 7.0 
$ npm i @babel/preset-env @babel/preset-react --save-dev
$ npm i @babel/plugin-proposal-class-properties
```
#### .babelrc file
When it runs, it looks for its configuration in a file named .babelrc, so create in on the root and add:
```json
{ 
  "presets": ["@babel/env", "@babel/react"],
  "plugins": ["@babel/plugin-proposal-class-properties"]
}
```
#### Install Gulp
Babel needs to run before any code executes and the best way schedule that is through a build tool
```bash
$ npm i gulp gulp-babel --save-dev # basic gulp
$ npm i gulp-concat gulp-clean-css --save-dev # plugins
$ npm install -g gulp-cli # best sudo
$ npm i gulp-livereload
```
#### Edit package.json file
```json
"main": "app/main.js",
```
#### Create gulpfile.js file
Create a gulpfile.js at the root of your project and add the tasks
```js
const exec = require('child_process').exec;
const gulp = require('gulp');
const babel = require('gulp-babel');
const css = require('gulp-clean-css');// 1. Copy the index.html as is
const livereload = require('gulp-livereload');

gulp.task('html', () => {
    return gulp.src('src/index.html')
        .pipe(gulp.dest('app/'));
});// 2. Compile CSS file and move them to the app folder
gulp.task('css', () => { // 2.
    return gulp.src('src/**/*.css')
        .pipe(css())
        .pipe(gulp.dest('app/'));
});// 3. Compile JS files and move them to the app folder
gulp.task('js*', () => { // 3.
    return gulp.src(['main.js', 'src/**/*.js*'])
         .pipe(babel())
         .pipe(gulp.dest('app/'));
});// 4. Start the electron process.
gulp.task('start', gulp.series('html', 'css', 'js*', () => { // 4.
    return exec(
        __dirname+'/node_modules/.bin/electron .'
    ).on('close', () => process.exit());
}));
```
#### Edit package.json file
inside **scripts**
```json
"scripts": {
    "electron": "electron .",
    "start": "gulp",
    "delete:all": "rm -r ./app",
    "postinstall": "install-app-deps",
    "build": "gulp build",
    "test": "gulp test",
    "release": "gulp release",
    "make-icon": "gulp make-icon"
}
```
#### Run
```bash
$ npm run-script start 
# or 
$ npm run start 
```
----

## Working with: Wait-on and Concurrently 

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
#### Run Wait-on + Concurrently
* en: Insert inside "scripts" 
```json
"electron-react": "concurrently \"BROWSER=none npm start\" \"wait-on http://localhost:3000 && electron .\"",
```
----
#### main.js
* en: Remember change this: (file)
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

## Packaging App
#### Electron Builder
* en: There are mainly two options for packaging an Electron app and we will go with the second, [Electron Builder](https://www.npmjs.com/package/electron-builder/) (the other being Electron Packager).
```bash
$ npm i electron-builder --save-dev
```
We need to point the tool to the folder with the code to be compiled through the **package.json** by adding:
```json 
"build": {
  "appId": "com.natancabral.react-js-electron-sqlite3",
  "files": [
    "app/**/*",
    "node_modules/**/*",
    "package.json"
  ],
  "publish": null
}
```
And inside scritps.
```json 
  "scripts": {
    "build:pack": "electron-builder --dir",
    "build:dist": "electron-builder",
    "build:postinstall": "electron-builder install-app-deps",
  }
``` 

* **.gulpfile** change all to:
```js
const exec = require('child_process').exec;
const gulp = require('gulp');
const babel = require('gulp-babel');
const css = require('gulp-clean-css');
const livereload = require('gulp-livereload');

gulp.task('html', () => {
    return gulp.src('src/index.html')
        .pipe(gulp.dest('app/'))
        .pipe(livereload());
});

gulp.task('css', () => {
    return gulp.src('src/**/*.css')
        .pipe(css())
        .pipe(gulp.dest('app/'))
        .pipe(livereload());
});

gulp.task('js*', () => {
    return gulp.src(['main.js', 'src/**/*.js*'])
         .pipe(babel())
         .pipe(gulp.dest('app/'))
         .pipe(livereload());
});

gulp.task('images', () => {
    return gulp.src('src/assets/*')
         .pipe(gulp.dest('app/assets'))
         .pipe(livereload());
})

gulp.task('watch', async function() {
  livereload.listen();
  gulp.watch('src/**/*.html', gulp.series('html'));
  gulp.watch('src/**/*.css', gulp.series('css'));
  gulp.watch('src/**/*.js*', gulp.series('js*'));
  gulp.watch('src/assets/**/*', gulp.series('images'));
});

gulp.task('build', gulp.series('html', 'css', 'js*', 'images'));

gulp.task('start', gulp.series('build', () => {
    return exec(
        __dirname+'/node_modules/.bin/electron .'
    ).on('close', () => process.exit());
}));

gulp.task('default', gulp.parallel('start', 'watch'));

gulp.task('release', gulp.series('build', () => {
    return exec(
        __dirname+'/node_modules/.bin/electron-builder .'
    ).on('close', () => process.exit());
}));
``` 
#### Electron Packager
* en: Install [electron-packager](https://github.com/electron/electron-packager/)
```bash
$ npm install electron-packager --save-dev
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
scripts: {
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
}
```

## Kill Process port:3000
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
## Test
#### Jest test
```bash
$ npm i jest
$ npm i babel-jest
```
#### React test renderer
```bash
$ npm i react-test-renderer
```
## Error
* Error: EACCES: permission denied, mkdir '/usr/local/lib/node_modules/electron/.electron' [issues](https://github.com/npm/npm/issues/17268)
```bash
$ sudo npm install -g electron --unsafe-perm=true --allow-root
```
* Cant remove or update global create-react-app version.
```bash
$ sudo rm -rf /usr/local/bin/create-react-app
```
<!-- 
React + Electron
https://www.youtube.com/watch?v=2_fROfS8FPE
--
