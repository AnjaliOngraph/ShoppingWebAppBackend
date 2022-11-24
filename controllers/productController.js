const Product = require("../models/productSchema");
const Category = require("../models/CategorySchema");
const SubCategory = require("../models/SubCategorySchema");

exports.createProduct = async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
};

exports.createCategory = async (req, res, next) => {
  const category = await Category.create(req.body);

  res.status(201).json({
    success: true,
    category,
  });
};

exports.createSubCategory = async (req, res, next) => {
  const subcategory = await SubCategory.create(req.body);

  res.status(201).json({
    success: true,
    subcategory,
  });
};

exports.getProductsBySubCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const productlist = await Product.find(
      { SubCategory: id },
      { _id: 1, imageSrc: 1, price: 1, name: 1, href: 1, imageAlt: 1 }
    );

    res.status(201).json(productlist);
  } catch (error) {
    console.log(error)
    res.status(401).json({ status: 401, message: "error" });
  }
};

exports.getProductDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const productDetails = await Product.findOne(
      { _id: id },
      { imageSrc: 1, price: 1, name: 1, description: 1, _id: 1 }
    );
    res.status(200).json(productDetails);
  } catch (error) {
    res.status(401).json("error");
  }
};
