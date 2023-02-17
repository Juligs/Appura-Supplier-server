const router = require("express").Router();
const Product = require("./../models/Product.model");
const Business = require("../models/Business.model");

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

  Product.find({ owner_id })
    .populate("owner")
    .then((response) => res.json(response))
    .catch((err) => {
      next(err);
    });
});

// router.post("/createProduct", (req, res, next) => {
//   const {  } = req.body;
//   console.log(business_id);

//   Business.findById(business_id)
//     .then((business) => {
//       if (!business) {
//         return res.status(400).json({
//           message: "Business not found",
//         });
//       }

//       Product.create(req.body)
//         .then((product) => {
//           business.productList.push(product._id);
//           business
//             .save()
//             .then((response) => res.json(response))
//             .catch((err) => next(err));
//         })
//         .catch((err) => next(err));
//     })
//     .catch((err) => next(err));
// });

module.exports = router;
