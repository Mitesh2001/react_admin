import { ChangeEvent, useState } from 'react';

const Login = () => {

    const [count, setCount] = useState<number>(0);

    return (
        <div className='container'>
            <h1>count : {count}</h1>
            <input onChange={(e: ChangeEvent<HTMLInputElement>) => setCount(parseInt(e.target.value))} type="number" className='form-control' />
        </div>
    )
}

export default Login;