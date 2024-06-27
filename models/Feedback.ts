const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI!);

interface IFeedback extends Document {
  name?: string;
  feedback: string;
}

const FeedbackSchema = new mongoose.Schema({
  name: { type: String, required: false },
  feedback: { type: String, required: true },
});

const Feedback = mongoose.model("Feedback", FeedbackSchema);

export default Feedback;
