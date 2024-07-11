import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const Skeleton: React.FC = () => {
  return (
    <Card className="w-60 mx-auto animate-pulse">
      <CardHeader>
        <div className="flex flex-col items-center space-y-2">
          <div className="w-24 h-24 bg-gray-100 rounded-full"></div>
          <div className="h-4 bg-gray-100 rounded w-1/2"></div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-4 bg-gray-100 rounded w-3/4 mx-auto mt-2"></div>
        <div className="h-4 bg-gray-100 rounded w-1/2 mx-auto mt-2"></div>
      </CardContent>
    </Card>
  );
};

export default Skeleton;
