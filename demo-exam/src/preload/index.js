import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
const api = {
  // Получение данных о партнерах
  getPartners: async () => {
    try {
      return await ipcRenderer.invoke('getPartners')
    } catch (error) {
      console.error('Error getting partners:', error)
      throw error
    }
  },

  // Получение данных о продажах
  getSales: async () => {
    try {
      return await ipcRenderer.invoke('getSales')
    } catch (error) {
      console.error('Error getting sales:', error)
      throw error
    }
  },

  // Создание нового партнера
  createPartner: async (partner) => {
    try {
      if (!partner || typeof partner !== 'object') {
        throw new Error('Invalid partner data')
      }
      return await ipcRenderer.invoke('createPartner', partner)
    } catch (error) {
      console.error('Error creating partner:', error)
      throw error
    }
  },

  // Обновление партнера
  updatePartner: async (partner) => {
    try {
      if (!partner || typeof partner !== 'object' || !partner.id) {
        throw new Error('Invalid partner data or missing ID')
      }
      return await ipcRenderer.invoke('updatePartner', partner)
    } catch (error) {
      console.error('Error updating partner:', error)
      throw error
    }
  },

  deletePartner: async (id) => {
    try {
      return await ipcRenderer.invoke('delete-partner', id);
    } catch (error) {
      console.error('IPC error:', error);
      return { 
        status: 'error',
        message: 'Ошибка связи с главным процессом'
      };
    }
  }

}


if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
