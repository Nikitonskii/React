import axios from '../../axios/axios-quiz';
import {
	FETCH_QUIZES_START,
	FETCH_QUIZES_SUCCESS,
	FETCH_QUIZES_ERROR,
	FETCH_QUIZ_SUCCESS,
	QUIZ_SET_STATE,
	FINISH_QUIZ,
	QUIZ_NEXT_QUESTION,
	QUIZ_TRY_AGAIN
} from './actionTypes';

export function fetchQuizes() {
	return async dispach => {
		dispach(fetchQuizesStart())
		try {
			const response = await axios.get('quizes.json')

			const quizes = []

			Object.keys(response.data).forEach((key, index) => {
				quizes.push({
					id: key,
					name: `Test number ${index + 1}`
				})
			})
			dispach(fetchQuizesSuccess(quizes))
		} catch (e) {
			dispach(fetchQuizesError(e))
		}
	}
}

export function fetchQuizById(quizId) {
	return async dispach => {
		dispach(fetchQuizesStart())
		try {
			const response = await axios.get(`quizes/${quizId}.json`)
			const quiz = response.data
			dispach(fetchQuizSuccess(quiz))
		} catch (e) {
			fetchQuizesError(e)
		}
	}
}

export function fetchQuizSuccess(quiz) {
	return {
		type: FETCH_QUIZ_SUCCESS,
		quiz
	}
}

export function fetchQuizesStart() {
	return {
		type: FETCH_QUIZES_START
	}
}

export function fetchQuizesSuccess(quizes) {
	return {
		type: FETCH_QUIZES_SUCCESS,
		quizes
	}
}

export function fetchQuizesError(e) {
	return {
		type: FETCH_QUIZES_ERROR,
		error: e
	}
}

export function quizSetState(answerState, results) {
	return {
		type: QUIZ_SET_STATE,
		answerState, results
	}
}

export function finishQuiz() {
	return {
		type: FINISH_QUIZ,
	}
}

export function quizNextQuestion(activeQuestion) {
	return {
		type: QUIZ_NEXT_QUESTION,
		activeQuestion
	}
}

export function quizTryAgain() {
	return {
		type: QUIZ_TRY_AGAIN
	}
}

export function quizAnswerClick(answerId) {
	return (dispach, getState) => {
		const state = getState().quiz
		if (state.answerState) {
			const key = Object.keys(state.answerState)[0]
			if (state.answerState[key] === 'success') {
				return
			}
		}

		const question = state.quiz[state.activeQuestion];
		const results = state.results;

		function isQuizFinished(state) {
			return state.activeQuestion + 1 === state.quiz.length
		}

		if (question.rightAnswerId === answerId) {
			if (!results[question.id]) {
				results[question.id] = 'success'
			}
			dispach(quizSetState({ [answerId]: 'success' }, results))

			const timeOut = window.setTimeout(() => {
				if (isQuizFinished(state)) {
					dispach(finishQuiz())

				} else {
					dispach(quizNextQuestion(state.activeQuestion + 1))
					/* this.setState({
						activeQuestion: this.state.activeQuestion + 1,
						answerState: null
					}) */
				}
				window.clearTimeout(timeOut)
			}, 1000)

		} else {
			results[question.id] = 'error'
			dispach(quizSetState({ [answerId]: 'error' }), results)
		}
	}
}

