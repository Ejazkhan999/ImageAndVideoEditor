const express = require("express");
const router = express.Router();
const ImageManipulationMethod = require('../controller/ImagesManipulation.controller');

//router
router.post('/images/manipulateImage' , ImageManipulationMethod.ImageManipulate)
module.exports = router;
