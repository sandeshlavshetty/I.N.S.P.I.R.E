import mongoose, { Schema, model, models } from "mongoose";

interface IPoll {
	name: string;
	options: { [option: string]: number }; // Using an object with time as key and votes as value
	date: Date;
	status: "pending" | "active" | "ended";
}

const pollSchema = new Schema<IPoll>({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	options: [
		{
			option: { type: String, required: true },
			votes: { type: Number, default: 0 },
		},
	],
	date: {
		type: Date,
		required: true,
		validate: {
			validator: (date: Date) => date.getTime() > Date.now(),
			message: "The date must be in the future",
		},
	},
	status: {
		type: String,
		enum: ["pending", "active", "ended"],
		default: "pending",
	},
});

const Poll = models.Poll || model("Poll", pollSchema);

export default Poll;
