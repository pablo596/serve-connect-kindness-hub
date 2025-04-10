
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ServiceCard from '../components/ServiceCard';
import ServiceModal from '../components/ServiceModal';
import VisitTracker from '../components/VisitTracker';
import { serviceOpportunities } from '../data/services';
import { getServiceById } from '../utils/serviceUtils';

const Index = () => {
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  
  const featuredServices = serviceOpportunities.slice(0, 3);
  
  const selectedService = selectedServiceId ? getServiceById(selectedServiceId) : undefined;
  
  const handleViewDetails = (id: string) => {
    setSelectedServiceId(id);
  };
  
  const closeModal = () => {
    setSelectedServiceId(null);
  };

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/20 to-secondary py-16">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight animate-fade-in">
                Make a Difference in Your Community
              </h1>
              <p className="text-lg mb-8 text-muted-foreground animate-fade-in" style={{ animationDelay: '0.1s' }}>
                ServeTrack connects volunteers with meaningful service opportunities. Start making an impact today!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <Link to="/opportunities" className="btn-primary flex items-center justify-center gap-2">
                  Find Opportunities
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/submit" className="btn-secondary flex items-center justify-center gap-2">
                  Submit Opportunity
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Visit Tracker */}
        <section className="py-6">
          <div className="container-custom">
            <VisitTracker />
          </div>
        </section>
        
        {/* Featured Services */}
        <section className="py-12">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Featured Opportunities</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Check out these impactful service opportunities that need your help. Make a difference in your community today.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredServices.map(service => (
                <ServiceCard 
                  key={service.id} 
                  service={service} 
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
            
            <div className="mt-10 text-center">
              <Link to="/opportunities" className="btn-primary inline-flex items-center gap-2">
                View All Opportunities
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
        
        {/* Impact Section */}
        <section className="py-16 bg-secondary/50">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Why Volunteer?</h2>
                <p className="text-muted-foreground mb-6">
                  Volunteering creates meaningful connections and makes our communities stronger. When you serve others, you:
                </p>
                <ul className="space-y-3">
                  {['Make a tangible difference in people\'s lives', 
                    'Learn new skills and gain valuable experience',
                    'Connect with like-minded individuals in your community',
                    'Improve your mental health and sense of purpose'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <Heart className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1593113598332-cd288d649433" 
                  alt="Volunteers working together" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      
      {selectedService && (
        <ServiceModal service={selectedService} onClose={closeModal} />
      )}
    </>
  );
};

export default Index;
