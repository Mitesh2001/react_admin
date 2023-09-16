import React, { SyntheticEvent, useEffect, useState } from 'react'
import Wrapper from '../../components/Wrapper'
import axios from 'axios';
import { Role } from '../../Models/Role';
import { Navigate } from 'react-router-dom';

const ProductCreate = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [redirect, setRedirect] = useState(false)

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        await axios.post('products', {
            title,
            description,
            image,
            price
        })
        setRedirect(true)
    }

    if (redirect) {
        return <Navigate to={'/products'} />;
    }

    return (
        <>
            <Wrapper>
                <form onSubmit={submit}>
                    <div className="form-floating my-2">
                        <input onChange={e => setTitle(e.target.value)} type="text" className="form-control" placeholder='Title' id="title" />
                        <label htmlFor="title">Title</label>
                    </div>
                    <div className="form-floating my-2">
                        <textarea onChange={e => setDescription(e.target.value)} className="form-control" id="description" />
                        <label htmlFor="description">Description</label>
                    </div>
                    <div className="form-floating my-2">
                        <input onChange={e => setImage(e.target.value)} type="text" className="form-control" placeholder='Image' id="image" />
                        <label htmlFor="title">Image</label>
                    </div>
                    <div className="form-floating my-2">
                        <input onChange={e => setPrice(e.target.value)} type="number" className="form-control" placeholder='Price' id="price" />
                        <label htmlFor="price">Price</label>
                    </div>
                    <button className="btn btn-primary w-100 py-2" type="submit">save</button>
                </form>
            </Wrapper>
        </>
    )
}

export default ProductCreate