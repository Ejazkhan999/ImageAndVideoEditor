// import pathToFfmpeg from 'ffmpeg-static';
// import  util from 'util';
// import VideoCrop from 'video-crop';
const concat = require('ffmpeg-concat')
const glob=require('glob')
const probe = require('node-ffprobe')
const ffprobeInstaller = require('@ffprobe-installer/ffprobe')
// const { BackgroundRenderer, TransitionType, Easings, SlideDirection } = require('midori-bg');

const videoshow = require('videoshow');
const jimp = require('jimp')
const utilfunctionofVideo = require('../UtilFuctions/videomanipulation');
// import FfmpegCommand from 'fluent-ffmpeg';
let methods = {
  CreateVideoFromImages:async(req ,res)=>{
    console.log('Create Video Images api called !');
    try{
      let Images = req.body.Images;

      if(!Images) throw "can not find Images path !";
      var finalVideoPath = '/outputImages/VideofromMultipleImages.mp4';
      for(var i = 0; i < Images; i++){
        let imagepath = Images[i].path;
        const image = await Jimp.read(imagepath);  
  image.resize(200 , 300 )
  .write(imagepath);
  Images[i].path = imagepath;
      }
      

      var videoOptions = {
        fps: 24,
        transition: false,
        videoBitrate: 1024 ,
        videoCodec: 'libx264', 
        size: '640x640',
        outputOptions: ['-pix_fmt yuv420p'],
        format: 'mp4' 
      }

await videoshow(Images, videoOptions)
.save(finalVideoPath)
// console.log('hello===============>')
.on('start', function (command) { 
  console.log('encoding   with command ' + command) 
})
.on('error', function (err, stdout, stderr) {
  console.log("Error ===>" , err)
})
.on('end', function (output) {
  // do stuff here when done
})
     res.status(200).json({
       msg:'created video sucssess fully !',
       path:finalVideoPath
     })

    }catch(error){
      console.log('error -=== > ' , error);
      res.status(200).json({
        error , 
        msg:"can not create video from Images !"
      })
    }
  }, 

  TrimVideo: async(req, res)=>{
    console.log('trim video pai caled !');
    try{
      let sourcePath = req.body.sourcePath;
      let outputPath = '/outputImages/Trimedvideo.mp4';
      let startTime = req.body.startTime;
      let duration = req.body.duration;
      if(!sourcePath || !outputPath || !startTime || !duration) throw 'invalid request !'
      let cutVideo =   await utilfunctionofVideo.cutVideo(sourcePath, outputPath, startTime, duration) ;
      console.log('cut video is =====> ' , cutVideo)
      res.status(200).json({
        msg:'video trim sucssessfully !', 
        outputPath

      })
    }catch(error){
      console.log('error ----< > ' , error);
      res.status(500).json({
        msg:"can not trim video ",
        error
      })
    }

  } , 

  //** Merg Videos  */// 

  TextOverVideo:async(req, res)=>{

    console.log('TextOver video api called !');
    try{
      let sourcePath  = req.body.sourcePath;
      let UserText = req.body.UserText;
      let InputAudio = req.body.InputAudio;
      let outputPath = '/outputImages/TextOvervideo.mp4';

      let TextOverVideo = await utilfunctionofVideo.TextOverVideo(sourcePath , UserText,InputAudio, outputPath);
      res.status(200).json({
        msg:'sucssessfully done !',
        outputPath

      })
    }catch(error){
      console.log('error====> ', error);
      res.status(500).json({
        msg:"can not text over video ", 
        error
      })
    }
  },

  //***Resize Video  */

  ResizeVideo:async(req, res)=>{
    console.log('Resize video api called !');
    try{
      let videoPath = req.body.videoPath;
      let outputPath = '/outputImages/video.mp4';
      if(!videoPath) throw 'invalid request!'
      let resizevideo = await utilfunctionofVideo.ResizeVideo(videoPath, outputPath);
      res.status(200).json({
        msg:'done'
      })

    }catch(error){
      console.log('error --- > '  , error);
      res.status(500).json({
        error,
        msg:'can not resize video !'
      })
    }
  },
  //***Merg Multiple Videos  */
 
  MergMultipleVideos:async(req , res)=>{
    console.log('Merg multiple Videos api called !');
    try{
     
      let firstFile = req.body.firstFile;
      let secondFile = req.body.secondFile
      let thirdFile = req.body.thirdFile;
      let outPath = '/outputImages/Mergvideo.mp4';
      if(!firstFile || !secondFile || !thirdFile || !outPath) throw ' invalid request !';
      let MergMultipleVideos = await utilfunctionofVideo.MergMultipleVideos(firstFile, secondFile, thirdFile , outPath);
      console.log('MergMultipleVideos----------->' , MergMultipleVideos)
      res.status(200).json({
        msg:"done",
        path:outPath
      })
    }catch(error){
      console.log('error ----> ' , error);
      res.status(500).json({
        msg:'can not merg videos', 
        error
      })
    }
  
  
  },
//*Add Audio Over Video */
  AddAudioOverVideo:async(req, res)=>{
    console.log('add audio over video api called !')
    try{
      let audioFilePath = req.body.audioFilePath;
      let videoFilePath = req.body.videoFilePath;
      let outputPath = '/outputImages/AudioOvervideo.mp4';
      if(!audioFilePath || !videoFilePath) throw 'Invalid Request !';
      let addAudioOverVideo = await utilfunctionofVideo.AddAudioOverVideo(audioFilePath , videoFilePath , outputPath)
      res.status(200).json({
        msg:"done",
        path:outputPath
      })
    }catch(error){
      console.log('error ----- > ' , error);
      res.status(500).json({
        msg:"can not add audio over video ",
        error
      })
    }
  },
  //*Concatenate Videos  */

 ConcatenateVideos:async(req, res)=>{
   console.log('Concatenate video api called !');
   try{
    const videos=glob.sync('/InputImages/clips/*.mp4')
    const output='/outputImages/concatenated2.mp4'

    async function oneTransitionMergeVideos(){
      await concat({
        
       output,
       videos,
       size:'426 x 240',
       audio:'/InputImages/osman.mp3',
       transition: {
         name:"fadegrayscale",
         duration: 500
       }
    })
    }
    const concatenatevideos = await oneTransitionMergeVideos();
    res.status(200).json({
      msg:'done'
    })
   }catch(error){
     console.log(error);
     res.status(500).json({
       error,
       msg:"can not concatenate videos ! "
     })
   }
 },
  
 //**Image Animation  */
// Imageanimation: async(req ,res)=>{
//   console.log('Image animation api called ');
//   try{
//     // import { BackgroundRenderer, TransitionType, Easings, SlideDirection } from 'midori-bg';
// const uploadedImagePath = req.body.uploadedImagePath;
// const uploadedImagePath2 = req.body.uploadedImagePath2;
// const renderer = new BackgroundRenderer(document.getElementById(uploadedImagePath));

// loadImage(uploadedImagePath2)
//   .then((image) => {
//     // set a new background with a slide transition.
//     renderer.setBackground(image, {
//       type: TransitionType.Slide,
//       config: {
//         slides: 2,
//         intensity: 5,
//         duration: 1.5,
//         easing: Easings.Quintic.InOut,
//         direction: SlideDirection.Right,
//       }
//     });
//   })
//   // handle errors
//   .catch(err => console.error(err));
//   res.status(200).json({
//     msg:'done'
//   })

//   }catch(error){
//     console.log('error ---> ' , error);
//     res.status(500).json({
//       msg:"can not animate Image !"
//     })
//   }
// }
//an array of video path to concatenate


//a function to merge an array of videos with custom music
//and a transition fadegrayscale of 500ms duration between videos.

//** Get Animation Over Video */
GetAnimationOverVideo:async (req, res) => {
  console.log('Get animation over video api called! ')
  try{

    const ffmpeg = child_process.spawn('ffmpeg', [
      
  '-ss',' 00:00:00' ,
   '-t' ,'00:00:15 ' ,
  ' -i' , 'video.mp4 -loop 1 -i image.png -i audio.mp3',
  '-filter_complex ' ,"[1]format=yuva420p,fade=in:st=12:d=0.5:alpha=1[i]"

    ])       
  }catch(error){
    console.log('error----------------->' , error)
    res.status(500).json({
      msg:"can not get animated over video !" 
    })
  }
} ,
ffprobtest:async(req, res)=>{
  console.log('ffprobtest api function called ~~~')
  try{

console.log(ffprobeInstaller.path, ffprobeInstaller.version)
 
//ffprobe.FFPROBE_PATH = ffprobeInstaller.path
 
var track = "/InputImages/osman.mp3" // or video
 
probe(track).then(probeData => {
    console.log(probeData)
})
res.status(200).json({
  msg:"done",
  
})
  }catch(error){
    console.log('error =========> ' , error);
    res.status(500).json({
      error,
      msg:'can not load !'
    })
  }
}
}

//** Export Modules  */

module.exports = methods

/**Import Modules */