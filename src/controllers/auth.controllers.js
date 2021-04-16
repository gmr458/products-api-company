import User from "../models/User";
import jwt from "jsonwebtoken";
import { env } from "process";

const { JWT_KEY } = env;

export const signUp = async (req, res) => {
	const { username, email, password, roles } = req.body;
	const newUser = new User({
		username,
		email,
		password: await User.encryptPassword(password),
	});
	const savedUser = await newUser.save();
	const token = jwt.sign({ id: savedUser._id }, JWT_KEY, {
		expiresIn: 86400,
	});
	res.status(200).json({ token });
};

export const signIn = async (req, res) => {
	res.json({ response: "signIn" });
};
