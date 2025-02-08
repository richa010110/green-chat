import Button from '@/components/Button/Button'
import Input from '@/components/Input/Input'
import { saveApiData } from '@/utils/idb'
import { useState } from 'react'
import './Auth.scss'
import logoSVG from '/logo.svg'

const Auth = ({ setApiData }) => {
	const [formData, setFormData] = useState({
		apiUrl: '',
		idInstance: '',
		apiTokenInstance: '',
	})

	const fields = [
		{ name: 'apiUrl', placeholder: 'Api URL' },
		{ name: 'idInstance', placeholder: 'ID Instance' },
		{ name: 'apiTokenInstance', placeholder: 'Api Token Instance' },
	]

	const onChange = (field) => (e) => {
		setFormData((prev) => ({ ...prev, [field]: e.target.value }))
	}

	const onSubmit = async (e) => {
		e.preventDefault()

		const apiData = {
			...formData,
			id: Date.now(),
		}

		await saveApiData(apiData)
		setApiData(apiData)
	}

	return (
		<div className="auth">
			<img src={logoSVG} alt="logo" width={128} height={128} />
			<div className="auth__block">
				<h1>Для работы в Green Api нужно заполнить форму!</h1>
				<form className="auth-form" onSubmit={onSubmit}>
					<div className="auth-form__inputs">
						{fields.map(({ name, placeholder }) => (
							<Input
								key={name}
								variant="light"
								placeholder={placeholder}
								value={formData[name]}
								onChange={onChange(name)}
							/>
						))}
					</div>
					<Button variant="light" type="submit">
						Сохранить
					</Button>
				</form>
			</div>
		</div>
	)
}

export default Auth
