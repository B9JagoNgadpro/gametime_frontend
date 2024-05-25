"use client"
import React, { Component } from 'react';

class Logout extends Component {
    handleLogout = () => {
        localStorage.clear(); // Clear all items in local storage
        // You can also add additional logout logic here, such as redirecting to the login page
    };

    render() {
        return (
            <button onClick={this.handleLogout}>
                Logout
            </button>
        );
    }
}

export default Logout;
