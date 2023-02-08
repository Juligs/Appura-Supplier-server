const router = require("express").Router();
const Order = require("./../models/Order.model");
const Business = require("./../models/Business.model");
const Product = require("./../models/Product.model");

router.post("/createOrder", (req, res, next) => {
  Order.create({ ...req.body, owner: req.payload })
    .then((response) => res.json(response))
    .catch((err) => res.status(500).json(err));
});

router.get("/clientOrders/:client", (req, res, next) => {
  const { client } = req.params;

  Order.find({ client })
    .populate("client")
    .populate({
      path: "product",
      model: "Product",
      populate: {
        path: "business",
        model: "Business",
      },
    })
    .then((response) => res.json(response))
    .catch((err) => res.status(500).json(err));
});

router.get("/businessOrders/:business", (req, res, next) => {
  const { business } = req.params;

  Order.find({ business })
    .populate("business")
    .populate({
      path: "product",
      model: "Product",
    })
    .select({ owner: 1 })
    .then((response) => res.json(response))
    .catch((err) => res.status(500).json(err));
});

router.get("/details/:order_id", (req, res, next) => {
  const { order_id } = req.params;

  Order.findById(order_id)
    .populate({
      path: "product",
      model: "Product",
      populate: {
        path: "business",
        model: "Business",
      },
    })
    .populate("client")
    .then((response) => res.json(response))
    .catch((err) => next(err));
});

router.get("/createdOrders/:owner", (req, res, next) => {
  const { owner } = req.params;

  Order.find({ owner })
    .populate("owner")
    .populate("product")
    .then((response) => res.json(response))
    .catch((err) => {
      next(err);
    });
});


router.post("/addProduct/:order_id/:product_id", (req, res, next) => {
  const { order_id, product_id } = req.params;

  Order
    .findByIdAndUpdate(order_id, { "$addToSet": { "products": { product: product_id, quantity } } })
    .then((response) => res.json(response))
    .catch((err) => {
      next(err);
    });
})

router.post("/removeProduct/:order_id/:product_id", (req, res, next) => {
  const { order_id, product_id } = req.params;

  Order
    .findByIdAndUpdate(order_id, { "$pull": { "products": { product: product_id } } })
    .then((response) => res.json(response))
    .catch((err) => {
      next(err);
    });
})


router.put("/updateProduct/:order_id/products/:product_id", (req, res) => {
  const { order_id, product_id } = req.params;
  const { quantity } = req.body;
  Order.findOneAndUpdate(
    { _id: order_id, "products.product": product_id },
    { $set: { "products.$.quantity": quantity } },
    { new: true }
  )
    .then((order) => res.json(order))
    .catch((err) => res.status(500).json(err));
});





router.put("/updateOrder/:order_id", (req, res, next) => {
  const { order_id } = req.params;
  user_id = req.payload;

  User.findByIdAndUpdate(user_id, { $addToSet: { favPosts: post_id } })
    .then((response) => res.json(response))
    .catch((err) => next(err));
});

router.delete("/delete/:order_id", (req, res, next) => {
  const { order_id } = req.params;

  Order.findByIdAndDelete(order_id)
    .then((response) => res.json(response))
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
