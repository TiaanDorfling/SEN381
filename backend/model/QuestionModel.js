// backend/model/QuestionModel.js
import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Question title is required"],
      trim: true,
      minlength: 5,
      maxlength: 200,
    },
    body: {
      type: String,
      required: [true, "Question body is required"],
      trim: true,
      minlength: 10,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: false, // optional in case it's a general question
    },
    moduleCode: {
      type: String,
      required: false,
      trim: true,
    },
    responses: [
      {
        tutor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        message: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", QuestionSchema);
export default Question;
