import { useState } from 'react'
import bcrypt from 'bcryptjs'

const salt = '$2b$10$Lt0PlnYcAuxa8s2QX1iw6.'

export default function Signup({ setToken, setIsUser }) {
	const [formValues, setFormValues] = useState({ email: '', password: '' })	

	const onChange = (event) => {
		setFormValues({ ...formValues, [event.target.name]: event.target.value })
	}

	const handleSubmit = (event) => {
		event.preventDefault()

    const hashedPassword = bcrypt.hashSync(formValues.password, salt)
    
    const formFields = {
      email: formValues.email,
      password: hashedPassword,
    }

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
