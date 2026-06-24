import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="logo">
        🎮 Steam Lite
      </div>

      <div className="nav-links">
        <Link to="/">Store</Link>
        <Link to="/library">Library</Link>
        <Link to="/statistics">Statistics</Link>
      </div>
    </div>
  );
}