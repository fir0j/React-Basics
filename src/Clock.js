import React, { Component } from 'react';
import axios from 'axios';
import InputTemperature from './components/InputTemperature';
import { Users } from './components/Users';

class Clock extends Component {
	constructor(props) {
		super(props);
		// state in react is said to be encapsulated or local because if state is passed down as props to other child component,
		// the child component will have no idea about from where the props is comming i.e will have no idea about who is its parent.
		this.state = {
			date1: new Date(),
			date2: new Date(),
			date3: new Date(),
			isToggleOn: true,
			isGoing: true,
			numberOfGuests: 2,
			value: 'coconut',
			temperature: '',
			scale: 'c',
			users: [],
			loading: false

			//In Controlled Component, selecting coconut value by default
			// temperature is the lifted up state because it is needed by child component and has been passed props to it.
		};
		// binding is necessary to make 'this' keyword work inside the function
		this.tick1 = this.tick1.bind(this);
		// from now on 'this' keyword inside the function will refer to the context of this component( ie. Clock component)
	}

	//REGULAR_FUCNTION_DEFINITION
	tick1() {
		this.setState({
			date1: new Date()
		});
	}

	//ARROW_FUCTION_DEFINITION
	tick2 = () => {
		this.setState({
			date2: new Date()
		});
	};

	// NOTE: above both functions are binded so are called same way and the below is not binded so is called in different way than binded functions

	//REGULAR_FUCNTION_DEFINITION_WITHOUT_BINDING
	tick3() {
		this.setState({
			date3: new Date()
		});
	}

	// ARROW_FUCNTION_DECLARATION AUTOMATICALLY get binded with window's context 'this'.No need to bind
	// this fuctional way of updating the state is always a good practise which takes anonomous function as argument and returns object to mutate the state.
	// also using event e to preventDefault behaviour is better practise
	// using conditional return structure but in this case not returning anyvalue
	handleToggleHeading = (e) => {
		e.preventDefault();
		this.setState((state, props) => ({
			isToggleOn: !state.isToggleOn
		}));
	};

	//this keyword inside arrow function always refer to windwo object/ context but this inside the regular function points to that function only

	handleChange = (e) => {
		e.preventDefault();
		this.setState({
			value: e.target.value
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		alert('Your Favourite Flavor is:' + this.state.value);
	};

	// function handling multiple input change

	handleInputChange = (e) => {
		const target = e.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	};

	handleChangeTemperature = (e) => {
		this.setState({
			temperature: e.target.value
		});
	};

	handleCelsiusChange(temperature) {
		this.setState({ scale: 'c', temperature });
	}

	handleFahrenheitChange(temperature) {
		this.setState({ scale: 'f', temperature });
	}

	tryConvert(temperature, convert) {
		const input = parseFloat(temperature);
		if (Number.isNaN(input)) {
			return '';
		}
		const output = convert(input);
		const rounded = Math.round(output * 1000) / 1000;
		return rounded.toString();
	}

	toCelsius(fahrenheit) {
		return (fahrenheit - 32) * 5 / 9;
	}

	toFahrenheit(celsius) {
		return celsius * 9 / 5 + 32;
	}

	getUsers() {
		this.setState({
			loading: true
		});

		axios('https://randomuser.me/api/?results=1&inc=name,gender,email,cell, id').then((response) =>
			this.setState({
				users: [ ...this.state.users, ...response.data.results ],
				loading: false
			})
		);
	}

	handleSubmitUsers = (e) => {
		e.preventDefault();
		this.getUsers();
	};

	//setInterval (callback not function, interval)
	componentDidMount() {
		// caching as timers so that it can be used to clearInterval later

		// if you want to use javascript_regular_function_definition for your custom function instead of arrow_function_declaration ,
		// then 1) either bind it with this key in constructor OR 2) user ARROW_CALL(not good practise)

		// if REGULAR_FUNCTION_DEFINITION_WITH_BINDING then CALL is made like this using ARROW_CALL....(1)
		this.timer1 = setInterval(this.tick1, 1000);

		// else if ARROW_FUNCTION_DEFINITION  has been used then also CALL is performed same way ....(2)
		// () doesn't exist while calling because ARROW_FUNCTION_DEFINITION has already consumed it :) .
		this.timer2 = setInterval(this.tick2, 1000);

		// NOTE: In Both case (1) and (2), all the attributes related to the event is implicitly(automatically) passed to the functions

		// if REGULAR_FUNCTION_DEFINITION_WITHOUT_BINDING then CALL is made like this using ARROW_CALL and if event e is needed, must be passsed explicitly.
		this.timer3 = setInterval(() => this.tick3(), 1000);
		// this is least reliable way of binding function to the context of the componenet

		// Passing Arguments to Event Handlers
		// PASSING ARGUMENT TO THE EVENT HANDLER is the topic in React Documentation
		// <button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
		//	React event (e) must be passed explicitly as argument
		// in case of ARROW_CALL if you want to make use of attributes like value, style etc. from the corresponding event.
		// IF YOU NEED TO PASS multiple ARGUMENTS TO DURING ARROW_CALL, MAKE SURE REACT_EVENT e IS PASSED AS SECOND ARGUMENT.
		this.getUsers();
	}

	componentWillUnmount() {
		clearInterval(this.timer1);
		clearInterval(this.timer2);
		clearInterval(this.timer3);
	}

	//CONTROLLED COMPONENT
	// using single return structure of functional component
	MultipleInputComponent = () => (
		<form onSubmit={this.handleSubmit}>
			<label>
				Is going:
				<input name="isGoing" type="checkbox" checked={this.state.isGoing} onChange={this.handleInputChange} />
			</label>
			<br />
			<label>
				Number of guests:
				<input
					name="numberOfGuests"
					type="number"
					value={this.state.numberOfGuests}
					onChange={this.handleInputChange}
				/>
			</label>
			<br />
			<br />
			<label>
				Pick your favorite flavor:
				<select value={this.state.value} onChange={this.handleChange}>
					<option value="grapefruit">Grapefruit</option>
					<option value="lime">Lime</option>
					<option value="coconut">Coconut</option>
					<option value="mango">Mango</option>
				</select>
			</label>
			<input type="submit" value="Submit" />
		</form>
	);

	//this life cycle method of react component always refers to the this.state
	//for any data to render and executes whenever setState() is called for updating state.
	render() {
		const scale = this.state.scale;
		const temperature = this.state.temperature;
		const celsius = scale === 'f' ? this.tryConvert(temperature, this.toCelsius) : temperature;
		const fahrenheit = scale === 'c' ? this.tryConvert(temperature, this.toFahrenheit) : temperature;

		return (
			<div>
				<center>
					<h1>React Documentation Tutorial</h1>

					<hr />
					<h3>1. States</h3>
					<hr />
					<h2> timer1(Binded Explicitly)</h2>
					<h2>It is {this.state.date1.toLocaleTimeString()}.</h2>
					<h2> timer2(Binded implicitly with Arrow Function)</h2>
					<h2>It is {this.state.date2.toLocaleTimeString()}.</h2>
					<h2> timer3(Not Binded) (is the way which i and Andrie prefer the most) </h2>
					<h2>It is {this.state.date3.toLocaleTimeString()}.</h2>
					<hr />

					<hr />
					<h3>2. Event Handlers</h3>
					{/* react EventListener are always camelCase */}
					<button onClick={this.handleToggleHeading} style={{ cursor: 'pointer' }}>
						{this.state.isToggleOn ? (
							'Toggle Me :Way to call function of various function_definition'
						) : (
							'Show Heading'
						)}
					</button>
					<hr />

					<hr />
					<h3>3. Controlled Components</h3>
					{this.MultipleInputComponent()}
					<hr />

					<hr />
					<h2>
						An Awesome way for child component to access and update state in parent component and also
						called Dispatching action
					</h2>
					<InputTemperature
						scale="c"
						temperature={celsius}
						handleChangeTemperature={this.handleChangeTemperature}
					/>

					<InputTemperature
						scale="f"
						temperature={fahrenheit}
						handleChangeTemperature={this.handleChangeTemperature}
					/>

					<hr />
					<h3>LIFTING STATE UP or making SINGLE SOURCE OF TRUTH or finding COMMON_PARENT</h3>
					<h3>
						<li>Lifting up state means first passing state as props to the child component </li>
						<li>
							getting the value from the child component as argument to the function passed as props to
							the child component.
						</li>
						<li> so that the function can update the state in parent component</li>
						<li> and then again that updated state is passed as props to the child component to render </li>
					</h3>
					<hr />
					<Users
						users={this.state.users}
						handleSubmitUsers={this.handleSubmitUsers}
						loading={this.state.loading}
					/>
				</center>
			</div>
		);
	}
}

export default Clock;
