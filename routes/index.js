module.exports = (app) => {
  const productRoutes = require("./product.routes");
  app.use("/api/products", productRoutes);

  const ordersRoutes = require("./order.routes");
  app.use("/api/orders", ordersRoutes);
};

// const appuraRoutes = require("./appura.routes");
// app.use("/api/appura", appuraRoutes);
