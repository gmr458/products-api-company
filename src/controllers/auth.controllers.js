import User from "../models/User";
import Role from "../models/Role";
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
	if (roles) {
		const rolesFound = await Role.find({ name: { $in: roles } });
		newUser.roles = rolesFound.map((role) => role._id);
	} else {
		const role = await Role.findOne({ name: "user" });
		newUser.roles = [role._id];
	}
	const savedUser = await newUser.save();
	console.log(savedUser);
	const token = jwt.sign({ id: savedUser._id }, JWT_KEY, {
		expiresIn: 86400,
	});
	res.status(200).json({ token });
};

export const signIn = async (req, res) => {
	const { email, password } = req.body;
	const userFound = await User.findOne({ email: email }).populate("roles");
	if (!userFound) return res.status(400).json({ message: "User not found" });
	const matchPassword = await User.comparePassword(
		password,
		userFound.password
	);
	if (!matchPassword)
		return res
			.status(401)
			.json({ token: null, message: "Invalid password" });
	const token = jwt.sign({ id: userFound._id }, JWT_KEY, {
		expiresIn: 86400,
	});
	console.log(userFound);
	res.json({ token });
};
