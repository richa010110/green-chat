const phoneMask = (value) => {
	const numericValue = value.replace(/\D/g, '')

	let maskedValue = '+7 '

	if (numericValue.length > 1) {
		maskedValue += `(${numericValue.substring(1, 4)}`
	}
	if (numericValue.length > 4) {
		maskedValue += `) ${numericValue.substring(4, 7)}`
	}
	if (numericValue.length > 7) {
		maskedValue += `-${numericValue.substring(7, 9)}`
	}
	if (numericValue.length > 9) {
		maskedValue += `-${numericValue.substring(9, 11)}`
	}

	return maskedValue
}

export default phoneMask
