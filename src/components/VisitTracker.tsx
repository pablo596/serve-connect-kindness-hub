
import React, { useEffect, useState } from 'react';
import { Clock } from "lucide-react";
import { trackLastVisit } from "../utils/serviceUtils";

const VisitTracker = () => {
  const [message, setMessage] = useState("");
  
  useEffect(() => {
    setMessage(trackLastVisit());
  }, []);
  
  if (!message) return null;
  
  return (
    <div className="bg-secondary/70 rounded-lg p-4 flex items-center text-sm animate-fade-in">
      <Clock className="h-4 w-4 mr-2 text-primary" />
      <span>{message}</span>
    </div>
  );
};

export default VisitTracker;
