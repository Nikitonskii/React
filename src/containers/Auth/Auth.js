import React, { Component } from 'react';
import classes from './Auth.module.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import axios from 'axios';

function validateEmail(email) {
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}

class Auth extends Component {

	state = {
		isFormValid: false,
		formControls: {
			email: {
				value: '',
				type: 'email',
				label: 'Your email',
				valid: false,
				touched: false,
				errorMessage: 'Incorrect data',
				validation: {
					required: true,
					email: true,
				}
			},
			password: {
				value: '',
				type: 'password',
				label: 'Your password',
				valid: false,
				touched: false,
				errorMessage: 'Incorrect data',
				validation: {
					required: true,
					minLength: 6,
				}
			}
		}
	}

	validateControl(value, validation) {
		if (!validation) {
			return true
		}
		let isValid = true;
		console.log(validation.required)
		if (validation.required) {
			isValid = value.trim() !== '' && isValid
		}

		if (validation.email) {
			isValid = validateEmail(value) && isValid
		}

		if (validation.minLength) {
			isValid = value.length >= validation.minLength && isValid
		}
		return isValid
	}

	changeHandler(event, controlName) {
		//console.log(`${controlName} :  ${event.target.value}`)

		const formControls = { ...this.state.formControls }
		const control = { ...formControls[controlName] }

		control.value = event.target.value
		control.touched = true
		control.valid = this.validateControl(control.value, control.validation)

		formControls[controlName] = control

		let isFormValid = true

		Object.keys(formControls).forEach(name => {
			isFormValid = formControls[name].valid && isFormValid
		})

		this.setState({
			formControls, isFormValid
		})
	}

	renderInput() {
		return Object.keys(this.state.formControls).map((controlName, index) => {
			const control = this.state.formControls[controlName];
			return (
				<Input
					key={control + index}
					value={control.value}
					type={control.type}
					label={control.label}
					valid={control.valid}
					touched={control.touched}
					errorMessage={control.errorMessage}
					shouldValidate={!!control.validation}
					onChange={event => this.changeHandler(event, controlName)}
				/>
			)
		})
	}

	loginHandler = async () => {
		const authData = {
			email: this.state.formControls.email.value,
			password: this.state.formControls.password.value,
			returnSecureToken: true
		}
		try {
			const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB3Wn76HBvGHk9GkylPjhcQNBpRLFKghKY', authData)

			console.log(response.data)
		} catch (e) {
			console.log(e)
		}
	}

	registrHandler = async () => {
		const authData = {
			email: this.state.formControls.email.value,
			password: this.state.formControls.password.value,
			returnSecureToken: true
		}
		try {
			const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB3Wn76HBvGHk9GkylPjhcQNBpRLFKghKY', authData)

			console.log(response.data)
		} catch (e) {
			console.log(e)
		}
	}

	onSubmitHandler = (event) => {
		event.preventDefault()
	}

	render() {

		return (
			<div className={classes.Auth}>
				<div>
					<h1>Authentication</h1>

					<form onSubmit={this.onSubmitHandler} className={classes.AuthForm}>

						{this.renderInput()}

						<Button
							type="success"
							onClick={this.loginHandler}
							disabled={!this.state.isFormValid}
						>Log in </Button>

						<Button
							type="primary"
							onClick={this.registrHandler}
							disabled={!this.state.isFormValid}
						>Registration</Button>
					</form>

				</div>
			</div>
		)
	}
}

export default Auth