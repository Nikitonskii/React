import React, { Component } from 'react';
import classes from './QuizCreator.module.css';
import Button from '../../components/UI/Button/Button';
import Select from '../../components/UI/Select/Select';
import { createControl, validate, validateForm } from '../../form/formFramework';
import Input from '../../components/UI/Input/Input';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import axios from 'axios';
import { connect } from 'react-redux';
import { finishCreateQuiz, createQuizQuestion } from '../../store/actions/create';

function createOptionControl(number) {

	return createControl({
		label: `Attempt ${number}`,
		errorMessage: 'Incorrect data',
		id: number,
	}, { required: true })
}

function createFormControls() {
	return {
		question: createControl({
			label: 'Create your question',
			errorMessage: 'Incorrect data'
		}, { required: true }),
		option1: createOptionControl(1),
		option2: createOptionControl(2),
		option3: createOptionControl(3),
		option4: createOptionControl(4),
	}
}

class QuizCreator extends Component {

	state = {
		isFormValid: false,
		rightAnswerId: 1,
		formControls: createFormControls()
	}

	submitHandler = (event) => {
		event.preventDefault()
	}

	addQuestionHandler = (event) => {
		event.preventDefault()

		const { question, option1, option2, option3, option4 } = this.state.formControls

		const questionItem = {
			question: question.value,
			id: this.props.length + 1,
			rightAnswerId: this.state.rightAnswerId,
			answers: [
				{ text: option1.value, id: option1.id },
				{ text: option2.value, id: option2.id },
				{ text: option3.value, id: option3.id },
				{ text: option4.value, id: option4.id }
			]
		}

		this.props.createQuizQuestion(questionItem)

		this.setState({
			isFormValid: false,
			rightAnswerId: 1,
			formControls: createFormControls()
		})
	}

	createQuizHandler = (event) => {
		event.preventDefault()

		axios.post('/quizes.json', this.state.quiz)

		this.setState({
			quiz: [],
			isFormValid: false,
			rightAnswerId: 1,
			formControls: createFormControls()
		})
		this.props.finishCreateQuiz()
		/* axios.post('https://react-quiz-7125e-default-rtdb.firebaseio.com/quizes.json', this.state.quiz)
			.then(response => {
				console.log(response)
			}).catch(error => {
				console.log(error)
			}) */
	}

	onChangeHandler = (value, controlName) => {
		const formControls = { ...this.state.formControls }
		const control = { ...formControls[controlName] }

		control.touched = true
		control.value = value
		control.valid = validate(control.value, control.validation)
		//control.valid = false
		formControls[controlName] = control

		this.setState({
			formControls,
			isFormValid: validateForm(formControls)
		})
	}

	renderControls = () => {
		return Object.keys(this.state.formControls).map((controlName, index) => {
			const control = this.state.formControls[controlName]
			return (
				<Auxiliary key={controlName + index}>
					<Input
						label={control.label}
						value={control.value}
						valid={control.valid}
						shouldValidate={!!control.validation}
						touched={control.touched}
						errorMessage={control.errorMessage}
						onChange={event => this.onChangeHandler(event.target.value, controlName)}
					/>
					{index === 0 ? <hr /> : null}
				</Auxiliary>

			)
		})
	}

	selectChangeHandler = event => {
		this.setState({
			rightAnswerId: +event.target.value
		})
	}

	render() {

		const select = <Select
			label="Choose correct answer"
			value={this.state.rightAnswerId}
			onChange={this.selectChangeHandler}
			options={[
				{ value: 1, text: 1 },
				{ value: 2, text: 2 },
				{ value: 3, text: 3 },
				{ value: 4, text: 4 },
			]}
		/>
		return (
			<div className={classes.QuizCreator}>
				<div>
					<h1>Test creating</h1>

					<form onSubmit={this.submitHandler}>

						{this.renderControls()}

						{select}

						<Button
							type="primary"
							onClick={this.addQuestionHandler}
							disabled={!this.state.isFormValid}
						>
							Add question
						</Button>

						<Button
							type="success"
							onClick={this.createQuizHandler}
							disabled={this.props.quiz.length === 0}
						>
							Create test
						</Button>

					</form>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		quiz: state.create.quiz
	}
}

function mapDispatchToProps(dispach) {
	return {
		createQuizQuestion: item => dispach(createQuizQuestion(item)),
		finishCreateQuiz: () => dispach(finishCreateQuiz())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator)