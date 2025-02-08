import { useCallback, useMemo, useState } from 'react'
import './Chat.scss'
import ChatList from './ChatList'
import ChatWindow from './ChatWindow'
import useFetchChats from './hooks/useFetchChats'
import useFetchMessages from './hooks/useFetchMessages'
import groupMessagesByChat from './utils/groupMessageByChat'

const Chat = ({ apiData }) => {
	const { allChatData, setAllChatData } = useFetchChats()
	useFetchMessages(apiData, setAllChatData)
	const [selectedChatId, setSelectedChatId] = useState(null)
	const [temporaryChats, setTemporaryChats] = useState([])

	const groupedMessages = useMemo(
		() => groupMessagesByChat([...allChatData, ...temporaryChats]),
		[allChatData, temporaryChats]
	)

	const sendersList = useMemo(
		() =>
			Object.keys(groupedMessages).map((chatId) => {
				const messages = groupedMessages[chatId]
				const lastMessage = messages[messages.length - 1] || {
					chatName: chatId,
					lastMessage: 'Новый чат',
				}
				return {
					chatId,
					chatName: lastMessage.chatName,
					lastMessage:
						lastMessage.textMessage ||
						lastMessage.extendedTextMessageData ||
						lastMessage.lastMessage,
				}
			}),
		[groupedMessages]
	)

	const selectedChatData = useMemo(() => {
		if (!selectedChatId) return null
		const messages = groupedMessages[selectedChatId] || []
		if (messages.length === 0) return null
		const { chatId, chatName, avatar } = messages[0]
		return { userData: { chatId, chatName, avatar }, messages }
	}, [selectedChatId, groupedMessages])

	const onSelectedChat = useCallback((chatId) => setSelectedChatId(chatId), [])
	const onCloseChat = useCallback(() => setSelectedChatId(null), [])

	const onCreateNewChat = (chat) => {
		setTemporaryChats((prev) => [...prev, chat])
		setSelectedChatId(chat.chatId)
	}

	return (
		<div className="chat">
			<ChatList
				selectedChatId={selectedChatId}
				sendersList={sendersList}
				onSelectedChat={onSelectedChat}
				onCreateNewChat={onCreateNewChat}
			/>
			{selectedChatId && (
				<ChatWindow
					selectedChatData={selectedChatData}
					apiData={apiData}
					setAllChatData={setAllChatData}
					onCloseChat={onCloseChat}
				/>
			)}
		</div>
	)
}

export default Chat
