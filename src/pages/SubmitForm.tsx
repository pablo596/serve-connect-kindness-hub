
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar, Upload } from "lucide-react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { toast } from "@/components/ui/use-toast";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { getAllCategories } from '../utils/serviceUtils';

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  location: z.string().min(5, "Location must be at least 5 characters"),
  contact: z.string().email("Please provide a valid email address"),
  date: z.string().min(1, "Please select a date"),
  category: z.string().min(1, "Please select a category"),
  image: z.instanceof(FileList).refine(files => {
    if (files.length === 0) return true;
    const file = files[0];
    return file && (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp');
  }, "Please upload a valid image file (JPEG, PNG, or WEBP)"),
});

type FormData = z.infer<typeof formSchema>;

const SubmitForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const categories = getAllCategories().filter(cat => cat !== "All");

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      contact: "",
      date: "",
      category: "",
      image: undefined,
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    // Simulate form submission
    try {
      console.log('Form submission data:', data);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast({
        title: "Success!",
        description: "Your service opportunity has been submitted for review.",
      });
      
      form.reset();
      setPreviewUrl(null);
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Error",
        description: "There was a problem submitting your form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main>
        <section className="py-8 bg-secondary/30">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-3xl font-bold mb-4">Submit a Service Opportunity</h1>
              <p className="text-muted-foreground">
                Have a service project that needs volunteers? Fill out the form below to submit your opportunity to our platform.
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-8">
          <div className="container-custom max-w-3xl">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Opportunity Title</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Community Park Cleanup" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Provide details about the opportunity, what volunteers will do, and any requirements." 
                            {...field} 
                            rows={5} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Central Park, New York" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="contact"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Email</FormLabel>
                          <FormControl>
                            <Input placeholder="your@email.com" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                              <Input 
                                type="date" 
                                className="pl-10" 
                                min={new Date().toISOString().split('T')[0]} 
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <FormControl>
                            <select
                              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                              {...field}
                              defaultValue=""
                            >
                              <option value="" disabled>Select a category</option>
                              {categories.map(category => (
                                <option key={category} value={category}>
                                  {category}
                                </option>
                              ))}
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field: { onChange, value, ...rest } }) => (
                      <FormItem>
                        <FormLabel>Image (Optional)</FormLabel>
                        <FormControl>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                            {previewUrl ? (
                              <div className="mb-4">
                                <img 
                                  src={previewUrl} 
                                  alt="Preview" 
                                  className="mx-auto h-40 object-cover rounded-md"
                                />
                              </div>
                            ) : (
                              <div className="flex flex-col items-center justify-center py-6">
                                <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                                <p className="text-muted-foreground text-sm">
                                  Upload an image that represents your opportunity
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  JPG, PNG, WEBP up to 5MB
                                </p>
                              </div>
                            )}
                            <input
                              type="file"
                              id="image"
                              className="hidden"
                              onChange={(e) => {
                                handleImageChange(e);
                                onChange(e.target.files);
                              }}
                              accept="image/jpeg,image/png,image/webp"
                              {...rest}
                            />
                            <label 
                              htmlFor="image" 
                              className="btn-secondary inline-block cursor-pointer mt-2"
                            >
                              {previewUrl ? 'Change Image' : 'Select Image'}
                            </label>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Opportunity'}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default SubmitForm;
