import Role from "../models/Role";
import User from "../models/User";

export const verifyExistenceOfUsername = async (req, res, next) => {
	const { username } = req.body;
	const user = await User.findOne({ username });
	if (user) return res.status(400).json({ message: `The username ${username} already exist` });
	next();
};

export const verifyExistenceOfEmail = async (req, res, next) => {
	const { email } = req.body;
	const user = await User.findOne({ email });
	if (user) return res.status(400).json({ message: `The email ${email} already exist` });
	next();
};

export const verifyExistenceOfRoles = async (req, res, next) => {
	const { roles } = req.body;
	const rolesFromDb = await Role.find();
	const rolesNames = rolesFromDb.map((role) => role.name);
	let rolesThatDoNotExist = [];
	if (roles) {
		for (const role of roles) {
			if (!rolesNames.includes(role)) {
				rolesThatDoNotExist.push(role);
			}
		}
	}
	if (rolesThatDoNotExist.length > 0) {
		return res.status(400).json({ rolesThatDoNotExist });
	}
	next();
};
