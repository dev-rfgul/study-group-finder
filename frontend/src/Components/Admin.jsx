import React from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'

const Admin = () => {
    return (
        <>
            <div>welcom to the Admin page</div>
            <Link to="/admin/user">User</Link>
            <Link to="/admin/user/edit-user">Edit User</Link>
        </>
    )
}

export default Admin