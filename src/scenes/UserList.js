import { useEffect, useState } from 'react'

export default function UserList({ token }) {
	const [userList, setUserList] = useState()

  useEffect(() => {
    fetch('http://localhost:3001/users')
    .then(response => response.json())
    .then(data => setUserList(data.users))
    .catch(alert)
  }, [token])
	return (
		<>
			<h1>Working</h1>
      {!userList ? <h2>Loading...</h2> : userList.map(user => {
        return <p key={user.id}>{user.email}, {user.userRole}</p>
      })}
		</>
	)
}
