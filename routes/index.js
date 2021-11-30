
const express = require("express");
const router = express.Router();
const ImageManipulate = require('./ImageManipulation');
const videoManipulation = require('./VideoManipulation')

//routes are 
router.use("", ImageManipulate);
router.use("" , videoManipulation);

module.exports = router;