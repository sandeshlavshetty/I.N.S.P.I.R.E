import mongoose, { Schema, model, models } from "mongoose";

const pollSchema = new Schema({
	name: { type: String, required: true },
	timings: { type: [String], required: true },
	date: { type: Date, required: true },
	status: {
		type: String,
		enum: ["pending", "active", "ended"],
		default: "pending",
	},
	createdAt: { type: Date, default: Date.now },
});

const Poll = models.Poll || model("Poll", pollSchema);

export default Poll;
