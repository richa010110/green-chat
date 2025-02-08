const groupMessagesByChat = (messages) => {
	return messages.reduce((acc, message) => {
		if (!acc[message.chatId]) acc[message.chatId] = []
		acc[message.chatId].push(message)
		return acc
	}, {})
}

export default groupMessagesByChat
