'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import exp from "constants"
import { useState } from "react";

export function FeedbackForm() {
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, feedback }),
    });

    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center items-center h-screen">
          <Card className="w-full max-w-md p-6 sm:p-8">
            <CardHeader>
              <CardTitle>Give us your feedback</CardTitle>
              <CardDescription>Your feedback helps us improve our product.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="feedback">Feedback</Label>
                <Textarea id="feedback" placeholder="Share your thoughts and suggestions" className="min-h-[120px]" value={feedback}
                  onChange={(e) => setFeedback(e.target.value)} required />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Submit</Button>
            </CardFooter>
          </Card>
        </div>
      </form>
      {message && <p>{message}</p>}
    </>
  )
}

export default FeedbackForm
