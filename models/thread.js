const mongoose = require("mongoose")
const Schema = mongoose.Schema

//answer schema
const answerSchema = new Schema({
  content: { type: String, required: true },
  user: { type: String, default: "anonymous" },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 }
})

//thread schema
const threadSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  user: { type: String, default: "anonymous" },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  answers: [answerSchema]
})

const Thread = mongoose.model("threads", threadSchema)

module.exports = Thread
