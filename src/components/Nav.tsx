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
      <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <a className="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="#">Company name</a>
        <ul className="my-2 my-md-0 mr-md-3">
          <Link to={"/"} className="p-2 text-white">{user.name}</Link>
          <Link to={"/login"} className="p-2 text-white" onClick={() => { logout() }}>Sign out</Link>
        </ul>
      </nav>
    </>
  )
}

export default Nav;
