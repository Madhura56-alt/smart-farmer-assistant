function Navbar({ onLogout }) {
  return (
    <nav className="navbar">

      <h2>🌾 Smart Farmer Assistant</h2>

      <button
        className="logout-btn"
        onClick={onLogout}
      >
        Logout
      </button>

    </nav>
  );
}

export default Navbar;