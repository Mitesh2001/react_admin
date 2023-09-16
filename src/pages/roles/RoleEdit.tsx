import { SyntheticEvent, useEffect, useState } from "react"
import Wrapper from "../../components/Wrapper"
import axios from "axios";
import { Permission } from "../../Models/Permissions";
import { Navigate, useParams } from "react-router-dom";

const RolesEdit = () => {

    const { id } = useParams();
    const [name, setName] = useState('');
    const [permissions, setPermissions] = useState([]);
    const [selectedPermissions, setSelectedPermissions] = useState([] as number[]);
    const [redirect, setRedirect] = useState(false)

    const fetchRole = async () => {

        const { data } = await axios.get(`roles/${id}`);
        setName(data.name)
        setSelectedPermissions(data.permissions.map((p: Permission) => p.id));
    }

    const fetchRolePermissions = async () => {

        const { data } = await axios.get('permissions');
        setPermissions(data);

    }

    useEffect(() => {
        fetchRole();
        fetchRolePermissions()
    }, [])

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        await axios.put(`roles/${id}`, {
            name,
            permissions: selectedPermissions
        })
        setRedirect(true)
    }

    const check = (id: number) => {
        if (selectedPermissions.filter(s => s === id).length > 0) {
            setSelectedPermissions(selectedPermissions.filter(s => s !== id))
            return;
        }
        setSelectedPermissions([...selectedPermissions, id])
    }

    if (redirect) {
        return <Navigate to={'/roles'} />;
    }

    return (

        <Wrapper>
            <form onSubmit={submit}>
                <div className="form-group my-2 row">
                    <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-10">
                        <input type="text" defaultValue={name} className="form-control" name="name" id="name"
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                </div>

                <div className="form-group my-2 row">
                    <label className="col-sm-2 col-form-label">Permissions</label>
                    <div className="col-sm-10">
                        {permissions.map(
                            (p: Permission) => {
                                return (
                                    <div className="form-check form-check-inline col-3" key={p.id}>
                                        <label className="form-check-label">
                                            <input className="form-check-input" type="checkbox" value={p.id}
                                                onChange={e => check(p.id)}
                                                checked={selectedPermissions.includes(p.id)}
                                            />
                                            {p.name.replace("_", " ")}
                                        </label>
                                    </div>
                                )
                            }
                        )}
                    </div>
                </div>

                <button className="btn btn-outline-secondary">Save</button>
            </form>
        </Wrapper>
    )
}

export default RolesEdit