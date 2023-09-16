import React, { FC, ReactNode, useEffect, useState } from 'react'
import Nav from './Nav'
import Menu from './Menu'
import axios from 'axios'
import { Navigate } from 'react-router-dom'

interface WrapperProps {
    children: ReactNode
}

const Wrapper: FC<WrapperProps> = ({ children }) => {

    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get("user");
            } catch (error) {
                setRedirect(true)
            }
        })()
    }, [])

    if (redirect) {
        return <Navigate to={'/login'} />
    }

    return (
        <>
            <div className="container-fluid">
                <Nav />
                <div className='row'>
                    <Menu />
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        {children}
                    </main>
                </div>
            </div>
        </>
    )

}

export default Wrapper