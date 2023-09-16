import { useEffect, useState } from "react";
import Wrapper from "../../components/Wrapper";
import axios from "axios";
import { User } from "../../Models/User";
import { Link } from "react-router-dom";
import { Role } from "../../Models/Role";

const Roles = () => {

    const [roles, setRoles] = useState([]);

    const fetchRoles = async () => {
        (async () => {
            const { data } = await axios.get(`roles`);
            setRoles(data)
        })()
    }

    useEffect(() => {
        fetchRoles()
    }, [])

    const deleteRole = async (id: number) => {
        if (window.confirm('Are you sure to delete this user ?')) {
            (async () => await axios.delete(`roles/${id}`))().then(() => fetchRoles())
        }
    }

    return (
        <Wrapper>
            <div className="pt-3 pb-2 mb-3 border-bottom">
                <Link to={'/roles/create'} className="btn btn-sm btn-outline-secondary">Create</Link>
            </div>
            <div className="table-responsive small">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            roles.map((role: Role, i) => (
                                <tr>
                                    <td>{role.id}</td>
                                    <td>{role.name}</td>
                                    <td>
                                        <div className="btn-group">
                                            <Link to={`/roles/${role.id}/edit`} className="btn btn-sm btn-outline-secondary mx-2">Edit</Link>
                                            <a className="btn btn-sm btn-outline-danger" onClick={() => deleteRole(role.id)}>Delete</a>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </Wrapper>
    )

}

export default Roles;