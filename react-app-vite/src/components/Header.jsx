import { Link } from "react-router-dom";
import { FaHome, FaUserAstronaut, FaSignInAlt } from "react-icons/fa";
import "./Header.css";

export default function Header() {
    return (
        <header className="header">
            <div className="header-left">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Rick_and_Morty.svg"
                    alt="Rick and Morty Logo"
                    className="header-logo"
                />

            </div>

            <nav className="header-nav">
                <Link to="/" className="header-link">
                    <FaHome className="icon" /> Home
                </Link>

                <Link to="/characters" className="header-link">
                    <FaUserAstronaut className="icon" /> Characters
                </Link>

                <Link to="/login" className="header-link">
                    <FaSignInAlt className="icon" /> Login
                </Link>
            </nav>
        </header>
    );
}
