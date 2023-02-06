module.exports = (app) => {
  const appuraRoutes = require("./appura.routes");
  app.use("/api/appura", appuraRoutes);
};
