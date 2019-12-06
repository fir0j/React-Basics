import React from 'react';

// Receiving props / Lifting up state using functional(stateless) component.

// METHOD 1: EXPORT REGULAR_FUNCTION
function PredictBoiling(props) {
	return <div>{parseInt(props.temperature) >= 100 ? 'The Water Would Boil !' : 'The Water Would not Boil.'}</div>;
}

export default PredictBoiling;

/*

// METHOD 2: EXPORT ARROW_FUNCTION

export const PredictBoiling = (props) => (
	<div>{parseInt(props.temperature) >= 100 ? 'The Water Would Boil !' : 'The Water Would not Boil.'}</div>
);

// Receiving props / Lifting up state using class(statelessful) component
// and while receiving props, constructor is not necessary


// METHOD 3: EXPORT Class Component
export default class PredictBoiling extends Component {
	render() {
		return (
			<div>{parseInt(this.props.temperature) > 100 ? 'The Water Would Boil !' : 'The Water Would not Boil.'}</div>
		);
	}
}

*/
