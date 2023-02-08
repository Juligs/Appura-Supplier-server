const router = require("express").Router();
const Product = require("./../models/Product.model");

router.get("/getAllProducts", (req, res) => {
  Product.find()
    .select({
      name: 1,
      pricePerUnit: 1,
      productImg: 1,
    })
    .then((response) => res.json(response))
    .catch((err) => res.status(500).json(err));
});

router.get("/details/:product_id", (req, res, next) => {
  const { product_id } = req.params;
  Product.findById(product_id)
    .populate("owner")
    .then((response) => res.json(response))
    .catch((err) => next(err));
});

router.get("/createdProducts/:owner_id", (req, res, next) => {
  const { owner_id } = req.params;

  Product.find({ owner })
    .populate("owner")
    .then((response) => res.json(response))
    .catch((err) => {
      next(err);
    });
});

router.post("/createProduct", (req, res, next) => {
  Product.create(req.body)
    .then((response) => res.json(response))
    .catch((err) => next(err));
});

module.exports = router;
