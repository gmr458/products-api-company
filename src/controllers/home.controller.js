import {
	name,
	version,
	description,
	author,
	license,
} from "../../package.json";

const index = (_, res) => {
	res.json(
		{
			name,
			version,
			description,
			author,
			license,
		}
	);
};

export default index;
