import React from 'react';
import './login.css';
const Login = () => {
	return (
		<form className='form'>
			Sign Up
			<input
				type='text'
				className='input'
				placeholder='Name'
			/>
			<input
				type='text'
				className='input'
				placeholder='Password'
			/>
			<button>Submit</button>
		</form>
	);
};

export default Login;
