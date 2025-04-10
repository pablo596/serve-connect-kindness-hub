
import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ServiceCard from '../components/ServiceCard';
import ServiceModal from '../components/ServiceModal';
import { getFilteredServices, getAllCategories, getServiceById } from '../utils/serviceUtils';

const Opportunities = () => {
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredServices, setFilteredServices] = useState(getFilteredServices());
  const categories = getAllCategories();
  
  useEffect(() => {
    setFilteredServices(getFilteredServices(
      selectedCategory === "All" ? undefined : selectedCategory, 
      searchTerm || undefined
    ));
  }, [selectedCategory, searchTerm]);
  
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
        <section className="py-8 bg-secondary/30">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-3xl font-bold mb-4">Service Opportunities</h1>
              <p className="text-muted-foreground">
                Browse through our collection of service opportunities and find the perfect way to make a difference in your community.
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-8">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              {/* Search */}
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search opportunities..."
                  className="pl-10 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary/50"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {/* Category Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <select
                  className="pl-10 pr-8 py-2 border rounded-md appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>

            {filteredServices.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map(service => (
                  <ServiceCard 
                    key={service.id} 
                    service={service} 
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  No service opportunities match your search criteria.
                </p>
              </div>
            )}
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

export default Opportunities;
