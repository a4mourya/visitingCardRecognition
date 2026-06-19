const fs = require("fs");
const CardModel = require("../models/cardModel");
const { extractBusinessCardData } = require("../services/openaiService");

exports.showUploadPage = (req, res) => {
  res.render("index");
};

exports.extractCardData = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No image uploaded.");
    }

    const filePath = req.file.path;
    const extractedData = await extractBusinessCardData(filePath);
    const card = new CardModel(extractedData);

    res.render("result", {
      card,
      imagePath: "/" + filePath.replace(/\\/g, "/")
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error extracting business card data.");
  }
};