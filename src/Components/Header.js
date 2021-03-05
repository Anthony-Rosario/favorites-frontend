import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css'


export default class Header extends Component {
    render() {
        return (
            <div className="header-link">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/search">Search</NavLink>
                {this.props.user && this.props.user.token && <>
                <NavLink to="/favorites">Favorites</NavLink>
                <button onClick={this.props.handleLogout} className="header-button">Sign Out</button> </>}
                {(!this.props.user || !this.props.user.token) && <>
                <NavLink to="/login">Log In</NavLink>
                <NavLink to="/signup">Sign Up</NavLink> </>}
            </div>
        )
    }
}
