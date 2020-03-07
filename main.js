// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('path')

app.allowRendererProcessReuse = true

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 720,
        height: 520,
        center: true,
        maximizable: true,
        resizable: false,
        webPreferences: {
            webviewTag: true,
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })

    mainWindow.setMenu(null)

    const { ipcMain } = require('electron')

    ipcMain.on('resize-window-small', (event, arg) => {
        mainWindow.resizable = true
        if (mainWindow.isMaximized()) {
            mainWindow.unmaximize()
        }
        mainWindow.setSize(720, 520)
        mainWindow.resizable = false
        mainWindow.center()
    })

    ipcMain.on('resize-window-medium', (event, arg) => {
        mainWindow.resizable = true
        if (mainWindow.isMaximized()) {
            mainWindow.unmaximize()
        }
        mainWindow.setSize(1020, 690)
        mainWindow.resizable = false
        mainWindow.center()
    })

    ipcMain.on('resize-window-large', (event, arg) => {
        mainWindow.resizable = true
        if (mainWindow.isMaximized()) {
            mainWindow.unmaximize()
        }
        mainWindow.setSize(1320, 860)
        mainWindow.resizable = false
        mainWindow.center()
    })

    ipcMain.on('maximize', (event, arg) => {
        if (!mainWindow.isMaximized()) {
            mainWindow.resizable = true
            mainWindow.maximize()
            mainWindow.resizable = false
        } else {
            mainWindow.resizable = true
            mainWindow.unmaximize()

            mainWindow.resizable = false
        }
    })

    ipcMain.on('always-on-top', (event, arg) => {
        if (mainWindow.isAlwaysOnTop()) {
            mainWindow.setAlwaysOnTop(false)
        } else {
            mainWindow.setAlwaysOnTop(true)
        }
    })

    // and load the index.html of the app.
    mainWindow.loadFile('index.html')

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function() {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.