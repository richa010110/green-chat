const formatMessage = (message) => ({
	idMessage: message.idMessage,
	timestamp: message.timestamp,
	chatId: message.senderData?.chatId || message.chatId,
	chatName: message.senderData?.chatName || 'Неизвестный',
	avatar: message.senderData?.avatar || null,
	textMessage: message.messageData?.textMessageData?.textMessage ?? null,
	extendedTextMessageData:
		message.messageData?.extendedTextMessageData?.text ?? null,
})

export default formatMessage
