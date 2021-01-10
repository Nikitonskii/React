
import {
	FETCH_QUIZES_START,
	FETCH_QUIZES_SUCCESS,
	FETCH_QUIZES_ERROR,
	FETCH_QUIZ_SUCCESS,
	QUIZ_SET_STATE,
	FINISH_QUIZ,
	QUIZ_NEXT_QUESTION, QUIZ_TRY_AGAIN
} from '../actions/actionTypes';

const initialState = {
	quizes: [],
	loading: false,
	error: null,
	results: {}, // {[id] : succes  error}
	isFinished: false,
	activeQuestion: 0,
	answerState: null, // { [id] : 'success'  'error'}
	quiz: null,
}

export default function quizReducer(state = initialState, action) {
	switch (action.type) {
		case FETCH_QUIZES_START:
			return {
				...state, loading: true
			}
		case FETCH_QUIZES_SUCCESS:
			return {
				...state, loading: false, quizes: action.quizes
			}
		case FETCH_QUIZES_ERROR:
			return {
				...state, loading: false, error: action.error
			}
		case FETCH_QUIZ_SUCCESS:
			return {
				...state, loading: false, quiz: action.quiz
			}
		case QUIZ_SET_STATE:
			return {
				...state, answerState: action.answerState, result: action.result
			}
		case FINISH_QUIZ:
			return {
				...state, isFinished: true
			}
		case QUIZ_NEXT_QUESTION:
			return {
				...state, answerState: null, activeQuestion: action.activeQuestion
			}
		case QUIZ_TRY_AGAIN:
			return {
				...state, results: {}, activeQuestion: 0, isFinished: false, answerState: null
			}
		default:
			return state
	}
}