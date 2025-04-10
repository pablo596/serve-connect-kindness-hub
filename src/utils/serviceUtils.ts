
import { ServiceOpportunity } from "../types/types";
import { serviceOpportunities } from "../data/services";

export const getServiceById = (id: string): ServiceOpportunity | undefined => {
  return serviceOpportunities.find(service => service.id === id);
};

export const getFilteredServices = (
  category?: string, 
  searchTerm?: string
): ServiceOpportunity[] => {
  let filtered = [...serviceOpportunities];
  
  if (category && category !== "All") {
    filtered = filtered.filter(service => service.category === category);
  }
  
  if (searchTerm) {
    const searchLower = searchTerm.toLowerCase();
    filtered = filtered.filter(service => 
      service.title.toLowerCase().includes(searchLower) || 
      service.description.toLowerCase().includes(searchLower) ||
      service.location.toLowerCase().includes(searchLower)
    );
  }
  
  return filtered;
};

export const getAllCategories = (): string[] => {
  const categories = serviceOpportunities.map(service => service.category);
  return ["All", ...Array.from(new Set(categories))];
};

export const trackLastVisit = (): string => {
  const lastVisit = localStorage.getItem('lastVisit');
  const now = new Date().toISOString();
  localStorage.setItem('lastVisit', now);
  
  if (!lastVisit) {
    return "Welcome to ServeTrack! This appears to be your first visit.";
  }
  
  const lastVisitDate = new Date(lastVisit);
  const formattedDate = lastVisitDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  return `Welcome back! Your last visit was on ${formattedDate}`;
};
