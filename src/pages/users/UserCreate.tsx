import React, { SyntheticEvent, useEffect, useState } from 'react'
import Wrapper from '../../components/Wrapper'
import axios from 'axios';
import { Role } from '../../Models/Role';
import { Navigate } from 'react-router-dom';

const UserCreate = () => {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [role_id, setRoleId] = useState('');
    const [roles, setRoles] = useState([]);
    const [redirect, setRedirect] = useState(false);

    const fetchRoles = async () => {
        const { data } = await axios.get('roles');
        setRoles(data);
    }

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        await axios.post('users', {
            first_name,
            last_name,
            email,
            role_id
        })
        setRedirect(true)
    }

    useEffect(() => {
        fetchRoles()
    }, [])

    if (redirect) {
        return <Navigate to={'/users'} />;
    }

    return (
        <>
            <Wrapper>
                <form onSubmit={submit}>
                    <div className="form-floating my-2">
                        <input onChange={e => setFirstName(e.target.value)} type="text" className="form-control" placeholder='First Name' id="firstName" />
                        <label htmlFor="firstName">First Name</label>
                    </div>
                    <div className="form-floating my-2">
                        <input onChange={e => setLastName(e.target.value)} type="text" className="form-control" placeholder='Last Name' id="lastName" />
                        <label htmlFor="lastName">Last Name</label>
                    </div>
                    <div className="form-floating my-2">
                        <input onChange={e => setEmail(e.target.value)} type="email" className="form-control" placeholder='Email' id="email" />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="my-3">
                        <select className="form-select" aria-label="Select Role" onChange={e => setRoleId(e.target.value)}>
                            <option selected>Select Role</option>
                            {
                                roles.map((role: Role, index) => (
                                    <option key={index} value={role.id}>{role.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <button className="btn btn-primary w-100 py-2" type="submit">save</button>
                </form>
            </Wrapper>
        </>
    )
}

export default UserCreate