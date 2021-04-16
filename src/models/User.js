import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
	{
		username: { type: String, unique: true },
		email: { type: String, unique: true },
		password: { type: String, required: true },
		roles: [{ ref: "Role", type: Schema.Types.ObjectId }],
	},
	{ timestamps: true, versionKey: false }
);

userSchema.statics.encryptPassword = async (password) => {
	const salt = await bcrypt.genSalt(10);
	const encryptedPassword = await bcrypt.hash(password, salt);
	return encryptedPassword;
}

userSchema.statics.comparePassword = async (password, receivedPassword) => {
	const isCorrect = await bcrypt.compare(password, receivedPassword);
	return isCorrect;
}

export default model("User", userSchema);
