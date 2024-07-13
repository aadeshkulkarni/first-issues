import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import FeedbackSkeleton from "./SkeletonFeedbacks";

interface FeedbackProp {
  _id: string;
  name: string;
  email: string;
  feedback: string;
}

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState<FeedbackProp[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchFeedbacks = async () => {
    try {
      const response = await fetch("/api/feedback", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });
      const data: FeedbackProp[] = await response.json();
      // To Display the latest feedbacks first
      const sortedData = data.sort((a, b) => (a._id < b._id ? 1 : -1));
      setFeedbacks(sortedData);
      console.log(sortedData);
    } catch (error) {
      console.error("Failed to fetch feedbacks", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);



  return (
    <div className="p-4 flex flex-col justify-center items-center">
      <h1 className="text-2xl uppercase font-semibold mb-6 mt-0 text-slate-700 dark:text-slate-300">
        Feedbacks
      </h1>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-8">
          {Array.from({ length: 9 }).map((_, index) => (
            <FeedbackSkeleton key={index} />
          ))}
        </div>
      ) : (
        <FeedbacksList feedbacks={feedbacks} />
      )}
    </div>
  );
};
const FeedbacksList = ({ feedbacks }: { feedbacks: FeedbackProp[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {feedbacks.map((feedback) => (
        <FeedbackCard key={feedback._id} feedback={feedback} />
      ))}
    </div>
  );
};

const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + "...";
};
const FeedbackCard = ({ feedback }: { feedback: FeedbackProp }) => {
  return (
    <Card className="w-80 mx-auto bg-transparent transform transition-transform duration-300 hover:scale-105">
      <CardHeader>
        <div className="flex flex-col ">
          <h1 className=" font-medium text-md text-slate-700 dark:text-slate-300">
            {feedback.name || "Anonymous"}
          </h1>
          <p className="font-light text-sm text-gray-500 ">{feedback.email}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className=" text-sm text-muted-foreground">
          <p className="">{truncateText(feedback.feedback, 130)}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Feedback;
