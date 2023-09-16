import { useEffect, useState } from "react";
import Wrapper from "../../components/Wrapper";
import axios from "axios";
import { User } from "../../Models/User";
import { Link } from "react-router-dom";
import Paginator from "../../components/Paginator";

const Users = () => {

    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    const fetchUsers = async () => {
        (async () => {
            const { data } = await axios.get(`users?page=${page}`);
            setUsers(data.data)
            setLastPage(data.meta.last_page)
        })()
    }

    useEffect(() => {
        fetchUsers()
    }, [page])

    const deleteUser = async (id: number) => {
        if (window.confirm('Are you sure to delete this user ?')) {
            (async () => await axios.delete(`users/${id}`))().then(() => fetchUsers())
        }
    }

    return (
        <Wrapper>
            <div className="pt-3 pb-2 mb-3 border-bottom">
                <Link to={'/users/create'} className="btn btn-sm btn-outline-secondary">Create</Link>
            </div>
            <div className="table-responsive small">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Role</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user: User, i) => (
                                <tr>
                                    <td>{user.id}</td>
                                    <td>{user.first_name}</td>
                                    <td>{user.last_name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role.name}</td>
                                    <td>
                                        <div className="btn-group">
                                            <Link to={`/users/${user.id}/edit`} className="btn btn-sm btn-outline-secondary mx-2">Edit</Link>
                                            <a className="btn btn-sm btn-outline-danger" onClick={() => deleteUser(user.id)}>Delete</a>
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

export default Users;