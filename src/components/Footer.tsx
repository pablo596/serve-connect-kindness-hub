
import React from 'react';
import { Link } from "react-router-dom";
import { Heart, Github, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary py-8 mt-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">ServeTrack</h3>
            <p className="text-sm text-muted-foreground">
              Connecting volunteers with meaningful service opportunities since 2025.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/opportunities" className="text-sm hover:text-primary transition-colors">Opportunities</Link></li>
              <li><Link to="/submit" className="text-sm hover:text-primary transition-colors">Submit</Link></li>
              <li><Link to="/attributions" className="text-sm hover:text-primary transition-colors">Attributions</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-sm">
              <a href="mailto:info@servetrack.org" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail size={14} />
                info@servetrack.org
              </a>
              <a href="https://github.com/servetrack" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Github size={14} />
                GitHub Repository
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-muted flex justify-center">
          <p className="text-sm text-center flex items-center gap-1">
            Made with <Heart className="h-4 w-4 text-destructive animate-pulse" /> by ServeTrack Team © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
