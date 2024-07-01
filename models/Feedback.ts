const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI!);

const FeedbackSchema = new mongoose.Schema({
  name: { type: String, required: false },
  email: { type: String, required: true },
  feedback: { type: String, required: true },
});

const Feedback = mongoose.model("Feedback", FeedbackSchema);

export default Feedback;
