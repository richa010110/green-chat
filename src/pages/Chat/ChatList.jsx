import Button from '@/components/Button/Button'
import Input from '@/components/Input/Input'
import clsx from '@/utils/clsx'
import phoneMask from '@/utils/phoneMask'
import { Icon } from '@iconify/react'
import { useState } from 'react'

const ChatList = ({
	selectedChatId,
	sendersList,
	onSelectedChat,
	onCreateNewChat,
}) => {
	const [isCreatingChat, setIsCreatingChat] = useState(false)
	const [phoneNumber, setPhoneNumber] = useState('')

	const onCreateChat = () => setIsCreatingChat(true)
	const onCancel = () => {
		setIsCreatingChat(false)
		setPhoneNumber('')
	}

	const onSaveChat = (e) => {
		e.preventDefault()
		if (!phoneNumber.trim()) return

		const temporaryChat = {
			timestamp: Date.now(),
			chatId: `${phoneNumber.replace(/\D/g, '')}@c.us`,
			chatName: phoneNumber,
			lastMessage: 'Новый чат',
		}

		onCreateNewChat(temporaryChat)
		setIsCreatingChat(false)
		setPhoneNumber('')
	}

	return (
		<div className="chat-list">
			<div className="chat-list__header">
				<h2>Чаты</h2>
				<Button
					icon={
						<Icon
							icon="material-symbols:create-new-folder-outline"
							width="24"
							height="24"
						/>
					}
					onClick={onCreateChat}
				/>
			</div>
			<div className="chat-list__contacts">
				{isCreatingChat && (
					<div className="chat-list__new-chat">
						<Input
							variant="light"
							type="tel"
							placeholder="Введите номер телефона"
							value={phoneNumber}
							onChange={(e) => setPhoneNumber(phoneMask(e.target.value))}
						/>
						<div className="chat-list__actions">
							<Button onClick={onSaveChat} variant="light">
								Сохранить
							</Button>
							<Button onClick={onCancel}>Отмена</Button>
						</div>
					</div>
				)}
				{sendersList.map((sender) => (
					<button
						key={sender.chatId}
						type="button"
						className={clsx(
							'chat-contact',
							selectedChatId === sender.chatId && 'active'
						)}
						onClick={() => onSelectedChat(sender.chatId)}
					>
						{sender.avatar ? (
							<img
								className="chat-contact__avatar"
								alt={`Аватарка ${sender.chatName}`}
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
							<h3 className="chat-contact__name">{sender.chatName}</h3>
							<p className="chat-contact__last-message">{sender.lastMessage}</p>
						</div>
					</button>
				))}
			</div>
		</div>
	)
}

export default ChatList
