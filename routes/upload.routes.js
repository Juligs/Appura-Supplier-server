const router = require("express").Router();

const uploader = require("./../config/cloudinary.config");

router.post("/image", uploader.single("imageData"), (req, res) => {
  console.log("nuestro file", req.file);

  if (!req.file) {
    res.status(500).json({ errorMessage: "Loading File Error" });
    return;
  }

  res.json({ cloudinary_url: req.file.path });
});

module.exports = router;
