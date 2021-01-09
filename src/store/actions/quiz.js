import axios from '../../axios/axios-quiz';
import { FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS, FETCH_QUIZES_ERROR } from './actionTypes';

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