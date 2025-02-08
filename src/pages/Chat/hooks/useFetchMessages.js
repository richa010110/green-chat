import { saveChatData } from '@/utils/idb'
import { useEffect } from 'react'
import formatMessage from '../utils/formatMessage'

const useFetchMessages = (apiData, setAllChatData) => {
	useEffect(() => {
		const fetchMessages = async () => {
			try {
				const response = await fetch(
					`${apiData.apiUrl}/waInstance${apiData.idInstance}/receiveNotification/${apiData.apiTokenInstance}?receiveTimeout=30`,
					{ method: 'GET' }
				)

				const message = await response.json()
				if (!message || !message.body || !message.body.idMessage) return

				const formattedMessage = formatMessage(message.body)
				await saveChatData(formattedMessage)

				setAllChatData((prev) => [...prev, formattedMessage])

				await fetch(
					`${apiData.apiUrl}/waInstance${apiData.idInstance}/deleteNotification/${apiData.apiTokenInstance}/${message.receiptId}`,
					{ method: 'DELETE' }
				)

				fetchMessages()
			} catch (error) {
				console.error('Ошибка при получении сообщений:', error)
			}
		}

		fetchMessages()
	}, [apiData, setAllChatData])
}

export default useFetchMessages
