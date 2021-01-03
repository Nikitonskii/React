
import React, { Component } from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';

class Quiz extends Component {

	state = {
		results: {}, // {[id] : succes  error}
		isFinished: false,
		activeQuestion: 0,
		answerState: null, // { [id] : 'success'  'error'}
		quiz: [
			{
				question: 'What color is the sky?',
				rightAnswer: 3,
				id: 1,
				answers: [
					{ text: 'Red', id: 1 },
					{ text: 'Orange', id: 2 },
					{ text: 'Blue', id: 3 },
					{ text: 'Yellow', id: 4 }
				]
			},
			{
				question: 'What`s your life like?',
				rightAnswer: 4,
				id: 2,
				answers: [
					{ text: 'Cool', id: 1 },
					{ text: 'Bad', id: 2 },
					{ text: 'Amazing', id: 3 },
					{ text: 'Shit', id: 4 }
				]
			}
		]
	}

	onAnswerClickHandler = (answerId) => {

		if (this.state.answerState) {
			const key = Object.keys(this.state.answerState)[0]
			if (this.state.answerState[key] === 'success') {
				return
			}
		}
		//console.log(`Answer id : ${answerId}`)
		const question = this.state.quiz[this.state.activeQuestion];
		const results = this.state.results;
		console.log(question)
		console.log(results)

		if (question.rightAnswer === answerId) {
			if (!results[question.id]) {
				results[question.id] = 'success'
			}

			this.setState({
				answerState: { [answerId]: 'success' },
				results
			})

			const timeOut = window.setTimeout(() => {
				if (this.isQuizFinished()) {
					this.setState({
						isFinished: true
					})
				} else {
					this.setState({
						activeQuestion: this.state.activeQuestion + 1,
						answerState: null
					})
				}
				window.clearTimeout(timeOut)
			}, 1000)

		} else {
			results[question.id] = 'error'
			this.setState({
				answerState: { [answerId]: 'error' },
				results
			})
		}

	}

	componentDidMount() {
		console.log(this.props.match.params.id)
	}

	retryHandler() {
		this.setState({
			results: {},
			isFinished: false,
			activeQuestion: 0,
			answerState: null
		})
	}

	isQuizFinished() {
		return this.state.activeQuestion + 1 === this.state.quiz.length
	}


	render() {

		return (
			<div className={classes.Quiz}>
				<h1>You should answer to each question</h1>
				{
					this.state.isFinished
						? <FinishedQuiz
							results={this.state.results}
							quiz={this.state.quiz}
							reTry={this.retryHandler.bind(this)}
						/>
						: <div className={classes.QuizWrapper}>
							<ActiveQuiz
								onAnswerClick={this.onAnswerClickHandler}
								question={this.state.quiz[this.state.activeQuestion].question}
								answers={this.state.quiz[this.state.activeQuestion].answers}
								quizLength={this.state.quiz.length}
								answerNumber={this.state.activeQuestion + 1}
								answerState={this.state.answerState}
							/>
						</div>
				}

			</div>
		)
	}
}

export default Quiz