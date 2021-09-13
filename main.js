const { app, ipcMain, BrowserWindow } = require('electron')
const path = require('path')
//const url = require('url')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // webSecurity: false,
      // allowRunningInsecureContent: true,
      // preload: path.join(__dirname, 'preload.js')
      nativeWindowOpen: true,
      nodeIntegration: true,
    }
  })

  win.loadFile('app/index.html')
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

ipcMain.on('app_version', (event) => {
  event.sender.send('app_version', { version: app.getVersion() });
  console.log('Version', app.getVersion());
});
