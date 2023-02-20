const router = require("express").Router();
const Business = require("./../models/Business.model");
const Product = require("./../models/Product.model");
const { isAuthenticated } = require("./../midleware/jwt.middleware");

router.post("/newBusiness", isAuthenticated, (req, res, next) => {
  const owner = req.payload._id;

  Business.create({ ...req.body, owner })
    .then((response) => setTimeout(() => res.json(response), 3000))
    .catch((err) => next(err).json(err));
});

router.get("/getAllBusinesses", (req, res) => {
  Business.find()
    .select({ name: 1, businessImg: 1, location: 1 })
    .then((response) => res.json(response))
    .catch((err) => res.status(500).json(err));
});

router.get("/details/:business_id", (req, res, next) => {
  const { business_id } = req.params;
  Business.findById(business_id)
    .select({
      name: 1,
      location: 1,
      businessImg: 1,
      rating: 1,
      productList: 1,
    })
    .populate("productList")
    .then((response) => res.json(response))
    .catch((err) => next(err));
});

// router.get("/:feeling_id", (req, res, next) => {

//   const { feeling_id } = req.params

//   Feeling
//     .findById(feeling_id)
//     .then(response => res.json(response))
//     .catch(err => next(err))
// })

router.put("/edit/:business_id", (req, res) => {
  const { name, description, location, businessImg } = req.body;
  const { business_id } = req.params;

  Business.findByIdAndUpdate(
    business_id,
    { name, description, location, businessImg },
    { new: true }
  )
    .then((resp) => res.json(resp))
    .catch((err) => next(err));
});

router.post("/myProducts/:products_id", (req, res, next) => {
  const { products_id } = req.params;
  business_id = req.payload;

  Bussines.findByIdAndUpdate(business_id, {
    $addToSet: { productList: products_id },
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
