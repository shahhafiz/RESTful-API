import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	container: {
		height: '100vh',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},

	login: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',

		'& > *': {
			margin: '10px',
      width: '25ch',
		}
	},
}));

function Register() {
	const classes = useStyles();
	const {register, handleSubmit, errors} = useForm();
	const history = useHistory();
	const onSubmit = data => {
		const requestOptions = {
			method: "POST",
			headers: {'Content-Type' : 'application/json'},
			body: JSON.stringify(data) 
		}
		fetch('http://localhost/excercise/api', requestOptions)
			.then(response => response.json())
			.then(data => {
				console.log(data);
				alert(data.message);
				history.push("/login");
			});
	}

	return (
		<div className={classes.container}>
			<h1>Register</h1>
			<form className={classes.login} autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
				<TextField name="login_name" type="text" label="Name" variant="outlined" inputRef={register({required:true})}/>
				{errors.name && 'Name is required.'}

				<TextField name="login_password" type="password" label="Password" variant="outlined" inputRef={register({required:true})}/>
				{errors.password && 'Password is required.'}
				
                <TextField name="mobile_no" type="number" label="Mobile No." variant="outlined" inputRef={register({required:true})}/>
				{errors.password && 'Mobile Np. is required.'}
				
                <TextField name="gender" type="text" label="Gender" variant="outlined" inputRef={register({required:true})}/>
				{errors.password && 'Gender is required.'}

				<Button variant="contained" color="primary" type="submit">
					Register
				</Button>
			</form>
			<Link to="/login">
				<Button color="primary" type="submit"><u> Login </u></Button>
			</Link>

		</div>
	);
}

export default Register;