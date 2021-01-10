
import React, { Component } from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loader from '../../components/UI/Loader/Loader';
import { connect } from 'react-redux';
import { fetchQuizById, quizAnswerClick, quizTryAgain } from '../../store/actions/quiz';

class Quiz extends Component {

	componentDidMount() {
		this.props.fetchQuizById(this.props.match.params.id)
	}

	componentWillUnmount(){
		this.props.quizTryAgain()
	}

	render() {

		return (
			<div className={classes.Quiz}>
				<h1>You should answer to each question</h1>

				{ this.props.loading || !this.props.quiz
					? <Loader />
					: this.props.isFinished
						? <FinishedQuiz
							results={this.props.results}
							quiz={this.props.quiz}
							reTry={this.props.quizTryAgain}
						/>
						: <div className={classes.QuizWrapper}>
							<ActiveQuiz
								onAnswerClick={this.props.quizAnswerClick}
								question={this.props.quiz[this.props.activeQuestion].question}
								answers={this.props.quiz[this.props.activeQuestion].answers}
								quizLength={this.props.quiz.length}
								answerNumber={this.props.activeQuestion + 1}
								answerState={this.props.answerState}
							/>
						</div>
				}

			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		results: state.quiz.results,
		isFinished: state.quiz.isFinished,
		activeQuestion: state.quiz.activeQuestion,
		answerState: state.quiz.answerState,
		quiz: state.quiz.quiz,
		loading: state.quiz.loading,
	}
}

function mapDispatchToProps(dispach) {
	return {
		fetchQuizById: id => dispach(fetchQuizById(id)),
		quizAnswerClick: answerId => dispach(quizAnswerClick(answerId)),
		quizTryAgain: () => dispach(quizTryAgain())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)