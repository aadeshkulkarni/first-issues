import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const FeedbackSkeleton: React.FC = () => {
  return (
    <Card className="w-80 mx-auto bg-transparent transform transition-transform duration-300 hover:scale-105 animate-pulse">
      <CardHeader>
        <div className="flex flex-col">
          <div className="w-24 h-6 bg-muted rounded mb-2"></div>
          <div className="h-4 bg-muted rounded w-1/2"></div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground">
          <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-muted rounded w-full mb-2"></div>
          <div className="h-4 bg-muted rounded w-5/6 mb-2"></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeedbackSkeleton;
