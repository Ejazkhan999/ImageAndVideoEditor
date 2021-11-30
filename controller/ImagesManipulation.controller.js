const utilfuction = require('../UtilFuctions/ImageManipulation');


let methods = {
  ImageManipulate: async(req , res)=>{
    console.log('ImageManipulation api called !');
    try{
      let imagepath = req.body.imagepath;
      let outputImage = '/InputImages/outputImage.jpg'
      let outputImagepath = outputImage;
      if(!imagepath) throw 'No image found !';
      let path = imagepath;
      //Blur image ****
      if(req.body.blur){
        let blurquantity = 5
        if(req.body.blurquantity){
          blurquantity = parseInt(req.body.blurquantity);
        };
        console.log('blur function called !')
       const outputimage = await utilfuction.BlurImage(imagepath ,outputImage , blurquantity )
      }
     
      //Rotate Image ****
      if(req.body.rotateImage && req.body.RotateDegree){
        let RotateDegree = parseInt(req.body.RotateDegree);
        let RotateImage= await utilfuction.RotateImage(path , RotateDegree, outputImagepath)
      }
      //grey scale Image ***** 
      if(req.body.GreyscaleImage){
        let greyscale = await utilfuction.GreyscaleImage(path, outputImagepath)
      }
      //Resize Image **** 
      if(req.body.resizeImage){
        let ResizeImageWidth = 0;
        let ResizeImageHeight = 0;
        if(req.body.ResizeImageHeight){
          ResizeImageHeight = parseInt(req.body.ResizeImageHeight)
                }
        if(req.body.ResizeImageWidth){
          ResizeImageWidth =parseInt(req.body.ResizeImageWidth) 
        }
        let autoresize = 'abc'
        if(req.body.autoresize){
          autoresize = req.body.autoresize
        };
        let ResizeImage = await utilfuction.resizeImage(path , ResizeImageWidth , ResizeImageHeight, autoresize, outputImagepath)
       
      }
      //Cover Image **** 
      if(req.body.coverImage){
       let  CoverImageWidth = parseInt(req.body.CoverImageWidth);
        let CoverImageHeight = parseInt(req.body.CoverImageHeight);
        let coverImage = await utilfuction.coverImage(path, CoverImageWidth, CoverImageHeight, outputImagepath) 
      }
      //*****Crop image  */
      if(req.body.cropImage){
        console.log('crop image func called ')
        let x = parseFloat(req.body.x);
        let y = parseFloat(req.body.y);
        let CropImageWidth = parseInt(req.body.CropImageWidth);
        let CropImageHeight = parseInt(req.body.CropImageHeight);
        let cropimage = await utilfuction.cropImage(path, x, y, CropImageWidth, CropImageHeight, outputImagepath)
      }
      //*****Mirror Image  */
      if(req.body.mirrorImage){
        console.log('image mirror api called ')
        let ImageHorz = req.body.ImageHorz;
        let ImageVert = req.body.ImageVert;
        let MirrorImage = utilfuction.mirrorImage(path, ImageHorz , ImageVert, outputImagepath)

       }
       //****Brightness of image */
       if(req.body.brightnessOfImage){
         let BrightnessValue =parseFloat(req.body.BrightnessValue);
         console.log('brightness value is ' , BrightnessValue)
         let brightImage = utilfuction.brightnessOfImage(path, BrightnessValue , outputImagepath);

       }
       //"****Contrast is not working properly to be studied !**
       if(req.body.contrastImage){
         console.log('contrast function called !')
        let ContrastValue = parseInt(req.body.ContrastValue);
        let contarsatImage = await utilfuction.contrastImage(path, ContrastValue, outputImagepath)
       }
       //****Invert Image ! */
       if(req.body.invertImage){
         let ImageInvert = await utilfuction.invertImage(path, outputImagepath)
       }
       //****Normolize Image ---> */
       if(req.body.normalizeImage){
         let NormolizeImage = await utilfuction.normalizeImage(path, outputImagepath);
       }
       if(req.body.gaussianOfImage){
         console.log('Gaussian function api called !')
         let GaussianValue = parseInt(req.body.GaussianValue);
         let GaussianImage = await utilfuction.gaussianOfImage(path, GaussianValue, outputImagepath);

       }

      res.status(200).json({
        msg:"manipulate sucssess",
        path:outputImage
      })

    }catch(error){
      console.log('error' , error);
      return res.status(500).json({
        error,
        msg:"can not manipulate image !"
      })
    }
  }
}
module.exports = methods;