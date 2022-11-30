const express = require("express");
const router = express.Router();
const {
  getProductsBySubCategory,
  createProduct,
  createSubCategory,
  createCategory,
  getProductDetails,
} = require("../controllers/productController");
const { createUser,loginUser } = require("../controllers/SigninController");
const {createAddress , findAddress, updateAddress} = require("../controllers/addressController");
const {createOrder, getOrder} = require("../controllers/orderController")

router.get("/subcategory-products/:id", getProductsBySubCategory);
router.get("/product-details/:id", getProductDetails);
router.get("/address-details/:id", findAddress);
router.get("/orders/:id",getOrder)

router.post("/newProduct", createProduct);
router.post("/newCategory", createCategory);
router.post("/newSubCategory", createSubCategory);

router.patch("/updateAddress/:id", updateAddress);

router.post("/placeOrder",createOrder )
router.post("/newAddress", createAddress);
router.post("/signup", createUser);
router.post("/login",loginUser);

module.exports = router;
