import React, { Component } from 'react';
import classes from './QuizCreator.module.css';
import Button from '../../components/UI/Button/Button';
import Select from '../../components/UI/Select/Select';
import { createControl, validate, validateForm } from '../../form/formFramework';
import Input from '../../components/UI/Input/Input';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';

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
		quiz: [],
		isFormValid: false,
		rightAnswerId: 1,
		formControls: createFormControls()
	}

	submitHandler(event) {
		event.preventDefault()
	}

	addQuestionHandler = () => {

	}

	createTestHandler = () => {

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
						>
							Add question
						</Button>
						<Button
							type="success"
							onClick={this.createTestHandler}
						>
							Create test
						</Button>
					</form>
				</div>
			</div>
		)
	}
}

export default QuizCreator