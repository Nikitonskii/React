import classes from './Button.module.css';

const Button = props => {

	const cls = [
		classes.Button,
		classes[props.type]
	]

	return (
		<button
			className={cls.join(' ')}
			onClick={props.onRetry}
			disabled={props.disabled}
		>
			{props.children}
		</button>
	)
}

export default Button