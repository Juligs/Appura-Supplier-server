module.exports = (app) => {
  const productRoutes = require("./product.routes");
  app.use("/api/products", productRoutes);
};
// const appuraRoutes = require("./appura.routes");
// app.use("/api/appura", appuraRoutes);
