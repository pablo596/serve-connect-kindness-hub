
import React from 'react';
import { Calendar, MapPin } from "lucide-react";
import { ServiceOpportunity } from "../types/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface ServiceCardProps {
  service: ServiceOpportunity;
  onViewDetails: (id: string) => void;
}

const ServiceCard = ({ service, onViewDetails }: ServiceCardProps) => {
  const formattedDate = new Date(service.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Card className="overflow-hidden card-hover h-full flex flex-col">
      <div className="aspect-video w-full overflow-hidden">
        <img 
          src={service.image} 
          alt={service.title} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
          loading="lazy"
          width="400"
          height="225"
        />
      </div>
      <CardHeader>
        <div className="inline-block bg-primary/20 text-primary px-2 py-1 rounded text-xs mb-2">
          {service.category}
        </div>
        <CardTitle>{service.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {service.description}
        </p>
        <div className="flex items-center text-xs text-muted-foreground mb-1">
          <Calendar className="h-3 w-3 mr-1" />
          <span>{formattedDate}</span>
        </div>
        <div className="flex items-center text-xs text-muted-foreground">
          <MapPin className="h-3 w-3 mr-1" />
          <span>{service.location}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={() => onViewDetails(service.id)} 
          className="w-full"
        >
          Learn More
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
