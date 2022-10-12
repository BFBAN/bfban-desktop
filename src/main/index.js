import { app, BrowserWindow, Menu,Tray } from 'electron'
import '../renderer/store'
import Package from '/package.json';
import Path from 'path';

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = Path.join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

const iconPath = process.platform !== 'darwin'
    ? '/src/assets/images/favicon.ico'
    : '/src/assets/images/favicon.icns';


function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 650,
    maxHeight: 1000,
    minHeight: 650,
    width: 450,
    maxWidth: 450,
    minWidth: 450,
    titleBarStyle: 'default',
    transparent: true,
    frame: false,
    fullscreenable: false,
    resizable: true,
    useContentSize: false,
    webPreferences: {
      nodeIntegration: true
    },
    title: Package.name,
    icon: Path.join(__dirname,iconPath)
  })

  app.setName(Package.name)

  if (!app.isDefaultProtocolClient('bfban-desktop')) {
    app.setAsDefaultProtocolClient('bfban-desktop')
  }

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
