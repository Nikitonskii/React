import React from "react";
import classes from './Input.module.css';

function isInvalid({ valid, touched, shouldValidate }) {
	return !valid && shouldValidate && touched
};

const Input = props => {

	const inputType = props.type || 'text'
	const cls = [classes.Input]
	const htmlFor = `${inputType}-${Math.round(Math.random() * 100)}`

	if (isInvalid(props)) {
		cls.push(classes.invalid)
	}

	return (
		<div className={cls.join(' ')}>
			<label htmlFor={htmlFor}>{props.label}</label>
			<input
				type={inputType}
				id={htmlFor}
				value={props.value}
				onChange={props.onChange}
			/>
			{isInvalid(props)
				? <span>{props.errorMessage ?? 'Uncorrect data'}</span>
				: null
			}

		</div>
	)
}

export default Input