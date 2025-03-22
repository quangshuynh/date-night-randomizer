import React from 'react';
import '../styles/header.css';

const Header = () => {
  return (
    <div classname = "header-background">
        <header className="site-header">
            <div className="header-content">
            <h1 className="header-title">Date Night Randomizer</h1>
            <p className="header-tagline">
                Spice up your evenings with fun, quirky, and local vibes!
            </p>
            </div>
        </header>
    </div>
  );
};

export default Header;
