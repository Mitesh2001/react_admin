import { SyntheticEvent, useEffect, useState } from 'react'
import Wrapper from '../components/Wrapper'
import axios from 'axios';
import { User } from '../Models/User';
import { Dispatch } from 'redux';
import { setUser } from '../redux/actions/SetUserAction';
import { connect } from 'react-redux';

const Profile = (props: { user: User, setUser: (user: User) => void }) => {

    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirm, setConfirmPassword] = useState('');

    const fetchUser = async () => {
        setFirstName(props.user.first_name)
        setLastName(props.user.last_name)
        setEmail(props.user.email)
    }

    const updateInfo = async (e: SyntheticEvent) => {
        e.preventDefault();
        const { data } = await axios.put('users/info', {
            first_name,
            last_name,
            email
        })
        props.setUser(new User(
            data.id,
            data.first_name,
            data.last_name,
            data.email,
            data.role
        ))
    }

    const updatePassword = async (e: SyntheticEvent) => {
        e.preventDefault();
        await axios.put('users/password', {
            password,
            password_confirm
        })
    }

    useEffect(() => {
        fetchUser();
    }, [props.user])

    return (
        <Wrapper>
            <h3 className='my-4'>Account Information</h3>
            <form onSubmit={updateInfo}>
                <div className='mb-3'>
                    <label>First Name</label>
                    <input type='text' className='form-control' defaultValue={first_name} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className='mb-3'>
                    <label>Last Name</label>
                    <input type='text' className='form-control' defaultValue={last_name} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div className='mb-3'>
                    <label>Email</label>
                    <input type='email' className='form-control' defaultValue={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <button className='btn btn-outline-primary'>Save</button>
            </form>
            <h3 className='my-4'>Change Password</h3>
            <form onSubmit={updatePassword}>
                <div className='mb-3'>
                    <label>New Password</label>
                    <input type='password' className='form-control' onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className='mb-3'>
                    <label>Confirm Password</label>
                    <input type='text' className='form-control' onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <button className='btn btn-outline-primary'>Save</button>
            </form>
        </Wrapper>
    )
}


const mapStateToProps = (state: { user: User }) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        setUser: (user: User) => dispatch(setUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)