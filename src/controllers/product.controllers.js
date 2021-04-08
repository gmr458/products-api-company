import Product from "../models/Product";

export const createProduct = async (req, res) => {
	const { brand, model, category, price, imgURL } = req.body;
	const newProduct = new Product({ brand, model, category, price, imgURL });
	const savedProduct = await newProduct.save();
	res.status(201).json(savedProduct);
};

export const getProducts = async (_, res) => {
	const products = await Product.find();
	res.status(200).json(products);
};

export const getProductByiD = async (req, res) => {
	const { productId } = req.params;
	const product = await Product.findById(productId);
	res.status(200).json(product);
};

export const updateProductByiD = async (req, res) => {
	const { productId } = req.params;
	const { brand, model, category, price, imgURL } = req.body;
	const updatedProduct = await Product.findByIdAndUpdate(
		productId,
		{
			brand,
			model,
			category,
			price,
			imgURL,
		},
		{
			new: true,
		}
	);
	res.status(200).json(updatedProduct);
};

export const deleteProductByiD = async (req, res) => {
	const { productId } = req.params;
	await Product.findByIdAndDelete(productId);
	res.json({ response: `product ${productId} deleted` });
};
