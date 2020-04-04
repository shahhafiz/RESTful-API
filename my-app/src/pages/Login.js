import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link, useHistory } from 'react-router-dom';

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

	paper: {
		border: '1px solid',
		padding: theme.spacing(1),
		backgroundColor: theme.palette.background.paper,
	},
}));

function Login() {
	const classes = useStyles();
	const {register, handleSubmit, errors} = useForm();
	const history = useHistory();
	
	function navigate() {
		history.push("/home");
	}

	const onSubmit = data => {
		const url =  `http://localhost/excercise/api?&auth=true&login_name=${data.name}&login_password=${data.password}`;
		fetch(url)
			.then(response => {
				// response.json()
				if(response.status === 200){
					navigate();
				} else {
					response.json().then(data => {
						console.error(data);
						alert(data);
					})
				}
			})
	}
	
	return (
		<div className={classes.container}>
			<h1>Login</h1>
			<form className={classes.login} autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
				<TextField name="name" type="text" label="Name" variant="outlined" inputRef={register({required:true})}/>
				{errors.name && 'Name is required.'}

				<TextField name="password" type="password" label="Password" variant="outlined" inputRef={register({required:true})}/>
				{errors.password && 'Password is required.'}
				
				<Button variant="contained" color="primary" type="submit">
					Login
				</Button>
			</form>
			<Link to="/register">
				<Button color="primary" type="submit"><u> Register </u></Button>
			</Link>
		</div>
	);
}

export default Login;