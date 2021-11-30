const model = require("../models");
const Jimp = require('jimp');
const  fs = require ('fs-extra');
const pathToFfmpeg = require ('ffmpeg-static');
const  util = require('util');
// const VideoCrop = require('video-crop');
const videoshow = require('videoshow');
const FfmpegCommand = require ('fluent-ffmpeg');

let methods = {
BlurImage: async(path, outputImagepath , blurquantity)=>{
  console.log('Blur image function called !')
  const image = await Jimp.read(path);      
  // if(!image) throw ' can not find Image !';
  image.blur(blurquantity)
     .write(outputImagepath);

  },
GreyscaleImage:async(path, outputImagepath)=>{
  const image = await Jimp.read(path);      
  // if(!image) throw ' can not find Image !';
  image.greyscale()
     .write(outputImagepath);

},
resizeImage:async(path , ResizeImageWidth , ResizeImageHeight, autoresize, outputImagepath)=>{
  if(autoresize == 'height'){
    const image = await Jimp.read(path);
    image.resize(ResizeImageWidth ,Jimp.AUTO)
    .write(outputImagepath);
  }
  if(autoresize == 'width'){
    const image = await Jimp.read(path);
    image.resize(Jimp.AUTO , ResizeImageHeight)
    .write(outputImagepath);
  }
  else{
    const image = await Jimp.read(path);  
  image.resize(ResizeImageWidth , ResizeImageHeight )
  .write(outputImagepath);

  }

  

},
coverImage:async(path, CoverImageWidth, CoverImageHeight, outputImagepath)=>{
  const image = await Jimp.read(path);  
  image.cover(CoverImageWidth, CoverImageHeight)
  .write(outputImagepath);
},
cropImage:async(path, x, y, CropImageWidth, cropImageHeight, outputImagepath)=>{
  const image = await Jimp.read(path);  
  image.crop( x, y, CropImageWidth, cropImageHeight )
  .write(outputImagepath);
},
mirrorImage:async(path, ImageHorz , ImageVert, outputImagepath)=>{
  const image = await Jimp.read(path); 
  image.mirror( ImageHorz , ImageVert)
  .write(outputImagepath);
},
RotateImage:async(path , RotateDegree, outputImagepath)=>{
  const image = await Jimp.read(path);
  image.rotate(RotateDegree)
  .write(outputImagepath);
},
brightnessOfImage:async(path, BrightnessValue , outputImagepath)=>{
  const image = await Jimp.read(path);
  image.brightness(BrightnessValue) 
  .write(outputImagepath);
},
contrastImage:async(path, ContrastValue, outputImagepath)=>{
  const image = await Jimp.read(path);
  image.contrast(ContrastValue)
  .write(outputImagepath);
},
invertImage:async(path, outputImagepath)=>{
  const image = await Jimp.read(path);
  image.invert()
  .write(outputImagepath);

},
normalizeImage:async(path, outputImagepath)=>{
  const image = await Jimp.read(path);
  image.normalize()
  .write(outputImagepath);
},
gaussianOfImage:async(path, GaussianValue, outputImagepath)=>{
  const image = await Jimp.read(path);
  image.gaussian(GaussianValue)
  .write(outputImagepath);
},
}
module.exports = methods