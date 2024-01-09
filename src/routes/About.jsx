import React from "react";
import { Link } from "react-router-dom";

function About() {
    return (
        <div >
            <h1>I am the About componet</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/">Login</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                    <li>
                        <Link to="/home">home</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default About;
