import { useState } from 'react'

export default function Signup({ setToken, setIsUser }) {
	const [formValues, setFormValues] = useState({ email: '', password: '' })

	const formFields = {
		email: formValues.email,
		password: formValues.password,
	}

	const onChange = (event) => {
		setFormValues({ ...formValues, [event.target.name]: event.target.value })
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		fetch('http://localhost:3001/users', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(formFields),
		})
			.then((response) => response.json())
			.then((data) => setToken(data.token))
      .catch(alert)
	}

	return (
		<div>
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit}>
				<label>
					Email:
					<input type='email' name='email' onChange={onChange} />
				</label>
				<br />
				<label>
					Password:
					<input type='password' name='password' onChange={onChange} />
				</label>
				<br />
				<input type='submit' value='Sign Up' />
			</form>
			<button onClick={() => setIsUser(true)}>Login</button>
		</div>
	)
}
