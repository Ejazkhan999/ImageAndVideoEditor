const express = require("express");
const router = express.Router();
const VideoManipulationMethods = require('../controller/VideoManipulation');
router.post('/videoManipulation/createvideofromImages' , VideoManipulationMethods.CreateVideoFromImages);
router.post('/videomanipulation/trimvideo' , VideoManipulationMethods.TrimVideo);
router.post('/videomanipulation/TextOverVideo' , VideoManipulationMethods.TextOverVideo);
router.post('/videomanipulation/MergMultipleVideos' , VideoManipulationMethods.MergMultipleVideos);
router.post('/videomanipulation/ResizeVideo' , VideoManipulationMethods.ResizeVideo);
router.post('/videomanipulation/AddAudioOverVerVideo' , VideoManipulationMethods.AddAudioOverVideo);
router.post('/videomanipulation/ConcatenateVideos' , VideoManipulationMethods.ConcatenateVideos);
router.post('/videomanipulation/ffprobtest' , VideoManipulationMethods.ffprobtest)
module.exports = router;