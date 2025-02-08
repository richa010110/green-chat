import clsx from '@/utils/clsx'
import './Input.scss'

const Input = ({
	variant = 'dark',
	type = 'text',
	value,
	onChange,
	placeholder,
}) => {
	return (
		<input
			type={type}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			className={clsx('input', variant)}
		/>
	)
}

export default Input
