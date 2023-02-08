const router = require("express").Router();
const Product = require("./../models/Business.model");

router.get("/getAllBusinesses", (req, res) => {
  Business.find()
    .then((response) => res.json(response))
    .catch((err) => res.status(500).json(err));
});

router.get("/details/:businesses_id", (req, res, next) => {
  const { businesses_id } = req.params;
  Product.findById(businesses_id)
    .select({
      name: 1,
      location: 1,
      businessImg: 1,
      rating: 1,
    })
    .populate("productList")
    .then((response) => res.json(response))
    .catch((err) => next(err));
});

router.put("/edit/:businesses_id", (req, res) => {
  const { name, description, location, businessImg } = req.body;
  const { businesses_id } = req.params;

  Bussines.findByIdAndUpdate(
    businesses_id,
    { name, description, location, businessImg },
    { new: true }
  )
    .then((resp) => res.json(resp))
    .catch((err) => next(err));
});

router.post("/myProducts/:products_id", (req, res, next) => {
  const { products_id } = req.params;
  businesses_id = req.payload;

  Bussines.findByIdAndUpdate(businesses_id, {
    $addToSet: { myProducts: products_id },
  })
    .then((response) => res.json(response))
    .catch((err) => next(err));
});

module.exports = router;
