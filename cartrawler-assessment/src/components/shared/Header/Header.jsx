import React from "react";
import "./Header.css";
// Import Logo if available, or use text as placeholder
// import Logo from '../shared/Logo/Logo';

const Header = () => {
  return (
    <header className="ct-header">
      {/* Replace with <Logo /> if you have a logo component */}
      <div className="ct-header__logo">CarTrawler</div>
      <nav className="ct-header__nav">
        <a href="/" className="ct-header__link">Home</a>
        <a href="/about" className="ct-header__link">About</a>
        <a href="/contact" className="ct-header__link">Contact</a>
      </nav>
    </header>
  );
};

export default Header;
