import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
    return (
        <header className="header">
            <Link to="/" id="logo-container">
                <img className="header-img" src="src/assets/ship.webp" alt="Logo" />
            </Link>

            <figure id="mid-container">
                <img id="mid-image" src="src/assets/midImage.png" alt="Mid Image" />
            </figure>

            <img className="header-img" src="src/assets/profileImage.webp" alt="Profile" />
        </header>
    );
}
