import axios from 'axios';

export default axios.create({
	baseURL: 'https://react-quiz-7125e-default-rtdb.firebaseio.com/'
})