
import classes from './AnswersItem.module.css';

const AnswersItem = props => {

	const cls = [classes.AnswersItem]

	if (props.answerState) {
		cls.push(classes[props.answerState])
	}

	return (
		<li className={cls.join(' ')}
			onClick={() => { props.onAnswerClick(props.answer.id) }}
		>
			{props.answer.text}
		</li>
	)
}

export default AnswersItem