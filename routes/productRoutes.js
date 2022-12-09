const express = require("express");
const router = express.Router();
const {
  getProductsBySubCategory,
  createProduct,
  createSubCategory,
  createCategory,
  getProductDetails,
} = require("../controllers/productController");
const {
  createUser,
  loginUser,
  forgotPassword,
  getresetPassword,
  resetPassword,
} = require("../controllers/SigninController");
const {
  createAddress,
  findAddress,
  updateAddress,
  deleteAddress,
} = require("../controllers/addressController");
const { createOrder, getOrder } = require("../controllers/orderController");

const auth = require("../middelware/auth");

router.get("/subcategory-products/:id", getProductsBySubCategory);
router.get("/product-details/:id", getProductDetails);
router.get("/address-details", auth.verifyToken, findAddress);
router.get("/orders", auth.verifyToken, getOrder);

router.post("/newProduct", createProduct);
router.post("/newCategory", createCategory);
router.post("/newSubCategory", createSubCategory);

router.patch("/updateAddress/:id1", auth.verifyToken, updateAddress);

router.post("/placeOrder", auth.verifyToken, createOrder);
router.post("/newAddress", auth.verifyToken, createAddress);
router.post("/signup", createUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/:id/:token", resetPassword);

router.delete("/deleteAddress/:id", deleteAddress);

router.use("*", (req, res) => {
  res.status(404).json({
    success: "false",
    message: "Page not found",
    error: {
      statusCode: 404,
      message: "You reached a route that is not defined on user server",
    },
  });
});

module.exports = router;
