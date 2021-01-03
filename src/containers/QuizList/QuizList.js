import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './QuizList.module.css';

class QuizList extends Component {

	renderQuizes() {
		return [1, 2, 3].map((quiz, index) => {
			return (
				<li key={index}>
					<NavLink
						to={'/quiz/' + quiz}
					>
						Test {quiz}
					</NavLink>
				</li>
			)
		})
	}

	render() {
		return (
			<div className={classes.QuizList}>
				<div>
					<h1>Test  List </h1>

					<ul>
						{this.renderQuizes()}
					</ul>
				</div>
			</div>
		)
	}
}

export default QuizList