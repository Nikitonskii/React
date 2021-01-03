import classes from './AnswersList.module.css';
import AnswersItem from './AnswersItem/AnswersItem';

const AnswersList = props => (
	<ul className={classes.AnswersList}>
		{props.answers.map((answer, index) => {
			return (
				<AnswersItem
					key={index}
					answer={answer}
					onAnswerClick={props.onAnswerClick}
					answerState={props.answerState ? props.answerState[answer.id] : null}
				/>
			)
		})}
	</ul>
)

export default AnswersList