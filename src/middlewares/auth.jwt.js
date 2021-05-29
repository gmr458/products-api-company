import jwt from "jsonwebtoken";
import User from "../models/User";
import Role from "../models/Role";
import { env } from "process";

const { JWT_KEY } = env;

export const verifyToken = async (req, res, next) => {
	try {
		const token = req.headers["x-access-token"];
		if (!token)
			return res.status(403).json({ message: "No token provided" });
		const decoded = jwt.verify(token, JWT_KEY);
		req.userId = decoded.id;
		const user = await User.findById(req.userId, { password: 0 });
		if (!user) return res.status(404).json({ message: "Not user found" });
		next();
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const isAdmin = async (req, res, next) => {
	const user = await User.findById(req.userId);
	const roles = await Role.find({ _id: { $in: user.roles } });
	for (const role of roles) {
		if (role.name === "admin") {
			next();
			return;
		}
	}
	return res.status(403)
		.json({ message: "Unauthorized, required admin role" });
};
