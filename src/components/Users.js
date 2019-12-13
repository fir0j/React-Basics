import React from 'react';
import { Loading } from './Loading';
// Note: In case of stateless or functional component, only use props.receiveProps, 'this' keyword is not used while receiving.
export const Users = (props) => {
	return (
		<div>
			{!props.loading ? (
				props.users.map((user) => (
					<div key={user.id.value}>
						<h3 style={{ color: 'red' }}>{user.name.first}</h3>
						<p>{user.email}</p>
						<hr />
					</div>
				))
			) : (
				<Loading message="Loading .." />
			)}
			<form onSubmit={props.handleSubmitUsers}>
				<input type="submit" value="Load Users" />
			</form>
			<hr />
		</div>
	);
};
