import React, { Component } from 'react';
import PredictBoiling from './PredictBoiling';

class InputTemperature extends Component {
	handleChange = (e) => {
		this.props.handleChangeTemperature(e);
	};
	render() {
		const scaleNames = {
			c: 'Celsius',
			f: 'Fahrenheit'
		};
		return (
			<fieldset>
				<legend>Enter temperature in {scaleNames[this.props.scale].concat(':')}</legend>
				<input value={this.props.temperature} onChange={this.handleChange} />
				<PredictBoiling temperature={this.props.temperature} />
			</fieldset>
		);
	}
}

// function InputTemperature(props) {
// 	return (
// 		<fieldset>
// 			<legend>Enter temperature in Celsius:</legend>
// 			<input value={props.temperature} onChange={(e) => props.handleChangeTemperature(e)} />
// 			<PredictBoiling temperature={props.temperature} />
// 		</fieldset>
// 	);
// }

export default InputTemperature;
