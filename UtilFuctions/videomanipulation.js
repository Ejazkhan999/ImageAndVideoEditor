
const ffmpeg = require('fluent-ffmpeg');
const pathToFfmpeg = require('ffmpeg-static');
const ffprobe = require('ffprobe-static');
const { resize } = require('jimp');
const { videoResize } = require('node-video-resize')
const path = require('path')
const { getVideoDurationInSeconds } = require('get-video-duration');
//****Trim Video  */
const cutVideo =  async (sourcePath, outputPath, startTime, duration) => {
  console.log('start cut video');
  await new Promise((resolve, reject) => {
    ffmpeg(sourcePath)
      .setFfmpegPath(pathToFfmpeg)
      .setFfprobePath(ffprobe.path)
      .output(outputPath)
      .setStartTime(startTime)
      .setDuration(duration)
      .withVideoCodec('copy')
      .withAudioCodec('copy')
      .on('end', function (err) {
        if (!err) {
          console.log('conversion Done');
          resolve();
        }
      })
      .on('error', function (err) {
        console.log('error: ', err);
        reject(err);
      })
      .run();
  });
};
//****Text Over Video */
const TextOverVideo = async(sourcePath , UserText,InputAudio, outputPath) =>{
  console.log('Text Over Video function called !');
  await new Promise((resolve, reject) => {
    ffmpeg(sourcePath)
    .videoFilters({
  filter: 'drawtext',
  options: {
    fontfile:'font.ttf',
    text: UserText ,
    fontsize: 50,
    fontcolor: 'black',
    x: '(main_w/2-text_w/2)',
    y: 50,
    shadowcolor: 'black',
    shadowx: 2,
    shadowy: 2
  }
})
   
    .on('end', function () {
        console.log('file has been converted succesfully');
    })
    .on('error', function (err) {
        console.log('an error happened: ' + err.message);
        reject();
    })
    // save to file
    .save(outputPath);
    resolve();

  })



}
//****Merg Multiple Videos */
const MergMultipleVideos = async(firstFile, secondFile, thirdFile , outPath)=>{
  console.log('Merg multiple video fuction called !');
  await new Promise((resolve, reject)=>{
  
  // var proc = ffmpeg(firstFile)
      // .input(secondFile)
      // .input(thirdFile)
      // //.input(fourthFile)
      // //.input(...)
      var proc =   ffmpeg(firstFile)
  .input(secondFile)
  .input(thirdFile)
  .save(outPath)
  .on('error', function(err) {
    console.log('An error occurred: ' + err.message);
  })
  .on('end', function() {
    console.log('Merging finished !');
  })
  // .mergeToFile('/path/to/merged.avi', '/path/to/tempDir');
  //     .on('end', function() {
  //       console.log('files have been merged succesfully');
  //     })
  //     .on('error', function(err) {
  //       console.log('an error happened: ' + err.message);
  //       reject(err)
  //     })
      // .mergeToFile(outPath);
      resolve();

 })
}
///*****Resize Video */
const ResizeVideo = async(videoPath, outputPath)=>{
  console.log('resize video function called !');
  await new Promise((resolve , reject)=>{

// const videoPath = path.resolve(__dirname, './__tests__/test.mp4')
// const videoPath = path.resolve(__dirname, './video/output.mp4')


 const ret = videoResize({
  inputPath: videoPath,
  outputPath,
  format: 'mp4',
  size: '640x480'
})
console.log('ret ======> ' , ret)
resolve()

  })
  
}
//*****Add Audio Over Video  */
const AddAudioOverVideo= async(audioFilePath , videoFilePath , outputPath)=>{
  console.log('AddAudioOver video function called !');
  
getVideoDurationInSeconds(videoFilePath).then((duration) => {
    console.log(duration)
}) 
  await new Promise((resolve , reject)=>{
    new ffmpeg()
    .addInput(videoFilePath)
    .addInput(audioFilePath)
    .videoCodec('copy')
    .outputOptions(['-map 0:v:0', '-map 1:a:0'])
    .saveToFile(outputPath);
    resolve();
  })
}

module.exports= {
  cutVideo, 
  TextOverVideo,
  MergMultipleVideos,
  ResizeVideo,
  AddAudioOverVideo
}