import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import connectionDataBase from './db'

async function getPartners() {
  try {
    const main_data = await global.dbclient.query(`SELECT * from partners`) // основные данные из таблицы partners
    return main_data.rows
  } catch (e) {
    console.log(e)
  }
}

async function getSales() {
  try {
    const sales_data = await global.dbclient.query(`
      SELECT 
      partner_id,
      SUM(production_quuantity) AS total_quantity,
      CASE 
          WHEN SUM(production_quuantity) < 10000 THEN 0
          WHEN SUM(production_quuantity) BETWEEN 10000 AND 50000 THEN 5
          WHEN SUM(production_quuantity) BETWEEN 50000 AND 300000 THEN 10
          WHEN SUM(production_quuantity) > 300000 THEN 15
      END AS discount_percentage
      FROM 
        sales
      GROUP BY 
        partner_id
      ORDER BY 
        partner_id;
    `)
    return sales_data.rows
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
  ipcMain.handle('getSales', getSales)
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
