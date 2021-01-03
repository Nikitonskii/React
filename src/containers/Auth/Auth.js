import React, { Component } from 'react';
import classes from './Auth.module.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';

class Auth extends Component {

	loginHandler = () => {

	}

	registrHandler = () => {

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
						<Input label={"Your email"}

						/>

						<Input label={"Your password"}
							errorMessage={"Test"}
						/>


						<Button
							type="success"
							onClick={this.loginHandler}
						>Log in </Button>

						<Button
							type="primary"
							onClick={this.registrHandler}
						>Registration</Button>
					</form>

				</div>
			</div>
		)
	}
}

export default Auth