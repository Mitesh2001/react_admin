import axios from "axios";
import { useEffect, useState } from "react";
import { Link, redirect } from "react-router-dom";
import { User } from "../Models/User";

const Nav = () => {
  const [user, setUser] = useState(new User());

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("user");
      setUser(new User(
        data.id,
        data.first_name,
        data.last_name,
        data.email
      ))
    })()
  }, [])

  const logout = async () => {
    await axios.get('logout').then(() => { })
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
            </ul>
            <div className="d-flex" role="search">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link p-2">{user.name}</Link>
                </li>
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link p-2" onClick={() => { logout() }}>Sign out</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Nav;
