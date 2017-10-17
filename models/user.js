const mongoose = require("mongoose")
const Schema = mongoose.Schema

// create a schema
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  questions: [],
  answers: []
})

const User = mongoose.model("user", userSchema)

module.exports = User
