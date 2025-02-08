import clsx from '@/utils/clsx'
import './Button.scss'

const Button = ({
	variant = 'dark',
	type = 'button',
	onClick,
	icon,
	children,
	...props
}) => {
	return (
		<button
			className={clsx('button', variant)}
			type={type}
			onClick={onClick}
			{...props}
		>
			{icon && icon}
			{children && children}
		</button>
	)
}

export default Button
