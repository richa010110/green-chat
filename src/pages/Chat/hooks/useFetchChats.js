import { getAllChatData } from '@/utils/idb'
import { useEffect, useState } from 'react'

const useFetchChats = () => {
	const [allChatData, setAllChatData] = useState([])

	useEffect(() => {
		const fetchChatData = async () => {
			const chats = await getAllChatData()
			setAllChatData(chats)
		}
		fetchChatData()
	}, [])

	return { allChatData, setAllChatData }
}

export default useFetchChats
