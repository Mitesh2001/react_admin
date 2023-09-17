import { SyntheticEvent, useEffect, useState } from 'react'
import Wrapper from '../../components/Wrapper'
import axios from 'axios';
import { Navigate, useParams } from 'react-router-dom';
import ImageUpload from '../../components/ImageUpload';

const ProductEdit = () => {

    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [redirect, setRedirect] = useState(false)

    const fetchProduct = async () => {
        const { data } = await axios.get(`products/${id}`);
        setTitle(data.title);
        setDescription(data.description);
        setImage(data.image);
        setPrice(data.price);
    }

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        await axios.put(`products/${id}`, {
            title,
            description,
            image,
            price
        })
        setRedirect(true)
    }

    useEffect(() => { fetchProduct() }, [id])

    if (redirect) {
        return <Navigate to={'/products'} />;
    }

    return (
        <>
            <Wrapper>
                <form onSubmit={submit}>
                    <div className="form-floating my-2">
                        <input onChange={e => setTitle(e.target.value)} type="text" className="form-control" placeholder='Title' id="title" value={title} />
                        <label htmlFor="title">Title</label>
                    </div>
                    <div className="form-floating my-2">
                        <textarea onChange={e => setDescription(e.target.value)} className="form-control" id="description" value={description} />
                        <label htmlFor="description">Description</label>
                    </div>
                    <div className="my-2">
                        <label htmlFor="title">Image</label>
                        <div className='input-group'>
                            <input onChange={e => setImage(e.target.value)} type="text" value={image} className="form-control" placeholder='Image' id="image" readOnly />
                            <ImageUpload setUploadedUrl={setImage} />
                        </div>
                    </div>
                    <div className="form-floating my-2">
                        <input onChange={e => setPrice(e.target.value)} type="number" className="form-control" placeholder='Price' id="price" value={price} />
                        <label htmlFor="price">Price</label>
                    </div>
                    <button className="btn btn-primary w-100 py-2" type="submit">save</button>
                </form>
            </Wrapper>
        </>
    )
}

export default ProductEdit