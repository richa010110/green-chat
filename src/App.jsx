import { useEffect, useState } from 'react'
import Auth from './pages/Auth/Auth'
import Chat from './pages/Chat/Chat'
import { getApiData } from './utils/idb'

const App = () => {
	const [loading, setLoading] = useState(true)
	const [apiData, setApiData] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			const storedData = await getApiData()
			if (storedData) {
				setApiData(storedData)
			}
			setLoading(false)
		}

		fetchData()
	}, [])

	if (loading) {
		return <h2>Loading...</h2>
	}

	return (
		<>
			{apiData ? <Chat apiData={apiData} /> : <Auth setApiData={setApiData} />}
		</>
	)
}

export default App
