
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ExternalLink } from 'lucide-react';

const Attribution = ({ title, url, description }: { title: string, url: string, description: string }) => (
  <div className="border-b last:border-b-0 py-3">
    <h3 className="font-medium mb-1">{title}</h3>
    <p className="text-sm text-muted-foreground mb-1">{description}</p>
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-sm text-primary hover:underline flex items-center gap-1"
    >
      {url} <ExternalLink className="h-3 w-3" />
    </a>
  </div>
);

const AttributionsPage = () => {
  const images = [
    { 
      title: "Park Cleanup Image", 
      url: "https://unsplash.com/photos/green-grass-field-near-body-of-water-during-daytime-1499856871958-5b9357976b82", 
      description: "Image used for the Park Cleanup service opportunity" 
    },
    { 
      title: "Food Drive Image", 
      url: "https://unsplash.com/photos/person-holding-red-and-white-can-1593113598332-cd288d649433", 
      description: "Image used for the Food Drive service opportunity" 
    },
    { 
      title: "Senior Companion Image", 
      url: "https://unsplash.com/photos/woman-in-white-dress-shirt-sitting-beside-woman-in-black-long-sleeve-shirt-1577495508048-b635879837f1", 
      description: "Image used for the Senior Companion service opportunity" 
    },
    { 
      title: "Literacy Tutoring Image", 
      url: "https://unsplash.com/photos/selective-focus-photography-of-person-reading-book-1503676260728-1c00da094a0b", 
      description: "Image used for the Literacy Tutoring service opportunity" 
    },
    { 
      title: "Animal Shelter Support Image", 
      url: "https://unsplash.com/photos/selective-focus-photography-of-adult-black-and-white-border-collie-1548199973-03cce0bbc87b", 
      description: "Image used for the Animal Shelter Support service opportunity" 
    },
    { 
      title: "Community Garden Image", 
      url: "https://unsplash.com/photos/person-harvesting-crops-1471193945509-9ad0617afabf", 
      description: "Image used for the Community Garden service opportunity" 
    },
  ];

  const libraries = [
    { 
      title: "React", 
      url: "https://reactjs.org/", 
      description: "A JavaScript library for building user interfaces" 
    },
    { 
      title: "React Router", 
      url: "https://reactrouter.com/", 
      description: "Declarative routing for React applications" 
    },
    { 
      title: "Lucide React", 
      url: "https://lucide.dev/", 
      description: "Beautiful & consistent icon toolkit for React" 
    },
    { 
      title: "Tailwind CSS", 
      url: "https://tailwindcss.com/", 
      description: "A utility-first CSS framework" 
    },
    { 
      title: "React Hook Form", 
      url: "https://react-hook-form.com/", 
      description: "Performant, flexible and extensible forms" 
    },
    { 
      title: "Zod", 
      url: "https://github.com/colinhacks/zod", 
      description: "TypeScript-first schema validation with static type inference" 
    },
  ];

  return (
    <>
      <Navbar />
      <main className="py-8">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Attributions</h1>
            
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Images</h2>
              <p className="text-muted-foreground mb-4">
                All images used in this project are from Unsplash, a platform that provides freely-usable images.
              </p>
              <div className="space-y-2">
                {images.map((image, index) => (
                  <Attribution key={index} {...image} />
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold mb-4">Libraries & Resources</h2>
              <p className="text-muted-foreground mb-4">
                This project was built using the following open-source libraries and resources:
              </p>
              <div className="space-y-2">
                {libraries.map((library, index) => (
                  <Attribution key={index} {...library} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AttributionsPage;
