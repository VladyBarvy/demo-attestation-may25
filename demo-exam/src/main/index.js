import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import connectionDataBase from './db'

async function getPartners() {
  try {

    /*
    const response = await global.dbclient.query(`SELECT T1.*,
    CASE WHEN sum(T2.production_quantity) > 300000 THEN 15
    WHEN sum(T2.production_quantity) > 50000 THEN 10
    WHEN sum(T2.production_quantity) > 10000 THEN 5
    ELSE 0 
    END as discount
    from partners as T1
    LEFT JOIN sales as T2 on T1.id = T2.partner_id
    GROUP BY T1.id`)
    */
    const response = await global.dbclient.query(`SELECT * from partners`)

    return response.rows
  } catch (e) {
    console.log(e)
  }
}

async function createPartner(event, partner) {
  const { type, name, ceo, email, phone, address, rating } = partner;

  try {
    await global.dbclient.query(`INSERT into partners (organization_type, name, ceo, email, phone, address, rating) values('${type}', '${name}', '${ceo}', '${email}', '${phone}', '${address}', ${rating})`)
    dialog.showMessageBox({ message: 'Успех! Партнер создан' })
  } catch (e) {
    console.log(e)
    dialog.showErrorBox('Ошибка', "Партнер с таким именем уже есть")
  }
}

async function updatePartner(event, partner) {
  const { id, type, name, ceo, email, phone, address, rating } = partner;

  try {
    await global.dbclient.query(`UPDATE partners
      SET name = '${name}', organization_type = '${type}', ceo='${ceo}', email='${email}', phone='${phone}', address='${address}', rating='${rating}'
      WHERE partners.id = ${id};`)
    dialog.showMessageBox({ message: 'Успех! Данные обновлены' })
    return;
  } catch (e) {
    dialog.showErrorBox('Невозможно создать пользователя', 'Такой пользователь уже есть')
    return ('error')
  }
}

function createWindow() {
  const winIcon = join(__dirname, '../../resources/icon_3.ico');
  const linuxIcon = join(__dirname, '../../resources/icon_31.png');

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon: linuxIcon } : { icon: winIcon }),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

   mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(async () => {
  electronApp.setAppUserModelId('com.electron')

  global.dbclient = await connectionDataBase();
  ipcMain.handle('getPartners', getPartners)
  ipcMain.handle('createPartner', createPartner)
  ipcMain.handle('updatePartner', updatePartner)

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })


  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
