import React, { useEffect, useState } from 'react';

const Users = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/user')
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [])

    const handleUser = (event) => {
        event.preventDefault()
        const name = event.target.name.value;
        const email = event.target.email.value;
        const user = { name, email }
        console.log(user)

        fetch('http://localhost:5000/user',{

            method:"POST",
            headers:{
                "content-type": "application/json"
            },
            body: JSON.stringify(user)    

        })
            .then(res => res.json())
            .then(data => {
                // console.log('post response',data)
                const newUser=[...users,data]
                setUsers(newUser)
            })
    }

    return ( 
        <div>
            <h1>here i show users details</h1>
            <h1>Numbers of users={users.length}</h1>

            <form onSubmit={handleUser}>
                <input type="text" name='name' /> <br />
                <input type="email" name='email' /> <br />
                {/* <input type="submit" value='add user' /> */}
                <button type='submit' >Submit</button>
            </form>

            {users.map(user => <p key={user.id}>  {user.id} {user.name} {user.email} </p>)}
        </div>
    );
};

export default Users;