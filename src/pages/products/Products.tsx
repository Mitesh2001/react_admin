import { Link } from "react-router-dom";
import Wrapper from "../../components/Wrapper";
import { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "../../Models/Product";
import Paginator from "../../components/Paginator";


const Products = () => {

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    const fetchProducts = async () => {
        const { data } = await axios.get(`products?page=${page}`);
        setProducts(data.data);
        setLastPage(data.meta.last_page);
    }

    const deleteProduct = (id: number) => {
        if (window.confirm('Are you sure to delete this product ?')) {
            (async () => await axios.delete(`products/${id}`))().then(() => fetchProducts())
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [page])

    return (
        <Wrapper>
            <div className="pt-3 pb-2 mb-3 border-bottom">
                <Link to={'/products/create'} className="btn btn-sm btn-outline-secondary">Create</Link>
            </div>
            <div className="table-responsive small">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Image</th>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                            <th scope="col">Price</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product: Product, i) => (
                                <tr>
                                    <td>{product.id}</td>
                                    <td><img src={product.image} width={50} /></td>
                                    <td>{product.title}</td>
                                    <td>{product.description}</td>
                                    <td>{product.price}</td>
                                    <td>
                                        <div className="btn-group">
                                            <Link to={`/products/${product.id}/edit`} className="btn btn-sm btn-outline-secondary mx-2">Edit</Link>
                                            <a className="btn btn-sm btn-outline-danger" onClick={() => deleteProduct(product.id)}>Delete</a>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <Paginator page={page} lastPage={lastPage} changePage={setPage} />
            </div>
        </Wrapper>
    )
}

export default Products;