const {app, BrowserWindow, Tray, nativeImage, screen } = require('electron')
const path = require('path')

let mainWindow = undefined;;
let tray = undefined;
//app.dock.hide();

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 300,
    height: 600,
    //-----tray----- start
    show: true,
    frame: false,
    fullscreen: false,
    resizable: false,
    transparent: false,
    //-----tray----- end
    webPreferences: {
      backgroundThrottling: false
    }
  })

  // mainWindow.loadFile('index.html')
  mainWindow.loadFile(path.join(__dirname, 'app', 'index.html'))
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  //-----tray----- start
  mainWindow.on('closed',()=>mainWindow = null)
  // Hide the window when it loses focus
  mainWindow.on('blur', () => {
    // if (!mainWindow.webContents.isDevToolsOpened()) {
    //   mainWindow.hide();
    // }
  });
  //-----tray----- end
}

//-----tray----- start
const createTray = () => {
  const icon = path.join(__dirname, 'assets', 'tray.png')
  const nimage = nativeImage.createFromPath(icon)
  //tray is a app variable
  tray = new Tray(nimage)
  tray.on('click', (event)=>toggleWindow())
}

const toggleWindow = () => {
  mainWindow.isVisible() ? mainWindow.hide() : showWindow(); 
}

const showWindow = () => {
  const position = getWindowPosition();
  mainWindow.setPosition(position.x,position.y, false);
  mainWindow.show();
}

const getWindowPosition = () => {

  //console.log(process.platform);
  //'aix'
  //'darwin'
  //'freebsd'
  //'linux'
  //'openbsd'
  //'sunos'
  //'win32'

  const { screenWidth, screenHeight } = screen.getPrimaryDisplay().workAreaSize;
  const windowBounds = mainWindow.getBounds();
  const trayBounds = tray.getBounds(); 
  // Center window horizontally below the tray icon
  const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2));
  let y = undefined;
  // Position window 4 pixels vertically below the tray icon
  if(process.platform == 'win32')
    y = Math.round(trayBounds.y - windowBounds.height);
  else
    y = Math.round(trayBounds.y + trayBounds.height + 4);

  return {x,y}
}
//-----tray----- end

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  //-----tray----- start
  createTray()
  //-----tray----- end
  createWindow()
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.