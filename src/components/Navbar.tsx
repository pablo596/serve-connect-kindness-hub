
import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { Home, Handshake, FileEdit, Info } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? "nav-link-active" : "";
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container-custom py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex items-center space-x-2">
            <Handshake className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">ServeTrack</span>
          </Link>
          
          <nav className="flex items-center space-x-1">
            <Link to="/" className={`nav-link flex items-center space-x-1 ${isActive("/")}`}>
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link to="/opportunities" className={`nav-link flex items-center space-x-1 ${isActive("/opportunities")}`}>
              <Handshake className="h-4 w-4" />
              <span>Opportunities</span>
            </Link>
            <Link to="/submit" className={`nav-link flex items-center space-x-1 ${isActive("/submit")}`}>
              <FileEdit className="h-4 w-4" />
              <span>Submit</span>
            </Link>
            <Link to="/attributions" className={`nav-link flex items-center space-x-1 ${isActive("/attributions")}`}>
              <Info className="h-4 w-4" />
              <span>Attributions</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
