const express = require("express");
const multer = require("multer");
const path = require("path");
const cardController = require("../controllers/cardController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

router.get("/", cardController.showUploadPage);
router.post("/extract", upload.single("cardImage"), cardController.extractCardData);

module.exports = router;