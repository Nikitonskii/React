import { Link } from 'react-router-dom';
import classes from './FinishedQuiz.module.css';
import Button from '../UI/Button/Button';

const FinishedQuiz = props => {
	const successCount = Object.keys(props.results).reduce((total, key) => {
		if (props.results[key] === 'success') {
			total++
		}
		return total
	}, 0)

	return (
		<div className={classes.FinishedQuiz}>
			<ul>
				{
					props.quiz.map((quizItem, index) => {
						console.log(props.results[quizItem.id])
						const cls = [
							'fa',
							props.results[quizItem.id] === 'error' ? 'fa-times ' : 'fa-check ',
							classes[props.results[quizItem.id]]
						]
						return (
							<li key={index}>
								<strong>{index + 1}</strong>.
								{quizItem.question}
								<i className={cls.join(' ')} />
							</li>
						)
					})
				}
			</ul>

			<p>Correct {successCount} of {props.quiz.length}</p>

			<div>
				<Button type="primary" onRetry={props.reTry}> Try again</Button>
				<Link to='/'>
					<Button type="success"> Back to the testlist</Button>
				</Link>
			</div>

		</div>
	)
}

export default FinishedQuiz