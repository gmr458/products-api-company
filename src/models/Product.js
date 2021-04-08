import { model, Schema } from "mongoose";

const productSchema = new Schema(
	{
		brand: String,
		model: String,
		category: String,
		price: Number,
		imgURL: String,
	},
	{ timestamps: true, versionKey: false }
);

export default model("Product", productSchema);
