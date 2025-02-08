import Button from '@/components/Button/Button'
import clsx from '@/utils/clsx'
import { saveChatData } from '@/utils/idb'
import { Icon } from '@iconify/react'
import { useEffect, useRef, useState } from 'react'

const ChatWindow = ({
	selectedChatData,
	apiData,
	setAllChatData,
	onCloseChat,
}) => {
	const { userData, messages } = selectedChatData
	const [messageText, setMessageText] = useState('')
	const messagesEndRef = useRef(null)

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}, [messages])

	const sendMessage = async (e) => {
		e.preventDefault()
		if (!messageText.trim()) return

		const newMessage = {
			idMessage: Date.now().toString(),
			timestamp: Date.now(),
			chatId: userData.chatId,
			chatName: userData.chatName,
			textMessage: messageText,
		}

		setAllChatData((prev) => [...prev, newMessage])
		selectedChatData.messages.push(newMessage)
		setMessageText('')

		try {
			const response = await fetch(
				`${apiData.apiUrl}/waInstance${apiData.idInstance}/sendMessage/${apiData.apiTokenInstance}`,
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						chatId: userData.chatId,
						message: messageText,
					}),
				}
			)

			const result = await response.json()
			if (!result || result.error) {
				console.error('Ошибка при отправке:', result)
				return
			}

			newMessage.idMessage = result.idMessage

			await saveChatData(newMessage)
		} catch (error) {
			console.error('Ошибка при отправке сообщения:', error)
		}
	}

	return (
		<div className="chat-window">
			<div className="chat-window__header">
				<div className="chat-contact">
					{userData.avatar ? (
						<img
							className="chat-contact__avatar"
							alt={`Аватарка ${userData.chatName}`}
							width={48}
							height={48}
						/>
					) : (
						<Icon
							className="chat-contact__avatar"
							icon="material-symbols:person"
							width={48}
							height={48}
						/>
					)}
					<div className="chat-contact__content">
						<h3 className="chat-contact__name">{userData.chatName}</h3>
						<p className="chat-contact__number">{userData.chatId}</p>
					</div>
				</div>
				<Button
					variant="light"
					icon={
						<Icon
							icon="material-symbols:close-rounded"
							width="24"
							height="24"
						/>
					}
					onClick={onCloseChat}
				/>
			</div>
			<div className="chat-window__messages">
				{messages.map((message) => {
					const isOwnMessage = message.chatId !== userData.chatId
					return (
						<div
							key={message.timestamp}
							className={clsx(
								'chat-message',
								isOwnMessage && 'chat-message--own'
							)}
						>
							<p className="chat-message__text">
								{message.textMessage || message.extendedTextMessageData}
							</p>
						</div>
					)
				})}
				<div ref={messagesEndRef} />
			</div>
			<form className="chat-window__form">
				<input
					type="text"
					className="chat-window__input"
					placeholder="Введите сообщение..."
					value={messageText}
					onChange={(e) => setMessageText(e.target.value)}
				/>
				<Button
					variant="light"
					type="submit"
					icon={<Icon icon="mdi:send" width={21} height={21} />}
					onClick={sendMessage}
				/>
			</form>
		</div>
	)
}

export default ChatWindow
