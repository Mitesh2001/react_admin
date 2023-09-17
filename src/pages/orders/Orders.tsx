import axios from "axios";
import { useEffect, useState } from "react";
import Wrapper from "../../components/Wrapper";
import { Link } from "react-router-dom";
import { Order } from "../../Models/Order";
import Paginator from "../../components/Paginator";
import { OrderItem } from "../../Models/OrderItem";

const hide = {
    maxHeight: 0,
    transition: "500ms ease-in"
}

const show = {
    maxHeight: '150px',
    transition: "500ms ease-out"
}

const Orders = () => {

    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [selectedOrderId, setSelectedOrderId] = useState(0);

    const fetchOrders = async () => {
        (async () => {
            const { data } = await axios.get(`orders?page=${page}`);
            setOrders(data.data)
            setLastPage(data.meta.last_page)
        })()
    }

    useEffect(() => {
        fetchOrders()
    }, [page])

    const deleteOrder = async (id: number) => {
        if (window.confirm('Are you sure to delete this user ?')) {
            (async () => await axios.delete(`orders/${id}`))().then(() => fetchOrders())
        }
    }

    const selectOrder = (id: number) => {
        setSelectedOrderId(selectedOrderId === id ? 0 : id)
    }

    const exportOrders = async () => {
        const { data } = await axios.post('export-orders', {}, { responseType: 'blob' });
        const blob = new Blob([data], { type: "text/csv" })
        const url = window.URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'orders.csv';
        link.click();
    }

    return (
        <Wrapper>
            <div className="pt-3 pb-2 mb-3 border-bottom">
                <button className="btn btn-sm btn-outline-secondary" onClick={() => exportOrders()}>Export</button>
            </div>
            <div className="table-responsive">
                <table className="table table-sm">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Total</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((order: Order, i) => (
                                <>
                                    <tr>
                                        <td>{order.id}</td>
                                        <td>{order.name}</td>
                                        <td>{order.email}</td>
                                        <td>{order.total}</td>
                                        <td>
                                            <div className="btn-group">
                                                <a className="btn btn-sm btn-outline-secondary" onClick={() => { selectOrder(order.id) }}>{selectedOrderId === order.id ? "Hide" : "View"}</a>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={5}>
                                            <div className="overflow-hidden" style={selectedOrderId == order.id ? show : hide}>
                                                <table className="table table-secondary table-sm">
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th>Product Title</th>
                                                            <th>Quantity</th>
                                                            <th>Price</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            order.order_items.map((orderItem: OrderItem) => (
                                                                <tr>
                                                                    <td>{orderItem.id}</td>
                                                                    <td>{orderItem.product_title}</td>
                                                                    <td>{orderItem.quantity}</td>
                                                                    <td>{orderItem.price}</td>
                                                                </tr>
                                                            ))
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </td>
                                    </tr >
                                </>
                            ))
                        }
                    </tbody>
                </table>
                <Paginator page={page} lastPage={lastPage} changePage={setPage} />
            </div>
        </Wrapper >
    )
}

export default Orders