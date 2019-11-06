// importing react library and its life cycle components
import React, { Component } from 'react';
import axios from 'axios';
import { Loading } from './components/Loading.component';

// class syntax(statefull component) is used when you need to maintain states and work with life cycle methods like componentWillMount, componentDidMount,render  and so on.
// functional component(stateless component) is used to create component which is for conditional rendering.
class SocialNetwork extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
			loading: false
		};
	}

	getUsers() {
		this.setState({
			loading: true
		});

		axios('https://randomuser.me/api/?results=5&inc=name,gender,email,cell, id').then((response) =>
			this.setState({
				users: [ ...this.state.users, ...response.data.results ],
				loading: false
			})
		);
	}

	// react 17.x onward, life cycle component has been rename and prefix with UNSAFE_componentName
	UNSAFE_componentWillMount() {
		this.getUsers();
	}

	//when you use this arrow syntax for defining function, you don't have to bind it inside constructor
	//this keyword inside arrow function always refer to windwo object/ context but this inside the regular function points to that function only
	handleSubmit = (event) => {
		event.preventDefault();
		this.getUsers();
		console.log('More users loaded');
	};

	//this life cycle method of react component always refers to the this.state for any data to render and executes whenever setState() is called for updating state.
	render() {
		const { loading, users } = this.state;
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<input type="submit" value="Load Users" />
				</form>
				{!loading ? (
					users.map((user) => (
						<div key={user.id.value}>
							<h3 style={{ color: 'red' }}>{user.name.first}</h3>
							<p>{user.email}</p>
							<hr />
						</div>
					))
				) : (
					<Loading message="Loading .." />
				)}
			</div>
		);
	}
}

export default SocialNetwork;
