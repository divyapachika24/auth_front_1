import React from 'react';
import { Link } from "react-router-dom";
import AuthFeatures from "../auth/AuthFeatures";

export default function Header() {
    return (
        <header id="header">
            <Link to="/">
                <h1 className="label">Personal Budget Tracker</h1>
            </Link>  
            <AuthFeatures />
        </header>
    );
}
