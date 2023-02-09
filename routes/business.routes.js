const router = require("express").Router();
const Business = require("./../models/Business.model");
const Product = require("./../models/Product.model");

router.post("/createBusiness", (req, res, next) => {
  Business.create(req.body)
    .then((response) => res.json(response))
    .catch((err) => next(err));
});

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

router.post("/createProduct/:business_id", (req, res, next) => {
  const { business_id } = req.params;
  Business.findById(business_id)
    .then((business) => {
      if (!business) {
        return res.status(400).json({
          message: "Business not found",
        });
      }
      Product.create({ ...req.body, business: business_id })
        .then((product) => {
          business.productList.push(product._id);
          business
            .save()
            .then((response) => res.json(response))
            .catch((err) => next(err));
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
});
module.exports = router;
