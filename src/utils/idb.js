const DB_NAME = 'appData'
const API_STORE_NAME = 'apiData'
const CHAT_STORE_NAME = 'chatData'

export const openDB = () => {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open(DB_NAME, 1)

		request.onupgradeneeded = (event) => {
			const db = event.target.result
			if (!db.objectStoreNames.contains(API_STORE_NAME)) {
				db.createObjectStore(API_STORE_NAME, { keyPath: 'id' })
			}
			if (!db.objectStoreNames.contains(CHAT_STORE_NAME)) {
				db.createObjectStore(CHAT_STORE_NAME, { keyPath: 'timestamp' })
			}
		}

		request.onsuccess = () => resolve(request.result)
		request.onerror = () => reject(request.error)
	})
}

export const getApiData = async () => {
	try {
		const db = await openDB()
		const transaction = db.transaction(API_STORE_NAME, 'readonly')
		const store = transaction.objectStore(API_STORE_NAME)
		const request = store.getAll()

		return new Promise((resolve, reject) => {
			request.onsuccess = () =>
				resolve(request.result.length ? request.result[0] : null)
			request.onerror = () => reject(request.error)
		})
	} catch (error) {
		console.error('Ошибка при получении данных:', error)
		return null
	}
}

export const saveApiData = async (data) => {
	try {
		const db = await openDB()
		const transaction = db.transaction(API_STORE_NAME, 'readwrite')
		const store = transaction.objectStore(API_STORE_NAME)
		store.put(data)
	} catch (error) {
		console.error('Ошибка при сохранении данных:', error)
	}
}

export const saveChatData = async (message) => {
	try {
		const db = await openDB()
		const transaction = db.transaction(CHAT_STORE_NAME, 'readwrite')
		const store = transaction.objectStore(CHAT_STORE_NAME)
		store.put(message)
	} catch (error) {
		console.error('Ошибка при сохранении чатов:', error)
	}
}

export const getAllChatData = async () => {
	try {
		const db = await openDB()
		const transaction = db.transaction(CHAT_STORE_NAME, 'readonly')
		const store = transaction.objectStore(CHAT_STORE_NAME)
		const request = store.getAll()

		return new Promise((resolve, reject) => {
			request.onsuccess = () => resolve(request.result)
			request.onerror = () => reject(request.error)
		})
	} catch (error) {
		console.error('Ошибка при получении чатов:', error)
		return []
	}
}
