import React from 'react';
import { Link } from 'react-router';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
            <div className="container">
                <div className="navbar-nav mx-auto">
                    <Link className="nav-link" to="/create">Create Form</Link>
                    <Link className="nav-link" to="/preview">Preview Form</Link>
                    <Link className="nav-link" to="/myforms">My Forms</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
