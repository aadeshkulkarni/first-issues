const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: false },
  owner: { type: String, required: true },
  description: { type: String, required: false },
  language: {type: String, required: false },
  html_url: {type: String, required: false },
  stars: {type: Number, required: false },
  last_modified: {type: String, required: false },
  id: {type: String, required: false},
  issues: {type: Array, required: false},
});


export default mongoose.models.Project || mongoose.model("Project", ProjectSchema)

