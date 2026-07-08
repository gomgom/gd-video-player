const { contextBridge, ipcRenderer } = require('electron')

const VALID_SIZES = ['small', 'medium', 'large']

contextBridge.exposeInMainWorld('gdPlayer', {
    resizeWindow: (size) => {
        if (!VALID_SIZES.includes(size)) return
        ipcRenderer.send(`resize-window-${size}`)
    },
    maximize: () => ipcRenderer.send('maximize'),
    toggleAlwaysOnTop: () => ipcRenderer.send('always-on-top')
})
