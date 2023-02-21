module.exports = (app) => {
  const productRoutes = require("./product.routes");
  app.use("/api/products", productRoutes);

  const ordersRoutes = require("./order.routes");
  app.use("/api/orders", ordersRoutes);

  const authRoutes = require("./auth.routes");
  app.use("/api/auth", authRoutes);

  const bussinesRoutes = require("./business.routes");
  app.use("/api/business", bussinesRoutes);

  const uploadRoutes = require("./upload.routes");
  app.use("/api/upload", uploadRoutes);
};

// const appuraRoutes = require("./appura.routes");
// app.use("/api/appura", appuraRoutes);
