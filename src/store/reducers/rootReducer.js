import { combineReducers } from 'redux';
import quizReducer from './quizReducer';
import createReducer from './create'
import authReducer from './auth'

export default combineReducers({
	quiz: quizReducer,
	create: createReducer,
	auth: authReducer
})