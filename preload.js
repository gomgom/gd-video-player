const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('gdPlayer', {
    resizeWindow: (size) => ipcRenderer.send(`resize-window-${size}`),
    maximize: () => ipcRenderer.send('maximize'),
    toggleAlwaysOnTop: () => ipcRenderer.send('always-on-top')
})
